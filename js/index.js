let usuarios = [                         // Declaramos un arreglo llamado "usuarios"
  { "usuario": "admin", "contraseña": "1234" },  // Primer objeto: usuario "admin" con contraseña "1234"
  { "usuario": "lll", "contraseña": "1234" }     // Segundo objeto: usuario "lll" con contraseña "1234"
];

function validarLogin() {                // Función para validar el inicio de sesión
  let nombre = document.getElementById("nombre").value;         // Obtiene el valor ingresado en el campo con id "nombre"
  let contraseña = document.getElementById("contraseña").value; // Obtiene el valor ingresado en el campo con id "contraseña"
  let encontrado = false;                // Variable booleana para indicar si se encontró un usuario válido
  // Recorre el arreglo de usuarios
  for (let i = 0; i < usuarios.length; i++) {
    // Compara si el usuario y la contraseña ingresados coinciden con algún objeto del arreglo
    if (usuarios[i].usuario === nombre && usuarios[i].contraseña === contraseña) {
      encontrado = true;   // Si encuentra coincidencia, cambia la variable a true
      break;               // Sale del bucle porque ya no es necesario seguir buscando
    }
  }
  if (encontrado) {  // Si las credenciales fueron correctas
    localStorage.setItem("logueado", "true");      // Guarda en el almacenamiento local que el usuario está logueado
    localStorage.setItem("usuario", nombre);       // Guarda el nombre de usuario en localStorage
    window.location.href = "inicio.html";          // Redirige a la página "inicio.html"
  } else {
    alert("Usuario o contraseña incorrectos");     // Muestra una alerta si no coincide ningún usuario
  }
}
