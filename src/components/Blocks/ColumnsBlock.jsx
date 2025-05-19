import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DroppedBlockWrapper from '../DroppedBlockWrapper';

function Column({ columnBlocks, columnIndex, width }) {
  const { setNodeRef } = useDroppable({
    id: `column-${columnIndex}`
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[100px] p-2 bg-gray-50 rounded"
      style={{ width }}
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
  const columnWidths = (styles.columnWidth || '50%').split(' ');
  const gap = styles.gap || '20px';

  return (
    <div style={styles}>
      <div className="flex" style={{ gap }}>
        {content.columns.map((columnBlocks, columnIndex) => (
          <Column
            key={columnIndex}
            columnBlocks={columnBlocks}
            columnIndex={columnIndex}
            width={columnWidths[columnIndex] || '50%'}
          />
        ))}
      </div>
    </div>
  );
} 