# Ayliz Lojistik — Kurumsal Web Sitesi

WordPress/Flatsome eklentisinden bağımsız, saf **HTML + CSS + JS + Bootstrap 5** ile yeniden yazılmış statik site.
Mevcut `webretawork2.com.tr/aylizlojistik` tasarımı birebir korunmuş, içerik grup yapısına (Ayliz Lojistik –
Inter-Trans MMS – Transport Claval) göre güncellenmiştir.

## Yapı

```
build.mjs              Tüm sayfa içerikleri + statik site üretici (tek dosya, bağımlılık yok)
src/assets/css/style.css   Kurumsal stil (orijinal eklenti CSS'i + yeni bileşenler)
src/assets/js/main.js      Offcanvas menü, aktif link, form davranışı
src/assets/img/logo.png    Site logosu
dist/                  Üretilen çıktı (git'e girmez)
Dockerfile             node build -> nginx (EasyPanel için hazır)
nginx.conf             Temiz URL, gzip, cache ve güvenlik başlıkları
```

## Sayfalar

| URL | Sayfa |
| --- | --- |
| `/` | Anasayfa |
| `/hakkimizda/` | Hakkımızda (tarihçe, misyon/vizyon) |
| `/grup/` | Grup Şirketlerimiz (3 şirket + zincir + Louvres deposu) |
| `/hizmetlerimiz/` | Tüm hizmetler |
| `/denizyolu/` `/karayolu/` `/gumruk/` `/lojistik/` `/ulusal/` `/havayolu/` | Hizmet detay sayfaları |
| `/galeri/` | Foto galeri |
| `/agimiz/` | Ağımız (bölgeler + liman ağı) |
| `/teklif-al/` | Teklif formu |
| `/iletisim/` | İletişim + harita + grup ofisleri |

Ayrıca `404.html`, `robots.txt`, `sitemap.xml` üretilir.

## Geliştirme

```bash
node build.mjs          # dist/ üret
npm run serve           # üret + http://localhost:3000 üzerinde yayınla
```

İçerik değişiklikleri `build.mjs` içindeki `SITE`, `SERVICES`, `COMPANIES`, `CHAIN`,
`LOAD_PORTS`, `DEST_PORTS` sabitlerinden ve sayfa gövdelerinden yapılır.

## Docker

```bash
docker build -t ayliz-lojistik .
docker run --rm -p 8080:80 ayliz-lojistik      # http://localhost:8080
# veya
docker compose up --build
```

## EasyPanel ile deploy

1. Projeyi GitHub'a push edin.
2. EasyPanel → **Create Service → App**.
3. **Source**: GitHub → repo + branch (`main`).
4. **Build**: `Dockerfile` (repo kökündeki Dockerfile otomatik bulunur, ek ayar gerekmez).
5. **Port**: `80` (container portu). EasyPanel proxy'si 80/443'ü kendisi karşılar.
6. **Domains**: `aylizlojistik.com` + `www.aylizlojistik.com` ekleyip Let's Encrypt sertifikasını açın.
7. Deploy. Sonraki her push'ta yeniden deploy yeterlidir.

İsteğe bağlı ortam değişkeni:

| Değişken | Varsayılan | Açıklama |
| --- | --- | --- |
| `SITE_URL` | `https://aylizlojistik.com` | canonical / og:url / sitemap adresleri (build aşamasında okunur) |

Farklı bir domain kullanılacaksa EasyPanel'de **Build → Build Args** kısmına eklemek yerine
`Dockerfile` içindeki build satırını `RUN SITE_URL=https://alan-adi.com node build.mjs` şeklinde
güncellemek en pratik yoldur.

## Notlar

- Görseller orijinal sitedeki Pexels adresleriyle birebir aynıdır (CDN'den yüklenir).
  Tamamen kendi sunucunuzda barındırmak isterseniz görselleri `src/assets/img/` altına indirip
  `build.mjs` içindeki `IMG` sabitini güncellemek yeterlidir.
- Bootstrap 5.3.2 ve Bootstrap Icons 1.11.2 jsDelivr CDN'den yüklenir (orijinal sitedeki sürümlerle aynı).
- Formların şu an backend'i yoktur; gönderim, girilen bilgilerle e-posta taslağı açar
  (`operasyon@aylizlojistik.com`). PHP/SMTP veya Formspree benzeri bir servise bağlanabilir.
