/// <reference path="wall.ts" />
/// <reference path="cell.ts" />
/// <reference path="rabit.ts" />

module Model {
    export class Cross implements WallListener {
        northWall :Wall;
        southWall :Wall;
        westWall :Wall;
        eastWall :Wall;
        x :number
        y :number

        constructor(field :Field
                , x :number
                , y :number
                , northWall :Wall
                , southWall :Wall
                , westWall :Wall
                , eastWall :Wall) {
            this.x = x;
            this.y = y;
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
                if (newState == WallState.Wall
                    && countOfWall == 1
                    && this.edgeWallId() > 1) {
                    unknownList.forEach(w=> {
                        if (w.isBetweenSameId()) {
                            w.setState(WallState.Empty);
                        }
                    });
                    // TODO WallIDでUnknown => Empty
                }
            } else if (unknownList.length == 1) {
                unknownList[0].setState(WallState.Empty);
            }

            if (newState == WallState.Wall) {
                this.wallChain();
            }
        }
        wallChain() :void {
            var walls = this._getFiltered(w=>state(w) == WallState.Wall);
            if (walls.length == 2) {
                var wall1 = walls[0];
                var wall2 = walls[1];

                if (wall1.wallId != wall2.wallId) {
                    if (wall1.wallId < wall2.wallId) {
                        //alert(wall2.wallId + '->' + wall1.wallId);
                        wall2.wallId = wall1.wallId;
                        wall2.wallChain();
                    } else if (wall2.wallId < wall1.wallId) {
                        //alert(wall1.wallId + '->' + wall2.wallId);
                        wall1.wallId = wall2.wallId;
                        wall1.wallChain();
                    }
                }
            } else if (walls.length > 2) alert("!?" + walls.length);
        }
        edgeWallId() :number {
            var walls = this._getFiltered(w=>state(w) == WallState.Wall);
            if (walls.length == 1) {
                return walls[0].wallId;
            } else {
                return 0;
            }
        }
    }
}
