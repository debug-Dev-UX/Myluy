import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Budget() {
  const { t, budgets, saveBudget, spendingByCategory, EXPENSE_CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS } = useApp();
  const [editing, setEditing] = useState(null);
  const [inputVal, setInputVal] = useState('');

  const handleEdit = (cat) => {
    setEditing(cat);
    setInputVal(budgets[cat] || '');
  };

  const handleSave = (cat) => {
    saveBudget(cat, parseFloat(inputVal) || 0);
    setEditing(null);
  };

  const totalBudget = Object.values(budgets).reduce((s, v) => s + (v || 0), 0);
  const totalSpent = Object.values(spendingByCategory).reduce((s, v) => s + v, 0);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">🎯 {t.budgetTitle}</h1>
      </div>

      {/* Summary */}
      <div className="stat-grid stat-grid-2">
        <div className="stat-card stat-blue">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <p className="stat-label">{t.monthlyBudget}</p>
            <p className="stat-value">{totalBudget.toLocaleString()}៛</p>
          </div>
        </div>
        <div className={`stat-card ${totalSpent > totalBudget && totalBudget > 0 ? 'stat-red' : 'stat-green'}`}>
          <div className="stat-icon">{totalSpent > totalBudget && totalBudget > 0 ? '⚠️' : '✅'}</div>
          <div className="stat-content">
            <p className="stat-label">{totalSpent > totalBudget && totalBudget > 0 ? t.overBudget : t.remaining}</p>
            <p className="stat-value">{Math.abs(totalBudget - totalSpent).toLocaleString()}៛</p>
          </div>
        </div>
      </div>

      {/* Category Budgets */}
      <div className="card">
        <h2 className="card-title">{t.setBudget}</h2>
        <div className="budget-list">
          {EXPENSE_CATEGORIES.map(cat => {
            const budget = budgets[cat] || 0;
            const spent = spendingByCategory[cat] || 0;
            const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
            const over = budget > 0 && spent > budget;
            const color = over ? '#ef4444' : CATEGORY_COLORS[cat];

            return (
              <div key={cat} className="budget-row">
                <div className="budget-row-top">
                  <div className="budget-cat-label">
                    <span className="budget-icon" style={{ background: `${color}22` }}>{CATEGORY_ICONS[cat]}</span>
                    <span className="budget-cat-name">{t[cat]}</span>
                  </div>
                  <div className="budget-amounts">
                    <span className={`budget-spent ${over ? 'over' : ''}`}>{spent.toLocaleString()}៛</span>
                    <span className="budget-sep">/</span>
                    {editing === cat ? (
                      <input
                        className="budget-input"
                        type="number"
                        min="0"
                        value={inputVal}
                        autoFocus
                        onChange={e => setInputVal(e.target.value)}
                        onBlur={() => handleSave(cat)}
                        onKeyDown={e => e.key === 'Enter' && handleSave(cat)}
                      />
                    ) : (
                      <button className="budget-limit" onClick={() => handleEdit(cat)}>
                        {budget > 0 ? `${budget.toLocaleString()}៛` : `+ ${t.setBudget}`}
                      </button>
                    )}
                  </div>
                </div>
                <div className="budget-bar-track">
                  <div
                    className="budget-bar-fill"
                    style={{ width: `${pct}%`, background: color, transition: 'width 0.5s ease' }}
                  />
                </div>
                {over && (
                  <p className="budget-warning">⚠️ {t.overBudget} by {(spent - budget).toLocaleString()}៛</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
