import { useApp } from '../context/AppContext';

function StatCard({ label, value, icon, colorClass, trend }) {
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {trend !== undefined && (
          <p className={`stat-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend).toLocaleString()} ៛
          </p>
        )}
      </div>
    </div>
  );
}

function CategoryBar({ label, icon, amount, total, color }) {
  const pct = total > 0 ? Math.min((amount / total) * 100, 100) : 0;
  return (
    <div className="category-bar-row">
      <div className="category-bar-label">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="category-bar-track">
        <div className="category-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="category-bar-amount">{amount.toLocaleString()}៛</span>
    </div>
  );
}

function MiniDonutChart({ data, size = 140 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <div className="chart-empty">No data</div>;

  const radius = 50;
  const cx = 60;
  const cy = 60;
  const circum = 2 * Math.PI * radius;

  let cumPct = 0;
  const slices = data.filter(d => d.value > 0).map(d => {
    const pct = d.value / total;
    const slice = { ...d, pct, offset: cumPct };
    cumPct += pct;
    return slice;
  });

  return (
    <div className="donut-chart-wrap">
      <svg width={size} height={size} viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--border)" strokeWidth="18" />
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth="18"
            strokeDasharray={`${s.pct * circum} ${circum}`}
            strokeDashoffset={-(s.offset * circum - circum / 4)}
            strokeLinecap="round"
          />
        ))}
        <text x={cx} y={cy - 5} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Total</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--text-primary)">
          {(total / 1000).toFixed(0)}K
        </text>
      </svg>
      <div className="donut-legend">
        {slices.slice(0, 4).map((s, i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ background: s.color }} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ setActivePage }) {
  const { t, totalBalance, totalIncome, totalExpenses, transactions, spendingByCategory, CATEGORY_ICONS, CATEGORY_COLORS, EXPENSE_CATEGORIES } = useApp();

  const recent = transactions.slice(0, 5);
  const totalExp = Object.values(spendingByCategory).reduce((s, v) => s + v, 0);

  const donutData = EXPENSE_CATEGORIES
    .filter(cat => spendingByCategory[cat] > 0)
    .map(cat => ({
      label: t[cat],
      value: spendingByCategory[cat],
      color: CATEGORY_COLORS[cat],
    }));

  const formatAmount = (amt, type) => {
    const sign = type === 'income' ? '+' : '-';
    return `${sign}${amt.toLocaleString()}៛`;
  };

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <h1 className="page-title">👋 {t.dashboard}</h1>
        <p className="page-subtitle">{t.thisMonth}</p>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <StatCard
          label={t.totalBalance}
          value={`${totalBalance.toLocaleString()}៛`}
          icon="💰"
          colorClass="stat-blue"
        />
        <StatCard
          label={t.totalIncome}
          value={`${totalIncome.toLocaleString()}៛`}
          icon="📥"
          colorClass="stat-green"
        />
        <StatCard
          label={t.totalExpenses}
          value={`${totalExpenses.toLocaleString()}៛`}
          icon="📤"
          colorClass="stat-red"
        />
        <StatCard
          label={t.savings}
          value={`${Math.max(0, totalIncome - totalExpenses).toLocaleString()}៛`}
          icon="🏦"
          colorClass="stat-purple"
        />
      </div>

      <div className="dashboard-grid">
        {/* Recent Transactions */}
        <div className="card">
          <div className="card-header-row">
            <h2 className="card-title">{t.recentTransactions}</h2>
            <button className="link-btn" onClick={() => setActivePage('transactions')}>{t.viewAll} →</button>
          </div>
          {recent.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📝</p>
              <p>{t.noTransactions}</p>
              <p className="empty-sub">{t.addFirstTransaction}</p>
            </div>
          ) : (
            <div className="tx-list">
              {recent.map(tx => (
                <div key={tx.id} className="tx-row">
                  <div className="tx-icon-wrap" style={{ background: `${CATEGORY_COLORS[tx.category]}22` }}>
                    <span>{CATEGORY_ICONS[tx.category]}</span>
                  </div>
                  <div className="tx-info">
                    <p className="tx-desc">{tx.description}</p>
                    <p className="tx-meta">{t[tx.category]} · {tx.date}</p>
                  </div>
                  <span className={`tx-amount ${tx.type}`}>
                    {formatAmount(tx.amount, tx.type)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Spending by Category */}
        <div className="card">
          <h2 className="card-title">{t.spendingByCategory}</h2>
          {totalExp === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📊</p>
              <p>{t.noTransactions}</p>
            </div>
          ) : (
            <div className="spending-section">
              <MiniDonutChart data={donutData} size={130} />
              <div className="category-bars">
                {EXPENSE_CATEGORIES.filter(cat => spendingByCategory[cat] > 0).map(cat => (
                  <CategoryBar
                    key={cat}
                    label={t[cat]}
                    icon={CATEGORY_ICONS[cat]}
                    amount={spendingByCategory[cat]}
                    total={totalExp}
                    color={CATEGORY_COLORS[cat]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
