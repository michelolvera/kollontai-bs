// Datos del evento. Morelia usa la hora del centro de México (UTC-6, sin horario de verano).
// Si cambian la fecha o el lugar, actualiza también public/baby-shower-ada-kollontai.ics.
export const EVENT = {
  title: 'Baby Shower de Ada Kollontai',
  start: new Date('2026-10-25T14:00:00-06:00'),
  end: new Date('2026-10-25T19:30:00-06:00'),
  venue: 'Jardín de Mis Amores',
  location: 'Jardín de Mis Amores, Tancítaro #66, Lomas de Guayangareo, 58240 Morelia, Mich., México',
  description:
    'Acompáñanos a celebrar la llegada de nuestra hija Ada Kollontai. Recepción a las 2:00 pm.',
} as const

export const MAP_URL = 'https://maps.app.goo.gl/beY6BebKHFQrDtkPA'
export const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.27797978421!2d-101.16476602499327!3d19.700785881636712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0e01f9a8b14d%3A0x1cd0583ec5b496a4!2sJard%C3%ADn%20de%20Mis%20Amores!5e0!3m2!1ses-419!2smx!4v1790810517895!5m2!1ses-419!2smx'

export const REGISTRY = {
  amazon:
    'https://www.amazon.com.mx/baby-reg/michel-olvera-diciembre-2026-morelia/3BHSFVGN4AK1L',
  liverpool: 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/60052074',
} as const

const WHATSAPP_NUMBER = '524431888765'

function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const RSVP_YES_URL = whatsappUrl(
  '¡Hola! 🎀 Con mucho gusto confirmo mi asistencia al Baby Shower de Ada Kollontai, ' +
    'el domingo 25 de octubre a las 2:00 pm en Jardín de Mis Amores.\n\n' +
    'Nombre: \n' +
    'Número de asistentes: \n\n' +
    '¡Muchas gracias por la invitación, ahí nos vemos!',
)

export const RSVP_NO_URL = whatsappUrl(
  '¡Hola! Muchas gracias por la invitación al Baby Shower de Ada Kollontai. ' +
    'Lamentablemente no podré acompañarlos el domingo 25 de octubre, ' +
    'pero les mando un fuerte abrazo y mis mejores deseos para esta nueva aventura. 💕\n\n' +
    'Nombre: ',
)

export const ICS_URL = '/baby-shower-ada-kollontai.ics'

// 20261025T200000Z
function toCalendarStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export const GOOGLE_CALENDAR_URL =
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT.title,
    dates: `${toCalendarStamp(EVENT.start)}/${toCalendarStamp(EVENT.end)}`,
    details: EVENT.description,
    location: EVENT.location,
    ctz: 'America/Mexico_City',
  }).toString()
