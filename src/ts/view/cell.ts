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

        constructor(parent :JQuery, view :View, cell :Model.Cell, x :number, y :number) {
            this.parent = parent;
            this.view = view;
            this.cell = cell;
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
                this.cell.setNumber(num);
                this.cell.fireEvent();
                this.view.show();
                this.input.attr("disabled", "disabled");
            }
        }
    }
}
