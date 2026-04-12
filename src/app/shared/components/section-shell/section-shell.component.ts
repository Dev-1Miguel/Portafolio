import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-shell',
  templateUrl: './section-shell.component.html'
})
export class SectionShellComponent {
  readonly sectionId = input<string>('');
  readonly extraClasses = input<string>('');
}
