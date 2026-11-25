const stage = document.querySelector('#stage');
const chapter = document.querySelector('#chapter');
const jump = document.querySelector('#jump');
const page = document.querySelector('#page');
const progress = document.querySelector('#progress');
const previous = document.querySelector('#prev');
const next = document.querySelector('#next');
const fullscreen = document.querySelector('#fullscreen');
const figureDialog = document.querySelector('#figure-dialog');
let current = 0;
let toolChoice = 'Excel';
let confidence = '50';

chapters.forEach(({ label, start }) => jump.add(new Option(label, start)));
progress.max = slides.length;

function render() {
  const requested = Number(location.hash.slice(1));
  current = Number.isInteger(requested) && requested >= 1 && requested <= slides.length
    ? requested - 1 : 0;
  const section = chapters.findLast(({ start }) => start <= current + 1);
  const { title, body, kind = '' } = slides[current];
  chapter.textContent = section.label;
  jump.value = section.start;
  stage.innerHTML = '<article><div class="eyebrow"></div><h1 id="slide-title"></h1><div class="body"></div></article>';
  stage.firstElementChild.className = kind;
  stage.querySelector('.eyebrow').textContent = section.label;
  stage.querySelector('h1').textContent = title;
  stage.querySelector('.body').innerHTML = body;
  page.value = `${current + 1} / ${slides.length}`;
  progress.value = current + 1;
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  if (previous.disabled && document.activeElement === previous) next.focus();
  if (next.disabled && document.activeElement === next) previous.focus();
  stage.scrollTop = 0;
  document.title = `${title}｜P148 M001`;

  const range = stage.querySelector('#confidence');
  if (range) {
    const tool = stage.querySelector('#tool-choice');
    const value = stage.querySelector('#confidence-value');
    tool.value = toolChoice;
    range.value = confidence;
    value.value = `${confidence}%`;
    tool.addEventListener('change', () => { toolChoice = tool.value; });
    range.addEventListener('input', () => {
      confidence = range.value;
      value.value = `${confidence}%`;
    });
  }
}

function go(number) {
  if (number >= 1 && number <= slides.length && number !== current + 1) {
    location.hash = String(number);
  }
}

previous.addEventListener('click', () => go(current));
next.addEventListener('click', () => go(current + 2));
jump.addEventListener('change', () => go(Number(jump.value)));
window.addEventListener('hashchange', render);
document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || figureDialog.open ||
      event.target.closest('a, button, input, select, summary, textarea, [contenteditable]')) return;
  const targets = { ArrowLeft: current, ArrowRight: current + 2, PageUp: current, PageDown: current + 2,
    ' ': current + (event.shiftKey ? 0 : 2), Home: 1, End: slides.length };
  if (Object.hasOwn(targets, event.key)) {
    event.preventDefault();
    go(targets[event.key]);
  }
});
fullscreen.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    fullscreen.textContent = '請使用瀏覽器全螢幕';
  }
});
fullscreen.hidden = !document.fullscreenEnabled;
document.addEventListener('fullscreenchange', () => {
  fullscreen.textContent = document.fullscreenElement ? '離開全螢幕' : '全螢幕';
});

stage.addEventListener('click', async (event) => {
  const figure = event.target.closest('.figure-button');
  if (figure) {
    const image = figure.querySelector('img');
    const enlarged = figureDialog.querySelector('img');
    enlarged.src = image.src;
    enlarged.alt = image.alt;
    figureDialog.showModal();
  }
  const copy = event.target.closest('.copy');
  if (copy) {
    const example = copy.closest('details').querySelector('pre');
    try {
      await navigator.clipboard.writeText(example.textContent);
      copy.textContent = '已複製';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(example);
      selection.removeAllRanges();
      selection.addRange(range);
      copy.textContent = '已選取，請使用複製快捷鍵';
    }
  }
});
render();
