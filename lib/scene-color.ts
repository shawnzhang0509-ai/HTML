/** 单色面片明暗 — 模仿 Payman 左上光源，不用渐变 */

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

export function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('')}`;
}

/** amount: 正数变亮，负数变暗，约 ±0.15 适合面片 */
export function shadeHex(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const t = amount >= 0 ? 255 : 0;
  const f = Math.abs(amount);
  return rgbToHex(r + (t - r) * f, g + (t - g) * f, b + (t - b) * f);
}
