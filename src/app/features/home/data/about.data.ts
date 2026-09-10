import { AboutEntry } from '../models/about-entry.model';
import { AboutProfile } from '../models/about-profile.model';

export const ABOUT_PROFILE: AboutProfile = {
  name: 'Miguel Loor',
  imageUrl: 'assets/Perfil.jpg',
  description: [
    'Desarrollador de software junior con experiencia en desarrollo y mantenimiento de aplicaciones empresariales en produccion.',
    'He trabajado con Angular, NestJS, ASP.NET con C#, APIs REST, SQL Server y Azure DevOps, desarrollando interfaces, logica de negocio y bases de datos.',
    'Me interesa seguir creciendo como desarrollador full stack, aportando compromiso, aprendizaje continuo y buenas practicas de programacion.'
  ]
};

export const EDUCATION_ENTRIES: AboutEntry[] = [
  {
    title: 'Ingenieria en Software',
    subtitle: 'Universidad de Guayaquil',
    period: 'Marzo 2021 - Actualidad',
    description: 'Formacion academica completada (10 semestres); trabajo de titulacion pendiente.'
  }
];

export const EXPERIENCE_ENTRIES: AboutEntry[] = [
  {
    title: 'Pasante de Desarrollo',
    subtitle: 'Red de Servicios Facilito',
    period: 'Marzo 2026 - Agosto 2026',
    description:
      'Desarrolle y mantuve funcionalidades para aplicaciones empresariales con Angular, NestJS y SQL Server. Participe en la modernizacion de una aplicacion legada, implemente mas de 30 endpoints y realice despliegues con Git y Azure DevOps.'
  }
];
