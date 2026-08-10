import { useState, useEffect, useMemo } from "react";
import {
  CameraIcon,
  UpsIcon,
  BulbIcon,
  CartIcon,
  CheckIcon,
  PhoneIcon,
  MailIcon,
  PinIcon,
  MenuIcon,
  CloseIcon,
  ChevronIcon,
  ShieldIcon,
  ToolsIcon,
  ClockIcon,
  UserIcon,
} from "./icons.jsx";

import { COMPANY, ABOUT_TEXT, TRUST_POINTS, CATEGORIES } from "./data.js";
import { loadProducts, saveLead } from "./admin/storage.js";

import AuthPage from "./admin/AuthPage.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import UserPanel from "./admin/UserPanel.jsx";
import sinae from "./assets/sinaertebat.png";
import logoFull from "./assets/logo-full.png";

const CATEGORY_ICON = { camera: CameraIcon, ups: UpsIcon, bulb: BulbIcon };
const TRUST_ICON = { shield: ShieldIcon, tools: ToolsIcon, clock: ClockIcon };

function iconKeyFor(category) {
  if (category === "cctv") return "camera";
  if (category === "ups") return "ups";
  return "bulb";
}

function formatPrice(price) {
  if (!price) return null;
  return Number(price).toLocaleString("en-US");
}

/* ---------------------------------------------------------------------- */
/* Header                                                                  */
/* ---------------------------------------------------------------------- */

