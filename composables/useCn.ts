import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const useCn = () => {
  const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

  return {
    cn
  }
}