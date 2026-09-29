// 共享渲染逻辑 — React 组件与 scene-studio 预览共用同一套 path 算法
import { shadeHex } from './scene-color';
import type { Layer } from './scene-config';
import { SCENE } from './scene-config';

export function sceneSize() {
  return { w: SCENE.design?.width ?? 1000, h: SCENE.design?.height ?? 1400 };
}

/** @deprecated use sceneSize() — kept for short imports */
export const SCENE_W = 1000;
export const SCENE_H = 1400;

/** x,y 均为 0–1 相对画布；y=0 顶 y=1 底，无“峰高”公式限制 */
export function peakToPx(p: { x: number; y: number }, layer: Layer) {
  const { w, h } = sceneSize();
  return { x: p.x * w, y: p.y * h + layer.base * 6 };
}

export function layerPath(l: Layer) {
  const { w, h } = sceneSize();
  const y0 = h * SCENE.horizon;
  const P = l.peaks.map((p) => peakToPx(p, l));
  let d = `M-20 ${P[0].y.toFixed(0)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const { x: x1, y: y1 } = P[i];
    const { x: x2 } = P[i + 1];
    if (l.soft > 0.02)
      d += ` Q ${x1.toFixed(0)} ${y1.toFixed(0)} ${((x1 + x2) / 2).toFixed(0)} ${((y1 + P[i + 1].y) / 2).toFixed(0)}`;
    else d += ` L ${x1.toFixed(0)} ${y1.toFixed(0)}`;
  }
  const last = P[P.length - 1];
  d += ` L ${last.x.toFixed(0)} ${last.y.toFixed(0)} L ${w + 20} ${y0 + 2} L -20 ${y0 + 2} Z`;
  return d;
}

export type Facet = { d: string; fill: string };

/**
 * 面片明暗：每个坡段一块四边形；棱线 = 左峰顶 → 基线上 [左谷,右谷] 内一点（非峰顶正下方竖切）。
 */
export function layerFacets(l: Layer, baseColor: string): Facet[] {
  const { w, h } = sceneSize();
  const y0 = h * SCENE.horizon;
  const P = l.peaks.map((p) => peakToPx(p, l));
  const { facetLight, facetDark, facetRidgeSlope = 0.45 } = SCENE.render;
  const facets: Facet[] = [];
  const y0s = y0.toFixed(1);

  function segmentFacets(
    A: { x: number; y: number },
    B: { x: number; y: number },
    vLx: number,
    vRx: number,
  ) {
    const t = Math.max(0.08, Math.min(0.92, facetRidgeSlope));
    const sx = vLx + t * (vRx - vLx);
    facets.push({
      d: `M ${A.x.toFixed(1)} ${A.y.toFixed(1)} L ${B.x.toFixed(1)} ${B.y.toFixed(1)} L ${vRx.toFixed(1)} ${y0s} Z`,
      fill: shadeHex(baseColor, facetLight),
    });
    facets.push({
      d: `M ${A.x.toFixed(1)} ${A.y.toFixed(1)} L ${sx.toFixed(1)} ${y0s} L ${vLx.toFixed(1)} ${y0s} Z`,
      fill: shadeHex(baseColor, -facetDark),
    });
    if (sx < vRx - 0.5) {
      facets.push({
        d: `M ${A.x.toFixed(1)} ${A.y.toFixed(1)} L ${vRx.toFixed(1)} ${y0s} L ${sx.toFixed(1)} ${y0s} Z`,
        fill: shadeHex(baseColor, facetLight),
      });
    }
  }

  if (P.length === 1) {
    const apex = P[0];
    segmentFacets(apex, { x: apex.x + 40, y: apex.y }, -20, w + 20);
    return facets;
  }

  for (let i = 0; i < P.length - 1; i++) {
    const vLx = i === 0 ? -20 : (P[i - 1].x + P[i].x) / 2;
    const vRx = (P[i].x + P[i + 1].x) / 2;
    segmentFacets(P[i], P[i + 1], vLx, vRx);
  }

  const last = P[P.length - 1];
  segmentFacets(
    last,
    { x: w + 20, y: last.y },
    (P[P.length - 2].x + last.x) / 2,
    w + 20,
  );

  return facets;
}

export function viewBoxForVariant(variant: 'wide' | 'full') {
  const { w, h } = sceneSize();
  return variant === 'wide'
    ? `0 ${Math.round(h * (SCENE.horizon - 0.36))} ${w} ${Math.round(h * 0.52)}`
    : `0 0 ${w} ${h}`;
}

export function buildSceneSvg(variant: 'wide' | 'full') {
  const { w, h } = sceneSize();
  const y0 = Math.round(h * SCENE.horizon);
  const vb = viewBoxForVariant(variant);
  const ty = h * (SCENE.horizon - 0.02) - h * SCENE.tree.size;
  const tx = SCENE.tree.x * w;
  const ts = h * SCENE.tree.size * 0.55;
  const paths =
    SCENE.render.mode === 'faceted'
      ? SCENE.layers
          .flatMap((l) =>
            layerFacets(l, l.color).map(
              (f) =>
                `<path d="${f.d}" fill="var(${l.cssVar}, ${f.fill})"${SCENE.render.edgeStroke > 0 ? ` stroke="rgba(255,255,255,${SCENE.render.edgeStroke})" stroke-width="${SCENE.render.edgeWidth}"` : ''}/>`,
            ),
          )
          .join('\n    ')
      : SCENE.layers
          .map((l) => `<path d="${layerPath(l)}" fill="var(${l.cssVar}, ${l.color})"/>`)
          .join('\n    ');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="lakeG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${SCENE.colors.lake}"/>
      <stop offset="1" stop-color="${SCENE.colors.lakedeep}"/>
    </linearGradient>
  </defs>
  <rect x="0" y="${y0}" width="${w}" height="${h - y0}" fill="url(#lakeG)"/>
  <rect x="0" y="${y0 - 2}" width="${w}" height="3" fill="${SCENE.colors.band}" opacity="0.5"/>
  ${paths}
  <image href="${SCENE.tree.src}" x="${tx}" y="${ty}" width="${ts * 0.58}" height="${ts}"/>
</svg>`;
}
