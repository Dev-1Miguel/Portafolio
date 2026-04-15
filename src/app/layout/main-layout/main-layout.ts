import { Component } from '@angular/core';
import { HeroComponent } from '../../features/home/components/hero/hero.component';
import { TechnologiesComponent } from '../../features/home/components/technologies/technologies.component';
import { ProjectsComponent } from "../../features/home/components/projects/projects.component";
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, TechnologiesComponent, ProjectsComponent],
  templateUrl: './main-layout.html'
})
export class MainLayoutComponent {}
