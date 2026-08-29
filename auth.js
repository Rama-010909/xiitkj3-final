
const LOCAL_AUTH_KEY = "tkj3_session";
const DEFAULT_ACCOUNTS = [
  {username:"rama", password:"010909", role:"siswa", nama:"Rama"},
  {username:"andi", password:"smknubandar", role:"guru", nama:"Andi"},
  {username:"tkj3", password:"smknubandar", role:"admin", nama:"Admin XII TKJ 3"}
];

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

function getSession() {
  try { return JSON.parse(sessionStorage.getItem(LOCAL_AUTH_KEY) || "null"); }
  catch { return null; }
}
function setSession(user) {
  sessionStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify({
    username:user.username, role:user.role, nama:user.nama || user.username
  }));
}
function logoutPortal() {
  sessionStorage.removeItem(LOCAL_AUTH_KEY);
  location.href = "index.html";
}

async function loginPortal(username, password, role) {
  username = username.trim().toLowerCase();
  const hashed = await hashPassword(password);

  // Default accounts are available immediately for first testing.
  const foundDefault = DEFAULT_ACCOUNTS.find(a =>
    a.username === username && a.password === password && a.role === role
  );
  if (foundDefault) {
    setSession(foundDefault);
    return {ok:true, user:foundDefault};
  }

  // Optional Firestore integration: accounts collection can be added later.
  if (window.db && window.collection && window.getDocs && window.query && window.where) {
    try {
      const q = window.query(
        window.collection(window.db, "accounts"),
        window.where("username", "==", username)
      );
      const snap = await window.getDocs(q);
      if (!snap.empty) {
        const d = snap.docs[0].data();
        if (d.role === role && d.passwordHash === hashed) {
          setSession({username:d.username, role:d.role, nama:d.nama || d.username});
          return {ok:true, user:d};
        }
      }
    } catch(e) {
      console.warn("Firestore account lookup:", e);
    }
  }
  return {ok:false, message:"Username atau password salah."};
}

window.portalAuth = {loginPortal, getSession, setSession, logoutPortal, hashPassword};
