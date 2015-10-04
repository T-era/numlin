/// <reference path="cell.ts" />
/// <reference path="cross.ts" />
/// <reference path="iwall.ts" />


module Model {
    var FIXED_GRAND_WALL = new DummyWall(WallState.Empty, true);
    export function doubleList<T>(width :number, height :number, newElm :(x:number, y:number)=>T) :T[][] {
        var list :T[][] = [[]];
        list.length = height;
        for (var y = 0; y < height; y ++) {
            list[y] = [];
            list[y].length = width;
            for (var x = 0; x < width; x ++) {
                list[y][x] = newElm(x, y);
            }
        }
        return list;
    }
    export class Field {
        cells :Cell[][] = [[]];
        crosses :Cross[][] = [[]];
        horWalls :Wall[][] = [[]];
        verWalls :Wall[][] = [[]];
        width :number;
        height :number;

        getHorIWall(x :number, y :number) :IWall {
            var w = this.getHorWall(x, y);
            if (w) {
                return w;
            } else {
                return FIXED_GRAND_WALL;
            }
        }
        getVerIWall(x :number, y :number) :IWall {
            var w = this.getVerWall(x, y);
            if (w) {
                return w;
            } else {
                return FIXED_GRAND_WALL;
            }
        }
        getHorWall(x :number, y :number) :Wall {
            if (0 <= x && x < this.horWalls[0].length
                && 0 <= y && y < this.horWalls.length) {
                return this.horWalls[y][x];
            } else {
                return null;
            }
        }
        getVerWall(x :number, y :number) :Wall {
            if (0 <= x && x < this.verWalls[0].length
                && 0 <= y && y < this.verWalls.length) {
                return this.verWalls[y][x];
            } else {
                return null;
            }
        }
        setSize(width :number, height :number) :void {
            this.verWalls = doubleList(
                width + 1,
                height,
                (x, y) => new Wall(
                    (x,y) => this.getVerIWall(x, y),
                    [new Position(x-1, y), new Position(x+1, y)],
                    x == 0 || x == width));

            this.horWalls = doubleList(
                width,
                height + 1,
                (x, y) => new Wall(
                    (x,y) => this.getHorIWall(x, y),
                    [new Position(x, y-1), new Position(x, y+1)],
                    y == 0 || y == height));

            this.width = width;
            this.height = height;
            this.cells = doubleList(
                width,
                height,
                (x, y)=>new Cell(x, y, this));

            this.crosses = doubleList(
                width + 1,
                height + 1,
                (x, y)=> new Cross(
                        this,
                        this.getVerWall(x, y-1),
                        this.getVerWall(x, y),
                        this.getHorWall(x-1, y),
                        this.getHorWall(x, y)));
        }
        cellAt(x :number, y :number) :Cell {
            if (0 <= x && x < this.width
                && 0 <= y && y < this.height) {
                return this.cells[y][x];
            } else {
                return null;
            }
        }
        crossAt(x :number, y:number) :Cross {
            return this.crosses[y][x];
        }
        fire() :void {
            for (var y = 0; y < this.height; y ++) {
                for (var x = 0; x < this.width; x ++) {
                    var cell = this.cells[y][x];
                    if (cell.num == 0) {
                        cell.setNoWall();
                    }
                }
            }
        }
    }
}
