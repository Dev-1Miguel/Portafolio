import { Component } from '@angular/core';
import { TECHNOLOGY_CATEGORIES } from '../../data/technologies.data';
import { TechnologyCategory, TechnologyItem } from '../../models/technology-category.model';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-technologies',
  imports: [SectionShellComponent, RevealOnScrollDirective],
  templateUrl: './technologies.component.html'
})
export class TechnologiesComponent {
  readonly categories: TechnologyCategory[] = TECHNOLOGY_CATEGORIES;

  readonly iconShellClasses: Record<TechnologyItem['key'], string> = {
    csharp: 'bg-violet-50 text-violet-600 ring-1 ring-violet-100 dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-500/25',
    aspnet: 'bg-sky-50 text-sky-600 ring-1 ring-sky-100 dark:bg-sky-500/15 dark:text-sky-200 dark:ring-sky-500/25',
    angular: 'bg-rose-50 text-rose-600 ring-1 ring-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/25',
    typescript: 'bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-500/25',
    javascript: 'bg-amber-50 text-amber-600 ring-1 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/25',
    html: 'bg-orange-50 text-orange-600 ring-1 ring-orange-100 dark:bg-orange-500/15 dark:text-orange-200 dark:ring-orange-500/25',
    css: 'bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100 dark:bg-cyan-500/15 dark:text-cyan-200 dark:ring-cyan-500/25',
    sqlserver: 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-zinc-700',
    postgresql: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-200 dark:ring-indigo-500/25',
    git: 'bg-orange-50 text-orange-600 ring-1 ring-orange-100 dark:bg-orange-500/15 dark:text-orange-200 dark:ring-orange-500/25',
    figma: 'bg-pink-50 text-pink-600 ring-1 ring-pink-100 dark:bg-pink-500/15 dark:text-pink-200 dark:ring-pink-500/25',
    azure: 'bg-sky-50 text-sky-600 ring-1 ring-sky-100 dark:bg-sky-500/15 dark:text-sky-200 dark:ring-sky-500/25'
  };

  trackByTitle(_index: number, item: TechnologyCategory): string {
    return item.title;
  }

  trackByTechnology(_index: number, item: TechnologyItem): string {
    return item.key;
  }
}
