/// <reference path="wall.ts" />
/// <reference path="cell.ts" />

module Model {
    export class Cross implements WallListener {
        walls :Wall[];

        constructor(walls :Wall[]) {
            this.walls = walls;
            this.walls.forEach(w => {
                if (w) {
                    w.addListener(this);
                }
            })
        }
        getStates() :WallState[] {
            return this.walls.map(wall => {
                if (wall == null) {
                    return WallState.Empty;
                } else {
                    return wall.state;
                }
            })
        }
        wallDecided(newState :WallState) :void {
            var countOfWall = this.getStates().filter(state => state == WallState.Wall).length;
            var unknownList = this.walls.filter(wall => wall && wall.state == WallState.Unknown);
            if (countOfWall == 2) {
                this.walls.filter(wall => wall && wall.state == WallState.Unknown)
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
