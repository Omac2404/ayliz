/**
 * =========================================================================
 *  AYLIZ LOJISTIK - Statik site uretici
 *  Kaynak: src/  ->  Cikti: dist/
 *  Calistirma: node build.mjs
 * =========================================================================
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "src");
const OUT = path.join(__dirname, "dist");

/* =========================================================================
 *  SITE SABITLERI
 * ========================================================================= */
const SITE = {
  name: "Ayliz Lojistik",
  domain: process.env.SITE_URL || "https://aylizlojistik.com",
  tagline: "Türkiye – Fransa entegre lojistik zinciri",
  phone: "+90 544 219 30 36",
  phoneHref: "tel:+905442193036",
  email: "operasyon@aylizlojistik.com",
  addressShort: "Bahçelievler Mah. 1831/14 Sok. No:12/72",
  addressCity: "Karşıyaka Tower, Karşıyaka / İzmir",
  hours: "Pzt – Cum 08:30 – 18:00",
  logo: "/assets/img/logo.png",
  buildYear: new Date().getFullYear(),
};

const MAP_EMBED =
  "https://www.google.com/maps?q=Bahcelievler+Mahallesi+1831%2F14+Sokak+Karsiyaka+Izmir&output=embed";

/* Ortak gorsel havuzu (mevcut sitedeki gorsellerle birebir ayni) */
const IMG = {
  hero: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1920",
  container:
    "https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=1200",
  port: "https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg?auto=compress&cs=tinysrgb&w=1200",
  team: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
  air: "https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1200",
  airHero:
    "https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1200",
  sea: "https://images.pexels.com/photos/753331/pexels-photo-753331.jpeg?auto=compress&cs=tinysrgb&w=1200",
  road: "https://images.pexels.com/photos/1267325/pexels-photo-1267325.jpeg?auto=compress&cs=tinysrgb&w=1200",
  national:
    "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1200",
  warehouse:
    "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1200",
  customs:
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1200",
  customsHero:
    "https://images.pexels.com/photos/5816299/pexels-photo-5816299.jpeg?auto=compress&cs=tinysrgb&w=1200",
  logistics:
    "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

/* Hizmet karti verisi (anasayfa + hizmetler sayfasi ortak) */
const SERVICES = [
  ["water", "Denizyolu Taşımacılığı", "Türk limanlarından Le Havre, Fos ve Anvers hattına haftalık konteyner çıkışları; FCL ve LCL çözümleri.", "/denizyolu", IMG.sea],
  ["truck", "Karayolu Taşımacılığı", "Eğitimli sürücü kadrosu ve modern filo ile Türkiye – Avrupa hattında güvenilir karayolu taşımacılığı.", "/karayolu", IMG.road],
  ["shield-check", "Gümrük İşlemleri", "Fransa'da kayıtlı gümrük temsilciliği ile ithalat, transit ve dokümantasyon süreçlerinin tamamı.", "/gumruk", IMG.customs],
  ["box-seam", "Lojistik & Depolama", "Louvres'daki 2.300 m² tesisimizde depolama, sipariş hazırlama, stok yönetimi ve sevkiyat planlama.", "/lojistik", IMG.warehouse],
  ["geo-alt", "Ulusal Taşımacılık", "Türkiye genelinde toplama ve dağıtım, Fransa genelinde özmal filo ile nihai teslimat.", "/ulusal", IMG.national],
  ["airplane", "Havayolu Taşımacılığı", "Zaman kritik ve yüksek değerli gönderiler için hızlı ve güvenli hava kargo çözümleri.", "/havayolu", IMG.air],
];

/* Grup sirketleri */
const COMPANIES = [
  {
    flag: "Türkiye",
    icon: "geo-alt-fill",
    name: "Ayliz Lojistik",
    role: "Uluslararası deniz ve karayolu taşımacılığı",
    text: "Türkiye'de tedarikçilerden yüklerin toplanması, konteyner yüklemelerinin planlanması ve Fransa'ya yönelik sevkiyatların koordinasyonunu yürütür.",
    meta: [
      ["calendar-check", "Kuruluş", "7 Mart 2019"],
      ["building", "Merkez", "İzmir / Karşıyaka"],
      ["geo-alt", "Adres", "Bahçelievler Mah. 1831/14 Sok. No:12/72, Karşıyaka Tower"],
      ["envelope", "E-posta", "operasyon@aylizlojistik.com"],
      ["telephone", "Telefon", "+90 544 219 30 36"],
    ],
    fr: false,
  },
  {
    flag: "Fransa",
    icon: "flag-fill",
    name: "Inter-Trans MMS",
    role: "Uluslararası taşımacılık &amp; kayıtlı gümrük temsilcisi",
    text: "Fransa'daki konteyner varışlarından itibaren ithalat ve transit gümrükleme, dokümantasyon, süreç takibi ve operasyonel koordinasyonu yürütür.",
    meta: [
      ["calendar-check", "Kuruluş", "23 Kasım 2011"],
      ["building", "Merkez", "Louvres / Fransa"],
      ["geo-alt", "Adres", "5 Avenue du Beaumontoir, 95380 Louvres"],
      ["telephone", "Telefon", "+33 1 34 04 10 10"],
      ["globe2", "Web", "intertransmms.com"],
    ],
    fr: true,
  },
  {
    flag: "Fransa",
    icon: "truck",
    name: "Transport Claval",
    role: "Fransa genelinde ulusal karayolu taşımacılığı",
    text: "Limanlardan konteynerlerin alınması, Fransa genelinde karayolu taşımacılığı, dağıtım ve nihai teslimat operasyonlarını gerçekleştirir.",
    meta: [
      ["calendar-check", "Kuruluş", "20 Haziran 2003"],
      ["building", "Merkez", "Louvres / Fransa"],
      ["geo-alt", "Adres", "5 Avenue du Beaumontoir, 95380 Louvres"],
      ["truck-front", "Filo", "11 özmal tır + 2 minivan"],
      ["envelope", "E-posta", "exploitation@transports-claval.fr"],
    ],
    fr: true,
  },
];

/* Entegre zincir adimlari */
const CHAIN = [
  ["flag", "Türkiye", "Tüm ülke genelinde tedarikçilerden yük toplama"],
  ["water", "Denizyolu", "Başlıca Türk limanlarından haftalık çıkışlar"],
  ["geo", "Fransa", "Le Havre, Fos ve Anvers partner limanlarına varış"],
  ["building", "Louvres Deposu", "2.300 m² stok, sipariş hazırlama ve kontrol"],
  ["truck", "Nihai Teslimat", "Özmal filo ile Fransa genelinde dağıtım"],
];

const LOAD_PORTS = ["İstanbul (Ambarlı)", "Gebze", "Aliağa", "Mersin", "İskenderun", "Yarımca", "Gemlik", "İzmit"];
const DEST_PORTS = ["Le Havre (Fransa)", "Fos / Marsilya (Fransa)", "Anvers (Belçika)"];

/* =========================================================================
 *  YARDIMCILAR
 * ========================================================================= */
const u = (p = "/") => (p === "/" ? "/" : "/" + String(p).replace(/^\/+|\/+$/g, "") + "/");

/* Asset surumleme: dosya degisince URL degisir, tarayici eski CSS/JS'e takilmaz */
function assetUrl(rel) {
  const hash = crypto
    .createHash("sha1")
    .update(fs.readFileSync(path.join(SRC, rel)))
    .digest("hex")
    .slice(0, 8);
  return `/${rel}?v=${hash}`;
}
const CSS_URL = assetUrl("assets/css/style.css");
const JS_URL = assetUrl("assets/js/main.js");

/* ---------- Bayrak ikonlari (inline SVG, harici istek yok) ---------- */
function flagSvg(code, uid) {
  const cls = 'class="ayl-lang-flag" viewBox="0 0 30 20" aria-hidden="true"';
  if (code === "tr") {
    return `<svg ${cls}><rect width="30" height="20" fill="#E30A17"/><circle cx="12" cy="10" r="5" fill="#fff"/><circle cx="13.7" cy="10" r="4" fill="#E30A17"/><path d="M19.9 7.9 20.6 9.9 22.7 9.9 21 11.1 21.6 13.1 19.9 11.9 18.2 13.1 18.8 11.1 17.1 9.9 19.2 9.9Z" fill="#fff"/></svg>`;
  }
  if (code === "fr") {
    return `<svg ${cls}><rect width="10" height="20" fill="#002395"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ED2939"/></svg>`;
  }
  /* en - Union Jack */
  const id = `ayl-uj-${uid}`;
  return `<svg class="ayl-lang-flag" viewBox="0 0 60 40" aria-hidden="true"><clipPath id="${id}"><path d="M30,20 h30 v20 z v20 h-30 z h-30 v-20 z v-20 h30 z"/></clipPath><path d="M0,0 v40 h60 v-40 z" fill="#00247d"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0 L60,40 M60,0 L0,40" clip-path="url(#${id})" stroke="#cf142b" stroke-width="5"/><path d="M30,0 v40 M0,20 h60" stroke="#fff" stroke-width="13"/><path d="M30,0 v40 M0,20 h60" stroke="#cf142b" stroke-width="8"/></svg>`;
}

/* Dil secici - bayraklar simdilik pasif, ceviri son asamada devreye alinacak */
function langSwitcher(scope) {
  const langs = [
    ["tr", "TR", true],
    ["en", "EN", false],
    ["fr", "FR", false],
  ];
  return `<div class="ayl-lang" role="group" aria-label="Dil seçimi">${langs
    .map(
      ([code, label, active]) =>
        `<button type="button" class="ayl-lang-btn${active ? " is-active" : ""}" data-lang="${code}" disabled title="${
          active ? "Türkçe" : "Çeviri yakında eklenecek"
        }" aria-disabled="true">${flagSvg(code, scope + "-" + code)}<span>${label}</span></button>`
    )
    .join("")}</div>`;
}

function pageHeader(title, crumbs = []) {
  const items = crumbs
    .map((c) =>
      Array.isArray(c)
        ? `<li class="breadcrumb-item"><a href="${u(c[1])}">${c[0]}</a></li>`
        : `<li class="breadcrumb-item active" aria-current="page">${c}</li>`
    )
    .join("\n                            ");
  return `
        <section class="ayl-page-header">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        ${items}
                    </ol>
                </nav>
                <h1>${title}</h1>
            </div>
        </section>`;
}

function serviceGrid(list = SERVICES) {
  return list
    .map(
      ([icon, title, text, href, img]) => `
                        <div class="col-lg-4 col-md-6">
                            <div class="ayl-service-card">
                                <div class="ayl-service-media">
                                    <img src="${img}" alt="${title}" loading="lazy">
                                    <span class="ayl-service-badge"><i class="bi bi-${icon}"></i></span>
                                </div>
                                <div class="ayl-service-body">
                                    <h3>${title}</h3>
                                    <p>${text}</p>
                                    <a class="ayl-service-link" href="${u(href)}">İncele <i class="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>`
    )
    .join("");
}

