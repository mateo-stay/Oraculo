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

// 2. Variable global para guardar TODAS las voces disponibles
let todasLasVoces = [];

// 3. Función que carga las voces del sistema
function cargarVoces() {
  todasLasVoces = window.speechSynthesis.getVoices();
  if (!todasLasVoces.length) {
    // Si aún no hay voces, reintentamos dentro de 200 ms
    setTimeout(cargarVoces, 200);
    return;
  }

  // Una vez cargadas, mostramos en consola las voces en español
  mostrarOpcionesDeVoz();
}

// 4. Mostrar en consola todas las voces disponibles en español
function mostrarOpcionesDeVoz() {
  const vocesEnEspanol = todasLasVoces.filter(v => v.lang.startsWith('es'));
  console.log("Voces en Español disponibles:");
  vocesEnEspanol.forEach((voz, idx) => {
    console.log(`${idx + 1}. "${voz.name}" (${voz.lang})`);
  });
  // Por ejemplo, verías algo como:
  // 1. "Jorge" (es-ES)
  // 2. "Luciana" (es-AR)
  // 3. "Diego" (es-MX)
  // 4. "Sara" (es-ES)
  // ... según las voces que tengas instaladas.
}

// 5. Llamar a cargarVoces() y asignar listener para cambios en la lista
cargarVoces();
window.speechSynthesis.onvoiceschanged = cargarVoces;

// 6. Referencias a elementos del DOM
const btnConsultar   = document.getElementById('btn-consultar');
const preguntaElem   = document.getElementById("pregunta");
const respuestaElem  = document.getElementById("respuesta");

// 7. Función que “habla” el texto usando la voz que elijas
//    Si no pasas nombreVozDeseada, usará la primera voz en español
function hablarConVoz(textoRespuesta, nombreVozDeseada = null) {
  if (!('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(textoRespuesta);
  utterance.rate = 1; // velocidad normal

  if (nombreVozDeseada) {
    // Buscamos en todasLasVoces la que coincida exactamente
    const vozSeleccionada = todasLasVoces.find(v => v.name === nombreVozDeseada);
    if (vozSeleccionada) {
      utterance.voice = vozSeleccionada;
    } else {
      // Si no existe, forzamos idioma español genérico (usar voz por defecto)
      utterance.lang = 'es-ES';
      console.warn(`No se encontró la voz "${nombreVozDeseada}". Se usará la voz por defecto en español.`);
    }
  } else {
    // Si no especificas nombre, tomamos la primera voz en español
    const primeraVozEs = todasLasVoces.find(v => v.lang.startsWith('es'));
    if (primeraVozEs) {
      utterance.voice = primeraVozEs;
    } else {
      utterance.lang = 'es-ES'; // fallback
    }
  }

  // Cancelar cualquier utterance anterior antes de hablar
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// 8. Función principal: se llama cuando el usuario hace clic en “Consultar”
function consultarOraculo() {
  const pregunta = preguntaElem.value.trim();

  if (pregunta === "") {
    respuestaElem.textContent = "Escribe una pregunta primero.";
    // Reiniciar animación fadeIn
    respuestaElem.classList.remove("fadeIn");
    void respuestaElem.offsetWidth;
    respuestaElem.classList.add("fadeIn");
    return;
  }

  // Elegir una respuesta aleatoria
  const indice = Math.floor(Math.random() * respuestas.length);
  const textoRespuesta = respuestas[indice];
  respuestaElem.textContent = textoRespuesta;

  // Animación fadeIn
  respuestaElem.classList.remove("fadeIn");
  void respuestaElem.offsetWidth;
  respuestaElem.classList.add("fadeIn");

  // --- TEXT-TO-SPEECH con voz específica ---
  // Aquí debes escribir exactamente el nombre de la voz que quieras (según lo que viste en consola)
  // Por ejemplo, para usar “Luciana” (si tu dispositivo la tiene instalada):
  hablarConVoz(textoRespuesta, "Luciana");

  // Si prefieres que el sistema seleccione la primera voz en español disponible:
  // hablarConVoz(textoRespuesta);
}

// 9. Asociar el listener al botón
btnConsultar.addEventListener('click', consultarOraculo);
