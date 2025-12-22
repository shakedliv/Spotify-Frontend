import { ExplorerPreview } from "./ExplorerPreview"

export function ExplorerList({ items }) {
  return (
    <div className="explorer-list-container">
      <h1 className="explorer-h1">Browse all</h1>
      <section className="explorer-list">
        {items.map((item) => (
          <ExplorerPreview key={item.id} item={item} />
        ))}
      </section>
    </div>
  )
}
