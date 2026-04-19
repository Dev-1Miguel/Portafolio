import { Component } from '@angular/core';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';
import { PROJECTS } from '../../data/projects.data';
import { ProjectItem, ProjectLink, ProjectTechnology } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  imports: [SectionShellComponent, RevealOnScrollDirective],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  readonly projects: ProjectItem[] = PROJECTS;

  trackByProject(_index: number, item: ProjectItem): string {
    return item.slug;
  }

  trackByTechnology(_index: number, item: ProjectTechnology): string {
    return item.name;
  }

  trackByLink(_index: number, item: ProjectLink): string {
    return `${item.label}-${item.href}`;
  }
}
