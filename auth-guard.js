(function(){
 const raw=sessionStorage.getItem("tkj3_session");
 if(!raw){location.replace("index.html");return}
 try{
  const u=JSON.parse(raw),p=location.pathname.toLowerCase();
  if(p.endsWith("/siswa.html")&&u.role!=="siswa")location.replace("index.html");
  if(p.endsWith("/guru.html")&&u.role!=="guru")location.replace("index.html");
  if(p.endsWith("/admin.html")&&u.role!=="admin")location.replace("index.html");
 }catch(e){sessionStorage.removeItem("tkj3_session");location.replace("index.html")}
})();