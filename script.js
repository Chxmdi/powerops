// Run-trace ticker — cycles through the real lifecycle states. Illustrative, labeled as such.
(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var el = document.getElementById('traceLine');
  if(!el || reduced) return;
  var frames = [
    { t:'t+00.0s', m:'run_0142 · genset_2 fuel-flow anomaly',        s:'PROPOSED',          ok:false },
    { t:'t+00.2s', m:'run_0142 · plan written · queued for operator', s:'PENDING_APPROVAL',  ok:false },
    { t:'t+41.8s', m:'run_0142 · operator closed the gate',           s:'APPROVED',          ok:false },
    { t:'t+42.1s', m:'run_0142 · dispatch recorded, command sent',    s:'EXECUTING',         ok:false },
    { t:'t+47.6s', m:'run_0142 · device state read back — matches',   s:'VERIFIED ✓',        ok:true  }
  ];
  var i = 0;
  setInterval(function(){
    el.classList.add('fade');
    setTimeout(function(){
      i = (i + 1) % frames.length;
      var f = frames[i];
      el.innerHTML =
        '<span class="t">' + f.t + '</span>' +
        '<span>' + f.m + '</span>' +
        '<span class="state' + (f.ok ? ' ok' : '') + '">' + f.s + '</span>';
      el.classList.remove('fade');
    }, 350);
  }, 2600);
})();

// Reveal on scroll
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function(e){ io.observe(e); });
})();