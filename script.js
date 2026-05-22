// Variabel penyimpan data global
let linkAktif = "";
let fiturTerbuka = 1;

// 1. Fungsi Simulasi Login (Halaman 1 -> Halaman Utama)
function masukAplikasi(metode) {
    document.getElementById('page-login').classList.add('d-none');
    document.getElementById('page-utama').classList.remove('d-none');
    document.getElementById('nama-user').innerText = `Halo, User ${metode}! 👋`;
    
    // Tampilkan fitur pertama default
    muatKontenFitur();
}

// 2. Fungsi Mengambil & Memproses Link yang Ditempel
function prosesLink() {
    const inputLink = document.getElementById('link-video').value;
    if (inputLink.trim() === "") {
        alert("Silakan tempel link video kamu dulu ya, Fauzi!");
        return;
    }
    linkAktif = inputLink;
    alert("Boom! Video berhasil diproses. Silakan cek menu Fitur di bawah.");
    muatKontenFitur();
}

// 3. Fungsi Navigasi Tab Fitur
function bukaFitur(nomorFitur) {
    fiturTerbuka = nomorFitur;
    
    // Atur tombol aktif
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

// 4. LOGIKA HALAMAN 2 & 3 (Mengisi HTML secara dinamis berbasis data link)
function muatKontenFitur() {
    const wadah = document.getElementById('konten-fitur');
    
    if (linkAktif === "") {
        wadah.innerHTML = `<div class="box-fitur" style="text-align:center; color:#888;">Belum ada video. Silakan tempel link di atas lalu klik tombol proses.</div>`;
        return;
    }

    if (fiturTerbuka === 1) {
        // --- HALAMAN 2: FITUR DOWNLOADER ---
        wadah.innerHTML = `
            <div class="box-fitur">
                <div class="thumbnail-simulasi">
                    🎬 [Video Terdeteksi: ${linkAktif.substring(0, 25)}...]
                </div>
                <h4 style="margin-bottom:10px; color:#fff;">Pilih Format Unduhan:</h4>
                <div class="opsi-download">
                    <button class="btn-dl" onclick="eksekusiDownload('MP4 Video (720p)')">📹 Download MP4 (720p) <span>Klik</span></button>
                    <button class="btn-dl" onclick="eksekusiDownload('MP4 Video (1080p)')">🎞️ Download MP4 (1080p) <span>Klik</span></button>
                    <button class="btn-dl" onclick="eksekusiDownload('MP3 Audio')">🎵 Download MP3 Audio Only <span>Klik</span></button>
                </div>
            </div>
        `;
    } else if (fiturTerbuka === 2) {
        // --- HALAMAN 3: FITUR AI SUMMARY & PROMPT GENERATOR ---
        wadah.innerHTML = `
            <div class="box-fitur">
                <div class="ai-section">
                    <h4>📝 Ringkasan / Rangkuman Video:</h4>
                    <div class="box-teks" id="teks-rangkuman">
                        Video ini membahas tentang tutorial strategi digital marketing terbaru tahun 2026, trik mengedit video pendek yang memikat penonton dalam 3 detik pertama, dan cara membangun brand personal yang sukses secara organik.
                    </div>
                    <button class="btn-copy" onclick="salinTeks('teks-rangkuman')">📋 Copy Rangkuman</button>
                </div>
                
                <div class="ai-section" style="margin-top: 15px;">
                    <h4 style="color:#2ecc71;">🤖 Prompt Generator Eduaksi (Terbaik):</h4>
                    <div class="box-teks" id="teks-prompt">
                        "Buatlah video berdurasi 30 detik dengan gaya visual dark mode estetis. Mulai dengan hook: 'Jangan lakukan 3 kesalahan ini kalau mau kontenmu viral!'. Tampilkan transisi cepat ala Alight Motion dengan pencahayaan neon cyan dan backsound berenergi tinggi..."
                    </div>
                    <button class="btn-copy" onclick="salinTeks('teks-prompt')" style="background:#2ecc71;">📋 Copy Prompt AI</button>
                </div>
            </div>
        `;
    }
}

// 5. Fungsi Aksi Download
function eksekusiDownload(format) {
    alert(`Memulai pengunduhan file dalam bentuk format: ${format}. Video siap disimpan di HP kamu!`);
}

// 6. Fungsi Copy Otomatis Sekali Klik
function salinTeks(idElemen) {
    const teks = document.getElementById(idElemen).innerText;
    navigator.clipboard.writeText(teks).then(() => {
        alert("Sip! Teks berhasil disalin ke memori HP kamu. Tinggal copy-paste!");
    });
}
