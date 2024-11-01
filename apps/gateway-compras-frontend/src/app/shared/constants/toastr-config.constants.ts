import type { ToastrConfig, ToastrGlobalConfig } from '@shared/types/toastr.types';

export const TOASTR_CONFIG = Object.freeze<ToastrConfig>({
  easeTime: 500,
  enableHtml: true,
  positionClass: 'toast-bottom-right',
  progressAnimation: 'increasing',
  progressBar: true,
  tapToDismiss: false,
  timeOut: 5000,
  toastClass: 'ngx-toastr alert__default'
});

export const TOASTR_GLOBAL_CONFIG = Object.freeze<ToastrGlobalConfig>({
  preventDuplicates: true,
  resetTimeoutOnDuplicate: true
});
