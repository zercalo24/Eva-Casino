/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           GamblerExpert.com — Единый скрипт сайта           ║
 * ║                                                              ║
 * ║  Содержит 4 модуля:                                          ║
 * ║  1. Копирование промокода RUBLIK                             ║
 * ║  2. Аккордеон FAQ                                            ║
 * ║  3. Панель сравнения казино                                  ║
 * ║  4. Поиск и фильтрация таблицы                              ║
 * ║                                                              ║
 * ║  HTML-требования описаны перед каждым модулем.              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────
// ИНИЦИАЛИЗАЦИЯ — запускаем всё после загрузки DOM
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPromo();
  initFAQ();
  initFilterSearch();
});


/* ═══════════════════════════════════════════════════════════════
   МОДУЛЬ 1: ПРОМОКОД
   ═══════════════════════════════════════════════════════════════
   Нужные HTML-элементы:

   Кнопка копирования:
     <button class="copy-promo">RUBLIK</button>
     — или любой тег с классом .copy-promo

   Тост-уведомление (добавляется автоматически, но можно прописать вручную):
     <div id="promo-toast"></div>

   ─────────────────────────────────────────────────────────────
   Атрибуты:
   • data-promo="RUBLIK"  — по умолчанию "RUBLIK", можно переопределить
   ═══════════════════════════════════════════════════════════════ */

function initPromo() {
  // Создаём тост если его ещё нет в DOM
  let toast = document.getElementById('promo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'promo-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  // Инжектируем стили тоста
  injectStyle('promo-toast-style', `
    #promo-toast {
      position: fixed;
      bottom: 28px;
      right: 20px;
      background: #27ae60;
      color: #fff;
      padding: 12px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 6px 24px rgba(39,174,96,.45);
      z-index: 9999;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity .3s ease, transform .3s ease;
      pointer-events: none;
      user-select: none;
    }
    #promo-toast.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `);

  // Таймер для автоскрытия
  let hideTimer = null;

  /**
   * Показываем тост с текстом
   * @param {string} message
   */
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
  }

  /**
   * Копируем текст в буфер обмена
   * @param {string} text
   */
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => showToast('✓ Промокод ' + text + ' скопирован!'))
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  // Запасной метод для http / старых браузеров
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast('✓ Промокод ' + text + ' скопирован!');
    } catch {
      showToast('Скопируйте вручную: ' + text);
    }
    document.body.removeChild(ta);
  }

  // Навешиваем обработчики на все .copy-promo
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-promo');
    if (!btn) return;
    const code = btn.dataset.promo || btn.textContent.trim() || 'RUBLIK';
    copyToClipboard(code);
  });
}


/* ═══════════════════════════════════════════════════════════════
   МОДУЛЬ 2: АККОРДЕОН FAQ
   ═══════════════════════════════════════════════════════════════
   Нужная HTML-структура:

   <div class="faq-list">

     <div class="faq-item">
       <button class="faq-question" aria-expanded="false">
         Что такое вейджер?
         <span class="faq-sign" aria-hidden="true">+</span>
       </button>
       <div class="faq-answer" hidden>
         <div class="faq-answer-inner">
           Здесь текст ответа...
         </div>
       </div>
     </div>

     <!-- Ещё .faq-item ... -->

   </div>

   ─────────────────────────────────────────────────────────────
   Атрибуты:
   • aria-expanded="false/true" — ставится автоматически
   • hidden — у .faq-answer по умолчанию
   ═══════════════════════════════════════════════════════════════ */

