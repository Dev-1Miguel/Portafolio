import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';

@Component({
  selector: 'app-background-particles',
  templateUrl: './background-particles.component.html',
  styleUrl: './background-particles.component.scss'
})
export class BackgroundParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particlesHost', { static: true })
  private readonly particlesHost?: ElementRef<HTMLDivElement>;

  private static slimLoader: Promise<void> | null = null;
  private static engineInstance: Engine | null = null;

  private container?: Container;

  readonly options: ISourceOptions = {
    background: {
      color: 'transparent'
    },
    detectRetina: true,
    fpsLimit: 60,
    fullScreen: {
      enable: false
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab'
        },
        resize: {
          enable: true
        }
      },
      modes: {
        grab: {
          distance: 150,
          links: {
            opacity: 0.32
          }
        }
      }
    },
    particles: {
      color: {
        value: ['#52525b', '#71717a']
      },
      links: {
        color: '#a1a1aa',
        distance: 150,
        enable: true,
        opacity: 0.22,
        width: 1
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out'
        },
        random: false,
        speed: 0.45,
        straight: false
      },
      number: {
        density: {
          enable: true,
          width: 900,
          height: 900
        },
        value: 52
      },
      opacity: {
        value: {
          min: 0.2,
          max: 0.42
        }
      },
      shape: {
        type: 'circle'
      },
      size: {
        value: {
          min: 1.2,
          max: 2.6
        }
      }
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true
  };

  async ngAfterViewInit(): Promise<void> {
    if (!this.particlesHost?.nativeElement) {
      return;
    }

    const engine = await this.ensureEngine();

    this.container = await engine.load({
      element: this.particlesHost.nativeElement,
      options: this.options
    });
  }

  ngOnDestroy(): void {
    this.container?.destroy();
  }

  private async ensureEngine(): Promise<Engine> {
    if (BackgroundParticlesComponent.engineInstance) {
      return BackgroundParticlesComponent.engineInstance;
    }

    if (!BackgroundParticlesComponent.slimLoader) {
      BackgroundParticlesComponent.slimLoader = this.loadSlimBundle();
    }

    await BackgroundParticlesComponent.slimLoader;

    if (!BackgroundParticlesComponent.engineInstance) {
      throw new Error('tsParticles engine could not be initialized.');
    }

    return BackgroundParticlesComponent.engineInstance;
  }

  private async loadSlimBundle(): Promise<void> {
    const [{ tsParticles }, { loadSlim }] = await Promise.all([
      import('@tsparticles/engine'),
      import('@tsparticles/slim')
    ]);

    await loadSlim(tsParticles);
    BackgroundParticlesComponent.engineInstance = tsParticles;
  }
}
