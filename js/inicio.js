if (!localStorage.loggedInUser) {
  alert("¡Error!\nDebes iniciar sesión");
  location.href = "https://cronoswyt.github.io/TimeQR-Lock/";
}
 window.addEventListener('load', () => {
      document.getElementById('loader').classList.add('hidden');
    });