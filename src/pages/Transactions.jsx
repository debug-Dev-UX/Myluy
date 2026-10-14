import { useState } from 'react';
import { useApp } from '../context/AppContext';

const today = () => new Date().toISOString().split('T')[0];

function TransactionModal({ mode, initial, onSave, onClose }) {
  const { t, INCOME_CATEGORIES, EXPENSE_CATEGORIES, CATEGORY_ICONS } = useApp();
  const [form, setForm] = useState({
    type: initial?.type || 'expense',
    amount: initial?.amount || '',
    description: initial?.description || '',
    category: initial?.category || 'food',
    date: initial?.date || today(),
    note: initial?.note || '',
  });

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (type) => {
    const defaultCat = type === 'income' ? 'salary' : 'food';
    setForm(f => ({ ...f, type, category: defaultCat }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.description) return;
    onSave({ ...form, amount: parseFloat(form.amount) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'add' ? t.addTransaction : t.editTransaction}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Type Toggle */}
          <div className="type-toggle">
            <button
              type="button"
              className={`type-btn ${form.type === 'income' ? 'active-income' : ''}`}
              onClick={() => handleTypeChange('income')}
            >📥 {t.income}</button>
            <button
              type="button"
              className={`type-btn ${form.type === 'expense' ? 'active-expense' : ''}`}
              onClick={() => handleTypeChange('expense')}
            >📤 {t.expense}</button>
          </div>

          <div className="form-row">
            <label className="form-label">{t.amount} (៛) *</label>
            <input
              className="form-input"
              type="number"
              min="0"
              step="any"
              placeholder="0"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">{t.description} *</label>
            <input
              className="form-input"
              type="text"
              placeholder={t.description}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">{t.category}</label>
            <div className="category-grid">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-btn ${form.category === cat ? 'selected' : ''}`}
                  onClick={() => setForm(f => ({ ...f, category: cat }))}
                >
                  <span>{CATEGORY_ICONS[cat]}</span>
                  <span>{t[cat]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">{t.date}</label>
            <input
              className="form-input"
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <label className="form-label">{t.note} ({t.optional})</label>
            <input
              className="form-input"
              type="text"
              placeholder={t.note}
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>{t.cancel}</button>
            <button type="submit" className="btn-primary">{t.save}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onClose }) {
  const { t } = useApp();
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.confirm}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <p className="confirm-msg">{message}</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
          <button className="btn-danger" onClick={onConfirm}>{t.delete}</button>
        </div>
      </div>
    </div>
  );
}

export default function Transactions() {
  const { t, transactions, addTransaction, updateTransaction, deleteTransaction, CATEGORY_ICONS, CATEGORY_COLORS } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [deleteTxId, setDeleteTxId] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  let filtered = transactions
    .filter(tx => filterType === 'all' || tx.type === filterType)
    .filter(tx => tx.description.toLowerCase().includes(search.toLowerCase()) || t[tx.category]?.toLowerCase().includes(search.toLowerCase()));

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highestAmount') return b.amount - a.amount;
    if (sortBy === 'lowestAmount') return a.amount - b.amount;
    return 0;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">💳 {t.transactions}</h1>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>+ {t.addTransaction}</button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input
          className="form-input search-input"
          type="text"
          placeholder={t.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="form-input" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">{t.all}</option>
          <option value="income">{t.income}</option>
          <option value="expense">{t.expense}</option>
        </select>
        <select className="form-input" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="newest">{t.newest}</option>
          <option value="oldest">{t.oldest}</option>
          <option value="highestAmount">{t.highestAmount}</option>
          <option value="lowestAmount">{t.lowestAmount}</option>
        </select>
      </div>

      {/* Transaction list */}
      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">💳</p>
            <p>{t.noTransactions}</p>
            <p className="empty-sub">{t.addFirstTransaction}</p>
          </div>
        ) : (
          <div className="tx-list">
            {filtered.map(tx => (
              <div key={tx.id} className="tx-row tx-row-full">
                <div className="tx-icon-wrap" style={{ background: `${CATEGORY_COLORS[tx.category]}22` }}>
                  <span>{CATEGORY_ICONS[tx.category]}</span>
                </div>
                <div className="tx-info">
                  <p className="tx-desc">{tx.description}</p>
                  <p className="tx-meta">{t[tx.category]} · {tx.date}</p>
                  {tx.note && <p className="tx-note">📝 {tx.note}</p>}
                </div>
                <span className={`tx-amount ${tx.type}`}>
                  {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()}៛
                </span>
                <div className="tx-actions">
                  <button className="icon-btn edit-btn" onClick={() => setEditTx(tx)} title={t.editTransaction}>✏️</button>
                  <button className="icon-btn del-btn" onClick={() => setDeleteTxId(tx.id)} title={t.deleteTransaction}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAdd && (
        <TransactionModal
          mode="add"
          initial={null}
          onSave={(data) => { addTransaction(data); setShowAdd(false); }}
          onClose={() => setShowAdd(false)}
        />
      )}
      {editTx && (
        <TransactionModal
          mode="edit"
          initial={editTx}
          onSave={(data) => { updateTransaction(editTx.id, data); setEditTx(null); }}
          onClose={() => setEditTx(null)}
        />
      )}
      {deleteTxId && (
        <ConfirmModal
          message={t.confirmDelete}
          onConfirm={() => { deleteTransaction(deleteTxId); setDeleteTxId(null); }}
          onClose={() => setDeleteTxId(null)}
        />
      )}
    </div>
  );
}
