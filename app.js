const menu=document.getElementById('menu'),box=document.getElementById('conteudo'),placar=document.getElementById('placar');
const acertos={};let atual=0;
function abrir(i){
  atual=i;const t=TOPICOS[i];
  [...menu.children].forEach((b,j)=>b.classList.toggle('on',j===i));
  let h=`<h2>${t.titulo}</h2><h3>1. Explicação</h3><div class="teoria">${t.teoria}</div><h3>2. Exercícios</h3>`;
  t.questoes.forEach((q,k)=>{
    h+=`<div class="q" id="q${k}"><p>${k+1}) ${q.p}</p>`+q.o.map((o,m)=>`<label><input type="radio" name="q${k}" value="${m}"> ${o}</label>`).join('')+`<div class="exp"></div></div>`;
  });
  h+=`<div class="acoes"><button id="zerar">Refazer este tópico</button></div>`;
  box.innerHTML=h;window.scrollTo(0,0);
  box.querySelectorAll('.q').forEach((el,k)=>el.addEventListener('change',e=>responder(el,k,+e.target.value)));
  document.getElementById('zerar').onclick=()=>{delete acertos[i];abrir(i);atualizar()};
  const reg=acertos[i]||{};
  Object.keys(reg).forEach(k=>responder(box.querySelector('#q'+k),+k,reg[k],true));
}
function responder(el,k,v,restaurar){
  if(el.classList.contains('feito'))return;
  const q=TOPICOS[atual].questoes[k];
  el.classList.add('feito');
  el.querySelectorAll('input').forEach(i=>i.disabled=true);
  const ls=el.querySelectorAll('label');
  ls[q.c].classList.add('certa');
  if(v!==q.c)ls[v].classList.add('errada');
  ls[v].querySelector('input').checked=true;
  el.querySelector('.exp').innerHTML=(v===q.c?'<b>Correto!</b> ':'<b>Resposta certa: '+'ABCD'[q.c]+'.</b> ')+q.e;
  if(!restaurar){(acertos[atual]=acertos[atual]||{})[k]=v;atualizar()}
}
function atualizar(){
  let ok=0,tot=0,fe=0;
  TOPICOS.forEach((t,i)=>{
    const r=acertos[i]||{};let a=0;
    Object.keys(r).forEach(k=>{if(r[k]===t.questoes[k].c)a++});
    ok+=a;fe+=Object.keys(r).length;tot+=t.questoes.length;
    menu.children[i].querySelector('.n').textContent=a+'/'+t.questoes.length;
  });
  placar.textContent=`Acertos: ${ok} de ${fe} respondidas (${tot} no total)`;
}
TOPICOS.forEach((t,i)=>{const b=document.createElement('button');b.innerHTML=`${t.nome}<span class="n"></span>`;b.onclick=()=>{abrir(i)};menu.appendChild(b)});
abrir(0);atualizar();
