import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';
import { SectionNavigationService } from '../../../../shared/services/section-navigation.service';

@Component({
  selector: 'app-hero',
  imports: [SectionShellComponent, RevealOnScrollDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly sectionNavigation = inject(SectionNavigationService);

  readonly heroTitle = 'Ingeniero de Software Junior';
  readonly resumeUrl = 'assets/CV_Miguel_Loor_Vera.pdf';

  readonly typedTitle = signal('');
  readonly typingComplete = signal(false);

  private typingTimeoutId: number | null = null;
  private typingIntervalId: number | null = null;

  ngOnInit(): void {
    const characters = Array.from(this.heroTitle);
    const characterDelay = 95;
    const startDelay = 180;

    this.typingTimeoutId = window.setTimeout(() => {
      let currentIndex = 0;

      this.typingIntervalId = window.setInterval(() => {
        currentIndex += 1;
        this.typedTitle.set(characters.slice(0, currentIndex).join(''));

        if (currentIndex >= characters.length) {
          this.typingComplete.set(true);

          if (this.typingIntervalId !== null) {
            clearInterval(this.typingIntervalId);
            this.typingIntervalId = null;
          }
        }
      }, characterDelay);
    }, startDelay);
  }

  ngOnDestroy(): void {
    if (this.typingTimeoutId !== null) {
      clearTimeout(this.typingTimeoutId);
    }

    if (this.typingIntervalId !== null) {
      clearInterval(this.typingIntervalId);
    }
  }

  goToProjects(): void {
    this.sectionNavigation.navigateToSection('#proyectos');
  }
}
