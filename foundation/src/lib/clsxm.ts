import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function clsxm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Alias for shadcn compatibility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For backward compatibility
export default clsxm;
