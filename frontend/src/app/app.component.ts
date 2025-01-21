import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainEntryComponent} from './components/main-entry/main-entry.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MainEntryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
