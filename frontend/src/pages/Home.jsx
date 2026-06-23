import { useApi } from '../hooks/useApi';
import SolarTermCard from '../components/SolarTermCard';
import AlertCard from '../components/AlertCard';
import PriceCard from '../components/PriceCard';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const { data, loading, error } = useApi('/api/home');
  const navigate = useNavigate();

  if (loading) return <div className="spinner" />;
  if (error)   return <p className="empty">⚠ 無法連線到後端，請先啟動 FastAPI 伺服器。</p>;

  const { solar_term, typhoon, weather_alerts = [], recommendations = [] } = data;

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">🌱 農業科技 × 即時行情</div>
          <h1 className="hero-title">今天，讓數據<br />幫你買到好價錢</h1>
          <p className="hero-sub">整合 24 節氣、產地天氣、市場行情，給你最即時的採買建議</p>
          <div className="hero-stats">
            <div className="hero-stat"><strong>24</strong><span>節氣追蹤</span></div>
            <div className="hero-stat"><strong>即時</strong><span>產地天氣</span></div>
            <div className="hero-stat"><strong>AI</strong><span>採買建議</span></div>
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/search')}>搜尋菜價 →</button>
            <button className="btn btn-secondary" onClick={() => navigate('/solar-term')}>今日節氣</button>
          </div>
        </div>
      </section>

      <div className="container home-body">

        {/* 節氣卡片 */}
        <SolarTermCard data={solar_term} />

        {/* 颱風警報 */}
        {typhoon?.active && (
          <AlertCard title="颱風提醒" message={typhoon.message} riskLevel="很高" />
        )}

        {/* 天氣警示 */}
        {weather_alerts.map((w, i) => (
          <AlertCard
            key={i}
            title={`${w.product_name}｜產地天氣`}
            message={w.message}
            riskLevel={w.risk_level}
          />
        ))}

        {/* 今日採買推薦 */}
        <section className="section">
          <h2 className="section-title">今日採買參考</h2>
          <div className="grid-2">
            {recommendations.map((item, i) => (
              <PriceCard
                key={i}
                item={item}
                onClick={() => navigate(`/search?q=${item.product_name}`)}
              />
            ))}
          </div>
          <p className="home-hint">點擊卡片或前往「搜尋菜價」查看更多品項</p>
        </section>
      </div>
    </div>
  );
}
