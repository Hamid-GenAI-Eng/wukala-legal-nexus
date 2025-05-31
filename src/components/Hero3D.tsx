
import { useEffect, useRef } from "react";

export const Hero3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let rotation = 0;

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw animated legal symbols
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Scales of Justice
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation * 0.005);
      
      // Base
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -100);
      ctx.lineTo(0, 80);
      ctx.stroke();
      
      // Crossbar
      ctx.beginPath();
      ctx.moveTo(-60, -60);
      ctx.lineTo(60, -60);
      ctx.stroke();
      
      // Left scale
      ctx.beginPath();
      ctx.arc(-40, -40, 20, 0, Math.PI * 2);
      ctx.stroke();
      
      // Right scale
      ctx.beginPath();
      ctx.arc(40, -40, 20, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
      
      // Floating elements
      for (let i = 0; i < 5; i++) {
        const angle = (rotation + i * 72) * 0.01;
        const x = centerX + Math.cos(angle) * (100 + i * 20);
        const y = centerY + Math.sin(angle) * (50 + i * 10);
        
        ctx.fillStyle = `rgba(30, 58, 138, ${0.3 - i * 0.05})`;
        ctx.beginPath();
        ctx.arc(x, y, 5 - i, 0, Math.PI * 2);
        ctx.fill();
      }
      
      rotation++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl overflow-hidden shadow-2xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"></div>
    </div>
  );
};
