// Binds the fleet's token table to gui's prop types. Without it every `$4`,
// every shorthand and every theme key is a type error, because gui has no way
// to know which config this app mounted.
//
// The augmentation goes on `@hanzogui/web` because that is where the interface
// is declared — `@hanzo/gui` and `@hanzo/ui` both re-export from it, so stating
// it there is what reaches every component either of them hands back.
import type { Conf } from '@hanzo/ui/gui-config';

declare module '@hanzogui/web' {
  interface GuiCustomConfig extends Conf {}
}