function Header({ cartCount, onOpenCart }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const loggedIn = sessionStorage.getItem("sina_role");

  const links = [
    { href: "#home", label: "خانه" },
    { href: "#about", label: "درباره ما" },
    { href: "#products", label: "محصولات" },
    { href: "#contact", label: "تماس با ما" },
  ];

  return (
    <header className="site-header">
      <div className="container header-row">
        <a href="#home" className="brand">
          <span className="brand-mark">
            <img src={sinae} alt={`${COMPANY.name} — لوگو`} />
          </span>
          <span className="brand-text">
            <span className="brand-name">{COMPANY.name}</span>
            <span className="brand-sub mono">{COMPANY.nameEn} · SYSTEMS</span>
          </span>
        </a>

        <nav className="main-nav">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="#/panel" className="cart-btn login-btn">
            <UserIcon size={18} />
            <span>{loggedIn ? "پنل من" : "ورود"}</span>
          </a>
          <button
            className="cart-btn"
            onClick={onOpenCart}
            aria-label="سبد خرید"
          >
            <CartIcon size={18} />
            <span>سبد</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="منو"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#/panel"
            className="nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {loggedIn ? "پنل من" : "ورود / ثبت‌نام"}
          </a>
        </nav>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/* Hero                                                                    */
/* ---------------------------------------------------------------------- */

function Hero() {
  const [active, setActive] = useState(0);
  const tiles = [
    { tag: "CAM-01", cat: "camera" },
    { tag: "CAM-02", cat: "camera" },
    { tag: "UPS-01", cat: "ups" },
    { tag: "LGT-01", cat: "bulb" },
    { tag: "CAM-03", cat: "camera" },
    { tag: "UPS-02", cat: "ups" },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % tiles.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          {/* <img src={logoFull} alt={COMPANY.name} className="hero-logo-full" /> */}
          <span className="eyebrow">SYS / OVERVIEW</span>
          <h1>
            تجهیزات <span className="accent">امنیتی و برق اضطراری</span> برای
            سازمان‌های دولتی و خصوصی
          </h1>
          <p>
            سینا ارتباط تامین‌کننده دوربین مداربسته، یو‌پی‌اس و تجهیزات روشنایی
            است؛ از انتخاب تجهیز مناسب تا نصب، راه‌اندازی و پشتیبانی فنی، در
            کنار مشتریان دولتی و خصوصی در همدان و سراسر کشور.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-primary">
              مشاهده محصولات
              <ChevronIcon size={16} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              درخواست مشاوره
            </a>
          </div>
        </div>

        <div className="monitor-wall">
          <div className="monitor-wall-head">
            <span className="wall-title mono">MONITOR-WALL / LIVE</span>
            <span className="wall-lights">
              <span className="on" />
              <span className="on" />
              <span />
            </span>
          </div>
          <div className="monitor-grid">
            {tiles.map((t, i) => {
              const IconComp = CATEGORY_ICON[t.cat];
              const isActive = i === active;
              return (
                <div
                  key={t.tag}
                  className={`monitor-tile${isActive ? " active" : ""}`}
                >
                  <IconComp size={22} />
                  {isActive && <span className="rec-dot">REC</span>}
                  <span className="tile-tag mono">{t.tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Trust strip                                                             */
/* ---------------------------------------------------------------------- */

function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="container trust-row">
        {TRUST_POINTS.map((t, i) => {
          const IconComp = TRUST_ICON[t.icon];
          return (
            <div className="trust-item" key={i}>
              <IconComp size={18} />
              <span>{t.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* About                                                                   */
/* ---------------------------------------------------------------------- */

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div>
          <span className="eyebrow">SYS / ABOUT</span>
          <h2 className="section-heading">درباره سینا ارتباط</h2>
          <div className="about-copy">
            {ABOUT_TEXT.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="trust-list">
          {TRUST_POINTS.map((t, i) => {
            const IconComp = TRUST_ICON[t.icon];
            return (
              <div className="panel-card" key={i}>
                <span className="icon-wrap">
                  <IconComp size={20} />
                </span>
                <span className="label">{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Products                                                                */
/* ---------------------------------------------------------------------- */

function ProductCard({ product, qty, onAdd }) {
  const IconComp = CATEGORY_ICON[iconKeyFor(product.category)];
  const priceText = formatPrice(product.price);

  return (
    <div className="product-card">
      <div className="product-visual">
        <IconComp size={30} />
      </div>
      <div className="product-model mono">{product.model}</div>
      <div className="product-name">{product.name}</div>
      <ul className="product-specs">
        {product.specs.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <div className="product-footer">
        <span className="price-tag">
          {priceText ? (
            <>
              <span className="mono">{priceText}</span> تومان
            </>
          ) : (
            "استعلام قیمت"
          )}
        </span>
        <button
          className={`add-btn${qty > 0 ? " added" : ""}`}
          onClick={() => onAdd(product)}
        >
          {qty > 0 ? (
            <>
              <CheckIcon size={14} />
              {`افزوده شد (${qty})`}
            </>
          ) : (
            <>
              <CartIcon size={14} />
              افزودن
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Products({ products, cart, onAdd }) {
  const [activeCat, setActiveCat] = useState("cctv");
  console.log(products);

  const filtered = products.filter((p) => p.category === activeCat);
  console.log(filtered);

  return (
    <section id="products" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">SYS / CATALOG</span>
          <h2>محصولات</h2>
          <p>
            دسته‌بندی محصولات بر اساس نوع تجهیز. برای استعلام قیمت و مشاوره خرید
            عمده، محصول مورد نظر را به سبد اضافه کرده و از طریق فرم تماس برای ما
            ارسال کنید.
          </p>
        </div>

        <div className="category-tabs">
          {CATEGORIES.map((c) => {
            const IconComp = CATEGORY_ICON[c.icon];
            return (
              <button
                key={c.id}
                className={`category-tab${activeCat === c.id ? " active" : ""}`}
                onClick={() => setActiveCat(c.id)}
              >
                <IconComp size={16} />
                {c.label}
                <span className="tab-en mono">{c.labelEn}</span>
              </button>
            );
          })}
        </div>

        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              qty={cart[p.id]?.qty || 0}
              onAdd={onAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Contact                                                                 */
/* ---------------------------------------------------------------------- */

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const username = sessionStorage.getItem("sina_username") || null;
    saveLead({ ...form, username });
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">SYS / CONTACT</span>
          <h2 className="section-heading">تماس با ما</h2>
          <p className="section-subtext">
            برای استعلام قیمت، مشاوره فنی یا هماهنگی بازدید از پروژه با ما در
            تماس باشید.
          </p>

          <div className="contact-info">
            <a className="contact-row" href={COMPANY.phoneHref}>
              <span className="icon-wrap">
                <PhoneIcon size={18} />
              </span>
              <span className="value mono">{COMPANY.phoneDisplay}</span>
            </a>
            <a className="contact-row" href={`mailto:${COMPANY.email}`}>
              <span className="icon-wrap">
                <MailIcon size={18} />
              </span>
              <span className="value mono">{COMPANY.email}</span>
            </a>
            <div className="contact-row">
              <span className="icon-wrap">
                <PinIcon size={18} />
              </span>
              <span className="value">{COMPANY.address}</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="name">نام و نام خانوادگی</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="phone">شماره تماس</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="field" style={{ marginBottom: 18 }}>
            <label htmlFor="message">پیام شما</label>
            <textarea
              id="message"
              rows="4"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            ارسال پیام
          </button>

          {sent && (
            <div className="admin-success">
              <CheckIcon size={16} />
              پیام شما ثبت شد. کارشناسان ما به‌زودی با شما تماس می‌گیرند.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Cart drawer                                                            */
/* ---------------------------------------------------------------------- */

function CartDrawer({ cart, onClose, onChangeQty }) {
  const items = Object.values(cart);

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <aside className="cart-drawer" role="dialog" aria-label="سبد خرید">
        <div className="cart-head">
          <h3>سبد درخواست</h3>
          <button className="icon-btn" onClick={onClose} aria-label="بستن">
            <CloseIcon size={16} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 && (
            <div className="cart-empty">سبد شما خالی است</div>
          )}
          {items.map(({ product, qty }) => {
            const IconComp = CATEGORY_ICON[iconKeyFor(product.category)];
            return (
              <div className="cart-item" key={product.id}>
                <span className="cart-item-visual">
                  <IconComp size={18} />
                </span>
                <div>
                  <div className="cart-item-name">{product.name}</div>
                  <div className="cart-item-model mono">{product.model}</div>
                </div>
                <div className="cart-item-qty">
                  <button
                    className="qty-btn"
                    onClick={() => onChangeQty(product.id, qty - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value mono">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => onChangeQty(product.id, qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <p>
              این سبد صرفاً برای ثبت درخواست استعلام قیمت است. برای نهایی‌سازی
              با فرم تماس اقلام را برای ما ارسال کنید.
            </p>
            <a href="#contact" className="btn btn-primary" onClick={onClose}>
              ارسال درخواست استعلام
            </a>
          </div>
        )}
      </aside>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* Footer                                                                  */
/* ---------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <span className="footer-brand">
          <img src={sinae} alt="" className="footer-logo" />
          <span className="brand-sub mono">
            © {new Date().getFullYear()} {COMPANY.nameEn}
          </span>
        </span>
        <span className="footer-note">
          {COMPANY.name} — دوربین مداربسته، یو‌پی‌اس و تجهیزات روشنایی
        </span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/* Public site                                                             */
/* ---------------------------------------------------------------------- */

function PublicSite() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState(loadProducts);

  // Pick up any edits made in the admin panel during this session.
  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev[product.id];
      const qty = (existing?.qty || 0) + 1;
      return { ...prev, [product.id]: { product, qty } };
    });
  }

  function changeQty(id, qty) {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...prev[id], qty } };
    });
  }

  const cartCount = Object.values(cart).reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <TrustStrip />
      <About />
      <Products products={products} cart={cart} onAdd={addToCart} />
      <Contact />
      <Footer />
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeQty}
        />
      )}
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* Panel gate — decides between login screen / admin panel / user panel   */
/* ---------------------------------------------------------------------- */

function PanelGate() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [role, setRole] = useState(() => sessionStorage.getItem("sina_role"));
  const username = sessionStorage.getItem("sina_username");

  function handleLogout() {
    setRole(null);
  }

  if (!role) return <AuthPage />;
  if (role === "admin")
    return (
      <AdminPanel
        onLogout={handleLogout}
        setShowError={setShowError}
        setShowSuccess={setShowSuccess}
        showError={showError}
        showSuccess={showSuccess}
      />
    );
  return <UserPanel username={username} onLogout={handleLogout} />;
}

/* ---------------------------------------------------------------------- */
/* App — hash-based routing between the public site and /panel            */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handler = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (route.startsWith("#/panel")) {
    return <PanelGate />;
  }
  return <PublicSite />;
}
