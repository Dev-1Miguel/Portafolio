import { Component } from '@angular/core';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';
import { EXPERIENCE_ITEMS } from '../../data/experience.data';
import { ExperienceItem, ExperienceKind } from '../../models/experience.model';

@Component({
  selector: 'app-experience',
  imports: [SectionShellComponent, RevealOnScrollDirective],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  readonly items: ExperienceItem[] = EXPERIENCE_ITEMS;

  readonly badgeClasses: Record<ExperienceKind, string> = {
    professional: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/25',
    personal: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-sky-500/15 dark:text-sky-200 dark:ring-sky-500/25',
    education: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/25'
  };

  readonly dotClasses: Record<ExperienceKind, string> = {
    professional: 'bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.12)] dark:shadow-[0_0_0_6px_rgba(16,185,129,0.24)]',
    personal: 'bg-sky-500 shadow-[0_0_0_6px_rgba(14,165,233,0.12)] dark:shadow-[0_0_0_6px_rgba(14,165,233,0.24)]',
    education: 'bg-amber-500 shadow-[0_0_0_6px_rgba(245,158,11,0.14)] dark:shadow-[0_0_0_6px_rgba(245,158,11,0.26)]'
  };

  trackByPeriod(_index: number, item: ExperienceItem): string {
    return `${item.period}-${item.title}`;
  }
}
