import './AlertCard.css';

const riskStyle = {
  '高':   { cls: 'alert-warn',   icon: '⚠️' },
  '很高': { cls: 'alert-danger', icon: '🚨' },
  '中':   { cls: 'alert-info',   icon: 'ℹ️' },
};

export default function AlertCard({ title, message, riskLevel }) {
  const style = riskStyle[riskLevel] || { cls: 'alert-info', icon: 'ℹ️' };
  return (
    <div className={`alert-card ${style.cls}`}>
      <span className="alert-icon">{style.icon}</span>
      <div>
        <p className="alert-title">{title}</p>
        <p className="alert-msg">{message}</p>
      </div>
    </div>
  );
}
