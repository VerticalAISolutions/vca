// The one label pattern: index ── term. Index carries the accent, the rule is a hairline.

export default function Label({ index = "●", children, accent = "text-signal", className = "" }: { index?: string; children: React.ReactNode; accent?: string; className?: string }) {
  return (
    <p className={`ui-label flex items-center gap-3 ${className}`}>
      <span className={accent}>{index}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