function initFAQ() {
  injectStyle('faq-style', `
    .faq-item { border: 1.5px solid #e0e0e0; border-radius: 9px; margin-bottom: 10px; overflow: hidden; }

    .faq-question {
      width: 100%;
      padding: 15px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      background: #fff;
      border: none;
      cursor: pointer;
      font-size: 15px;
      font-weight: 700;
      color: #1a1a2e;
      text-align: left;
      transition: background .15s;
      min-height: 52px;
    }
    .faq-question:hover { background: #fafafa; }
    .faq-question:focus-visible {
      outline: 2px solid #e02020;
      outline-offset: -2px;
    }

    .faq-sign {
      font-size: 22px;
      color: #e02020;
      flex-shrink: 0;
      line-height: 1;
      transition: transform .25s ease;
      display: inline-block;
    }
    .faq-item.open .faq-sign { transform: rotate(45deg); }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height .35s ease;
      background: #fff;
    }
    /* hidden убираем через JS, анимация через max-height */
    .faq-answer-inner {
      padding: 0 18px 16px;
      font-size: 14px;
      color: #555;
      line-height: 1.75;
    }
    .faq-answer-inner a { color: #e02020; }
  `);

  // Закрываем все элементы — устанавливаем начальное состояние
  document.querySelectorAll('.faq-item').forEach(item => {
    const answer = item.querySelector('.faq-answer');
    const btn    = item.querySelector('.faq-question');
    if (!answer || !btn) return;

    // Убираем атрибут hidden — управляем видимостью через max-height
    answer.removeAttribute('hidden');
    answer.style.maxHeight = '0';
    btn.setAttribute('aria-expanded', 'false');
    item.classList.remove('open');

    // Добавляем знак если его нет
    if (!item.querySelector('.faq-sign')) {
      const sign = document.createElement('span');
      sign.className = 'faq-sign';
      sign.setAttribute('aria-hidden', 'true');
      sign.textContent = '+';
      btn.appendChild(sign);
    }
  });

  // Единый делегированный обработчик на .faq-list
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;

    const item   = btn.closest('.faq-item');
    const answer = item && item.querySelector('.faq-answer');
    if (!item || !answer) return;

    const isOpen = item.classList.contains('open');

    // Закрываем все открытые внутри того же .faq-list
    const list = item.closest('.faq-list');
    if (list) {
      list.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem === item) return;
        closeItem(openItem);
      });
    }

    // Переключаем текущий
    isOpen ? closeItem(item) : openItem(item);
  });

  // Keyboard: Enter / Space
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const btn = e.target.closest('.faq-question');
    if (!btn) return;
    e.preventDefault();
    btn.click();
  });

  function openItem(item) {
    const answer = item.querySelector('.faq-answer');
    const btn    = item.querySelector('.faq-question');
    const inner  = answer.querySelector('.faq-answer-inner');
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    // Устанавливаем max-height = высота внутреннего контента
    answer.style.maxHeight = (inner ? inner.scrollHeight : 500) + 'px';
  }

  function closeItem(item) {
    const answer = item.querySelector('.faq-answer');
    const btn    = item.querySelector('.faq-question');
    item.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = '0';
  }
}






/* ═══════════════════════════════════════════════════════════════
   МОДУЛЬ 4: ПОИСК И ФИЛЬТРАЦИЯ ТАБЛИЦЫ
   ═══════════════════════════════════════════════════════════════
   Нужная HTML-структура таблицы:

   <!-- Контейнер фильтров — будет создан автоматически перед таблицей -->
   <!-- Или вручную: -->
   <div id="casino-filter-bar"></div>

   <!-- Таблица / список казино -->
   <div id="casino-table">

     <!-- Строка казино. Атрибуты для фильтрации: -->
     <div class="ct-row"
          data-name="vavada casino"
          data-bonus-type="freespins"
          data-rating="5">
       ...
     </div>

     <!-- Ещё строки ... -->

   </div>

   <!-- Счётчик результатов -->
   <div id="results-count">Показано <strong>41</strong> из <strong>41</strong> казино</div>

   ─────────────────────────────────────────────────────────────
   Атрибуты строки:
   • data-name="..."          — название казино в нижнем регистре для поиска
   • data-bonus-type="..."    — тип бонуса: freespins | cashback | crypto | all
   • data-rating="5"          — число звёзд (5, 4, 3 и т.д.)
   • data-tags="hot freespins cashback crypto" — тэги через пробел (запасной вариант)
   ═══════════════════════════════════════════════════════════════ */

