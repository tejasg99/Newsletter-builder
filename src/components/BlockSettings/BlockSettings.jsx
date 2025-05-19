import TextBlockSettings from './TextBlockSettings';
import ImageBlockSettings from './ImageBlockSettings';
import ButtonBlockSettings from './ButtonBlockSettings';
import ColumnsBlockSettings from './ColumnsBlockSettings';

export default function BlockSettings({ block, onUpdate }) {
  if (!block) return null;

  const renderSettings = () => {
    switch (block.type) {
      case 'text':
        return <TextBlockSettings block={block} onUpdate={onUpdate} />;
      case 'image':
        return <ImageBlockSettings block={block} onUpdate={onUpdate} />;
      case 'button':
        return <ButtonBlockSettings block={block} onUpdate={onUpdate} />;
      case 'columns':
        return <ColumnsBlockSettings block={block} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white border-l border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Block Settings
      </h3>
      {renderSettings()}
    </div>
  );
} 