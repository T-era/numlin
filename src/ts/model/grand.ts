/// <reference path="wall.ts" />
/// <reference path="field.ts" />

module Model {
    // grand連鎖
    function __set(dest) {
        if (dest.state == WallState.Empty
            && ! dest.grand) {
            dest.setGrand(true);
        } else if (dest.state == WallState.Unknown) {
            if (dest.isBetweenGrand()) {
                dest.grand = true;
                dest.setState(WallState.Empty);
            }
        }
    }
    function setGrandPair(wall1, wall2) :void {
        if (wall1.grand) __set(wall2);
        if (wall2.grand) __set(wall1);
    }
    function setGrandSquare(cond1, cond2, dest1, dest2) :void {
        if (cond1.grand
            && cond2.grand) {
            __set(dest1);
            __set(dest2);
        }
    }
    function setGrandBetween(wall) {
        if (wall.state == WallState.Unknown
            && wall.isBetweenGrand()) {
            __set(wall);
        }
    }
    export function fireGrandChain(cell :Cell) :void {
        setGrandBetween(cell.northWall);
        setGrandBetween(cell.southWall);
        setGrandBetween(cell.eastWall);
        setGrandBetween(cell.westWall);
        setGrandPair(cell.northWall, cell.southWall);
        setGrandPair(cell.westWall, cell.eastWall);
        setGrandSquare(cell.northWall, cell.southWall, cell.westWall, cell.eastWall);
        setGrandSquare(cell.westWall, cell.eastWall, cell.northWall, cell.southWall);
        setGrandSquare(cell.northWall, cell.southWall, cell.westWall, cell.eastWall);
    }
}
