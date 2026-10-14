import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const AppContext = createContext(null);

const INCOME_CATEGORIES = ['salary', 'freelance', 'investment', 'business', 'gift', 'otherIncome'];
const EXPENSE_CATEGORIES = ['food', 'transport', 'housing', 'utilities', 'healthcare', 'education', 'entertainment', 'shopping', 'otherExpense'];

const CATEGORY_ICONS = {
  salary: '💼', freelance: '💻', investment: '📈', business: '🏢', gift: '🎁', otherIncome: '💰',
  food: '🍜', transport: '🚗', housing: '🏠', utilities: '💡', healthcare: '🏥',
  education: '📚', entertainment: '🎮', shopping: '🛍️', otherExpense: '📋',
};

const CATEGORY_COLORS = {
  salary: '#6366f1', freelance: '#8b5cf6', investment: '#06b6d4', business: '#0891b2',
  gift: '#f43f5e', otherIncome: '#10b981',
  food: '#f97316', transport: '#eab308', housing: '#ec4899', utilities: '#14b8a6',
  healthcare: '#ef4444', education: '#3b82f6', entertainment: '#a855f7', shopping: '#f472b6',
  otherExpense: '#6b7280',
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function loadFromStorage(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => loadFromStorage('kf_lang', 'en'));
  const [theme, setTheme] = useState(() => loadFromStorage('kf_theme', 'dark'));
  const [transactions, setTransactions] = useState(() => loadFromStorage('kf_transactions', []));
  const [budgets, setBudgets] = useState(() => loadFromStorage('kf_budgets', {}));
  const [goals, setGoals] = useState(() => loadFromStorage('kf_goals', []));
  const [toasts, setToasts] = useState([]);

  const t = translations[lang];

  useEffect(() => { saveToStorage('kf_lang', lang); }, [lang]);
  useEffect(() => { saveToStorage('kf_theme', theme); }, [theme]);
  useEffect(() => { saveToStorage('kf_transactions', transactions); }, [transactions]);
  useEffect(() => { saveToStorage('kf_budgets', budgets); }, [budgets]);
  useEffect(() => { saveToStorage('kf_goals', goals); }, [goals]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addToast = (message, type = 'success') => {
    const id = generateId();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  // Transactions
  const addTransaction = (tx) => {
    setTransactions(prev => [{ ...tx, id: generateId() }, ...prev]);
    addToast(t.transactionAdded);
  };
  const updateTransaction = (id, data) => {
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, ...data } : tx));
    addToast(t.transactionUpdated);
  };
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    addToast(t.transactionDeleted);
  };

  // Budget
  const saveBudget = (category, amount) => {
    setBudgets(prev => ({ ...prev, [category]: amount }));
    addToast(t.budgetSaved);
  };

  // Goals
  const addGoal = (goal) => {
    setGoals(prev => [...prev, { ...goal, id: generateId(), current: 0 }]);
    addToast(t.goalAdded);
  };
  const updateGoal = (id, data) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...data } : g));
    addToast(t.goalUpdated);
  };
  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    addToast(t.goalDeleted);
  };
  const addFundsToGoal = (id, amount) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, current: Math.min(g.current + amount, g.target) } : g));
    addToast(t.fundsAdded);
  };

  // Computed
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const thisMonthTx = transactions.filter(tx => tx.date.startsWith(currentMonth));
  const totalIncome = thisMonthTx.filter(tx => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0);
  const totalExpenses = thisMonthTx.filter(tx => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0);
  const totalBalance = transactions.reduce((s, tx) => tx.type === 'income' ? s + tx.amount : s - tx.amount, 0);

  const spendingByCategory = EXPENSE_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = thisMonthTx.filter(tx => tx.type === 'expense' && tx.category === cat).reduce((s, tx) => s + tx.amount, 0);
    return acc;
  }, {});

  return (
    <AppContext.Provider value={{
      lang, setLang, theme, setTheme, t,
      transactions, addTransaction, updateTransaction, deleteTransaction,
      budgets, saveBudget,
      goals, addGoal, updateGoal, deleteGoal, addFundsToGoal,
      toasts, addToast,
      totalIncome, totalExpenses, totalBalance,
      spendingByCategory, thisMonthTx,
      currentMonth,
      INCOME_CATEGORIES, EXPENSE_CATEGORIES,
      CATEGORY_ICONS, CATEGORY_COLORS,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
