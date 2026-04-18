import { Component } from '@angular/core';
import { ExperienceComponent } from '../../features/home/components/experience/experience.component';
import { HeroComponent } from '../../features/home/components/hero/hero.component';
import { TechnologiesComponent } from '../../features/home/components/technologies/technologies.component';
import { ContactComponent } from '../../features/home/components/contact/contact.component';
import { ProjectsComponent } from "../../features/home/components/projects/projects.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, TechnologiesComponent, ProjectsComponent, ExperienceComponent, ContactComponent, FooterComponent],
  templateUrl: './main-layout.html'
})
export class MainLayoutComponent {}
