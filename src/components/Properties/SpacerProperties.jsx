import { useNewsletter } from '../../context/NewsletterContext';

export default function SpacerProperties({ blockId, content }) {
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
          Height
        </label>
        <input
          type="text"
          value={content.height}
          onChange={(e) => handleContentChange('height', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 20px"
        />
      </div>
    </div>
  );
} 