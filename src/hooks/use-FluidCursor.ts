// @ts-nocheck
const useFluidCursor = () => {
  const canvas = document.getElementById('fluid');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let points: { x: number; y: number; vx: number; vy: number }[] = [];
  let mouse = { x: 0, y: 0, vx: 0, vy: 0, px: 0, py: 0 };
  let isActive = false;

  const config = {
    particleCount: 25,
    particleSize: 2,
    defaultSpeed: 0,
    defaultColor: 'rgba(255, 255, 255, 0.7)',
    dragForce: 0.1,
    ease: 0.2
  };

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const updateParticles = () => {
    // Update mouse velocity
    mouse.vx = mouse.x - mouse.px;
    mouse.vy = mouse.y - mouse.py;
    mouse.px = mouse.x;
    mouse.py = mouse.y;

    // Add new particles if needed
    while (points.length < config.particleCount) {
      points.push({
        x: mouse.x,
        y: mouse.y,
        vx: 0,
        vy: 0
      });
    }

    // Update particles
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const dx = mouse.x - point.x;
      const dy = mouse.y - point.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Move particles toward mouse with easing
      point.vx += (dx * config.dragForce - point.vx) * config.ease;
      point.vy += (dy * config.dragForce - point.vy) * config.ease;

      // Add mouse velocity influence
      point.vx += mouse.vx * 0.2;
      point.vy += mouse.vy * 0.2;

      // Update position
      point.x += point.vx;
      point.y += point.vy;
    }
  };

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (isActive) {
      // Draw particles
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const point = points[i];
        const prevPoint = points[i - 1];
        
        // Create smooth curve between points
        const xc = (prevPoint.x + point.x) / 2;
        const yc = (prevPoint.y + point.y) / 2;
        ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, xc, yc);
      }

      ctx.strokeStyle = config.defaultColor;
      ctx.lineWidth = config.particleSize;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    updateParticles();
    requestAnimationFrame(draw);
  };

  const handleMouseMove = (e: MouseEvent) => {
    isActive = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  const handleMouseLeave = () => {
    isActive = false;
  };

  // Initialize
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseleave', handleMouseLeave);
  draw();

  return () => {
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export default useFluidCursor; 