(function(){
 var raw=sessionStorage.getItem("tkj3_session");
 if(!raw){location.replace("index.html");return}
 try{
  var u=JSON.parse(raw);
  var file=(location.pathname.split("/").pop()||"").toLowerCase();
  var expected=null;
  if(file.indexOf("siswa")===0)expected="siswa";
  else if(file.indexOf("guru")===0)expected="guru";
  else if(file.indexOf("admin")===0)expected="admin";
  if(expected&&u.role!==expected){location.replace("index.html");return}
  document.documentElement.dataset.userNama=u.nama||u.username||"";
 }catch(e){sessionStorage.removeItem("tkj3_session");location.replace("index.html")}
})();
