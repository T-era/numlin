/// <reference path="cell.ts" />
/// <reference path="cross.ts" />

module Model {
    export interface IWall {
        state :WallState;
        grand :boolean;
    }

    export class DummyWall implements IWall {
        state :WallState;
        grand :boolean;

        constructor(state :WallState, grand :boolean) {
            this.grand = grand;
            this.state = state;
        }
    }
    export function state(wall :IWall) {
        if (wall) {
            return wall.state;
        } else {
            return WallState.Empty;
        }
    }
}
