import type { Preference } from '@hanzo/appearance'

/**
 * How this site is set, before anybody says otherwise.
 *
 * @hanzo/design publishes the compact app register — 14px base, for chat and
 * console surfaces. This is a foundation's public site, where the body copy IS
 * the product and a page head has to carry a room. Solved rather than guessed:
 * scale 8/7 puts the anchor rung at exactly 16px, and ratio 0.84 puts the top
 * rung at exactly 64px. The whole ramp follows — 13 / 15 / 16 / 17 / 19 / 23 /
 * 27 / 33 / 41 / 52 / 64 — and no rung can drift out of relation with the
 * others because not one of them is written down anywhere.
 *
 * Stated HERE rather than as `--type-scale` on `:root`, because those two knobs
 * are the READER's. A stylesheet that sets them has spent the reader's dial on
 * the brand's own size, and then "Default" in the panel means something smaller
 * than this site has ever looked. @hanzo/appearance already keeps the layers
 * apart — install < org < person — so the site's register is simply the install,
 * and a reader who asks for larger type gets larger type from here.
 *
 * Density stays unset: the spacing ramp is already the fleet's.
 */
export const LOOK: Preference = { type: 8 / 7, ratio: 0.84 }
