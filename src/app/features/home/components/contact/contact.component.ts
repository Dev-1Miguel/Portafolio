import { Component } from '@angular/core';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-contact',
  imports: [SectionShellComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  readonly contactEmail = 'loormv18@gmail.com';
  readonly contactMailto = 'mailto:loormv18@gmail.com?subject=Contacto%20desde%20mi%20portafolio';
}