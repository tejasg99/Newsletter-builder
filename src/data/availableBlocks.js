import { FaFont, FaImage, FaSquare, FaColumns, FaStream } from 'react-icons/fa';

export const availableBlocks = [
  {
    id: 'text',
    type: 'text',
    label: 'Text Block',
    icon: FaFont,
    defaultContent: {
      text: 'Enter your text here'
    },
    defaultStyles: {
      padding: '10px',
      fontSize: '16px',
      color: '#000000',
      textAlign: 'left'
    }
  },
  {
    id: 'image',
    type: 'image',
    label: 'Image Block',
    icon: FaImage,
    defaultContent: {
      src: '',
      alt: 'Image description'
    },
    defaultStyles: {
      padding: '10px',
      maxWidth: '100%',
      height: 'auto'
    }
  },
  {
    id: 'button',
    type: 'button',
    label: 'Button Block',
    icon: FaStream,
    defaultContent: {
      text: 'Click me',
      url: '#'
    },
    defaultStyles: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer'
    }
  },
  {
    id: 'spacer',
    type: 'spacer',
    label: 'Spacer Block',
    icon: FaSquare,
    defaultContent: {
      height: '20px'
    },
    defaultStyles: {
      width: '100%'
    }
  },
  {
    id: 'columns',
    type: 'columns',
    label: 'Two Columns',
    icon: FaColumns,
    defaultContent: {
      columns: [[], []]
    },
    defaultStyles: {
      display: 'flex',
      gap: '20px',
      padding: '10px'
    }
  }
]; 