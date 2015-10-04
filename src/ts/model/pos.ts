module Model {
    export class Position {
        _x :number;
        _y :number;

        constructor(x :number, y :number) {
            this._x = x;
            this._y = y;
        }
        x() :number {
            return this._x;
        }
        y() :number {
            return this._y;
        }
    }
}
