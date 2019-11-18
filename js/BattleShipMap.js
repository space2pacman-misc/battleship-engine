class BattleShipMap {
	constructor(width, height) {
		this._CELL_TYPES = {
			EMPTY: 0,
			SHIP: 1,
			SPACE: 2
		}
		this._width = width;
		this._height = height;
		this._map = null;
		this._ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		this._init();
	}

	getData() {
		return this._map;
	}

	_create() {
		this._map = Array.from(Array(this._width), () => new Array(this._height).fill(0));
	}

	_getPoints() {
		var i = Math.floor(Math.random() * (this._width));
		var j = Math.floor(Math.random() * (this._height));

		if(this._checkPoints(i, j)) {
			return [i, j];
		} else {
			return this._getPoints();
		}
	}

	_checkPoints(i, j) {
		return this._map[i][j] === this._CELL_TYPES.EMPTY ? true : false;
	}

	_setDisposition() {
		for(var i = 0; i < this._ships.length; i++) {
			var ship = this._ships[i];
			var points = this._getPoints();
			var coordinates = this._checkPaths(points, ship);

			if(!coordinates) {
				i--;
				continue;
			}

			for(var j = 0; j < coordinates.length; j++) {
				var [x, y] = coordinates[j];

				this._map[x][y] = this._CELL_TYPES.SHIP;
			}
			
			this._setSpace(coordinates);
		}
	}

	_setSpace(coordinates) {
		for(var i = 0; i < coordinates.length; i++) {
			var [x, y] = coordinates[i];

			if(this._map[x - 1] && this._map[x - 1][y - 1] === this._CELL_TYPES.EMPTY) this._map[x - 1][y - 1] = this._CELL_TYPES.SPACE;
			if(this._map[x - 1] && this._map[x - 1][y] === this._CELL_TYPES.EMPTY) this._map[x - 1][y] = this._CELL_TYPES.SPACE;
			if(this._map[x - 1] && this._map[x - 1][y + 1] === this._CELL_TYPES.EMPTY) this._map[x - 1][y + 1] = this._CELL_TYPES.SPACE;
			if(this._map[x][y - 1] === this._CELL_TYPES.EMPTY) this._map[x][y - 1] = this._CELL_TYPES.SPACE;
			if(this._map[x][y + 1] === this._CELL_TYPES.EMPTY) this._map[x][y + 1] = this._CELL_TYPES.SPACE;
			if(this._map[x + 1] && this._map[x + 1][y - 1] === this._CELL_TYPES.EMPTY) this._map[x + 1][y - 1] = this._CELL_TYPES.SPACE;
			if(this._map[x + 1] && this._map[x + 1][y] === this._CELL_TYPES.EMPTY) this._map[x + 1][y] = this._CELL_TYPES.SPACE;
			if(this._map[x + 1] && this._map[x + 1][y + 1] === this._CELL_TYPES.EMPTY) this._map[x + 1][y + 1] = this._CELL_TYPES.SPACE;
		}
	}

	_checkPaths(points, shipLength) {
		var direction = Math.floor(Math.random() * 2);
		var coordinates = this._checkPath(points, direction, shipLength);
			
		return coordinates ? coordinates : false;
	}

	_checkPath(points, index, shipLength) {
		var pointsClone = points.slice();
		var count = 0;
		var delta = -1;
		var coordinates = [];

		for(var i = 0; i < shipLength; i++) {
		
			if((pointsClone[index] + delta) < 0
				|| i === shipLength && delta === -1) resetCycle();
			
			pointsClone[index] = pointsClone[index] + delta;
			var [x, y] = pointsClone;

			if(this._map[x] && this._map[x][y] === this._CELL_TYPES.EMPTY) {
				count++;
				coordinates.push(pointsClone.slice());

				if(count === shipLength) return coordinates;
			}
		}

		function resetCycle() {
			i = -1;
			delta = 1;
			count = 0;
			coordinates = [];
			pointsClone = points.slice();
		}
	}

	_init() {
		this._create();
		this._setDisposition();
	}
}