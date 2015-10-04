/// <reference path="cell.ts" />
/// <reference path="pos.ts" />

module Model {
    export interface GetWall {
        (x :number, y :number) :IWall
    }
    export enum WallState {
        Unknown, Empty, Wall
    }
    export interface WallListener {
        wallDecided(state :WallState);
    }
    export class Wall implements IWall {
        state :WallState = WallState.Unknown;
        listener :WallListener[] = [];
        edge :boolean;
        grand :boolean = false;
        _getWall :GetWall;
        _neighPos :Position[];

        constructor(getWall :GetWall, neighPos :Position[], isEdge :boolean) {
            this.edge = isEdge;
            this._getWall = getWall;
            this._neighPos = neighPos;
        }
        addListener(l :WallListener) :void {
            this.listener.push(l);
        }
        setState(newValue :WallState) :void {
            this.state = newValue;
            if (newValue == WallState.Empty
                && this.edge) {
                this.grand = true;
            }
            this.fireListenerEvent();
        }
        setGrand() :void {
            if (! this.grand) {
                if (this.state != WallState.Empty) alert("!?");
                this.grand = true;
                this.fireListenerEvent();
            }
        }
        fireListenerEvent() :void {
            var state = this.state;
            this.listener.forEach((l) => {
                l.wallDecided(state)
            });
        }
        isBetweenGrand() :boolean {
            var n = this
                .neighbors();
            var g = n
                .map(w => w.grand);
            var r = g
                .reduce((a,b)=> a && b);
            return r;
        }
        neighbors() :IWall[] {
            return this._neighPos.map(
                p => this._getWall(p.x(), p.y())
            );
        }
    }
}
