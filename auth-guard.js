(function(){
 const raw=sessionStorage.getItem("tkj3_session");
 if(!raw){location.replace("index.html");return}
 try{
  const u=JSON.parse(raw),p=location.pathname.toLowerCase();
  const isSiswa=p.endsWith("/siswa.html")||p.endsWith("/siswa")||p==="siswa.html";
  const isGuru=p.endsWith("/guru.html")||p.endsWith("/guru")||p==="guru.html";
  const isAdmin=p.endsWith("/admin.html")||p.endsWith("/admin")||p==="admin.html";
  if(isSiswa&&u.role!=="siswa")location.replace("index.html");
  if(isGuru&&u.role!=="guru")location.replace("index.html");
  if(isAdmin&&u.role!=="admin")location.replace("index.html");
 }catch(e){sessionStorage.removeItem("tkj3_session");location.replace("index.html")}
})();