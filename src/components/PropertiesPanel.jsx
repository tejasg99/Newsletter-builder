import { useNewsletter } from '../context/NewsletterContext';
import TextProperties from './Properties/TextProperties';
import ImageProperties from './Properties/ImageProperties';
import ButtonProperties from './Properties/ButtonProperties';
import SpacerProperties from './Properties/SpacerProperties';
import ColumnsProperties from './Properties/ColumnsProperties';

const propertyEditors = {
  text: TextProperties,
  image: ImageProperties,
  button: ButtonProperties,
  spacer: SpacerProperties,
  columns: ColumnsProperties
};

export default function PropertiesPanel() {
  const { state } = useNewsletter();
  const selectedBlock = state.blocks.find(block => block.id === state.selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="text-gray-500 text-center py-8">
        Select a block to edit its properties
      </div>
    );
  }

  const PropertyEditor = propertyEditors[selectedBlock.type];

  if (!PropertyEditor) {
    return (
      <div className="text-gray-500 text-center py-8">
        No properties available for this block type
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <PropertyEditor
        blockId={selectedBlock.id}
        content={selectedBlock.content}
        styles={selectedBlock.styles}
      />
    </div>
  );
} 