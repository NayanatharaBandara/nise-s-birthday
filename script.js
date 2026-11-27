const memoryFiles=['memory1.jpeg','memory2.jpeg','memory3.jpeg','memory4.jpeg','memory5.jpeg','memory6.jpeg','memory7.jpeg','memory8.jpeg','memory10.jpeg','memory11.jpeg','memory12.jpeg'];
const niseFiles=['nise1.jpeg','nise2.jpeg','nise3.jpeg','nise4.jpeg','nise5.jpeg'];
// Sweet captions are intentionally warm and personal without assuming what each photo depicts.
const captions=[
  'A little moment, a forever kind of memory ♡',
  'Proof that the simplest days can mean the most.',
  'If happiness had a photograph, it might look like this.',
  'One more reason to be grateful for our little story.',
  'A memory I hope we will laugh about for years.',
  'Some moments deserve their own page in the scrapbook.',
  'A tiny piece of joy, kept safe right here.',
  'The kind of memory that makes you smile all over again.',
  'A beautiful reminder of all the good things.',
  'Not just a photo — a feeling I want to keep.',
  'Here is to many more moments just like this. ♡'
];
const niseCaptions=[
  'The world is a little brighter with you in it. ♡',
  'A lovely face, an even lovelier soul.',
  'Never stop being your wonderfully unique self.',
  'You deserve all the soft, happy things in life.',
  'A little appreciation post for my favourite girl. ✦'
];
const photos=[];let current=0;

