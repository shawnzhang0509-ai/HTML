import { StrictMode, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import WanakaScene from '@/components/WanakaScene';
import { SCENE } from '@/lib/scene-config';

function SceneLab() {
  const [variant, setVariant] = useState<'wide' | 'full'>('full');
  return (
    <main style={{ position: 'fixed', inset: 0, background: SCENE.colors.sky }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <WanakaScene variant={variant} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 14,
          right: 14,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
          color: 'rgba(255,255,255,.7)',
          font: '13px system-ui',
        }}
      >
        <span>scene-lab · 改 lib/scene-config.ts 热更新</span>
        <button type="button" onClick={() => setVariant('full')} style={btn(variant === 'full')}>
          全幅
        </button>
        <button type="button" onClick={() => setVariant('wide')} style={btn(variant === 'wide')}>
          宽窗裁切
        </button>
      </div>
    </main>
  );
}

function btn(active: boolean): CSSProperties {
  return {
    padding: '4px 10px',
    borderRadius: 6,
    border: '1px solid rgba(255,255,255,.35)',
    background: active ? 'rgba(255,255,255,.2)' : 'transparent',
    color: 'inherit',
    cursor: 'pointer',
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SceneLab />
  </StrictMode>,
);
