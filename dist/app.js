'use strict';
// Sample-only model of the current native Mereday interface. No filesystem access.
(() => {
const root = document.querySelector('#app-shell');
const $ = selector => root.querySelector(selector);
const $$ = selector => [...root.querySelectorAll(selector)];
const files = [
 {id:1,name:'Weekend.jpg',type:'Images',location:'desktop'},
 {id:2,name:'Ideas.pdf',type:'Documents',location:'desktop'},
 {id:3,name:'Moodboard.png',type:'Images',location:'desktop'},
 {id:4,name:'Notes.txt',type:'Documents',location:'desktop'},
 {id:5,name:'Sketch.png',type:'Images',location:'desktop'},
 {id:6,name:'Demo.mov',type:'Media',location:'desktop'},
 {id:7,name:'Invoice.pdf',type:'Documents',location:'downloads',category:'Documents'},
 {id:8,name:'Cover.jpg',type:'Images',location:'downloads',category:'Images'},
 {id:9,name:'Portrait.png',type:'Images',location:'downloads',category:'Images'},
 {id:10,name:'Guide.pdf',type:'Documents',location:'downloads',category:'Documents'},
 {id:11,name:'Voice-note.m4a',type:'Media',location:'downloads',category:'Audio'},
 {id:12,name:'Assets.zip',type:'Other',location:'downloads',category:'Archives'},
];
const kinds=['Images','Documents','Media','Other'];
const variables=['--images','--documents','--media','--other'];
const folders={desktop:'Desktop',archive:'Desktop Archive',downloads:'Downloads'};
let receipts=[], moved=new Set(), selectedKind=null, period='week', selectedDay=null;
let pageNumber=0, focusedReceipt=null, openReceipts=new Set(), showAllDestinations=false;
let checkedAt=new Date(), lastRun=null, busy=false, folderRole=null;
const pageSize=5;
const enabled=location=>$(`#${location}-enabled`).checked;
const remaining=()=>files.filter(file=>!moved.has(file.id));
const eligible=()=>remaining().filter(file=>enabled(file.location));
const selection=name=>$(`[name="${name}"]:checked`).value;
const dateKey=date=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
const timeText=date=>date.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
const dateText=date=>date.toLocaleString([], {month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'});
const announce=message=>{document.querySelector('#demo-live').textContent=message;};
function node(tag,className,text) {const element=document.createElement(tag);if(className)element.className=className;if(text!==undefined)element.textContent=text;return element;}
function button(text,className,action,label) {const element=node('button',className,text);element.type='button';element.addEventListener('click',action);if(label)element.setAttribute('aria-label',label);return element;}
function copyIcon(name) {return $(`[data-tab="${name}"] .app-icon`).cloneNode(true);}
function archivePath(date=new Date()) {return `${folders.archive} / ${dateKey(date).slice(0,selection('grouping')==='Daily'?10:7)}`;}
function destination(file) {return file.location==='desktop'?archivePath():`${folders.downloads} / ${file.category}`;}
function goTab(name,focus=false) {
 $$('[data-tab]').forEach(tab=>{const active=tab.dataset.tab===name;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;$(`#panel-${tab.dataset.tab}`).hidden=!active;if(active&&focus)tab.focus({preventScroll:true});});
 document.querySelector('#tour').scrollIntoView({block:'start',behavior:'instant'});
 if(name==='reports')updateReports();
 if(name==='receipts')renderReceipts();
}
$$('[data-tab]').forEach((tab,index)=>{
 tab.addEventListener('click',()=>goTab(tab.dataset.tab));
 tab.addEventListener('keydown',event=>{
  const tabs=$$('[data-tab]');let next=index;
  if(['ArrowRight','ArrowDown'].includes(event.key))next=(index+1)%tabs.length;
  else if(['ArrowLeft','ArrowUp'].includes(event.key))next=(index-1+tabs.length)%tabs.length;
  else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;
  event.preventDefault();goTab(tabs[next].dataset.tab,true);
 });
});
function setPreview(open) {
 $('#file-preview').hidden=!open;$('#preview-toggle').setAttribute('aria-expanded',String(open));
 $('#preview-toggle span').textContent=open?'Hide file preview':'Preview file moves';
}
function renderPreview() {
 const available=eligible();const filtered=available.filter(file=>!selectedKind||file.type===selectedKind);
 $('#preview-title').textContent=selectedKind?`${selectedKind} · ${filtered.length} items`:'Your files, with a place to go.';
 $('#snapshot-note').textContent=`Snapshot: ${timeText(checkedAt)}. Sample file destinations are shown below. Organize checks all enabled locations, even when this preview is filtered.`;
 const rows=filtered.map(file=>{const row=node('div','preview-row');const text=node('div');text.append(node('strong','',file.name),node('p','',`${destination(file)} / ${file.name}`));row.append(text,node('span','file-type',file.type));return row;});
 if(!rows.length)rows.push(node('p','sample-note','No items to organize in this selection.'));
 $('#preview-rows').replaceChildren(...rows);
}
function updateOrbit() {
 const selected=eligible(),count=selected.length,anyEnabled=enabled('desktop')||enabled('downloads');
 let status=busy?'Organizing':!anyEnabled?'Your space':!count?'All in place':selectedKind?`${selected.filter(file=>file.type===selectedKind).length} ${selectedKind.toLowerCase()}`:`${count} items`;
 let caption=busy?'giving everything a home':!anyEnabled?'choose a location':!count?'a little room to think':'ready to organize';
 $('#item-count').textContent=status;$('#ring-caption').textContent=caption;$('#orbit').setAttribute('aria-label',`${status}. ${caption}.`);
 $('#item-count').style.fontSize=selectedKind||!count?'23px':'';
 let cursor=0;const segments=[];
 kinds.forEach((kind,index)=>{
  const num=selected.filter(file=>file.type===kind).length;const control=$(`[data-kind="${kind}"]`);
  control.querySelector('b').textContent=num;control.setAttribute('aria-pressed',String(selectedKind===kind));control.disabled=busy;
  if(num&&count){const end=cursor+num/count*100,gap=Math.min(.4,(end-cursor)/4);const color=selectedKind&&selectedKind!==kind?`color-mix(in srgb,var(${variables[index]}) 22%,var(--app-bg))`:`var(${variables[index]})`;segments.push(`var(--app-bg) ${cursor}% ${cursor+gap}%`,`${color} ${cursor+gap}% ${end-gap}%`,`var(--app-bg) ${end-gap}% ${end}%`);cursor=end;}
 });
 $('#orbit').style.background=count?`conic-gradient(${segments.join(',')})`:'var(--app-raised)';
 $('#organize').textContent=busy?'Organizing…':count?`Organize ${count} items`:'Organize now';$('#organize').disabled=busy||!count;
 ['desktop','downloads'].forEach(location=>{const num=remaining().filter(file=>file.location===location).length;$(`#${location}-count`).textContent=`${num} items · ${location==='desktop'?'dated archive':'folders by type'}`;$(`#${location}-destination`).hidden=!enabled(location);$(`#${location}-enabled`).disabled=busy;});
 $('#checked-time').textContent=`Checked ${timeText(checkedAt)}`;
}
function update() {
 updateOrbit();renderPreview();renderReceipts();updateReports();
 $('#archive-destination').textContent=archivePath();$('#grouping-hint').textContent=selection('grouping')==='Monthly'?'By month':'By day';
 Object.keys(folders).forEach(role=>$(`#${role}-path`).textContent=`Sample Mac / ${folders[role]}`);
 $('#last-run').hidden=!lastRun;
 if(lastRun){$('#last-run-summary').textContent=`${lastRun.count} item(s) organized`;$('#last-run-date').textContent=dateText(lastRun.date);}
}
function refresh(){checkedAt=new Date();update();announce('Sample file overview refreshed.');}
$('#refresh-overview').addEventListener('click',refresh);$('#refresh-preview').addEventListener('click',refresh);
$('#preview-toggle').addEventListener('click',()=>{setPreview($('#file-preview').hidden);renderPreview();});
$('#close-preview').addEventListener('click',()=>{setPreview(false);$('#preview-toggle').focus({preventScroll:true});});
$$('[data-kind]').forEach(control=>control.addEventListener('click',()=>{selectedKind=selectedKind===control.dataset.kind?null:control.dataset.kind;setPreview(true);updateOrbit();renderPreview();announce(selectedKind?`Preview filtered to ${selectedKind.toLowerCase()}. Organize still includes all enabled files.`:'Showing all file types.');}));
['desktop','downloads'].forEach(location=>$(`#${location}-enabled`).addEventListener('change',()=>{checkedAt=new Date();update();announce(`${eligible().length} sample files ready to organize.`);}));
$('#configure').addEventListener('click',()=>{const open=$('#configuration').hidden;$('#configuration').hidden=!open;$('#configure').setAttribute('aria-expanded',String(open));$('#configure span').textContent=open?'Hide configuration':'Configure';});
$$('[name="grouping"]').forEach(input=>input.addEventListener('change',()=>{checkedAt=new Date();update();announce(`${input.value} archive grouping selected.`);}));
$$('[name="schedule"]').forEach(input=>input.addEventListener('change',()=>{$('#schedule-description').textContent=input.value==='Manual'?'Organize whenever you’re ready.':`Organize ${input.value.toLowerCase()} while Mereday is running.`;announce(`${input.value} selected in the demo. No actual schedule is created.`);}));
const folderOptions={desktop:['Desktop','Work Desktop'],archive:['Desktop Archive','Documents / Desktop Archive'],downloads:['Downloads','Work Downloads']};
$$('[data-folder]').forEach(control=>control.addEventListener('click',()=>{
 folderRole=control.dataset.folder;$('#folder-dialog-title').textContent=`Choose a sample ${folderRole==='archive'?'archive':folderRole} folder`;
 $('#sample-folder').replaceChildren(...folderOptions[folderRole].map(value=>{const option=node('option','',value);option.value=value;option.selected=value===folders[folderRole];return option;}));
 $('#folder-dialog').showModal();
}));
$('#choose-sample-folder').addEventListener('click',()=>{if(folderRole){folders[folderRole]=$('#sample-folder').value;checkedAt=new Date();update();announce('Sample folder updated. Your actual folders are untouched.');}});
const media=window.matchMedia('(prefers-color-scheme: dark)');
function applyAppearance(){const choice=selection('appearance');const dark=choice==='Dark'||choice==='System'&&media.matches;root.classList.toggle('dark',dark);$('#appearance').setAttribute('aria-label',`Switch demo to ${dark?'light':'dark'} appearance`);$('#appearance').innerHTML=dark?'<svg class="app-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg>':'<svg class="app-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/></svg>';}
$$('[name="appearance"]').forEach(input=>input.addEventListener('change',applyAppearance));media.addEventListener('change',applyAppearance);
$('#appearance').addEventListener('click',()=>{$(`[name="appearance"][value="${root.classList.contains('dark')?'Light':'Dark'}"]`).checked=true;applyAppearance();});
$('#launch-login').addEventListener('change',()=>announce(`Launch at login ${$('#launch-login').checked?'enabled':'disabled'} in the demo only. Your Mac’s settings have not changed.`));
$('#organize').addEventListener('click',()=>{
 const selected=eligible();if(busy||!selected.length)return;
 busy=true;updateOrbit();$('#configure').disabled=true;$$('[name="grouping"],[data-folder]').forEach(input=>input.disabled=true);
 window.setTimeout(()=>{
  const date=new Date();
  ['desktop','downloads'].forEach(location=>{
   const operationFiles=selected.filter(file=>file.location===location).map(file=>({...file,target:destination(file),source:folders[location]}));
   if(operationFiles.length){const receipt={id:receipts.length+1,location,date,files:operationFiles,undone:false,destination:location==='desktop'?archivePath(date):folders.downloads};receipts.push(receipt);operationFiles.forEach(file=>moved.add(file.id));}
  });
  lastRun={count:selected.length,date};checkedAt=date;selectedKind=null;pageNumber=0;focusedReceipt=null;busy=false;
  $('#configure').disabled=false;$$('[name="grouping"],[data-folder]').forEach(input=>input.disabled=false);setPreview(false);update();announce(`${selected.length} sample items organized. Each location has its own receipt and Undo.`);
 },500);
});
function openReceipt(id=null){focusedReceipt=id;const ordered=[...receipts].reverse();pageNumber=id===null?0:Math.floor(ordered.findIndex(receipt=>receipt.id===id)/pageSize);if(id!==null)openReceipts.add(id);goTab('receipts',true);if(id!==null)requestAnimationFrame(()=>{const target=$(`[data-receipt="${id}"]`);target?.focus({preventScroll:true});});}
$$('[data-open-receipts]').forEach(control=>control.addEventListener('click',()=>openReceipt()));
$$('[data-go-organize]').forEach(control=>control.addEventListener('click',()=>goTab('organize',true)));
function undoReceipt(receipt){if(receipt.undone||busy)return;receipt.undone=true;receipt.files.forEach(file=>moved.delete(file.id));checkedAt=new Date();update();announce(`${receipt.files.length} sample files restored. Reports updated.`);$(`[data-receipt="${receipt.id}"]`)?.focus({preventScroll:true});}
function pagination(total){const row=node('div','receipt-pagination');const pages=Math.ceil(total/pageSize);row.append(node('span','',`${pageNumber*pageSize+1}–${Math.min((pageNumber+1)*pageSize,total)} of ${total} receipts`));if(pages>1){const prev=button('‹','secondary-button',()=>{pageNumber--;focusedReceipt=null;renderReceipts();},'Previous receipts page');prev.disabled=pageNumber===0;const next=button('›','secondary-button',()=>{pageNumber++;focusedReceipt=null;renderReceipts();},'Next receipts page');next.disabled=pageNumber===pages-1;row.append(prev,node('span','',`Page ${pageNumber+1} of ${pages}`),next);}return row;}
function renderReceipts(){
 const container=$('#receipts-content');container.replaceChildren();
 if(!receipts.length){const empty=node('div','empty-state');empty.append(copyIcon('receipts'),node('h4','','Your next fresh start begins here.'),node('p','','Organize your files to see their destinations and Undo options.'),button('Go to Organize','text-button',()=>goTab('organize',true)));container.append(empty);return;}
 pageNumber=Math.max(0,Math.min(pageNumber,Math.ceil(receipts.length/pageSize)-1));container.append(pagination(receipts.length));
 [...receipts].reverse().slice(pageNumber*pageSize,(pageNumber+1)*pageSize).forEach(receipt=>{
  const card=node('article',`app-card receipt-card${focusedReceipt===receipt.id?' focused':''}`);card.dataset.receipt=receipt.id;card.tabIndex=-1;
  const header=node('div','receipt-header'),info=node('div','receipt-info'),operation=receipt.location==='desktop'?'Desktop tidy':'Downloads sort';
  info.append(node('h4','',`${operation} · ${dateText(receipt.date)}`),node('p','',receipt.undone?`0 ${receipt.location==='desktop'?'archived':'sorted'}, ${receipt.files.length} restored`:`${receipt.files.length} ${receipt.location==='desktop'?'archived':'sorted'}`),node('p','',`Sample Mac / ${receipt.destination}`));
  const undo=button('Undo remaining moves','secondary-button',()=>undoReceipt(receipt));undo.disabled=receipt.undone||busy;
  const expanded=openReceipts.has(receipt.id),detail=button(expanded?'⌃':'…','icon-button',()=>{expanded?openReceipts.delete(receipt.id):openReceipts.add(receipt.id);renderReceipts();$(`[data-receipt="${receipt.id}"] .receipt-details-toggle`).focus({preventScroll:true});},expanded?'Hide receipt details':'Show receipt details');detail.classList.add('receipt-details-toggle');detail.setAttribute('aria-expanded',String(expanded));detail.setAttribute('aria-controls',`receipt-detail-${receipt.id}`);
  header.append(node('span','receipt-status','✓'),info,undo,detail);card.append(header);
  const details=node('div','receipt-details');details.id=`receipt-detail-${receipt.id}`;details.hidden=!expanded;details.append(node('p','sample-note',`Manual · ${receipt.files.length} items`));
  receipt.files.forEach(file=>{const row=node('div','preview-row'),text=node('div');text.append(node('strong','',`${file.name} → ${file.target} / ${file.name}`),node('p','',receipt.undone?'Restored':'Moved'));row.append(text);details.append(row);});
  details.append(node('p','sample-note','Undo leaves newer files in place. Empty destination folders are kept.'));card.append(details);container.append(card);
 });
 if(receipts.length>pageSize)container.append(pagination(receipts.length));
}
function reportBounds(){const today=new Date(),start=new Date(today.getFullYear(),today.getMonth(),today.getDate());if(period==='week'){let first=0;try{const locale=new Intl.Locale(navigator.language);first=(locale.getWeekInfo?.()||locale.weekInfo)?.firstDay%7||0;}catch{}start.setDate(start.getDate()-(start.getDay()-first+7)%7);}else start.setDate(1);const end=new Date(start);period==='week'?end.setDate(end.getDate()+7):end.setMonth(end.getMonth()+1);return {start,end,today};}
function reportData(){const {start,end,today}=reportBounds();const active=receipts.filter(receipt=>!receipt.undone&&receipt.date>=start&&receipt.date<end&&receipt.date<=today);const days=[];for(let date=new Date(start);date<end;date.setDate(date.getDate()+1)){const copy=new Date(date),list=active.filter(receipt=>dateKey(receipt.date)===dateKey(copy));days.push({date:copy,desktop:list.filter(receipt=>receipt.location==='desktop').reduce((n,receipt)=>n+receipt.files.length,0),downloads:list.filter(receipt=>receipt.location==='downloads').reduce((n,receipt)=>n+receipt.files.length,0),latest:list.at(-1)});}return {start,end,today,active,days};}
function updateReports(){
 const data=reportData(),active=data.active;const desktop=active.filter(receipt=>receipt.location==='desktop').reduce((n,receipt)=>n+receipt.files.length,0),downloads=active.filter(receipt=>receipt.location==='downloads').reduce((n,receipt)=>n+receipt.files.length,0),total=desktop+downloads;
 $('#report-total').textContent=total;$('#desktop-total').textContent=desktop;$('#downloads-total').textContent=downloads;$('#report-period-caption').textContent=period==='week'?'This week, so far.':'This month, so far.';
 $('#report-range').textContent=`${data.start.toLocaleDateString([], {month:'short',day:'numeric'})} – ${data.today.toLocaleDateString([], {month:'short',day:'numeric',year:'numeric'})}`;
 $('#report-empty-description').textContent=`No remaining organized items ${period==='week'?'this week':'this month'}. Organize a few files, and your activity will appear here.`;
 $('#report-empty').hidden=total>0;$('#report-populated').hidden=!total;
 const scale=Math.max(4,Math.ceil(Math.max(...data.days.map(day=>day.desktop+day.downloads))/4)*4);
 $('.chart-scale').replaceChildren(...[4,3,2,1,0].map(value=>node('span','',String(scale*value/4))));
 $('#activity-chart').replaceChildren(...data.days.map((day,index)=>{
  const key=dateKey(day.date),total=day.desktop+day.downloads;const control=button('','chart-day',()=>{selectedDay=key;updateReports();$(`[data-day="${key}"]`).focus({preventScroll:true});},`${day.date.toLocaleDateString([], {month:'short',day:'numeric'})}: ${day.desktop} archived, ${day.downloads} sorted`);control.dataset.day=key;control.setAttribute('aria-pressed',String(key===selectedDay));
  const stack=node('span','bar-stack');stack.style.height=`${total/scale*100}%`;const a=node('span','bar-desktop'),b=node('span','bar-downloads');a.style.height=`${total?day.desktop/total*100:0}%`;b.style.height=`${total?day.downloads/total*100:0}%`;stack.append(a,b);control.append(stack);
  if(period==='week'||index%7===0)control.append(node('small','',period==='week'?day.date.toLocaleDateString([], {weekday:'short'}):String(day.date.getDate())));return control;
 }));
 const selected=data.days.find(day=>dateKey(day.date)===selectedDay);
 $('#day-title').textContent=selected?selected.date.toLocaleDateString([], {weekday:'long',month:'short',day:'numeric'}):'Every small reset counts.';
 $('#day-description').textContent=selected?`${selected.desktop} archived · ${selected.downloads} sorted`:'Select a day to see its activity.';
 $('#day-receipt').hidden=!selected?.latest;$('#day-receipt').onclick=()=>{if(selected?.latest)openReceipt(selected.latest.id);};
 $('#previous-day').disabled=selectedDay===dateKey(data.days[0].date);$('#next-day').disabled=selectedDay===dateKey(data.days.at(-1).date);
 const destinations=new Map();active.forEach(receipt=>receipt.files.forEach(file=>{const key=file.source+'|'+file.target;const value=destinations.get(key)||{source:file.source,target:file.target,count:0,location:file.location};value.count++;destinations.set(key,value);}));
 const routes=[...destinations.values()].sort((a,b)=>b.count-a.count);$('#destination-count').textContent=`${routes.length} ${routes.length===1?'destination':'destinations'}`;
 $('#report-destinations').replaceChildren(...routes.slice(0,showAllDestinations?routes.length:4).map(route=>{const row=node('div','report-route'),text=node('div');text.append(node('strong','',route.target.split(' / ').at(-1)),node('p','',`Sample Mac / ${route.target}`));row.append(node('span','',route.source),text,node('b','route-count',String(route.count)));return row;}));
 $('#show-destinations').hidden=routes.length<=4;$('#show-destinations').textContent=showAllDestinations?'Show fewer destinations':`Show all ${routes.length} destinations`;
 const latest=active.at(-1);$('#latest-report-receipt').replaceChildren();
 if(latest){const text=node('span','',`Latest in this period · ${latest.location==='desktop'?'Desktop tidy':'Downloads sort'}`);text.append(node('small','',`${latest.files.length} items · ${dateText(latest.date)}`));$('#latest-report-receipt').append(copyIcon('receipts'),text);$('#latest-report-receipt').onclick=()=>openReceipt(latest.id);}
}
$$('[data-period]').forEach(control=>control.addEventListener('click',()=>{period=control.dataset.period;selectedDay=null;showAllDestinations=false;$$('[data-period]').forEach(other=>other.setAttribute('aria-pressed',String(other===control)));updateReports();}));
function stepDay(offset){const {days}=reportData();const index=days.findIndex(day=>dateKey(day.date)===selectedDay);selectedDay=dateKey(days[index<0?(offset<0?days.length-1:0):Math.max(0,Math.min(days.length-1,index+offset))].date);updateReports();}
$('#previous-day').addEventListener('click',()=>stepDay(-1));$('#next-day').addEventListener('click',()=>stepDay(1));$('#show-destinations').addEventListener('click',()=>{showAllDestinations=!showAllDestinations;updateReports();});
applyAppearance();update();
})();
