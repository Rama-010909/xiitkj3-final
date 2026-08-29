(function () {
  const path = location.pathname.toLowerCase();
  const isLogin = /(^|\/)login\.html$/.test(path) || path === "/" || path.endsWith("/");
  const session = sessionStorage.getItem("portal_login");
  if (!isLogin && !session) {
    const base = location.pathname.split("/").slice(0, -1).join("/") + "/";
    location.replace(base + "login.html");
  }
  window.portalLogout = function () {
    sessionStorage.removeItem("portal_login");
    location.href = "login.html";
  };
})();