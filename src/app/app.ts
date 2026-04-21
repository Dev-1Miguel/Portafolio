import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { BackgroundParticlesComponent } from './shared/components/background-particles/background-particles.component';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayoutComponent, BackgroundParticlesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Portafolio');
  private readonly themeService = inject(ThemeService);
}
