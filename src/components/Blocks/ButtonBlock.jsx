export default function ButtonBlock({ content, styles }) {
  return (
    <div style={{ textAlign: 'center', ...styles }}>
      <a
        href={content.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        style={{
          padding: styles.padding,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderRadius: styles.borderRadius,
          border: styles.border,
          cursor: styles.cursor,
          textDecoration: 'none'
        }}
      >
        {content.text}
      </a>
    </div>
  );
} 