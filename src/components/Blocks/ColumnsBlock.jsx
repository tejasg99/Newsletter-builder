import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DroppedBlockWrapper from '../DroppedBlockWrapper';

function Column({ columnBlocks, columnIndex }) {
  const { setNodeRef } = useDroppable({
    id: `column-${columnIndex}`
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[100px] p-2 bg-gray-50 rounded"
    >
      <SortableContext
        items={columnBlocks.map(block => block.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {columnBlocks.map((block) => (
            <DroppedBlockWrapper
              key={block.id}
              block={block}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function ColumnsBlock({ content, styles }) {
  return (
    <div style={styles}>
      <div className="grid grid-cols-2 gap-4">
        {content.columns.map((columnBlocks, columnIndex) => (
          <Column
            key={columnIndex}
            columnBlocks={columnBlocks}
            columnIndex={columnIndex}
          />
        ))}
      </div>
    </div>
  );
} 