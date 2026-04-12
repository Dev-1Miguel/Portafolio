import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  signal
} from '@angular/core';

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChildren('navButton') private readonly navButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  readonly items: NavItem[] = [
    { label: 'Inicio', href: '#inicio', icon: 'home' },
    { label: 'Acerca', href: '#acerca', icon: 'user' },
    { label: 'Proyectos', href: '#proyectos', icon: 'folder' },
    { label: 'Servicios', href: '#servicios', icon: 'service' }
  ];
  readonly activeHref = signal('#inicio');
  readonly indicatorLeft = signal('0px');
  readonly indicatorWidth = signal('0px');

  ngAfterViewInit(): void {
    this.syncIndicator();
    this.navButtons?.changes.subscribe(() => this.syncIndicator());
  }

  trackByHref(_index: number, item: NavItem): string {
    return item.href;
  }

  isActive(href: string): boolean {
    return this.activeHref() === href;
  }

  selectItem(item: NavItem, index: number): void {
    this.activeHref.set(item.href);
    this.syncIndicator(index);

    const target = document.querySelector(item.href);
    if (target instanceof HTMLElement) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.syncIndicator();
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
