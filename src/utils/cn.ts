import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const ctwMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'h1',
        'h2',
        'h3',
        'sub1',
        'sub2',
        'body1',
        'body2',
        'body3',
        'body4',
        'button1',
        'button2',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return ctwMerge(clsx(inputs));
}
