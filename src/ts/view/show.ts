/// <reference path="../../lib/models.d.ts" />
/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="field.ts" />

module View {
    var SIZE = 40;
    export class View {
        parent :JQuery;
        fieldView :ViewField;
        field :Model.Field;

        constructor(parent :JQuery) {
            this.parent = parent;
        }
        resetField(field :Model.Field) :void {
            this.parent.empty();
            this.parent.css({
                width: field.width * SIZE + "px",
                height: field.height * SIZE + "px"
            })
            this.fieldView = new ViewField(this.parent, this, field);
            this.field = field;
        }
        show() :void {
            this.fieldView.show();
        }
        copyBut(butX :number, butY:number) :void {
            var numbers = this.field.cells.map((line)=> {
                return line.map((cell)=> {
                    return cell.num;
                });
            });
            var width = this.field.width;
            var height = this.field.height;
            this.field.setSize(width, height);
            this.resetField(this.field);
            for (var y = 0; y < height; y ++) {
                for (var x = 0; x < width; x ++) {
                    if (y == butY && x == butX) {
                    } else {
                        this.fieldView.cells[y][x].setNumber(numbers[y][x]);
                    }
                }
            }
            this.show();
        }
    }
}
