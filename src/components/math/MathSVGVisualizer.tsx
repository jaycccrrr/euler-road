'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface MathSVGVisualizerProps {
  type: string;
}

// 方向角与方向余弦可视化
function DirectionCosinesViz() {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setRotation(prev => (prev + 0.5) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [isAnimating]);

  const angle = (rotation * Math.PI) / 180;
  const vx = Math.cos(angle) * 120;
  const vy = Math.sin(angle) * 80 - 60;

  return (
    <div className="space-y-4">
      <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
        <svg viewBox="0 0 600 400" className="w-full">
          <defs>
            <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
            <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/>
            </marker>
            <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowYellow" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
              <path d="M0,0 L0,8 L12,4 z" fill="#fbbf24"/>
            </marker>
          </defs>

          <rect width="600" height="400" fill="#0f172a"/>

          <g transform="translate(150, 300)">
            <line x1="0" y1="0" x2="180" y2="0" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowRed)"/>
            <text x="190" y="5" fill="#ef4444" fontSize="16" fontWeight="bold">x</text>

            <line x1="0" y1="0" x2="-80" y2="-120" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrowGreen)"/>
            <text x="-95" y="-115" fill="#22c55e" fontSize="16" fontWeight="bold">y</text>

            <line x1="0" y1="0" x2="0" y2="-180" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowBlue)"/>
            <text x="-15" y="-185" fill="#3b82f6" fontSize="16" fontWeight="bold">z</text>

            <circle cx="0" cy="0" r="5" fill="#fbbf24"/>
            <text x="-20" y="20" fill="#fbbf24" fontSize="14">O</text>

            <line x1="0" y1="0" x2={vx} y2={vy} stroke="#fbbf24" strokeWidth="4" markerEnd="url(#arrowYellow)"/>
            <text x={vx + 10} y={vy - 5} fill="#fbbf24" fontSize="18" fontWeight="bold">a</text>

            <line x1="0" y1={vy} x2={vx} y2={vy} stroke="#64748b" strokeWidth="1" strokeDasharray="4,2"/>
            <line x1={vx} y1="0" x2={vx} y2={vy} stroke="#64748b" strokeWidth="1" strokeDasharray="4,2"/>

            <path d={`M 40 0 A 40 40 0 0 0 ${40 * Math.cos(-angle/2)} ${-40 * Math.sin(-angle/2)}`}
                  fill="none" stroke="#f87171" strokeWidth="2"/>
            <text x="50" y="-15" fill="#f87171" fontSize="14" fontWeight="bold">α</text>
          </g>

          <g transform="translate(380, 50)">
            <rect x="0" y="0" width="190" height="320" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
            <text x="95" y="35" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">方向角定义</text>

            <text x="15" y="70" fill="#f87171" fontSize="13" fontWeight="bold">α：与x轴夹角</text>
            <text x="15" y="95" fill="#f87171" fontSize="12">cos α = a₁/|a|</text>

            <text x="15" y="135" fill="#4ade80" fontSize="13" fontWeight="bold">β：与y轴夹角</text>
            <text x="15" y="160" fill="#4ade80" fontSize="12">cos β = a₂/|a|</text>

            <text x="15" y="200" fill="#60a5fa" fontSize="13" fontWeight="bold">γ：与z轴夹角</text>
            <text x="15" y="225" fill="#60a5fa" fontSize="12">cos γ = a₃/|a|</text>

            <line x1="15" y1="250" x2="175" y2="250" stroke="#475569" strokeWidth="1"/>

            <text x="95" y="280" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">方向余弦</text>
            <text x="95" y="305" fill="#94a3b8" fontSize="11" textAnchor="middle">(cos α, cos β, cos γ)</text>
          </g>

          <text x="300" y="380" fill="#e2e8f0" fontSize="14" fontWeight="bold" textAnchor="middle">
            方向角范围：0 ≤ α, β, γ ≤ π
          </text>
        </svg>
      </div>

      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setIsAnimating(!isAnimating)}>
          {isAnimating ? <Pause className="w-4 h-4 mr-1"/> : <Play className="w-4 h-4 mr-1"/>}
          {isAnimating ? '暂停' : '旋转'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setRotation(0); setIsAnimating(false); }}>
          <RotateCcw className="w-4 h-4 mr-1"/> 重置
        </Button>
      </div>
    </div>
  );
}

// 叉乘可视化
function CrossProductViz() {
  const [angle, setAngle] = useState(60);

  const a = { x: 100, y: 0 };
  const b = {
    x: 80 * Math.cos((angle * Math.PI) / 180),
    y: 80 * Math.sin((angle * Math.PI) / 180)
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 p-4">
        <svg viewBox="0 0 400 350" className="w-full">
          <rect width="400" height="350" fill="#0f172a"/>

          <g transform="translate(200, 200)">
            <line x1="-150" y1="0" x2="150" y2="0" stroke="#475569" strokeWidth="1" strokeDasharray="4,2"/>
            <line x1="0" y1="-150" x2="0" y2="150" stroke="#475569" strokeWidth="1" strokeDasharray="4,2"/>

            <line x1="0" y1="0" x2={a.x} y2={-a.y} stroke="#ef4444" strokeWidth="4"/>
            <text x={a.x + 10} y={-a.y} fill="#ef4444" fontSize="16" fontWeight="bold">a</text>

            <line x1="0" y1="0" x2={b.x} y2={-b.y} stroke="#3b82f6" strokeWidth="4"/>
            <text x={b.x + 10} y={-b.y} fill="#3b82f6" fontSize="16" fontWeight="bold">b</text>

            <path d={`M 40 0 A 40 40 0 0 0 ${40 * Math.cos((angle * Math.PI) / 180)} ${-40 * Math.sin((angle * Math.PI) / 180)}`}
                  fill="none" stroke="#fbbf24" strokeWidth="2"/>
            <text x="55" y="-10" fill="#fbbf24" fontSize="14">θ</text>

            <polygon
              points={`0,0 ${a.x},${-a.y} ${a.x + b.x},${-(a.y + b.y)} ${b.x},${-b.y}`}
              fill="rgba(251, 191, 36, 0.1)"
              stroke="#fbbf24"
              strokeWidth="1"
              strokeDasharray="4,2"
            />

            <line x1="0" y1="0" x2="0" y2={-120} stroke="#22c55e" strokeWidth="4"/>
            <text x="10" y={-120} fill="#22c55e" fontSize="16" fontWeight="bold">a×b</text>
          </g>

          <text x="200" y="330" fill="#e2e8f0" fontSize="14" textAnchor="middle">
            |a×b| = |a||b|sinθ = 平行四边形面积
          </text>
        </svg>
      </div>

      <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg">
        <span className="text-slate-300 text-sm">调整夹角 θ:</span>
        <input
          type="range"
          min="0"
          max="180"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-slate-300 text-sm w-12">{angle}°</span>
      </div>
    </div>
  );
}

export function MathSVGVisualizer({ type }: MathSVGVisualizerProps) {
  switch (type) {
    case 'directionCosines':
      return <DirectionCosinesViz />;
    case 'crossProduct':
      return <CrossProductViz />;
    default:
      return (
        <div className="bg-slate-900 rounded-xl p-8 text-center text-slate-400">
          暂无可视化
        </div>
      );
  }
}

export default MathSVGVisualizer;
