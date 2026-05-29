let donmeDerecesi = 0;
let carkDonuyorMu = false;

document.addEventListener("DOMContentLoaded", function() {
window.carkicevir=function() {
    if (carkDonuyorMu) return;

    const cark = document.getElementById("cark");
    const sonuc = document.getElementById("cark-sonuc");

    if (!cark || !sonuc){
        console.error("Çark veya sonuç elementi bulunamadı.");
        return;
    }
    carkDonuyorMu = true;
    cark.style.transition = "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)";

    const rastgeleDerece = Math.floor(Math.random() * 360)+1800;
    donmeDerecesi += rastgeleDerece;

    cark.style.transform = `rotate(${donmeDerecesi}deg)`;

    sonuc.innerText="Çark dönüyor...";
    sonuc.style.color="#ff6b6b";
    setTimeout(() => {
        const asilAci = donmeDerecesi % 360 ;
        if (asilAci >= 0 && asilAci < 90) {
            sonuc.innerText = "Tebrikler! %10 indirim kazandınız! Kupon:ILMEK10";
        } else if (asilAci >= 90 && asilAci < 180) {
            sonuc.innerText="Pas! Tekrar deneyin." ;
        } else if (asilAci >= 180 && asilAci < 270) {
            sonuc.innerText="Tebrikler! %20 indirim kazandınız! Kupon:ILMEK20";
        } else {
            sonuc.innerText="Tebrikler! Bedava Kargo kazandınız! Kupon:BDVKARGO";
        }

        sonuc.style.color="#1dd1a1";
        carkDonuyorMu = false;
    }
, 4000);
}
});


document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");


    if(menuToggle && navLinks){
        menuToggle.addEventListener("click", function(e) {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });
    }

    document.addEventListener("click", function(event) {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
        }
    });


    
});

