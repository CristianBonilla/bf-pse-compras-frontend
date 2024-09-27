import { GlobalConfig, IndividualConfig } from 'ngx-toastr';

export type ToastrConfig = Partial<Pick<IndividualConfig,
  'closeButton' |
  'disableTimeOut' |
  'easeTime' |
  'easing' |
  'extendedTimeOut' |
  'enableHtml' |
  'messageClass' |
  'newestOnTop' |
  'onActivateTick' |
  'positionClass' |
  'progressAnimation' |
  'progressBar' |
  'tapToDismiss' |
  'timeOut' |
  'titleClass' |
  'toastComponent' |
  'toastClass'>>;

export type ToastrGlobalConfig = Partial<Pick<GlobalConfig,
  'autoDismiss' |
  'countDuplicates' |
  'iconClasses' |
  'includeTitleDuplicates' |
  'maxOpened' |
  'preventDuplicates' |
  'resetTimeoutOnDuplicate'>>;