function metaList(c) {
  return `<ul class="ayl-company-meta">
                                    ${c.meta
                                      .map(
                                        ([i, k, v]) =>
                                          `<li><i class="bi bi-${i}"></i><div><strong>${k}:</strong> <span>${v}</span></div></li>`
                                      )
                                      .join("\n                                    ")}
                                </ul>`;
}

/* Ayliz one cikan genis kart, Fransa ayagindaki iki sirket altinda */
function companyCards() {
  const [lead, ...rest] = COMPANIES;
  return `
                        <div class="col-12">
                            <div class="ayl-company-card is-featured">
                                <div class="row g-4 align-items-center">
                                    <div class="col-lg-6">
                                        <span class="ayl-featured-tag"><i class="bi bi-star-fill"></i> Grubun Türkiye Ayağı</span>
                                        <span class="ayl-company-flag"><i class="bi bi-${lead.icon}"></i> ${lead.flag}</span>
                                        <h3>${lead.name}</h3>
                                        <div class="ayl-company-role">${lead.role}</div>
                                        <p>${lead.text}</p>
                                    </div>
                                    <div class="col-lg-6">
                                        ${metaList(lead)}
                                    </div>
                                </div>
                            </div>
                        </div>${rest
                          .map(
                            (c) => `
                        <div class="col-lg-6">
                            <div class="ayl-company-card${c.fr ? " is-fr" : ""}">
                                <span class="ayl-company-flag"><i class="bi bi-${c.icon}"></i> ${c.flag}</span>
                                <h3>${c.name}</h3>
                                <div class="ayl-company-role">${c.role}</div>
                                <p>${c.text}</p>
                                ${metaList(c)}
                            </div>
                        </div>`
                          )
                          .join("")}`;
}

function chainFlow() {
  return CHAIN.map(
    ([icon, title, text], i) =>
      (i > 0 ? `\n                        <div class="ayl-chain-arrow"><i class="bi bi-arrow-right"></i></div>` : "") +
      `
                        <div class="ayl-chain-step">
                            <div class="ayl-chain-icon"><i class="bi bi-${icon}"></i></div>
                            <h5>${title}</h5>
                            <p>${text}</p>
                        </div>`
  ).join("");
}

function statsBar() {
  const stats = [
    ["60+", "Aylık konteyner hacmi"],
    ["2.300 m²", "Louvres depolama tesisi"],
    ["11+2", "Özmal tır ve minivan"],
    ["3", "Entegre grup şirketi"],
  ];
  return `
                    <div class="ayl-stats">
                        <div class="row g-0">
                            ${stats
                              .map(
                                ([v, l]) => `<div class="col-6 col-lg-3">
                                <div class="ayl-stat">
                                    <span class="ayl-stat-value">${v}</span>
                                    <span class="ayl-stat-label">${l}</span>
                                </div>
                            </div>`
                              )
                              .join("\n                            ")}
                        </div>
                    </div>`;
}

function ctaBanner(
  title = "Lojistik ihtiyaçlarınız için bizimle iletişime geçin.",
  text = "Uzman ekibimiz, operasyonlarınıza en uygun çözümü en kısa sürede sunmak için hazır."
) {
  return `
                    <div class="ayl-cta">
                        <div class="row align-items-center gy-3 position-relative" style="z-index:2">
                            <div class="col-lg-8">
                                <h3>${title}</h3>
                                <p>${text}</p>
                            </div>
                            <div class="col-lg-4 text-lg-end">
                                <a href="${u("/teklif-al")}" class="ayl-btn ayl-btn-primary">Teklif Al <i class="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>`;
}

/* =========================================================================
 *  HEADER / FOOTER
 * ========================================================================= */
function header() {
  return `
        <div class="ayl-wrapper">
            <div class="ayl-topbar">
                <div class="container d-none d-md-flex justify-content-between align-items-center">
                    <div>
                        <span class="ayl-topbar-item"><i class="bi bi-geo-alt"></i> ${SITE.addressShort}, ${SITE.addressCity}</span>
                        <span class="ayl-divider">|</span>
                        <span class="ayl-topbar-item"><i class="bi bi-clock"></i> ${SITE.hours}</span>
                    </div>
                    <div>
                        <a class="ayl-topbar-item" href="${SITE.phoneHref}"><i class="bi bi-telephone"></i> ${SITE.phone}</a>
                        <span class="ayl-divider">|</span>
                        <a class="ayl-topbar-item" href="mailto:${SITE.email}"><i class="bi bi-envelope"></i> ${SITE.email}</a>
                    </div>
                </div>
            </div>

            <nav class="navbar navbar-expand-lg ayl-navbar sticky-top">
                <div class="container">
                    <a class="navbar-brand ayl-brand" href="${u("/")}">
                        <img src="${SITE.logo}" alt="Ayliz Lojistik" loading="eager" width="220" height="48">
                        <span>Ayliz <span style="color:var(--ayl-red)">Lojistik</span></span>
                    </a>
                    <button class="navbar-toggler ayl-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#aylOffcanvasNav" aria-controls="aylOffcanvasNav" aria-label="Menüyü aç/kapat">
                        <span class="ayl-toggler-bar"></span>
                        <span class="ayl-toggler-bar"></span>
                        <span class="ayl-toggler-bar"></span>
                    </button>
                    <div class="offcanvas-lg offcanvas-start ayl-offcanvas" tabindex="-1" id="aylOffcanvasNav" aria-labelledby="aylOffcanvasNavLabel">
                        <div class="offcanvas-header d-lg-none">
                            <a class="ayl-offcanvas-brand" href="${u("/")}">
                                <img src="${SITE.logo}" alt="Ayliz Lojistik" style="height:36px;filter:brightness(0) invert(1)">
                                <span>Ayliz Lojistik</span>
                            </a>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" data-bs-target="#aylOffcanvasNav" aria-label="Kapat"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav ms-auto align-items-lg-center">
                                <li class="nav-item"><a class="nav-link" href="${u("/")}">Anasayfa</a></li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Kurumsal</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="${u("/hakkimizda")}"><i class="bi bi-info-circle me-2"></i>Hakkımızda</a></li>
                                        <li><a class="dropdown-item" href="${u("/grup")}"><i class="bi bi-diagram-3 me-2"></i>Grup Şirketlerimiz</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Hizmetlerimiz</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="${u("/hizmetlerimiz")}"><i class="bi bi-grid me-2"></i>Tüm Hizmetler</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="${u("/denizyolu")}"><i class="bi bi-water me-2"></i>Denizyolu Taşımacılığı</a></li>
                                        <li><a class="dropdown-item" href="${u("/karayolu")}"><i class="bi bi-truck me-2"></i>Karayolu Taşımacılığı</a></li>
                                        <li><a class="dropdown-item" href="${u("/gumruk")}"><i class="bi bi-shield-check me-2"></i>Gümrük İşlemleri</a></li>
                                        <li><a class="dropdown-item" href="${u("/lojistik")}"><i class="bi bi-box-seam me-2"></i>Lojistik &amp; Depolama</a></li>
                                        <li><a class="dropdown-item" href="${u("/ulusal")}"><i class="bi bi-geo-alt me-2"></i>Ulusal Taşımacılık</a></li>
                                        <li><a class="dropdown-item" href="${u("/havayolu")}"><i class="bi bi-airplane me-2"></i>Havayolu Taşımacılığı</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="${u("/galeri")}">Galeri</a></li>
                                <li class="nav-item"><a class="nav-link" href="${u("/agimiz")}">Ağımız</a></li>
                                <li class="nav-item"><a class="nav-link" href="${u("/iletisim")}">İletişim</a></li>
                                <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                                    <a class="ayl-btn ayl-btn-primary" href="${u("/teklif-al")}"><i class="bi bi-file-earmark-text"></i> Teklif Al</a>
                                </li>
                                <li class="nav-item d-none d-lg-flex align-items-center">${langSwitcher("nav")}</li>
                            </ul>
                            <div class="d-lg-none">${langSwitcher("mob")}</div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>`;
}

