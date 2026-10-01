'use strict';
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const typeDefinitions = [
  {name:'Documents',count:18,extension:'pdf'},
  {name:'Images',count:34,extension:'jpg'},
  {name:'Videos',count:5,extension:'mp4'},
  {name:'Audio',count:3,extension:'m4a'},
  {name:'Archives',count:7,extension:'zip'},
  {name:'Installers',count:4,extension:'dmg'},
  {name:'Other',count:2,extension:'dat'}
];
const desktopSamples = [
  ['Screenshot.png','Images'],['Invoice.pdf','Documents'],['IMG_4412.jpg','Images'],['Notes.txt','Documents'],
  ['Budget.pdf','Documents'],['Moodboard.png','Images'],['Podcast.m4a','Audio'],['Zoom.dmg','Installers'],
  ['Sketch.png','Images'],['Ideas.pdf','Documents'],['Demo.mp4','Videos'],['Assets.zip','Archives']
];
const files = [
  ...desktopSamples.map(([name,type])=>({name,type,location:'desktop',target:'Desktop Archive / 2026-10-01'})),
  ...typeDefinitions.flatMap(type=>Array.from({length:type.count},(_,i)=>({name:`${type.name}-${String(i+1).padStart(2,'0')}.${type.extension}`,type:type.name,location:'downloads',target:`Downloads / ${type.name}`})))
];
const moved = new Set();
const receipts = [];
let period = 'week';
let busy = false;
const enabled = location => $(`#${location}-enabled`).checked;
const remaining = () => files.filter(file=>!moved.has(file.name));
const eligible = () => remaining().filter(file=>enabled(file.location));
const announce = message => { $('#demo-live').textContent=message; };

