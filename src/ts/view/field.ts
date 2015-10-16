/// <reference path="../../lib/models.d.ts" />
/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="cell.ts" />
/// <reference path="wall.ts" />

module View {
    var SIZE = 40;
    export class ViewField {
        cells :ViewCell[][];
        horWalls :ViewWall[][];
        verWalls :ViewWall[][];

        constructor(parent :JQuery, view :View, field :Model.Field) {
            this.cells = field.cells.map((line, y)=> {
                return line.map((cell, x)=> {
                    return new ViewCell(parent, view, cell, x, y);
                });
            });
            this.verWalls = field.verWalls.map((line, y)=> {
                return line.map((wall, x)=> {
                    return createVerticalWall(parent, view, wall, x, y);
                });
            });
            this.horWalls = field.horWalls.map((line, y)=> {
                return line.map((wall, x)=> {
                    return createHorizontalWall(parent, view, wall, x, y);
                });
            });
        }
        show() :void {
            [this.verWalls, this.horWalls]
                .forEach(walls=>{
                    walls.forEach(line=>{
                        line.forEach(wallView=>{
                            wallView.showWall();
                        });
                    });
                });
        }
    }
}
