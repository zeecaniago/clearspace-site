'use strict';
const $ = (s, scope=document) => scope.querySelector(s);
const $$ = (s, scope=document) => [...scope.querySelectorAll(s)];
const files = [
 {name:'Weekend.jpg',type:'Images',location:'desktop',target:'Desktop Archive / 2026-09'},
 {name:'Ideas.pdf',type:'Documents',location:'desktop',target:'Desktop Archive / 2026-09'},
 {name:'Moodboard.png',type:'Images',location:'desktop',target:'Desktop Archive / 2026-09'},
 {name:'Notes.txt',type:'Documents',location:'desktop',target:'Desktop Archive / 2026-09'},
 {name:'Sketch.png',type:'Images',location:'desktop',target:'Desktop Archive / 2026-09'},
 {name:'Demo.mov',type:'Media',location:'desktop',target:'Desktop Archive / 2026-09'},
 {name:'Invoice.pdf',type:'Documents',location:'downloads',target:'Downloads / Documents'},
 {name:'Cover.jpg',type:'Images',location:'downloads',target:'Downloads / Images'},
 {name:'Portrait.png',type:'Images',location:'downloads',target:'Downloads / Images'},
 {name:'Guide.pdf',type:'Documents',location:'downloads',target:'Downloads / Documents'},
 {name:'Voice-note.m4a',type:'Media',location:'downloads',target:'Downloads / Audio'},
 {name:'Assets.zip',type:'Other',location:'downloads',target:'Downloads / Archives'},
];
let moved = [];
let receipts = [];
let period = 'week';
const enabled = loc => $(`#${loc}-enabled`).checked;
const remaining = () => files.filter(f => !moved.includes(f.name));
const eligible = () => remaining().filter(f => enabled(f.location));
const announce = message => { $('#demo-live').textContent = message; };
function goTab(name, focus=false) {
 $$('[data-tab]').forEach(button => {
  const active = button.dataset.tab === name;
  button.setAttribute('aria-selected', String(active));
  button.tabIndex = active ? 0 : -1;
  $(`#panel-${button.dataset.tab}`).hidden = !active;
  if(active && focus) button.focus();
 });
}
$$('[data-tab]').forEach((button,index) => {
 button.addEventListener('click', () => goTab(button.dataset.tab));
 button.addEventListener('keydown', event => {
  const buttons=$$('[data-tab]'); let next=index;
  if(event.key==='ArrowRight') next=(index+1)%buttons.length;
  else if(event.key==='ArrowLeft') next=(index-1+buttons.length)%buttons.length;
  else if(event.key==='Home') next=0;
  else if(event.key==='End') next=buttons.length-1;
  else return;
  event.preventDefault();goTab(buttons[next].dataset.tab,true);
 });
});
function fileRow(file) {
 const row=document.createElement('div');row.className='preview-row';
 const name=document.createElement('span');name.textContent=file.name;
 const destination=document.createElement('span');destination.textContent=file.target;
 row.append(name,destination);return row;
}
function update() {
 const selected=eligible();const count=selected.length;
 if(count && $('#preview-toggle').textContent==='View your receipt') $('#preview-toggle').textContent='Preview file moves ⌄';
 $('#item-count').textContent = count ? `${count} items` : remaining().length ? 'All paused' : 'All clear';
 $('#ring-caption').textContent = count ? 'ready to organize' : remaining().length ? 'choose a location below' : 'a little room to breathe';
 $('#organize').disabled=!count;
 $('#organize').textContent=count ? `Organize ${count} items` : remaining().length ? 'Choose a location' : 'Everything in its place';
 const types=['Images','Documents','Media','Other'];
 const colors=['#7594db','#997acf','#c7895b','#519b89'];let cursor=0;
 const segments=[];
 types.forEach((type,i) => {
  const total=selected.filter(f=>f.type===type).length;
  $$('.legend b')[i].textContent=total;
  if(total && count) { const end=cursor+total/count*100;segments.push(`${colors[i]} ${cursor}% ${Math.max(cursor,end-.8)}%`,`var(--app-bg) ${Math.max(cursor,end-.8)}% ${end}%`);cursor=end; }
 });
 $('#orbit').style.background=count ? `conic-gradient(${segments.join(',')})` : 'var(--app-line)';
 ['desktop','downloads'].forEach((location,i) => {
  const num=remaining().filter(f=>f.location===location).length;
  $$('.location-option small')[i].textContent=`${num} items · ${location==='desktop'?'dated archive':'folders by type'}`;
 });
 $('#preview-rows').replaceChildren(...selected.map(fileRow));
 if(!selected.length) { const p=document.createElement('p');p.textContent=remaining().length?'Enable a location to preview its file moves.':'All sample files have been organized.';$('#preview-rows').append(p); }
 updateReceipts();updateReports();
}
function updateReceipts() {
 const container=$('#receipts-content');
 if(!receipts.length) return;
 container.replaceChildren();
 [...receipts].reverse().forEach(receipt => {
  const card=document.createElement('article');card.className='receipt-card';
  const title=document.createElement('div');title.className='receipt-title';
  const heading=document.createElement('h4');heading.textContent=`${receipt.files.length} files, in their place.`;
  const badge=document.createElement('span');badge.textContent=receipt.undone?'Undone':'Completed';title.append(heading,badge);
  const description=document.createElement('p');description.textContent=receipt.undone?'Sample files restored to their original locations.':'Demo session · today · all file moves recorded';
  const list=document.createElement('div');list.className='receipt-list';receipt.files.forEach(f=>list.append(fileRow(f)));
  const undo=document.createElement('button');undo.className='button';undo.textContent=receipt.undone?'Moves restored':'Undo remaining moves';undo.disabled=receipt.undone;
  undo.addEventListener('click',()=>{receipt.undone=true;const names=receipt.files.map(f=>f.name);moved=moved.filter(name=>!names.includes(name));update();announce(`${names.length} sample files restored. Reports updated.`);});
  card.append(title,description,list,undo);container.append(card);
 });
}
function updateReports() {
 $('#report-total').textContent=moved.length;
 $('.chart').setAttribute('aria-label',`${period==='week'?'This week':'This month'}: ${moved.length} sample files organized on September 30; all other days have zero.`);
 if(period==='week') {
  $('.chart').replaceChildren(...['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day,i)=>bar(day,i===2?moved.length:0)));
 } else {
  $('.chart').replaceChildren(...['1–7','8–14','15–21','22–28','29–30'].map((day,i)=>bar(day,i===4?moved.length:0)));
 }
 $('#report-description').textContent=moved.length?'Confirmed sample moves. Undo updates these totals.':'Organize the sample files to see their destinations.';
 const totals=new Map();files.filter(f=>moved.includes(f.name)).forEach(f=>totals.set(f.target,(totals.get(f.target)||0)+1));
 const rows=[...totals].map(([destination,count])=>{const row=document.createElement('div');row.className='preview-row';const a=document.createElement('span');a.textContent=destination;const b=document.createElement('span');b.textContent=`${count} items`;row.append(a,b);return row;});
 $('#report-destinations').replaceChildren(...rows);
}
function bar(label,total) {const group=document.createElement('div');const column=document.createElement('span');column.style.setProperty('--bar-height',`${total/12*90}%`);const text=document.createElement('small');text.textContent=label;group.append(column,text);return group;}
$('#organize').addEventListener('click',()=>{
 const selected=eligible();if(!selected.length)return;
 moved.push(...selected.map(f=>f.name));receipts.push({files:selected,undone:false});update();
 $('#preview-toggle').textContent='View your receipt';$('#file-preview').hidden=true;$('#preview-toggle').setAttribute('aria-expanded','false');
 announce(`${selected.length} sample files organized. View your receipt to undo.`);
});
$('#preview-toggle').addEventListener('click',()=>{
 if($('#preview-toggle').textContent==='View your receipt') {goTab('receipts',true);return;}
 const open=$('#file-preview').hidden;$('#file-preview').hidden=!open;$('#preview-toggle').setAttribute('aria-expanded',String(open));$('#preview-toggle').textContent=open?'Hide file preview':'Preview file moves ⌄';
});
['desktop','downloads'].forEach(loc=>$(`#${loc}-enabled`).addEventListener('change',()=>{update();$('#preview-toggle').textContent='Preview file moves ⌄';announce(`${eligible().length} sample files ready to organize.`);}));
$('#appearance').addEventListener('click',()=>{const dark=$('#app-shell').classList.toggle('dark');$('#appearance').setAttribute('aria-label',`Switch demo to ${dark?'light':'dark'} appearance`);});
$$('[name=schedule]').forEach(input=>input.addEventListener('change',()=>{$('#schedule-description').textContent=input.value==='Manual'?'Organize whenever you’re ready.':`Organize ${input.value.toLowerCase()} while Clearspace is running.`;announce(`${input.value} selected in the demo. No actual schedule is created.`);}));
$$('[data-period]').forEach(button=>button.addEventListener('click',()=>{period=button.dataset.period;$$('[data-period]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});updateReports();}));
$$('[data-go-organize]').forEach(button=>button.addEventListener('click',()=>goTab('organize',true)));
update();