for(const [name,type] of desktopSamples){
  const item=document.createElement('div');item.className=`sample-file${type==='Images'?' image-file':''}`;
  item.style.setProperty('--file-color',`var(--type-${type.toLowerCase()})`);
  const glyph=document.createElement('span');glyph.className='file-glyph';glyph.setAttribute('aria-hidden','true');
  const label=document.createElement('small');label.textContent=name;item.title=name;
  item.append(glyph,label);$('#desktop-files').append(item);
}
for(const type of typeDefinitions){
  const row=document.createElement('div');row.className='type-row';row.dataset.type=type.name;
  row.style.setProperty('--type',`var(--type-${type.name.toLowerCase()})`);
  const dot=document.createElement('i');dot.setAttribute('aria-hidden','true');
  const name=document.createElement('span');name.textContent=type.name;
  const count=document.createElement('b');
  const bar=document.createElement('div');bar.className='type-bar';bar.setAttribute('aria-hidden','true');bar.append(document.createElement('span'));
  row.append(dot,name,count,bar);$('#download-types').append(row);
}
function goTab(name, focus=false){
  $$('[data-tab]').forEach(button=>{
    const active=button.dataset.tab===name;
    button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
    $(`#panel-${button.dataset.tab}`).hidden=!active;
    if(active&&focus)button.focus();
  });
}
$$('[data-tab]').forEach((button,index)=>{
  button.addEventListener('click',()=>goTab(button.dataset.tab));
  button.addEventListener('keydown',event=>{
    const tabs=$$('[data-tab]');let next=index;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;
    else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=tabs.length-1;
    else return;
    event.preventDefault();goTab(tabs[next].dataset.tab,true);
  });
});
function fileRow(file){
  const row=document.createElement('div');row.className='preview-row';
  const name=document.createElement('span');name.textContent=file.name;
  const target=document.createElement('span');target.textContent=file.target;
  row.append(name,target);return row;
}
function undoReceipt(receipt){
  if(!receipt||receipt.undone)return;
  receipt.undone=true;receipt.files.forEach(file=>moved.delete(file.name));update();
  announce(`${receipt.files.length} sample files restored. Your actual files were not touched.`);
}
function update(){
  const selected=eligible();const left=remaining();
  const desktopLeft=left.filter(file=>file.location==='desktop').length;
  const downloadsLeft=left.filter(file=>file.location==='downloads').length;
  $('#demo-counts').textContent=`${desktopLeft} items on your Desktop · ${downloadsLeft} in Downloads`;
  $('#organize').disabled=busy||!selected.length;
  $('#organize').textContent=selected.length?'Organize now':left.length?'Choose a place':'All organized';
  $('#downloads-total').textContent=downloadsLeft;
  for(const row of $$('.type-row')){
    const count=left.filter(file=>file.location==='downloads'&&file.type===row.dataset.type).length;
    $('b',row).textContent=count;row.style.setProperty('--amount',`${count/34*100}%`);
  }
  const desktopMoved=12-desktopLeft;
  $('#after-label').textContent=desktopMoved===12?'Clear':enabled('desktop')?'Preview':'Paused';
  $('#after-canvas').classList.toggle('organized',desktopMoved===12);
  $('#after-canvas').classList.toggle('paused',!enabled('desktop')&&!desktopMoved);
  $('#archive-status').textContent=desktopMoved?`${desktopMoved} items archived` : enabled('desktop')?'12 items · Archive / 2026-10-01':'Desktop stays as it is';
  const latest=[...receipts].reverse().find(receipt=>!receipt.undone);
  $('#quick-undo').disabled=!latest;
  if(latest){
    const desktop=latest.files.filter(file=>file.location==='desktop').length;
    const downloads=latest.files.length-desktop;
    $('#receipt-summary').textContent=`Receipt saved · ${desktop} archived · ${downloads} sorted`;
  }else $('#receipt-summary').textContent=receipts.length?'Moves restored · Ready for a fresh start':'Ready when you are · Preview your file moves';
  $('#receipt-count').textContent=receipts.length;
  $('#preview-rows').replaceChildren(...selected.map(fileRow));
  if(!selected.length){const p=document.createElement('p');p.textContent=left.length?'Choose a location to preview its file moves.':'All sample files have been organized.';$('#preview-rows').append(p);}
  updateReceipts();updateReports();
}
function updateReceipts(){
  if(!receipts.length)return;
  const container=$('#receipts-content');container.replaceChildren();
  [...receipts].reverse().forEach(receipt=>{
    const card=document.createElement('article');card.className='receipt-card';
    const title=document.createElement('div');title.className='receipt-title';
    const heading=document.createElement('h4');heading.textContent=`${receipt.files.length} files, in their place.`;
    const badge=document.createElement('span');badge.textContent=receipt.undone?'Undone':'Completed';title.append(heading,badge);
    const description=document.createElement('p');description.textContent=receipt.undone?'Sample files restored to their original locations.':'Sample session · October 1, 2026 · all file moves recorded';
    const list=document.createElement('div');list.className='receipt-list';receipt.files.forEach(file=>list.append(fileRow(file)));
    const undo=document.createElement('button');undo.className='button';undo.textContent=receipt.undone?'Moves restored':'Undo remaining moves';undo.disabled=receipt.undone;
    undo.addEventListener('click',()=>{undoReceipt(receipt);$('.receipt-card h4',container)?.focus();});
    card.append(title,description,list,undo);container.append(card);
  });
}
function bar(label,total){
  const group=document.createElement('div');const column=document.createElement('span');column.style.setProperty('--bar-height',`${total/85*90}%`);
  const text=document.createElement('small');text.textContent=label;group.append(column,text);return group;
}
function updateReports(){
  $('#report-total').textContent=moved.size;
  $('.chart').setAttribute('aria-label',`${period==='week'?'This week':'This month'}: ${moved.size} sample files organized on October 1, 2026; all other days have zero.`);
  const labels=period==='week'?['Mon','Tue','Wed','Thu','Fri','Sat','Sun']:['1–7','8–14','15–21','22–28','29–31'];
  $('.chart').replaceChildren(...labels.map((label,i)=>bar(label,i===(period==='week'?3:0)?moved.size:0)));
  $('#report-description').textContent=moved.size?'Confirmed sample moves. Undo updates these totals.':'Organize the sample files to see their destinations.';
  const totals=new Map();files.filter(file=>moved.has(file.name)).forEach(file=>totals.set(file.target,(totals.get(file.target)||0)+1));
  $('#report-destinations').replaceChildren(...[...totals].map(([target,count])=>{const row=document.createElement('div');row.className='preview-row';const name=document.createElement('span');name.textContent=target;const number=document.createElement('span');number.textContent=`${count} items`;row.append(name,number);return row;}));
}
$('#organize').addEventListener('click',()=>{
  const selected=eligible();if(busy||!selected.length)return;busy=true;
  selected.forEach(file=>moved.add(file.name));receipts.push({files:selected,undone:false});busy=false;
  $('#file-preview').hidden=true;$('#preview-toggle').setAttribute('aria-expanded','false');$('#preview-toggle').textContent='Preview file moves';
  update();announce(`${selected.length} sample files organized. Receipt saved. Undo is available.`);
});
$('#quick-undo').addEventListener('click',()=>undoReceipt([...receipts].reverse().find(receipt=>!receipt.undone)));
$('#preview-toggle').addEventListener('click',()=>{const open=$('#file-preview').hidden;$('#file-preview').hidden=!open;$('#preview-toggle').setAttribute('aria-expanded',String(open));$('#preview-toggle').textContent=open?'Hide file preview':'Preview file moves';});
['desktop','downloads'].forEach(location=>$(`#${location}-enabled`).addEventListener('change',()=>{update();announce(`${eligible().length} sample files ready to organize.`);}));
$('#appearance').addEventListener('click',()=>{const dark=$('#tour').classList.toggle('dark');$('#appearance').setAttribute('aria-label',`Switch demo to ${dark?'light':'dark'} appearance`);});
$$('[name=schedule]').forEach(input=>input.addEventListener('change',()=>{const description=input.value==='Manual'?'Organize whenever you are ready.':`Organize ${input.value.toLowerCase()} while Clearspace is open.`;$('#schedule-description').textContent=description;$('.demo-schedule').title=description;announce(`${input.value} selected in the demo. No actual schedule is created.`);}));
$$('[data-period]').forEach(button=>button.addEventListener('click',()=>{period=button.dataset.period;$$('[data-period]').forEach(item=>{item.classList.toggle('selected',item===button);item.setAttribute('aria-pressed',String(item===button));});updateReports();}));
$$('[data-go-organize]').forEach(button=>button.addEventListener('click',()=>goTab('organize',true)));
const mobileQuery=window.matchMedia('(max-width: 767px)');
const applyPanelLayout=()=>{$('.places-panel').open=!mobileQuery.matches;};applyPanelLayout();
mobileQuery.addEventListener('change',applyPanelLayout);
const closeMenu=()=>{$('#main-navigation').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Open menu');};
$('#menu-toggle').addEventListener('click',()=>{const open=$('#main-navigation').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',open?'Close menu':'Open menu');});
$$('#main-navigation a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('#main-navigation').classList.contains('open')){closeMenu();$('#menu-toggle').focus();}});
const dialog=$('#download-dialog');
$$('[data-download]').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
$('.dialog-close').addEventListener('click',()=>dialog.close());
$('#dialog-demo').addEventListener('click',()=>{dialog.close();goTab('organize');$('#organize').focus({preventScroll:true});});
// Preserve links shared before the layout update.
const legacyAnchors={'#demo':'#tour','#features':'#why','#how-it-works':'#how','#questions':'#faq'};
if(legacyAnchors[location.hash]){const target=legacyAnchors[location.hash];history.replaceState(null,'',target);$(target).scrollIntoView();}
update();
