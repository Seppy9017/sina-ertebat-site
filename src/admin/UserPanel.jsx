import { loadLeads, getUser } from "./storage.js";

export default function UserPanel({ username, onLogout }) {
  const user = getUser(username);
  const leads = loadLeads().filter((l) => l.username === username);

  function handleLogout() {
    sessionStorage.removeItem("sina_role");
    sessionStorage.removeItem("sina_username");
    onLogout();
  }

  return (
    <div className="admin-shell admin-panel">
      <div className="container admin-top">
        <h1>{`پنل کاربری — ${username}`}</h1>
        <div className="admin-top-actions">
          <a href="#/" className="btn btn-ghost">
            مشاهده فروشگاه
          </a>
          <button className="btn btn-ghost" onClick={handleLogout}>
            خروج
          </button>
        </div>
      </div>

      <div className="container admin-section">
        <div className="panel-card user-info-card">
          <div>
            نام کاربری: <span className="mono">{username}</span>
          </div>
          {user?.phone && (
            <div>
              شماره تماس: <span className="mono">{user.phone}</span>
            </div>
          )}
        </div>

        <h2 className="user-panel-subhead">درخواست‌های استعلام قیمت من</h2>

        {leads.length === 0 ? (
          <p className="admin-empty">
            شما هنوز درخواستی از فرم تماس ثبت نکرده‌اید. برای ثبت درخواست،
            فرم «تماس با ما» را در فروشگاه پر کنید — درخواست‌های شما اینجا
            نمایش داده می‌شوند.
          </p>
        ) : (
          <div className="admin-leads">
            {leads.map((l) => (
              <div className="admin-lead-card" key={l.id}>
                <div className="lead-row">
                  <strong>{l.name}</strong>
                  <span className="mono">{l.phone}</span>
                </div>
                {l.message && <p className="lead-message">{l.message}</p>}
                <span className="lead-date mono">{l.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
