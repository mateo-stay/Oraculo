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
  const respuestaElem = document.getElementById("respuesta");

  if (pregunta.trim() === "") {
    respuestaElem.textContent = "Escribe una pregunta primero.";
    respuestaElem.classList.remove("fadeIn");
    void respuestaElem.offsetWidth;
    respuestaElem.classList.add("fadeIn");
    return;
  }

  const indice = Math.floor(Math.random() * respuestas.length);
  const textoRespuesta = respuestas[indice];
  respuestaElem.textContent = textoRespuesta;

  // Aplicar animación
  respuestaElem.classList.remove("fadeIn");
  void respuestaElem.offsetWidth;
  respuestaElem.classList.add("fadeIn");

  // --- TEXT-TO-SPEECH ---
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(textoRespuesta);
    msg.lang = 'es-ES'; // Español de España / Latinoamérica
    msg.rate = 1;       // Velocidad normal
    window.speechSynthesis.speak(msg);
  }
}
