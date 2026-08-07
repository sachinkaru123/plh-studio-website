/** Film-grain texture over the whole page. Pure CSS, Server Component. */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="bg-noise noise-overlay pointer-events-none fixed inset-0 z-100"
    />
  );
}