function footer() {
  return `
        <div class="ayl-wrapper">
            <footer class="ayl-footer">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-lg-4 col-md-6">
                            <div class="ayl-footer-brand">
                                <img src="${SITE.logo}" alt="Ayliz Lojistik" loading="lazy">
                                <span>Ayliz Lojistik</span>
                            </div>
                            <p>Türkiye'deki yükleme operasyonlarından Fransa'daki nihai teslimata kadar tüm lojistik süreçleri tek koordinasyon modeli altında yöneten entegre grup yapısının Türkiye ayağı.</p>
                            <div class="ayl-socials mt-3">
                                <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                                <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                                <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                                <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h5>Hizmetlerimiz</h5>
                            <a href="${u("/denizyolu")}">Denizyolu Taşımacılığı</a>
                            <a href="${u("/karayolu")}">Karayolu Taşımacılığı</a>
                            <a href="${u("/gumruk")}">Gümrük İşlemleri</a>
                            <a href="${u("/lojistik")}">Lojistik &amp; Depolama</a>
                            <a href="${u("/ulusal")}">Ulusal Taşımacılık</a>
                            <a href="${u("/havayolu")}">Havayolu Taşımacılığı</a>
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <h5>Kurumsal</h5>
                            <a href="${u("/")}">Anasayfa</a>
                            <a href="${u("/hakkimizda")}">Hakkımızda</a>
                            <a href="${u("/grup")}">Grup Şirketlerimiz</a>
                            <a href="${u("/galeri")}">Foto Galeri</a>
                            <a href="${u("/agimiz")}">Ağımız</a>
                            <a href="${u("/teklif-al")}">Teklif Al</a>
                            <a href="${u("/iletisim")}">İletişim</a>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h5>İletişim</h5>
                            <div class="ayl-contact-inline">
                                <i class="bi bi-geo-alt"></i>
                                <span>${SITE.addressShort}<br>${SITE.addressCity}</span>
                            </div>
                            <div class="ayl-contact-inline">
                                <i class="bi bi-telephone"></i>
                                <a href="${SITE.phoneHref}">${SITE.phone}</a>
                            </div>
                            <div class="ayl-contact-inline">
                                <i class="bi bi-envelope"></i>
                                <a href="mailto:${SITE.email}">${SITE.email}</a>
                            </div>
                            <div class="ayl-contact-inline">
                                <i class="bi bi-clock"></i>
                                <span>${SITE.hours}</span>
                            </div>
                        </div>
                    </div>
                    <div class="ayl-footer-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <span>© ${SITE.buildYear} Ayliz Lojistik. Tüm hakları saklıdır.</span>
                        <span>Design by Webreta</span>
                        <span>Türkiye merkezli, Fransa'da entegre operasyon.</span>
                    </div>
                </div>
            </footer>
        </div>`;
}

/* =========================================================================
 *  SAYFA ISKELETI
 * ========================================================================= */
function layout({ title, description, slug, body }) {
  const canonical = SITE.domain.replace(/\/$/, "") + u(slug);
  const fullTitle = slug === "/" ? SITE.name : `${SITE.name} | ${title}`;
  return `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fullTitle}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${SITE.name}">
    <meta property="og:title" content="${fullTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE.domain.replace(/\/$/, "")}${SITE.logo}">
    <meta property="og:locale" content="tr_TR">
    <meta name="theme-color" content="#0f2742">
    <link rel="icon" href="${SITE.logo}" type="image/png">
    <link rel="apple-touch-icon" href="${SITE.logo}">
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preconnect" href="https://images.pexels.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css">
    <link rel="stylesheet" href="${CSS_URL}">
</head>
<body>
${header()}
${body}
${footer()}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" defer></script>
<script src="${JS_URL}" defer></script>
</body>
</html>
`;
}

/* =========================================================================
 *  ORTAK: IC HIZMET SAYFASI
 * ========================================================================= */
