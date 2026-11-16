/**
 * Dades de Mármoles Pastor publicades a la seva fitxa de Xarxa Industrial
 * (actualitzada el novembre de 2023). El domini marmolespastor.com no respon.
 */
export const empresa = {
  name: 'Mármoles Pastor',
  legalName: 'Mármoles Pastor, S.L.',
  street: "C/ de l'Electricitat, 17",
  postalCode: '08110',
  city: 'Montcada i Reixac',
  region: 'Barcelona',
  phone: { display: '935 64 54 01', e164: '+34935645401' },
  /** Del domini caigut: pot no funcionar. Confirmar. */
  email: 'marmolespastor@marmolespastor.com',
  instagram: 'https://www.instagram.com/marmolespastor/',
  facebook: 'https://www.facebook.com/M%C3%A1rmoles-Pastor-S-L-202073803915331/',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=41.485127%2C2.173175',
  geo: { lat: 41.485127, lng: 2.173175 },
  /** Text de la fitxa: «Empresa de tradición familiar…». */
  descripcion:
    'Empresa de tradición familiar dedicada a la elaboración de piedra natural, mármol, granito, porcelánico y demás materiales para encimeras de cocina, baños, revestimientos, escaleras y todo lo relacionado con la decoración de interiores.',
} as const;

export const telUrl = `tel:${empresa.phone.e164}`;

export const usos = [
  { t: 'Encimeras de cocina', d: 'Cortadas a la medida de tu cocina, con los huecos para placa y fregadero.' },
  { t: 'Baños', d: 'Encimeras de lavabo, platos de ducha y revestimientos.' },
  { t: 'Escaleras', d: 'Peldaños, rampas y zócalos en piedra.' },
  { t: 'Revestimientos', d: 'Frontales de cocina, paredes y suelos.' },
  { t: 'Decoración de interiores', d: 'Barras, mesas, repisas y piezas a medida.' },
] as const;

export type MaterialId = 'marmol' | 'granito' | 'piedra' | 'porcelanico';
export const materiales: { id: MaterialId; nombre: string; texto: string }[] = [
  { id: 'marmol', nombre: 'Mármol', texto: 'Vetas únicas en cada placa. Elegante en encimeras de baño, escaleras y revestimientos.' },
  { id: 'granito', nombre: 'Granito', texto: 'Muy duro y resistente al calor y a los golpes. Un clásico para la encimera de cocina.' },
  { id: 'piedra', nombre: 'Piedra natural', texto: 'Tonos cálidos y textura viva para suelos, paredes y escaleras.' },
  { id: 'porcelanico', nombre: 'Porcelánico', texto: 'Placas grandes, poco poro y fácil limpieza, con acabados lisos o veteados.' },
];

/** Fotos de la fitxa: treballs reals de l'empresa. */
export const trabajos = [
  { n: 1, t: 'Encimera veteada en blanco', d: 'Cocina con encimera y frontal a juego.' },
  { n: 2, t: 'Encimera y frontal en gris', d: 'Una sola pieza de punta a punta de la cocina.' },
  { n: 3, t: 'Cocina en granito claro', d: 'Encimera en L y península.' },
  { n: 4, t: 'Rampa y escalones', d: 'Piedra clara sobre suelo rojizo, con barandilla.' },
  { n: 5, t: 'Isla en piedra oscura veteada', d: 'Con frontal alto y hueco de fregadero.' },
  { n: 6, t: 'Encimera en verde', d: 'Cocina en L con península de canto redondeado.' },
  { n: 7, t: 'Isla blanca', d: 'Cocina abierta con pared de ladrillo visto.' },
  { n: 8, t: 'Encimera clara en cocina rústica', d: 'Canto redondeado sobre mueble de madera.' },
  { n: 9, t: 'Barra en piedra oscura', d: 'Barra en L con frente de madera.' },
  { n: 10, t: 'Encimera gris con fregadero', d: 'Encimera larga y frontal en el mismo material.' },
] as const;
