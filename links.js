/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         CASINO-ZERKALO.ONLINE — ЦЕНТРАЛЬНЫЙ КОНФИГ      ║
 * ║                                                          ║
 * ║  Все партнёрские ссылки хранятся ТОЛЬКО здесь.          ║
 * ║  При блокировке РКН — меняйте ссылку в этом файле.      ║
 * ║  Все страницы сайта обновятся автоматически.            ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * КАК ОБНОВИТЬ ССЫЛКУ:
 * 1. Найдите нужное казино по названию
 * 2. Замените URL внутри кавычек на новый
 * 3. Сохраните файл и загрузите на сервер
 * 4. Готово — все страницы обновились!
 */

const CASINO_LINKS = {

  // ── ТОП КАЗИНО ──────────────────────────────────────────
  "EVA CASINO":       "https://gamedarkshowr.com/drqcqyoqp",
  "VAVADA CASINO":    "https://gate707.com/?promo=d9d43ea1-0cd0-4dd8-9a86-28d352183bfe&target=register",
  "1WIN CASINO":      "https://one-vv893.com/?p=sxqe",
  "STAKE CASINO":     "http://stake1036.com/?c=UdQh5cRu",
  "DUEL CASINO":      "https://duel.com/r/RUBLIK",
  "КУШ CASINO":       "https://pl4y-zn-ksh.com/dqyptbuu1",

  // ── КАЗИНО А-Ж ──────────────────────────────────────────
  "1GO CASINO":       "https://1go-blrs10.com/ca2275e6d",
  "ARKADA CASINO":    "https://prismed-cyberlane.com/svd9sjada",
  "AUF CASINO":       "https://aufas.com/d5b5799f1",
  "BANDA CASINO":     "https://play-bnd-zn.com/d73571540",
  "BEEF CASINO":      "https://beefway61.com/c2197b5c3",
  "CACTUS CASINO":    "https://lavoluntadisabel.xyz/affiliate/c_4wj3z1mk?path=%2Fbonuses",
  "CASINO X":         "https://21631.gameshere.xyz/ru/registration2?partner=p21631p3326886p3e51",
  "CAT CASINO":       "https://triumphant-hall.com/sbrl3ljkm",
  "CHAMPION SLOTS":   "https://clck.ru/3PEbRM",
  "CRYPTOBOSS":       "https://cryptobossc.online/d247e5ab0",
  "DADDY CASINO":     "https://molten-emberpath.com/smaha6mhb",
  "DRIP CASINO":      "https://drp-irrs10.com/c18ebfa90",

  // ── КАЗИНО З-Л ──────────────────────────────────────────
  "FLAGMAN CASINO":   "https://flagmanway1.com/c5068b5f6",
  "FRESH CASINO":     "https://clck.ru/3433CW",
  "FUGU CASINO":      "https://fuguway63.com/c1536be58",
  "GAMA CASINO":      "https://starforge-race.com/sfevqs2sr",
  "GIZBO CASINO":     "https://gzb-way03.com/c2b450be9",
  "IRVIN CASINO":     "https://rwn-blrs21.com/c1452dd34",
  "IZZI CASINO":      "https://izzi-blrs10.com/c123e81f2",
  "JET CASINO":       "https://jet-blrs10.com/c7b0bc5b9",
  "JOY CASINO":       "https://clck.ru/3QXq6p",
  "KENT CASINO":      "https://holo-neonrun.com/sntbu9gqi",
  "КОМЕТА CASINO":    "https://ignited-lavapass.com/sws2h6fse",
  "LEEBET CASINO":    "https://play-leebet-three.com/deyqu7sml",
  "LEGZO CASINO":     "https://clck.ru/3433E2",
  "LEXX CASINO":      "https://lexyway1.com/c8ef27fcf",

  // ── КАЗИНО М-Я ──────────────────────────────────────────
  "MARTIN CASINO":    "https://clck.ru/3Mnh9o",
  "MONRO CASINO":     "https://mnr-blrs21.com/c5335a257",
  "R7 CASINO":        "https://cosmos-flight.com/stcmmmdge",
  "RAMENBET":         "https://clck.ru/39JnjJ",
  "ROX CASINO":       "https://clck.ru/34339T", 
  "SOL CASINO":       "https://clck.ru/3433Fz",
  "STARDA CASINO":    "https://stardaway2.com/c2f2d2001",
  "UNLIM CASINO":     "https://unlimc.net/d2531e71a",
  "VODKA CASINO":     "https://go052.com?id=17119",
  "VOLNA CASINO":     "https://vln-blrs10.com/c4e395fcb",

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
