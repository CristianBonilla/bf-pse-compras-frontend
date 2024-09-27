import { Component } from '@angular/core';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from '@constants/scrollbar-config';

@Component({
  selector: 'bf-pc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflow: {
      x: 'visible-hidden'
    }
  };
}
