/// <reference path="../../lib/models.d.ts" />
/// <reference path="../../lib/jquery.d.ts" />

module View {
    var SIZE = 40;
    export function show(parent :JQuery, field :Model.Field) :void {
        for (var y = 0; y < field.height; y ++) {
            for (var x = 0; x < field.width; x ++) {
                var cell = field.cellAt(x, y);
                showCell(parent, x * SIZE, y * SIZE, cell);
            }
        }
    }
    function showCell(parent :JQuery, x :number, y :number, cell :Model.Cell) :void {
        $("<div>").addClass("mass")
            .css("top", y)
            .css("left", x)
            .css("border", "1px solid #ddd")
            .appendTo(parent)
            .text(cell.num == -1 ? "" : cell.num);
        showWall(parent, x, y + SIZE / 2, cell.westWall);
        showWall(parent, x + SIZE, y + SIZE / 2, cell.eastWall);
        showWall(parent, x + SIZE / 2, y, cell.northWall);
        showWall(parent, x + SIZE / 2, y + SIZE, cell.southWall);
    }
    function showWall(parent :JQuery, x :number, y :number, wall :Model.Wall) :void {
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
            $("<div>").addClass("parts")
                .css("top", y)
                .css("left", x)
                .css("width", 10)
                .css("height", 10)
                .css("background", col)
                .appendTo(parent);
        }
    }
}
