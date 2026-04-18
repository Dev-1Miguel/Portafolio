import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SectionShellComponent } from '../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-hero',
  imports: [SectionShellComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly heroTitle = 'Ingeniero de Software Junior';
  readonly resumeUrl = 'assets/CV-Miguel-Loor.pdf';

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
}
