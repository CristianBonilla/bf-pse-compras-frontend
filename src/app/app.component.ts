import { Component } from '@angular/core';
import { SCROLLBAR_OPTIONS, ScrollbarOptions } from '@shared/constants/scrollbar-config';

@Component({
  selector: 'bf-pc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...SCROLLBAR_OPTIONS,
    overflow: {
      x: 'visible-hidden'
    }
  };
}
