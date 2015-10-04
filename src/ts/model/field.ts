/// <reference path="cell.ts" />
/// <reference path="cross.ts" />

module Model {
    export class Field {
        cells :Cell[][] = [[]];
        crosses :Cross[][] = [[]];
        _width :number;
        _height :number;

        setSize(width :number, height :number) :void {
            var _getWallX = (minX :number, maxX :number, y :number) => {
                if (this.cellAt(minX, y)) {
                    return this.cellAt(minX, y).eastWall;
                } else if (this.cellAt(maxX, y)) {
                    return this.cellAt(maxX, y).westWall;
                } else {
                    return null;
                }
            }
            var _getWallY = (x :number, minY :number, maxY :number) => {
                if (this.cellAt(x, minY)) {
                    return this.cellAt(x, minY).southWall;
                } else if (this.cellAt(x, maxY)) {
                    return this.cellAt(x, maxY).northWall;
                } else {
                    return null;
                }
            }
            this._width = width;
            this._height = height;
            this.cells = [[]];
            this.cells.length = height;
            for (var y = 0; y < height; y ++) {
                this.cells[y] = [];
                this.cells[y].length = width;
                for (var x = 0; x < width; x ++) {
                    this.cells[y][x] = new Cell(x, y, this);
                }
            }

            this.crosses = [[]];
            this.crosses.length = height + 1;
            for (var y = 0; y <= height; y ++) {
                this.crosses[y] = [];
                this.crosses[y].length = width + 1;
                for (var x = 0; x <= width; x ++) {
                    this.crosses[y][x] = new Cross([
                        _getWallX(x-1, x, y-1),
                        _getWallX(x-1, x, y),
                        _getWallY(x-1, y-1, y),
                        _getWallY(x, y-1, y)]);
                }
            }
        }
        cellAt(x :number, y :number) :Cell {
            if (0 <= x && x < this._width
                && 0 <= y && y < this._height) {
                return this.cells[y][x];
            } else {
                return null;
            }
        }
        crossAt(x :number, y:number) :Cross {
            return this.crosses[y][x];
        }
        fire() :void {
            for (var y = 0; y < this._height; y ++) {
                for (var x = 0; x < this._width; x ++) {
                    var cell = this.cells[y][x];
                    if (cell.num == 0) {
                        cell.setNoWall();
                    }
                }
            }
        }
    }
}
