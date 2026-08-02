// Admin login credentials for the client-side admin panel.
//
// IMPORTANT (read the README security note): this project has no backend,
// so this check runs entirely in the browser. Anyone who opens dev tools
// or looks at the built JS bundle can read these values. This gate is only
// meant to keep casual visitors out of the editing screen — it is NOT real
// security. Do not use it to protect anything truly sensitive.
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Admin1234",
};
