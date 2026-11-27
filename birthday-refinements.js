// Extra playful interactions and floating birthday decorations
document.querySelectorAll('.journey-tile').forEach(tile=>tile.addEventListener('click',()=>{
 document.querySelectorAll('.journey-tile').forEach(item=>item.classList.remove('active'));
 tile.classList.add('active');
 const out=document.getElementById('journeyReveal');if(out){out.textContent=tile.dataset.journey+' ♡';out.classList.remove('reveal-pop');requestAnimationFrame(()=>out.classList.add('reveal-pop'));}
}));
document.querySelectorAll('.love-gift').forEach(gift=>gift.addEventListener('click',()=>{
 const out=document.getElementById('giftMessage');if(out)out.textContent=gift.dataset.message;
 gift.classList.add('gift-picked');setTimeout(()=>gift.classList.remove('gift-picked'),700);
 for(let i=0;i<18;i++){const bit=document.createElement('span');bit.className='floating-decor';bit.textContent=['♡','✦','✿','♥'][i%4];bit.style.setProperty('--float-left',(15+Math.random()*70)+'vw');bit.style.setProperty('--float-time',(4+Math.random()*3)+'s');bit.style.setProperty('--float-size',(15+Math.random()*22)+'px');bit.style.setProperty('--float-drift',((Math.random()-.5)*150)+'px');bit.style.setProperty('--float-color',['#9b4564','#d39a70','#f3d4d5'][i%3]);document.body.appendChild(bit);setTimeout(()=>bit.remove(),7500);}
}));
const decorSymbols=['✦','♡','✿','·'];
function sprinkle(){if(document.hidden)return;const bit=document.createElement('span');bit.className='floating-decor';bit.textContent=decorSymbols[Math.floor(Math.random()*decorSymbols.length)];bit.style.setProperty('--float-left',(Math.random()*100)+'vw');bit.style.setProperty('--float-time',(9+Math.random()*6)+'s');bit.style.setProperty('--float-size',(12+Math.random()*17)+'px');bit.style.setProperty('--float-drift',((Math.random()-.5)*100)+'px');bit.style.setProperty('--float-color',['#b36b83','#d4a06e','#f1c8ce'][Math.floor(Math.random()*3)]);document.body.appendChild(bit);setTimeout(()=>bit.remove(),16000);}
setInterval(sprinkle,1800);
