import { useNewsletter } from '../context/NewsletterContext';
import { generateNewsletterHtml } from '../utils/htmlGenerator';

export default function ExportButton() {
  const { state } = useNewsletter();

  const handleExport = () => {
    const html = generateNewsletterHtml(state.blocks);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={state.blocks.length === 0}
      className={`
        px-4 py-2 rounded-md text-white font-medium
        ${state.blocks.length === 0
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
        }
        transition-colors duration-200
      `}
    >
      Export HTML
    </button>
  );
} 