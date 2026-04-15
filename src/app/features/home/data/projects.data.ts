import { ProjectItem } from '../models/project.model';

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'granito-de-mostaza',
    title: 'Granito de mostaza',
    description:
      'Pagina web para un pequeno emprendimiento dedicado a la venta de postres y desayunos, disenada para mostrar sus productos de forma clara, atractiva y cercana.',
    previewTag: 'Emprendimiento',
    previewNote: 'Postres y desayunos',
    previewClasses: 'from-orange-100 via-white to-amber-50 ring-orange-100/80',
    imageUrl: 'assets/GranitodeMostaza.jpg',
    imageAlt: 'Vista del proyecto Granito de mostaza',
    technologies: [
      {
        name: 'Angular',
        iconClass: 'devicon-angularjs-plain colored',
        toneClasses: 'bg-rose-50 text-rose-600 border-rose-100'
      },
      {
        name: 'TypeScript',
        iconClass: 'devicon-typescript-plain colored',
        toneClasses: 'bg-blue-50 text-blue-600 border-blue-100'
      },
      {
        name: 'HTML',
        iconClass: 'devicon-html5-plain colored',
        toneClasses: 'bg-orange-50 text-orange-600 border-orange-100'
      },
      {
        name: 'Tailwind',
        iconClass: 'devicon-tailwindcss-plain colored',
        toneClasses: 'bg-cyan-50 text-cyan-600 border-cyan-100'
      },
      {
        name: 'ASP.NET',
        iconClass: 'devicon-dotnetcore-plain colored',
        toneClasses: 'bg-sky-50 text-sky-600 border-sky-100'
      },
      {
        name: 'SQL Server',
        iconClass: 'devicon-microsoftsqlserver-plain colored',
        toneClasses: 'bg-zinc-100 text-zinc-700 border-zinc-200'
      }
    ],
    stats: [
      { value: 'Web', label: 'branding' },
      { value: 'Menu', label: 'visual' },
      { value: 'Responsive', label: 'mobile' }
    ],
    links: [
      { label: 'Ver demo', href: 'https://example.com/granito-de-mostaza', variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/your-user/granito-de-mostaza', variant: 'secondary' }
    ]
  },
  {
    slug: 'nova-commerce',
    title: 'Proximo proyecto',
    description:
      'Espacio reservado para tu siguiente proyecto destacado, manteniendo la misma presentacion visual moderna y profesional del portafolio.',
    previewTag: 'Portfolio',
    previewNote: 'En preparacion',
    previewClasses: 'from-sky-100 via-white to-cyan-50 ring-sky-100/80',
    technologies: [
      {
        name: 'Angular',
        iconClass: 'devicon-angularjs-plain colored',
        toneClasses: 'bg-rose-50 text-rose-600 border-rose-100'
      },
      {
        name: 'JavaScript',
        iconClass: 'devicon-javascript-plain colored',
        toneClasses: 'bg-amber-50 text-amber-700 border-amber-100'
      },
      {
        name: 'C#',
        iconClass: 'devicon-csharp-plain colored',
        toneClasses: 'bg-violet-50 text-violet-600 border-violet-100'
      },
      {
        name: 'SQL Server',
        iconClass: 'devicon-microsoftsqlserver-plain colored',
        toneClasses: 'bg-zinc-100 text-zinc-700 border-zinc-200'
      }
    ],
    stats: [
      { value: 'UI', label: 'clean' },
      { value: 'Fast', label: 'ready' },
      { value: 'Soon', label: 'launch' }
    ],
    links: [
      { label: 'Ver demo', href: 'https://example.com/nova-commerce', variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/your-user/nova-commerce', variant: 'secondary' }
    ]
  }
];
