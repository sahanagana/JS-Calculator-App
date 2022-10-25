const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.keys')
const display = document.querySelector('.display')

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target
        const action = key.dataset.action
        const keyText = key.textContent
        const displayText = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        //if no action, it is a number key, so we need to do something to the display
        if(!action){
            //if the display is 0 or an operator has been pressed just put the number there
            if(displayText==='0' || previousKeyType ==='operator' || previousKeyType ==='calculate'){
                display.textContent = keyText;
                console.log(keyText)
            }
            else{ // otherwise add the number to what is displayed
                display.textContent = displayText+ keyText;
            }
            calculator.dataset.previousKeyType = 'number'
        }
        //decimal key
        if(action === 'decimal'){
            //add a decimal point if there isn't already one there
            if(!displayText.includes('.')){
                display.textContent = displayText + '.'
            } else if (previousKeyType ==='operator'){
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }
        //operator key
        if(action ==='add' ||
            action ==='subtract' ||
            action === 'divide' ||
            action === 'multiply'){
                //chance color so user knows it is clicked
               key.classList.add('is-depressed') 
               //reset the display
               calculator.dataset.previousKeyType = 'operator'
               //save values and action
               calculator.dataset.firstValue = displayText
               calculator.dataset.operator = action
        }
        
        if(action ==='calculate'){
            const first = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const second  = displayText
            if(first && operator && previousKeyType!=='operator'){
                display.textContent = calculate(first, operator, second)
            }
            Array.from(key.parentNode.children).forEach(
                k => k.classList.remove('is-depressed')
            )
            calculator.dataset.previousKeyType = 'calculate'
        }
        //remove pressed state from all keys
               
        if(action ==='clear'){
            display.textContent = '0'
        }
    }
}

)

/*  function to preform calculation and return calculated value.
    n1: first value
    operator: action to perform
    n2: second value
*/
const calculate = (n1, operator, n2) =>{
    let result = ''
    switch(operator){
        case 'add':
            result = parseFloat(n1)+parseFloat(n2)
            break;
        case 'subtract':
            result = parseFloat(n1)-parseFloat(n2)
            break;
        case 'multiply':
            result = parseFloat(n1)*parseFloat(n2)
            break;
        case 'divide':
            result = parseFloat(n1)/parseFloat(n2)
            break;

    }
    return result
}
