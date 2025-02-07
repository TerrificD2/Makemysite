import { useEffect, useRef } from 'react';

const GraphBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Graph configuration
    const gridSize = 30; // Smaller grid for more detail
    const dotSize = 1;
    const lineOpacity = 0.1;
    const dotOpacity = 0.2;

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dots at intersections
      for (let x = gridSize; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${dotOpacity})`;
          ctx.fill();
        }
      }

      // Draw vertical lines
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
      ctx.lineWidth = 0.5;
      for (let x = gridSize; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      ctx.stroke();

      // Draw horizontal lines
      ctx.beginPath();
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(gridSize, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Add gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Initial draw
    drawGraph();

    // Redraw on resize
    window.addEventListener('resize', drawGraph);

    // Animation
    let animationFrameId: number;
    let offset = 0;

    const animate = () => {
      offset += 0.5;
      ctx.setTransform(1, 0, 0, 1, offset % gridSize, 0);
      drawGraph();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', drawGraph);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
      style={{ opacity: 0.7 }}
    />
  );
};

export default GraphBackground; 