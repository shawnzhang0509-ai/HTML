// components/WanakaScene.tsx — config → SVG（Payman 风用 faceted 面片）
import { SCENE } from '@/lib/scene-config';
import {
  layerFacets,
  layerPath,
  sceneSize,
  viewBoxForVariant,
} from '@/lib/scene-render';

function MountainLayer({ l }: { l: (typeof SCENE.layers)[number] }) {
  const edge =
    SCENE.render.edgeStroke > 0
      ? {
          stroke: `rgba(255,255,255,${SCENE.render.edgeStroke})`,
          strokeWidth: SCENE.render.edgeWidth,
        }
      : {};

  if (SCENE.render.mode === 'faceted') {
    return (
      <g key={l.cssVar}>
        {layerFacets(l, l.color).map((f, i) => (
          <path
            key={`${l.cssVar}-${i}`}
            d={f.d}
            fill={`var(${l.cssVar}, ${f.fill})`}
            {...edge}
          />
        ))}
      </g>
    );
  }
  return (
    <path key={l.cssVar} d={layerPath(l)} fill={`var(${l.cssVar}, ${l.color})`} />
  );
}

export default function WanakaScene({ variant }: { variant: 'wide' | 'full' }) {
  const { w: SCENE_W, h: SCENE_H } = sceneSize();
  const y0 = Math.round(SCENE_H * SCENE.horizon);
  const vb = viewBoxForVariant(variant);
  const fit = SCENE.design?.fit ?? 'slice';
  const ty = SCENE_H * (SCENE.horizon - 0.02) - SCENE_H * SCENE.tree.size;
  const tx = SCENE.tree.x * SCENE_W;
  const treeH = SCENE_H * SCENE.tree.size * 0.55;
  const treeW = treeH * 0.58;
  const reflect = SCENE.tree.reflection ?? 0;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={vb}
      preserveAspectRatio={`xMidYMid ${fit}`}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id="lakeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SCENE.colors.lake} />
          <stop offset="1" stopColor={SCENE.colors.lakedeep} />
        </linearGradient>
        <clipPath id="lakeClip">
          <rect x="0" y={y0} width={SCENE_W} height={SCENE_H - y0} />
        </clipPath>
      </defs>

      {/* 天空区流星（参考图右上淡黄 streak） */}
      {SCENE.shootingStars?.map((s, i) => {
        const x1 = s.x * SCENE_W;
        const y1 = s.y * SCENE_H;
        const rad = ((s.angle ?? -5) * Math.PI) / 180;
        const x2 = x1 + Math.cos(rad) * s.len * SCENE_W;
        const y2 = y1 + Math.sin(rad) * s.len * SCENE_W * 0.15;
        return (
          <line
            key={`star-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#e8c878"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.55"
          />
        );
      })}

      <rect x="0" y={y0} width={SCENE_W} height={SCENE_H - y0} fill="url(#lakeG)" />
      <rect x="0" y={y0 - 2} width={SCENE_W} height="3" fill={SCENE.colors.band} opacity="0.45" />

      {SCENE.layers.map((l) => (
        <MountainLayer key={l.cssVar} l={l} />
      ))}

      <image href={SCENE.tree.src} x={tx} y={ty} width={treeW} height={treeH} />

      {reflect > 0 && (
        <g clipPath="url(#lakeClip)" opacity={reflect}>
          <image
            href={SCENE.tree.src}
            x={tx}
            y={ty}
            width={treeW}
            height={treeH}
            transform={`translate(0 ${y0 * 2}) scale(1 -1)`}
          />
        </g>
      )}
    </svg>
  );
}
