/// <reference path="cell.ts" />

module Model {
    export enum WallState {
        Unknown, Empty, Wall
    }
    export interface WallListener {
        wallDecided(state :WallState);
    }
    export class Wall {
        state :WallState = WallState.Unknown;
        listener :WallListener[] = [];
        ground :boolean;

        addListener(l :WallListener) :void {
            this.listener.push(l);
        }
        setState(newValue :WallState) :void {
            this.state = newValue;
            this.listener.forEach((l) => {
                l.wallDecided(newValue);
            })
        }
    }
}
