// Small localStorage-backed "database" so the admin panel and regular user
// accounts have something real to work with without needing a backend.
// Product edits, contact-form leads, and user accounts are saved in the
// visitor's own browser only (see README security note).
import { PRODUCTS as DEFAULT_PRODUCTS } from "../data.js";

const PRODUCTS_KEY = "sina_products_override";
const LEADS_KEY = "sina_leads";
const USERS_KEY = "sina_users";

/* ---------------------------- products --------------------------------- */

export function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore malformed storage */
  }
  return DEFAULT_PRODUCTS;
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function resetProducts() {
  localStorage.removeItem(PRODUCTS_KEY);
  return DEFAULT_PRODUCTS;
}

/* ----------------------------- leads ------------------------------------ */

export function loadLeads() {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore malformed storage */
  }
  return [];
}

export function saveLead(lead) {
  const leads = loadLeads();
  const next = [
    { ...lead, id: Date.now(), date: new Date().toLocaleString("fa-IR") },
    ...leads,
  ];
  localStorage.setItem(LEADS_KEY, JSON.stringify(next));
  return next;
}

export function clearLeads() {
  localStorage.removeItem(LEADS_KEY);
}

/* --------------------------- user accounts ------------------------------ */

export function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore malformed storage */
  }
  return [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Registers a new regular-user account. Returns { ok: true, user } on
// success, or { ok: false, error } if the username is taken/invalid.
export function registerUser({ username, password, phone }) {
  const users = loadUsers();
  const clean = username.trim();
  const taken = users.some(
    (u) => u.username.toLowerCase() === clean.toLowerCase()
  );
  if (taken) {
    return { ok: false, error: "این نام کاربری قبلاً ثبت شده است." };
  }
  const user = {
    username: clean,
    password,
    phone: (phone || "").trim(),
    createdAt: new Date().toLocaleString("fa-IR"),
  };
  saveUsers([...users, user]);
  return { ok: true, user };
}

export function findUser(username, password) {
  const users = loadUsers();
  return (
    users.find((u) => u.username === username && u.password === password) ||
    null
  );
}

export function getUser(username) {
  const users = loadUsers();
  return users.find((u) => u.username === username) || null;
}
