import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toasts } = useApp();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">{toast.type === 'success' ? '✅' : '❌'}</span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
