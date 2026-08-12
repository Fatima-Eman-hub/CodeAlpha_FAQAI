// Subtle fixed corner marks, like registration marks on a printed page.
// Reinforces the field-notebook motif without any glow/blur effects.
export default function CornerMarks() {
  const markStyle = { borderColor: "var(--border-strong)" };
  return (
    <div className="pointer-events-none fixed inset-0 -z-30 hidden opacity-[0.35] md:block">
      <div className="absolute left-5 top-5 h-4 w-4 border-l-2 border-t-2" style={markStyle} />
      <div className="absolute right-5 top-5 h-4 w-4 border-r-2 border-t-2" style={markStyle} />
      <div className="absolute bottom-5 left-5 h-4 w-4 border-b-2 border-l-2" style={markStyle} />
      <div className="absolute bottom-5 right-5 h-4 w-4 border-b-2 border-r-2" style={markStyle} />
    </div>
  );
}
