const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:1000},deviceScaleFactor:2});
await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.route('**/cdnjs.cloudflare.com/**',r=>r.abort());
await p.goto('file:///home/user/kbk/dist/KBK_AsbestCheck_AI_offline.html');await p.evaluate(()=>login('pb'));await p.click('[data-view=proces]');await p.waitForTimeout(400);
await p.evaluate(()=>{const t=document.getElementById('tour');if(t)t.hidden=true});await p.locator('.flow').screenshot({path:'dist/KBK_Werkproces_flowchart.png'});
await p.locator('#view-proces').screenshot({path:'dist/KBK_Werkproces_flowchart_met_uitleg.png'});
await b.close();})();
