import './SolarTermCard.css';

const seasonEmoji = { 春: '🌸', 夏: '☀️', 秋: '🍂', 冬: '❄️' };

export default function SolarTermCard({ data }) {
  if (!data) return null;
  const emoji = seasonEmoji[data.season] || '🌿';
  return (
    <div className="stc card">
      <div className="stc-top">
        <span className="stc-emoji">{emoji}</span>
        <div>
          <p className="stc-label">現在節氣</p>
          <h2 className="stc-name">{data.term_name}</h2>
          <span className="stc-season badge badge-green">{data.season}季</span>
        </div>
      </div>
      <p className="stc-desc">{data.description}</p>
      <div className="stc-tips">
        {data.shopping_tip && (
          <div className="stc-tip">
            <span className="stc-tip-icon">🛒</span>
            <span>{data.shopping_tip}</span>
          </div>
        )}
        {data.health_tip && (
          <div className="stc-tip">
            <span className="stc-tip-icon">💚</span>
            <span>{data.health_tip}</span>
          </div>
        )}
        {data.risk_note && (
          <div className="stc-tip stc-tip-warn">
            <span className="stc-tip-icon">⚠️</span>
            <span>{data.risk_note}</span>
          </div>
        )}
      </div>
      {data.recommended_products?.length > 0 && (
        <div className="stc-products">
          <p className="stc-products-label">本節氣推薦食材</p>
          <div className="stc-tags">
            {data.recommended_products.map(p => (
              <span key={p} className="badge badge-green">{p}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
