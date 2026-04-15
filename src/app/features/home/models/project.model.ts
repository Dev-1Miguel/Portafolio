export interface ProjectTechnology {
  name: string;
  iconClass: string;
  toneClasses: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  previewTag: string;
  previewNote: string;
  previewClasses: string;
  imageUrl?: string;
  imageAlt?: string;
  technologies: ProjectTechnology[];
  stats: ProjectStat[];
  links: ProjectLink[];
}
