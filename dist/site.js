'use strict';
// Page navigation and download information are separate from the original demo.
(() => {
 const find = selector => document.querySelector(selector);
 const all = selector => [...document.querySelectorAll(selector)];
 const closeMenu = () => {
  find('#main-navigation').classList.remove('open');
  find('#menu-toggle').setAttribute('aria-expanded','false');
  find('#menu-toggle').setAttribute('aria-label','Open menu');
 };
 find('#menu-toggle').addEventListener('click',()=>{
  const open=find('#main-navigation').classList.toggle('open');
  find('#menu-toggle').setAttribute('aria-expanded',String(open));
  find('#menu-toggle').setAttribute('aria-label',open?'Close menu':'Open menu');
 });
 all('#main-navigation a').forEach(link=>link.addEventListener('click',closeMenu));
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&find('#main-navigation').classList.contains('open')){
   closeMenu();find('#menu-toggle').focus();
  }
 });
 const dialog=find('#download-dialog');
 all('[data-download]').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
 find('.dialog-close').addEventListener('click',()=>dialog.close());
 find('#dialog-demo').addEventListener('click',()=>{
  dialog.close();find('#tab-organize').click();find('#organize').focus({preventScroll:true});
 });
 const legacyAnchors={'#demo':'#tour','#features':'#why','#how-it-works':'#how','#questions':'#faq'};
 if(legacyAnchors[location.hash]){
  const target=legacyAnchors[location.hash];history.replaceState(null,'',target);find(target).scrollIntoView();
 }
})();
