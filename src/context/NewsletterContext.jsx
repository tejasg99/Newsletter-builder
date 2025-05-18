import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewsletterContext = createContext();

const initialState = {
  blocks: [],
  selectedBlockId: null,
  activeDragItem: null
};

function newsletterReducer(state, action) {
  switch (action.type) {
    case 'ADD_BLOCK': {
      const { blockType, parentId, index, defaultContent, defaultStyles } = action.payload;
      const newBlock = {
        id: uuidv4(),
        type: blockType,
        content: { ...defaultContent },
        styles: { ...defaultStyles }
      };

      if (parentId) {
        // Add block to a specific column
        return {
          ...state,
          blocks: state.blocks.map(block => {
            if (block.id === parentId) {
              const columns = [...block.content.columns];
              columns[index] = [...columns[index], newBlock];
              return {
                ...block,
                content: { ...block.content, columns }
              };
            }
            return block;
          })
        };
      }

      // Add block to main canvas
      const newBlocks = [...state.blocks];
      if (typeof index === 'number') {
        newBlocks.splice(index, 0, newBlock);
      } else {
        newBlocks.push(newBlock);
      }
      return { ...state, blocks: newBlocks };
    }

    case 'UPDATE_BLOCK': {
      const { blockId, contentUpdate, stylesUpdate } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              content: { ...block.content, ...contentUpdate },
              styles: { ...block.styles, ...stylesUpdate }
            };
          }
          return block;
        })
      };
    }

    case 'DELETE_BLOCK': {
      const { blockId } = action.payload;
      return {
        ...state,
        blocks: state.blocks.filter(block => block.id !== blockId),
        selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId
      };
    }

    case 'REORDER_BLOCKS': {
      const { activeId, overId, parentId } = action.payload;
      
      if (parentId) {
        // Reorder within columns
        return {
          ...state,
          blocks: state.blocks.map(block => {
            if (block.id === parentId) {
              const columns = block.content.columns.map(column => {
                const oldIndex = column.findIndex(item => item.id === activeId);
                const newIndex = column.findIndex(item => item.id === overId);
                
                if (oldIndex !== -1 && newIndex !== -1) {
                  const [removed] = column.splice(oldIndex, 1);
                  column.splice(newIndex, 0, removed);
                }
                return column;
              });
              return { ...block, content: { ...block.content, columns } };
            }
            return block;
          })
        };
      }

      // Reorder on main canvas
      const oldIndex = state.blocks.findIndex(block => block.id === activeId);
      const newIndex = state.blocks.findIndex(block => block.id === overId);
      
      const newBlocks = [...state.blocks];
      const [removed] = newBlocks.splice(oldIndex, 1);
      newBlocks.splice(newIndex, 0, removed);
      
      return { ...state, blocks: newBlocks };
    }

    case 'SELECT_BLOCK':
      return {
        ...state,
        selectedBlockId: action.payload.blockId
      };

    case 'SET_DRAG_ITEM':
      return {
        ...state,
        activeDragItem: action.payload
      };

    default:
      return state;
  }
}

export function NewsletterProvider({ children }) {
  const [state, dispatch] = useReducer(newsletterReducer, initialState);

  return (
    <NewsletterContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsletterContext.Provider>
  );
}

export function useNewsletter() {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
} 