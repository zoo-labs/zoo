/**
 * The gui config, and it is not this repo's.
 *
 * `@hanzo/ui/gui-config` is the fleet's token table — the same object zoolabs.io
 * and the Hanzo surfaces mount — so a heading, a stack or a gap is the same size
 * here as everywhere else. Carrying a copy is how two sites render one library
 * at two sizes with nothing saying so.
 *
 * Chromatic, not `monochrome`: hanzo.ai drops the eight colour families because
 * Hanzo is one hue through an opacity ladder. A wildlife foundation is not, and
 * zoolabs.io mounts the same chromatic table for the same reason.
 */
import { config, css as sheet } from '@hanzo/ui/gui-config';

export default config;

/** The sheet for the table above; `scripts/gui-css.mjs` writes it to
 *  `src/styles/gui.css`. It is the package's emitter, never `getCSS()`. */
export const css = () => sheet(config);
