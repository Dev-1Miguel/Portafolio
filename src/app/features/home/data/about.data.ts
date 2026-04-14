import { AboutEntry } from '../models/about-entry.model';
import { AboutProfile } from '../models/about-profile.model';

export const ABOUT_PROFILE: AboutProfile = {
  name: 'Miguel Loor',
  imageUrl: 'assets/Perfil.jpg',
  description: [
    'Estudiante de Ingenieria en Software con enfoque en desarrollo backend utilizando .NET (C#), con experiencia complementaria en Angular.',
    'He participado en proyectos desarrollando APIs REST, logica de negocio y trabajando con bases de datos como SQL Server y PostgreSQL.',
    'Me interesa seguir creciendo como desarrollador .NET, aportando compromiso, aprendizaje continuo y buenas practicas de programacion.'
  ]
};

export const EDUCATION_ENTRIES: AboutEntry[] = [
  {
    title: 'Ingenieria en Software',
    subtitle: 'Universidad de Guayaquil',
    period: '2021 - Actualmente',
    description: 'Formacion centrada en desarrollo web, arquitectura de aplicaciones y resolucion de problemas.'
  }
];

export const EXPERIENCE_ENTRIES: AboutEntry[] = [
  {
    title: 'Pasante Full Stack',
    subtitle: 'Mantenimiento y mejora de plataforma web empresarial',
    period: 'Actualidad',
    description:
      'Encargado del mantenimiento y mejora de la plataforma web principal de la empresa. Trabajo con Angular, .NET y SQL Server para el desarrollo y actualizacion de funcionalidades. Apoyo en la gestion de versiones y control de codigo mediante Azure DevOps con Pull Requests. Tambien participo en la identificacion y resolucion de incidencias para fortalecer la estabilidad y el rendimiento del sistema.'
  }
];
