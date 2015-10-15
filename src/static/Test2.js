function testInit(field, show) {
    function setNumber(x,y) {
        return function(num) {
            var cell = field.cellAt(x,y);
            cell.setNumber(num);
            cell.fireEvent();
            show.show();
        }
    }
    setNumber(5,1)(0);
    setNumber(6,1)(0);
    setNumber(4,2)(0);
    setNumber(7,2)(0);
    setNumber(7,4)(0);
    setNumber(4,5)(0);
    setNumber(5,5)(0);
    setNumber(6,5)(0);
    setNumber(3,4)(3);
}
