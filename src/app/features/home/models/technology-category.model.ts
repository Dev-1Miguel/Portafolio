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
    | 'azure';
  label: string;
}

export interface TechnologyCategory {
  title: string;
  technologies: TechnologyItem[];
}
