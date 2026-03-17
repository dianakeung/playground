type ConfettiPiece = {
  delay: string;
  duration: string;
  left: string;
  rotate: string;
  shape: "rect" | "strip";
  tone: string;
  travel: string;
};

const pieces: ConfettiPiece[] = [
  { left: "5%", delay: "0s", duration: "1.45s", rotate: "12deg", tone: "var(--confetti-blue)", shape: "rect", travel: "-24px" },
  { left: "9%", delay: ".06s", duration: "1.35s", rotate: "-22deg", tone: "var(--confetti-red)", shape: "rect", travel: "28px" },
  { left: "15%", delay: ".12s", duration: "1.5s", rotate: "26deg", tone: "var(--confetti-gold)", shape: "strip", travel: "-18px" },
  { left: "21%", delay: ".02s", duration: "1.42s", rotate: "-18deg", tone: "var(--confetti-green)", shape: "rect", travel: "22px" },
  { left: "28%", delay: ".1s", duration: "1.28s", rotate: "30deg", tone: "var(--confetti-blue)", shape: "strip", travel: "-30px" },
  { left: "34%", delay: ".04s", duration: "1.54s", rotate: "-10deg", tone: "var(--confetti-red)", shape: "strip", travel: "24px" },
  { left: "40%", delay: ".15s", duration: "1.38s", rotate: "18deg", tone: "var(--confetti-gold)", shape: "rect", travel: "-26px" },
  { left: "46%", delay: ".08s", duration: "1.48s", rotate: "-32deg", tone: "var(--confetti-green)", shape: "rect", travel: "16px" },
  { left: "53%", delay: ".01s", duration: "1.33s", rotate: "24deg", tone: "var(--confetti-red)", shape: "rect", travel: "-20px" },
  { left: "59%", delay: ".14s", duration: "1.5s", rotate: "-24deg", tone: "var(--confetti-blue)", shape: "strip", travel: "30px" },
  { left: "66%", delay: ".05s", duration: "1.36s", rotate: "16deg", tone: "var(--confetti-gold)", shape: "rect", travel: "-14px" },
  { left: "72%", delay: ".11s", duration: "1.44s", rotate: "-28deg", tone: "var(--confetti-green)", shape: "rect", travel: "20px" },
  { left: "79%", delay: ".03s", duration: "1.31s", rotate: "14deg", tone: "var(--confetti-red)", shape: "strip", travel: "-28px" },
  { left: "86%", delay: ".09s", duration: "1.53s", rotate: "-20deg", tone: "var(--confetti-blue)", shape: "rect", travel: "24px" },
  { left: "92%", delay: ".13s", duration: "1.41s", rotate: "22deg", tone: "var(--confetti-gold)", shape: "strip", travel: "-18px" },
  { left: "12%", delay: ".03s", duration: "1.58s", rotate: "-12deg", tone: "var(--confetti-red)", shape: "rect", travel: "34px" },
  { left: "25%", delay: ".09s", duration: "1.36s", rotate: "18deg", tone: "var(--confetti-gold)", shape: "rect", travel: "-36px" },
  { left: "37%", delay: ".01s", duration: "1.5s", rotate: "-28deg", tone: "var(--confetti-green)", shape: "strip", travel: "30px" },
  { left: "50%", delay: ".05s", duration: "1.48s", rotate: "24deg", tone: "var(--confetti-blue)", shape: "rect", travel: "-34px" },
  { left: "63%", delay: ".11s", duration: "1.42s", rotate: "-16deg", tone: "var(--confetti-red)", shape: "rect", travel: "36px" },
  { left: "76%", delay: ".04s", duration: "1.52s", rotate: "22deg", tone: "var(--confetti-gold)", shape: "strip", travel: "-32px" },
  { left: "89%", delay: ".08s", duration: "1.4s", rotate: "-24deg", tone: "var(--confetti-green)", shape: "rect", travel: "28px" },
  { left: "3%", delay: ".02s", duration: "1.62s", rotate: "18deg", tone: "var(--confetti-gold)", shape: "strip", travel: "20px" },
  { left: "18%", delay: ".07s", duration: "1.58s", rotate: "-30deg", tone: "var(--confetti-blue)", shape: "rect", travel: "-26px" },
  { left: "31%", delay: ".13s", duration: "1.6s", rotate: "12deg", tone: "var(--confetti-green)", shape: "rect", travel: "24px" },
  { left: "44%", delay: ".05s", duration: "1.66s", rotate: "-18deg", tone: "var(--confetti-red)", shape: "strip", travel: "-22px" },
  { left: "57%", delay: ".09s", duration: "1.57s", rotate: "28deg", tone: "var(--confetti-gold)", shape: "rect", travel: "32px" },
  { left: "70%", delay: ".03s", duration: "1.64s", rotate: "-14deg", tone: "var(--confetti-blue)", shape: "strip", travel: "-20px" },
  { left: "83%", delay: ".12s", duration: "1.61s", rotate: "20deg", tone: "var(--confetti-red)", shape: "rect", travel: "26px" },
  { left: "96%", delay: ".06s", duration: "1.55s", rotate: "-22deg", tone: "var(--confetti-green)", shape: "strip", travel: "-24px" },
];

export function Confetti() {
  return (
    <div aria-hidden="true" className="confetti-layer">
      {pieces.map((piece, index) => (
        <span
          className={`confetti-piece confetti-piece--${piece.shape}`}
          key={`${piece.left}-${index}`}
          style={
            {
              "--confetti-color": piece.tone,
              "--confetti-delay": piece.delay,
              "--confetti-duration": piece.duration,
              "--confetti-left": piece.left,
              "--confetti-rotate": piece.rotate,
              "--confetti-travel": piece.travel,
            } as Record<string, string>
          }
        />
      ))}
    </div>
  );
}
