
const RATE=6.7808; // 2026-08-21锛堟眹鐜?1USD=6.7817CNY锛?澶涓棿浠?1USD=6.7808CNY
const raw=[
  {shop:'profile',total_usd:16276.65,frozen_usd:3847.0,total_rmb:0,frozen_rmb:0,quantuo:0},
  {shop:'Sara',total_usd:13744.37,frozen_usd:10770.0,total_rmb:0,frozen_rmb:0,quantuo:2938.22},
  {shop:'8Li',total_usd:11933.82,frozen_usd:2308.0,total_rmb:0,frozen_rmb:0,quantuo:1018.46},
  {shop:'Catherine',total_usd:7663.92,frozen_usd:2308.0,total_rmb:0,frozen_rmb:0,quantuo:8.54},
  {shop:'Imice',total_usd:4.16,frozen_usd:0,total_rmb:1000.0,frozen_rmb:1000.0,quantuo:0},
  {shop:'nexusclick',total_usd:0,frozen_usd:0,total_rmb:0,frozen_rmb:0,quantuo:2330.3},
  {shop:'NexusPOP',total_usd:4.69,frozen_usd:0,total_rmb:2179.83,frozen_rmb:0,quantuo:0},
  {shop:'David',total_usd:3528.58,frozen_usd:0,total_rmb:0,frozen_rmb:0,quantuo:32.21},
  {shop:'nancytuo',total_usd:0,frozen_usd:0,total_rmb:0,frozen_rmb:0,quantuo:2027.77},
  {shop:'Linda',total_usd:0,frozen_usd:0,total_rmb:0,frozen_rmb:0,quantuo:1136.55},
  {shop:'bana',total_usd:0,frozen_usd:0,total_rmb:0,frozen_rmb:0,quantuo:1135.16},
  {shop:'Otmil',total_usd:0,frozen_usd:0,total_rmb:7951.12,frozen_rmb:7000.0,quantuo:888.5},
  {shop:'Ella',total_usd:0,frozen_usd:0,total_rmb:2668.95,frozen_rmb:2000.0,quantuo:631.76},
  {shop:'Eric',total_usd:8843.04,frozen_usd:308.0,total_rmb:2.0,frozen_rmb:0,quantuo:540.42},
  {shop:'sam',total_usd:0,frozen_usd:0,total_rmb:0,frozen_rmb:0,quantuo:54.44},
  {shop:'Elong',total_usd:5253.3,frozen_usd:616.0,total_rmb:0,frozen_rmb:0,quantuo:495.72},
  {shop:'Petery',total_usd:0.01,frozen_usd:0,total_rmb:4017.1,frozen_rmb:4000.0,quantuo:0.95},
  {shop:'NKtuo',total_usd:0,frozen_usd:0,total_rmb:0,frozen_rmb:0,quantuo:1025.27},
];];

// ====== 璁＄畻G鍒?USD鍙敤=B-C)鍜孒鍒?RMB鍙敤=D-E) ======
raw.forEach(d=>{
  d.pop_usd=d.total_usd-d.frozen_usd;   // G鍒?= B - C
  d.pop_rmb=d.total_rmb-d.frozen_rmb;   // H鍒?= D - E
});

// ====== 涓ょ被璧勯噾鏉ユ簮 ======
// 绫?: POP 鈥?鎬婚=USD姹犳€婚+RMB姹犳€婚, 鍐荤粨=C鍒?E鍒? 鍙敤=G鍒椕楁眹鐜?H鍒?const C1_total_usd=raw.reduce((s,d)=>s+d.total_usd,0);
const C1_frozen_usd=raw.reduce((s,d)=>s+d.frozen_usd,0);
const C1_avail_usd=raw.reduce((s,d)=>s+d.pop_usd,0);
const C1_total_rmb=raw.reduce((s,d)=>s+d.total_rmb,0);
const C1_frozen_rmb=raw.reduce((s,d)=>s+d.frozen_rmb,0);
const C1_avail_rmb=raw.reduce((s,d)=>s+d.pop_rmb,0);
const C1_total=C1_total_usd*RATE+C1_total_rmb;
const C1_frozen=C1_frozen_usd*RATE+C1_frozen_rmb;
const C1_avail=C1_avail_usd*RATE+C1_avail_rmb;

// 绫?: 鍏ㄦ墭 鈥?F鍒?const C2_total=raw.reduce((s,d)=>s+d.quantuo,0);
const C2_frozen=0;
const C2_avail=C2_total;

// 鎬昏
const totalAll=C1_total+C2_total;
const totalFrozen=C1_frozen+C2_frozen;
const totalAvail=totalAll-totalFrozen;

const fmt=v=>Number(v).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmt0=v=>Number(v).toLocaleString('en-US',{maximumFractionDigits:0});

// 鎬昏
document.getElementById('totalAvail').textContent=fmt(totalAvail);
document.getElementById('totalAll').textContent='楼'+fmt0(totalAll);
document.getElementById('totalFrozen').textContent='楼'+fmt0(totalFrozen);

