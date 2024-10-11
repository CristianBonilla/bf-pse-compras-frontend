import { Component } from '@angular/core';
import { FOOTER_INFO } from '@shared/constants/footer-info.constants';

@Component({
  selector: 'bf-pc-footer',
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  readonly info = FOOTER_INFO;
}
