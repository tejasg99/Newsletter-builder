import { useNewsletter } from '../../context/NewsletterContext';
import CommonStyles from './CommonStyles';

export default function ImageProperties({ blockId, content, styles }) {
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

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          value={content.src}
          onChange={(e) => handleContentChange('src', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alt Text
        </label>
        <input
          type="text"
          value={content.alt}
          onChange={(e) => handleContentChange('alt', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Image description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Width
        </label>
        <input
          type="text"
          value={styles.maxWidth || ''}
          onChange={(e) => handleContentChange('maxWidth', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 100% or 500px"
        />
      </div>

      <CommonStyles blockId={blockId} styles={styles} />
    </div>
  );
} 