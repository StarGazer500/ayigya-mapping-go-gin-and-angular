import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MapviewComponent} from '../mapview/mapview.component'
import {SidebarComponent} from '../sidebar/sidebar.component'

import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-main-entry',

  imports: [CommonModule,MapviewComponent,SidebarComponent,FontAwesomeModule],
  templateUrl: './main-entry.component.html',
  styleUrl: './main-entry.component.scss'
})
export class MainEntryComponent {
  isSidebarCollapsed = false;

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
