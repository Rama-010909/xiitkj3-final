
(function(){
  const path = location.pathname.toLowerCase();
  const publicPage = path === "/" || path.endsWith("/") || /index\.html$/.test(path) || /login\.html$/.test(path);
  const session = sessionStorage.getItem("tkj3_session");
  if (!publicPage && !session) location.replace("index.html");
})();