function initFilterSearch() {
  const tableContainer = document.getElementById('casino-table');
  if (!tableContainer) return;

  // Находим все строки казино
  const rows = Array.from(tableContainer.querySelectorAll(
    '.ct-row, .cm-card, [data-casino-id]'
  )).filter(r => r.dataset.name || r.dataset.casinoId);

  if (rows.length === 0) return;

  // Создаём бар фильтров
  const bar = buildFilterBar(tableContainer);

  // Создаём / находим счётчик
  let counter = document.getElementById('results-count');
  if (!counter) {
    counter = document.createElement('div');
    counter.id = 'results-count';
    counter.className = 'filter-counter';
    tableContainer.parentNode.insertBefore(counter, tableContainer);
  }

  // Состояние фильтров
  let state = { query: '', bonus: 'all', rating: 'all' };

  injectStyle('filter-style', `
    #casino-filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      padding: 14px 16px;
      background: #fff;
      border-bottom: 1px solid #e0e0e0;
    }

    .filter-search {
      flex: 1;
      min-width: 180px;
      padding: 10px 14px;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      color: #1a1a2e;
      outline: none;
      transition: border-color .2s;
      background: #fafafa;
      min-height: 44px;
    }
    .filter-search:focus { border-color: #e02020; background: #fff; }
    .filter-search::placeholder { color: #aaa; }

    .filter-select {
      padding: 10px 14px;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      color: #1a1a2e;
      background: #fafafa;
      outline: none;
      cursor: pointer;
      transition: border-color .2s;
      min-height: 44px;
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 32px;
    }
    .filter-select:focus { border-color: #e02020; }

    .filter-counter {
      padding: 8px 16px;
      font-size: 13px;
      color: #666;
    }
    .filter-counter strong { color: #1a1a2e; }

    .filter-no-results {
      text-align: center;
      padding: 36px 20px;
      font-size: 15px;
      color: #aaa;
      display: none;
    }
    .filter-no-results.visible { display: block; }

    .ct-row.hidden,
    .cm-card.hidden,
    [data-casino-id].hidden { display: none !important; }
  `);

  // Находим / создаём "нет результатов"
  let noResults = tableContainer.querySelector('.filter-no-results');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.className = 'filter-no-results';
    noResults.textContent = '🔍 Казино не найдены. Попробуйте изменить фильтры.';
    tableContainer.appendChild(noResults);
  }

  // ── Применяем фильтры ───────────────────────────────────────
  function applyFilters() {
    const q      = state.query.toLowerCase().trim();
    const bonus  = state.bonus;
    const rating = state.rating;

    let visible = 0;

    rows.forEach(row => {
      // Имя казино для поиска
      const name = (
        row.dataset.name ||
        row.dataset.casinoName ||
        row.querySelector('.ct-name, .cm-name, .card-name')?.textContent || ''
      ).toLowerCase();

      // Тип бонуса
      const bonusType = (
        row.dataset.bonusType ||
        row.dataset.tags || ''
      ).toLowerCase();

      // Рейтинг
      const rowRating = parseInt(row.dataset.rating || row.dataset.stars || '0', 10);

      // Совпадение поиска
      const matchQ = !q || name.includes(q);

      // Совпадение бонуса
      let matchBonus = bonus === 'all';
      if (!matchBonus) {
        if (bonus === 'freespins') matchBonus = bonusType.includes('freespins') || bonusType.includes('fs');
        if (bonus === 'cashback')  matchBonus = bonusType.includes('cashback') || bonusType.includes('cash');
        if (bonus === 'crypto')    matchBonus = bonusType.includes('crypto') || bonusType.includes('crip');
      }

      // Совпадение рейтинга
      let matchRating = rating === 'all';
      if (!matchRating) {
        const r = parseInt(rating, 10);
        matchRating = rowRating === r;
      }

      const show = matchQ && matchBonus && matchRating;
      row.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    // Счётчик
    counter.innerHTML = `Показано <strong>${visible}</strong> из <strong>${rows.length}</strong> казино`;

    // "Нет результатов"
    noResults.classList.toggle('visible', visible === 0);
  }

  // ── Строим панель фильтров ──────────────────────────────────
  function buildFilterBar(table) {
    let barContainer = document.getElementById('casino-filter-bar');
    if (!barContainer) {
      barContainer = document.createElement('div');
      barContainer.id = 'casino-filter-bar';
      table.parentNode.insertBefore(barContainer, table);
    }
    barContainer.innerHTML = '';

    // Поиск
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'filter-search';
    searchInput.placeholder = '🔍 Поиск по названию казино...';
    searchInput.setAttribute('aria-label', 'Поиск по названию казино');

    // Выпадающий список бонусов
    const bonusSelect = document.createElement('select');
    bonusSelect.className = 'filter-select';
    bonusSelect.setAttribute('aria-label', 'Фильтр по типу бонуса');
    [
      { value: 'all',       label: '🎁 Все бонусы' },
      { value: 'freespins', label: '🎡 С фриспинами' },
      { value: 'cashback',  label: '💵 С кэшбэком' },
      { value: 'crypto',    label: '₿ Крипто-бонус' },
    ].forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.label;
      bonusSelect.appendChild(o);
    });

    // Выпадающий список рейтинга
    const ratingSelect = document.createElement('select');
    ratingSelect.className = 'filter-select';
    ratingSelect.setAttribute('aria-label', 'Фильтр по рейтингу');
    [
      { value: 'all', label: '⭐ Все рейтинги' },
      { value: '5',   label: '★★★★★ 5 звёзд' },
      { value: '4',   label: '★★★★☆ 4 звезды' },
      { value: '3',   label: '★★★☆☆ 3 звезды' },
    ].forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.label;
      ratingSelect.appendChild(o);
    });

    // Обработчики изменений
    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      // Дебаунс 200мс — не фильтруем при каждом нажатии
      searchTimer = setTimeout(() => {
        state.query = searchInput.value;
        applyFilters();
      }, 200);
    });

    bonusSelect.addEventListener('change', () => {
      state.bonus = bonusSelect.value;
      applyFilters();
    });

    ratingSelect.addEventListener('change', () => {
      state.rating = ratingSelect.value;
      applyFilters();
    });

    barContainer.appendChild(searchInput);
    barContainer.appendChild(bonusSelect);
    barContainer.appendChild(ratingSelect);

    return barContainer;
  }

  // Первый рендер
  applyFilters();
}


/* ═══════════════════════════════════════════════════════════════
   УТИЛИТЫ
   ═══════════════════════════════════════════════════════════════ */

/**
 * Инжектируем CSS-стили один раз по id
 * @param {string} id
 * @param {string} css
 */
function injectStyle(id, css) {
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Экранируем HTML для безопасной вставки
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
