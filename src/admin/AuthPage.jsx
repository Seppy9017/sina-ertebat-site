import { useState } from "react";
import { ADMIN_CREDENTIALS } from "../adminConfig.js";
import { registerUser, findUser } from "./storage.js";
import { ShieldIcon, UserIcon } from "../icons.jsx";

// Single login/sign-up screen for everyone.
//
// Routing rule (as requested): if the credentials entered match the admin
// username/password exactly, the visitor lands on the admin panel.
// Any other *valid, registered* username/password lands on the regular
// user's own panel. New visitors can create a regular account from the
// "ثبت‌نام" tab.
export default function AuthPage() {
  const [mode, setMode] = useState("signin");

  return (
    <div className="admin-shell">
      <div className="auth-card">
        <span className="icon-wrap auth-icon">
          {mode === "signin" ? (
            <ShieldIcon size={22} />
          ) : (
            <UserIcon size={22} />
          )}
        </span>

        <div className="admin-tabs auth-tabs">
          <button
            className={`admin-tab${mode === "signin" ? " active" : ""}`}
            onClick={() => setMode("signin")}
            type="button"
          >
            ورود
          </button>
          <button
            className={`admin-tab${mode === "signup" ? " active" : ""}`}
            onClick={() => setMode("signup")}
            type="button"
          >
            ثبت‌نام
          </button>
        </div>

        {mode === "signin" ? <SignInForm /> : <SignUpForm />}

        <a href="#/" className="admin-back-link">
          بازگشت به سایت
        </a>
      </div>
    </div>
  );
}

function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      sessionStorage.setItem("sina_role", "admin");
      sessionStorage.setItem("sina_username", username);
      // window.location.hash = "#/panel";
      window.location.reload();
      return;
    }

    const user = findUser(username, password);
    if (user) {
      sessionStorage.setItem("sina_role", "user");
      sessionStorage.setItem("sina_username", user.username);
      // window.location.hash = "#/panel";
      window.location.assign("/");

      return;
    }

    setError("نام کاربری یا رمز عبور اشتباه است.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>ورود به حساب کاربری</h1>
      <p>با نام کاربری و رمز عبور خود وارد شوید.</p>

      <div className="field">
        <label htmlFor="si-user">نام کاربری</label>
        <input
          id="si-user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          autoComplete="username"
        />
      </div>
      <div className="field">
        <label htmlFor="si-pass">رمز عبور</label>
        <input
          id="si-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      {error && <div className="admin-error">{error}</div>}

      <button type="submit" className="btn btn-primary auth-submit">
        ورود
      </button>
    </form>
  );
}

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError("نام کاربری و رمز عبور را وارد کنید.");
      return;
    }
    if (
      username.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase()
    ) {
      setError("این نام کاربری قابل استفاده نیست.");
      return;
    }
    if (password !== confirm) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    const result = registerUser({ username, password, phone });
    if (!result.ok) {
      setError(result.error);
      return;
    }

    sessionStorage.setItem("sina_role", "user");
    sessionStorage.setItem("sina_username", result.user.username);
    // window.location.hash = "#/panel";
    window.location.assign("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>ساخت حساب کاربری</h1>
      <p>برای ثبت و پیگیری درخواست‌های استعلام قیمت عضو شوید.</p>

      <div className="field">
        <label htmlFor="su-user">نام کاربری</label>
        <input
          id="su-user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className="field">
        <label htmlFor="su-phone">شماره تماس (اختیاری)</label>
        <input
          id="su-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="su-pass">رمز عبور</label>
        <input
          id="su-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className="field">
        <label htmlFor="su-confirm">تکرار رمز عبور</label>
        <input
          id="su-confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      {error && <div className="admin-error">{error}</div>}

      <button type="submit" className="btn btn-primary auth-submit">
        ثبت‌نام
      </button>
    </form>
  );
}
