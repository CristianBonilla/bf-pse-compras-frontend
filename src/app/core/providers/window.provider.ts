import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, inject, InjectionToken, PLATFORM_ID, Provider } from '@angular/core';

abstract class WindowRef {
  get nativeWindow(): Window | object {
    throw new Error('Document not defined');
  }
}

class BrowserWindowRef extends WindowRef {
  readonly #document = inject(DOCUMENT);

  constructor() {
    super();
  }

  override get nativeWindow(): Window {
    return this.#document?.defaultView as Window;
  }
}

function windowFactory(platformId: object, browserWindowRef: BrowserWindowRef): Window | object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }

  return new Object();
}

export const WINDOW = new InjectionToken<Window>('window-object');

const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [
    PLATFORM_ID,
    WindowRef
  ]
};

export const WINDOW_PROVIDERS: Provider[] = [
  browserWindowProvider,
  windowProvider
];
