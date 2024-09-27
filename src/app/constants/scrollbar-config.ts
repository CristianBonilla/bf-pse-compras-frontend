import type { PartialOptions } from 'overlayscrollbars';

export type ScrollbarOptions = PartialOptions | false | null;

export const DEFAULT_SCROLLBAR_OPTIONS: ScrollbarOptions = {
  overflow: {
    x: 'scroll',
    y: 'scroll'
  },
  scrollbars: {
    autoHide: 'move'
  }
};
