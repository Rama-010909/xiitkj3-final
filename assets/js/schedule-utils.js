/* XII TKJ 3 — schedule/time helpers */
(function(){
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  function dayName(d=new Date()){ return days[d.getDay()]; }
  function minutesNow(d=new Date()){ return d.getHours()*60+d.getMinutes(); }
  function parseTime(v){
    const s=String(v??'').trim().replace(/\s/g,'').replace('.',':');
    const m=s.match(/^(\d{1,2}):(\d{2})$/);
    if(!m) return null;
    const h=Number(m[1]), min=Number(m[2]);
    if(h>23||min>59) return null;
    return h*60+min;
  }
  function parseRange(v){
    const s=String(v??'').trim();
    const m=s.match(/(\d{1,2}[.:]\d{2})\s*(?:-|–|—|sampai|s\/d)\s*(\d{1,2}[.:]\d{2})/i);
    if(!m) return null;
    const start=parseTime(m[1]), end=parseTime(m[2]);
    return start!==null&&end!==null&&end>start?{start,end}:null;
  }
  function normalizeEntry(v){ return {jam:String(v?.jam??v?.time??v?.waktu??'').trim(),mapel:String(v?.mapel??v?.mataPelajaran??v?.pelajaran??v?.subject??'').trim()}; }
  function isBreakEntry(v){
    const s=String(v?.mapel??'').trim().toLowerCase();
    return /^(istirahat|break|jam istirahat|kosong|upacara|apel|libur)$/.test(s);
  }
  function currentEntry(entries,d=new Date()){
    const now=minutesNow(d);
    for(const raw of (entries||[])){
      const e=normalizeEntry(raw), r=parseRange(e.jam);
      if(r&&now>=r.start&&now<r.end) return {...e,...r,break:isBreakEntry(e)};
    }
    return null;
  }
  function normalizeDay(v){
    const s=String(v??'').trim().toLowerCase();
    return days.find(x=>x.toLowerCase()===s)||null;
  }
  function entriesFromDoc(ds){
    const x=ds.data()||{};
    const day=normalizeDay(x.hari||x.day)||normalizeDay(ds.id);
    let entries=[];
    if(Array.isArray(x.entries)) entries=x.entries;
    else if(Array.isArray(x.jadwal)) entries=x.jadwal;
    else if(x.jam||x.mapel) entries=[x];
    return {day,entries:entries.map(normalizeEntry).filter(x=>x.jam||x.mapel)};
  }
  window.TKJ3Schedule={days,dayName,minutesNow,parseTime,parseRange,normalizeEntry,isBreakEntry,currentEntry,entriesFromDoc};
})();
