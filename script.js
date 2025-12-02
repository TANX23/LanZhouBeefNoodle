document.addEventListener("DOMContentLoaded", () => {
    
    // --- SAFEGUARD: ANTI BLACK SCREEN ---
    // Loader hilang otomatis setelah 3.5 detik (Backup jika GSAP gagal)
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
        }
    }, 3500);

    // 1. INIT SMOOTH SCROLL (Lenis)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 2. GSAP ANIMATIONS
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // A. LOADER TIMELINE (Tipografi Reveal)
        const loaderTl = gsap.timeline();
        loaderTl
            // Animasi Huruf Muncul Satu per Satu
            .to(".loader-char", { 
                y: 0, 
                opacity: 1, 
                stagger: 0.1, // Jeda antar huruf
                duration: 1, 
                ease: "power4.out" 
            })
            // Animasi Garis Merah
            .to(".loader-line", { 
                width: "150px", 
                duration: 0.8, 
                ease: "power2.inOut" 
            }, "-=0.5")
            // Animasi Subtitle
            .to(".loader-sub", { 
                opacity: 1, 
                y: 0,
                duration: 0.8 
            }, "-=0.5")
            // Loader Slide Up (Membuka Layar)
            .to("#loader", { 
                yPercent: -100, 
                duration: 1.2, 
                ease: "power4.inOut", 
                delay: 0.5,
                onComplete: () => { 
                    document.getElementById('loader').style.display = 'none'; 
                } 
            })
            // Animasi Hero Section (Teks Utama)
            .to(".hero-anim", { 
                opacity: 1, 
                y: 0, 
                stagger: 0.2, 
                duration: 1, 
                ease: "power3.out" 
            }, "-=0.8");

        // B. PARALLAX HERO
        gsap.to(".hero-bg", {
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            yPercent: 30,
            ease: "none"
        });

        // C. IMAGE REVEAL
        const revealWrappers = document.querySelectorAll('.reveal-wrapper');
        revealWrappers.forEach(wrap => {
            const img = wrap.querySelector('.reveal-img');
            gsap.to(img, {
                scrollTrigger: {
                    trigger: wrap,
                    start: "top 85%",
                    end: "bottom top",
                    scrub: 1,
                },
                scale: 1,
                ease: "none"
            });
        });

        // D. MARQUEE
        gsap.to(".marquee-container", {
            xPercent: -50,
            repeat: -1,
            duration: 20,
            ease: "linear"
        });

        // E. NAVBAR SCROLLED EFFECT
        ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            toggleClass: {className: 'bg-brand-dark/90', targets: '#navbar'}
        });
        ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            toggleClass: {className: 'backdrop-blur-md', targets: '#navbar'}
        });
    }
});
