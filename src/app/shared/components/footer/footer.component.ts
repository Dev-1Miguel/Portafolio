import { Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../../features/home/data/social-links.data';
import { SocialLink } from '../../../features/home/models/social-link.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly links: SocialLink[] = SOCIAL_LINKS.filter(
    (link) => link.icon === 'linkedin' || link.icon === 'github'
  );

  readonly iconClasses: Record<string, string> = {
    linkedin: 'pi pi-linkedin',
    github: 'pi pi-github',
    instagram: 'pi pi-instagram'
  };

  trackByLabel(_index: number, link: SocialLink): string {
    return link.label;
  }
}
