import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChildren,
  effect,
  inject,
  signal,
  NgZone
} from '@angular/core';
import { NAV_ITEMS } from '../../data/navigation.data';
import { NavItem } from '../../models/nav-item.model';
import { SectionNavigationService } from '../../services/section-navigation.service';
import { ThemeService } from '../../services/theme.service';

type ActiveIndicator = {
  left: string;
  width: string;
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('navButton') private readonly navButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  private readonly sectionNavigation = inject(SectionNavigationService);
  private readonly theme = inject(ThemeService);
  private readonly ngZone = inject(NgZone);

  readonly items: NavItem[] = NAV_ITEMS;
  readonly iconClasses: Record<string, string> = {
    home: 'pi pi-home',
    user: 'pi pi-user',
    folder: 'pi pi-folder',
    tech: 'pi pi-code',
    experience: 'pi pi-briefcase',
    contact: 'pi pi-envelope'
  };
  readonly activeIndicator = signal<ActiveIndicator>({ left: '0px', width: '0px' });
  readonly currentTheme = this.theme.currentTheme;

  private indicatorFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    effect(() => {
      this.sectionNavigation.activeHref();
      this.scheduleIndicatorSync();
    });
  }

  ngAfterViewInit(): void {
    this.sectionNavigation.connect(this.items);
    this.setupResizeObserver();
    this.scheduleIndicatorSync();
    this.navButtons?.changes.subscribe(() => {
      this.setupResizeObserver();
      this.scheduleIndicatorSync();
    });
  }

  ngOnDestroy(): void {
    if (this.indicatorFrameId !== null) {
      cancelAnimationFrame(this.indicatorFrameId);
    }
    this.resizeObserver?.disconnect();
  }

  trackByHref(_index: number, item: NavItem): string {
    return item.href;
  }

  isActive(href: string): boolean {
    return this.sectionNavigation.activeHref() === href;
  }

  selectItem(item: NavItem): void {
    this.sectionNavigation.navigateToSection(item.href);
  }

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  themeToggleLabel(): string {
    return this.currentTheme() === 'dark'
      ? 'Cambiar a tema claro'
      : 'Cambiar a tema oscuro';
  }

  @HostListener('window:resize')
  onResize(): void {
    this.sectionNavigation.connect(this.items);
    this.scheduleIndicatorSync();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.sectionNavigation.syncActiveSection();
  }

  private scheduleIndicatorSync(
    activeIndex = this.items.findIndex((item) => item.href === this.sectionNavigation.activeHref())
  ): void {
    if (this.indicatorFrameId !== null) {
      cancelAnimationFrame(this.indicatorFrameId);
    }

    this.ngZone.runOutsideAngular(() => {
      this.indicatorFrameId = requestAnimationFrame(() => {
        this.indicatorFrameId = null;
        this.syncIndicator(activeIndex);
      });
    });
  }

  private syncIndicator(
    activeIndex = this.items.findIndex((item) => item.href === this.sectionNavigation.activeHref())
  ): void {
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

  private setupResizeObserver(): void {
    this.resizeObserver?.disconnect();

    if (typeof window === 'undefined' || !this.navButtons) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleIndicatorSync();
    });

    this.navButtons.forEach((btn) => this.resizeObserver?.observe(btn.nativeElement));
  }
}
