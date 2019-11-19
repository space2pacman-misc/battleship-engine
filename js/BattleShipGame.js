class BattleShipGame {
	constructor(map, app) {
		this._CELL_TYPES = {
			EMPTY: 0,
			SHIP: 1,
			SPACE: 2,
			DESTROYED: 3,
			MISS: 4
		}
		this._map = map;
		this._app = document.querySelector(app);
		this._init();
	}

	strike(i, j) {
		this._map[i][j] = this._checkPoints(i, j);
		this._update();
	}

	_checkPoints(i, j) {
		return this._map[i][j] === this._CELL_TYPES.SHIP ? this._CELL_TYPES.DESTROYED : this._CELL_TYPES.MISS;
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