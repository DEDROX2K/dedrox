/* site.js — small shared behaviours: live clock, project filter,
   case-study table of contents, and the stage selector. */
(function () {
    "use strict";

    var TZ = "Europe/London";

    /* ---------- Live clock + "what am I doing" line ---------- */
    function londonParts() {
        var fmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false });
        var str = fmt.format(new Date());
        return { str: str, hour: parseInt(str.slice(0, 2), 10) };
    }

    function activity(h) {
        if (h < 7) return "so I'm probably asleep. I'll reply in the morning.";
        if (h < 9) return "so I'm probably on my first coffee and reading through feedback.";
        if (h < 13) return "so I'm probably prototyping, testing, or figuring something out.";
        if (h < 14) return "so I'm probably at lunch, thinking about the thing I was prototyping.";
        if (h < 18) return "so I'm probably deep in a build or a design review.";
        if (h < 22) return "so I'm probably tinkering with a side project.";
        return "so I'm probably still up with one more tab open.";
    }

    function tick() {
        var p = londonParts();
        document.querySelectorAll("[data-clock]").forEach(function (el) {
            el.textContent = p.str;
            el.setAttribute("datetime", p.str);
        });
        document.querySelectorAll("[data-status]").forEach(function (el) {
            el.textContent = "It's " + p.str + " in London, " + activity(p.hour);
        });
    }
    tick();
    setInterval(tick, 15000);

    /* ---------- Project filter ---------- */
    var filter = document.querySelector("[data-filter]");
    if (filter) {
        var buttons = Array.prototype.slice.call(filter.querySelectorAll("button"));
        var thumb = filter.querySelector(".filter-thumb");
        var cards = Array.prototype.slice.call(document.querySelectorAll("[data-category]"));
        var count = document.querySelector("[data-count]");

        var moveThumb = function (btn) {
            if (!thumb || !btn) return;
            thumb.style.width = btn.offsetWidth + "px";
            thumb.style.transform = "translateX(" + btn.offsetLeft + "px)";
        };

        var apply = function (btn, animate) {
            var value = btn.getAttribute("data-value");
            buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
            moveThumb(btn);
            var shown = 0;
            cards.forEach(function (card) {
                var match = value === "all" || card.getAttribute("data-category") === value;
                card.hidden = !match;
                card.classList.remove("is-entering");
                if (match) {
                    shown++;
                    if (animate) {
                        void card.offsetWidth;
                        card.style.animationDelay = (shown - 1) * 40 + "ms";
                        card.classList.add("is-entering");
                    }
                }
            });
            if (count) count.textContent = shown + (shown === 1 ? " project" : " projects");
            try { sessionStorage.setItem("workFilter", value); } catch (e) { }
        };

        buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b, true); }); });

        var initial = buttons[0];
        try {
            var saved = sessionStorage.getItem("workFilter");
            buttons.forEach(function (b) { if (b.getAttribute("data-value") === saved) initial = b; });
        } catch (e) { }

        // Position the thumb without animating on first paint.
        if (thumb) thumb.style.transition = "none";
        apply(initial, false);
        requestAnimationFrame(function () { if (thumb) thumb.style.transition = ""; });
        window.addEventListener("resize", function () {
            moveThumb(filter.querySelector('[aria-pressed="true"]'));
        });
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () { moveThumb(filter.querySelector('[aria-pressed="true"]')); });
        }
    }

    /* ---------- Case-study TOC: highlight the section in view ---------- */
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
    if (tocLinks.length) {
        var sections = tocLinks
            .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
            .filter(Boolean);

        var setActive = function (id) {
            tocLinks.forEach(function (a) {
                var on = a.getAttribute("href") === "#" + id;
                a.classList.toggle("is-active", on);
                if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
            });
        };

        var update = function () {
            var line = window.innerHeight * 0.3;
            var current = sections[0];
            sections.forEach(function (s) { if (s.getBoundingClientRect().top <= line) current = s; });
            // At the very bottom, the last section wins even if it's short.
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
                current = sections[sections.length - 1];
            }
            if (current) setActive(current.id);
        };

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
    }

    /* ---------- Stage selector (tabs) ---------- */
    document.querySelectorAll(".stages").forEach(function (root) {
        var tabs = Array.prototype.slice.call(root.querySelectorAll(".stage-tab"));
        var panels = Array.prototype.slice.call(root.querySelectorAll(".stage-panel"));
        var select = function (i, focus) {
            tabs.forEach(function (t, j) {
                var on = i === j;
                t.setAttribute("aria-selected", on ? "true" : "false");
                t.tabIndex = on ? 0 : -1;
                panels[j].hidden = !on;
                panels[j].classList.toggle("is-entering", on);
            });
            if (focus) tabs[i].focus();
        };
        tabs.forEach(function (t, i) {
            t.addEventListener("click", function () { select(i); });
            t.addEventListener("keydown", function (e) {
                if (e.key === "ArrowRight") { e.preventDefault(); select((i + 1) % tabs.length, true); }
                if (e.key === "ArrowLeft") { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
            });
        });
        select(0);
    });

    /* ---------- About photo carousel: drag, swipe, arrow keys, auto-advance ---------- */
    document.querySelectorAll("[data-carousel]").forEach(function (root) {
        var track = root.querySelector(".about-carousel-track");
        var slides = track ? track.children : [];
        var n = slides.length;
        if (n < 2) return;

        var dotsBox = root.querySelector(".about-carousel-dots");
        var dots = [];
        for (var d = 0; d < n; d++) {
            var dot = document.createElement("span");
            dotsBox.appendChild(dot);
            dots.push(dot);
        }

        var index = 0, startX = 0, dx = 0, dragging = false, timer = 0;
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function render() {
            var w = root.clientWidth || 1;
            // Resist dragging past the first and last photo.
            var edge = (index === 0 && dx > 0) || (index === n - 1 && dx < 0);
            var offset = edge ? dx * 0.35 : dx;
            track.style.transform = "translateX(" + (-index * 100 + (offset / w) * 100) + "%)";
            dots.forEach(function (el, i) { el.classList.toggle("is-active", i === index); });
        }
        function go(i) { index = Math.max(0, Math.min(n - 1, i)); dx = 0; render(); }

        function stopAuto() { clearInterval(timer); timer = 0; }
        function startAuto() {
            if (reduce || timer) return;
            timer = setInterval(function () { if (!document.hidden) go(index === n - 1 ? 0 : index + 1); }, 3500);
        }

        root.addEventListener("pointerdown", function (e) {
            if (e.button !== 0) return;
            dragging = true; startX = e.clientX; dx = 0;
            root.classList.add("is-dragging");
            root.setPointerCapture(e.pointerId);
            stopAuto();
        });
        root.addEventListener("pointermove", function (e) {
            if (!dragging) return;
            dx = e.clientX - startX;
            render();
        });
        function end() {
            if (!dragging) return;
            dragging = false;
            root.classList.remove("is-dragging");
            var limit = Math.min(80, root.clientWidth * 0.15);
            if (dx < -limit) go(index + 1);
            else if (dx > limit) go(index - 1);
            else go(index);
        }
        root.addEventListener("pointerup", end);
        root.addEventListener("pointercancel", end);

        root.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") { e.preventDefault(); stopAuto(); go(index + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); stopAuto(); go(index - 1); }
        });
        root.addEventListener("mouseenter", stopAuto);

        render();
        startAuto();
    });
})();
