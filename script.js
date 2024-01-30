let btn = document.querySelectorAll('.btn');
let screen = document.getElementById('screen');
let delBtn = document.getElementById('delBtn');
let equalBtn = document.getElementById('equalBtn');
let resetBtn = document.getElementById('resetBtn');

btn.forEach(button => {
    button.addEventListener("click", getBtnValue);
});

function getBtnValue(event) {
    let btnValue = event.target.dataset.val;


    if (btnValue === "." && screen.value.match(/[-+*\/]/g)) {

        let operandArr = screen.value.split(/[-+*\/]/g);
        for (i = 1; i < operandArr.length; i++)
            if (operandArr[(operandArr.length - 1)].includes(".")) {
                return false;
            }

            else if (operandArr[(operandArr.length - 1)] === "") {
                btnValue = event.target.dataset.val2;
            }
        return screen.value = (screen.value + btnValue).replace(/,/g, "");
    }

    else if (btnValue === "." && screen.value.includes(".")) {
        return;
    }

    else if (btnValue === "." && screen.value === "") {
        btnValue = event.target.dataset.val2;
    }

    if (btnValue === "0" && screen.value.match(/[-+*\/]/g)) {

        let operandArr = screen.value.split(/[-+*\/]/g);
        for (i = 1; i < operandArr.length; i++) {
            if (operandArr[(operandArr.length - 1)] === "") {
                return;
            }

            return screen.value = (screen.value + btnValue).replace(/,/g, "");
        }
    }

    else if (btnValue === "0" && screen.value === "") {
        return;
    }


    if (btnValue.match(/[+*\/]/g) && screen.value.match(/[+*\/]/g)) {

        let operandArr = screen.value.split(/[+*\/]/g);
        for (i = 1; i < operandArr.length; i++) {
            if (operandArr[(operandArr.length - 1)] === "") {
                return;
            }

            return screen.value = (screen.value + btnValue).replace(/,/g, "");
        }
    }

    screen.value = (screen.value + btnValue).replace(/,/g, "");
}


equalBtn.addEventListener('click', evaluateScreenVal);

function evaluateScreenVal() {

    if (screen.value === "") {
        screen.value = "";
    }

    else if (isFinite(eval(screen.value)) == false || isNaN(eval(screen.value)) == true) {
        screen.value = "Math Error";
        setTimeout(resetAll, 3000);
    }

    else {
        let answer = screen.value.replace(/,/g, "");
        screen.value = eval(answer).toLocaleString('en-Us');
    }
}

delBtn.addEventListener('click', delOneChar);

function delOneChar() {
    let screenDel = screen.value.replace(/,/g, "");
    screen.value = screenDel.substr(0, screenDel.length - 1);

    if (screen.value === "") {
        screen.value = "";
    }
}

resetBtn.addEventListener('click', resetAll);

function resetAll() {
    screen.value = "";
    screen.value = "";
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/[0-9+\-*/.=]/.test(key)) {
        const btn = document.querySelector(`.btn[data-val="${key}"]`);
        if (btn) {
            btn.click();
        }
    }
    if (key === "Backspace") {
        delOneChar();
    }
    if (key === "Enter") {
        evaluateScreenVal();
    }
    if (key === "Escape") {
        resetAll();
    }
});
