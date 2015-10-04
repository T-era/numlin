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
            this.div = $("<div>").addClass("mass")
                .css("top", y * SIZE)
                .css("left", x * SIZE)
                .css("border", "1px solid #ddd")
                .appendTo(parent);
            this.input = $("<input>")
                .appendTo(this.div);
            this.nWallDiv = $("<div>").addClass("parts")
                .css("top", y * SIZE)
                .css("left", x * SIZE + 4)
                .css("width", SIZE - 10)
                .css("height", 4)
                .appendTo(parent);
            this.sWallDiv = $("<div>").addClass("parts")
                .css("top", (y+1) * SIZE - 4)
                .css("left", x * SIZE + 4)
                .css("width", SIZE - 10)
                .css("height", 4)
                .appendTo(parent);
            this.wWallDiv = $("<div>").addClass("parts")
                .css("top", y * SIZE + 4)
                .css("left", x * SIZE)
                .css("width", 4)
                .css("height", SIZE - 10)
                .appendTo(parent);
            this.eWallDiv = $("<div>").addClass("parts")
                .css("top", y * SIZE + 4)
                .css("left", (x+1) * SIZE - 4)
                .css("width", 4)
                .css("height", SIZE - 10)
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
                    col = "#ddd";
                } else if (wall.state == Model.WallState.Empty) {
                    if (wall.grand) {
                        col = "#ccf";
                    } else {
                        col = "#eef";
                    }
                }
            }
            wallDiv.css("background", col);
        }
    }
}
