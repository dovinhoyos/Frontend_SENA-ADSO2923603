const inputs = document.querySelectorAll("input");
inputs[0].indeterminate = true;

// Selecciona los elementos necesarios
const input1 = document.querySelector("#number1");
const input2 = document.querySelector("#number2");
const result = document.querySelector("#result");
const btnSumar = document.querySelector("#sumar");
const btnRestar = document.querySelector("#restar");
const btnMultiplicar = document.querySelector("#multiplicacion");

const btnDividir = document.querySelector("#division");

// Función para realizar la suma
function sumarValores() {
    const value1 = parseFloat(input1.value.trim());
    const value2 = parseFloat(input2.value.trim());

    if (isNaN(value1) || isNaN(value2)) {
        result.textContent = "Por favor, ingresa valores numéricos válidos.";
        result.style.color = "red"; // Cambia el color del texto para indicar error
    } else {
        result.textContent = `${value1} + ${value2} = ${value1 + value2}`;
        result.style.color = "green"; // Cambia el color del texto para indicar éxito
    }
}

const mostrarResultado = (mensaje) => {
    result.textContent = mensaje;
}

// Función para realizar la resta
const restarValores = () => {
    const value1 = parseFloat(input1.value.trim());
    const value2 = parseFloat(input2.value.trim());

    if (isNaN(value1) || isNaN(value2)) {
        mostrarResultado("Por favor, ingresa valores numéricos válidos.");
    } else {
        mostrarResultado(`${value1} - ${value2} = ${value1 - value2}`);
    }
};

// Función para realizar la multiplicación
const multiplicarValores = () => {
    const value1 = parseFloat(input1.value.trim());
    const value2 = parseFloat(input2.value.trim());

    if (isNaN(value1) || isNaN(value2)) {
        mostrarResultado("Por favor, ingresa valores numéricos válidos.");
    } else {
        mostrarResultado(`${value1} * ${value2} = ${value1 * value2}`);
    }
};

function dividirValores(){
    const value1 = parseFloat(input1.value)
    const value2 = parseFloat(input2.value)

    if (isNaN(value1) || isNaN(value2)) {
        result.textContent = "Por favor, ingresa valores numéricos válidos.";
    }else{
        result.textContent = "El resultado es: " + (value1 / value2);
    }
}

// Agrega el evento de clic al botón
btnSumar.addEventListener("click", sumarValores);
btnRestar.addEventListener("click", restarValores);
btnMultiplicar.addEventListener("click", multiplicarValores);
btnDividir.addEventListener("click", dividirValores)

// Agrega un evento para limpiar el mensaje de resultado al modificar los inputs
[input1, input2].forEach(input => {
    input.addEventListener("input", () => {
        result.textContent = "";
    });
});


