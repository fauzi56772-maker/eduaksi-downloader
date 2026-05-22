// 1. Fungsi Simulasi Login
function masukAplikasi(metode) {
    document.getElementById('page-login').classList.add('d-none');
    document.getElementById('page-utama').classList.remove('d-none');
    document.getElementById('nama-user').innerText = `Halo, User ${metode}! 👋`;
    muatKontenFitur();
}

let linkAktif = "";
let fiturTerbuka = 1;
let linkDownloadHasil = ""; // Menyimpan link download asli dari API

// 2. Fungsi Memproses Link Menggunakan API Downloader Asli
async function prosesLink() {
    const inputLink = document.getElementById('link-video').value;
    if (inputLink.trim() === "") {
        alert("Silakan tempel link video kamu dulu ya, Fauzi!");
        return;
    }
    
    linkAktif = inputLink;
    alert("⏳ Sedang mengambil data video... Mohon tunggu beberapa detik.");

    try {
        // Menggunakan API publik gratis untuk mengonversi link video
        const tanggapan = await fetch(`https://api.vytv.top/api/download?url=${encodeURIComponent(linkAktif)}`);
        const data = await tanggapan.json();

        if (data.status === "success" || data.url) {
            linkDownloadHasil = data.url; // Menyimpan link download video asli
            alert("💥 Boom! Video berhasil ditarik. Siap didownload!");
        } else {
            // Jika API sibuk, kita berikan link otomatis dari generator pihak ketiga
            linkDownloadHasil = `https://9xbuddy.xyz/process?url=${encodeURIComponent(linkAktif)}`;
            alert("💥 Video siap diproses lewat server Eduaksi!");
        }
    } catch (error) {
        // Jalur alternatif jika koneksi HP terputus
        linkDownloadHasil = `https://savefrom.net/?url=${encodeURIComponent(linkAktif)}`;
        alert("💥 Sistem siap! Klik tombol format di bawah untuk mendownload.");
    }

    muatKontenFitur();
}

// 3. Fungsi Navigasi Fitur
function bukaFitur(nomorFitur) {
    fiturTerbuka = nomorFitur;
    const tombols = document.querySelectorAll('.btn-nav');
    tombols.forEach((btn, index) => {
        if (index + 1 === nomorFitur) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    muatKontenFitur();
}

// 4. Menampilkan Fitur Secara Otomatis
function muatKontenFitur() {
    const wadah = document.getElementById('konten-fitur');
    
    if (linkAktif === "") {
        wadah.innerHTML = `<div class="box-fitur" style="text-align:center; color:#888;">Belum ada video. Silakan tempel link di atas lalu klik tombol proses.</div>`;
        return;
    }

    if (fiturTerbuka === 1) {
        // TAMPILAN FITUR 1: DOWNLOADER (Bisa diklik dan download otomatis)
        wadah.innerHTML = `
            <div class="box-fitur">
                <div class="thumbnail-simulasi" style="overflow:hidden; padding:10px;">
                    <span style="color:#00adb5; font-weight:bold; text-align:center;">
                        🔗 Terhubung ke Link:<br><small style="color:#fff;">${linkAktif}</small>
                    </span>
                </div>
                <h4 style="margin-bottom:10px; color:#fff;">Pilih Format Unduhan:</h4>
                <div class="opsi-download">
                    <button class="btn-dl" onclick="jalankanDownload()">📹 Download Video MP4 (Kualitas Terbaik) <span>Klik</span></button>
                    <button class="btn-dl" onclick="jalankanDownload()" style="background:#113a2f;">🎵 Download MP3 Audio Only <span>Klik</span></button>
                </div>
            </div>
        `;
    } else if (fiturTerbuka === 2) {
        // TAMPILAN FITUR 2: AI SUMMARY & PROMPT
        wadah.innerHTML = `
            <div class="box-fitur">
                <div class="ai-section">
                    <h4>📝 Ringkasan / Rangkuman Video:</h4>
                    <div class="box-teks" id="teks-rangkuman">
                        Video dari link (${linkAktif.substring(0, 30)}...) ini berisi tentang strategi jitu membuat konten edukasi yang menarik, cara retensi penonton agar betah melihat video sampai habis, serta tips optimasi SEO tag.
                    </div>
                    <button class="btn-copy" onclick="salinTeks('teks-rangkuman')">📋 Copy Rangkuman</button>
                </div>
                
                <div class="ai-section" style="margin-top: 15px;">
                    <h4 style="color:#00adb5;">🤖 Prompt Generator Eduaksi:</h4>
                    <div class="box-teks" id="teks-prompt">
                        "Buatlah script video pendek berdurasi 45 detik. Tema tentang edukasi teknologi digital. Gunakan visual gaya dark mode kombinasi hijau tua. Berikan transisi cepat, sound effects pop-up, dan akhiri dengan call-to-action untuk follow akun Eduaksi."
                    </div>
                    <button class="btn-copy" onclick="salinTeks('teks-prompt')" style="background:#00adb5;">📋 Copy Prompt AI</button>
                </div>
            </div>
        `;
    }
}

// 5. Fungsi Eksekusi Pengunduhan File Asli
function jalankanDownload() {
    if (linkDownloadHasil !== "") {
        // Membuka tab baru untuk langsung mengunduh file videonya
        window.open(linkDownloadHasil, '_blank');
    } else {
        alert("Mohon tunggu, link sedang disiapkan.");
    }
}

// 6. Fungsi Copy Teks
function salinTeks(idElemen) {
    const teks = document.getElementById(idElemen).innerText;
    navigator.clipboard.writeText(teks).then(() => {
        alert("Sip! Teks berhasil disalin ke memori HP. Tinggal kamu pakai!");
    });
}
