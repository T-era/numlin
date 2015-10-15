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
        static maxIndex :number = 0;

        state :WallState = WallState.Unknown;
        listeners :WallListener[] = [];
        edge :boolean;
        grand :boolean = false;
        field :Field;
        _neighPos :Position[];
        wallId :number = -1;

        constructor(field :Field, neighPos :Position[], isEdge :boolean) {
            this.edge = isEdge;
            this.field = field;
            this._neighPos = neighPos;
        }
        addListener(l :WallListener) :void {
            this.listeners.push(l);
        }
        setState(newValue :WallState) :void {
            if (this.state == newValue) {
                return;
            }
            this.state = newValue;
            if (newValue == WallState.Empty
                && this.edge) {
                this.grand = true;
            } else if (newValue == WallState.Wall) {
                this.wallId = ++ Wall.maxIndex;
                this.wallChain();
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
            this.listeners.forEach((l) => {
                l.wallDecided(state)
            });
        }
        wallChain() {
            this._neighPos.map(
                p=> this.field.crossAt(p.x(), p.y())
            ).forEach(
                cross=> {
                    cross.wallChain();
                }
            );
        }
        isBetweenSameId() :boolean {
            var tempCrosses = this._neighPos
                .map(p=>this.field.crossAt(p.x(), p.y()));
            return tempCrosses[0].edgeWallId() == tempCrosses[1].edgeWallId();
        }
        isBetweenGrand() :boolean {
            return this
                .neighbors()
                .map(w => w.grand)
                .reduce((a,b)=> a && b);
        }
        neighbors() :IWall[] {
            return this._neighPos.map(
                p => this.field.getVerIWall(p.x(), p.y())
            );
        }
    }
}