document.addEventListener("DOMContentLoaded", function() {
    const urunlerGrid = document.getElementById("urunlerGrid");
   
    const elEmegiUrunler = [
        { id: 1, ad: "Arılı Anahtarlık", fiyat: 100, gorsel: "../images/AriliAnahtarlik.jpg" },
        { id: 2, ad: "Ayçiçeği Anahtarlık", fiyat: 100, gorsel: "../images/AycicegiAnahtarlik.jpg" },
        { id: 3, ad: "Ayçiçeği Çanta", fiyat: 700, gorsel: "../images/AycicegiCanta.jpg" },
        { id: 4, ad: "Beyaz Ahtapot Anahtarlık", fiyat: 100, gorsel: "../images/BeyazAhtapot.jpg" },
        { id: 5, ad: "Beyaz Kurdele Anahtarlık", fiyat: 150, gorsel: "../images/BeyazKurdeleAnahtarlik.jpg" },
        { id: 6, ad: "Beyaz Tavşan", fiyat: 1000, gorsel: "../images/BuyukTavsan.jpg" },
        { id: 7, ad: "Pembe Elbiseli Tavşan", fiyat: 650, gorsel: "../images/PembeElbiseliTavsan.jpg" },
        { id: 8, ad: "Pembe Kalpli Anahtarlık", fiyat: 150, gorsel: "../images/PembeKalpliAnahtarlık.jpg" },
        { id: 9, ad: "Pembe Tulumlu Tavşan", fiyat: 650, gorsel: "../images/PembeTulumluTavsan.jpg" }
    ];
   if (urunlerGrid) {
        urunlerGrid.innerHTML = "";

        elEmegiUrunler.forEach(urun => {
            const kart = document.createElement("div");
            kart.className = "product-card";
            
            kart.innerHTML = `
                <img src="${urun.gorsel}" alt="${urun.ad}" class="product-img" onclick="sayfayaGit('${urun.ad}')" style="cursor:pointer;">
                <div class="product-info">
                    <h4>${urun.ad}</h4>
                    <div class="price">${urun.fiyat} TL</div>
                    <button class="sepet-btn" onclick="sepeteEkle(${urun.id})">Sepete Ekle</button>
                </div>
            `;
            urunlerGrid.appendChild(kart);
        });
        window.sayfayaGit = function(urunAdi) {
            if (urunAdi === "Arılı Anahtarlık") {
                window.location.href = "arili-anahtarlik.html";
            } else if (urunAdi === "Ayçiçeği Anahtarlık") {
                window.location.href = "aycicegi-anahtarlik.html";
            } else if (urunAdi === "Ayçiçeği Çanta") {
                window.location.href = "aycicegi-canta.html";
            } else if (urunAdi === "Beyaz Ahtapot Anahtarlık") {
                window.location.href = "beyaz-ahtapot.html";
            } else if (urunAdi === "Beyaz Kurdele Anahtarlık") {
                window.location.href = "beyaz-kurdele.html";
            } else if (urunAdi === "Beyaz Tavşan") {
                window.location.href = "beyaz-tavsan.html";
            } else if (urunAdi === "Pembe Elbiseli Tavşan") {
                window.location.href = "pembe-elbiseli-tavsan.html";
            } else if (urunAdi === "Pembe Kalpli Anahtarlık") {
                window.location.href = "pembe-kalpli-anahtarlik.html";
            } else if (urunAdi === "Pembe Tulumlu Tavşan") {
                window.location.href = "pembe-tulumlu-tavsan.html";
            }
        };
    }
        window.sepeteEkle=function(urunId) {
            const secilenUrun = elEmegiUrunler.find(u => u.id === urunId);

            let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

            const varMi=sepet.find(item => item.id === urunId);
            if (varMi) {
                varMi.adet += 1;
            } 
            else {
                sepet.push({...secilenUrun, adet: 1});
            }
            localStorage.setItem("sepet", JSON.stringify(sepet));
            alert(`${secilenUrun.ad} sepete eklendi!`);
        };
    

    const sepetTabloGövde=document.getElementById("sepetTabloGövde");
    const toplamFiyatAlani=document.getElementById("toplamFiyat");
    if (sepetTabloGövde ) {
        window.sepetiListele=function() {
            let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
            sepetTabloGövde.innerHTML = "";
            let genelToplam = 0;
            let toplamFiyat = 0;
            if (sepet.length === 0) {
                sepetTabloGövde.innerHTML = "<tr><td colspan='5'>Sepetiniz boş.</td></tr>";
                if (toplamFiyatAlani) {toplamFiyatAlani.innerText = "Toplam: 0 TL";}
                return;
            }
            sepet.forEach(urun => {
                const urunToplam = urun.fiyat * urun.adet;
                genelToplam += urunToplam;
                const satir = document.createElement("tr");
                satir.innerHTML = `
                    <td><img src="${urun.gorsel}" style="width:60px; height:60px; object-fit:cover; border-radius:8px;"></td>
                    <td><strong style="color:#333;">${urun.ad}</strong></td>
                    <td>${urun.fiyat} TL</td>
                    <td>${urun.adet} Adet</td>
                    <td><strong>${urunToplam} TL</strong></td>
                    <td><button onclick="sepettenSil(${urun.id})" style="background:#ff6b6b; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Sil</button></td>
                `;
                sepetTabloGövde.appendChild(satir);
            });
            if (toplamFiyatAlani) toplamFiyatAlani.innerText = genelToplam+` TL`;
        
        };
        window.sepettenSil = function(urunId) {
            let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
            sepet = sepet.filter(item => item.id !== urunId);
            localStorage.setItem("sepet", JSON.stringify(sepet));
            sepetiListele(); 
        };
        window.sepetiBosalt=function() {
        alert("Siparişiniz başarıyla tamamlandı! Alışverişiniz için teşekkür ederiz.");
        localStorage.removeItem("sepet");
         sepetiListele();
        };
        sepetiListele();
    }
});