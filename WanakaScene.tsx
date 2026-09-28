// components/WanakaScene.tsx — 纯函数渲染器: config → SVG
// 禁止在此写业务逻辑; 要改山形, 改 lib/scene-config.ts
import { SCENE } from '@/lib/scene-config';

const W = 1000, H = 1400;

function layerPath(l: (typeof SCENE.layers)[number]) {
  const y0 = H * SCENE.horizon;
  const P = l.peaks.map(p => [
    p.x * W,
    (SCENE.horizon - 0.05 - p.y * (SCENE.horizon - 0.16)) * H - l.base * 6,
  ] as const);
  let d = `M-20 ${P[0][1].toFixed(0)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const [x1, y1] = P[i], [x2] = P[i + 1];
    if (l.soft > 0.02)
      d += ` Q ${x1.toFixed(0)} ${y1.toFixed(0)} ${((x1 + x2) / 2).toFixed(0)} ${((y1 + P[i+1][1]) / 2).toFixed(0)}`;
    else d += ` L ${x1.toFixed(0)} ${y1.toFixed(0)}`;
  }
  d += ` L ${P[P.length-1][0].toFixed(0)} ${P[P.length-1][1].toFixed(0)} L 1020 ${y0+2} L -20 ${y0+2} Z`;
  return d;
}

export default function WanakaScene({ variant }: { variant: 'wide' | 'full' }) {
  const y0 = Math.round(H * SCENE.horizon);
  const vb = variant === 'wide'
    ? `0 ${Math.round(H * (SCENE.horizon - 0.36))} ${W} ${Math.round(H * 0.52)}`
    : `0 0 ${W} ${H}`;
  const ty = H * (SCENE.horizon - 0.02) - H * SCENE.tree.size;
  const tx = SCENE.tree.x * W;
  const ts = H * SCENE.tree.size * 0.55;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={vb}
         preserveAspectRatio="xMidYMid slice"
         style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="lakeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SCENE.colors.lake} />
          <stop offset="1" stopColor={SCENE.colors.lakedeep} />
        </linearGradient>
      </defs>
      <rect x="0" y={y0} width={W} height={H - y0} fill="url(#lakeG)" />
      <rect x="0" y={y0 - 2} width={W} height="3" fill={SCENE.colors.band} opacity="0.5" />
      {SCENE.layers.map(l => (
        <path key={l.cssVar} d={layerPath(l)} fill={`var(${l.cssVar}, ${l.color})`} />
      ))}
      <image href={SCENE.tree.src} x={tx} y={ty} width={ts * 0.58} height={ts} />
    </svg>
  );
}
