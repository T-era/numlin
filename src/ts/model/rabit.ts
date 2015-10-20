/// <reference path="wall.ts" />
/// <reference path="cell.ts" />

module Model {
    export class RabitHead implements WallListener {
        _head: Cell;
        _ear1: Wall;
        _ear2: Wall;
        _dest1: Wall;
        _dest2: Wall;

        constructor(head: Cell,
            ear1: Wall,
            ear2: Wall,
            dest1: Wall,
            dest2: Wall) {
            this._head = head;
            this._ear1 = ear1;
            this._ear2 = ear2;
            this._dest1 = dest1;
            this._dest2 = dest2;

            if (ear1) ear1.addListener(this);
            if (ear2) ear2.addListener(this);
        }

        wallDecided(newState :WallState) :void {
            var state1 = state(this._ear1);
            if (state1 == state(this._ear2)) {
                if (state1 == WallState.Wall) {
                    this._set(WallState.Empty);
                } else if (state1 == WallState.Empty) {
                    if (this._head.num == 1) {
                        this._set(WallState.Empty);
                    } else if (this._head.num == 3) {
                        this._set(WallState.Wall);
                    }
                }
            }
        }
        _set(newState :WallState) :void {
            function __setImpl(dest :Wall) {
                if (state(dest) != newState) {
                    dest.setState(newState);
                }
            }
            __setImpl(this._dest1);
            __setImpl(this._dest2);
        }
    }
}
