// ============================================================
// 1. LOADING SCREEN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1800);
});

// ============================================================
// 2. PRE-ROLL DISPLAY (PRD)
// ============================================================
const prdScreen = document.getElementById('prd-screen');
const enterBtn = document.getElementById('enter-invitation');

enterBtn.addEventListener('click', () => {
    prdScreen.classList.add('hidden');
    document.getElementById('header-nav').style.display = 'block';
    
    const bgm = document.getElementById('bgm');
    bgm.play().catch(() => {});
    document.getElementById('music-toggle').classList.add('playing');
    
    const guestName = getGuestNameFromURL();
    if (guestName) {
        updateGuestName(guestName);
    }
});

// ============================================================
// 3. MUSIC CONTROL
// ============================================================
const musicToggle = document.getElementById('music-toggle');
const bgm = document.getElementById('bgm');

musicToggle.addEventListener('click', () => {
    if (bgm.paused) {
        bgm.play().catch(() => {});
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgm.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// ============================================================
// 4. NAVIGATION
// ============================================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const target = link.dataset.section;
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === id);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));

// ============================================================
// 5. SCROLL TO TOP BUTTON
// ============================================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// 6. COUNTDOWN - TANGGAL NGUNDUH MANTU: 16 AGUSTUS 2026
// ============================================================
const targetDate = new Date('2026-08-16T10:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// 7. OPEN INVITATION BUTTON
// ============================================================
const openInvBtn = document.getElementById('open-invitation');
if (openInvBtn) {
    openInvBtn.addEventListener('click', () => {
        document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================================
// 8. FLOATING HEARTS
// ============================================================
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;
    
    const heartSymbols = ['❤', '🌸', '💛', '💗', '✨'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.25 + 0.05};
            animation: floatHeart ${Math.random() * 15 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            pointer-events: none;
            transform: translateX(-50%);
        `;
        container.appendChild(heart);
    }
}
createFloatingHearts();

const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatHeart {
        0% { transform: translateY(100vh) rotate(0deg) scale(0.5); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-10vh) rotate(720deg) scale(1.2); opacity: 0; }
    }
`;
document.head.appendChild(heartStyle);

// ============================================================
// 9. SCROLL DOWN BUTTONS
// ============================================================
document.querySelectorAll('.scroll-down-btn-small').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.closest('.section');
        const nextSection = section.nextElementSibling;
        if (nextSection && nextSection.classList.contains('section')) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
// 10. GALLERY - 5 FOTO AESTHETIC
// ============================================================
const GALLERY_CONFIG = {
    images: [
        'assets/galeri/1.JPEG',
        'assets/galeri/2.JPEG',
        'assets/galeri/3.JPEG',
        'assets/galeri/4.JPEG',
        'assets/galeri/5.JPEG',
    ],
    labels: [
        'Momen Bahagia',
        'Kebersamaan',
        'Cinta Abadi',
        'Tawa & Canda',
        'Janji Suci'
    ]
};

const galleryGrid = document.getElementById('gallery-grid');

if (galleryGrid) {
    galleryGrid.innerHTML = '';
    
    GALLERY_CONFIG.images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.index = index;
        item.innerHTML = `
            <img src="${img}" alt="${GALLERY_CONFIG.labels[index]}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 viewBox=%220 0 400 400%22%3E%3Crect width=%22400%22 height=%22400%22 fill=%22%23fce8e0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2240%22 fill=%22%23d4a574%22 text-anchor=%22middle%22 dy=%22.3em%22%3E📷%3C/text%3E%3C/svg%3E'" />
            <div class="gallery-overlay">
                <i class="fas fa-expand-alt overlay-icon"></i>
                <span class="overlay-label">${GALLERY_CONFIG.labels[index]}</span>
                <span class="overlay-number">${String(index + 1).padStart(2, '0')}</span>
            </div>
            <span class="gallery-badge">${String(index + 1).padStart(2, '0')}</span>
        `;
        item.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(item);
    });
}

// ============================================================
// 11. LIGHTBOX
// ============================================================
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
let currentIndex = 0;
let isLightboxOpen = false;

function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
}

function closeLightbox() {
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    lightbox.style.display = 'none';
    isLightboxOpen = false;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

function updateLightbox() {
    if (!lightboxImg || !lightboxCaption || !lightboxCounter) return;
    
    lightboxImg.src = GALLERY_CONFIG.images[currentIndex];
    lightboxImg.alt = GALLERY_CONFIG.labels[currentIndex];
    lightboxCaption.textContent = GALLERY_CONFIG.labels[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${GALLERY_CONFIG.images.length}`;
}

const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + GALLERY_CONFIG.images.length) % GALLERY_CONFIG.images.length;
        updateLightbox();
    });
}
if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % GALLERY_CONFIG.images.length;
        updateLightbox();
    });
}
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + GALLERY_CONFIG.images.length) % GALLERY_CONFIG.images.length;
        updateLightbox();
    }
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % GALLERY_CONFIG.images.length;
        updateLightbox();
    }
});

let touchStartX = 0;
let isSwiping = false;
if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
        if (e.target === lightbox || e.target.closest('.lightbox-slider')) {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
        }
    }, { passive: true });
    lightbox.addEventListener('touchmove', (e) => {
        if (isSwiping) e.preventDefault();
    }, { passive: false });
    lightbox.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentIndex = (currentIndex + 1) % GALLERY_CONFIG.images.length;
            } else {
                currentIndex = (currentIndex - 1 + GALLERY_CONFIG.images.length) % GALLERY_CONFIG.images.length;
            }
            updateLightbox();
        }
        isSwiping = false;
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', function() {
    if (lightbox) {
        lightbox.style.display = 'none';
        lightbox.classList.remove('active');
    }
});

// ============================================================
// 12. RSVP - GOOGLE SHEETS INTEGRATION
// ============================================================
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBkfvAQFzzYdcCtH_NI_lFe2GLydi7ZZ4MgfW9mjTM_yA5fEnKEgEr88yHiwisVtgq/exec';

const rsvpForm = document.getElementById('rsvp-form');
const rsvpTableBody = document.getElementById('rsvp-table-body');
const rsvpMessage = document.getElementById('rsvp-status-message');

function escapeHtml(text) {
    if (!text) return '-';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function loadRSVP() {
    if (!rsvpTableBody) return;
    try {
        rsvpTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: #8a7a72;">
            <i class="fas fa-spinner fa-pulse"></i> Memuat data...
        </td></tr>`;
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getData`);
        const result = await response.json();
        
        if (result.success && result.data && result.data.length > 0) {
            const data = result.data;
            let html = '';
            data.forEach(row => {
                const timestamp = row.Timestamp || row.timestamp || '-';
                const namaTamu = row.Nama_Tamu || row.name || '-';
                let statusKehadiran = row.Status_Kehadiran || row.status || '-';
                if (statusKehadiran === 'Hadir') statusKehadiran = '✅ Hadir';
                else if (statusKehadiran === 'Tidak Hadir') statusKehadiran = '❌ Tidak Hadir';
                else if (statusKehadiran === 'Ragu') statusKehadiran = '🤔 Ragu';
                const jumlahTamu = row.Jumlah_Tamu || row.guests || '0';
                const keterangan = row.Keterangan || row.message || '-';
                html += `
                    <tr>
                        <td>${escapeHtml(timestamp)}</td>
                        <td>${escapeHtml(namaTamu)}</td>
                        <td>${escapeHtml(statusKehadiran)}</td>
                        <td>${escapeHtml(jumlahTamu)}</td>
                        <td>${escapeHtml(keterangan)}</td>
                    </tr>
                `;
            });
            rsvpTableBody.innerHTML = html;
        } else {
            rsvpTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 30px; color: #8a7a72;">
                ✨ Belum ada konfirmasi. Jadilah yang pertama! ✨
            </td></tr>`;
        }
    } catch (error) {
        console.error('Error loading RSVP:', error);
        rsvpTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: #c47a7a;">
            ⚠️ Gagal memuat data. Silakan refresh halaman.
        </td></tr>`;
    }
}

async function submitRSVP(formData) {
    try {
        const params = new URLSearchParams();
        params.append('Nama_Tamu', formData.name);
        params.append('Status_Kehadiran', formData.status);
        params.append('Jumlah_Tamu', formData.guests);
        params.append('Keterangan', formData.message);
        await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
        return { success: true };
    } catch (error) {
        throw error;
    }
}

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('rsvp-name').value.trim();
        const status = document.getElementById('rsvp-status').value;
        const guests = document.getElementById('rsvp-guests').value || '1';
        const message = document.getElementById('rsvp-message').value.trim();

        if (!name) {
            rsvpMessage.className = 'rsvp-message error';
            rsvpMessage.textContent = '⚠️ Mohon isi Nama Lengkap Anda.';
            rsvpMessage.style.display = 'block';
            return;
        }
        if (!status) {
            rsvpMessage.className = 'rsvp-message error';
            rsvpMessage.textContent = '⚠️ Mohon pilih Status Kehadiran.';
            rsvpMessage.style.display = 'block';
            return;
        }

        const submitBtn = rsvpForm.querySelector('.btn-submit-glass');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

        rsvpMessage.className = 'rsvp-message info';
        rsvpMessage.textContent = '⏳ Mengirim konfirmasi...';
        rsvpMessage.style.display = 'block';

        try {
            const formData = { name, status, guests, message };
            await submitRSVP(formData);
            rsvpForm.reset();
            rsvpMessage.className = 'rsvp-message success';
            rsvpMessage.textContent = '✅ Terima kasih! Konfirmasi Anda telah tercatat.';
            rsvpMessage.style.display = 'block';
            document.getElementById('nav-guest-name').textContent = name;
            document.getElementById('home-guest-name').textContent = name;
            setTimeout(() => loadRSVP(), 2000);
            setTimeout(() => { rsvpMessage.style.display = 'none'; }, 5000);
        } catch (error) {
            rsvpMessage.className = 'rsvp-message error';
            rsvpMessage.textContent = '❌ Gagal mengirim. Silakan coba lagi.';
            rsvpMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Konfirmasi';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadRSVP();
});
setInterval(loadRSVP, 30000);

// ============================================================
// 13. AOS INIT
// ============================================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });
}

// ============================================================
// 14. GET GUEST NAME FROM URL
// ============================================================
function getGuestNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('to');
    if (guestName) {
        guestName = guestName.replace(/\+/g, ' ');
        guestName = decodeURIComponent(guestName);
        return guestName.trim();
    }
    return null;
}

function updateGuestName(name) {
    if (name) {
        const homeGuest = document.getElementById('home-guest-name');
        if (homeGuest) homeGuest.textContent = name;
        const navGuest = document.getElementById('nav-guest-name');
        if (navGuest) navGuest.textContent = name;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const guestName = getGuestNameFromURL();
    if (guestName) updateGuestName(guestName);
});

console.log('✅ Undangan Ngunduh Mantu Diki & Ririn siap!');
console.log('📸 Galeri dengan 5 foto aesthetic siap ditampilkan!');