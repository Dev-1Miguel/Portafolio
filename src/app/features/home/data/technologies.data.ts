import { TechnologyCategory } from '../models/technology-category.model';

export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  {
    title: 'Backend',
    technologies: [
      { key: 'csharp', label: 'C#' },
      { key: 'aspnet', label: 'ASP.NET' }
    ]
  },
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
    title: 'Base de Datos',
    technologies: [
      { key: 'sqlserver', label: 'SQL Server' },
      { key: 'postgresql', label: 'PostgreSQL' }
    ]
  },
  {
    title: 'Herramientas',
    technologies: [
      { key: 'git', label: 'Git' },
      { key: 'figma', label: 'Figma' }
    ]
  }
];
