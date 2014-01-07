var T = 0;
var Z = 0;
var Y = 0;
var constant = 1;
var calculator, display, exponentDisplay;
var enterClicked = true;
var resultCalculated = false;
var arcPressed = false;
var enteringExponent = false;

function init() {
    calculator = document.getElementById("calculator");
    display = document.getElementById("display");
    exponentDisplay = document.getElementById("exponent");

    display.value = "0";

    updateTestDisplays();
}

function getDisplay() {
    if (getExponent() == "" || getExponent() == "00") {
        return display.value;
    } else {
        return (display.value*Math.pow(10, parseInt(getExponent()))).toExponential();
    }
}

function addToDisplay(val) {
    if (enteringExponent) {
        if (getExponent() == "00") {
            exponentDisplay.value = "0" + val;
        } else {
            exponentDisplay.value = exponentDisplay.value.substr(exponentDisplay.value.length - 1) + val;
            enteringExponent = false;
            enterClicked = true;
        }
    } else {
        if (enterClicked) {
            clearExponent();
            display.value = val;
            enterClicked = false;
        } else if (resultCalculated) {
            display.value = val;
        } else {
            display.value += val;
        }
    }
}

function setDisplay(val) {
    display.value = val;
}

function clearDisplay() {
    display.value = "0";
    clearExponent();
}

function setConstant(val) {
    constant = val;
}

function getConstant() {
    return constant;
}

function setExponent(val) {
    exponentDisplay.value = val;
}

function getExponent() {
    return exponentDisplay.value;
}

function clearExponent() {
    exponentDisplay.value = "";
}

function store(val) {
    T = Z;
    Z = Y;
    Y = val;
}

function dropDown(result) {
    setDisplay(result);
    Y = Z;
    Z = T;
}

function clearMemSlots() {
    clearDisplay();
    T = 0;
    Z = 0;
    Y = 0;
}

function rollDown() {
    var dis = getDisplay();
    setDisplay(Y);
    Y = Z;
    Z = T;
    T = dis;
}

function toRadians(angle) {
    return angle*(Math.PI/180);
}

function toDegrees(angle) {
    return angle*(180/Math.PI);
}

function updateTestDisplays() {
    document.getElementById("T").value = T;
    document.getElementById("Z").value = Z;
    document.getElementById("Y").value = Y;
    document.getElementById("sto").value = constant;
}

function buttonClick(type, val) {
    if (arcPressed && type != "sin" && type != "cos" && type != "tan") {
        arcPressed = false;
    }
    switch (type) {
        case "num":
            if (resultCalculated && !enteringExponent) {
                store(getDisplay());
            }
            if (val == "pi") {
                if (!resultCalculated) {
                    store(getDisplay());
                }
                setDisplay(Math.PI);
                resultCalculated = true;
            } else {
                addToDisplay(val);
                resultCalculated = false;
            }
            break;
        case ".":
            if (resultCalculated) {
                store(getDisplay());
                setDisplay(".");
                resultCalculated = false;
            }
            if (getDisplay().indexOf(".") == -1) {
                addToDisplay(".");
            }
            break;
        case "clear":
            clearMemSlots();
            enterClicked = true;
            break;
        case "clx":
            clearDisplay();
            enterClicked = true;
            break;
        case "enter":
            store(getDisplay());
            enterClicked = true;
            enteringExponent = false;
            break;
        case "+":
            var result = (parseFloat(Y)+parseFloat(getDisplay()));
            dropDown(result);
            resultCalculated = true;
            break;
        case "-":
            var result = (parseFloat(Y)-parseFloat(getDisplay()));
            dropDown(result);
            resultCalculated = true;
            break;
        case "x":
            var result = (parseFloat(Y)*parseFloat(getDisplay()));
            dropDown(result);
            resultCalculated = true;
            break;
        case "/":
            var result = (parseFloat(Y)/parseFloat(getDisplay()));
            dropDown(result);
            resultCalculated = true;
            break;
        case "e^x":
            var result = Math.exp(parseFloat(getDisplay()));
            setDisplay(result);
            resultCalculated = true;
            break;
        case "1/x":
            var result = (1/parseFloat(getDisplay()));
            setDisplay(result);
            resultCalculated = true;
            break;
        case "^1/2":
            var result = Math.sqrt(parseFloat(getDisplay()));
            setDisplay(result);
            resultCalculated = true;
            break;
        case "arc":
            arcPressed = true;
            break;
        case "sin":
            var result;
            if (arcPressed) {
                result = toDegrees(Math.asin(parseFloat(getDisplay())));
                arcPressed = false;
            } else {
                result = Math.sin(toRadians(parseFloat(getDisplay())));
            }
            setDisplay(result);
            resultCalculated = true;
            break;
        case "cos":
            var result;
            if (arcPressed) {
                result = toDegrees(Math.acos(parseFloat(getDisplay())));
                arcPressed = false;
            } else {
                result = Math.cos(toRadians(parseFloat(getDisplay())));
            }
            setDisplay(result);
            resultCalculated = true;
            break;
        case "tan":
            var result;
            if (arcPressed) {
                result = toDegrees(Math.atan(parseFloat(getDisplay())));
                arcPressed = false;
            } else {
                result = Math.tan(toRadians(parseFloat(getDisplay())));
            }
            setDisplay(result);
            resultCalculated = true;
            break;
        case "x^y":
            var result = Math.pow(parseFloat(getDisplay()), parseFloat(Y));
            dropDown(result);
            resultCalculated = true;
            break;
        case "x<>y":
            var dis = getDisplay();
            setDisplay(Y);
            Y = dis;
            resultCalculated = true;
            break;
        case "log":
            var result = Math.log(parseFloat(getDisplay()))/Math.LN10;
            setDisplay(result);
            resultCalculated = true;
            break;
        case "ln":
            var result = Math.log(parseFloat(getDisplay()));
            setDisplay(result);
            resultCalculated = true;
            break;
        case "roll":
            rollDown();
            resultCalculated = true;
            break;
        case "sto":
            setConstant(getDisplay());
            enterClicked = true;
            break;
        case "rcl":
            store(getDisplay());
            setDisplay(getConstant());
            break;
        case "chs":
            setDisplay((-1)*parseFloat(getDisplay()));
            break;
        case "ees":
            /************************
             * * * EXTRA CREDIT * * *
             ************************/
            // Exponents get stored to memory
            // in the toExponential() form.
            // Recalling exponents from memory
            // currently just converts from
            // scientific notation to long form
            if (getDisplay() == 0) {
                setDisplay("1");
            }
            setExponent("00");
            enteringExponent = true;
            break;
        default:
            break;
    }

    updateTestDisplays();
}