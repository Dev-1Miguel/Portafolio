import { Component } from '@angular/core';
import { ABOUT_PROFILE, EDUCATION_ENTRIES, EXPERIENCE_ENTRIES } from '../../data/about.data';
import { AboutEntry } from '../../models/about-entry.model';
import { AboutProfile } from '../../models/about-profile.model';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-about',
  imports: [SectionShellComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  readonly profileData: AboutProfile = ABOUT_PROFILE;
  readonly educationEntries: AboutEntry[] = EDUCATION_ENTRIES;
  readonly experienceEntries: AboutEntry[] = EXPERIENCE_ENTRIES;

  trackByTitle(_index: number, item: AboutEntry): string {
    return item.title;
  }
}
