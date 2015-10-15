/// <reference path="../../lib/models.d.ts" />
/// <reference path="../../lib/jquery.d.ts" />

module View {
    var SIZE = 40;
    export class ViewCell {
        parent :JQuery;
        cell :Model.Cell;
        div :JQuery;
        input :JQuery;
        nWallDiv :JQuery
        sWallDiv :JQuery
        eWallDiv :JQuery
        wWallDiv :JQuery

        constructor(parent :JQuery, view :View, cell :Model.Cell, x :number, y :number) {
            this.parent = parent;
            this.cell = cell;
            this.div = $("<div>")
                .addClass("mass")
                .css({
                    top: y * SIZE,
                    left: x * SIZE })
                .appendTo(parent);
            this.input = $("<input>")
                .appendTo(this.div);
            this.nWallDiv = $("<div>")
                .addClass("parts")
                .css({
                    top: y * SIZE,
                    left: x * SIZE + 4,
                    width: SIZE - 10,
                    height: 4 })
                .appendTo(parent);
            this.sWallDiv = $("<div>")
                .addClass("parts")
                .css({
                    top: (y+1) * SIZE - 4,
                    left: x * SIZE + 4,
                    width: SIZE - 10,
                    height: 4 })
                .appendTo(parent);
            this.wWallDiv = $("<div>")
                .addClass("parts")
                .css({
                    top: y * SIZE + 4,
                    left: x * SIZE,
                    width: 4,
                    height: SIZE - 10 })
                .appendTo(parent);
            this.eWallDiv = $("<div>")
                .addClass("parts")
                .css({
                    top: y * SIZE + 4,
                    left: (x+1) * SIZE - 4,
                    width: 4,
                    height: SIZE - 10 })
                .appendTo(parent);

            this.input.change(()=>{
                var num = Number(this.input.val());
                if (0 <= num && num <= 3) {
                    this.cell.setNumber(num);
                    this.cell.fireEvent();
                    view.show();
                    this.input.attr("disabled", "disabled");
                }
            });
        }
        showCell() :void {
            this.showWall(this.wWallDiv, this.cell.westWall);
            this.showWall(this.eWallDiv, this.cell.eastWall);
            this.showWall(this.nWallDiv, this.cell.northWall);
            this.showWall(this.sWallDiv, this.cell.southWall);
        }
        showWall(wallDiv :JQuery, wall :Model.Wall) :void {
            if (wall) {
                var col = "white";
                if (wall.state == Model.WallState.Wall) {
                    col = "black";
                } else if (wall.state == Model.WallState.Empty) {
                    if (wall.grand) {
                        col = "#ccf";
                    } else {
                        col = "#eef";
                    }
                }
            }
            wallDiv.css("background", col);
            if (wall.wallId != -1) {
                wallDiv.text(wall.wallId);
            }
        }
    }
}
