// Make each friendship card a real, keyboard- and touch-friendly photo tile.
const journeyPhotos=['memory2.jpeg','memory6.jpeg','memory8.jpeg'];
document.querySelectorAll('.journey-tile').forEach((tile,index)=>{
 tile.style.setProperty('--tile-image','url("'+journeyPhotos[index]+'")');
 tile.setAttribute('aria-pressed','false');
 tile.addEventListener('click',()=>{
  document.querySelectorAll('.journey-tile').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-pressed','false')});
  tile.classList.add('active');tile.setAttribute('aria-pressed','true');
  const out=document.getElementById('journeyReveal');
  if(out){out.textContent=tile.dataset.journey+' ♡';out.animate([{opacity:.3,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:420});}
 });
});
// Gentle floating hearts, petals and sparkles; pause when the page is hidden.
(()=>{const symbols=['♡','✿','✦','❀','♥'];function floatOne(){if(document.hidden)return;const el=document.createElement('span');el.className='floating-decor';el.textContent=symbols[Math.floor(Math.random()*symbols.length)];el.style.setProperty('--float-left',(Math.random()*100)+'vw');el.style.setProperty('--float-time',(10+Math.random()*7)+'s');el.style.setProperty('--float-size',(14+Math.random()*20)+'px');el.style.setProperty('--float-drift',((Math.random()-.5)*110)+'px');el.style.setProperty('--float-color',['#ffe3e8','#f8c8a9','#fff4cf','#e7b4c6'][Math.floor(Math.random()*4)]);document.body.appendChild(el);setTimeout(()=>el.remove(),18000);}setInterval(floatOne,1500);})();
