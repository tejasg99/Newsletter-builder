import { useNewsletter } from '../../context/NewsletterContext';
import CommonStyles from './CommonStyles';

export default function TextProperties({ blockId, content, styles }) {
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
          Text Content
        </label>
        <textarea
          value={content.text}
          onChange={(e) => handleContentChange('text', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Size
        </label>
        <input
          type="text"
          value={styles.fontSize || ''}
          onChange={(e) => handleStyleChange('fontSize', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 16px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={styles.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="w-10 h-10 p-1 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={styles.color || ''}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Align
        </label>
        <select
          value={styles.textAlign || 'left'}
          onChange={(e) => handleStyleChange('textAlign', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>

      <CommonStyles blockId={blockId} styles={styles} />
    </div>
  );
} 