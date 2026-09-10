import { ExperienceItem } from '../models/experience.model';

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: 'Marzo 2026 - Agosto 2026',
    title: 'Pasante de Desarrollo - Red de Servicios Facilito',
    type: 'Profesional',
    kind: 'professional',
    description: [
      'Migre el modulo de Acreditaciones desde una aplicacion legada hacia Angular, NestJS y SQL Server; la nueva version fue desplegada a produccion.',
      'Desarrolle y mantuve funcionalidades en siete modulos empresariales de usuarios, agencias, instituciones, acreditaciones, reversos operativos y disponibilidad de productos.',
      'Implemente mas de 30 endpoints en NestJS con controladores, validaciones e integracion con procedimientos almacenados en SQL Server.',
      'Cree y rediseñe procedimientos almacenados para nuevos flujos y modernizacion de logica existente entre multiples bases de datos y servidores.',
      'Implemente la activacion y desactivacion masiva de productos; atendi cinco incidencias y participe en tres despliegues a produccion con Git y Azure DevOps.'
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