function servicePage({ icon, title, lead, paragraphs, features, heroImage }) {
  return (
    pageHeader(title, [["Anasayfa", "/"], ["Hizmetlerimiz", "/hizmetlerimiz"], title]) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section ayl-about">
                <div class="container">
                    <div class="row g-5 align-items-start">
                        <div class="col-lg-5">
                            <div class="ayl-about-figure">
                                <img src="${heroImage}" alt="${title}" loading="lazy">
                                <span class="ayl-figure-badge"><i class="bi bi-${icon}"></i> ${title}</span>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <span class="eyebrow">Hizmet Detayı</span>
                            <h2 class="mt-2">${title}</h2>
                            <p class="lead" style="font-size:1.08rem;color:var(--ayl-text)">${lead}</p>
                            ${paragraphs.map((p) => `<p class="text-muted">${p}</p>`).join("\n                            ")}
                            <a href="${u("/teklif-al")}" class="ayl-btn ayl-btn-primary mt-3"><i class="bi bi-file-earmark-text"></i> Teklif Al</a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="ayl-section ayl-section-soft">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Hizmet Özellikleri</span>
                        <h2>Size Ne Sunuyoruz?</h2>
                    </div>
                    <div class="row g-4">
                        ${features
                          .map(
                            ([i, t, d]) => `<div class="col-md-6 col-lg-4">
                            <div class="ayl-feature-box h-100">
                                <i class="bi bi-${i}"></i>
                                <div>
                                    <h5>${t}</h5>
                                    <p>${d}</p>
                                </div>
                            </div>
                        </div>`
                          )
                          .join("\n                        ")}
                    </div>
                </div>
            </section>
        </div>`
  );
}

/* =========================================================================
 *  SAYFALAR
 * ========================================================================= */
const pages = [];

/* ---------- ANASAYFA ---------- */
pages.push({
  slug: "/",
  title: "Anasayfa",
  description:
    "Ayliz Lojistik – Türkiye ve Fransa arasında denizyolu, karayolu, gümrükleme ve depolama hizmetleriyle uçtan uca entegre lojistik çözümler.",
  body: `
        <div class="ayl-wrapper">

            <!-- HERO -->
            <section class="ayl-hero">
                <div class="container ayl-hero-inner">
                    <div class="row align-items-center">
                        <div class="col-lg-7">
                            <span class="ayl-hero-kicker"><i class="bi bi-globe-europe-africa"></i> Türkiye – Fransa Entegre Lojistik Zinciri</span>
                            <div class="ayl-hero-accent"></div>
                            <h1>Türkiye'den Fransa'ya Uçtan Uca Lojistik Çözüm Ortağınız</h1>
                            <p class="lead">Ayliz Lojistik; Türkiye'deki yükleme operasyonlarından Fransa'daki nihai teslimata kadar denizyolu ve karayolu taşımacılığı, gümrükleme, depolama ve dağıtım süreçlerini tek koordinasyon modeli altında yönetir.</p>
                            <div class="d-flex flex-wrap gap-2">
                                <a href="${u("/teklif-al")}" class="ayl-btn ayl-btn-primary"><i class="bi bi-file-earmark-text"></i> Hemen Teklif Al</a>
                                <a href="${u("/hakkimizda")}" class="ayl-btn ayl-btn-ghost"><i class="bi bi-arrow-right-circle"></i> Daha Fazla Bilgi</a>
                            </div>
                        </div>
                        <div class="col-lg-5 d-none d-lg-block">
                            <div class="ayl-about-figure" style="min-height:360px;margin-top:1rem">
                                <img src="${IMG.container}" alt="Konteyner terminali" loading="lazy">
                                <span class="ayl-figure-badge"><i class="bi bi-globe2"></i> Türkiye – Fransa Hattı</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ISTATISTIKLER -->
            <section class="ayl-section" style="padding-bottom:0">
                <div class="container">
${statsBar()}
                </div>
            </section>

            <!-- HIZMETLER -->
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Hizmetlerimiz</span>
                        <h2>Entegre Taşımacılık ve Lojistik Çözümleri</h2>
                        <p>Denizyolu ve karayolu taşımacılığından gümrükleme, depolama ve nihai teslimata kadar geniş bir yelpazede entegre çözümler sunuyoruz.</p>
                    </div>
                    <div class="row g-4">${serviceGrid()}
                    </div>
                </div>
            </section>

            <!-- ENTEGRE ZINCIR -->
            <section class="ayl-section ayl-section-soft">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Entegre Lojistik Zincirimiz</span>
                        <h2>Türkiye'den Fransa'da Nihai Teslimata</h2>
                        <p>Zincirin her halkası grup şirketlerimiz tarafından yürütülür; tek muhatap, kesintisiz süreç ve tam görünürlük.</p>
                    </div>
                    <div class="ayl-chain">${chainFlow()}
                    </div>
                </div>
            </section>

            <!-- GRUP SIRKETLERI -->
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Grup Yapımız</span>
                        <h2>Birbirini Tamamlayan 3 Şirket</h2>
                        <p>Türkiye'de yükleme organizasyonu, Fransa'da gümrükleme altyapısı ve özmal filo ile ulusal dağıtım.</p>
                    </div>
                    <div class="row g-4">${companyCards()}
                    </div>
                    <div class="text-center mt-4">
                        <a href="${u("/grup")}" class="ayl-btn ayl-btn-outline">Grup Şirketlerimizi İnceleyin <i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>
            </section>

            <!-- DEGERLER -->
            <section class="ayl-section ayl-section-soft">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Temel Değerlerimiz</span>
                        <h2>Operasyonlarımızın Temel Prensipleri</h2>
                        <p>Tüm süreçlerimizde güven, verimlilik, kalite ve sürekli iyileştirmeyi esas alarak müşterilerimize uzun vadeli katma değer sunuyoruz.</p>
                    </div>
                    <div class="row g-4">
                        ${[
                          ["shield-fill-check", "Güvenilirlik", "Şeffaf, kontrollü ve güvenilir hizmet anlayışımızla tüm süreçlerinizde yanınızdayız."],
                          ["speedometer2", "Verimlilik", "Kaynakları etkin kullanarak operasyonları hızlı ve planlı biçimde yürütüyoruz."],
                          ["award-fill", "Kalite", "Yüksek hizmet standartları ve sürekli iyileştirme anlayışıyla çalışıyoruz."],
                          ["diagram-3-fill", "Tek Koordinasyon", "Türkiye ve Fransa ayaklarının tamamı tek bir operasyon modeli altında yönetilir."],
                        ]
                          .map(
                            ([i, t, d]) => `<div class="col-lg-3 col-md-6">
                            <div class="ayl-value">
                                <div class="ayl-value-icon"><i class="bi bi-${i}"></i></div>
                                <h4>${t}</h4>
                                <p>${d}</p>
                            </div>
                        </div>`
                          )
                          .join("\n                        ")}
                    </div>
                </div>
            </section>

            <!-- HAKKIMIZDA KISA -->
            <section class="ayl-section ayl-about">
                <div class="container">
                    <div class="row align-items-center g-5">
                        <div class="col-lg-6">
                            <div class="ayl-about-figure">
                                <img src="${IMG.team}" alt="Profesyonel lojistik ekibi" loading="lazy">
                                <span class="ayl-figure-badge"><i class="bi bi-patch-check-fill"></i> 2019'dan beri</span>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <span class="eyebrow">Kurumsal</span>
                            <h2 class="mt-2">Türkiye Merkezli, Fransa'da Operasyonel Güç</h2>
                            <p class="text-muted">Ayliz Lojistik, 7 Mart 2019'da İzmir Karşıyaka'da kuruldu. Türkiye genelinde tedarikçilerden yük toplama, konteyner yüklemelerinin planlanması ve Fransa'ya yönelik sevkiyatların koordinasyonunu yürütüyoruz. Fransa ayağında ise grup şirketlerimiz Inter-Trans MMS ve Transport Claval ile gümrükleme, depolama ve nihai teslimat süreçlerini yönetiyoruz.</p>
                            <ul class="ayl-check">
                                <li>Aylık yaklaşık 60 konteyner hacmi, 100 konteynere kadar büyüme kapasitesi</li>
                                <li>Louvres'da 2.300 m² depolama ve sipariş hazırlama tesisi</li>
                                <li>Fransa'da 11 özmal tır ve 2 minivandan oluşan dağıtım filosu</li>
                                <li>Fransa'da kayıtlı gümrük temsilciliği ile ithalat ve transit işlemleri</li>
                            </ul>
                            <a href="${u("/hakkimizda")}" class="ayl-btn ayl-btn-outline mt-4">Daha Fazla Bilgi <i class="bi bi-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <section class="ayl-section ayl-section-soft">
                <div class="container">
${ctaBanner()}
                </div>
            </section>

        </div>`,
});

/* ---------- HAKKIMIZDA ---------- */
pages.push({
  slug: "/hakkimizda",
  title: "Hakkımızda",
  description:
    "2019'da İzmir Karşıyaka'da kurulan Ayliz Lojistik; Türkiye – Fransa hattında denizyolu, karayolu, gümrükleme ve depolama hizmetleri sunar.",
  body:
    pageHeader("Hakkımızda", [["Anasayfa", "/"], "Hakkımızda"]) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section ayl-about">
                <div class="container">
                    <div class="row align-items-center g-5">
                        <div class="col-lg-6">
                            <div class="ayl-about-figure">
                                <img src="${IMG.port}" alt="Konteyner limanı" loading="lazy">
                                <span class="ayl-figure-badge"><i class="bi bi-globe-americas"></i> Türkiye – Fransa Hattı</span>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <span class="eyebrow">Kurumsal Kimliğimiz</span>
                            <h2 class="mt-2">Uluslararası Taşımacılıkta Güvenilir Partner</h2>
                            <p>7 Mart 2019'da İzmir Karşıyaka'da kurulan Ayliz Lojistik, uluslararası denizyolu ve karayolu taşımacılığı alanında faaliyet göstermektedir. Türkiye'de tedarikçilerden yüklerin toplanması, konteyner yüklemelerinin planlanması ve Fransa'ya yönelik sevkiyatların koordinasyonu ana faaliyet alanımızdır.</p>
                            <p>Grup yapımız; Türkiye'de Ayliz Lojistik, Fransa'da Inter-Trans MMS ve Transport Claval şirketlerinden oluşur. Bu yapı sayesinde Türkiye'deki yükleme operasyonundan Fransa'daki nihai teslimata kadar tüm süreç tek bir koordinasyon modeli altında yürütülür.</p>
                            <p>Mevcut konteyner hacmimiz aylık yaklaşık 60 konteyner seviyesindedir; müşteri portföyümüzün gelişimine bağlı olarak bu hacmi aylık 100 konteynere kadar artırma kapasitesine sahibiz.</p>
                            <ul class="ayl-check">
                                <li>Kuru ve soğutma gerektirmeyen gıda ürünleri</li>
                                <li>Gıda ile temasa uygun karton ve plastik ambalajlar</li>
                                <li>Tehlikeli olmayan endüstriyel ürünler</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ISTATISTIK -->
            <section class="ayl-section ayl-section-soft" style="padding-top:0;padding-bottom:3.5rem">
                <div class="container" style="padding-top:3.5rem">
${statsBar()}
                </div>
            </section>

            <!-- TARIHCE -->
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Tarihçemiz</span>
                        <h2>Yolculuğumuz</h2>
                        <p>Grubumuzun kuruluşundan bugüne, entegre Türkiye – Fransa lojistik zincirinin oluşum aşamaları.</p>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="ayl-timeline">
                                ${[
                                  ["2003", "Transport Claval Kuruldu", "20 Haziran 2003'te Fransa Louvres'da kurulan Transport Claval, Fransa genelinde ulusal karayolu taşımacılığı ve dağıtım operasyonlarına başladı."],
                                  ["2011", "Inter-Trans MMS Kuruldu", "23 Kasım 2011'de Louvres'da kurulan Inter-Trans MMS ile uluslararası taşımacılık, ithalat ve transit gümrükleme yetkinliği grup bünyesine katıldı."],
                                  ["2019", "Ayliz Lojistik Kuruldu", "7 Mart 2019'da İzmir Karşıyaka'da kurulan Ayliz Lojistik ile Türkiye'deki toplama, konteyner yükleme ve sevkiyat koordinasyonu yapısı kuruldu."],
                                  ["Bugün", "Entegre Lojistik Zinciri", "Aylık yaklaşık 60 konteyner hacmi, Louvres'da 2.300 m² depolama tesisi ve özmal filo ile Türkiye'den Fransa'daki nihai teslimata kadar uçtan uca hizmet veriyoruz."],
                                ]
                                  .map(
                                    ([y, t, d]) => `<div class="ayl-timeline-item">
                                    <span class="ayl-timeline-year">${y}</span>
                                    <h5>${t}</h5>
                                    <p>${d}</p>
                                </div>`
                                  )
                                  .join("\n                                ")}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- MISYON / VIZYON -->
            <section class="ayl-section ayl-section-soft">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="ayl-feature-box h-100">
                                <i class="bi bi-bullseye"></i>
                                <div>
                                    <h5>Misyonumuz</h5>
                                    <p>Müşterilerimizin uluslararası nakliye ihtiyaçlarında en uygun çözümleri belirleyerek güvenli, hızlı ve şeffaf bir lojistik deneyimi sunmak; Türkiye'den Fransa'ya kadar zincirin her halkasında tek muhatap olmak.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="ayl-feature-box h-100">
                                <i class="bi bi-eye"></i>
                                <div>
                                    <h5>Vizyonumuz</h5>
                                    <p>Türkiye – Fransa hattında düzenli hacim, sürdürülebilir hizmet kalitesi ve güvenilir partnerliklerle tercih edilen entegre lojistik çözüm ortağı olmak.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="ayl-section">
                <div class="container">
${ctaBanner("Türkiye – Fransa hattındaki yükleriniz için bize yazın.", "Operasyon ekibimiz sevkiyat planınızı değerlendirip en uygun çözümü sunar.")}
                </div>
            </section>
        </div>`,
});

