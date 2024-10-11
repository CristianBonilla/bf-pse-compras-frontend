import { environment } from '@env/environment';
import { FooterInfo } from '@models/footer.model';

const { whatsappUrl } = environment.api;

export const FOOTER_INFO = Object.freeze<FooterInfo>({
  title: 'Banco Falabella',
  year: new Date().getFullYear(),
  phone: '+57 1 5878000',
  whatsapp: `${ whatsappUrl }/send?phone=5715878000&text=Hola%20buen%20día%20Banco%20Falabella!%0D%0A¿me%20puedes%20ayudar?`
});
