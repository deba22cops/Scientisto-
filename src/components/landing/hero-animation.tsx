"use client";

import { useEffect, useRef } from 'react';

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let planets: any[] = [];
    let scientist = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
      
      planets = [
        // Planet 1 (large, slow)
        { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: Math.min(canvas.width, canvas.height) * 0.1, color: 'hsl(217, 91%, 60%)', speed: 0.0003, angle: Math.random() * Math.PI * 2, orbitRadius: canvas.width * 0.35, orbitX: canvas.width / 2, orbitY: canvas.height/2  },
        // Planet 2 (medium, faster)
        { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: Math.min(canvas.width, canvas.height) * 0.05, color: 'hsl(257, 80%, 70%)', speed: 0.0008, angle: Math.random() * Math.PI * 2, orbitRadius: canvas.width * 0.2, orbitX: canvas.width * 0.8, orbitY: canvas.height * 0.7 },
        // Moon for planet 2
        { x: 0, y: 0, radius: Math.min(canvas.width, canvas.height) * 0.02, color: 'hsl(210, 40%, 98%)', speed: 0.003, angle: Math.random() * Math.PI * 2, parent: 1, orbitRadius: Math.min(canvas.width, canvas.height) * 0.1 },
         // Planet 3 (small, distant)
        { x: canvas.width * 0.5, y: canvas.height * 0.9, radius: Math.min(canvas.width, canvas.height) * 0.03, color: 'hsl(160, 60%, 45%)', speed: 0.0005, angle: Math.random() * Math.PI * 2, orbitRadius: canvas.width * 0.45, orbitX: canvas.width / 2, orbitY: canvas.height / 2 }
      ];

      scientist.x = canvas.width / 2;
      scientist.y = canvas.height * 1.2;
      scientist.targetX = canvas.width / 2;
      scientist.targetY = canvas.height * 0.85;
    };
    
    const drawScientist = () => {
        // Simple silhouette of a scientist looking through a telescope
        const size = Math.min(canvas.width, canvas.height) * 0.3;
        const baseX = scientist.x;
        const baseY = scientist.y;

        ctx.fillStyle = 'hsla(210, 40%, 98%, 0.8)';
        ctx.strokeStyle = 'hsla(210, 40%, 98%, 0.8)';
        ctx.lineWidth = size * 0.02;

        // Body
        ctx.beginPath();
        ctx.moveTo(baseX - size * 0.1, baseY + size * 0.2);
        ctx.lineTo(baseX, baseY - size * 0.05);
        ctx.lineTo(baseX + size * 0.1, baseY + size * 0.2);
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(baseX, baseY - size * 0.15, size * 0.05, 0, Math.PI * 2);
        ctx.fill();

        // Telescope
        ctx.save();
        ctx.translate(baseX, baseY - size * 0.15);
        ctx.rotate(-Math.PI / 6);
        ctx.beginPath();
        ctx.moveTo(size * 0.05, 0);
        ctx.lineTo(size * 0.3, -size * 0.03);
        ctx.lineTo(size * 0.3, size * 0.03);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Animate scientist entrance
      scientist.x += (scientist.targetX - scientist.x) * 0.05;
      scientist.y += (scientist.targetY - scientist.y) * 0.05;
      drawScientist();

      planets.forEach((p, index) => {
        p.angle += p.speed;
        if(p.parent !== undefined) {
            const parentPlanet = planets[p.parent];
            p.x = parentPlanet.x + Math.cos(p.angle) * p.orbitRadius;
            p.y = parentPlanet.y + Math.sin(p.angle) * p.orbitRadius;
        } else {
            p.x = p.orbitX + Math.cos(p.angle) * p.orbitRadius;
            p.y = p.orbitY + Math.sin(p.angle) * p.orbitRadius;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'black');

        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Add rings to the first planet
        if (index === 0) {
            ctx.strokeStyle = 'hsla(210, 40%, 98%, 0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.radius * 1.5, p.radius * 0.3, Math.PI / 8, 0, Math.PI * 2);
            ctx.stroke();
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10" />;
}
