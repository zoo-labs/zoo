// Write src/config/counts.json — what the sources say Zoo Labs has published.
//
// The counting rules live in src/config/corpus.tsx, because the browser runs
// them too; this only decides WHEN. Doing it here rather than in a page's
// getStaticProps is not a preference: this build runs nine worker processes and
// then exports every page a second time, so a module-level memo holds for none
// of it — measured, a per-page fetch spent the whole 60-an-hour GitHub
// allowance on one build. From here the whole build asks three times, once per
// source, whatever Next does with processes.
//
// First link of `build`, `dev` and `typecheck`, like scripts/gui-css.mjs, and
// named there rather than as `prebuild` because pnpm does not run pre/post
// scripts. A generator that silently does not run leaves the last good file.
import { build } from 'esbuild';
import { existsSync, writeFileSync, rmSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const counts = new URL('src/config/counts.json', root);
const bundle = new URL('.counts.gen.mjs', root);

// The floor. Only ever reached on a first run that cannot reach the network,
// and only until one can — every later run starts from the file it last wrote.
// `proofs` is the exception that stays here: there is no public source to count
// it from, so it is counted by hand and has to agree with proofs.zoo.ngo.
if (!existsSync(counts)) {
  writeFileSync(counts, JSON.stringify({ papers: 88, proposals: 146, models: 78, proofs: 15 }));
}

// corpus.tsx is TypeScript with JSX in it, so Node needs it bundled before it
// can be imported. React is left external — nothing here renders anything.
await build({
  absWorkingDir: root.pathname,
  entryPoints: ['src/config/corpus.tsx'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  external: ['react', 'react/jsx-runtime'],
  outfile: bundle.pathname,
  logLevel: 'error',
});

const { CORPUS, count } = await import(bundle);
const counted = await count(CORPUS);
rmSync(bundle);

writeFileSync(counts, `${JSON.stringify(counted, null, 2)}\n`);
const moved = Object.keys(counted).filter((k) => counted[k] !== CORPUS[k]);
console.log(
  `src/config/counts.json — ${Object.entries(counted).map(([k, n]) => `${n} ${k}`).join(', ')}` +
    (moved.length ? ` (${moved.join(', ')} changed)` : '')
);
