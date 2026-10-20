/**
 * The lede and the long copy, side by side.
 *
 * The two halves used to be `md:w-1/2` and `w-1/2` in a `flex` — neither of
 * which the stylesheet answers, so both children were full width and the row
 * was one column stacked twice. They are a grid now, and `minmax()` decides
 * when there is room for two columns without a breakpoint being named.
 */
function Content({ title, content }: { content: string; title: string }) {
  return (
    <section className='container' style={{ paddingBlock: 'var(--section-y-lg)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
          gap: 'var(--space-12)',
          alignItems: 'start',
        }}
      >
        <p className='text-3xl md:text-4xl text-foreground'>{title}</p>
        <p className='text-lg text-foreground' dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
}

export default Content;
