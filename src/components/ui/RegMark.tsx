/**
 * Registration cross — the volt "+" that pins the ends of structural
 * hairlines (chapter headers, hero spec bars, the footer rule). Pure
 * ornament: always aria-hidden, positioned with utilities by the caller
 * inside a `relative` parent.
 */
export default function RegMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`reg-mark ${className}`}>
      +
    </span>
  );
}
