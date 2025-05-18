export default function ImageBlock({ content, styles }) {
  return (
    <div style={styles}>
      {content.src ? (
        <img
          src={content.src}
          alt={content.alt}
          className="w-full h-auto"
        />
      ) : (
        <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-400">
          No image selected
        </div>
      )}
    </div>
  );
} 