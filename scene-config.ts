// lib/scene-config.ts — Wanaka 场景的唯一事实源
// 修改这里 → 保存 → 浏览器热更新立即生效。山的形状从此是版本控制的数字。
// 坐标系: 1000 x 1400 设计稿单位。y 越小越高。

export type Peak = { x: number; y: number };  // x: 0-1 横向, y: 0-1 峰高(1=最高)

export type Layer = {
  color: string;      // 填充色 (日循环时会被 CSS 变量覆盖, 此处为回退值)
  cssVar: string;     // 对应 var(--m1..m4)
  base: number;       // 下沉量 (0-60, 越大层越低)
  soft: number;       // 0=三角硬峰 1=圆润
  peaks: Peak[];      // 从左到右排列
};

export const SCENE = {
  horizon: 0.54,                     // 地平线 (0-1)
  colors: {
    sky:    '#07406d',               // 页面背景色, 也是 SVG 透明区露出的天
    lake:   '#0a5083',
    lakedeep: '#083a63',
    band:   '#2a6ea0',               // 地平线上那道亮带
    snow:   '#e8eef4',
  },
  tree: { x: 0.33, size: 0.15, src: '/tree.png' },
  layers: [
    { color: '#6c99bb', cssVar: '--m1', base: 0,   soft: 0.25,
      peaks: [ {x:.00,y:.62},{x:.10,y:.78},{x:.22,y:.58},{x:.34,y:.82},{x:.46,y:.60},
               {x:.58,y:.80},{x:.70,y:.58},{x:.82,y:.76},{x:.94,y:.62},{x:1.0,y:.70} ] },
    { color: '#3f6f9e', cssVar: '--m2', base: 12,  soft: 0.18,
      peaks: [ {x:.00,y:.44},{x:.13,y:.62},{x:.26,y:.40},{x:.40,y:.66},{x:.53,y:.42},
               {x:.66,y:.62},{x:.79,y:.44},{x:.92,y:.60},{x:1.0,y:.48} ] },
    { color: '#1d4f7d', cssVar: '--m3', base: 26,  soft: 0.12,
      peaks: [ {x:.00,y:.28},{x:.16,y:.48},{x:.31,y:.24},{x:.47,y:.52},{x:.62,y:.26},
               {x:.77,y:.46},{x:.90,y:.28},{x:1.0,y:.40} ] },
    { color: '#0a2f52', cssVar: '--m4', base: 40,  soft: 0.08,
      peaks: [ {x:.00,y:.12},{x:.20,y:.34},{x:.38,y:.10},{x:.56,y:.36},{x:.74,y:.12},
               {x:.90,y:.30},{x:1.0,y:.18} ] },
  ] as Layer[],
};
