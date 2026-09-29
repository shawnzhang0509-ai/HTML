// components/WanakaScene.tsx — 纯函数渲染器: config → SVG
// 禁止在此写业务逻辑; 要改山形, 改 lib/scene-config.ts
import { SCENE } from '@/lib/scene-config';
import { layerPath, SCENE_H, SCENE_W, viewBoxForVariant } from '@/lib/scene-render';

export default function WanakaScene({ variant }: { variant: 'wide' | 'full' }) {
  const y0 = Math.round(SCENE_H * SCENE.horizon);
  const vb = viewBoxForVariant(variant);
  const ty = SCENE_H * (SCENE.horizon - 0.02) - SCENE_H * SCENE.tree.size;
  const tx = SCENE.tree.x * SCENE_W;
  const ts = SCENE_H * SCENE.tree.size * 0.55;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={vb}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id="lakeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SCENE.colors.lake} />
          <stop offset="1" stopColor={SCENE.colors.lakedeep} />
        </linearGradient>
      </defs>
      <rect x="0" y={y0} width={SCENE_W} height={SCENE_H - y0} fill="url(#lakeG)" />
      <rect x="0" y={y0 - 2} width={SCENE_W} height="3" fill={SCENE.colors.band} opacity="0.5" />
      {SCENE.layers.map((l) => (
        <path key={l.cssVar} d={layerPath(l)} fill={`var(${l.cssVar}, ${l.color})`} />
      ))}
      <image href={SCENE.tree.src} x={tx} y={ty} width={ts * 0.58} height={ts} />
    </svg>
  );
}
