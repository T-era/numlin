/// <reference path="field.ts" />

module Model {
    export function bury(field :Field) {
        field.crosses.forEach(crossLine=> {
            crossLine.filter(isEdgeCross)
                .forEach(cross=> {
                    cross.forEachWall(w => {
                        if (w
                            && state(w) == WallState.Unknown
                            && isDeadEnd(cross, w)) {
                            w.setState(WallState.Empty);
                        }
                    });
                });
        });


        function isEdgeCross(cross :Cross) :boolean {
            var countOfWall = 0;
            cross.forEachWall(w => {
                if (w && w.state == WallState.Wall) {
                    countOfWall ++;
                }
            });
            return countOfWall == 1;
        }
        function isDeadEnd(cross :Cross, wall :Wall) :boolean {
            var checked :{[key:string]: boolean} = {};
            var firstCross = wall._getCrosses
                .map(f=>f())
                .filter(c=>c != cross)[0];

            function _addChecked(cross :Cross) :void {
                checked[hash_pos(cross.x, cross.y)] = true;
            }
            function _isChecked(cross :Cross) :boolean {
                return checked[hash_pos(cross.x, cross.y)]
            }
            _addChecked(cross);
            return ! _findAnotherEdge(firstCross);

            function _findAnotherEdge(cross :Cross) :boolean {
                if (_isChecked(cross)) return false;
                _addChecked(cross);

                var countOfWall = cross._getFiltered(w=>state(w) == WallState.Wall).length;
                if (countOfWall == 1) {
                    return true;
                } else {
                    var neighbors = _neighborCrosses()
                    for (var i = 0, max = neighbors.length; i < max; i ++) {
                        var nCross = neighbors[i];
                        if (_findAnotherEdge(nCross)) {
                            return true;
                        }
                    }
                    return false;
                }
                function _neighborCrosses() :Cross[] {
                    var ret :Cross[] = []
                    __addIf(cross.northWall, cross.x, cross.y - 1);
                    __addIf(cross.southWall, cross.x, cross.y + 1);
                    __addIf(cross.westWall, cross.x - 1, cross.y);
                    __addIf(cross.eastWall, cross.x + 1, cross.y);

                    function __addIf(wall :Wall, x :number, y :number) :void {
                        if (state(wall) == WallState.Unknown) {
                            ret.push(field.crossAt(x, y));
                        }
                    }
                    return ret;
                }
            }
        }
        function hash_pos(x :number, y :number) :string {
            return String(x) + ", " + String(y);
        }
    }
}
