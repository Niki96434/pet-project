'use strict';
// каждому методу класса - кнопка
class Calc {
    timer = null;
    numText = null; // при удалении
    firstFlag = true; // если х
    constructor(x, y, oper) { // свойства класса
        this.x = x;
        this.y = y;
        this.oper = oper; // символ операнда (ключ в объекте операндов)
    }
    calculate() { // здесь считает
        switch(this.oper) {
            case '+':
            return +this.x + +this.y
            case '-':
            return +this.x - +this.y
            case 'x':
            return +this.x * +this.y
            case '/':
            return +this.x / +this.y
            case 'del':
                if (firstFlag) {//если х удалили
                    this.x = 0;
                    return this.x
                    }
                else if (!firstFlag) {
                    this.y = 0;
                    return this.y
                }
        }
    }
    // clear() { // остановит функцию 
    //     clearInterval(timer);
    // }

    // start() {
    //     timer = setInterval(() => this.calculate(), 1000)
    // }
}

export default Calc;