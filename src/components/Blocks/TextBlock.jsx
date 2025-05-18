export default function TextBlock({ content, styles }) {
  return (
    <div
      style={{
        ...styles,
        whiteSpace: 'pre-wrap'
      }}
    >
      {content.text}
    </div>
  );
} 