const clave = "timeqrlock-world-time";
      const lector = new Html5Qrcode("lector");
      //activa el lector QR en el div con ID "lector"
      function mostrar(mensaje, ok) {
        // Función para mostrar un mensaje en pantalla
        const estado = document.getElementById("estado");
        estado.textContent = mensaje; // Muestra el mensaje
        estado.className = ok ? "ok" : "fail"; // Cambia el color del texto según si fue exitoso (ok=true) o fallido
      }
      function descifrarQR(qr) {
        try {
          //Intenta ejecutar algo que puede fallar
          const bytes = CryptoJS.AES.decrypt(qr, clave);
          // Intenta descifrar el contenido cifrado del QR usando la clave
          const texto = bytes.toString(CryptoJS.enc.Utf8);
          // Convierte los datos descifrados a texto legible (UTF-8)
          return JSON.parse(texto);
          //Convierte texto JSON en objeto JavaScript. Falla si el texto no es un JSON válido
          // Convierte el texto (que está en formato JSON) a un objeto de JavaScript
          // Ejemplo: '{"nombre":"Carlos","grado":"6A"}' → {nombre: "Carlos", grado: "6A"}
        } catch (error) {
          //Captura errores de try
          // 🛑 Si hubo un error al descifrar (por ejemplo, si el texto no estaba cifrado correctamente)
          return null;
          // Devuelve null (vacío). Luego, en el programa principal, esto indica que el QR es inválido.
        }
      }
      function mostrarDatos(data) {
        const ahora = new Date(); // Obtiene la hora actual
        document.getElementById("nombre").textContent = data.nombre;
        document.getElementById("grado").textContent = data.grado;
        document.getElementById("doc").textContent = data.documento;
        document.getElementById("hora").textContent = ahora.toLocaleString();// el .toLocaleString sirve para poner hora o fecha pero este esta personalizado
        mostrar("✅ Registro correcto", true);
      }
      function iniciar(camaraId) {
        // ▶️ Inicia la lectura del QR usando la cámara seleccionada
        lector
          .start(
            camaraId,
            {
              fps: 10, // Escanea 10 veces por segundo
              qrbox: 250, // Tamaño del área de escaneo (cuadro visible)
              facingMode: "environment", // Usa la cámara trasera (si es posible)
            },
            (qr) => {
              // ✅ Esta función se ejecuta automáticamente cuando se detecta un código QR
              lector.stop(); // Detiene el lector después de leer un código (solo 1 lectura)
              const datos = descifrarQR(qr); // Intenta descifrar el contenido
              // Verifica si los datos tienen la estructura correcta
              if (datos && datos.nombre && datos.grado && datos.documento) {
                mostrarDatos(datos); // Muestra los datos
                google.script.run.registrarDatos(datos);
                // Envia los datos a una hoja de cálculo de Google
              } else {
                mostrar("❌ QR inválido", false);
              }
            }
          )
          // Captura errores de funciones asincrónicas (promesas)
          .catch(() => {
            // ⚠️ Si hubo un error al iniciar la cámara (permiso denegado, no detectada, etc.)
            mostrar("❌ No se pudo iniciar la cámara", false);
          });
      }
      Html5Qrcode.getCameras().then((camaras) => {
        // 📷 Obtiene la lista de cámaras del dispositivo (frontal, trasera, etc.)
        let trasera = camaras.find((cam) =>
          /back|rear|environment/i.test(cam.label)
        );
        // Busca una cámara con nombre que indique que es trasera
        if (!trasera) trasera = camaras[0];
        // Si no encuentra una cámara trasera, usa la primera que haya
        if (trasera) iniciar(trasera.id);
        // Si encuentra una cámara, la usa para iniciar el escáner
        else mostrar("🚫 No se encontró cámara", false);
        // Si no hay cámaras disponibles, muestra error
      });