function testInit(field, show) {
    function setNumber(x,y) {
        return function(num) {
            var cellView = show.fieldView.cells[y][x];
            cellView.input.val(num);
            cellView.setNumber(num);
        }
    }
    setNumber(2,1)(0);
    setNumber(4,1)(0);
    setNumber(6,1)(0);
    setNumber(8,1)(0);
    setNumber(2,3)(0);
    setNumber(8,3)(0);
    setNumber(3,4)(0);
    setNumber(4,4)(0);
    setNumber(6,4)(0);
    setNumber(7,4)(0);

    setNumber(5,3)(3);
}
