import { Component } from '@angular/core';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';

type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

@Component({
  selector: 'app-hero',
  imports: [SectionShellComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly socialLinks: SocialLink[] = [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com', icon: 'github' }
  ];

  trackByLabel(_index: number, item: SocialLink): string {
    return item.label;
  }
}
