/* ══════════════════════════════════════════════════════════════
   Magnolia — Selector de estilo de botones (Tweak)
   - Forma: pill / soft / sharp (border-radius)
   - Color: flat / 4 degradados dorados
   Persiste en localStorage; aplica al <body>
   ══════════════════════════════════════════════════════════════ */
(function(){
  const SHAPE_KEY = 'magnolia-btn-theme';
  const GRAD_KEY = 'magnolia-btn-grad';
  const COLLAPSE_KEY = SHAPE_KEY + '-collapsed';

  // Inyectar panel HTML al final del body
  const panel = document.createElement('div');
  panel.className = 'btn-theme-picker';
  panel.id = 'btnThemePicker';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Estilo de botones');
  panel.innerHTML = `
    <div class="btn-theme-picker-head">
      <span>Estilo botones</span>
      <button class="btn-theme-picker-toggle" id="btnThemeToggle" aria-label="Colapsar/expandir">−</button>
    </div>
    <div class="btn-grad-section-label">Forma</div>
    <div class="btn-theme-options">
      <button class="btn-theme-opt" data-theme="pill">
        <span class="btn-theme-opt-swatch"></span><span>Pill</span>
      </button>
      <button class="btn-theme-opt" data-theme="soft">
        <span class="btn-theme-opt-swatch"></span><span>Soft</span>
      </button>
      <button class="btn-theme-opt" data-theme="sharp">
        <span class="btn-theme-opt-swatch"></span><span>Sharp</span>
      </button>
    </div>
    <div class="btn-grad-options">
      <div class="btn-grad-section-label">Color dorado</div>
      <button class="btn-grad-opt" data-grad="flat">
        <span class="btn-grad-opt-swatch"></span><span>Plano</span>
      </button>
      <button class="btn-grad-opt" data-grad="grad-1">
        <span class="btn-grad-opt-swatch"></span><span>Champagne</span>
      </button>
      <button class="btn-grad-opt" data-grad="grad-2">
        <span class="btn-grad-opt-swatch"></span><span>Royal Gold</span>
      </button>
      <button class="btn-grad-opt" data-grad="grad-3">
        <span class="btn-grad-opt-swatch"></span><span>Sunrise Rose</span>
      </button>
      <button class="btn-grad-opt" data-grad="grad-4">
        <span class="btn-grad-opt-swatch"></span><span>Bronze</span>
      </button>
    </div>
  `;
  document.body.appendChild(panel);

  const shapeOpts = panel.querySelectorAll('.btn-theme-opt');
  const gradOpts = panel.querySelectorAll('.btn-grad-opt');
  const toggle = panel.querySelector('#btnThemeToggle');
  const body = document.body;

  function applyShape(theme){
    body.classList.remove('btn-theme-pill','btn-theme-soft','btn-theme-sharp');
    body.classList.add('btn-theme-' + theme);
    shapeOpts.forEach(o => o.classList.toggle('active', o.dataset.theme === theme));
    try{ localStorage.setItem(SHAPE_KEY, theme); }catch(e){}
  }

  function applyGrad(grad){
    body.classList.remove('btn-grad-flat','btn-grad-1','btn-grad-2','btn-grad-3','btn-grad-4');
    body.classList.add('btn-grad-' + (grad === 'flat' ? 'flat' : grad.replace('grad-','').padStart(0,'')));
    // Limpieza explícita: data-grad value matches className suffix
    body.classList.remove('btn-grad-flat','btn-grad-1','btn-grad-2','btn-grad-3','btn-grad-4');
    if(grad === 'flat') body.classList.add('btn-grad-flat');
    else body.classList.add('btn-' + grad);
    gradOpts.forEach(o => o.classList.toggle('active', o.dataset.grad === grad));
    try{ localStorage.setItem(GRAD_KEY, grad); }catch(e){}
  }

  // Cargar estado guardado
  let savedShape = 'soft';
  let savedGrad = 'grad-2';
  try{
    savedShape = localStorage.getItem(SHAPE_KEY) || 'soft';
    savedGrad = localStorage.getItem(GRAD_KEY) || 'grad-2';
  }catch(e){}
  applyShape(savedShape);
  applyGrad(savedGrad);

  shapeOpts.forEach(o => o.addEventListener('click', () => applyShape(o.dataset.theme)));
  gradOpts.forEach(o => o.addEventListener('click', () => applyGrad(o.dataset.grad)));

  // Toggle colapsar
  let collapsed = false;
  try{ collapsed = localStorage.getItem(COLLAPSE_KEY) === '1'; }catch(e){}
  if(collapsed) panel.classList.add('collapsed');
  toggle.textContent = collapsed ? '+' : '−';
  toggle.addEventListener('click', () => {
    collapsed = !collapsed;
    panel.classList.toggle('collapsed', collapsed);
    toggle.textContent = collapsed ? '+' : '−';
    try{ localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0'); }catch(e){}
  });
})();
