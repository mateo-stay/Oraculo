const respuestas = [
  "Sí, absolutamente.",
  "No cuentes con ello.",
  "Puede que sí, puede que no...",
  "Las estrellas dicen que sí.",
  "Ni en tus sueños.",
  "Consulta de nuevo más tarde.",
  "Parece prometedor.",
  "No tengo suficiente información.",
  "Claro que sí.",
  "Jajaja, ¿en serio preguntaste eso?"
];

function consultarOraculo() {
  const pregunta = document.getElementById("pregunta").value;
  const respuesta = document.getElementById("respuesta");

  if (pregunta.trim() === "") {
    respuesta.textContent = "Escribe una pregunta primero.";
    // Reinicia la animación
    respuesta.classList.remove("fadeIn");
    void respuesta.offsetWidth; // Forzar reflujo para reiniciar la animación
    respuesta.classList.add("fadeIn");
    return;
  }

  const indice = Math.floor(Math.random() * respuestas.length);
  respuesta.textContent = respuestas[indice];
  
  // Reinicia la animación para cada respuesta
  respuesta.classList.remove("fadeIn");
  void respuesta.offsetWidth;
  respuesta.classList.add("fadeIn");
}