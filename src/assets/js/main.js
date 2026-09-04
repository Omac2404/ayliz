/* Ayliz Lojistik - hafif davranis kodu */
document.addEventListener("DOMContentLoaded", function () {
    // Offcanvas / mobil sidebar - bir linke tiklaninca kapat (dropdown-toggle haric)
    document.querySelectorAll(".ayl-offcanvas .nav-link:not(.dropdown-toggle), .ayl-offcanvas .dropdown-item, .ayl-offcanvas .ayl-btn").forEach(function (l) {
        l.addEventListener("click", function () {
            var oc = document.getElementById("aylOffcanvasNav");
            if (oc && oc.classList.contains("show")) {
                var inst = bootstrap.Offcanvas.getInstance(oc);
                if (inst) { inst.hide(); }
            }
        });
    });

    // Aktif link (URL path eslesmesi)
    try {
        var path = window.location.pathname.replace(/\/+$/, "") || "/";
        document.querySelectorAll(".ayl-offcanvas .nav-link, .ayl-offcanvas .dropdown-item").forEach(function (a) {
            var href = (a.getAttribute("href") || "").replace(/\/+$/, "");
            if (!href || href === "#") { return; }
            if (href === "" ? path === "/" : path === href) {
                a.classList.add("active");
                var parent = a.closest(".dropdown");
                if (parent) {
                    var toggle = parent.querySelector(".dropdown-toggle");
                    if (toggle) { toggle.classList.add("active"); }
                }
            }
        });
    } catch (e) {}

    // Formlar: statik sunucuda backend yok, kullaniciya net geri bildirim ver
    document.querySelectorAll("form[data-ayl-form]").forEach(function (form) {
        form.addEventListener("submit", function (ev) {
            ev.preventDefault();
            var status = form.querySelector(".ayl-form-status");
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            var data = new FormData(form);
            var lines = [];
            data.forEach(function (value, key) {
                if (String(value).trim() !== "") {
                    lines.push(key + ": " + value);
                }
            });
            var subject = form.getAttribute("data-ayl-subject") || "Web sitesi formu";
            var mailto = "mailto:" + (form.getAttribute("data-ayl-to") || "operasyon@aylizlojistik.com") +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(lines.join("\n"));
            if (status) {
                status.className = "ayl-form-status is-ok";
                status.textContent = "Talebiniz hazırlandı. E-posta uygulamanız açılıyor; açılmazsa operasyon@aylizlojistik.com adresine doğrudan yazabilirsiniz.";
            }
            window.location.href = mailto;
        });
    });
});
