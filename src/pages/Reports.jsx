import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const MONTHS_KH = [
  'មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា',
  'កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'
];

function BarChart({ incomeData, expenseData, labels }) {
  const maxVal = Math.max(...incomeData, ...expenseData, 1);
  return (
    <div className="bar-chart">
      {labels.map((label, i) => {
        const incPct = (incomeData[i] / maxVal) * 100;
        const expPct = (expenseData[i] / maxVal) * 100;
        return (
          <div key={i} className="bar-col">
            <div className="bar-pair">
              <div className="bar bar-income" style={{ height: `${incPct}%` }} title={`Income: ${incomeData[i].toLocaleString()}៛`} />
              <div className="bar bar-expense" style={{ height: `${expPct}%` }} title={`Expense: ${expenseData[i].toLocaleString()}៛`} />
            </div>
            <p className="bar-label">{label}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function Reports() {
  const { t, lang, transactions, EXPENSE_CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS } = useApp();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());

  const years = [now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2];

  const monthlyData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const monthStr = `${year}-${String(i + 1).padStart(2, '0')}`;
      const monthTx = transactions.filter(tx => tx.date.startsWith(monthStr));
      const income = monthTx.filter(tx => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0);
      const expense = monthTx.filter(tx => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0);
      return { income, expense, net: income - expense };
    });
    return months;
  }, [transactions, year]);

  const yearlyIncome = monthlyData.reduce((s, m) => s + m.income, 0);
  const yearlyExpense = monthlyData.reduce((s, m) => s + m.expense, 0);
  const yearlyNet = yearlyIncome - yearlyExpense;

  const yearTx = transactions.filter(tx => tx.date.startsWith(String(year)));
  const catSummary = EXPENSE_CATEGORIES.map(cat => ({
    cat,
    total: yearTx.filter(tx => tx.type === 'expense' && tx.category === cat).reduce((s, tx) => s + tx.amount, 0),
  })).filter(d => d.total > 0).sort((a, b) => b.total - a.total);

  const monthLabels = (lang === 'kh' ? MONTHS_KH : MONTHS).map(m => m.slice(0, 3));

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">📈 {t.reportsTitle}</h1>
        <select className="form-input year-select" value={year} onChange={e => setYear(Number(e.target.value))}>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {/* Yearly Summary */}
      <div className="stat-grid">
        <div className="stat-card stat-green">
          <div className="stat-icon">📥</div>
          <div className="stat-content">
            <p className="stat-label">{t.totalIncome} {year}</p>
            <p className="stat-value">{yearlyIncome.toLocaleString()}៛</p>
          </div>
        </div>
        <div className="stat-card stat-red">
          <div className="stat-icon">📤</div>
          <div className="stat-content">
            <p className="stat-label">{t.totalExpenses} {year}</p>
            <p className="stat-value">{yearlyExpense.toLocaleString()}៛</p>
          </div>
        </div>
        <div className={`stat-card ${yearlyNet >= 0 ? 'stat-blue' : 'stat-orange'}`}>
          <div className="stat-icon">💹</div>
          <div className="stat-content">
            <p className="stat-label">{t.netWorth}</p>
            <p className="stat-value">{yearlyNet >= 0 ? '+' : ''}{yearlyNet.toLocaleString()}៛</p>
          </div>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="card">
        <h2 className="card-title">{t.incomeVsExpense} — {year}</h2>
        <div className="chart-legend">
          <span className="legend-badge income">◼ {t.income}</span>
          <span className="legend-badge expense">◼ {t.expense}</span>
        </div>
        <BarChart
          incomeData={monthlyData.map(m => m.income)}
          expenseData={monthlyData.map(m => m.expense)}
          labels={monthLabels}
        />
      </div>

      {/* Monthly table */}
      <div className="card">
        <h2 className="card-title">{t.monthlyOverview}</h2>
        <div className="report-table-wrap">
          <table className="report-table">
            <thead>
              <tr>
                <th>{lang === 'kh' ? 'ខែ' : 'Month'}</th>
                <th>{t.income}</th>
                <th>{t.expense}</th>
                <th>{t.balance}</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m, i) => (
                <tr key={i}>
                  <td>{lang === 'kh' ? MONTHS_KH[i] : MONTHS[i]}</td>
                  <td className="income">+{m.income.toLocaleString()}៛</td>
                  <td className="expense">-{m.expense.toLocaleString()}៛</td>
                  <td className={m.net >= 0 ? 'income' : 'expense'}>{m.net >= 0 ? '+' : ''}{m.net.toLocaleString()}៛</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top spending */}
      {catSummary.length > 0 && (
        <div className="card">
          <h2 className="card-title">{t.spendingByCategory} — {year}</h2>
          <div className="top-spending">
            {catSummary.map(({ cat, total }) => {
              const pct = yearlyExpense > 0 ? (total / yearlyExpense) * 100 : 0;
              return (
                <div key={cat} className="top-spend-row">
                  <div className="top-spend-label">
                    <span>{CATEGORY_ICONS[cat]}</span>
                    <span>{t[cat]}</span>
                  </div>
                  <div className="top-spend-bar-track">
                    <div className="top-spend-bar-fill" style={{ width: `${pct}%`, background: CATEGORY_COLORS[cat] }} />
                  </div>
                  <div className="top-spend-right">
                    <span>{pct.toFixed(1)}%</span>
                    <span>{total.toLocaleString()}៛</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
