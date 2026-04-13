import { Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../data/social-links.data';
import { SocialLink } from '../../models/social-link.model';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-hero',
  imports: [SectionShellComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly socialLinks: SocialLink[] = SOCIAL_LINKS;

  trackByLabel(_index: number, item: SocialLink): string {
    return item.label;
  }
}
