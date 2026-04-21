import {
  AfterViewInit,
  Component,
  ElementRef,
  effect,
  inject,
  OnDestroy,
  signal,
  ViewChild
} from '@angular/core';
import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';
import { ResolvedTheme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-background-particles',
  templateUrl: './background-particles.component.html',
  styleUrl: './background-particles.component.scss'
})
export class BackgroundParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particlesHost', { static: true })
  private readonly particlesHost?: ElementRef<HTMLDivElement>;
  private readonly theme = inject(ThemeService);
  private readonly viewReady = signal(false);

  private static slimLoader: Promise<void> | null = null;
  private static engineInstance: Engine | null = null;

  private container?: Container;
  private renderRequestId = 0;

  constructor() {
    effect(() => {
      this.theme.currentTheme();

      if (!this.viewReady()) {
        return;
      }

      void this.renderParticles();
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.viewReady.set(true);
  }

  ngOnDestroy(): void {
    this.renderRequestId += 1;
    this.container?.destroy();
  }

  private async renderParticles(): Promise<void> {
    const host = this.particlesHost?.nativeElement;

    if (!host) {
      return;
    }

    const requestId = ++this.renderRequestId;
    const engine = await this.ensureEngine();

    if (requestId !== this.renderRequestId) {
      return;
    }

    this.container?.destroy();

    const nextContainer = await engine.load({
      element: host,
      options: this.buildOptions(this.theme.currentTheme())
    });

    if (!nextContainer) {
      return;
    }

    if (requestId !== this.renderRequestId) {
      nextContainer.destroy();
      return;
    }

    this.container = nextContainer;
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

  private buildOptions(theme: ResolvedTheme): ISourceOptions {
    const isDark = theme === 'dark';

    return {
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
              opacity: isDark ? 0.24 : 0.32
            }
          }
        }
      },
      particles: {
        color: {
          value: isDark ? ['#cbd5e1', '#94a3b8'] : ['#52525b', '#71717a']
        },
        links: {
          color: isDark ? '#64748b' : '#a1a1aa',
          distance: 150,
          enable: true,
          opacity: isDark ? 0.18 : 0.22,
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
            min: isDark ? 0.16 : 0.2,
            max: isDark ? 0.32 : 0.42
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
  }
}
