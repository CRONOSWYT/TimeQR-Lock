 function generarQR() {
        const nombre = document.getElementById("nombre").value.trim();
        const grado = document.getElementById("grado").value.trim();
        const documento = document.getElementById("documento").value.trim();

        if (!nombre || !grado || !documento) {
          alert("Por favor completa todos los campos.");
          return;
        }

        const datos = JSON.stringify({
          nombre: nombre,
          grado: grado,
          documento: documento,
        });

        // Encriptar los datos (puedes cambiar la clave secreta)
        const claveSecreta = "timeqrlock";
        const datosCifrados = CryptoJS.AES.encrypt(
          datos,
          claveSecreta
        ).toString();

        // Limpiar QR anterior
        document.getElementById("qrcode").innerHTML = "";

        // Generar QR
        new QRCode(document.getElementById("qrcode"), {
          text: datosCifrados,
          width: 256,
          height: 256,
        });
      }
       window.addEventListener('load', () => {
      document.getElementById('loader').classList.add('hidden');

    });
