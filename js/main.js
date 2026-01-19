(function(){
  const carousel = document.querySelector('.carousel');
  if(!carousel) return;
  const track = carousel.querySelector('.track');
  const speed = parseFloat(carousel.dataset.speed || '60'); // px per second

  const ensureClones = () => {
    const containerWidth = carousel.clientWidth;
    let w = 0;
    track.querySelectorAll('.tile').forEach(el => w += el.getBoundingClientRect().width + 18);
    while(w < containerWidth * 3){
      track.innerHTML += track.innerHTML;
      w *= 2;
    }
  };
  ensureClones();
  window.addEventListener('resize', ensureClones);

  let x = 0;
  let last = performance.now();
  function step(now){
    const dt = (now - last)/1000; last = now;
    x -= speed * dt;
    const first = track.children[0];
    const firstWidth = first.getBoundingClientRect().width + 18;
    if(Math.abs(x) > firstWidth){
      track.appendChild(first);
      x += firstWidth;
    }
    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();