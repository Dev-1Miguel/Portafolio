import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { BackgroundParticlesComponent } from './shared/components/background-particles/background-particles.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayoutComponent, BackgroundParticlesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Portafolio');
}
