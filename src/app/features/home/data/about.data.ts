import { AboutEntry } from '../models/about-entry.model';
import { AboutProfile } from '../models/about-profile.model';

export const ABOUT_PROFILE: AboutProfile = {
  name: 'Miguel Loor',
  imageUrl: 'assets/Perfil.jpg',
  description: [
    'Estudiante de Ingeniería en Software con enfoque en desarrollo backend utilizando .NET (C#) y experiencia en Angular.',
    'He trabajado en proyectos desarrollando APIs REST, lógica de negocio y bases de datos como SQL Server y PostgreSQL.',
    'Busco crecer como desarrollador .NET, aportando compromiso y aprendizaje continuo.'
  ]
};

export const EDUCATION_ENTRIES: AboutEntry[] = [
  {
    title: 'Ingeniería en Software',
    subtitle: 'Universidad Tecnológica',
    period: '2020 - 2024',
    description: 'Formación centrada en desarrollo web, arquitectura de aplicaciones y resolución de problemas.'
  }
];

export const EXPERIENCE_ENTRIES: AboutEntry[] = [
  {
    title: 'Desarrollador Frontend',
    subtitle: 'Proyectos Freelance',
    period: '2023 - Actualidad',
    description: 'Diseño e implemento interfaces modernas priorizando rendimiento, accesibilidad y consistencia visual.'
  }
];
