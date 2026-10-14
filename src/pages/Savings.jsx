import { useState } from 'react';
import { useApp } from '../context/AppContext';

const today = () => new Date().toISOString().split('T')[0];

function GoalModal({ mode, initial, onSave, onClose }) {
  const { t } = useApp();
  const [form, setForm] = useState({
    name: initial?.name || '',
    target: initial?.target || '',
    deadline: initial?.deadline || '',
    emoji: initial?.emoji || '🎯',
  });

  const emojis = ['🎯', '🏠', '🚗', '✈️', '📱', '💻', '🎓', '💍', '🏝️', '🛍️', '💰', '🎁'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.target) return;
    onSave({ ...form, target: parseFloat(form.target) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'add' ? t.addGoal : t.editGoal}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">{t.goalName} *</label>
            <input
              className="form-input"
              type="text"
              placeholder={t.goalName}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Icon</label>
            <div className="emoji-grid">
              {emojis.map(em => (
                <button
                  key={em}
                  type="button"
                  className={`emoji-btn ${form.emoji === em ? 'selected' : ''}`}
                  onClick={() => setForm(f => ({ ...f, emoji: em }))}
                >{em}</button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">{t.targetAmount} (៛) *</label>
            <input
              className="form-input"
              type="number"
              min="0"
              placeholder="0"
              value={form.target}
              onChange={e => setForm(f => ({ ...f, target: e.target.value }))}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">{t.deadline} ({t.optional})</label>
            <input
              className="form-input"
              type="date"
              value={form.deadline}
              onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
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

function AddFundsModal({ goal, onAdd, onClose }) {
  const { t } = useApp();
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    onAdd(parseFloat(amount));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.addFunds} — {goal.emoji} {goal.name}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">{t.fundsToAdd} (៛)</label>
            <input
              className="form-input"
              type="number"
              min="0"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>{t.cancel}</button>
            <button type="submit" className="btn-primary">{t.addFunds}</button>
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

export default function Savings() {
  const { t, goals, addGoal, updateGoal, deleteGoal, addFundsToGoal } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editGoal, setEditGoal] = useState(null);
  const [fundsGoal, setFundsGoal] = useState(null);
  const [deleteGoalId, setDeleteGoalId] = useState(null);

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalSaved = goals.reduce((s, g) => s + g.current, 0);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">🏦 {t.savingsGoals}</h1>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>+ {t.addGoal}</button>
      </div>

      {/* Summary */}
      <div className="stat-grid stat-grid-2">
        <div className="stat-card stat-green">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">{t.currentAmount}</p>
            <p className="stat-value">{totalSaved.toLocaleString()}៛</p>
          </div>
        </div>
        <div className="stat-card stat-purple">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <p className="stat-label">{t.targetAmount}</p>
            <p className="stat-value">{totalTarget.toLocaleString()}៛</p>
          </div>
        </div>
      </div>

      {/* Goals list */}
      {goals.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <p className="empty-icon">🏦</p>
            <p>{t.noTransactions}</p>
            <p className="empty-sub">{t.addFirstTransaction}</p>
          </div>
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map(goal => {
            const pct = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;
            const done = goal.current >= goal.target;
            return (
              <div key={goal.id} className={`goal-card card ${done ? 'goal-done' : ''}`}>
                <div className="goal-top">
                  <div className="goal-emoji">{goal.emoji}</div>
                  <div className="goal-actions">
                    <button className="icon-btn edit-btn" onClick={() => setEditGoal(goal)}>✏️</button>
                    <button className="icon-btn del-btn" onClick={() => setDeleteGoalId(goal.id)}>🗑️</button>
                  </div>
                </div>
                <h3 className="goal-name">{goal.name}</h3>
                {goal.deadline && (
                  <p className="goal-deadline">📅 {goal.deadline}</p>
                )}
                <div className="goal-amounts">
                  <span className="goal-current">{goal.current.toLocaleString()}៛</span>
                  <span className="goal-sep">{t.of}</span>
                  <span className="goal-target">{goal.target.toLocaleString()}៛</span>
                </div>
                <div className="goal-bar-track">
                  <div
                    className="goal-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: done ? 'linear-gradient(90deg,#10b981,#06b6d4)' : 'linear-gradient(90deg,#6366f1,#a855f7)',
                    }}
                  />
                </div>
                <div className="goal-footer">
                  <span className="goal-pct">{pct.toFixed(1)}%</span>
                  {done ? (
                    <span className="goal-achieved">🏆 {t.achieved}</span>
                  ) : (
                    <button className="btn-sm btn-primary" onClick={() => setFundsGoal(goal)}>+ {t.addFunds}</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAdd && (
        <GoalModal
          mode="add"
          initial={null}
          onSave={(data) => { addGoal(data); setShowAdd(false); }}
          onClose={() => setShowAdd(false)}
        />
      )}
      {editGoal && (
        <GoalModal
          mode="edit"
          initial={editGoal}
          onSave={(data) => { updateGoal(editGoal.id, data); setEditGoal(null); }}
          onClose={() => setEditGoal(null)}
        />
      )}
      {fundsGoal && (
        <AddFundsModal
          goal={fundsGoal}
          onAdd={(amt) => addFundsToGoal(fundsGoal.id, amt)}
          onClose={() => setFundsGoal(null)}
        />
      )}
      {deleteGoalId && (
        <ConfirmModal
          message={t.confirmDelete}
          onConfirm={() => { deleteGoal(deleteGoalId); setDeleteGoalId(null); }}
          onClose={() => setDeleteGoalId(null)}
        />
      )}
    </div>
  );
}
