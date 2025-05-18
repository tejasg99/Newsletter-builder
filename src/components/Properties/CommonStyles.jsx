import { useNewsletter } from '../../context/NewsletterContext';

export default function CommonStyles({ blockId, styles }) {
  const { dispatch } = useNewsletter();

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
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Padding
        </label>
        <input
          type="text"
          value={styles.padding || ''}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 10px or 10px 20px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={styles.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-10 h-10 p-1 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={styles.backgroundColor || ''}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Border Radius
        </label>
        <input
          type="text"
          value={styles.borderRadius || ''}
          onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 4px"
        />
      </div>
    </div>
  );
} 