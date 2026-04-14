import { Component } from '@angular/core';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-hero',
  imports: [SectionShellComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly heroImageUrl = 'assets/Perfil.jpg';
  readonly heroImageAlt = 'Retrato de Miguel';
}
