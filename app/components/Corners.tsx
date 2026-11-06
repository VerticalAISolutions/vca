// Crosshair corners from the key visual: the one frame language for cards, photos and buttons.
// Place inside a `relative` element. tone = line colour class.

export default function Corners({ tone = "bg-bone/70", all = false }: { tone?: string; all?: boolean }) {
  const h = `absolute z-10 h-px w-3 ${tone}`;
  const v = `absolute z-10 h-3 w-px ${tone}`;
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={`${h} -left-[6px] -top-px`} />
      <span className={`${v} -left-px -top-[6px]`} />
      <span className={`${h} -bottom-px -right-[6px]`} />
      <span className={`${v} -bottom-[6px] -right-px`} />
      {all ? (
        <>
          <span className={`${h} -right-[6px] -top-px`} />
          <span className={`${v} -right-px -top-[6px]`} />
          <span className={`${h} -bottom-px -left-[6px]`} />
          <span className={`${v} -bottom-[6px] -left-px`} />
        </>
      ) : null}
    </span>
  );
}
