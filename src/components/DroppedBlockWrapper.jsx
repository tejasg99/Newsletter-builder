import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaTrash } from 'react-icons/fa';
import { useNewsletter } from '../context/NewsletterContext';
import TextBlock from './Blocks/TextBlock';
import ImageBlock from './Blocks/ImageBlock';
import ButtonBlock from './Blocks/ButtonBlock';
import SpacerBlock from './Blocks/SpacerBlock';
import ColumnsBlock from './Blocks/ColumnsBlock';

const blockComponents = {
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  spacer: SpacerBlock,
  columns: ColumnsBlock
};

export default function DroppedBlockWrapper({ block }) {
  const { state, dispatch } = useNewsletter();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: block.id
  });

  const BlockComponent = blockComponents[block.type];

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_BLOCK', payload: { blockId: block.id } });
  };

  const handleSelect = () => {
    dispatch({ type: 'SELECT_BLOCK', payload: { blockId: block.id } });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleSelect}
      className={`
        relative group
        ${state.selectedBlockId === block.id ? 'ring-2 ring-blue-500' : ''}
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
      `}
    >
      <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleDelete}
          className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          <FaTrash className="w-3 h-3" />
        </button>
      </div>
      <BlockComponent
        content={block.content}
        styles={block.styles}
      />
    </div>
  );
} 