/* ---------- GRUP SIRKETLERI ---------- */
pages.push({
  slug: "/grup",
  title: "Grup Şirketlerimiz",
  description:
    "Ayliz Lojistik (Türkiye), Inter-Trans MMS (Fransa) ve Transport Claval (Fransa) şirketlerinden oluşan entegre lojistik grubu.",
  body:
    pageHeader("Grup Şirketlerimiz", [["Anasayfa", "/"], "Grup Şirketlerimiz"]) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Birbirini Tamamlayan 3 Şirket</span>
                        <h2>Türkiye – Fransa Entegre Lojistik Grubu</h2>
                        <p>Türkiye'deki yükleme organizasyonu, Fransa'daki gümrükleme altyapısı, 2.300 m² depolama tesisi ve özmal araç filosu tek bir zincirde birleşir.</p>
                    </div>
                    <div class="row g-4">${companyCards()}
                    </div>
                </div>
            </section>

            <section class="ayl-section ayl-section-soft">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Entegre Lojistik Zincirimiz</span>
                        <h2>Tek Koordinasyon, Kesintisiz Süreç</h2>
                        <p>Her adım grup şirketlerimizden biri tarafından yürütülür; bilgi ve sorumluluk el değiştirmez.</p>
                    </div>
                    <div class="ayl-chain">${chainFlow()}
                    </div>
                </div>
            </section>

            <!-- LOUVRES DEPO -->
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-facility">
                        <div class="row align-items-center gy-4 position-relative" style="z-index:2">
                            <div class="col-lg-5">
                                <span class="eyebrow" style="color:#fff">Louvres Depolama Tesisi</span>
                                <span class="ayl-facility-size">2.300 m²</span>
                                <p class="mt-3">Louvres'daki tesisimiz, Fransa'daki lojistik operasyonlarımızın merkezi olarak kullanılmaktadır.</p>
                            </div>
                            <div class="col-lg-7">
                                <div class="row">
                                    <div class="col-md-6">
                                        <ul>
                                            <li>Kuru gıda ve gıda ambalajlarının depolanması</li>
                                            <li>Tehlikesiz endüstriyel ürünlerin depolanması</li>
                                            <li>Mal kabul ve kontrol</li>
                                        </ul>
                                    </div>
                                    <div class="col-md-6">
                                        <ul>
                                            <li>Sipariş hazırlama ve stok yönetimi</li>
                                            <li>Sevkiyat planlama</li>
                                            <li>Özmal filoyla sevkiyat organizasyonu</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="ayl-section ayl-section-soft">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Operasyonel Kapasite</span>
                        <h2>Rakamlarla Grubumuz</h2>
                    </div>
${statsBar()}
                </div>
            </section>
        </div>`,
});

/* ---------- HIZMETLER ---------- */
pages.push({
  slug: "/hizmetlerimiz",
  title: "Hizmetlerimiz",
  description:
    "Denizyolu ve karayolu taşımacılığı, gümrükleme, depolama, ulusal taşımacılık ve havayolu kargo hizmetleri.",
  body:
    pageHeader("Hizmetlerimiz", [["Anasayfa", "/"], "Hizmetlerimiz"]) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Hizmetlerimiz</span>
                        <h2>Uçtan Uca Lojistik Çözümleri</h2>
                        <p>Taşıma modundan gümrüklemeye, depolamadan nihai teslimata; operasyonunuzun her adımı için tek bir muhatap.</p>
                    </div>
                    <div class="row g-4">${serviceGrid()}
                    </div>
                </div>
            </section>

            <section class="ayl-section ayl-section-soft">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Entegre Lojistik Zincirimiz</span>
                        <h2>Süreç Nasıl İşliyor?</h2>
                    </div>
                    <div class="ayl-chain">${chainFlow()}
                    </div>
                </div>
            </section>

            <section class="ayl-section">
                <div class="container">
${ctaBanner()}
                </div>
            </section>
        </div>`,
});

