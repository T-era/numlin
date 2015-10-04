/// <reference path="../../lib/models.d.ts" />
/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="cell.ts" />

module View {
    var SIZE = 40;
    export class ViewField {
        cells :ViewCell[][];

        constructor(parent :JQuery, view :View, field :Model.Field) {
            var temp = [];
            temp.length = field.height;
            for (var y = 0; y < field.height; y ++) {
                temp[y] = [];
                temp[y].length = field.width;
                for (var x = 0; x < field.width; x ++) {
                    temp[y][x] = new ViewCell(parent, view, field.cellAt(x, y), x, y);
                }
            }
            this.cells = temp;
        }
        show() :void {
            this.cells.forEach(line=>{
                line.forEach(cellView=>{
                    cellView.showCell();
                })
            })
        }
    }
}
