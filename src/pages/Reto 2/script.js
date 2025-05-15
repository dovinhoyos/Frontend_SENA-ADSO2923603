/**
 * Calcula el área de un círculo dado su radio.
 * @param {number} radio - El radio del círculo (debe ser un número positivo).
 * @returns {number} El área del círculo.
 * @throws {Error} Si el radio no es un número positivo.
 */
const calcularAreaCirculo = (radio) => {
  esRadioValido(radio) ||
    (() => {
      throw new Error("El radio debe ser un número positivo");
    })();
  return Math.PI * Math.pow(radio, 2);
};

/**
 * Verifica si el radio es un número válido y positivo.
 * @param {number} radio - El valor a verificar.
 * @returns {boolean} True si el radio es un número positivo, false en caso contrario.
 */
const esRadioValido = (radio) => {
  return typeof radio === "number" && radio >= 0;
};

/**
 * Devuelve un saludo personalizado.
 * @param {string} nombre - El nombre de la persona a saludar.
 * @returns {string} El saludo personalizado.
 */
const decirHola = (nombre) => {
  return `Hola, ${nombre}`;
};




// /**
//  * Obtiene una lista de posts desde una API externa.
//  * 
//  * @async
//  * @function
//  * @throws {Error} Lanza un error si la solicitud HTTP falla.
//  */
// const obtenerPosts = async () => {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         if (!response.ok) {
//             throw new Error('Error en la solicitud');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error al obtener los posts:', error);
//         return [];
//     }
// };

// obtenerPosts().then(posts => {
//   console.log(posts); // Aquí también verás el arreglo de objetos
// });

// /**
//  * Renders an array of post objects as HTML elements and appends them to the document body.
//  *
//  * @param {Array<{id: number, title: string, body: string}>} posts - An array of post objects to display. Each post should have an `id`, `title`, and `body` property.
//  */
// const mostrarPostsEnHTML = (posts) => {
//     const contenedor = document.createElement('div');
//     contenedor.id = 'posts-contenedor';
//     posts.forEach(post => {
//         const postDiv = document.createElement('div');
//         postDiv.className = 'post';
//         postDiv.innerHTML = `<h1>${post.id}</h1><h3>${post.title}</h3><p>${post.body}</p>`;
//         contenedor.appendChild(postDiv);
//     });
//     document.body.appendChild(contenedor);
// };

// obtenerPosts().then(posts => {
//     mostrarPostsEnHTML(posts);
// });



