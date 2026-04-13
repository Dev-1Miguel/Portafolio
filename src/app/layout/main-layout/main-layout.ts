import { Component } from '@angular/core';
import { AboutComponent } from '../../features/home/components/about/about.component';
import { HeroComponent } from '../../features/home/components/hero/hero.component'
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  imports: [NavbarComponent, HeroComponent, AboutComponent]
})
export class MainLayoutComponent {}
