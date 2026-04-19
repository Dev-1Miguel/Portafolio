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
  signal
} from '@angular/core';
import { NAV_ITEMS } from '../../data/navigation.data';
import { NavItem } from '../../models/nav-item.model';
import { SectionNavigationService } from '../../services/section-navigation.service';

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

  private readonly sectionNavigation = inject(SectionNavigationService);

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

  private indicatorFrameId: number | null = null;

  constructor() {
    effect(() => {
      this.sectionNavigation.activeHref();
      this.scheduleIndicatorSync();
    });
  }

  ngAfterViewInit(): void {
    this.sectionNavigation.connect(this.items);
    this.scheduleIndicatorSync();
    this.navButtons?.changes.subscribe(() => this.scheduleIndicatorSync());
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
    return this.sectionNavigation.activeHref() === href;
  }

  selectItem(item: NavItem): void {
    this.sectionNavigation.navigateToSection(item.href);
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

    this.indicatorFrameId = requestAnimationFrame(() => {
      this.indicatorFrameId = null;
      this.syncIndicator(activeIndex);
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
}
