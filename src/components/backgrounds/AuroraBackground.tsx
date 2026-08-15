'use client';

import { useEffect, useRef } from 'react';

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // 流动的光带 - 浅色主题 pastel 紫色
    const auroraBands = [
      {
        color: { r: 167, g: 139, b: 250 }, // 淡紫色
        y: 0.3,
        amplitude: 80,
        frequency: 0.002,
        speed: 0.0003,
        phase: 0,
      },
      {
        color: { r: 192, g: 132, b: 252 }, // 浅紫色
        y: 0.5,
        amplitude: 100,
        frequency: 0.0015,
        speed: 0.0004,
        phase: 2,
      },
      {
        color: { r: 216, g: 180, b: 254 }, // 薰衣草色
        y: 0.7,
        amplitude: 60,
        frequency: 0.0025,
        speed: 0.00035,
        phase: 4,
      },
      {
        color: { r: 139, g: 92, b: 246 }, // 紫罗兰
        y: 0.4,
        amplitude: 90,
        frequency: 0.0018,
        speed: 0.00025,
        phase: 1,
      },
    ];

    const drawAuroraBand = (band: typeof auroraBands[0], t: number) => {
      const points: { x: number; y: number }[] = [];
      const steps = 100;

      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * canvas.width;
        const wave1 = Math.sin(x * band.frequency + t * band.speed + band.phase);
        const wave2 = Math.sin(x * band.frequency * 0.5 + t * band.speed * 1.3 + band.phase * 0.5);
        const wave3 = Math.sin(x * band.frequency * 2 + t * band.speed * 0.7);

        const y = canvas.height * band.y + wave1 * band.amplitude + wave2 * band.amplitude * 0.5 + wave3 * band.amplitude * 0.25;

        points.push({ x, y });
      }

      // 创建渐变
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `rgba(${band.color.r}, ${band.color.g}, ${band.color.b}, 0)`);
      gradient.addColorStop(0.3, `rgba(${band.color.r}, ${band.color.g}, ${band.color.b}, 0.15)`);
      gradient.addColorStop(0.5, `rgba(${band.color.r}, ${band.color.g}, ${band.color.b}, 0.25)`);
      gradient.addColorStop(0.7, `rgba(${band.color.r}, ${band.color.g}, ${band.color.b}, 0.15)`);
      gradient.addColorStop(1, `rgba(${band.color.r}, ${band.color.g}, ${band.color.b}, 0)`);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      // 使用贝塞尔曲线平滑连接
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      time += 1;

      // 浅色背景
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制光带
      auroraBands.forEach((band) => {
        ctx.save();
        ctx.filter = 'blur(80px)';
        drawAuroraBand(band, time);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className || ''}`}
      style={{ zIndex: 0 }}
    />
  );
}
