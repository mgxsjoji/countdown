
(function(){
  const container = document.getElementById('mgxs-countdown');
  if (!container) return;

  // Adiciona o estilo Tomorrow
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Tomorrow&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // CSS inline
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --main-color: #eeff41;
      --digit-bg: #000;
      --digit-color: #eeff41;
    }
    .flip-clock {
      font-family: 'Tomorrow', sans-serif;
      max-heigth: 100px;
      max-width: 300px;
      margin: auto;
      background: var(--main-color);
      padding: 20px;
      border-radius: 4px;
      text-align: center;
    }
    .flip-clock h2 {
      font-size: 1rem;
      margin-bottom: 10px;
      color: var(--digit-bg);
    }
    .flip-units {
      display: flex;
      justify-content: space-between;
      gap: 5px;
    }
    .unit {
      width: 60px;
      text-align: center;
    }
    .flip {
      perspective: 1000px;
      height: 60px;
      position: relative;
    }
    .card {
      position: relative;
      height: 60px;
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
    }
    .card .top,
    .card .bottom {
      background: var(--digit-bg);
      color: var(--digit-color);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      font-size: 2rem;
      font-weight: bold;
      overflow: hidden;
    }
    .card .top span,
    .card .bottom span {
      transform: scaleY(1.15);
      display: inline-block;
      line-height: 1;
    }
    .card .top {
      top: 0;
      clip-path: inset(0 0 50% 0);
      border-radius: 8px 8px 0 0;
    }
    .card .bottom {
      bottom: 0;
      clip-path: inset(50% 0 0 0);
      border-radius: 0 0 8px 8px;
    }
    .flip-top,
    .flip-bottom {
      background: var(--digit-bg);
      color: var(--digit-color);
      font-size: 2rem;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      backface-visibility: hidden;
      z-index: 2;
      overflow: hidden;
    }
    .flip-top span,
    .flip-bottom span {
      transform: scaleY(1.15);
      line-height: 1;
      display: inline-block;
    }
    .flip-top {
      top: 0;
      transform-origin: bottom;
      clip-path: inset(0 0 50% 0);
      border-radius: 8px 8px 0 0;
    }
    .flip-bottom {
      bottom: 0;
      transform-origin: top;
      transform: rotateX(90deg);
      clip-path: inset(50% 0 0 0);
      border-radius: 0 0 8px 8px;
    }
    .animate .flip-top {
      animation: flipTop 0.3s forwards;
    }
    .animate .flip-bottom {
      animation: flipBottom 0.3s forwards;
    }
    @keyframes flipTop {
      0% { transform: rotateX(0deg); }
      100% { transform: rotateX(-90deg); }
    }
    @keyframes flipBottom {
      0% { transform: rotateX(90deg); }
      100% { transform: rotateX(0deg); }
    }
    .label {
      font-size: 0.75rem;
      margin-top: 4px;
      color: #000;
    }
  `;
  document.head.appendChild(style);

  // HTML
  container.innerHTML = `
    <div class="flip-clock">
      <h2>Unleashing LORE In...</h2>
      <div class="flip-units">
        <div class="unit" id="days">
          <div class="flip">
            <div class="card">
              <div class="top"><span>00</span></div>
              <div class="bottom"><span>00</span></div>
            </div>
          </div>
          <div class="label">days</div>
        </div>
        <div class="unit" id="hours">
          <div class="flip">
            <div class="card">
              <div class="top"><span>00</span></div>
              <div class="bottom"><span>00</span></div>
            </div>
          </div>
          <div class="label">hours</div>
        </div>
        <div class="unit" id="minutes">
          <div class="flip">
            <div class="card">
              <div class="top"><span>00</span></div>
              <div class="bottom"><span>00</span></div>
            </div>
          </div>
          <div class="label">min</div>
        </div>
        <div class="unit" id="seconds">
          <div class="flip">
            <div class="card">
              <div class="top"><span>00</span></div>
              <div class="bottom"><span>00</span></div>
            </div>
          </div>
          <div class="label">sec</div>
        </div>
      </div>
    </div>
  `;

  const deadline = new Date("2025-08-01T00:00:00+01:00").getTime();

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function animateFlip(id, newVal) {
    const unit = document.getElementById(id);
    const top = unit.querySelector('.top span');
    const bottom = unit.querySelector('.bottom span');
    const oldVal = top.textContent;
    if (oldVal === newVal) return;

    const flipTop = document.createElement('div');
    flipTop.className = 'flip-top';
    flipTop.innerHTML = `<span>${oldVal}</span>`;

    const flipBottom = document.createElement('div');
    flipBottom.className = 'flip-bottom';
    flipBottom.innerHTML = `<span>${newVal}</span>`;

    const flip = unit.querySelector('.flip');
    flip.appendChild(flipTop);
    flip.appendChild(flipBottom);

    top.textContent = newVal;

    flip.classList.add('animate');

    setTimeout(() => {
      flip.classList.remove('animate');
      flip.removeChild(flipTop);
      flip.removeChild(flipBottom);
      bottom.textContent = newVal;
    }, 300);
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const dist = deadline - now;

    const d = pad(Math.floor(dist / (1000 * 60 * 60 * 24)));
    const h = pad(Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const m = pad(Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)));
    const s = pad(Math.floor((dist % (1000 * 60)) / 1000));

    animateFlip('days', d);
    animateFlip('hours', h);
    animateFlip('minutes', m);
    animateFlip('seconds', s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
