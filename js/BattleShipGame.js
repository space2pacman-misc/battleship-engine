class BattleShipGame {
	constructor(map, app) {
		this._map = map;
		this._app = document.querySelector(app);
		this._init();
	}

	_render() {
		for(var i = 0; i < this._map.length; i++) {
			for(var j = 0; j < this._map[i].length; j++) {
				switch(this._map[i][j]) {
					case 0:
						var cell = this._createCell("water");

						break;
					case 1:
						var cell = this._createCell("ship");

						break;
					case 2:
						var cell = this._createCell("space");

						break;
				}

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