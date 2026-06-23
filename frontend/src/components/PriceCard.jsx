import './PriceCard.css';

const badgeMap = {
  '便宜':    'badge-green',
  '正常':    'badge-gray',
  '偏貴':    'badge-orange',
  '資料不足': 'badge-gray',
};

const recMap = {
  '推薦購買':   'badge-green',
  '可少量購買': 'badge-orange',
  '改買替代品': 'badge-red',
  '建議觀望':   'badge-red',
  '資料不足':   'badge-gray',
};

export default function PriceCard({ item, onClick }) {
  const priceStatus = item.price_status || item.status;
  const rec         = item.recommendation;

  return (
    <div className="price-card card" onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
      <div className="pc-header">
        <span className="pc-name">{item.product_name}</span>
        <span className={`badge ${badgeMap[priceStatus] || 'badge-gray'}`}>
          {priceStatus}
        </span>
      </div>

      <div className="pc-price">
        {item.today_price != null
          ? <><span className="pc-amount">${item.today_price}</span><span className="pc-unit"> 元/公斤</span></>
          : <span className="pc-na">暫無報價</span>
        }
      </div>

      {item.advice && <p className="pc-advice">{item.advice}</p>}

      {rec && (
        <div className="pc-footer">
          <span className={`badge ${recMap[rec] || 'badge-gray'}`}>{rec}</span>
          {item.weather_risk && item.weather_risk !== '資料不足' && (
            <span className="pc-weather">☁ 產地天氣：{item.weather_risk}</span>
          )}
        </div>
      )}

      {item.alternatives?.length > 0 && (
        <p className="pc-alt">替代品：{item.alternatives.join('、')}</p>
      )}
    </div>
  );
}
