import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { NewsletterProvider, useNewsletter } from './context/NewsletterContext';
import { availableBlocks } from './data/availableBlocks';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';

function AppContent() {
  const { state, dispatch } = useNewsletter();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    dispatch({ type: 'SET_DRAG_ITEM', payload: active.data.current });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.data.current.isToolbarItem) {
      // Adding new block
      const blockType = active.data.current.type;
      const blockConfig = availableBlocks.find(b => b.type === blockType);
      
      if (over.id === 'canvas-main') {
        dispatch({
          type: 'ADD_BLOCK',
          payload: {
            blockType,
            defaultContent: blockConfig.defaultContent,
            defaultStyles: blockConfig.defaultStyles
          }
        });
      } else if (over.id.startsWith('column-')) {
        // Extract parentId and columnIndex from the column ID
        const [_, parentId, columnIndex] = over.id.split('-');
        dispatch({
          type: 'ADD_BLOCK',
          payload: {
            blockType,
            parentId,
            index: parseInt(columnIndex),
            defaultContent: blockConfig.defaultContent,
            defaultStyles: blockConfig.defaultStyles
          }
        });
      }
    } else {
      // Reordering existing blocks
      if (active.id !== over.id) {
        const parentId = over.id.startsWith('column-') 
          ? over.id.split('-')[1]
          : null;
        
        dispatch({
          type: 'REORDER_BLOCKS',
          payload: {
            activeId: active.id,
            overId: over.id,
            parentId
          }
        });
      }
    }

    dispatch({ type: 'SET_DRAG_ITEM', payload: null });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Newsletter Builder</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Toolbar */}
            <div className="col-span-2 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Blocks</h2>
              <Toolbar />
            </div>

            {/* Canvas */}
            <div className="col-span-7 bg-white rounded-lg shadow p-4">
              <Canvas />
            </div>

            {/* Properties Panel */}
            <div className="col-span-3 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Properties</h2>
              {/* Properties panel content will go here */}
            </div>
          </div>
        </main>
      </div>

      <DragOverlay>
        {state.activeDragItem ? (
          <div className="bg-white p-4 rounded shadow-lg">
            {state.activeDragItem.label}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default function App() {
  return (
    <NewsletterProvider>
      <AppContent />
    </NewsletterProvider>
  );
}
