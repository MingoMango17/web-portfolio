export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <div
        className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(99 102 241 / 0.16) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-52 w-[48rem] h-[48rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(34 211 238 / 0.10) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-56 left-1/4 w-[44rem] h-[44rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(163 230 53 / 0.07) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
