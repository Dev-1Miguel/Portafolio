import { ProjectItem } from '../models/project.model';

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'trajectory',
    title: 'Trajectory',
    description:
      'Aplicacion web y movil para registrar ingresos, gastos, transferencias e inversiones, con dashboard financiero, reportes mensuales, gestion de categorias, billeteras y autenticacion segura.',
    previewTag: 'PROYECTO PERSONAL',
    previewNote: 'Web y movil',
    previewClasses: 'from-sky-100 via-white to-cyan-50 ring-sky-100/80 dark:from-sky-500/18 dark:via-slate-950/40 dark:to-cyan-500/12 dark:ring-white/10',
    imageUrl: 'assets/Trajectoria.jpg',
    imageAlt: 'Vista del proyecto Trajectory',
    technologies: [
      {
        name: 'Angular',
        iconClass: 'devicon-angularjs-plain colored',
        toneClasses: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/25'
      },
      {
        name: 'TypeScript',
        iconClass: 'devicon-typescript-plain colored',
        toneClasses: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/15 dark:text-blue-200 dark:border-blue-500/25'
      },
      {
        name: 'Ionic',
        iconClass: 'devicon-ionic-original colored',
        toneClasses: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-200 dark:border-indigo-500/25'
      },
      {
        name: 'NestJS',
        iconClass: 'devicon-nestjs-plain colored',
        toneClasses: 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/15 dark:text-red-200 dark:border-red-500/25'
      },
      {
        name: 'SQL Server',
        iconClass: 'devicon-microsoftsqlserver-plain colored',
        toneClasses: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800/90 dark:text-zinc-200 dark:border-zinc-700'
      },
      {
        name: 'Azure',
        iconClass: 'devicon-azure-plain colored',
        toneClasses: 'bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-500/15 dark:text-sky-200 dark:border-sky-500/25'
      }
    ],
    stats: [
      { value: 'App', label: 'mobile' },
      { value: 'Finanzas', label: 'dashboard' },
      { value: 'Segura', label: 'auth' }
    ],
    links: [
      { label: 'Ver proyecto', href: 'https://trajec-toria.netlify.app/auth/login', variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/Dev-1Miguel/Trajectory-Front', variant: 'secondary' }
    ]
  },
  {
    slug: 'granito-de-mostaza',
    title: 'Granito de mostaza',
    description:
      'Pagina web para un pequeno emprendimiento dedicado a la venta de postres y desayunos, disenada para mostrar sus productos de forma clara, atractiva y cercana.',
    previewTag: 'Emprendimiento',
    previewNote: 'Postres y desayunos',
    previewClasses: 'from-orange-100 via-white to-amber-50 ring-orange-100/80 dark:from-orange-500/18 dark:via-slate-950/40 dark:to-amber-500/12 dark:ring-white/10',
    imageUrl: 'assets/GranitodeMostaza.jpg',
    imageAlt: 'Vista del proyecto Granito de mostaza',
    technologies: [
      {
        name: 'Angular',
        iconClass: 'devicon-angularjs-plain colored',
        toneClasses: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/25'
      },
      {
        name: 'TypeScript',
        iconClass: 'devicon-typescript-plain colored',
        toneClasses: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/15 dark:text-blue-200 dark:border-blue-500/25'
      },
      {
        name: 'HTML',
        iconClass: 'devicon-html5-plain colored',
        toneClasses: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/15 dark:text-orange-200 dark:border-orange-500/25'
      },
      {
        name: 'Tailwind',
        iconClass: 'devicon-tailwindcss-plain colored',
        toneClasses: 'bg-cyan-50 text-cyan-600 border-cyan-100 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-500/25'
      },
      {
        name: 'ASP.NET',
        iconClass: 'devicon-dotnetcore-plain colored',
        toneClasses: 'bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-500/15 dark:text-sky-200 dark:border-sky-500/25'
      },
      {
        name: 'SQL Server',
        iconClass: 'devicon-microsoftsqlserver-plain colored',
        toneClasses: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800/90 dark:text-zinc-200 dark:border-zinc-700'
      }
    ],
    stats: [
      { value: 'Web', label: 'branding' },
      { value: 'Menu', label: 'visual' },
      { value: 'Responsive', label: 'mobile' }
    ],
    links: [
      { label: 'Ver proyecto', href: 'https://granitodemostaza.netlify.app/', variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/Dev-1Miguel/GranitoMostazaFront-End', variant: 'secondary' }
    ]
  }
];
