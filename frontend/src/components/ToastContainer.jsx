import { useToastContext } from '../context/ToastContext';

const typeStyles = {
  info: 'bg-gray-800 text-white',
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white'
};

function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-40 flex justify-center sm:justify-end sm:px-4">
      <div className="flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex min-w-[220px] max-w-xs items-center justify-between rounded-md px-3 py-2 text-sm shadow-lg ${typeStyles[toast.type] || typeStyles.info}`}
          >
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-xs opacity-80 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToastContainer;

