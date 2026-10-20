/**
 * Join class names. `clsx` already is that function, so this file only names it
 * for the ~20 modules that import it.
 *
 * It used to wrap `clsx` in `twMerge`, whose whole job is to resolve conflicts
 * between Tailwind utilities by knowing which ones collide. There has never been
 * a Tailwind in this build to collide, so the merge was deciding which of two
 * hand-written class names to DROP using a table that describes a different
 * stylesheet — `p-4 p-6` silently became `p-6`, and so did anything else whose
 * name happened to match one of its groups.
 *
 * `cn` is the same function under the name shadcn's components used, kept while
 * they still exist. There was also a byte-identical second copy of it in
 * lib/utils.ts.
 */
import { clsx, type ClassValue } from 'clsx';

export function clsxm(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const cn = clsxm;

export default clsxm;
