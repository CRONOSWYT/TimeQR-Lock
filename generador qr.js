 function generarQR() {
      const nombre = document.getElementById("nombre").value;
      const grado = document.getElementById("grado").value;
      if (!nombre || !grado) {
        alert("Completa todos los campos.");
        return;
      }
      const datos = JSON.stringify({ nombre, grado });
      const clave = "timeqrlock_2025";
      const cifrado = CryptoJS.AES.encrypt(datos, clave).toString();
      document.getElementById("qrcode").innerHTML = "";
      new QRCode(document.getElementById("qrcode"), {
        text: cifrado,
        width: 200,
        height: 200
      });
    }