/* ---------- DENIZYOLU ---------- */
pages.push({
  slug: "/denizyolu",
  title: "Denizyolu Taşımacılığı",
  description:
    "Türk limanlarından Le Havre, Fos ve Anvers hattına haftalık konteyner çıkışları; FCL ve LCL denizyolu taşımacılığı.",
  body:
    servicePage({
      icon: "water",
      title: "Denizyolu Taşımacılığı",
      lead: "Türkiye'nin başlıca limanlarından Fransa ve Belçika limanlarına haftalık, planlı ve ekonomik konteyner taşımacılığı.",
      paragraphs: [
        "Denizyolu yük akışlarınızı yönetmek için Ayliz Lojistik ekipleri, dünya çapında titizlikle seçilmiş denizcilik şirketleriyle birlikte çalışmaktadır. İskenderun, Mersin, Aliağa, Ambarlı, Gebze, Gemlik, Yarımca ve İzmit limanlarından haftalık çıkışlarla sevkiyatlarınızı planlıyoruz.",
        "Le Havre, Fos (Marsilya) ve Anvers partner limanlarına varan konteynerleriniz, Fransa'daki grup şirketlerimiz tarafından gümrüklenir, Louvres'daki 2.300 m² depomuza alınır ve özmal filomuzla nihai adrese teslim edilir. FCL (komple konteyner) ve LCL (groupage) seçenekleriyle operasyonlarınızı esnek biçimde planlıyoruz.",
      ],
      features: [
        ["box-seam", "FCL ve LCL", "Komple ve parsiyel konteyner yükleme seçenekleriyle esnek çözümler."],
        ["calendar-week", "Haftalık Çıkışlar", "Başlıca Türk limanlarından düzenli ve öngörülebilir haftalık seferler."],
        ["pin-map", "Anlık Konum", "Yüklerinizin limandan limana anlık takibi ve raporlanması."],
        ["diagram-3", "Uçtan Uca Zincir", "Varış limanından depo ve nihai teslimata kadar tek elden koordinasyon."],
        ["graph-up-arrow", "Maliyet Avantajı", "Düzenli hacmimiz sayesinde rekabetçi ve sürdürülebilir navlun koşulları."],
        ["file-ruled", "Belge Yönetimi", "Konşimento, manifesto ve liman dokümantasyonunda uçtan uca destek."],
      ],
      heroImage: IMG.sea,
    }) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Liman Ağımız</span>
                        <h2>Yükleme ve Varış Limanları</h2>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-7">
                            <div class="ayl-port-card">
                                <h4><i class="bi bi-box-arrow-up"></i> Yükleme Limanları (Türkiye)</h4>
                                <ul class="ayl-port-list">${LOAD_PORTS.map((p) => `<li>${p}</li>`).join("")}</ul>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="ayl-port-card is-dest">
                                <h4><i class="bi bi-box-arrow-in-down"></i> Varış Limanları (Avrupa)</h4>
                                <ul class="ayl-port-list">${DEST_PORTS.map((p) => `<li>${p}</li>`).join("")}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>`,
});

/* ---------- KARAYOLU ---------- */
pages.push({
  slug: "/karayolu",
  title: "Karayolu Taşımacılığı",
  description:
    "Türkiye – Avrupa hattında komple ve parsiyel karayolu taşımacılığı; Fransa genelinde özmal filo ile dağıtım.",
  body: servicePage({
    icon: "truck",
    title: "Karayolu Taşımacılığı",
    lead: "Eğitimli sürücü kadromuz ve modern araç filomuzla Türkiye – Avrupa hattında güvenilir karayolu taşımacılığı.",
    paragraphs: [
      "Ayliz Lojistik, uluslararası nakliyelerinizle ilgili her türlü ihtiyacınızda sizin için en uygun çözümü belirleyen bir karayolu taşımacılığı uzmanıdır. Komple (FTL), parsiyel ve groupage seçenekleriyle Türkiye ve Avrupa arasında düzenli hatlar işletiyoruz.",
      "Fransa ayağında grup şirketimiz Transport Claval'ın 11 özmal tır ve 2 minivandan oluşan filosu devreye girer. Özmal filo sayesinde araç ve sürücü planlaması, liman operasyonları, acil teslimatlar ve müşteri sevkiyatlarında yüksek operasyonel kontrol ve esneklik sağlıyoruz.",
    ],
    features: [
      ["truck-front", "Özmal Filo", "11 özmal tır ve 2 minivanla Fransa genelinde kontrollü dağıtım."],
      ["person-badge", "Eğitimli Sürücüler", "Sertifikalı ve deneyimli sürücü kadrosu."],
      ["arrow-left-right", "İthalat & İhracat", "Türkiye – Fransa ve Avrupa hatlarında çift yönlü taşıma."],
      ["boxes", "Komple / Parsiyel", "FTL ve LTL (groupage) seçenekleriyle esnek yükleme."],
      ["calendar-check", "Düzenli Seferler", "Türkiye ve Avrupa hattında planlı ve düzenli seferler."],
      ["stopwatch", "Acil Teslimat", "Özmal filo esnekliğiyle acil sevkiyatlarda hızlı müdahale."],
    ],
    heroImage: IMG.road,
  }),
});

/* ---------- GUMRUK ---------- */
pages.push({
  slug: "/gumruk",
  title: "Gümrük İşlemleri",
  description:
    "Fransa'da kayıtlı gümrük temsilciliği ile ithalat, transit ve gümrük dokümantasyonu hizmetleri.",
  body: servicePage({
    icon: "shield-check",
    title: "Gümrük İşlemleri",
    lead: "İthalat ve transit gümrük formalitelerinde hızlı, doğru ve mevzuata uyumlu çözümler.",
    paragraphs: [
      "Gümrük idaresi, ithalat veya ihracat yapan firmalar için çoğu zaman bir labirente dönüşür. Fransa'daki grup şirketimiz Inter-Trans MMS, kayıtlı gümrük temsilcisi sıfatıyla gümrük işlemlerinizi sizin için gerçekleştirir; mallarınızın izlenmesinde ve geçtiği tüm ülkelerdeki uyumluluğunda sürekli güvende olmanızı sağlar.",
      "Fransa'daki konteyner varışlarından itibaren ithalat ve transit gümrükleme, dokümantasyon, süreç takibi ve lojistik paydaşların koordinasyonu tarafımızca yürütülür. Gümrükleme sonrası mallar depolamaya alınır veya doğrudan teslimata hazırlanır.",
    ],
    features: [
      ["file-earmark-check", "Gümrük Beyannamesi", "İthalat ve transit beyanlarının profesyonel hazırlığı."],
      ["patch-check", "Kayıtlı Temsilci", "Fransa'da kayıtlı gümrük temsilciliği (représentant en douane)."],
      ["shield-lock", "Uyumluluk", "Ülkelere göre değişen mevzuata tam uyum."],
      ["truck-flatbed", "Transit İşlemleri", "T1/T2 ortak transit rejimlerinde uzman destek."],
      ["archive", "Özel Rejimler", "Antrepo, geçici ithalat ve gümrük özel rejimleri."],
      ["search", "Tam İzlenebilirlik", "Varış, gümrükleme ve teslim sürecinde tam görünürlük."],
    ],
    heroImage: IMG.customsHero,
  }),
});

/* ---------- LOJISTIK & DEPOLAMA ---------- */
pages.push({
  slug: "/lojistik",
  title: "Lojistik & Depolama",
  description:
    "Louvres'daki 2.300 m² tesisimizde depolama, mal kabul, sipariş hazırlama, stok yönetimi ve sevkiyat planlama.",
  body:
    servicePage({
      icon: "box-seam",
      title: "Lojistik & Depolama",
      lead: "Tedarik zincirinizin her halkasında verimli, güvenli ve izlenebilir lojistik çözümler.",
      paragraphs: [
        "Louvres'ta bulunan yaklaşık 2.300 m² depolama tesisimiz, Fransa'daki lojistik operasyonlarımızın merkezi olarak kullanılmaktadır. Yüklerinizin kabulünden sevkine kadar tüm süreçleri profesyonelce yönetiyoruz.",
        "Tesisimizde kuru gıda ve gıda ambalajlarının depolanması, tehlikesiz endüstriyel ürünlerin depolanması, mal kabul ve kontrol, sipariş hazırlama, stok yönetimi, sevkiyat planlama ve özmal filomuzla sevkiyat organizasyonu hizmetleri sunulmaktadır.",
      ],
      features: [
        ["building", "2.300 m² Tesis", "Louvres'da güvenli ve modern depolama alanı."],
        ["clipboard-check", "Stok Yönetimi", "Anlık stok görünürlüğü ve düzenli sayım raporları."],
        ["box2-heart", "Sipariş Hazırlama", "Mal kabul, kontrol ve sipariş hazırlama operasyonları."],
        ["tags", "Etiketleme & Paketleme", "İhracat/ithalat standartlarına uygun paketleme ve etiketleme."],
        ["send-check", "Sevkiyat Planlama", "Özmal filoyla entegre sevkiyat organizasyonu."],
        ["people", "Tek Muhatap", "Tüm operasyon için tek temas noktasıyla süreç kolaylığı."],
      ],
      heroImage: IMG.warehouse,
    }) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-facility">
                        <div class="row align-items-center gy-4 position-relative" style="z-index:2">
                            <div class="col-lg-5">
                                <span class="eyebrow" style="color:#fff">Louvres Depolama Tesisi</span>
                                <span class="ayl-facility-size">2.300 m²</span>
                                <p class="mt-3">Fransa'daki lojistik operasyonlarımızın merkezi; depolama, sipariş hazırlama ve sevkiyat tek noktada.</p>
                            </div>
                            <div class="col-lg-7">
                                <div class="row">
                                    <div class="col-md-6">
                                        <ul>
                                            <li>Kuru gıda ve gıda ambalajı depolama</li>
                                            <li>Tehlikesiz endüstriyel ürünler</li>
                                            <li>Mal kabul ve kontrol</li>
                                        </ul>
                                    </div>
                                    <div class="col-md-6">
                                        <ul>
                                            <li>Sipariş hazırlama</li>
                                            <li>Stok yönetimi</li>
                                            <li>Sevkiyat planlama</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>`,
});

/* ---------- ULUSAL ---------- */
pages.push({
  slug: "/ulusal",
  title: "Ulusal Taşımacılık",
  description:
    "Türkiye genelinde toplama ve dağıtım, Fransa genelinde özmal filo ile ulusal taşımacılık ve nihai teslimat.",
  body: servicePage({
    icon: "geo-alt",
    title: "Ulusal Taşımacılık",
    lead: "Türkiye genelinde yük toplama, Fransa genelinde dağıtım: iki ülkede de ulusal taşımacılık gücü.",
    paragraphs: [
      "Türkiye'de tüm ülke genelindeki tedarikçilerden yüklerin toplanmasını ve limanlara sevkini organize ediyoruz. Şehirler arası sevkiyatlardan kapıdan kapıya teslimatlara kadar esnek ve zamanında lojistik çözümler sunuyoruz.",
      "Fransa ayağında grup şirketimiz Transport Claval, konteynerlerin limanlardan alınması, Fransa genelinde karayolu taşımacılığı, dağıtım ve nihai teslimat operasyonlarını özmal filosuyla gerçekleştirir.",
    ],
    features: [
      ["geo", "Türkiye Geneli", "İzmir merkezli, Türkiye'nin tamamını kapsayan toplama ağı."],
      ["flag", "Fransa Geneli", "Özmal filoyla Fransa genelinde dağıtım ve nihai teslimat."],
      ["lightning-charge", "Ekspres Sevkiyat", "Acil ve zaman kritik gönderiler için hızlı teslim."],
      ["house-door", "Kapıdan Kapıya", "Alıcı ve gönderici adresleri arasında tam hizmet."],
      ["boxes", "Komple & Parsiyel", "FTL ve LTL hizmetleriyle hacme uygun en ekonomik çözüm."],
      ["telephone", "Tek Muhatap", "Sevkiyatınıza özel ayrılmış tek kontak noktası."],
    ],
    heroImage: IMG.national,
  }),
});

