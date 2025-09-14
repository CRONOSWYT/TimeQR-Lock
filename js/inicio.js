         // Verificamos si hay sesión
    const logueado = localStorage.getItem("logueado");

    if (logueado !== "true") {
      // Si no hay sesión, redirige a inicio
      window.location.href = "https://cronoswyt.github.io/TimeQR-Lock/";
    } else {
      // Mostrar
    }