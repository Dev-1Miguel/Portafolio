import { Component } from '@angular/core';
import { HeroComponent } from '../../features/home/components/hero/hero.component'
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  imports: [NavbarComponent, HeroComponent]
})
export class MainLayoutComponent {}
