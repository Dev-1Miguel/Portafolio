import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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
export class NavbarComponent implements AfterViewInit {
  @ViewChildren('navButton') private readonly navButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  readonly items: NavItem[] = NAV_ITEMS;
  readonly activeHref = signal('#inicio');
  readonly indicatorLeft = signal('0px');
  readonly indicatorWidth = signal('0px');

  private sections: Array<{ href: string; element: HTMLElement }> = [];

  ngAfterViewInit(): void {
    this.syncIndicator();
    this.navButtons?.changes.subscribe(() => this.syncIndicator());
    this.setupScrollSpy();
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
    this.updateActiveSection();
    this.syncIndicator();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateActiveSection();
  }

  private setupScrollSpy(): void {
    this.sections = this.items
      .map((item) => ({
        href: item.href,
        element: document.querySelector(item.href)
      }))
      .filter(
        (entry): entry is { href: string; element: HTMLElement } => entry.element instanceof HTMLElement
      );

    if (!this.sections.length) {
      return;
    }

    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    if (!this.sections.length) {
      return;
    }

    const activationOffset = 150;
    const currentScroll = window.scrollY + activationOffset;

    const nextSection = this.sections
      .filter(({ element }) => element.offsetTop <= currentScroll)
      .at(-1) ?? this.sections[0];

    if (nextSection && nextSection.href !== this.activeHref()) {
      this.setActiveItem(nextSection.href);
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
