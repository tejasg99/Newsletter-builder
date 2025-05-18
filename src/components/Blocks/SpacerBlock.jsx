export default function SpacerBlock({ content, styles }) {
  return (
    <div
      style={{
        ...styles,
        height: content.height
      }}
    />
  );
} 