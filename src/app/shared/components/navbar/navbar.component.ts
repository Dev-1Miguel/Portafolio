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

type ActiveIndicator = {
  left: string;
  width: string;
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChildren('navButton') private readonly navButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  readonly items: NavItem[] = NAV_ITEMS;
  readonly activeHref = signal('#inicio');
  readonly activeIndicator = signal<ActiveIndicator>({ left: '0px', width: '0px' });

  private sections: Array<{ href: string; element: HTMLElement }> = [];
  private pendingScrollTargetHref: string | null = null;
  private indicatorFrameId: number | null = null;

  ngAfterViewInit(): void {
    this.scheduleIndicatorSync();
    this.navButtons?.changes.subscribe(() => this.scheduleIndicatorSync());
    this.setupScrollSpy();
  }

  ngOnDestroy(): void {
    if (this.indicatorFrameId !== null) {
      cancelAnimationFrame(this.indicatorFrameId);
    }
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
      this.pendingScrollTargetHref = item.href;
      this.setActiveItem(item.href, index);
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateActiveSection();
    this.scheduleIndicatorSync();
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
    if (this.shouldKeepClickedItem(currentScroll)) {
      return;
    }

    const nextSection = this.sections
      .filter(({ element }) => element.offsetTop <= currentScroll)
      .at(-1) ?? this.sections[0];

    if (nextSection && nextSection.href !== this.activeHref()) {
      this.setActiveItem(nextSection.href);
    }
  }

  private setActiveItem(href: string, activeIndex = this.items.findIndex((item) => item.href === href)): void {
    this.activeHref.set(href);
    this.scheduleIndicatorSync(activeIndex);
  }

  private shouldKeepClickedItem(currentScroll: number): boolean {
    if (!this.pendingScrollTargetHref) {
      return false;
    }

    const pendingSection = this.sections.find(({ href }) => href === this.pendingScrollTargetHref);
    if (!pendingSection) {
      this.pendingScrollTargetHref = null;
      return false;
    }

    if (pendingSection.element.offsetTop <= currentScroll) {
      this.pendingScrollTargetHref = null;
      return false;
    }

    return true;
  }

  private scheduleIndicatorSync(
    activeIndex = this.items.findIndex((item) => item.href === this.activeHref())
  ): void {
    if (this.indicatorFrameId !== null) {
      cancelAnimationFrame(this.indicatorFrameId);
    }

    this.indicatorFrameId = requestAnimationFrame(() => {
      this.indicatorFrameId = null;
      this.syncIndicator(activeIndex);
    });
  }

  private syncIndicator(activeIndex = this.items.findIndex((item) => item.href === this.activeHref())): void {
    const buttons = this.navButtons?.toArray() ?? [];
    const activeButton = buttons[activeIndex]?.nativeElement;

    if (!activeButton) {
      return;
    }

    this.activeIndicator.set({
      left: `${activeButton.offsetLeft}px`,
      width: `${activeButton.offsetWidth}px`
    });
  }
}
