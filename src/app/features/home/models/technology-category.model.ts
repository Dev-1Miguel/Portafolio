export interface TechnologyItem {
  key:
    | 'csharp'
    | 'aspnet'
    | 'angular'
    | 'typescript'
    | 'javascript'
    | 'html'
    | 'css'
    | 'sqlserver'
    | 'postgresql'
    | 'git'
    | 'figma'
    | 'azure'
    | 'nestjs'
    | 'firebase';
  label: string;
}

export interface TechnologyCategory {
  title: string;
  technologies: TechnologyItem[];
}
