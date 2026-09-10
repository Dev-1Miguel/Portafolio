import { ExperienceItem } from '../models/experience.model';

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: 'Marzo 2026 - Agosto 2026',
    title: 'Pasante de Desarrollo - Red de Servicios Facilito',
    type: 'Profesional',
    kind: 'professional',
    description: [
      'Participe en la modernizacion de una aplicacion legada hacia Angular, NestJS y SQL Server, desplegada posteriormente a produccion.',
      'Desarrolle y mantuve funcionalidades en varias aplicaciones empresariales, integrando interfaces, APIs y procesos de base de datos.',
      'Implemente mas de 30 endpoints en NestJS con controladores, validaciones e integracion con procedimientos almacenados en SQL Server.',
      'Cree y rediseñe procedimientos almacenados para nuevos flujos y la modernizacion de logica existente.',
      'Atendi incidencias y participe en despliegues a produccion utilizando Git y Azure DevOps.'
    ]
  },
  {
    period: '2024 - 2025',
    title: 'BookChange - Prototipo Web para Biblioteca Universitaria',
    type: 'Proyecto en equipo',
    kind: 'education',
    description: [
      'Participe en el desarrollo de un prototipo de aplicacion web orientado a la gestion e intercambio de libros.',
      'Implemente los modulos de usuarios y gestion de libros (CRUD), utilizando Angular, ASP.NET Core y SQL Server.',
      'Colabore en la integracion del frontend con APIs REST dentro de un entorno de trabajo en equipo.'
    ]
  }
];
