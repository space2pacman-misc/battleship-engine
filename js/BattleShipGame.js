class BattleShipGame {
	constructor(map, ships, app) {
		this._CELL_TYPES = {
			EMPTY: 0,
			SHIP: 1,
			SPACE: 2,
			DESTROYED: 3,
			MISS: 4
		}
		this._map = map;
		this._ships = ships;
		this._app = document.querySelector(app);
		this._init();
	}

	strike(i, j) {
		var cellType = this._checkPoints(i, j);

		if(cellType === this._CELL_TYPES.SHIP) {
			this._findShip([i, j]);
			cellType = this._CELL_TYPES.DESTROYED;
		}

		this._map[i][j] = cellType;
		this._update();
	}

	_findShip(position) {
		var coordinates = this._ships.coordinates;

		for(var i = 0; i < coordinates.length; i++) {
			for(var j = 0; j < coordinates[i].length; j++) {
				if(JSON.stringify(coordinates[i][j]) === JSON.stringify(position)) {
					this._updateState(i, j);
				}
			}
		}
	}

	_updateState(i, j) {
		this._ships.states[i][j] = false;
		this._watchState();
	}

	_watchState() {
		var states = this._ships.states;
		var coordinates = this._ships.coordinates;

		for(var i = 0; i < states.length; i++) {
			if(states[i].every(state => !state)) {
				this._setSpace(coordinates[i]);
			}
		}
	}

	_setSpace(coordinates) {
		var map = this._map;
		var EMPTY = this._CELL_TYPES.EMPTY;
		var SPACE = this._CELL_TYPES.SPACE;
		var MISS = this._CELL_TYPES.MISS;

		for(var i = 0; i < coordinates.length; i++) {
			var [x, y] = coordinates[i];

			if(map[x - 1] && (map[x - 1][y - 1] === EMPTY || map[x - 1][y - 1] === SPACE)) map[x - 1][y - 1] = MISS;
			if(map[x - 1] && (map[x - 1][y] === EMPTY || map[x - 1][y] === SPACE)) map[x - 1][y] = MISS;
			if(map[x - 1] && (map[x - 1][y + 1] === EMPTY || map[x - 1][y + 1] === SPACE)) map[x - 1][y + 1] = MISS;
			if(map[x][y - 1] === EMPTY || map[x][y - 1] === SPACE) map[x][y - 1] = MISS;
			if(map[x][y + 1] === EMPTY || map[x][y + 1] === SPACE) map[x][y + 1] = MISS;
			if(map[x + 1] && (map[x + 1][y - 1] === EMPTY || map[x + 1][y - 1] === SPACE)) map[x + 1][y - 1] = MISS;
			if(map[x + 1] && (map[x + 1][y] === EMPTY || map[x + 1][y] === SPACE)) map[x + 1][y] = MISS;
			if(map[x + 1] && (map[x + 1][y + 1] === EMPTY || map[x + 1][y + 1] === SPACE)) map[x + 1][y + 1] = MISS;
		}
	}

	_checkPoints(i, j) {
		switch(this._map[i][j]) {
			case this._CELL_TYPES.SHIP:
				return this._CELL_TYPES.SHIP;

			case this._CELL_TYPES.DESTROYED:
				return this._CELL_TYPES.DESTROYED;

			default:
				return this._CELL_TYPES.MISS;
		}
	}

	_update() {
		this._app.innerHTML = "";
		this._render();
	}

	_render() {
		for(var i = 0; i < this._map.length; i++) {
			for(var j = 0; j < this._map[i].length; j++) {
				switch(this._map[i][j]) {
					case this._CELL_TYPES.EMPTY:
						var cell = this._createCell("water");

						break;
					case this._CELL_TYPES.SHIP:
						var cell = this._createCell("ship");

						break;
					case this._CELL_TYPES.SPACE:
						var cell = this._createCell("space");

						break;
					case this._CELL_TYPES.DESTROYED:
						var cell = this._createCell("ship");

						cell.classList.add("destroyed");

						break;
					case this._CELL_TYPES.MISS:
						var cell = this._createCell("miss");

						break;
				}

				cell.setAttribute("i", i);
				cell.setAttribute("j", j);
				this._app.appendChild(cell);
			}
		}
	}

	_createCell(type) {
		var cell = document.createElement("div");

		cell.classList.add("cell");
		cell.classList.add(type);

		return cell;
	}

	_init() {
		this._render();
	}
}