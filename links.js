/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         GAMBLEREXPERT.COM — ЦЕНТРАЛЬНЫЙ КОНФИГ          ║
 * ║                                                          ║
 * ║  Все партнёрские ссылки хранятся ТОЛЬКО здесь.          ║
 * ║  При блокировке РКН — меняйте ссылку в этом файле.      ║
 * ║  Все страницы сайта обновятся автоматически.            ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * КАК ОБНОВИТЬ ССЫЛКУ:
 * 1. Найдите нужное казино по названию
 * 2. Замените URL внутри кавычек на новый
 * 3. Сохраните файл и загрузите на GitHub
 * 4. Готово — все страницы обновились!
 *
 * Последнее обновление: июль 2026
 */

const CASINO_LINKS = {

  // ── ТОП КАЗИНО ──────────────────────────────────────────
  "EVA CASINO":       "https://string-26eva.com/dxntblcsp",
  "VAVADA CASINO":    "https://vvvcasinovada.com/?promo=d9d43ea1-0cd0-4dd8-9a86-28d352183bfe&target=register",
  "1WIN CASINO":      "https://one-vv893.com/?p=sxqe",
  "STAKE CASINO":     "http://stake1036.com/?c=BoDMIqL9",
  "DUEL CASINO":      "https://duel.com/r/RUBLIK",
  "КУШ CASINO":       "https://neo7-cr9t-ksh.com/d6855ad6c",

  // ── КАЗИНО А-Ж ──────────────────────────────────────────
  "1GO CASINO":       "https://onegoway66.com/ce3ee979d",
  "ARKADA CASINO":    "https://fascinating-driveway.com/svd9sjada",
  "AUF CASINO":       "https://au-wave.com/dllhvqlgm",
  "BANDA CASINO":     "https://b4nd4-balncr.com/dbedbe390",
  "BEEF CASINO":      "https://beefway69.com/c2197b5c3",
  "CACTUS CASINO":    "https://lavistaenriqueta.xyz/affiliate/c_6igxrnku",
  "CASINO X":         "https://21631.gameshere.xyz/ru/registration?partner=p21631p3327310pdde5",
  "CAT CASINO":       "https://cosmic-propel.com/sbrl3ljkm",
  "CHAMPION SLOTS":   "https://cass-championslots.bet/go/mKq?p75341p311673pe420",
  "CRYPTOBOSS":       "https://cb-flow.com/dvzolc1ss",
  "DADDY CASINO":     "https://eclipse-propel.com/smaha6mhb",
  "DRIP CASINO":      "https://drp-irrs10.com/c18ebfa90",

  // ── КАЗИНО З-Л ──────────────────────────────────────────
  "FLAGMAN CASINO":   "https://flagmanway67.com/c53208e7a",
  "FRESH CASINO":     "https://clck.ru/3433CW",
  "FUGU CASINO":      "https://fuguway610.com/cf06cace2",
  "GAMA CASINO":      "https://starforge-race.com/sfevqs2sr",
  "GIZBO CASINO":     "https://gzb-way03.com/c2b450be9",
  "IRVIN CASINO":     "https://irisroute64.com/c1e0897c6",
  "IZZI CASINO":      "https://izziway65.com/c43f751ad",
  "JET CASINO":       "https://luckyspin23.com/c8f631ce7",
  "JOY CASINO":       "https://21631.call2me.pro/ru/registration?partner=p21631p3325698p8e8f",
  "KENT CASINO":      "https://cosmic-kinetics.com/sntbu9gqi",
  "КОМЕТА CASINO":    "https://enchanting-route.com/sws2h6fse",
  "LEEBET CASINO":    "https://play-leebet-4th.com/d12bf5c8a",
  "LEGZO CASINO":     "https://clck.ru/3433E2",
  "LEXX CASINO":      "https://lexyway1.com/c8ef27fcf",

  // ── КАЗИНО М-Я ──────────────────────────────────────────
  "MARTIN CASINO":    "https://martinway64.com/cf930f628",
  "MONRO CASINO":     "https://mnr-blse21.com/c5335a257",
  "R7 CASINO":        "https://mystic-route.com/stcmmmdge",
  "RAMENBET":         "https://21631.call2me.xyz/ru/registration?partner=p21631p3326131pa9f0",
  "ROX CASINO":       "https://clck.ru/34339T",
  "SOL CASINO":       "https://clck.ru/3433Fz",
  "STARDA CASINO":    "https://strd-blse21.com/cf2b97cef",
  "UNLIM CASINO":     "https://ul-space.com/dx76cvbaa",
  "VODKA CASINO":     "https://go651077.com/?id=17119",
  "VOLNA CASINO":     "https://vln-blrs10.com/c4e395fcb",

  // ── ДОПОЛНИТЕЛЬНЫЕ ──────────────────────────────────────
  "FENIX CASINO":     "https://kg-node.net/dmutiroi7",
  "HIPE CASINO":      "https://hp-base.com/dc8vxvyso",
  "HONEY MONEY":      "https://hm-route.com/d3oes6rmj",

};

/**
 * Функция автоматической подстановки ссылок на странице.
 * Вызывается на каждой странице при загрузке.
 *
 * Ищет все элементы с атрибутом data-casino="ИМЯ КАЗИНО"
 * и подставляет в href нужную ссылку из конфига выше.
 */
function applyCasinoLinks() {
  document.querySelectorAll('[data-casino]').forEach(el => {
    const name = el.getAttribute('data-casino');
    const url = CASINO_LINKS[name];
    if (url) {
      el.href = url;
    }
  });
}

// Запускаем после загрузки страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyCasinoLinks);
} else {
  applyCasinoLinks();
}
