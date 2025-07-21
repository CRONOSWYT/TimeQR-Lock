// Usuarios y contraseñas predefinidos en arreglos
      const usuarios = ["admin"];
      const contrasenas = ["1234"];

      function login() {
        const user = document.getElementById("lu").value;
        const pass = document.getElementById("lP").value;

        // Buscar si el usuario y contraseña coinciden en el mismo índice
        const index = usuarios.indexOf(user);
        if (index !== -1 && contrasenas[index] === pass) {
          localStorage.setItem("loggedInUser", user);
          window.location.href = "https://cronoswyt.github.io/TimeQR-Lock/inicio";
        } else {
          document.getElementById("mensaje").textContent =
            "Usuario o contraseña incorrectos";
        }
      }