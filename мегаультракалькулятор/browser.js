import Calc from "./calcc.js";

let res = new Calc(); // пока без свойств
function addText() { // здесь будет DOM
 
    let lineInput = document.querySelector('.input-elem'); // куда вводятся числа
    let buttons = document.querySelectorAll('button'); // для каждой кнопки свой метод
    let spanInput = document.querySelector('.span-elem');
    let first = true; // флаг для х

    try {buttons.forEach(btn => {btn.addEventListener('click', function() {
        if (btn.matches('.num')) {  // методы для х и у
            if (first) {
            lineInput.textContent += btn.textContent; // добавляет текст числа в инпуте
            res.x = +lineInput.textContent; // свойство х 
            // alert(`x - ${res.x}`);
            }
            else {
                spanInput.textContent += btn.textContent;
                lineInput.textContent += btn.textContent;
                res.y = +lineInput.textContent;
                // alert(`y - ${res.y}`);
                
            }}
        else if(btn.matches('.oper')) {
            if (btn.textContent == 'del') {
                spanInput.textContent = '';
                lineInput.textContent = '';
            }
            else {
            first = false; // теперь добавляет только this.y
            res.oper = btn.textContent;
            lineInput.textContent += res.oper;
            spanInput.textContent = lineInput.textContent;
            lineInput.textContent = '';                             
        } 
        }
        else if(btn.matches('.equal')) {
            let question = res.calculate();
            // alert(question);
            first = true;
            lineInput.textContent = '';
            if (isFinite(question)) {
                spanInput.textContent = '';
                lineInput.textContent = question;
                res.x = +question;
            }
            else 
                {
                throw new Error('Деление на 0 невозможно');
            }
        }
        }
    )}
    
)}
          catch {
                lineInput.textContent = Error.message;
            }
        } 


addText()
