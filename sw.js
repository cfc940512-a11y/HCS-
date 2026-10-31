/* HCS 群島 offline cache. Bump VERSION after you replace index.html. */
const VERSION='hcs-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  if(r.mode==='navigate'){
    // open instantly from cache, refresh the cached copy in the background
    e.respondWith(caches.open(VERSION).then(async c=>{
      const hit=await c.match('./index.html');
      const net=fetch(r).then(res=>{if(res.ok)c.put('./index.html',res.clone());return res;}).catch(()=>hit);
      if(hit){e.waitUntil(net);return hit;}
      return net;
    }));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{
    if(res.ok&&(r.url.startsWith(self.location.origin)||r.url.includes('cdnjs.cloudflare.com'))){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp));}
    return res;
  })));
});
