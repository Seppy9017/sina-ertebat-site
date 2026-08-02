import { useState } from "react";
import { CATEGORIES } from "../data.js";
import { CloseIcon } from "../icons.jsx";
import {
  loadProducts,
  saveProducts,
  resetProducts,
  loadLeads,
  clearLeads,
} from "./storage.js";
import MessageHandler from "./MessageHandler.jsx";
import AdminProductCard from "./AdminProductCard.jsx";

export default function AdminPanel({
  onLogout,
  showSuccess,
  showError,
  setShowError,
  setShowSuccess,
}) {
  const [tab, setTab] = useState("products");
  const [changeType, setChangeType] = useState("increase");
  const [increasePrice, setIncreasePrice] = useState(0);
  const [decreasePrice, setDecreasePrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState(loadProducts);

  const [leads, setLeads] = useState(loadLeads);
  const [form, setForm] = useState({
    category: "cctv",
    name: "",
    model: "",
    specs: "",
    price: "",
  });

  function persist(next) {
    setProducts(next);
    saveProducts(next);
  }

  function handleAddProduct(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.model.trim()) return;
    const newProduct = {
      id: `${form.category}-${Date.now()}`,
      category: form.category,
      name: form.name.trim(),
      model: form.model.trim(),
      specs: form.specs
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      price: form.price ? Number(form.price) : undefined,
    };
    persist([...products, newProduct]);
    setForm({ category: "cctv", name: "", model: "", specs: "", price: "" });
  }

  function handlePriceChange(id, rawValue) {
    products.map((p) => {
      if (p.price === 0) {
        p.price = "";
      }
    });
    const next = products.map((p) =>
      p.id === id
        ? { ...p, price: rawValue === "" ? undefined : Number(rawValue) }
        : p,
    );
    persist(next);
  }

  function handleResetProducts() {
    persist(resetProducts());
  }

  function handleToggleProduct(id) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)),
    );
  }

  // Only products that actually have a price are worth selecting for a
  // percentage change — selecting a priceless one would just trigger the
  // "no price" error when applying, so "select all" only grabs those.
  const pricedProducts = products.filter((p) => p.price);
  const selectedPricedCount = pricedProducts.filter((p) => p.checked).length;
  const allPricedSelected =
    pricedProducts.length > 0 && selectedPricedCount === pricedProducts.length;

  function handleSelectAll() {
    const nextChecked = !allPricedSelected;
    setProducts((prev) =>
      prev.map((p) => (p.price ? { ...p, checked: nextChecked } : p)),
    );
  }

  function handleClearLeads() {
    clearLeads();
    setLeads([]);
  }

  function handleLogout() {
    sessionStorage.removeItem("sina_role");
    sessionStorage.removeItem("sina_username");
    onLogout();
  }

  const changePriceType = (e) => {
    setChangeType(e.target.value);
  };

  const increaseOrDecrease = (e) => {
    e.preventDefault();

    const percentValue =
      changeType === "increase" ? Number(increasePrice) : Number(decreasePrice);

    // --- validation, each with its own specific message ------------------
    if (Number.isNaN(percentValue)) {
      setShowSuccess(false);
      setErrorMessage("لطفاً یک عدد معتبر برای درصد وارد کنید.");
      setShowError(true);
      return;
    }

    if (percentValue <= 0) {
      setShowSuccess(false);
      setErrorMessage("درصد تغییر قیمت باید بزرگ‌تر از صفر باشد.");
      setShowError(true);
      return;
    }

    if (changeType === "decrease" && percentValue > 100) {
      setShowSuccess(false);
      setErrorMessage("درصد کاهش نمی‌تواند بیشتر از 100 باشد.");
      setShowError(true);
      return;
    }

    const checkedProducts = products.filter((p) => p.checked === true);

    if (checkedProducts.length === 0) {
      setShowSuccess(false);
      setErrorMessage(
        "هیچ محصولی انتخاب نشده است. حداقل یک محصول را انتخاب کنید.",
      );
      setShowError(true);
      return;
    }

    const pricelessCheckedCount = checkedProducts.filter(
      (p) => !p.price,
    ).length;
    if (pricelessCheckedCount > 0) {
      setShowSuccess(false);
      setErrorMessage(
        pricelessCheckedCount === checkedProducts.length
          ? "محصولات انتخاب‌شده قیمت ندارند. ابتدا برایشان قیمت وارد کنید."
          : `${pricelessCheckedCount} مورد از محصولات انتخاب‌شده قیمت ندارند. ابتدا برایشان قیمت وارد کنید.`,
      );
      setShowError(true);
      return;
    }
    // -----------------------------------------------------------------------

    const priceChangePercent =
      changeType === "increase" ? 100 + percentValue : 100 - percentValue;

    // Build a fresh array instead of mutating + re-pushing the same
    // objects — the old version pushed each changed product onto the end
    // of `products` again, which duplicated rows in the table.
    const next = products.map((p) =>
      p.checked && p.price
        ? {
            ...p,
            price: Math.round(p.price * (priceChangePercent / 100)),
            checked: false,
          }
        : p,
    );

    setShowError(false);
    setShowSuccess(true);
    persist(next);
  };

  return (
    <div className="admin-shell admin-panel">
      <div className="container admin-top">
        <h1>پنل مدیریت سینا ارتباط</h1>
        <div className="admin-top-actions">
          <a href="#/" className="btn btn-ghost">
            مشاهده سایت
          </a>
          <button className="btn btn-ghost" onClick={handleLogout}>
            خروج
          </button>
        </div>
      </div>

      <div className="container">
        <div className="admin-tabs">
          <button
            className={`admin-tab${tab === "products" ? " active" : ""}`}
            onClick={() => setTab("products")}
          >
            محصولات
          </button>
          <button
            className={`admin-tab${tab === "leads" ? " active" : ""}`}
            onClick={() => setTab("leads")}
          >
            {`پیام‌های تماس (${leads.length})`}
          </button>
        </div>

        {tab === "products" && (
          <div className="admin-section">
            <form className="admin-form" onSubmit={handleAddProduct}>
              <div className="admin-form-row">
                <div className="field">
                  <label htmlFor="p-cat">دسته‌بندی</label>
                  <select
                    id="p-cat"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="p-name">نام محصول</label>
                  <input
                    id="p-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="p-model">مدل</label>
                  <input
                    id="p-model"
                    className="mono"
                    value={form.model}
                    onChange={(e) =>
                      setForm({ ...form, model: e.target.value })
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="p-price">قیمت (تومان) — اختیاری</label>
                  <input
                    id="p-price"
                    type="number"
                    min="0"
                    className="mono"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="خالی = استعلام قیمت"
                  />
                </div>
              </div>
              <div className="field" style={{ marginBottom: 14 }}>
                <label htmlFor="p-specs">مشخصات فنی (با ویرگول جدا کنید)</label>
                <input
                  id="p-specs"
                  value={form.specs}
                  onChange={(e) => setForm({ ...form, specs: e.target.value })}
                  placeholder="مثلاً: 4MP, لنز واریفوکال, ضدضربه IK10"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                افزودن محصول
              </button>
            </form>
            <form className="increase-price admin-form">
              <div className="selected-count-badge">
                {selectedPricedCount > 0
                  ? `${selectedPricedCount} محصول با قیمت انتخاب شده`
                  : "هیچ محصولی انتخاب نشده"}
              </div>
              <div className="admin-form-row">
                <div className="field">
                  <label htmlFor="price-change-type">نوع تغییر قیمت</label>
                  <select
                    onChange={changePriceType}
                    value={changeType}
                    id="price-change-type"
                  >
                    {/* <option disabled></option> */}
                    <option value={"decrease"}>کاهش قیمت</option>
                    <option value={"increase"}>افزایش قیمت</option>
                  </select>
                </div>
                {changeType === "increase" && (
                  <div className="price-change-field" key="increase-field">
                    <label htmlFor="increse-input">
                      مقدار افزایش قیمت (درصد)
                    </label>
                    <input
                      type="number"
                      key="increase-input"
                      value={increasePrice}
                      onChange={(e) => setIncreasePrice(e.target.value)}
                    />
                  </div>
                )}
                {changeType === "decrease" && (
                  <div className="price-change-field" key="decrease-field">
                    <label htmlFor="decrease-input">
                      مقدار کاهش قیمت (درصد)
                    </label>
                    <input
                      type="number"
                      key="decrease-input"
                      value={decreasePrice}
                      onChange={(e) => setDecreasePrice(e.target.value)}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={increaseOrDecrease}
                >
                  اعمال تغییرات قیمت
                </button>
              </div>
              <div className="message-box">
                {showSuccess ? (
                  <MessageHandler
                    setFunction={setShowSuccess}
                    state={showSuccess}
                    type="success"
                    message="تغییرات شما اعمال شد."
                  />
                ) : (
                  showError && (
                    <MessageHandler
                      setFunction={setShowError}
                      state={showError}
                      type="error"
                      message={errorMessage}
                    />
                  )
                )}
              </div>
            </form>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>
                      <div
                        onClick={handleSelectAll}
                        className={`choose-product${
                          allPricedSelected ? " checked" : ""
                        }`}
                        aria-label="انتخاب همه محصولات دارای قیمت"
                        title="انتخاب همه محصولات دارای قیمت"
                      >
                        {allPricedSelected ? "✓" : ""}
                      </div>
                    </th>
                    <th>دسته</th>
                    <th>نام</th>
                    <th>مدل</th>
                    <th>مشخصات</th>
                    <th>قیمت (تومان)</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <AdminProductCard
                      key={p.id}
                      products={products}
                      CATEGORIES={CATEGORIES}
                      handlePriceChange={handlePriceChange}
                      persist={persist}
                      onToggle={handleToggleProduct}
                      product={p}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="btn btn-ghost admin-reset"
              onClick={handleResetProducts}
            >
              بازگردانی لیست پیش‌فرض محصولات
            </button>
          </div>
        )}

        {tab === "leads" && (
          <div className="admin-section">
            {leads.length === 0 ? (
              <p className="admin-empty">
                هنوز پیامی از فرم تماس ثبت نشده است.
              </p>
            ) : (
              <>
                <div className="admin-leads">
                  {leads.map((l) => (
                    <div className="admin-lead-card" key={l.id}>
                      <div className="lead-row">
                        <strong>{l.name}</strong>
                        <span className="mono">{l.phone}</span>
                      </div>
                      {l.message && <p className="lead-message">{l.message}</p>}
                      <span className="lead-date mono">
                        {l.date}
                        {l.username ? ` ·  ${l.username}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="btn btn-ghost admin-reset"
                  onClick={handleClearLeads}
                >
                  پاک‌کردن همه پیام‌ها
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
