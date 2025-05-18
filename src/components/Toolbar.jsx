import { useDraggable } from '@dnd-kit/core';
import { availableBlocks } from '../data/availableBlocks';

function DraggableBlockItem({ block }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `toolbar-${block.type}`,
    data: {
      ...block,
      isToolbarItem: true
    }
  });

  const Icon = block.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex items-center gap-2 p-3 mb-2 rounded-lg cursor-grab
        ${isDragging ? 'bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'}
        transition-colors duration-200
      `}
    >
      <Icon className="text-gray-600" />
      <span className="text-sm font-medium text-gray-700">{block.label}</span>
    </div>
  );
}

export default function Toolbar() {
  return (
    <div className="h-full overflow-y-auto">
      {availableBlocks.map((block) => (
        <DraggableBlockItem key={block.id} block={block} />
      ))}
    </div>
  );
} 