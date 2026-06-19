import { ExperienceItem } from '../models/experience.model';

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: '2026 - Actualidad',
    title: 'Pasante Full Stack - Red de Servicios Facilito',
    type: 'Profesional',
    kind: 'professional',
    description: [
      'Participacion en el mantenimiento y evolucion de aplicaciones empresariales utilizando Angular, ASP.NET con C# y SQL Server.',
      'Desarrollo de nuevos modulos, funcionalidades y APIs, integrando frontend, backend y logica de base de datos.',
      'Mantenimiento y mejora de procedimientos almacenados, consultas y procesos internos orientados a la estabilidad del sistema.',
      'Gestion y validacion de cambios mediante Azure DevOps, apoyando el control de versiones y despliegues en distintos ambientes.',
      'Desarrollo de modulo para gestion de desactivacion de productos utilizando Angular, NestJS y SQL Server.'
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
