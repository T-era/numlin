function testInit(field, show) {
    function setNumber(y,x) {
        return function(num) {
            var cell = field.cellAt(x,y);
            cell.setNumber(num);
            cell.fireEvent();
            show.show();
        }
    }
    setNumber(1,1)(0);
    setNumber(2,1)(1);
    setNumber(3,1)(1);
    setNumber(5,1)(1);
    setNumber(6,1)(1);
    setNumber(7,1)(0);
    setNumber(2,2)(3);
    setNumber(6,2)(3);
    setNumber(1,3)(0);
    setNumber(2,3)(1);
    setNumber(3,3)(1);
    setNumber(5,3)(1);
    setNumber(6,3)(1);
    setNumber(7,3)(0);
}
