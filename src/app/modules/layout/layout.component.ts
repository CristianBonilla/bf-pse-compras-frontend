import { Component } from '@angular/core';
import { SCROLLBAR_OPTIONS, ScrollbarOptions } from '@shared/constants/scrollbar-config';

@Component({
  selector: 'bf-pc-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...SCROLLBAR_OPTIONS,
    overflow: {
      x: 'visible-hidden'
    }
  };
}