/* ---------- HAVAYOLU ---------- */
pages.push({
  slug: "/havayolu",
  title: "Havayolu Taşımacılığı",
  description:
    "Zaman kritik ve yüksek değerli gönderiler için hızlı, güvenli ve izlenebilir hava kargo çözümleri.",
  body: servicePage({
    icon: "airplane",
    title: "Havayolu Taşımacılığı",
    lead: "Zaman kritik ve yüksek değerli yükleriniz için hızlı, güvenli ve izlenebilir hava kargo çözümleri.",
    paragraphs: [
      "Dünya genelinde seçilmiş havayolu şirketleri ve IATA akreditasyonlu partnerlerimizle birlikte havayolu taşımacılığı operasyonlarınızı planlıyor ve yönetiyoruz.",
      "Acil ve programlı sevkiyatlarda gönderilerinizin alımından teslimine kadar uçtan uca süreç takibini sağlıyor; yüksek güvenlik standartlarını koruyarak en kısa transit sürelerini elde ediyoruz.",
    ],
    features: [
      ["lightning-charge", "Hızlı Transit", "Zaman kritik gönderiler için en uygun rotalar ve direkt bağlantılar."],
      ["shield-check", "Güvenli Taşıma", "Yüksek değerli ve hassas yüklerde sıkı güvenlik protokolleri."],
      ["globe2", "Dünya Çapında Ağ", "Uluslararası havayolu partnerlerimizle global hat kapsama alanı."],
      ["clipboard-data", "Şeffaf Takip", "Gönderi durumunuz hakkında uçuştan teslime anlık bilgilendirme."],
      ["box2", "Konsolide & Direkt", "Konsolide (groupage), direkt ve back-to-back sevkiyat seçenekleri."],
      ["file-earmark-text", "Dokümantasyon Desteği", "Havayolu konşimentosu (AWB), fatura ve sertifikaların eksiksiz hazırlığı."],
    ],
    heroImage: IMG.airHero,
  }),
});

/* ---------- GALERI ---------- */
const GALLERY = [
  ["Konteyner Terminali", IMG.port.replace("w=1200", "w=900")],
  ["Liman Operasyonu", IMG.sea.replace("w=1200", "w=900")],
  ["Karayolu Filomuz", IMG.road.replace("w=1200", "w=900")],
  ["Depolama Alanı", IMG.warehouse.replace("w=1200", "w=900")],
  ["Gümrük İşlemleri", IMG.customs.replace("w=1200", "w=900")],
  ["Ulusal Dağıtım", IMG.national.replace("w=1200", "w=900")],
  ["Havayolu Operasyonu", IMG.air.replace("w=1200", "w=900")],
  ["Lojistik Ekibimiz", "https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=900"],
];

pages.push({
  slug: "/galeri",
  title: "Foto Galeri",
  description: "Ayliz Lojistik operasyonlarından kareler: filo, liman, depo ve saha çalışmaları.",
  body:
    pageHeader("Foto Galeri", [["Anasayfa", "/"], "Foto Galeri"]) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Galerimiz</span>
                        <h2>Operasyonlarımızdan Kareler</h2>
                        <p>Filomuz, depo operasyonlarımız ve sahadan anlara bir bakış.</p>
                    </div>
                    <div class="row g-3">
                        ${GALLERY.map(
                          ([caption, src]) => `<div class="col-md-6 col-lg-3">
                            <div class="ayl-gallery-item">
                                <img src="${src}" alt="${caption}" loading="lazy">
                                <div class="ayl-gallery-caption">${caption}</div>
                            </div>
                        </div>`
                        ).join("\n                        ")}
                    </div>
                </div>
            </section>
        </div>`,
});

/* ---------- AGIMIZ ---------- */
pages.push({
  slug: "/agimiz",
  title: "Ağımız",
  description:
    "Türkiye yükleme limanları, Fransa ve Belçika varış limanları ile Louvres merkezli Fransa dağıtım ağımız.",
  body:
    pageHeader("Ağımız", [["Anasayfa", "/"], "Ağımız"]) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Operasyon Ağımız</span>
                        <h2>Türkiye Merkezli, Fransa'da Yerleşik</h2>
                        <p>Türkiye'nin tamamında yük toplama, başlıca limanlardan haftalık çıkışlar ve Fransa genelinde özmal filoyla dağıtım.</p>
                    </div>
                    <div class="row g-4">
                        ${[
                          ["flag", "Türkiye", "Yükleme ve konteyner organizasyonu; merkez İzmir Karşıyaka.", ["Tüm Türkiye'de yük toplama", "Konteyner yükleme planlaması", "İhracat süreç koordinasyonu"]],
                          ["geo-alt-fill", "Fransa", "Gümrükleme, depolama ve nihai teslimat; merkez Louvres.", ["Kayıtlı gümrük temsilciliği", "2.300 m² Louvres deposu", "Özmal filoyla ulusal dağıtım"]],
                          ["map", "Avrupa & Benelüks", "Anvers hattı ve Avrupa karayolu bağlantıları.", ["Anvers (Belçika) varış limanı", "Le Havre ve Fos limanları", "Avrupa karayolu bağlantıları"]],
                        ]
                          .map(
                            ([icon, title, text, items]) => `<div class="col-lg-4 col-md-6">
                            <div class="ayl-region-card">
                                <div class="ayl-region-flag"><i class="bi bi-${icon}"></i></div>
                                <h5>${title}</h5>
                                <p class="text-muted mb-2">${text}</p>
                                <ul>
                                    ${items.map((i) => `<li><i class="bi bi-dot"></i> ${i}</li>`).join("\n                                    ")}
                                </ul>
                            </div>
                        </div>`
                          )
                          .join("\n                        ")}
                    </div>
                </div>
            </section>

            <section class="ayl-section ayl-section-soft">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Liman Ağımız</span>
                        <h2>Yükleme ve Varış Limanları</h2>
                        <p>Türkiye'nin başlıca limanlarından haftalık çıkışlar; Fransa ve Belçika'da partner varış limanları.</p>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-7">
                            <div class="ayl-port-card">
                                <h4><i class="bi bi-box-arrow-up"></i> Yükleme Limanları (Türkiye)</h4>
                                <ul class="ayl-port-list">${LOAD_PORTS.map((p) => `<li>${p}</li>`).join("")}</ul>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="ayl-port-card is-dest">
                                <h4><i class="bi bi-box-arrow-in-down"></i> Varış Limanları (Avrupa)</h4>
                                <ul class="ayl-port-list">${DEST_PORTS.map((p) => `<li>${p}</li>`).join("")}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="ayl-section">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">Entegre Lojistik Zincirimiz</span>
                        <h2>Yükten Teslimata Akış</h2>
                    </div>
                    <div class="ayl-chain">${chainFlow()}
                    </div>
                </div>
            </section>

            <section class="ayl-section ayl-section-soft">
                <div class="container">
${ctaBanner("Hattımızdaki yükleriniz için fiyat teklifi alın.", "Yükleme limanı, varış limanı ve yük detaylarınızı paylaşın; en uygun çözümü sunalım.")}
                </div>
            </section>
        </div>`,
});

