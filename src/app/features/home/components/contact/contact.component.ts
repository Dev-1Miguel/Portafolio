import { Component, signal } from '@angular/core';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';
import { ContactModalComponent } from '../../../../shared/components/contact-modal/contact-modal.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  imports: [SectionShellComponent, RevealOnScrollDirective, ContactModalComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  readonly contactEmail = 'loormv18@gmail.com';
  readonly contactMailto = 'mailto:loormv18@gmail.com?subject=Contacto%20desde%20mi%20portafolio';
  readonly isContactModalOpen = signal(false);

  openContactModal(): void {
    this.isContactModalOpen.set(true);
  }

  closeContactModal(): void {
    this.isContactModalOpen.set(false);
  }
}
