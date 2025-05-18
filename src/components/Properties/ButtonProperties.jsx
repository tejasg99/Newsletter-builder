import { useNewsletter } from '../../context/NewsletterContext';
import CommonStyles from './CommonStyles';

export default function ButtonProperties({ blockId, content, styles }) {
  const { dispatch } = useNewsletter();

  const handleContentChange = (property, value) => {
    dispatch({
      type: 'UPDATE_BLOCK',
      payload: {
        blockId,
        contentUpdate: { [property]: value }
      }
    });
  };

  const handleStyleChange = (property, value) => {
    dispatch({
      type: 'UPDATE_BLOCK',
      payload: {
        blockId,
        stylesUpdate: { [property]: value }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Button Text
        </label>
        <input
          type="text"
          value={content.text}
          onChange={(e) => handleContentChange('text', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Click me"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="url"
          value={content.url}
          onChange={(e) => handleContentChange('url', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={styles.backgroundColor || '#007bff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-10 h-10 p-1 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={styles.backgroundColor || ''}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="#007bff"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={styles.color || '#ffffff'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="w-10 h-10 p-1 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={styles.color || ''}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <CommonStyles blockId={blockId} styles={styles} />
    </div>
  );
} 