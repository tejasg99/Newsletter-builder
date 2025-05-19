import { useNewsletter } from '../../context/NewsletterContext';
import CommonStyles from './CommonStyles';

export default function ColumnsProperties({ blockId, styles }) {
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

  const handleColumnWidthChange = (index, value) => {
    const currentWidths = (styles.columnWidth || '50%').split(' ');
    const newWidths = [...currentWidths];
    newWidths[index] = value;
    handleStyleChange('columnWidth', newWidths.join(' '));
  };

  const columnWidths = (styles.columnWidth || '50%').split(' ');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gap Between Columns
        </label>
        <input
          type="text"
          value={styles.gap || '20px'}
          onChange={(e) => handleStyleChange('gap', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 20px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Column Widths
        </label>
        <div className="space-y-2">
          {columnWidths.map((width, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Column {index + 1}:</span>
              <input
                type="text"
                value={width}
                onChange={(e) => handleColumnWidthChange(index, e.target.value)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="50%"
              />
            </div>
          ))}
        </div>
      </div>

      <CommonStyles blockId={blockId} styles={styles} />
    </div>
  );
} 