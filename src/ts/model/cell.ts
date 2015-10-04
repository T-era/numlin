/// <reference path="wall.ts" />
/// <reference path="field.ts" />

module Model {
    export class Cell implements WallListener {
        num :number = -1;
        northWall :Wall;
        southWall :Wall;
        eastWall :Wall;
        westWall :Wall;

        constructor(x :number, y :number, field :Field) {
            if (y > 0) {
                this.northWall = field.cellAt(x, y - 1).southWall;
            } else {
                this.northWall = new Wall();
            }
            this.northWall.addListener(this);
            if (x > 0) {
                this.westWall = field.cellAt(x - 1, y).eastWall;
            } else {
                this.westWall = new Wall();
            }
            this.westWall.addListener(this);
            this.southWall = new Wall();
            this.southWall.addListener(this);
            this.eastWall = new Wall();
            this.eastWall.addListener(this);
        }

        setNumber(arg :number) :void {
            this.num = arg;
        }

        setNoWall() :void {
            if (this.num == 0) {
                [this.northWall, this.southWall, this.eastWall, this.westWall].forEach(
                    wall => {
                        if (wall) wall.setState(WallState.Empty);
                    }
                )
            }
        }

        wallDecided(state :WallState) :void {
            if (this.num == -1) return // Not decide the NUMBER yet.
            if (this._countWall() == this.num) {
                this._setIfUnknown(WallState.Empty);
            } else if (this._countEmpty() == 4 - this.num) {
                this._setIfUnknown(WallState.Wall);
            }
        }

        _countWall() :number {
            return this._walls(WallState.Wall).length;
        }
        _countEmpty() :number {
            return this._walls(WallState.Empty).length;
        }
        _setIfUnknown(state :WallState) {
            this._walls(WallState.Unknown).forEach(
                (wall :Wall) => { return wall.setState(state); }
            )
        }
        _walls(state :WallState) :Wall[] {
            return [this.northWall
                , this.southWall
                , this.eastWall
                , this.westWall].filter(
                    (wall) => { return wall && wall.state == state; }
                );
        }
    }
}
