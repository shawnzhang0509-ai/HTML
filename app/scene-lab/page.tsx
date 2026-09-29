// app/scene-lab/page.tsx — 场景实验室 (开发用, 上线前删除此路由)
// 用法: npm run dev → 打开 /scene-lab → 在 Cursor 里改 lib/scene-config.ts → 看这里热更新
import WanakaScene from '@/components/WanakaScene';

export default function SceneLab() {
  return (
    <main style={{ position: 'fixed', inset: 0, background: '#07406d' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <WanakaScene variant="full" />
      </div>
      <p
        style={{
          position: 'absolute',
          top: 12,
          left: 14,
          color: 'rgba(255,255,255,.55)',
          font: '13px system-ui',
        }}
      >
        /scene-lab · 改 lib/scene-config.ts 此处即时更新 · 满意后 git commit
      </p>
    </main>
  );
}
