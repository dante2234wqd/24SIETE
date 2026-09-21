// Preguntas y respuestas de 24SIETE. Los textos son los mismos que las imágenes
// pregunta1..6.png (que además traían al personaje): acá van solo como texto,
// para que la respuesta viva en una burbuja sin mascota.
// Los saltos de línea (\n) se respetan al renderizar.

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    id: "q1",
    question: "¿Dónde lo consigo?",
    answer:
      "Estamos llegando a kioscos, tiendas y puntos de venta de todo el país.\nSi todavía no lo viste en tu barrio... tranquilo...\nEs cuestión de tiempo.",
  },
  {
    id: "q2",
    question: "¿Lo puedo vender en mi kiosco?",
    answer:
      "Claro que sí.\nSi querés sumar 24SIETE a tu kiosco o negocio, escribimos y te contamos cómo distribuirlo. Mientras más kioscos, más alfajores dando vueltas.",
  },
  {
    id: "q3",
    question: "¿Qué tiene de distinto?",
    answer:
      "No venimos a reinventar el alfajor.\nVenimos a hacerlo bien.\nBuen chocolate, buen relleno y un alfajor que cumple cuando más lo necesitas.",
  },
  {
    id: "q4",
    question: "¿Tiene varios sabores?",
    answer:
      "Por ahora arrancamos con los clásicos que nunca fallan.\nPero esto recién empieza...\nLo que viene después puede ponerse interesante.",
  },
  {
    id: "q5",
    question: "Tengo una idea o quiero colaborar",
    answer:
      "Nos gusta la gente con ideas locas.\nSi tenés algo para proponer, escribimos.\nQuién sabe... capaz sale algo bueno.",
  },
  {
    id: "q6",
    question: "¿24SIETE tiene redes?",
    answer:
      "Obvio.\nSeguinos para enterarte de lanzamientos, drops y cosas raras que se nos ocurren.\nPrometemos no aburrirte.",
  },
]
