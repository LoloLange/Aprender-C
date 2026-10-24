import { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, ArrowRight, X } from 'lucide-react';

interface Props {
  lessonTitle: string;
  onNextLesson: () => void;
  onStay: () => void;
  hasNext: boolean;
}

function createConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#6c8cff', '#4ade80', '#facc15', '#f87171', '#a78bfa', '#fb923c', '#22d3ee'];
  const particles: { x: number; y: number; w: number; h: number; color: string; vx: number; vy: number; rot: number; vr: number; opacity: number }[] = [];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * -1,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      opacity: 1,
    });
  }

  let frame: number;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.vy += 0.05;
      if (p.y > canvas.height) p.opacity -= 0.02;
      if (p.opacity <= 0) continue;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (alive) frame = requestAnimationFrame(animate);
  }
  frame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frame);
}

const COUNTDOWN_SECONDS = 10;

export default function CompletionModal({ lessonTitle, onNextLesson, onStay, hasNext }: Props) {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      cleanupRef.current = createConfetti(canvasRef.current);
    }
    return () => cleanupRef.current?.();
  }, []);

  useEffect(() => {
    if (!hasNext) return;
    if (countdown <= 0) {
      onNextLesson();
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, hasNext, onNextLesson]);

  const handleStay = useCallback(() => {
    onStay();
  }, [onStay]);

  return (
    <>
      <canvas ref={canvasRef} className="confetti-canvas" />
      <div className="completion-overlay" onClick={handleStay}>
        <div className="completion-modal" onClick={e => e.stopPropagation()}>
          <button className="completion-close" onClick={handleStay}>
            <X size={20} />
          </button>

          <div className="completion-trophy">
            <Trophy size={48} />
          </div>

          <h2>Leccion completada!</h2>
          <p className="completion-lesson-name">{lessonTitle}</p>
          <p className="completion-subtitle">Completaste todos los ejercicios de esta leccion.</p>

          {hasNext ? (
            <>
              <div className="completion-countdown">
                <span>Siguiente leccion en</span>
                <span className="countdown-number">{countdown}</span>
                <span>segundos</span>
              </div>
              <div className="completion-actions">
                <button className="completion-next" onClick={onNextLesson}>
                  <ArrowRight size={18} />
                  Ir a la siguiente leccion
                </button>
                <button className="completion-stay" onClick={handleStay}>
                  Quedarme aca
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="completion-subtitle">Has terminado todas las lecciones de este modulo.</p>
              <div className="completion-actions">
                <button className="completion-stay" onClick={handleStay}>
                  Cerrar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
