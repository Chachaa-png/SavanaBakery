document.addEventListener('DOMContentLoaded', function() {
  function createWave(e, btn) {
    const wave = document.createElement('span');
    wave.className = 'wave-span';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    wave.style.width = wave.style.height = size + 'px';
    wave.style.left = (e.clientX - rect.left - size/2) + 'px';
    wave.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  }
  document.querySelectorAll('.cta-btn, .shop-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      createWave(e, btn);
    });
  });
}); 