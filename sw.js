const CACHE="euskera-v4";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","pages/p05.webp","pages/p06.webp","pages/p07.webp","pages/p08.webp","pages/p09.webp","pages/p10.webp","pages/p11.webp","pages/p12.webp","pages/p13.webp","pages/p14.webp","pages/p15.webp","pages/p16.webp","pages/p17.webp","pages/p18.webp","pages/p19.webp","pages/p20.webp","pages/p21.webp","pages/p22.webp","pages/p23.webp","pages/p24.webp","pages/p25.webp","pages/p26.webp","pages/p27.webp","pages/p28.webp","pages/p29.webp","pages/p30.webp","pages/p31.webp","pages/p32.webp","pages/p33.webp","pages/p34.webp","pages/p35.webp","pages/p36.webp","pages/p37.webp","pages/p38.webp","pages/p39.webp","pages/p40.webp","pages/p41.webp","pages/p42.webp","pages/p43.webp","pages/p44.webp","pages/p45.webp","pages/p46.webp","pages/p47.webp","pages/p48.webp","pages/p49.webp","pages/p50.webp","pages/p51.webp","pages/p52.webp","pages/p53.webp","pages/p54.webp","pages/p55.webp","pages/p56.webp","pages/p57.webp","pages/p58.webp","pages/p59.webp","pages/p60.webp","pages/p61.webp","pages/p62.webp","pages/p63.webp","pages/p64.webp","pages/p65.webp","pages/p66.webp","pages/p67.webp","pages/p68.webp","pages/p69.webp","pages/p70.webp","pages/p71.webp","pages/p72.webp","pages/p73.webp","pages/p74.webp","pages/p75.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;
  const u=new URL(r.url); const page=r.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html");
  if(page){ /* red primero: así las actualizaciones llegan; sin conexión, copia guardada */
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{
    if(res.ok&&u.origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}
    return res;}).catch(()=>caches.match("index.html"))));
});
