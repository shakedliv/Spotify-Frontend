export function ExplorerPreview({ item }) {
  return (
    <article
      className="explorer-preview"
      style={{ backgroundColor: item.bgColor }}
    >
      <div className="explorer-img-wrapper">
        <img src={item.imgUrl} alt={item.name} />
      </div>

      <h3 className="explorer-title">{item.name}</h3>
    </article>
  );
}
