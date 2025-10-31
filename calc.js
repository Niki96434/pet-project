const listAction = ['x + y', 'x - y', 'x * y', 'x / y', 'x ^ y', 'x ^ (1/y)'];
// console.log(listAction[1])
function Calc() {  
    for (;;) {
    const x = parseInt(prompt('Выберите 1e число:'));
    console.log(x);
    for (let i = 0; i < listAction.length; i++) {
                let a = listAction[i]
                let b = i
                let action = a + ' is ' + b
                console.log(action)
            }
    const question = parseInt(prompt('Выберите действие:'));
    console.log(question);
    const y = parseInt(prompt('Выберите 2e число:'));
    console.log(y);
    switch (question) {
        case 0:
            const add = x + y;
            console.log(add);
            break

        case 1:
            const deduc = x - y;
            console.log(deduc);
            break

        case 2:
            const multi = x * y;
            console.log(multi);
            break

        case 3:
            const separ = x / y;
            const err = (separ != Infinity) ? console.log(separ) : 'Делить на 0 нельзя'
            console.log();
            break

        case 4:
            const degree = x ** y;
            console.log(degree);
            break

        case 5:
            const node = x ** (1/y);
            console.log(node);
            break
    }
}
}
Calc()
        
        
        // console.log(question);
            // for (let i = 0; i < listAction.length; i++) {
            //     let a = listAction[i] + '-' + i;
            //     return a
            // }



        // let calc = (x, y) => {
        //     console.log('Выберите 1е число:');
        //     const num1 = parseInt(prompt(''));
        //     if ((x > 0) && (y > 0) ) { 
        //         for (let elem of listAction) {
        //         console.log(listAction.at[i])}
        //     }
        // }
        // calc(1, 2)bb
        // const num1 = prompt('');
        // console.log(num1);
    