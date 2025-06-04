// 1. Array de respuestas
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

// 2. Variable global para almacenar la voz en español
let vozEspanol = null;

// 3. Función para cargar las voces disponibles en el navegador
function cargarVoces() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    // Si aún no hay voces, reintenta dentro de 200 ms
    setTimeout(cargarVoces, 200);
    return;
  }
  // Busca la primera voz cuyo código LANG empiece por "es" (es-ES, es-MX, etc.)
  vozEspanol = voices.find(v => v.lang.startsWith('es')) || null;
}

// 4. Ejecutar carga de voces y responder a cambios en la lista de voces
cargarVoces();
window.speechSynthesis.onvoiceschanged = cargarVoces;

// 5. Referencias DOM
const btnConsultar = document.getElementById('btn-consultar');
const preguntaElem = document.getElementById("pregunta");
const respuestaElem = document.getElementById("respuesta");

// 6. Función que se llama cuando el usuario hace click en "Consultar"
function consultarOraculo() {
  const pregunta = preguntaElem.value.trim();
  if (pregunta === "") {
    respuestaElem.textContent = "Escribe una pregunta primero.";
    // Forzar reinicio de animación fadeIn
    respuestaElem.classList.remove("fadeIn");
    void respuestaElem.offsetWidth;
    respuestaElem.classList.add("fadeIn");
    return;
  }

  // Elegir un índice aleatorio
  const indice = Math.floor(Math.random() * respuestas.length);
  const textoRespuesta = respuestas[indice];
  respuestaElem.textContent = textoRespuesta;

  // Aplicar la animación fadeIn
  respuestaElem.classList.remove("fadeIn");
  void respuestaElem.offsetWidth; // Forzar reflujo
  respuestaElem.classList.add("fadeIn");

  // --- TEXT-TO-SPEECH ---
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(textoRespuesta);
    msg.rate = 1; // velocidad normal

    if (vozEspanol) {
      msg.voice = vozEspanol;
    } else {
      msg.lang = 'es-ES'; // Si no encontramos voz, indicamos al menos el idioma
    }

    // Cancelar cualquier utterance previo y reproducir el nuevo
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }
}

// 7. Asociar el listener al botón (click)
btnConsultar.addEventListener('click', consultarOraculo);
