// lib/scene-config.ts — Wanaka 场景的唯一事实源
// 修改这里 → 保存 → 热更新。Payman 风参考图：render.mode='faceted' + 各层 soft=0 + 描边很淡。
// 坐标系: design 宽高。peak.x / peak.y 为 0–1（左→右，顶→底），拖哪算哪。

export type Peak = { x: number; y: number };

export type Layer = {
  color: string;
  cssVar: string;
  base: number;
  soft: number; // faceted 模式忽略曲线；silhouette 时 0=硬脊线
  peaks: Peak[];
};

export type ShootingStar = { x: number; y: number; len: number; angle?: number };

export const SCENE = {
  /** SVG viewBox，与 Scene Trace 画布一致；peaks 的 x/y 仍是 0–1 相对比例 */
  design: { width: 1000, height: 1400, fit: 'slice' as 'slice' | 'meet' },
  horizon: 0.54,
  colors: {
    sky: '#062a4a',
    lake: '#0a5083',
    lakedeep: '#062a4a',
    band: '#2a6ea0',
    snow: '#e8eef4',
  },
  /** Payman 风：面片棱线 + 可选描边，不是波形 hill */
  render: {
    mode: 'faceted' as 'faceted' | 'silhouette',
    facetLight: 0.14, // 左斜面提亮
    facetDark: 0.12, // 右斜面压暗
    edgeStroke: 0.1, // 0=纯色块棱线；0.08~0.15=细白描边
    edgeWidth: 0.75,
  },
  shootingStars: [
    { x: 0.78, y: 0.06, len: 0.09, angle: -4 },
    { x: 0.88, y: 0.1, len: 0.06, angle: -6 },
    { x: 0.72, y: 0.14, len: 0.05, angle: -3 },
  ] as ShootingStar[],
  tree: { x: 0.33, size: 0.15, src: '/tree.svg', reflection: 0.42 },
  layers: [
    {
      color: '#b8d4ea',
      cssVar: '--m1',
      base: 0,
      soft: 0,
      peaks: [
        { x: 0.0, y: 0.55 },
        { x: 0.08, y: 0.72 },
        { x: 0.18, y: 0.48 },
        { x: 0.28, y: 0.78 },
        { x: 0.38, y: 0.52 },
        { x: 0.48, y: 0.74 },
        { x: 0.58, y: 0.5 },
        { x: 0.68, y: 0.7 },
        { x: 0.8, y: 0.54 },
        { x: 0.92, y: 0.68 },
        { x: 1.0, y: 0.58 },
      ],
    },
    {
      color: '#5a8fc0',
      cssVar: '--m2',
      base: 10,
      soft: 0,
      peaks: [
        { x: 0.0, y: 0.38 },
        { x: 0.12, y: 0.58 },
        { x: 0.24, y: 0.32 },
        { x: 0.36, y: 0.62 },
        { x: 0.5, y: 0.34 },
        { x: 0.64, y: 0.56 },
        { x: 0.78, y: 0.36 },
        { x: 0.9, y: 0.52 },
        { x: 1.0, y: 0.4 },
      ],
    },
    {
      color: '#2d5f8f',
      cssVar: '--m3',
      base: 22,
      soft: 0,
      peaks: [
        { x: 0.0, y: 0.22 },
        { x: 0.15, y: 0.42 },
        { x: 0.3, y: 0.18 },
        { x: 0.45, y: 0.46 },
        { x: 0.6, y: 0.2 },
        { x: 0.75, y: 0.4 },
        { x: 0.88, y: 0.22 },
        { x: 1.0, y: 0.32 },
      ],
    },
    {
      color: '#0f2844',
      cssVar: '--m4',
      base: 36,
      soft: 0,
      peaks: [
        { x: 0.0, y: 0.08 },
        { x: 0.18, y: 0.28 },
        { x: 0.36, y: 0.06 },
        { x: 0.54, y: 0.3 },
        { x: 0.72, y: 0.1 },
        { x: 0.88, y: 0.26 },
        { x: 1.0, y: 0.14 },
      ],
    },
  ] as Layer[],
};
