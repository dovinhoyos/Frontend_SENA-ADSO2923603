// Espera a que el DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#login-form");
  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#pass");

  /**
   * Obtiene los datos del administrador desde un archivo JSON remoto.
   * @async
   * @returns {Promise<Object|null>} Un objeto con las credenciales del administrador o null si hay error.
   */
  const fetchAdministradorData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/CesarMCuellarCha/Elecciones/refs/heads/main/administrador.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching administrador data:", error);
      return null;
    }
  };

  /**
   * Limpia los campos de entrada del formulario de login.
   */
  const clearInputs = () => {
    usernameInput.value = "";
    passwordInput.value = "";
  };

  /**
   * Valida el login comparando los valores del formulario con los datos del administrador.
   * @async
   * @returns {Promise<boolean>} True si las credenciales son correctas, false en caso contrario.
   */
  const validateLogin = async () => {
    const data = await fetchAdministradorData();
    if (!data) {
      alert("No se pudo obtener la información del administrador.");
      return false;
    }
    const isValid = usernameInput.value === data.username && passwordInput.value === data.password;
    if (isValid) {
      window.location.href = "main-page.html";
      return true;
    } else {
      alert("Usuario o contraseña incorrectos");
      return false;
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await validateLogin();
    clearInputs();
  });

  clearInputs();
});