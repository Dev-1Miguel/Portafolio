import { TechnologyCategory } from '../models/technology-category.model';

export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
    {
    title: 'Frontend',
    technologies: [
      { key: 'angular', label: 'Angular' },
      { key: 'typescript', label: 'TypeScript' },
      { key: 'javascript', label: 'JavaScript' },
      { key: 'html', label: 'HTML' },
      { key: 'css', label: 'CSS' }
    ]
  },
  {
    title: 'Backend',
    technologies: [
      { key: 'csharp', label: 'C#' },
      { key: 'aspnet', label: 'ASP.NET' },
      { key: 'nestjs', label: 'NestJS' }
    ]
  },
  {
    title: 'Base de Datos',
    technologies: [
      { key: 'sqlserver', label: 'SQL Server' },
      { key: 'postgresql', label: 'PostgreSQL' },
      { key: 'firebase', label: 'Firebase' }
    ]
  },
  {
    title: 'Herramientas',
    technologies: [
      { key: 'git', label: 'Git' },
      { key: 'figma', label: 'Figma' },
      { key: 'azure', label: 'Azure' }
    ]
  }
];