/* ---------- TEKLIF AL ---------- */
pages.push({
  slug: "/teklif-al",
  title: "Teklif Al",
  description:
    "Türkiye – Fransa hattındaki sevkiyatlarınız için hızlı fiyat teklifi alın.",
  body:
    pageHeader("Teklif Al", [["Anasayfa", "/"], "Teklif Al"]) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section">
                <div class="container">
                    <div class="row g-5">
                        <div class="col-lg-5">
                            <span class="eyebrow">Fiyat Teklifi</span>
                            <h2 class="mt-2">Operasyonunuza Özel Teklif</h2>
                            <p class="text-muted">Aşağıdaki formu doldurun, uzman ekibimiz en kısa sürede size dönüş yaparak ihtiyacınıza en uygun çözümü sunsun. Tüm bilgileriniz gizli tutulur.</p>
                            <div class="ayl-feature-box mt-4">
                                <i class="bi bi-telephone-fill"></i>
                                <div>
                                    <h5>Acil durumlar için</h5>
                                    <p><a href="${SITE.phoneHref}" style="color:var(--ayl-blue);font-weight:600">${SITE.phone}</a></p>
                                </div>
                            </div>
                            <div class="ayl-feature-box mt-3">
                                <i class="bi bi-envelope-fill"></i>
                                <div>
                                    <h5>E-posta ile</h5>
                                    <p><a href="mailto:${SITE.email}" style="color:var(--ayl-blue);font-weight:600">${SITE.email}</a></p>
                                </div>
                            </div>
                            <div class="ayl-feature-box mt-3">
                                <i class="bi bi-geo-alt-fill"></i>
                                <div>
                                    <h5>Ofisimiz</h5>
                                    <p>${SITE.addressShort}<br>${SITE.addressCity}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <form class="ayl-form-card" data-ayl-form data-ayl-subject="Teklif Talebi - Ayliz Lojistik" data-ayl-to="${SITE.email}" novalidate>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-ad">Ad Soyad *</label>
                                        <input type="text" class="form-control" id="ayl-ad" name="Ad Soyad" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-firma">Firma</label>
                                        <input type="text" class="form-control" id="ayl-firma" name="Firma">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-mail">E-posta *</label>
                                        <input type="email" class="form-control" id="ayl-mail" name="E-posta" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-tel">Telefon</label>
                                        <input type="tel" class="form-control" id="ayl-tel" name="Telefon">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-hizmet">Hizmet Türü *</label>
                                        <select class="form-select" id="ayl-hizmet" name="Hizmet Türü" required>
                                            <option value="">Seçiniz</option>
                                            <option>Denizyolu Taşımacılığı</option>
                                            <option>Karayolu Taşımacılığı</option>
                                            <option>Gümrük İşlemleri</option>
                                            <option>Lojistik &amp; Depolama</option>
                                            <option>Ulusal Taşımacılık</option>
                                            <option>Havayolu Taşımacılığı</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-mod">Yön</label>
                                        <select class="form-select" id="ayl-mod" name="Yön">
                                            <option value="">Seçiniz</option>
                                            <option>İhracat (Türkiye → Fransa)</option>
                                            <option>İthalat (Fransa → Türkiye)</option>
                                            <option>Ulusal</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-cikis">Yükleme Limanı / Çıkış Noktası</label>
                                        <input type="text" class="form-control" id="ayl-cikis" name="Yükleme Limanı" list="ayl-load-ports" placeholder="Örn. Aliağa">
                                        <datalist id="ayl-load-ports">${LOAD_PORTS.map((p) => `<option value="${p}"></option>`).join("")}</datalist>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-varis">Varış Limanı / Teslim Noktası</label>
                                        <input type="text" class="form-control" id="ayl-varis" name="Varış Limanı" list="ayl-dest-ports" placeholder="Örn. Fos / Marsilya">
                                        <datalist id="ayl-dest-ports">${DEST_PORTS.map((p) => `<option value="${p}"></option>`).join("")}</datalist>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label" for="ayl-konteyner">Konteyner Adedi</label>
                                        <input type="number" class="form-control" id="ayl-konteyner" name="Konteyner Adedi" min="0">
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label" for="ayl-agirlik">Ağırlık (kg)</label>
                                        <input type="number" class="form-control" id="ayl-agirlik" name="Ağırlık (kg)" min="0">
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label" for="ayl-hacim">Hacim (m³)</label>
                                        <input type="number" step="0.01" class="form-control" id="ayl-hacim" name="Hacim (m3)" min="0">
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label" for="ayl-mesaj">Mesajınız</label>
                                        <textarea class="form-control" id="ayl-mesaj" name="Mesaj" rows="4" placeholder="Yük detayları, ürün grubu, özel gereksinimler vb."></textarea>
                                    </div>
                                    <div class="col-12 d-flex align-items-center gap-3 flex-wrap">
                                        <button type="submit" class="ayl-btn ayl-btn-primary"><i class="bi bi-send"></i> Teklif Talep Et</button>
                                        <small class="text-muted">* ile işaretli alanlar zorunludur.</small>
                                    </div>
                                    <div class="col-12"><div class="ayl-form-status" role="status"></div></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>`,
});

/* ---------- ILETISIM ---------- */
pages.push({
  slug: "/iletisim",
  title: "İletişim",
  description:
    "Ayliz Lojistik iletişim bilgileri: İzmir Karşıyaka merkez ofis, telefon, e-posta ve Fransa grup şirketleri.",
  body:
    pageHeader("İletişim", [["Anasayfa", "/"], "İletişim"]) +
    `
        <div class="ayl-wrapper">
            <section class="ayl-section">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-lg-5">
                            <div class="ayl-contact-info">
                                <h3>Bize Ulaşın</h3>
                                <p style="color:#cdd5e0">Sorularınız için lütfen bizimle iletişime geçin. Uzman ekibimiz en kısa sürede dönüş yapacaktır.</p>

                                <div class="ayl-info-item">
                                    <i class="bi bi-geo-alt-fill"></i>
                                    <div>
                                        <strong>Adres</strong>
                                        <span>${SITE.addressShort}<br>${SITE.addressCity}</span>
                                    </div>
                                </div>
                                <div class="ayl-info-item">
                                    <i class="bi bi-telephone-fill"></i>
                                    <div>
                                        <strong>Telefon</strong>
                                        <a href="${SITE.phoneHref}">${SITE.phone}</a>
                                    </div>
                                </div>
                                <div class="ayl-info-item">
                                    <i class="bi bi-envelope-fill"></i>
                                    <div>
                                        <strong>E-posta</strong>
                                        <a href="mailto:${SITE.email}">${SITE.email}</a>
                                    </div>
                                </div>
                                <div class="ayl-info-item">
                                    <i class="bi bi-clock-fill"></i>
                                    <div>
                                        <strong>Çalışma Saatleri</strong>
                                        <span>${SITE.hours}<br>Operasyonlarda 7/24 destek</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <form class="ayl-form-card h-100" data-ayl-form data-ayl-subject="Web Sitesi İletişim Formu" data-ayl-to="${SITE.email}" novalidate>
                                <h3 class="mb-3">Bize Mesaj Gönderin</h3>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-c-ad">Ad Soyad *</label>
                                        <input type="text" class="form-control" id="ayl-c-ad" name="Ad Soyad" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-c-mail">E-posta *</label>
                                        <input type="email" class="form-control" id="ayl-c-mail" name="E-posta" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-c-tel">Telefon</label>
                                        <input type="tel" class="form-control" id="ayl-c-tel" name="Telefon">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="ayl-c-konu">Konu</label>
                                        <input type="text" class="form-control" id="ayl-c-konu" name="Konu">
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label" for="ayl-c-mesaj">Mesajınız *</label>
                                        <textarea class="form-control" id="ayl-c-mesaj" name="Mesaj" rows="5" required></textarea>
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="ayl-btn ayl-btn-primary"><i class="bi bi-send"></i> Mesajı Gönder</button>
                                    </div>
                                    <div class="col-12"><div class="ayl-form-status" role="status"></div></div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- GRUP OFISLERI -->
                    <div class="row g-4 mt-1">
                        ${COMPANIES.map(
                          (c) => `<div class="col-lg-4 col-md-6">
                            <div class="ayl-office-card${c.fr ? " is-fr" : ""}">
                                <div class="ayl-office-head">
                                    <div class="ayl-office-icon"><i class="bi bi-${c.icon}"></i></div>
                                    <div>
                                        <span class="ayl-office-country">${c.flag}</span>
                                        <h5>${c.name}</h5>
                                    </div>
                                </div>
                                <ul class="ayl-office-list">
                                    ${c.meta
                                      .filter(([, k]) => ["Adres", "Telefon", "E-posta"].includes(k))
                                      .map(([i, k, v]) => {
                                        const link =
                                          k === "Telefon"
                                            ? `<a href="tel:${v.replace(/[^0-9+]/g, "")}">${v}</a>`
                                            : k === "E-posta"
                                            ? `<a href="mailto:${v}">${v}</a>`
                                            : v;
                                        return `<li><i class="bi bi-${i}"></i><span>${link}</span></li>`;
                                      })
                                      .join("\n                                    ")}
                                </ul>
                            </div>
                        </div>`
                        ).join("\n                        ")}
                    </div>

                    <!-- HARITA -->
                    <div class="row mt-5">
                        <div class="col-12">
                            <div class="rounded-4 overflow-hidden shadow-sm" style="border:1px solid var(--ayl-border)">
                                <iframe
                                    title="Ayliz Lojistik Konum"
                                    src="${MAP_EMBED}"
                                    width="100%" height="380" style="border:0;display:block" allowfullscreen="" loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>`,
});

/* =========================================================================
 *  YAZIM
 * ========================================================================= */
function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(SRC, "assets"), path.join(OUT, "assets"), { recursive: true });

for (const page of pages) {
  const html = layout(page);
  const dir = page.slug === "/" ? OUT : path.join(OUT, page.slug.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
  console.log("  ✓", page.slug === "/" ? "/index.html" : page.slug + "/index.html");
}

/* 404 */
fs.writeFileSync(
  path.join(OUT, "404.html"),
  layout({
    slug: "/404",
    title: "Sayfa Bulunamadı",
    description: "Aradığınız sayfa bulunamadı.",
    body: `
        <div class="ayl-wrapper">
            <section class="ayl-section text-center">
                <div class="container">
                    <div class="ayl-section-title">
                        <span class="eyebrow">404</span>
                        <h2>Aradığınız sayfa bulunamadı</h2>
                        <p>Sayfa taşınmış veya adres hatalı olabilir. Anasayfadan devam edebilirsiniz.</p>
                    </div>
                    <a href="${u("/")}" class="ayl-btn ayl-btn-primary"><i class="bi bi-house"></i> Anasayfaya Dön</a>
                </div>
            </section>
        </div>`,
  }),
  "utf8"
);

/* robots + sitemap */
const base = SITE.domain.replace(/\/$/, "");
fs.writeFileSync(
  path.join(OUT, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
  "utf8"
);
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${base}${u(p.slug)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${
        p.slug === "/" ? "1.0" : "0.8"
      }</priority></url>`
  )
  .join("\n")}
</urlset>
`,
  "utf8"
);

console.log(`\n${pages.length} sayfa + 404 + robots.txt + sitemap.xml -> dist/`);
