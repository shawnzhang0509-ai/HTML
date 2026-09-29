// lib/scene-config.ts — Wanaka 场景的唯一事实源
// 修改这里 → 保存 → 浏览器热更新立即生效。山的形状从此是版本控制的数字。
// 坐标系: 1000 x 1400 设计稿单位。y 越小越高。

export type Peak = { x: number; y: number }; // x: 0-1 横向, y: 0-1 峰高(1=最高)

export type Layer = {
  color: string; // 填充色 (日循环时会被 CSS 变量覆盖, 此处为回退值)
  cssVar: string; // 对应 var(--m1..m4)
  base: number; // 下沉量 (0-60, 越大层越低)
  soft: number; // 0=三角硬峰 1=圆润
  peaks: Peak[]; // 从左到右排列
};

export const SCENE = {
  horizon: 0.54, // 地平线 (0-1)
  colors: {
    sky: '#07406d', // 页面背景色, 也是 SVG 透明区露出的天
    lake: '#0a5083',
    lakedeep: '#083a63',
    band: '#2a6ea0', // 地平线上那道亮带
    snow: '#e8eef4',
  },
  tree: { x: 0.33, size: 0.15, src: '/tree.svg' },
  layers: [
    {
      color: '#6c99bb',
      cssVar: '--m1',
      base: 0,
      soft: 0.25,
      peaks: [
        { x: 0.0, y: 0.62 },
        { x: 0.1, y: 0.78 },
        { x: 0.22, y: 0.58 },
        { x: 0.34, y: 0.82 },
        { x: 0.46, y: 0.6 },
        { x: 0.58, y: 0.8 },
        { x: 0.7, y: 0.58 },
        { x: 0.82, y: 0.76 },
        { x: 0.94, y: 0.62 },
        { x: 1.0, y: 0.7 },
      ],
    },
    {
      color: '#3f6f9e',
      cssVar: '--m2',
      base: 12,
      soft: 0.18,
      peaks: [
        { x: 0.0, y: 0.44 },
        { x: 0.13, y: 0.62 },
        { x: 0.26, y: 0.4 },
        { x: 0.4, y: 0.66 },
        { x: 0.53, y: 0.42 },
        { x: 0.66, y: 0.62 },
        { x: 0.79, y: 0.44 },
        { x: 0.92, y: 0.6 },
        { x: 1.0, y: 0.48 },
      ],
    },
    {
      color: '#1d4f7d',
      cssVar: '--m3',
      base: 26,
      soft: 0.12,
      peaks: [
        { x: 0.0, y: 0.28 },
        { x: 0.16, y: 0.48 },
        { x: 0.31, y: 0.24 },
        { x: 0.47, y: 0.52 },
        { x: 0.62, y: 0.26 },
        { x: 0.77, y: 0.46 },
        { x: 0.9, y: 0.28 },
        { x: 1.0, y: 0.4 },
      ],
    },
    {
      color: '#0a2f52',
      cssVar: '--m4',
      base: 40,
      soft: 0.08,
      peaks: [
        { x: 0.0, y: 0.12 },
        { x: 0.2, y: 0.34 },
        { x: 0.38, y: 0.1 },
        { x: 0.56, y: 0.36 },
        { x: 0.74, y: 0.12 },
        { x: 0.9, y: 0.3 },
        { x: 1.0, y: 0.18 },
      ],
    },
  ] as Layer[],
};