function buildCarousel(container, items, kind) {
  const wrap=document.createElement('div');
  wrap.className='photo-carousel '+kind+'-carousel';
  const viewport=document.createElement('div');
  viewport.className='carousel-viewport';
  const track=document.createElement('div');
  track.className='carousel-track';
  viewport.appendChild(track);wrap.appendChild(viewport);
  const captionLine=document.createElement('p');
  captionLine.className='carousel-caption';
  captionLine.setAttribute('aria-live','polite');
  wrap.appendChild(captionLine);

  items.forEach((item,i)=>{
    const slide=document.createElement('article');
    slide.className='carousel-slide '+(kind==='memory'?'memory-card':'nisee-card');
    const img=document.createElement('img');
    img.src=''+item.file;img.alt=item.caption;img.loading=i<2?'eager':'lazy';
    img.addEventListener('click',()=>showPhoto(img.src,item.caption));
    slide.appendChild(img);track.appendChild(slide);
    photos.push({img,caption:item.caption});
  });
  const controls=document.createElement('div');
  controls.className='carousel-controls';
  controls.innerHTML='<button type="button" class="carousel-arrow previous" aria-label="Previous photo">‹</button><div class="carousel-dots"></div><button type="button" class="carousel-arrow next" aria-label="Next photo">›</button>';
  wrap.appendChild(controls);container.replaceWith(wrap);
  let index=0;
  const dots=controls.querySelector('.carousel-dots');
  items.forEach((_,i)=>{const dot=document.createElement('button');dot.type='button';dot.className='carousel-dot'+(i===0?' active':'');dot.setAttribute('aria-label','Show photo '+(i+1));dot.addEventListener('click',()=>go(i,true));dots.appendChild(dot);});
  const dotButtons=[...dots.children];
  function go(next,manual=false){
    index=(next+items.length)%items.length;
    track.style.transform=`translateX(-${index*100}%)`;
    dotButtons.forEach((dot,i)=>dot.classList.toggle('active',i===index));
    captionLine.textContent=items[index].caption;
    wrap.style.setProperty('--carousel-photo', 'url("' + items[index].file + '")');
    if (kind === 'nisee') { const site=document.getElementById('site'); if(site) site.style.setProperty('--story-background','url("' + items[index].file + '")'); }
    if(manual) restart();
  }
  const delay=3600;
  let timer=null;
  function stop(){if(timer){clearInterval(timer);timer=null;}}
  function start(){stop();if(!document.hidden){timer=setInterval(()=>go(index+1),delay);}}
  function restart(){start();}
  controls.querySelector('.previous').addEventListener('click',()=>go(index-1,true));
  controls.querySelector('.next').addEventListener('click',()=>go(index+1,true));
  wrap.addEventListener('mouseenter',stop);wrap.addEventListener('mouseleave',start);
  wrap.addEventListener('focusin',stop);wrap.addEventListener('focusout',()=>setTimeout(start,100));
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  let downX=null;
  viewport.addEventListener('pointerdown',e=>{downX=e.clientX;});
  viewport.addEventListener('pointerup',e=>{if(downX===null)return;const delta=e.clientX-downX;if(Math.abs(delta)>45)go(index+(delta<0?1:-1),true);downX=null;});
  viewport.addEventListener('pointercancel',()=>{downX=null;});
  go(0);start();
  return {go,getIndex:()=>index,count:items.length,wrap};
}
const memoryItems=memoryFiles.map((file,i)=>({file,caption:captions[i]}));
const niseItems=niseFiles.map((file,i)=>({file,caption:niseCaptions[i]}));
const memoryCarousel=buildCarousel(document.getElementById('memoryGrid'),memoryItems,'memory');
const niseCarousel=buildCarousel(document.getElementById('niseeGrid'),niseItems,'nisee');
function showPhoto(src,caption){current=photos.findIndex(p=>p.img.src===src);document.getElementById('largePhoto').src=src;document.getElementById('caption').textContent=caption;document.getElementById('lightbox').classList.remove('hidden')}
function movePhoto(n){current=(current+n+photos.length)%photos.length;document.getElementById('largePhoto').src=photos[current].img.src;document.getElementById('caption').textContent=photos[current].caption}
document.getElementById('close').onclick=()=>document.getElementById('lightbox').classList.add('hidden');document.getElementById('prev').onclick=()=>movePhoto(-1);document.getElementById('next').onclick=()=>movePhoto(1);
document.getElementById('lightbox').onclick=e=>{if(e.target.id==='lightbox')e.currentTarget.classList.add('hidden')};document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('lightbox').classList.add('hidden')});
document.getElementById('open').onclick=()=>{
  const soundtrack=document.getElementById('music'); soundtrack.volume=0.65; soundtrack.play().catch(()=>{});
  const trigger=document.querySelector('.envelope-button');
  trigger.classList.add('opening');
  setTimeout(()=>{
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('site').classList.remove('hidden');
    window.scrollTo({top:0,behavior:"instant"});
    startStoryExperience();
  },950);
};
const birthday=new Date(2026,11,3,0,0,0);function tick(){let d=birthday-new Date();if(d<0){d=0;document.getElementById('countNote').textContent='Today is your day. Happy birthday, Nisee! ♡'}const vals=[Math.floor(d/86400000),Math.floor(d%86400000/3600000),Math.floor(d%3600000/60000),Math.floor(d%60000/1000)];['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(vals[i]).padStart(2,'0'))}tick();setInterval(tick,1000);


// Photo-backed little notes: tap a card to reveal its message over the picture.
const noteBackgrounds = [
  'memory1.jpeg',
  'memory6.jpeg',
  'memory10.jpeg'
];
document.querySelectorAll('.note-card').forEach((card, index) => {
  const photo = document.createElement('img');
  photo.className = 'note-photo';
  photo.src = noteBackgrounds[index];
  photo.alt = 'A favourite memory';
  photo.loading = 'eager';
  photo.addEventListener('error', () => {
    photo.style.display = 'none';
    card.classList.add('note-photo-missing');
  });
  card.prepend(photo);

  card.addEventListener('click', () => {
    const alreadyOpen = card.classList.contains('opened');
    document.querySelectorAll('.note-card').forEach(other => {
      if (other !== card) {
        other.classList.remove('opened');
        const otherReveal = other.querySelector('.note-reveal');
        if (otherReveal) otherReveal.textContent = '';
        const otherSmall = other.querySelector('small');
        if (otherSmall) otherSmall.textContent = 'Tap to reveal';
      }
    });
    card.classList.toggle('opened', !alreadyOpen);
    const reveal = card.querySelector('.note-reveal');
    if (!alreadyOpen) {
      reveal.textContent = card.dataset.note;
      card.querySelector('small').textContent = 'A little note for you';
    } else {
      reveal.textContent = '';
      card.querySelector('small').textContent = 'Tap to reveal';
    }
  });
});

// Let her write a wish and reveal it as a keepsake on the page.
const legacyWishButton = document.getElementById('saveWish');
if (legacyWishButton) legacyWishButton.addEventListener('click', () => {
  const field = document.getElementById('personalWish');
  const output = document.getElementById('savedWish');
  const wish = field.value.trim();
  if (!wish) {
    output.textContent = 'Write a little wish first ♡';
    field.focus();
    return;
  }
  output.textContent = 'A wish just for you: “' + wish + '” ♡';
  try { localStorage.setItem('niseeBirthdayWish', wish); } catch (error) {}
  field.value = '';
});

// Surprise me: jump to one of the memories at random.
const surpriseButton = document.getElementById('surpriseMemory');
if (surpriseButton) {
  surpriseButton.addEventListener('click', () => {
    const picked = Math.floor(Math.random() * memoryCarousel.count);
    memoryCarousel.go(picked);
    memoryCarousel.wrap.animate(
      [{transform:'scale(1)'},{transform:'scale(1.015)'},{transform:'scale(1)'}],
      {duration:500}
    );
  });
}

// Small celebratory confetti burst when the candles are blown out.
function celebrate() {
  const colors = ['#d9aeb5','#f3d9d6','#b28a69','#fff3e8','#762f43'];
  for (let i = 0; i < 42; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetti';
    bit.style.left = (Math.random() * 100) + 'vw';
    bit.style.background = colors[i % colors.length];
    bit.style.setProperty('--drift', ((Math.random() - .5) * 180) + 'px');
    bit.style.animationDelay = (Math.random() * .35) + 's';
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 2600);
  }
}

document.getElementById('blow').onclick=()=>{document.getElementById('flames').classList.add('out');celebrate();document.getElementById('wishNote').textContent='Wish made. May this year be as beautiful as your heart. ♡';document.getElementById('blow').textContent='Your wish is on its way';document.getElementById('blow').disabled=true};


function startStoryExperience() {
  const site=document.getElementById('site'), header=site.querySelector(':scope > header');
  const original=[...site.children].filter(node=>node!==header&&!node.classList.contains('reading-progress'));
  const pick=id=>original.find(node=>node.id===id||(id==='count'&&node.classList.contains('count'))||(id==='nisee'&&node.classList.contains('nisee'))||(id==='wish-box-section'&&node.classList.contains('wish-box-section')));
  const groups=[['home','count'],['letter'],['journey','little-question'],['memories'],['nisee'],['surprises'],['wish']];
  const names=['The beginning','A letter for you','Our friendship','Our memories','A little spotlight','Little surprises','Make a wish'];
  const pages=groups.map((ids,index)=>{const page=document.createElement('section');page.className='story-page';page.setAttribute('aria-label',names[index]);ids.forEach(id=>{const el=pick(id);if(el)page.appendChild(el);});if(index===6){const foot=original.find(n=>n.tagName==='FOOTER');if(foot)page.appendChild(foot);}site.appendChild(page);return page;});
  const controls=document.createElement('div');controls.className='page-controls';controls.innerHTML='<button type="button" class="story-prev">← Previous</button><span class="page-progress"><b>01</b> / 07</span><button type="button" class="story-next">Next chapter →</button>';site.appendChild(controls);
  let active=0;const links=[...header.querySelectorAll('nav a')],targets=['letter','journey','memories','surprises','wish'];
  function showPage(index,hash=true){active=Math.max(0,Math.min(6,index));pages.forEach((p,i)=>{p.classList.toggle('active',i===active);p.setAttribute('aria-hidden',i===active?'false':'true');});
    controls.querySelector('.page-progress').innerHTML='<b>'+String(active+1).padStart(2,'0')+'</b> / 07';
    controls.querySelector('.story-prev').disabled=active===0;controls.querySelector('.story-next').disabled=active===6;controls.querySelector('.story-next').textContent=active===6?'The end ♡':'Next chapter →';
    links.forEach((link,i)=>link.classList.toggle('active',groups[active].includes(targets[i])));
    const bar=document.getElementById('readingProgress');if(bar)bar.style.width=((active+1)/7*100)+'%';
    if(hash)history.replaceState(null,'','#'+groups[active][0]);window.scrollTo({top:0,behavior:'smooth'});pages[active].classList.remove('page-arrive');requestAnimationFrame(()=>pages[active].classList.add('page-arrive'));}
  controls.querySelector('.story-prev').addEventListener('click',()=>showPage(active-1));controls.querySelector('.story-next').addEventListener('click',()=>showPage(active+1));
  links.forEach((link,i)=>link.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const page=groups.findIndex(group=>group.includes(targets[i]));if(page>=0)showPage(page);}));
  const brand=header.querySelector('.brand');if(brand)brand.addEventListener('click',event=>{event.preventDefault();showPage(0);});
  const start=site.querySelector('.underlink');if(start)start.addEventListener('click',event=>{event.preventDefault();showPage(1);});showPage(0,false);
}
const openingMusic=document.getElementById('music');if(openingMusic){openingMusic.volume=0.65;const playOnLoad=()=>openingMusic.play().catch(()=>{});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',playOnLoad,{once:true});else playOnLoad();}
document.querySelectorAll('.prompt-options button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.prompt-options button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  const answer = document.getElementById('promptAnswer');
  answer.textContent = button.dataset.answer;
  answer.classList.remove('answer-pop'); requestAnimationFrame(() => answer.classList.add('answer-pop'));
}));
const wishField = document.getElementById('personalWish');
const wishOutput = document.getElementById('savedWish');
try { const saved = localStorage.getItem('niseeBirthdayWish'); if (saved && wishOutput) wishOutput.textContent = 'A wish just for you: “' + saved + '” ♡'; } catch (error) {}
document.addEventListener('keydown', event => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('hidden')) {
    if (event.key === 'ArrowRight') movePhoto(1);
    if (event.key === 'ArrowLeft') movePhoto(-1);
  }
});
