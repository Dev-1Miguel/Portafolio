import { Component } from '@angular/core';
import { HeroComponent } from '../../features/home/components/hero/hero.component';
import { TechnologiesComponent } from '../../features/home/components/technologies/technologies.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  imports: [NavbarComponent, HeroComponent, TechnologiesComponent]
})
export class MainLayoutComponent {}
