'use client';
import { useEffect, useRef } from 'react';
import useFluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = useFluidCursor();
    return () => cleanup?.();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <canvas
        id="fluid"
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default FluidCursor; 