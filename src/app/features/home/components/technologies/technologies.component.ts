import { Component } from '@angular/core';
import { TECHNOLOGY_CATEGORIES } from '../../data/technologies.data';
import { TechnologyCategory, TechnologyItem } from '../../models/technology-category.model';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-technologies',
  imports: [SectionShellComponent],
  templateUrl: './technologies.component.html'
})
export class TechnologiesComponent {
  readonly categories: TechnologyCategory[] = TECHNOLOGY_CATEGORIES;

  readonly iconShellClasses: Record<TechnologyItem['key'], string> = {
    csharp: 'bg-violet-50 text-violet-600 ring-1 ring-violet-100',
    aspnet: 'bg-sky-50 text-sky-600 ring-1 ring-sky-100',
    angular: 'bg-rose-50 text-rose-600 ring-1 ring-rose-100',
    typescript: 'bg-blue-50 text-blue-600 ring-1 ring-blue-100',
    javascript: 'bg-amber-50 text-amber-600 ring-1 ring-amber-100',
    html: 'bg-orange-50 text-orange-600 ring-1 ring-orange-100',
    css: 'bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100',
    sqlserver: 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200',
    postgresql: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100',
    git: 'bg-orange-50 text-orange-600 ring-1 ring-orange-100',
    figma: 'bg-pink-50 text-pink-600 ring-1 ring-pink-100',
    azure: 'bg-sky-50 text-sky-600 ring-1 ring-sky-100'
  };

  trackByTitle(_index: number, item: TechnologyCategory): string {
    return item.title;
  }

  trackByTechnology(_index: number, item: TechnologyItem): string {
    return item.key;
  }
}
