import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useNewsletter } from '../context/NewsletterContext';
import DroppedBlockWrapper from './DroppedBlockWrapper';

export default function Canvas() {
  const { state } = useNewsletter();
  const { setNodeRef } = useDroppable({
    id: 'canvas-main'
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[500px] p-4 bg-gray-50 rounded-lg"
    >
      <SortableContext
        items={state.blocks.map(block => block.id)}
        strategy={verticalListSortingStrategy}
      >
        {state.blocks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Drag blocks here to start building your newsletter
          </div>
        ) : (
          <div className="space-y-4">
            {state.blocks.map((block) => (
              <DroppedBlockWrapper
                key={block.id}
                block={block}
              />
            ))}
          </div>
        )}
      </SortableContext>
    </div>
  );
} 