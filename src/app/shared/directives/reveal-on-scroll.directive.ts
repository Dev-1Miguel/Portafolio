import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
  input
} from '@angular/core';

type RevealVariant = 'up' | 'left' | 'right' | 'scale';

@Directive({
  selector: '[appRevealOnScroll]'
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  readonly revealVariant = input<RevealVariant>('up', { alias: 'revealVariant' });
  readonly revealDelay = input<number>(0, { alias: 'revealDelay' });
  readonly revealOnce = input<boolean>(true, { alias: 'revealOnce' });
  readonly revealThreshold = input<number>(0.18, { alias: 'revealThreshold' });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly ngZone = inject(NgZone);

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.addClass(element, 'reveal-on-scroll');
    this.renderer.addClass(element, `reveal-${this.revealVariant()}`);
    this.renderer.setStyle(element, '--reveal-delay', `${this.revealDelay()}ms`);

    if (this.prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.reveal();

              if (this.revealOnce()) {
                this.observer?.unobserve(entry.target);
              }
            } else if (!this.revealOnce()) {
              this.hide();
            }
          }
        },
        {
          threshold: this.revealThreshold(),
          rootMargin: '0px 0px -8% 0px'
        }
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private reveal(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'reveal-visible');
  }

  private hide(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'reveal-visible');
  }

  private prefersReducedMotion(): boolean {
    return typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
