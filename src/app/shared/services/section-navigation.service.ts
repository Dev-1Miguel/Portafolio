import { Injectable, signal } from '@angular/core';

import { NavItem } from '../models/nav-item.model';

type SectionEntry = {
  href: string;
  element: HTMLElement;
};

@Injectable({ providedIn: 'root' })
export class SectionNavigationService {
  readonly activeHref = signal<string>('#inicio');

  private sections: SectionEntry[] = [];
  private pendingScrollTargetHref: string | null = null;
  private readonly viewportAnchorOffset = 132;

  connect(items: readonly NavItem[]): void {
    this.sections = items
      .map((item) => ({
        href: item.href,
        element: this.querySection(item.href)
      }))
      .filter((entry): entry is SectionEntry => entry.element instanceof HTMLElement);

    if (!this.sections.length) {
      return;
    }

    const hasActiveSection = this.sections.some(({ href }) => href === this.activeHref());
    if (!hasActiveSection) {
      this.activeHref.set(this.sections[0].href);
    }

    this.syncActiveSection();
  }

  navigateToSection(href: string): void {
    const target = this.findSection(href)?.element ?? this.querySection(href);
    if (!target) {
      return;
    }

    this.pendingScrollTargetHref = href;
    this.activeHref.set(href);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  syncActiveSection(): void {
    if (!this.sections.length || typeof window === 'undefined') {
      return;
    }

    const viewportAnchor = Math.max(this.viewportAnchorOffset, window.innerHeight * 0.24);
    if (this.shouldKeepPendingTarget(viewportAnchor)) {
      return;
    }

    const nextSection =
      this.findSectionAtViewportAnchor(viewportAnchor) ??
      this.findClosestSectionToViewportAnchor(viewportAnchor) ??
      this.sections[0];

    if (nextSection && nextSection.href !== this.activeHref()) {
      this.activeHref.set(nextSection.href);
    }
  }

  private shouldKeepPendingTarget(viewportAnchor: number): boolean {
    if (!this.pendingScrollTargetHref) {
      return false;
    }

    const pendingSection = this.findSection(this.pendingScrollTargetHref);
    if (!pendingSection) {
      this.pendingScrollTargetHref = null;
      return false;
    }

    const { top, bottom } = pendingSection.element.getBoundingClientRect();
    if (top <= viewportAnchor && bottom > viewportAnchor) {
      this.pendingScrollTargetHref = null;
      return false;
    }

    return true;
  }

  private findSection(href: string): SectionEntry | undefined {
    return this.sections.find((section) => section.href === href);
  }

  private findSectionAtViewportAnchor(viewportAnchor: number): SectionEntry | null {
    return (
      this.sections.find(({ element }) => {
        const { top, bottom } = element.getBoundingClientRect();
        return top <= viewportAnchor && bottom > viewportAnchor;
      }) ?? null
    );
  }

  private findClosestSectionToViewportAnchor(viewportAnchor: number): SectionEntry | null {
    return this.sections.reduce<SectionEntry | null>((closest, section) => {
      const distance = Math.abs(section.element.getBoundingClientRect().top - viewportAnchor);
      const closestDistance = closest
        ? Math.abs(closest.element.getBoundingClientRect().top - viewportAnchor)
        : Number.POSITIVE_INFINITY;

      return distance < closestDistance ? section : closest;
    }, null);
  }

  private querySection(href: string): HTMLElement | null {
    if (typeof document === 'undefined') {
      return null;
    }

    const section = document.querySelector(href);
    return section instanceof HTMLElement ? section : null;
  }
}
