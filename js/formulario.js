document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registroForm');
  const limpiarBtn = document.getElementById('limpiar');

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validarPassword(password) {
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    return tieneMayuscula && tieneNumero && password.length >= 6 && password.length <= 18;
  }

  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const usuario = form.usuario.value.trim();
    const correo = form.correo.value.trim();
    const clave = form.clave.value;
    const repetirClave = form.repetirClave.value;
    const fechaNacimiento = form.fechaNacimiento.value;

    if (!nombre || !usuario || !correo || !clave || !repetirClave || !fechaNacimiento) {
      alert('Todos los campos excepto la dirección son obligatorios.');
      return;
    }

    if (!validarEmail(correo)) {
      alert('El correo electrónico no tiene un formato válido.');
      return;
    }

    if (clave !== repetirClave) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!validarPassword(clave)) {
      alert('La contraseña debe contener al menos un número, una letra mayúscula y tener entre 6 y 18 caracteres.');
      return;
    }

    const edad = calcularEdad(fechaNacimiento);
    if (edad < 13) {
      alert('Debes tener al menos 13 años para registrarte.');
      return;
    }

    alert('Formulario enviado correctamente.');
    form.reset();
  });

  limpiarBtn.addEventListener('click', function () {
    form.reset();
  });
});
