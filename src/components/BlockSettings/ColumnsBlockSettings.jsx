import { useState } from 'react';

export default function ColumnsBlockSettings({ block, onUpdate }) {
  const [columnWidths, setColumnWidths] = useState(
    (block.styles.columnWidth || '50%').split(' ')
  );

  const handleColumnWidthChange = (index, value) => {
    const newWidths = [...columnWidths];
    newWidths[index] = value;
    setColumnWidths(newWidths);
    
    onUpdate({
      ...block,
      styles: {
        ...block.styles,
        columnWidth: newWidths.join(' ')
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Column Widths
        </label>
        <div className="mt-1 space-y-2">
          {columnWidths.map((width, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Column {index + 1}:</span>
              <input
                type="text"
                value={width}
                onChange={(e) => handleColumnWidthChange(index, e.target.value)}
                className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="50%"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 