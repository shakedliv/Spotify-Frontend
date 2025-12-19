import { ExplorerPreview } from "./ExplorerPreview";

export function ExplorerList({ items }) {
  return (
    <section className="explorer-list">
      {items.map((item) => (
        <ExplorerPreview key={item.id} item={item} />
      ))}
    </section>
  );
}
