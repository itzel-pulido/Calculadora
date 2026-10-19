/* Obtener los elementos HTML */
const pantalla = document.getElementById("pantalla");
const botonesNumericos = document.querySelectorAll(".numero");
const botonesOperacion = document.querySelectorAll(".operacion");

/* Variables para almacenar la operación */
let primerNumero = null;
let operador = null;
let esperandoSegundoNumero = false;

/* Capturar números */
botonesNumericos.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const numero = boton.dataset.numero;
        
        if (esperandoSegundoNumero || pantalla.value === "0") {
    pantalla.value = numero;
    esperandoSegundoNumero = false;
} else {
    pantalla.value += numero;
}
    });
});

/* Seleccionar operación */
botonesOperacion.forEach(function(boton) {
    boton.addEventListener("click", function() {
        primerNumero = Number(pantalla.value);
        operador = boton.dataset.operacion;
        esperandoSegundoNumero = true;
    });
});


/* Obtener el botón de resultado */
const botonResultado = document.getElementById("resultado");

/* Realizar la operación seleccionada */
botonResultado.addEventListener("click", function() {
    if (operador === null || esperandoSegundoNumero) {
        return;
    }

    const segundoNumero = Number(pantalla.value);
    let resultado;

    switch (operador) {
        case "+":
            resultado = primerNumero + segundoNumero;
            break;

        case "-":
            resultado = primerNumero - segundoNumero;
            break;

        case "*":
            resultado = primerNumero * segundoNumero;
            break;

        case "/":
            if (segundoNumero === 0) {
                pantalla.value = "Error: división entre cero";
                pantalla.classList.add("mensaje-error");
                primerNumero = null;
                operador = null;
                esperandoSegundoNumero = true;
                return;
            }

            resultado = primerNumero / segundoNumero;
            break;
    }

    pantalla.value = String(resultado);
    pantalla.classList.remove("mensaje-error");
    primerNumero = resultado;
    operador = null;
    esperandoSegundoNumero = true;
});

/* Botón de limpiar */
const botonLimpiar = document.getElementById("limpiar");

/* Reiniciar la calculadora */
botonLimpiar.addEventListener("click", function() {
    pantalla.value = "";
    pantalla.classList.remove("mensaje-error");

    primerNumero = null;
    operador = null;
    esperandoSegundoNumero = false;
});
