import "./Sidebar.css";

export default function OutlineSidebar({ outline, jumpToPage }) {
  return (
    <div className="sidebar">
      <h3>📖 Outline</h3>
      {outline.map((item, idx) => (
        <div
          key={idx}
          className={`level-${item.level}`}
          onClick={() => jumpToPage(item.page)}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
