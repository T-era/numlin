/// <reference path="wall.ts" />
/// <reference path="field.ts" />
/// <reference path="grand.ts" />

module Model {
    export class Cell implements WallListener {
        num :number = -1;
        northWall :Wall;
        southWall :Wall;
        eastWall :Wall;
        westWall :Wall;
        grand :boolean;
        _rabits :RabitHead[];

        constructor(x :number, y :number, field :Field) {
            this.northWall = field.getHorWall(x, y);
            this.southWall = field.getHorWall(x, y + 1);
            this.westWall = field.getVerWall(x, y);
            this.eastWall = field.getVerWall(x + 1, y);

            this.northWall.addListener(this);
            this.westWall.addListener(this);
            this.southWall.addListener(this);
            this.eastWall.addListener(this);

            // Generate Rabit Heads
            this._rabits = [
                new RabitHead( // 北西
                    this,
                    field.getVerWall(x, y-1),
                    field.getHorWall(x-1, y),
                    this.northWall,
                    this.westWall),
                new RabitHead( // 北東
                    this,
                    field.getVerWall(x+1, y-1),
                    field.getHorWall(x+1, y),
                    this.northWall,
                    this.eastWall),
                new RabitHead( // 南西
                    this,
                    field.getVerWall(x, y+1),
                    field.getHorWall(x-1, y+1),
                    this.southWall,
                    this.westWall),
                new RabitHead( // 南東
                    this,
                    field.getVerWall(x+1, y+1),
                    field.getHorWall(x+1, y+1),
                    this.southWall,
                    this.eastWall)];
        }

        fireEvent() :void {
            this.wallDecided(null);
        }

        setNumber(arg :number) :void {
            this.num = arg;
            this._rabits.forEach((r)=>r.wallDecided(null));
        }

        setNoWall() :void {
            if (this.num == 0) {
                [this.northWall, this.southWall, this.eastWall, this.westWall].forEach(
                    wall => {
                        if (wall) wall.setState(WallState.Empty);
                    });
            }
        }

        wallDecided(state :WallState) :void {
            if (this.num != -1) {
                if (this._countWall() == this.num) {
                    this._setIfUnknown(WallState.Empty);
                } else if (this._countEmpty() == 4 - this.num) {
                    this._setIfUnknown(WallState.Wall);
                }
            }

            if (state == WallState.Empty) {
                fireGrandChain(this);
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
                (wall :Wall) => { return wall.setState(state); });
        }
        _walls(state :WallState) :Wall[] {
            return [this.northWall
                , this.southWall
                , this.eastWall
                , this.westWall].filter(
                    (wall) => { return wall && wall.state == state; });
        }
    }
}
