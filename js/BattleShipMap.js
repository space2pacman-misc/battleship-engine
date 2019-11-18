class BattleShipMap {
	constructor(width, height) {
		/*
		0 - empty
		1 - ship
		2 - space
		*/
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
		return this._map[i][j] === 0 ? true : false;
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

				this._map[x][y] = 1;
			}
			
			this._setSpace(coordinates);
		}
	}

	_setSpace(coordinates) {
		for(var i = 0; i < coordinates.length; i++) {
			var [x, y] = coordinates[i];

			if(this._map[x - 1] && this._map[x - 1][y - 1] === 0) this._map[x - 1][y - 1] = 2;
			if(this._map[x - 1] && this._map[x - 1][y] === 0) this._map[x - 1][y] = 2;
			if(this._map[x - 1] && this._map[x - 1][y + 1] === 0) this._map[x - 1][y + 1] = 2;
			if(this._map[x][y - 1] === 0) this._map[x][y - 1] = 2;
			if(this._map[x][y + 1] === 0) this._map[x][y + 1] = 2;
			if(this._map[x + 1] && this._map[x + 1][y - 1] === 0) this._map[x + 1][y - 1] = 2;
			if(this._map[x + 1] && this._map[x + 1][y] === 0) this._map[x + 1][y] = 2;
			if(this._map[x + 1] && this._map[x + 1][y + 1] === 0) this._map[x + 1][y + 1] = 2;
		}
	}

	_checkPaths(points, shipLength) {
		var coordinates;

		for(var i = 0; i < points.length; i++) {
			coordinates = this._checkPath(points, i, shipLength);
			
			if(coordinates) {
				return coordinates;
			}
		}

		return false;
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

			if(this._map[x] && this._map[x][y] === 0) {
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