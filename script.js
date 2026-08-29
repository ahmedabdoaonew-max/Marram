/* ============================================================
   script.js
   حكايتنا ❤️ — المنطق والتفاعلات
   ============================================================ */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       أدوات مساعدة عامة
    --------------------------------------------------------- */
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    function typewrite(el, text, speed, onDone) {
        el.textContent = "";
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        el.appendChild(cursor);
        let i = 0;
        (function step() {
            if (i < text.length) {
                cursor.insertAdjacentText("beforebegin", text[i]);
                i++;
                setTimeout(step, speed);
            } else {
                cursor.remove();
                if (onDone) onDone();
            }
        })();
    }

    function showScreen(id) {
        $$(".screen").forEach((s) => {
            s.classList.remove("active", "reveal");
        });
        const target = document.getElementById(id);
        target.classList.add("active");
        // إعادة تشغيل الأنيميشن
        void target.offsetWidth;
        target.classList.add("reveal");
        target.scrollIntoView({ behavior: "instant", block: "start" });
        onScreenShown(id);
    }

    /* ---------------------------------------------------------
       تعبئة النصوص من CONFIG
    --------------------------------------------------------- */
    function fillStaticText() {
        $("#btn-start-text").textContent = CONFIG.openingButton;
        $("#hero-title").textContent = CONFIG.heroTitle;
        $("#hero-date").textContent = CONFIG.heroDateLabel + " — " + CONFIG.heroDate;
        $("#gallery-title").textContent = CONFIG.galleryTitle;
        $("#messages-title").textContent = CONFIG.messagesTitle;
        $("#btn-messages-next").textContent = CONFIG.messagesButton + " ❤️";
        $("#heart-hint").textContent = CONFIG.heartPrompt + " ❤️";
        $("#secret-title").textContent = CONFIG.secretTitle;
        $("#btn-open-secret").textContent = CONFIG.secretButton + " 💌";
        $("#counter-title").textContent = CONFIG.counterTitle;
        $("#counter-subtitle").textContent = CONFIG.counterSubtitle;
        $("#timeline-title").textContent = CONFIG.timelineTitle;
        $("#ending-line-1").textContent = CONFIG.endingLine1;
        $("#ending-line-2").textContent = CONFIG.endingLine2 + " ❤️";
        $("#btn-final-surprise").textContent = CONFIG.endingButton;
        $("#final-message").textContent = CONFIG.finalMessage;
        $("#final-name").textContent = CONFIG.name + " ❤️";
        $("#final-note").textContent = CONFIG.finalNote;
        $("#final-signature").textContent = CONFIG.yourName;
        $("#btn-goto-surprise").textContent = CONFIG.surpriseNextButton;
        $("#surprise-hint").textContent = CONFIG.surpriseHint;
        $("#surprise-prompt").textContent = CONFIG.surpriseBoxPrompt;
        $("#btn-goto-video-surprise").textContent = CONFIG.surpriseAfterButton;
        $("#video-surprise-hint").textContent = CONFIG.videoSurpriseHint;
        $("#video-surprise-prompt").textContent = CONFIG.videoSurprisePrompt;
        if (CONFIG.videoSurpriseSrc) {
            $("#surprise-video").src = CONFIG.videoSurpriseSrc;
        }

        const hero = $("#hero-image");
        if (CONFIG.photos && CONFIG.photos[0]) {
            hero.style.backgroundImage = `url('${CONFIG.photos[0].src}')`;
        }

        if (CONFIG.musicSrc) {
            $("#bg-music").src = CONFIG.musicSrc;
        }
    }

    /* ---------------------------------------------------------
       خلفية النجوم المتحركة (Canvas)
    --------------------------------------------------------- */
    function initStarfield() {
        const canvas = $("#starfield");
        const ctx = canvas.getContext("2d");
        let stars = [];
        let w, h;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            const count = Math.floor((w * h) / 9000);
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.4 + 0.3,
                baseAlpha: Math.random() * 0.6 + 0.2,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.015 + 0.005
            }));
        }

        function draw(t) {
            ctx.clearRect(0, 0, w, h);
            for (const s of stars) {
                const alpha = s.baseAlpha + Math.sin(t * s.speed + s.phase) * 0.3;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(253,250,246,${Math.max(0, alpha)})`;
                ctx.fill();
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener("resize", resize);
        resize();
        requestAnimationFrame(draw);
    }

    /* ---------------------------------------------------------
       قلوب صغيرة عائمة في الخلفية (تظهر بين الحين والآخر)
    --------------------------------------------------------- */
    function spawnFloatingHeart() {
        const layer = $("#floating-hearts-layer");
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = Math.random() > 0.5 ? "❤" : "♡";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
        heart.style.animationDuration = (8 + Math.random() * 8) + "s";
        heart.style.fontSize = (0.9 + Math.random() * 1.4) + "rem";
        layer.appendChild(heart);
        setTimeout(() => heart.remove(), 17000);
    }

    function initFloatingHearts() {
        setInterval(spawnFloatingHeart, 1400);
    }

    /* ---------------------------------------------------------
       الموسيقى
    --------------------------------------------------------- */
    function playMusic() {
        if (!CONFIG.musicSrc) return;
        const btn = $("#music-toggle");
        const audio = $("#bg-music");
        if (!audio.paused) return;
        audio.play().then(() => {
            btn.classList.add("playing");
        }).catch(() => {
            /* بعض المتصفحات قد تمنع حتى مع تفاعل المستخدم في حالات نادرة، لا مشكلة */
        });
    }

    function initMusic() {
        const btn = $("#music-toggle");
        const audio = $("#bg-music");

        btn.addEventListener("click", () => {
            if (!CONFIG.musicSrc) return;
            if (audio.paused) {
                playMusic();
            } else {
                audio.pause();
                btn.classList.remove("playing");
            }
        });
    }

    /* ---------------------------------------------------------
       1) شاشة البداية
    --------------------------------------------------------- */
    function initOpening() {
        typewrite($("#opening-line"), CONFIG.openingLine, 45);

        $("#btn-start").addEventListener("click", () => {
            playMusic();
            showScreen("screen-hero");
        });
    }

    /* ---------------------------------------------------------
       2) البداية / الهيرو
    --------------------------------------------------------- */
    function initHero() {
        $("#btn-hero-next").addEventListener("click", () => {
            showScreen("screen-gallery");
        });
    }

    /* ---------------------------------------------------------
       3) معرض الصور
    --------------------------------------------------------- */
    let galleryBuilt = false;
    function buildGallery() {
        if (galleryBuilt) return;
        galleryBuilt = true;
        const wrap = $("#gallery-wrap");
        wrap.innerHTML = "";
        CONFIG.photos.forEach((photo) => {
            const card = document.createElement("div");
            card.className = "polaroid";
            const img = document.createElement("img");
            img.src = photo.src;
            img.alt = photo.caption || "ذكرى";
            img.loading = "lazy";
            img.onerror = function () {
                card.style.background =
                    "linear-gradient(135deg,#241f3d,#100e1e)";
                img.style.display = "none";
            };
            card.appendChild(img);
            wrap.appendChild(card);
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, idx) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("in-view");
                        }, idx * 90);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        $$(".polaroid").forEach((el) => observer.observe(el));
    }

    /* ---------------------------------------------------------
       4) الرسائل المتتالية
    --------------------------------------------------------- */
    let messagesStarted = false;
    function playMessages() {
        if (messagesStarted) return;
        messagesStarted = true;
        const wrap = $("#messages-wrap");
        wrap.innerHTML = "";
        const lines = CONFIG.messages.map((msg) => {
            const p = document.createElement("p");
            p.className = "message-line";
            p.textContent = msg;
            wrap.appendChild(p);
            return p;
        });

        lines.forEach((p, idx) => {
            setTimeout(() => {
                p.classList.add("show");
                if (idx === lines.length - 1) {
                    setTimeout(() => {
                        $("#btn-messages-next").style.display = "inline-block";
                    }, 900);
                }
            }, idx * 1600 + 400);
        });
    }

    function initMessages() {
        $("#btn-messages-next").addEventListener("click", () => {
            showScreen("screen-heart");
        });
    }

    /* ---------------------------------------------------------
       5) القلب التفاعلي + الجزيئات
    --------------------------------------------------------- */
    let heartParticlesCtx, heartCanvasW, heartCanvasH, resizeHeartCanvas;
    let particles = [];

    function initHeartCanvas() {
        const canvas = $("#heart-particles");
        heartParticlesCtx = canvas.getContext("2d");

        function resize() {
            // الشاشة قد تكون مخفية (display:none) عند التحميل، فنعتمد على
            // أبعاد النافذة بدلاً من العنصر الأب حتى لا تكون القيمة صفرًا.
            heartCanvasW = canvas.width = window.innerWidth;
            heartCanvasH = canvas.height = window.innerHeight;
        }
        resizeHeartCanvas = resize;
        window.addEventListener("resize", resize);
        resize();

        function loop() {
            heartParticlesCtx.clearRect(0, 0, heartCanvasW, heartCanvasH);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.03;
                p.life -= 1;
                p.alpha = Math.max(0, p.life / p.maxLife);
                heartParticlesCtx.globalAlpha = p.alpha;
                heartParticlesCtx.fillStyle = p.color;
                heartParticlesCtx.beginPath();
                if (p.isHeart) {
                    drawTinyHeart(heartParticlesCtx, p.x, p.y, p.size);
                } else {
                    heartParticlesCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    heartParticlesCtx.fill();
                }
            });
            heartParticlesCtx.globalAlpha = 1;
            particles = particles.filter((p) => p.life > 0);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    function drawTinyHeart(ctx, x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size / 10, size / 10);
        ctx.beginPath();
        ctx.moveTo(0, 3);
        ctx.bezierCurveTo(-5, -4, -12, 2, 0, 10);
        ctx.bezierCurveTo(12, 2, 5, -4, 0, 3);
        ctx.fill();
        ctx.restore();
    }

    function burstHeartParticles(cx, cy) {
        const colors = ["#ff3b5c", "#ff9db8", "#ffd27a", "#fdfaf6"];
        for (let i = 0; i < 34; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 3.5;
            particles.push({
                x: cx,
                y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                size: 4 + Math.random() * 7,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 60 + Math.random() * 40,
                maxLife: 100,
                isHeart: Math.random() > 0.4
            });
        }
    }

    let heartClicks = 0;
    function initInteractiveHeart() {
        const wrap = $("#heart-wrap");
        const msgEl = $("#heart-message");

        function handleHeartTap(e) {
            heartClicks++;
            wrap.classList.remove("pulsed");
            void wrap.offsetWidth;
            wrap.classList.add("pulsed");

            const rect = wrap.getBoundingClientRect();
            const parentRect = wrap.parentElement.getBoundingClientRect();
            const cx = rect.left - parentRect.left + rect.width / 2;
            const cy = rect.top - parentRect.top + rect.height / 2;
            burstHeartParticles(cx, cy);

            if (heartClicks === 1) {
                msgEl.textContent = CONFIG.heartFirstMessage;
                setTimeout(() => {
                    msgEl.style.transition = "opacity .4s";
                    msgEl.style.opacity = 0;
                    setTimeout(() => {
                        msgEl.textContent = CONFIG.heartSecondMessage + " ❤️";
                        msgEl.style.opacity = 1;
                    }, 450);
                }, 1600);
            } else {
                msgEl.textContent = CONFIG.heartFinalLine;
                $("#btn-heart-next").style.display = "inline-block";
            }
        }

        wrap.addEventListener("click", handleHeartTap);
        wrap.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                handleHeartTap(e);
            },
            { passive: false }
        );

        $("#btn-heart-next").addEventListener("click", () => {
            showScreen("screen-secret");
        });
    }

    /* ---------------------------------------------------------
       6) الرسالة السرية
    --------------------------------------------------------- */
    function initSecret() {
        const envelope = $("#envelope");
        const openBtn = $("#btn-open-secret");
        const msgEl = $("#secret-message");
        let opened = false;

        function openSecret() {
            if (opened) return;
            opened = true;
            envelope.classList.add("open");
            openBtn.style.display = "none";
            setTimeout(() => {
                typewrite(msgEl, CONFIG.secretMessage, 28, () => {
                    $("#btn-secret-next").style.display = "inline-block";
                });
            }, 500);
        }

        envelope.addEventListener("click", openSecret);
        openBtn.addEventListener("click", openSecret);

        $("#btn-secret-next").addEventListener("click", () => {
            showScreen("screen-counter");
        });
    }

    /* ---------------------------------------------------------
       7) عداد الذكريات
    --------------------------------------------------------- */
    let counterInterval = null;
    function startCounter() {
        const start = new Date(CONFIG.startDate).getTime();
        if (counterInterval) clearInterval(counterInterval);

        function update() {
            const now = Date.now();
            let diff = Math.max(0, now - start);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            $("#count-days").textContent = days;
            $("#count-hours").textContent = String(hours).padStart(2, "0");
            $("#count-minutes").textContent = String(minutes).padStart(2, "0");
            $("#count-seconds").textContent = String(seconds).padStart(2, "0");
        }
        update();
        counterInterval = setInterval(update, 1000);
    }

    /* ---------------------------------------------------------
       8) الخط الزمني
    --------------------------------------------------------- */
    let timelineBuilt = false;
    function buildTimeline() {
        if (timelineBuilt) return;
        timelineBuilt = true;
        const wrap = $("#timeline-wrap");
        wrap.innerHTML = "";

        CONFIG.timeline.forEach((item) => {
            const el = document.createElement("div");
            el.className = "timeline-item";

            const label = document.createElement("p");
            label.className = "timeline-label";
            label.textContent = item.label;

            const date = document.createElement("span");
            date.className = "timeline-date";
            date.textContent = item.date;

            const msg = document.createElement("p");
            msg.className = "timeline-message";
            msg.textContent = item.message;

            el.appendChild(label);
            el.appendChild(date);
            el.appendChild(msg);

            if (item.image) {
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.label;
                img.loading = "lazy";
                img.onerror = () => img.remove();
                el.appendChild(img);
            }

            wrap.appendChild(el);
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        $$(".timeline-item").forEach((el) => observer.observe(el));
    }

    /* ---------------------------------------------------------
       9) الخاتمة والمفاجأة النهائية
    --------------------------------------------------------- */
    function initEnding() {
        setTimeout(() => {
            $("#ending-line-2").style.transition = "opacity 1s";
            $("#ending-line-2").style.opacity = 1;
        }, 1600);

        $("#btn-final-surprise").addEventListener("click", () => {
            $("#btn-final-surprise").style.display = "none";
            $("#final-content").classList.add("show");
            playFinalConfetti();

            setTimeout(() => {
                $("#btn-goto-surprise").style.display = "inline-block";
            }, 3200);
        });

        $("#btn-goto-surprise").addEventListener("click", () => {
            showScreen("screen-surprise");
        });
    }

    /* ---------------------------------------------------------
       10) التورطة الكبيرة (صندوق الهدية الأخير)
    --------------------------------------------------------- */
    function initSurprise() {
        const box = $("#gift-box");
        const prompt = $("#surprise-prompt");
        const msgEl = $("#surprise-message");
        let opened = false;

        function openGift() {
            if (opened) return;
            opened = true;
            box.classList.add("opened");
            prompt.style.opacity = "0";

            // دفعة قلوب إضافية احتفالية عند الفتح
            for (let i = 0; i < 18; i++) {
                setTimeout(spawnFloatingHeart, i * 90);
            }

            setTimeout(() => {
                typewrite(msgEl, CONFIG.surpriseMessage, 30, () => {
                    setTimeout(() => {
                        $("#btn-goto-video-surprise").style.display = "inline-block";
                    }, 500);
                });
            }, 750);
        }

        box.addEventListener("click", openGift);
        box.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                openGift();
            },
            { passive: false }
        );

        $("#btn-goto-video-surprise").addEventListener("click", () => {
            showScreen("screen-video-surprise");
        });
    }

    /* ---------------------------------------------------------
       11) التورطة الثانية: فقاعة تفرقع ويظهر فيديو المفاجأة
    --------------------------------------------------------- */
    function initVideoSurprise() {
        const trigger = $("#pop-trigger");
        const flash = $("#pop-flash");
        const frame = $("#video-frame");
        const video = $("#surprise-video");
        const closeBtn = $("#video-close");
        let popped = false;

        function handlePop() {
            if (popped) return;
            popped = true;

            trigger.classList.add("popped");
            flash.classList.add("flash");

            // قلوب احتفالية إضافية عند لحظة الفرقعة
            for (let i = 0; i < 24; i++) {
                setTimeout(spawnFloatingHeart, i * 60);
            }

            // تشغيل الفيديو داخل معالج الضغط مباشرة حتى يعمل التشغيل بالصوت
            if (CONFIG.videoSurpriseSrc) {
                video.muted = false;
                const playPromise = video.play();
                if (playPromise && playPromise.catch) {
                    playPromise.catch(() => {
                        /* بعض المتصفحات قد تمنع الصوت، المستخدم يقدر يضغط تشغيل يدويًا */
                    });
                }
            }

            setTimeout(() => {
                frame.classList.add("show");
            }, 260);
        }

        trigger.addEventListener("click", handlePop);
        trigger.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                handlePop();
            },
            { passive: false }
        );

        closeBtn.addEventListener("click", () => {
            frame.classList.remove("show");
            video.pause();
        });

        // إخفاء الفيديو تلقائيًا بمجرد ما يخلص
        video.addEventListener("ended", () => {
            frame.classList.remove("show");
        });
    }

    function playFinalConfetti() {
        const canvas = $("#final-canvas");
        const ctx = canvas.getContext("2d");
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        const colors = ["#ff3b5c", "#ff9db8", "#ffd27a", "#fdfaf6"];
        let bits = Array.from({ length: 140 }, () => ({
            x: Math.random() * w,
            y: -20 - Math.random() * h,
            vy: 1.5 + Math.random() * 2.5,
            vx: (Math.random() - 0.5) * 1.5,
            size: 6 + Math.random() * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            spin: Math.random() * Math.PI * 2,
            spinSpeed: (Math.random() - 0.5) * 0.1
        }));

        let frames = 0;
        const maxFrames = 480;

        function loop() {
            frames++;
            ctx.clearRect(0, 0, w, h);
            bits.forEach((b) => {
                b.y += b.vy;
                b.x += b.vx;
                b.spin += b.spinSpeed;
                if (b.y > h + 20) {
                    b.y = -20;
                    b.x = Math.random() * w;
                }
                ctx.save();
                ctx.translate(b.x, b.y);
                ctx.rotate(b.spin);
                ctx.fillStyle = b.color;
                ctx.beginPath();
                drawTinyHeart(ctx, 0, 0, b.size);
                ctx.restore();
            });
            if (frames < maxFrames) {
                requestAnimationFrame(loop);
            } else {
                ctx.clearRect(0, 0, w, h);
            }
        }
        requestAnimationFrame(loop);
    }

    /* ---------------------------------------------------------
       التوجيه العام: أزرار "التالي" ذات data-next + استدعاء
       بناء المحتوى عند ظهور شاشة معينة لأول مرة
    --------------------------------------------------------- */
    function bindGenericNextButtons() {
        $$(".scroll-next").forEach((btn) => {
            btn.addEventListener("click", () => {
                showScreen(btn.dataset.next);
            });
        });
    }

    function onScreenShown(id) {
        if (id === "screen-gallery") buildGallery();
        if (id === "screen-messages") playMessages();
        if (id === "screen-counter") startCounter();
        if (id === "screen-timeline") buildTimeline();
        if (id === "screen-heart" && resizeHeartCanvas) resizeHeartCanvas();
    }

    /* ---------------------------------------------------------
       التشغيل
    --------------------------------------------------------- */
    document.addEventListener("DOMContentLoaded", () => {
        fillStaticText();
        initStarfield();
        initFloatingHearts();
        initMusic();
        initOpening();
        initHero();
        initMessages();
        initHeartCanvas();
        initInteractiveHeart();
        initSecret();
        initEnding();
        initSurprise();
        initVideoSurprise();
        bindGenericNextButtons();

        // تأكيد ظهور الشاشة الأولى مع تأثير الدخول عند تحميل الصفحة لأول مرة
        const firstScreen = $(".screen.active");
        if (firstScreen) {
            void firstScreen.offsetWidth;
            firstScreen.classList.add("reveal");
        }
    });
})();
