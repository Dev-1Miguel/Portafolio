import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChildren,
  signal
} from '@angular/core';
import { NAV_ITEMS } from '../../data/navigation.data';
import { NavItem } from '../../models/nav-item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('navButton') private readonly navButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  readonly items: NavItem[] = NAV_ITEMS;
  readonly activeHref = signal('#inicio');
  readonly indicatorLeft = signal('0px');
  readonly indicatorWidth = signal('0px');

  private observer?: IntersectionObserver;
  private readonly visibleSections = new Map<string, number>();

  ngAfterViewInit(): void {
    this.syncIndicator();
    this.navButtons?.changes.subscribe(() => this.syncIndicator());
    this.setupScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  trackByHref(_index: number, item: NavItem): string {
    return item.href;
  }

  isActive(href: string): boolean {
    return this.activeHref() === href;
  }

  selectItem(item: NavItem, index: number): void {
    const target = document.querySelector(item.href);
    if (target instanceof HTMLElement) {
      this.setActiveItem(item.href, index);
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.syncIndicator();
  }

  private setupScrollSpy(): void {
    const sections = this.items
      .map((item) => ({
        href: item.href,
        element: document.querySelector(item.href)
      }))
      .filter(
        (entry): entry is { href: string; element: HTMLElement } => entry.element instanceof HTMLElement
      );

    if (!sections.length) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;

          if (entry.isIntersecting) {
            this.visibleSections.set(href, entry.intersectionRatio);
          } else {
            this.visibleSections.delete(href);
          }
        }

        const nextHref = [...this.visibleSections.entries()]
          .sort((left, right) => right[1] - left[1])
          .at(0)?.[0];

        if (nextHref && nextHref !== this.activeHref()) {
          this.setActiveItem(nextHref);
        }
      },
      {
        rootMargin: '-22% 0px -48% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7]
      }
    );

    for (const section of sections) {
      this.observer.observe(section.element);
    }
  }

  private setActiveItem(href: string, activeIndex = this.items.findIndex((item) => item.href === href)): void {
    this.activeHref.set(href);
    this.syncIndicator(activeIndex);
  }

  private syncIndicator(activeIndex = this.items.findIndex((item) => item.href === this.activeHref())): void {
    const buttons = this.navButtons?.toArray() ?? [];
    const activeButton = buttons[activeIndex]?.nativeElement;

    if (!activeButton) {
      return;
    }

    this.indicatorLeft.set(`${activeButton.offsetLeft}px`);
    this.indicatorWidth.set(`${activeButton.offsetWidth}px`);
  }
}
