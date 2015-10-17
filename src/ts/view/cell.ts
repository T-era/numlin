/// <reference path="../../lib/models.d.ts" />
/// <reference path="../../lib/jquery.d.ts" />

module View {
    var SIZE = 40;
    export class ViewCell {
        parent :JQuery;
        view :View;
        cell :Model.Cell;
        div :JQuery;
        input :JQuery;
        x :number;
        y :number;

        constructor(parent :JQuery, view :View, cell :Model.Cell, x :number, y :number) {
            this.parent = parent;
            this.view = view;
            this.cell = cell;
            this.x = x;
            this.y = y;
            this.div = $("<div>")
                .addClass("mass")
                .css({
                    top: y * SIZE,
                    left: x * SIZE })
                .appendTo(parent);
            this.input = $("<input>")
                .appendTo(this.div);

            this.input.change(()=>{
                var num = Number(this.input.val());
                this.setNumber(num);
            });
        }
        setNumber(num :number) :void {
            if (0 <= num && num <= 3) {
                this.input.val(String(num));
                this.cell.setNumber(num);
                this.cell.fireEvent();
                this.view.show();
                this.input.attr("disabled", "disabled");
                this.putUndoButton();
            }
        }
        putUndoButton() :void {
            this.div.append(
                $("<butto>")
                    .text("x")
                    .css({
                        position: "relative",
                        top: "5px",
                        left: "25px"})
                    .click(()=> {
                            this.view.copyBut(this.x, this.y);
                        }));
        }
    }
}
