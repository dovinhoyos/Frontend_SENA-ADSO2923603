// // Selecciona el span que contiene la pregunta
// const pseudoclassNameSpan = document.querySelector('.pseudoclass-name');

// // Selecciona todos los botones con la clase "option"
// const options = document.querySelectorAll('.option');

// // Selecciona el botón "Comenzar"
// const startButton = document.querySelector('.start-button');

// // Define las pseudoclases correspondientes a cada botón
// const pseudoclasses = [':first-child', ':nth-child(2)', ':last-child'];

// // Define las respuestas correctas para cada nivel
// const correctAnswers = [':first-child', ':nth-child(2)', ':last-child'];

// // Variable para rastrear el nivel actual
// let currentLevel = 0;

// // Función para cargar la pregunta del nivel actual
// function loadLevel(level) {
//     // Actualiza la pregunta en el span
//     pseudoclassNameSpan.textContent = correctAnswers[level];

//     // Restaura los estilos y habilita los botones
//     options.forEach(option => {
//         option.style.backgroundColor = '';
//         option.disabled = false; // Habilita los botones
//     });
// }

// // Itera sobre cada botón y asigna el evento de clic
// options.forEach((option, index) => {
//     option.addEventListener('click', () => {
//         // Verifica si la respuesta es correcta
//         if (pseudoclasses[index] === correctAnswers[currentLevel]) {
//             // Cambia el fondo del botón a verde si es correcto
//             option.style.backgroundColor = 'green';
//             option.disabled = true; // Deshabilita el botón correcto
//         } else {
//             // Cambia el fondo del botón a rojo si es incorrecto
//             option.style.backgroundColor = 'red';
//         }

//         // Deshabilita los demás botones
//         options.forEach(btn => {
//             btn.disabled = true;
//         });
//     });
// });

// // Evento para el botón "Comenzar"
// startButton.addEventListener('click', () => {
//     // Avanza al siguiente nivel
//     currentLevel++;

//     // Si hay más niveles, carga el siguiente
//     if (currentLevel < correctAnswers.length) {
//         loadLevel(currentLevel);
//     } else {
//         // Si no hay más niveles, muestra un mensaje de finalización
//         alert('¡Has completado todos los niveles!');
//         currentLevel = 0; // Reinicia el juego
//         loadLevel(currentLevel); // Reinicia al primer nivel
//     }
// });

// // Carga el primer nivel al inicio
// loadLevel(currentLevel);

// Selecciona el span que contiene la pregunta
const pseudoclassNameSpan = document.querySelector(".pseudoclass-name");

// Selecciona todos los botones con la clase "option"
const options = document.querySelectorAll(".option");

// Selecciona el botón "Comenzar"
const startButton = document.querySelector(".start-button");

// Define las pseudoclases correspondientes a cada botón
const pseudoclasses = [":first-child", ":nth-child(2)", ":last-child"];

// Define las respuestas correctas para cada nivel
const correctAnswers = [":first-child", ":nth-child(2)", ":last-child"];

// Variable para rastrear el nivel actual
let currentLevel = 0;

// Variable para contar las respuestas correctas
let correctCount = 0;

// Función para cargar la pregunta del nivel actual
function loadLevel(level) {
  // Actualiza la pregunta en el span
  pseudoclassNameSpan.textContent = correctAnswers[level];

  // Restaura los estilos y habilita los botones
  options.forEach((option) => {
    option.style.backgroundColor = "";
    option.disabled = false; // Habilita los botones
  });

  // Cambia el texto del botón "Comenzar" a "Finalizar" si es el último nivel
  if (level === correctAnswers.length - 1) {
    startButton.textContent = "Finalizar";
  } else if (level > 0) {
    startButton.textContent = "Siguiente";
  } else {
    startButton.textContent = "Comenzar";
  }
}

// Itera sobre cada botón y asigna el evento de clic
options.forEach((option, index) => {
  option.addEventListener("click", () => {
    // Verifica si la respuesta es correcta
    if (pseudoclasses[index] === correctAnswers[currentLevel]) {
      // Cambia el fondo del botón a verde si es correcto
      option.style.backgroundColor = "green";
      option.disabled = true; // Deshabilita el botón correcto
      correctCount++; // Incrementa el contador de respuestas correctas
    } else {
      // Cambia el fondo del botón a rojo si es incorrecto
      option.style.backgroundColor = "red";
    }

    // Deshabilita los demás botones
    options.forEach((btn) => {
      btn.disabled = true;
    });
  });
});

// Evento para el botón "Comenzar"
startButton.addEventListener("click", () => {
  // Avanza al siguiente nivel
  currentLevel++;

  // Si hay más niveles, carga el siguiente
  if (currentLevel < correctAnswers.length) {
    loadLevel(currentLevel);
  } else {
    // Si no hay más niveles, muestra un mensaje de finalización
    alert(
      `¡Has finalizado el juego! Respuestas correctas: ${correctCount} de ${correctAnswers.length}`
    );
    currentLevel = 0; // Reinicia el juego
    correctCount = 0; // Reinicia el contador de respuestas correctas
    loadLevel(currentLevel); // Reinicia al primer nivel
  }
});

// Carga el primer nivel al inicio
loadLevel(currentLevel);
