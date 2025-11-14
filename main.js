// Simple accessible carousel for the About section
// Contract
// - Looks for .about-media figure with data-images="img1, img2, ..."
// - Left/Right buttons cycle; keyboard arrows work when figure is focused.
// - Updates <img src> and alt. Adds fade transition via CSS class.
(function(){
  const figure = document.querySelector('.about-media');
  if(!figure) return;

  const btnPrev = figure.querySelector('.carousel-btn.left');
  const btnNext = figure.querySelector('.carousel-btn.right');
  const imgEl = figure.querySelector('img');

  const listAttr = (figure.getAttribute('data-images')||'').split(',').map(s=>s.trim()).filter(Boolean);
  // Fallback to existing image if no list
  const images = listAttr.length ? listAttr : [imgEl.getAttribute('src')];
  let index = 0;

  function setImage(i){
    index = (i + images.length) % images.length;
    const nextSrc = images[index];
    // add fade class
    imgEl.classList.add('fade-out');
    const altBase = 'Foto '+(index+1)+' del colegio';
    // after a tick, swap
    setTimeout(()=>{
      imgEl.setAttribute('src', nextSrc);
      imgEl.setAttribute('alt', altBase);
      imgEl.classList.remove('fade-out');
      imgEl.classList.add('fade-in');
      setTimeout(()=>imgEl.classList.remove('fade-in'), 220);
    }, 150);
  }

  function prev(){ setImage(index-1); }
  function next(){ setImage(index+1); }

  btnPrev && btnPrev.addEventListener('click', prev);
  btnNext && btnNext.addEventListener('click', next);

  // Keyboard support
  figure.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if(e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  // Swipe (basic)
  let startX = null;
  figure.addEventListener('pointerdown', e=>{ startX = e.clientX; });
  figure.addEventListener('pointerup', e=>{
    if(startX==null) return; const dx = e.clientX - startX; startX=null;
    if(Math.abs(dx) > 40){ dx>0 ? prev() : next(); }
  });

})();
