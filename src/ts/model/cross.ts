/// <reference path="wall.ts" />
/// <reference path="cell.ts" />
/// <reference path="rabit.ts" />

module Model {
    export class Cross implements WallListener {
        northWall :Wall;
        southWall :Wall;
        westWall :Wall;
        eastWall :Wall;

        constructor(field :Field
                , northWall :Wall
                , southWall :Wall
                , westWall :Wall
                , eastWall :Wall) {
            this.northWall = northWall;
            this.southWall = southWall;
            this.eastWall = eastWall;
            this.westWall = westWall;

            this.forEachWall(w => {
                if (w) {
                    w.addListener(this);
                }
            });
        }
        forEachWall(f :(Wall)=>void) :void {
            [this.northWall, this.southWall, this.westWall, this.eastWall].forEach(f);
        }
        _getFiltered(f) :Wall[] {
            var ret = [];
            this.forEachWall(w => {
                if (f(w)) {
                    ret.push(w);
                }
            });
            return ret;
        }
        wallDecided(newState :WallState) :void {
            var countOfWall = this._getFiltered(w => state(w) == WallState.Wall).length;
            var unknownList = this._getFiltered(w => state(w) == WallState.Unknown);
            if (countOfWall == 2) {
                unknownList
                    .forEach(wall => wall.setState(WallState.Empty));
            } else if (countOfWall == 1) {
                if (unknownList.length == 1) {
                    unknownList[0].setState(WallState.Wall);
                }
            } else if (unknownList.length == 1) {
                unknownList[0].setState(WallState.Empty);
            }
        }
    }
}
