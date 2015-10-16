/// <reference path="../../lib/models.d.ts" />
/// <reference path="../../lib/jquery.d.ts" />

module View {
    var SIZE = 40;
    export function createVerticalWall(parent :JQuery, view :View, wall :Model.Wall, x :number, y :number) :ViewWall {
        var rect = {
            top: y * SIZE + 4,
            left: x * SIZE - 4,
            width: 8,
            height: SIZE - 10 };
        return new ViewWall(parent, view, wall, rect);
    }
    export function createHorizontalWall(parent :JQuery, view :View, wall :Model.Wall, x :number, y :number) :ViewWall {
        var rect = {
            top: y * SIZE - 4,
            left: x * SIZE + 4,
            width: SIZE - 10,
            height: 8 };
        return new ViewWall(parent, view, wall, rect);
    }

    export class ViewWall {
        parent :JQuery;
        view :View;
        wall :Model.Wall;
        div :JQuery;

        constructor(parent :JQuery, view :View, wall :Model.Wall, rect) {
            this.parent = parent;
            this.view = view;
            this.wall = wall;
            this.div = $("<div>")
                .addClass("parts")
                .addClass("wall")
                .appendTo(parent);
            this.div
                .css(rect)
                ;
        }
        showWall() :void {
            var col = "white";
            if (this.wall.state == Model.WallState.Wall) {
                col = "black";
            } else if (this.wall.state == Model.WallState.Empty) {
                if (this.wall.grand) {
                    col = "#ccf";
                } else {
                    col = "#eef";
                }
            }
            this.div.css("background", col);
            if (this.wall.wallId != -1) {
                this.div.text(this.wall.wallId);
            }
        }
    }
}