// 涓ょ被鍗＄墖
const cats=[
  {cls:'c1',icon:'馃攧',label:'POP',total:C1_total,frozen:C1_frozen,avail:C1_avail,
    orig:`鎬婚 ${fmt0(C1_total_usd)} USD + ${fmt0(C1_total_rmb)} RMB`,hasFz:true,pct:C1_total/totalAll*100,frozenPct:C1_frozen/C1_total*100,availPct:C1_avail/C1_total*100},
  {cls:'c3',icon:'馃摝',label:'鍏ㄦ墭',total:C2_total,frozen:C2_frozen,avail:C2_avail,
    orig:`${fmt0(C2_total)} RMB`,hasFz:false,pct:C2_total/totalAll*100,frozenPct:0,availPct:100},
];
document.getElementById('catGrid').innerHTML=cats.map(c=>`
  <div class="cat-card ${c.cls}">
    <div class="cat-head"><span class="cat-icon">${c.icon}</span><span class="cat-label">${c.label}</span></div>
    <div class="cat-total">楼${fmt0(c.total)}</div>
    <div class="cat-detail">
      ${c.orig}<br>
      ${c.hasFz?`鍐荤粨 <span class="fz">楼${fmt0(c.frozen)}</span> (${c.frozenPct.toFixed(1)}%) 锝?鍙敤 <span class="ok">楼${fmt0(c.avail)}</span> (${c.availPct.toFixed(1)}%)`:'<span class="ok">鏃犲喕缁?/span>'}
    </div>
    <div class="cat-bar">
      <div class="fill-avail" style="width:${(c.avail/totalAll*100).toFixed(1)}%"></div>
      <div class="fill-frozen" style="width:${(c.frozen/totalAll*100).toFixed(1)}%"></div>
    </div>
  </div>`).join('');

// 搴楅摵鍒楄〃 鈥?鍙敤 = G鍒?USD鍙敤)脳姹囩巼 + H鍒?RMB鍙敤) + F鍒?鍏ㄦ墭)
const colors=['#6c5ce7','#00b894','#f0a031','#e17055','#a29bfe','#0984e3','#fd79a8','#00cec9','#fab1a0','#74b9ff','#55efc4','#ffeaa7','#6c5ce7','#00b894','#f0a031','#e17055','#a29bfe','#0984e3'];
raw.forEach(d=>{
  d.avail_equiv=d.pop_usd*RATE+d.pop_rmb+d.quantuo;  // G脳姹囩巼 + H + F
  d.total_equiv=d.total_usd*RATE+d.total_rmb+d.quantuo;
  d.frozen_equiv=d.frozen_usd*RATE+d.frozen_rmb;
  d.cats=[];
  if(d.pop_usd>0||d.pop_rmb>0) d.cats.push('c1');
  if(d.quantuo>0) d.cats.push('c2');
});
const sorted=[...raw].sort((a,b)=>b.avail_equiv-a.avail_equiv);
const tagMap={c1:'tag-c1',c2:'tag-c3'};
const tagLabel={c1:'POP',c2:'鍏ㄦ墭'};

document.getElementById('shopGrid').innerHTML=sorted.map((d,i)=>{
  const color=colors[i%colors.length];
  const hasFz=d.frozen_equiv>0;
  const fzPct=d.total_equiv>0?(d.frozen_equiv/d.total_equiv*100).toFixed(0):0;
  return `
    <div class="shop-item">
      <div class="shop-icon" style="background:${color}">${d.shop.charAt(0).toUpperCase()}</div>
      <div class="shop-info">
        <div class="shop-name">${d.shop}</div>
        <div class="shop-tags">
          ${d.cats.map(c=>`<span class="tag ${tagMap[c]}">${tagLabel[c]}</span>`).join('')||'<span class="tag tag-none">鏃犱綑棰?/span>'}
          ${hasFz?`<span class="tag tag-fz">鍐荤粨${fzPct}%</span>`:''}
        </div>
      </div>
      <div class="shop-amount">
        <div class="val avail">楼${fmt0(d.avail_equiv)}</div>
        <div class="sub">鎬婚 楼${fmt0(d.total_equiv)}</div>
      </div>
    </div>`;
}).join('');

// ====== 鍘熷琛ㄦ牸锛堝惈G銆丠鍒楋紝鏍囨敞鍏紡锛?======
const rawCols=[
  {key:'shop',label:'搴楅摵'},
  {key:'total_usd',label:'璐﹀彿鎬婚(USD)'},
  {key:'frozen_usd',label:'鍐荤粨閲戦(USD)'},
  {key:'total_rmb',label:'璐﹀彿鎬婚(RMB)'},
  {key:'frozen_rmb',label:'鍐荤粨閲戦(RMB)'},
  {key:'quantuo',label:'鍏ㄦ墭(RMB)'},
  {key:'pop_usd',label:'POP鍙敤USD'},
  {key:'pop_rmb',label:'POP鍙敤RMB'},
];
document.getElementById('rawHead').innerHTML=rawCols.map(c=>`<th>${c.label}</th>`).join('');

const summaryRow={
  shop:'姹囨€?,
  total_usd:raw.reduce((s,d)=>s+d.total_usd,0),
  frozen_usd:raw.reduce((s,d)=>s+d.frozen_usd,0),
  total_rmb:raw.reduce((s,d)=>s+d.total_rmb,0),
  frozen_rmb:raw.reduce((s,d)=>s+d.frozen_rmb,0),
  quantuo:14264.27,
  pop_usd:raw.reduce((s,d)=>s+d.pop_usd,0),
  pop_rmb:raw.reduce((s,d)=>s+d.pop_rmb,0),
};

function rawRow(d,isSummary){
  return '<tr class="'+(isSummary?'summary':'')+'">'+rawCols.map(c=>{
    if(c.key==='shop') return `<td>${d.shop}</td>`;
    let v=Number(d[c.key]);
    if(!v) return '<td class="empty"></td>';
    let cls='';
    if(c.key.includes('frozen')) cls='fz';
    if(c.key==='pop_usd'||c.key==='pop_rmb') cls='avail';
    return `<td class="${cls}">${fmt(v)}</td>`;
  }).join('')+'</tr>';
}
document.getElementById('rawBody').innerHTML=raw.map(d=>rawRow(d,false)).join('')+rawRow(summaryRow,true);

window.addEventListener('resize',()=>{document.querySelectorAll('.chart').forEach(el=>{const inst=echarts.getInstanceByDom(el);if(inst)inst.resize()})});

