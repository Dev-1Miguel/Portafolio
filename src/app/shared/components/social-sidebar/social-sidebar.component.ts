import { Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../../features/home/data/social-links.data';
import { SocialLink } from '../../../features/home/models/social-link.model';

@Component({
  selector: 'app-social-sidebar',
  templateUrl: './social-sidebar.component.html'
})
export class SocialSidebarComponent {
  readonly links: SocialLink[] = SOCIAL_LINKS.filter(
    (link) => link.icon === 'linkedin' || link.icon === 'github'
  );

  readonly iconClasses: Record<string, string> = {
    linkedin: 'pi pi-linkedin',
    github: 'pi pi-github',
    instagram: 'pi pi-instagram'
  };

  readonly toneClasses: Record<string, string> = {
    linkedin: 'bg-[#0A66C2] text-white hover:bg-[#0958a5]',
    github: 'bg-zinc-950 text-white hover:bg-zinc-800'
  };

  trackByLabel(_index: number, link: SocialLink): string {
    return link.label;
  }
}
