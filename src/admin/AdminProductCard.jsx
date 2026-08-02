import { CloseIcon } from "../icons.jsx";

// Fully controlled by the parent now: selection state lives on the product
// object itself (p.checked, owned by AdminPanel's `products` state) instead
// of a local useState here. This is what makes "select all" possible — a
// component-local checkbox has no way to be flipped from outside itself.
function AdminProductCard({
  products,
  CATEGORIES,
  handlePriceChange,
  persist,
  onToggle,
  product: p,
}) {
  function handleRemove(id) {
    persist(products.filter((p) => p.id !== id));
  }

  return (
    <tr
      className={p.checked ? "selected-product" : ""}
      // onClick={() => onToggle(p.id)}
    >
      <td>
        <div
          onClick={() => onToggle(p.id)}
          className={`choose-product${p.checked ? " checked" : ""}`}
        >
          {p.checked ? "✓" : ""}
        </div>
      </td>
      <td>
        {CATEGORIES.find((c) => c.id === p.category)?.label || p.category}
      </td>
      <td>{p.name}</td>
      <td className="mono">{p.model}</td>
      {/* <td>{p.specs.join("، ")}</td> */}
      <td>
        <input
          type="number"
          min="0"
          className="mono price-input"
          value={p.price ?? ""}
          onChange={(e) => handlePriceChange(p.id, e.target.value)}
          placeholder="استعلامی"
        />
      </td>
      <td className="remove-product">
        <button
          className="icon-btn"
          onClick={() => handleRemove(p.id)}
          aria-label="حذف"
        >
          <CloseIcon size={14} />
        </button>
      </td>
    </tr>
  );
}

export default AdminProductCard;
