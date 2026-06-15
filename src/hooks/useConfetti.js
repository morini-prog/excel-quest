import { useCallback } from 'react';
import confetti from 'canvas-confetti';

/**
 * Hook que provee funciones para disparar confetti en distintas situaciones.
 */
export function useConfetti() {
  const lanzarConfetti = useCallback((opciones = {}) => {
    const defaults = {
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#22c55e', '#a855f7', '#f97316', '#eab308', '#ec4899', '#3b82f6'],
    };
    confetti({ ...defaults, ...opciones });
  }, []);

  const lanzarCaña = useCallback(() => {
    // Disparo desde ambos lados
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    function fire(ratio, opts) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio) });
    }
    fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.1 } });
    fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.9 } });
    fire(0.2, { spread: 60, origin: { x: 0.5 } });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, origin: { x: 0.3 } });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, origin: { x: 0.7 } });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const lanzarEstrellas = useCallback(() => {
    const end = Date.now() + 2000;
    const colors = ['#ffde00', '#ff69b4', '#00bfff'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return { lanzarConfetti, lanzarCaña, lanzarEstrellas };
}
