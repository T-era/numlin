/// <reference path="../../lib/models.d.ts" />
/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="field.ts" />

module View {
    var SIZE = 40;
    export class View {
        parent :JQuery;
        fieldView :ViewField;

        constructor(parent :JQuery) {
            this.parent = parent;
        }
        resetField(field :Model.Field) :void {
            this.fieldView = new ViewField(this.parent, this, field);
        }
        show() :void {
            this.fieldView.show();
        }
    }
}
