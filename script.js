const pages=[...document.querySelectorAll('.page')];
let current=0,busy=false,heartsDone=false;
function go(n){
 if(busy||n<1||n>pages.length||n===current+1)return;
 busy=true;
 pages[current].classList.remove('active');
 pages[current].setAttribute('aria-hidden','true');
 current=n-1;
 pages[current].classList.add('active');
 pages[current].setAttribute('aria-hidden','false');
 window.scrollTo({top:0,behavior:'smooth'});
 setTimeout(()=>busy=false,650);
}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.next)));

function heartBurst(){
 if(heartsDone)return; heartsDone=true;
 const layer=document.getElementById('heart-layer');
 for(let i=0;i<12;i++){
   const h=document.createElement('span');
   h.textContent='♥';
   h.style.position='absolute';
   h.style.left=(20+Math.random()*60)+'%';
   h.style.top=(72+Math.random()*17)+'%';
   h.style.fontSize=(12+Math.random()*14)+'px';
   h.style.color=['#9c1940','#c73561','#ef8fa9'][i%3];
   h.style.opacity='0';
   h.style.animation=`floatHeart ${2.1+Math.random()*1.1}s ease-out forwards`;
   h.style.setProperty('--dx',(-90+Math.random()*180)+'px');
   layer.appendChild(h);
   setTimeout(()=>h.remove(),3400);
 }
}
const st=document.createElement('style');
st.textContent=`@keyframes floatHeart{0%{opacity:0;transform:translate(-50%,20px) scale(.4)}15%{opacity:.9}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),-170px) scale(1) rotate(25deg)}}`;
document.head.appendChild(st);
window.addEventListener('load',()=>setTimeout(heartBurst,700));
