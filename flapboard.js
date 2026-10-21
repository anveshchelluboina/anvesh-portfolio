/* Portfolio interactions: accessible gallery, lightbox, mobile navigation, profile slides, scroll motion and booking calendar. */
(() => {
  "use strict";
  const photoData = [
    {src:"travel-01.jpg",caption:"Out exploring with a camera",alt:"Anvesh wearing a camera strap beside a city road",category:"ontheroad"},
    {src:"travel-02.jpg",caption:"Pyramids in the desert",alt:"Anvesh posing beside pyramids on a desert plateau",category:"culture"},
    {src:"travel-03.jpg",caption:"A quiet shoreline",alt:"Sunset over a quiet beach and sea",category:"ontheroad"},
    {src:"travel-04.jpg",caption:"A leap in the city",alt:"Anvesh leaping above a paved city square with historic buildings",category:"cities"},
    {src:"travel-05.jpg",caption:"By the river in winter",alt:"Anvesh looking over a river from a stone bridge",category:"cities"},
    {src:"travel-06.jpg",caption:"A pause in the park",alt:"Anvesh seated on a bench in a winter park",category:"ontheroad"},
    {src:"travel-07.jpg",caption:"Ready for the next flight",alt:"Anvesh standing in front of a passenger airplane",category:"ontheroad"},
    {src:"travel-08.jpg",caption:"Walking without a rush",alt:"Anvesh looking back along a tree-lined winter path",category:"ontheroad"},
    {src:"travel-09.jpg",caption:"A city square beneath a stormy sky",alt:"An equestrian statue in a broad city square beneath storm clouds",category:"cities"},
    {src:"travel-10.jpg",caption:"A journey in motion",alt:"Anvesh taking a selfie beside a Wizz Air airplane",category:"ontheroad"},
    {src:"travel-11.jpg",caption:"A portrait beneath the Eiffel Tower",alt:"Anvesh posing with the Eiffel Tower behind him",category:"cities"},
    {src:"travel-12.jpg",caption:"Paris, in a frame",alt:"The Eiffel Tower in Paris",category:"cities"},
    {src:"travel-13.jpg",caption:"City lines",alt:"A city road and skyline framed by a large circular arch",category:"cities"},
    {src:"travel-14.jpg",caption:"A city walk in Dubai",alt:"Anvesh standing before Dubai's modern skyline",category:"cities"},
    {src:"travel-15.jpg",caption:"By the water",alt:"Anvesh beside the water with a coastal skyline behind him",category:"ontheroad"},
    {src:"travel-16.jpg",caption:"Twin towers at golden hour",alt:"Two modern city towers in warm evening light",category:"cities"},
    {src:"travel-17.jpg",caption:"A green corner",alt:"Anvesh seated on a bench among garden trees",category:"ontheroad"},
    {src:"travel-18.jpg",caption:"Cold air, clear mind",alt:"Anvesh standing in a snowy landscape",category:"mountains"},
    {src:"travel-19.jpg",caption:"Desert air",alt:"Anvesh with arms outstretched on a desert hillside",category:"ontheroad"},
    {src:"travel-20.jpg",caption:"A walk through town",alt:"Anvesh standing on a cobbled city street",category:"cities"},
    {src:"travel-21.jpg",caption:"A falconry moment in the desert",alt:"A falcon perched on Anvesh's arm in a sandy landscape",category:"culture"},
    {src:"travel-22.jpg",caption:"Fireworks above the city",alt:"Fireworks lighting the Burj Khalifa above the downtown crowd",category:"cities"},
    {src:"travel-23.jpg",caption:"A day of discovery",alt:"Anvesh in front of a historic domed building",category:"culture"},
    {src:"travel-24.jpg",caption:"Into the green",alt:"A snow-capped peak above a forested mountain valley",category:"mountains"},
    {src:"travel-25.jpg",caption:"Mountain air",alt:"Snow-covered mountain peaks above a forested valley",category:"mountains"},
    {src:"travel-26.jpg",caption:"Winter walk",alt:"Anvesh standing on a snowy mountain slope",category:"mountains"},
    {src:"travel-27.jpg",caption:"Architecture in warm light",alt:"Two modern towers catching the evening light",category:"cities"},
    {src:"travel-28.jpg",caption:"A city from above",alt:"Dense city rooftops and high-rises viewed from above",category:"cities"},
    {src:"travel-29.jpg",caption:"Looking up",alt:"A tall geometric skyscraper rising into a cloudy sky",category:"cities"},
    {src:"travel-30.jpg",caption:"A day outdoors",alt:"Anvesh sitting on a scooter beside a green park",category:"ontheroad"},
    {src:"travel-31.jpg",caption:"A different point of view",alt:"Anvesh looking across a mountain valley from a railing",category:"mountains"},
    {src:"travel-32.jpg",caption:"A moment to slow down",alt:"Anvesh relaxing in a swimming pool among city high-rises",category:"cities"},
    {src:"travel-33.jpg",caption:"A landmark in the sun",alt:"A white coastal tower and arches above a rocky shoreline",category:"culture"},
    {src:"travel-34.jpg",caption:"The view was worth it",alt:"Anvesh at a mountain viewpoint above a valley",category:"mountains"},
    {src:"travel-35.jpg",caption:"A city across the water",alt:"A broad city skyline across a river",category:"cities"},
    {src:"travel-36.jpg",caption:"A lookout point",alt:"A slender tower rising beside a green hill and city",category:"cities"},
    {src:"travel-37.jpg",caption:"A colourful place",alt:"A gold statue and colourful temple steps among limestone cliffs",category:"culture"},
    {src:"travel-38.jpg",caption:"High above the valley",alt:"Anvesh looking out across a green mountain valley",category:"mountains"},
    {src:"travel-39.jpg",caption:"The world opens up",alt:"Anvesh at a mountain viewpoint above a valley",category:"mountains"},
    {src:"travel-40.jpg",caption:"A mountain in monochrome",alt:"A monochrome mountain range rising above clouds",category:"mountains"},
    {src:"travel-41.jpg",caption:"A city after dark",alt:"An illuminated clock building under a cloudy night sky",category:"cities"},
    {src:"travel-42.jpg",caption:"A walk through history",alt:"Anvesh standing before an old stone chapel and ruins",category:"culture"},
    {src:"travel-43.jpg",caption:"Between destinations",alt:"Anvesh at a railway platform beside passenger trains",category:"ontheroad"}
  ];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canObserve = "IntersectionObserver" in window;

  function initMobileMenu() {
    const toggle = $(".menu-toggle");
    const nav = $("#main-nav");
    if (!toggle || !nav) return;
    const closeMenu = restoreFocus => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    $$("a", nav).forEach(link => link.addEventListener("click", () => {
      closeMenu(false);
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu(true);
    });
    document.addEventListener("pointerdown", event => {
      if (nav.classList.contains("is-open") && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu(false);
    });
  }

  function initHeader() {
    const header = $(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    update();
    window.addEventListener("scroll", update, {passive:true});
  }

  // Elements marked .reveal rise in as they enter the viewport; .reveal-group starts its children's animations.
  function initReveal() {
    const items = $$(".reveal, .reveal-group");
    const show = item => item.classList.add("is-visible");
    if (reducedMotion || !canObserve) { items.forEach(show); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      show(entry.target);
      observer.unobserve(entry.target);
    }), { rootMargin: "0px 0px -10% 0px" });
    items.forEach(item => observer.observe(item));
  }

  // Numbers marked data-count (e.g. "12+") count up from zero the first time they are seen.
  function initCounters() {
    const counters = $$("[data-count]");
    if (reducedMotion || !canObserve) return;
    const run = el => {
      const match = el.textContent.trim().match(/^(\d+)(.*)$/);
      if (!match) return;
      const target = Number(match[1]);
      const start = performance.now();
      const tick = now => {
        const t = Math.min((now - start) / 1600, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + match[2];
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      run(entry.target);
    }), { threshold: 0.6 });
    counters.forEach(el => observer.observe(el));
  }

  // The ticker loops by sliding half its width, so keep each half wider than the screen and the speed constant.
  function initTicker() {
    const track = $(".ticker-track");
    if (!track) return;
    const set = Array.from(track.children);
    const fill = () => {
      for (let guard = 0; guard < 8 && track.offsetWidth < window.innerWidth * 2; guard += 1) {
        set.forEach(node => {
          const clone = node.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          track.appendChild(clone);
        });
      }
      track.style.setProperty("--ticker-duration", `${Math.round(track.offsetWidth / 2 / 40)}s`);
    };
    fill();
    window.addEventListener("resize", fill, {passive:true});
  }

  // Load the Calendly calendar only when the contact section gets close
  function initBooking() {
    const booking = $(".booking");
    if (!booking) return;
    const fallbackMessage = $(".booking-fallback p", booking);
    let loadTimeout;
    const loaded = () => {
      window.clearTimeout(loadTimeout);
      booking.classList.add("is-loaded");
    };
    const unavailable = () => {
      if (fallbackMessage) fallbackMessage.textContent = "The embedded calendar is unavailable. Use the booking page link instead.";
    };
    const load = () => {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        const frame = $("iframe", booking);
        if (frame) frame.addEventListener("load", loaded, {once:true});
        else unavailable();
      };
      script.onerror = unavailable;
      document.body.appendChild(script);
      loadTimeout = window.setTimeout(unavailable, 15000);
    };
    if (!canObserve) { load(); return; }
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      load();
    }, { rootMargin: "600px 0px" });
    observer.observe(booking);
  }

  function initGallery() {
    const grid = $("#photo-grid");
    if (!grid) return;
    const filters = $$(".filter-chip");
    const showMore = $("#show-more");
    const batchSize = 12;
    let activeFilter = "all";
    let visibleCount = batchSize;
    let activePhotoIndex = 0;
    let lastFocus = null;
    let previousOverflow = "";
    const lightbox = $("#lightbox");
    const lightboxImage = $("#lightbox-image");
    const lightboxCaption = $("#lightbox-caption");
    const lightboxCounter = $("#lightbox-counter");

    filters.forEach(button => {
      const count = $("[data-filter-count]", button);
      if (!count) return;
      const filter = button.dataset.filter;
      count.textContent = String(filter === "all" ? photoData.length : photoData.filter(photo => photo.category === filter).length);
    });

    function filteredPhotos() {
      return photoData.map((photo, i) => ({ photo, i })).filter(({photo}) => activeFilter === "all" || photo.category === activeFilter);
    }
    // append: keep the cards already shown and only add (and animate) the next batch
    function render(append = false) {
      const filtered = filteredPhotos();
      const start = append ? grid.children.length : 0;
      if (!append) grid.replaceChildren();
      filtered.slice(start, visibleCount).forEach(({photo, i}, n) => {
        const filteredIndex = start + n;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "photo-card";
        button.style.setProperty("--i", n);
        button.setAttribute("aria-label", `Open photo ${i + 1}: ${photo.caption}`);
        button.innerHTML = `<img src="assets/photos/${photo.src}" alt="${photo.alt}" loading="lazy" decoding="async"><span class="photo-card-caption"><span><b>${photo.caption}</b><br><small>TRAVEL JOURNAL</small></span><small>${String(i + 1).padStart(2, "0")}</small></span>`;
        const img = $("img", button);
        const loaded = () => img.classList.add("is-loaded");
        if (img.complete) loaded();
        else { img.addEventListener("load", loaded, {once:true}); img.addEventListener("error", loaded, {once:true}); }
        button.addEventListener("click", () => openLightbox(filteredIndex));
        grid.appendChild(button);
      });
      showMore.disabled = visibleCount >= filtered.length;
      showMore.textContent = visibleCount >= filtered.length ? "All photos shown" : `Show more photos (${filtered.length - visibleCount} left) ↓`;
      showMore.setAttribute("aria-label", showMore.textContent);
    }
    function openLightbox(index) {
      activePhotoIndex = index;
      lastFocus = document.activeElement;
      updateLightbox();
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      $(".lightbox-close", lightbox).focus();
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = previousOverflow;
      if (lastFocus && lastFocus.isConnected && typeof lastFocus.focus === "function") lastFocus.focus();
    }
    function updateLightbox(step = 0) {
      const current = filteredPhotos()[activePhotoIndex];
      if (!current) return;
      const photo = current.photo;
      lightboxImage.style.setProperty("--dir", String(Math.sign(step)));
      lightboxImage.src = `assets/photos/${photo.src}`;
      lightboxImage.alt = photo.alt;
      lightboxCaption.textContent = photo.caption;
      lightboxCounter.textContent = `${String(activePhotoIndex + 1).padStart(2, "0")} / ${filteredPhotos().length}`;
    }
    function moveLightbox(step) {
      const count = filteredPhotos().length;
      activePhotoIndex = (activePhotoIndex + step + count) % count;
      updateLightbox(step);
    }
    // Restart the slide-in each time a new photo has loaded
    lightboxImage.addEventListener("load", () => {
      lightboxImage.classList.remove("is-swapping");
      void lightboxImage.offsetWidth;
      lightboxImage.classList.add("is-swapping");
    });
    filters.forEach(button => button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      visibleCount = batchSize;
      filters.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render();
    }));
    showMore.addEventListener("click", () => { visibleCount += batchSize; render(true); });
    $(".lightbox-close").addEventListener("click", closeLightbox);
    $(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
    $(".lightbox-next").addEventListener("click", () => moveLightbox(1));
    lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
    let touchStartX = null;
    lightbox.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, {passive:true});
    lightbox.addEventListener("touchend", event => {
      if (touchStartX === null) return;
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 55) moveLightbox(delta < 0 ? 1 : -1);
      touchStartX = null;
    }, {passive:true});
    document.addEventListener("keydown", event => {
      if (!lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
      if (event.key === "Tab") {
        const focusable = $$("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])", lightbox);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    render();
  }

  function initSlides() {
    const deck = $("#slide-deck");
    if (!deck) return;
    const slides = $$(".profile-slide", deck);
    const dots = $("#deck-dots");
    const counter = $("#slide-number");
    const prev = $("#prev-slide");
    const next = $("#next-slide");
    const fullscreenButton = $("#fullscreen-slide");
    const shell = deck.closest(".deck-shell");
    const deckHint = $(".deck-hint");
    let current = 0;
    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "deck-dot" + (index === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.setAttribute("aria-current", index === 0 ? "step" : "false");
      dot.addEventListener("click", () => show(index));
      dots.appendChild(dot);
    });
    const dotButtons = $$(".deck-dot", dots);
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle("is-current", active);
        slide.setAttribute("aria-hidden", String(!active));
        slide.toggleAttribute("inert", !active);
      });
      dotButtons.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "step" : "false");
      });
      counter.textContent = `${String(current + 1).padStart(2, "0")} — ${String(slides.length).padStart(2, "0")}`;
      prev.disabled = false;
      next.disabled = false;
    }
    prev.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
    if (fullscreenButton) {
      if (!shell || typeof shell.requestFullscreen !== "function") {
        fullscreenButton.hidden = true;
      } else {
        const updateFullscreenButton = () => {
          const active = document.fullscreenElement === shell;
          fullscreenButton.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
          fullscreenButton.setAttribute("aria-pressed", String(active));
        };
        fullscreenButton.addEventListener("click", async () => {
          try {
            if (document.fullscreenElement === shell) await document.exitFullscreen();
            else await shell.requestFullscreen();
          } catch (error) {
            console.error("Could not change fullscreen mode.", error);
            if (deckHint) deckHint.textContent = "Fullscreen is unavailable; continue using the regular slide view.";
            fullscreenButton.focus();
          }
        });
        document.addEventListener("fullscreenchange", updateFullscreenButton);
        updateFullscreenButton();
      }
    }
    shell.addEventListener("keydown", event => {
      if (event.target !== deck && !event.target.closest(".deck-controls")) return;
      if (event.key === "ArrowRight" || event.key === "PageDown") { event.preventDefault(); show(current + 1); }
      if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); show(current - 1); }
      if (event.key === "Home") { event.preventDefault(); show(0); }
      if (event.key === "End") { event.preventDefault(); show(slides.length - 1); }
    });
    let touchStart = null;
    deck.addEventListener("touchstart", event => { touchStart = event.changedTouches[0].clientX; }, {passive:true});
    deck.addEventListener("touchend", event => {
      if (touchStart === null) return;
      const delta = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(delta) > 45) show(current + (delta < 0 ? 1 : -1));
      touchStart = null;
    }, {passive:true});
    show(0);
  }

  function initReviewForm() {
    const dialog = $("#review-dialog");
    const form = $("#review-form");
    const openButton = $("#open-review-form");
    const closeButton = $("#close-review-form");
    const submitButton = $("#submit-review");
    const retryButton = $("#retry-review");
    const status = $("#review-form-status");
    const reviewList = $("#review-list");
    if (!dialog || !form || !openButton || !closeButton || !submitButton || !status || !reviewList) return;

    // Add reviews here only after manually approving them. Do not mark a client verified without verification.
    const approvedReviews = [
      { name: "Jesmitha Kumari", service: "CV Preparation", text: "Excellent CV preparation and professional guidance.", rating: 5 },
      { name: "Kiran Tadipalli", service: "CV Preparation", text: "Highly professional CV that helped improve my job applications.", rating: 5 },
      { name: "Khurram Ali", service: "Visa Assistance", text: "Very helpful with visa documentation and cover letters.", rating: 5 },
      { name: "Abid Hassan", service: "Visa Assistance", text: "Professional guidance throughout my visa application process.", rating: 5 },
      { name: "Lawrence", service: "Assignment Assistance", text: "Best assignment support. I received excellent grades.", rating: 5 },
      { name: "Alice M", service: "Assignment Assistance", text: "Well-structured assignment delivered on time with great quality.", rating: 5 }
    ];
    function renderReviews() {
      reviewList.replaceChildren();
      if (!approvedReviews.length) {
        const empty = document.createElement("p");
        empty.className = "reviews-empty";
        empty.textContent = "Be the first to share your experience.";
        reviewList.appendChild(empty);
        return;
      }
      approvedReviews.forEach(review => {
        const article = document.createElement("article");
        article.className = "review-card";
        const heading = document.createElement("div");
        heading.className = "review-card-head";
        const name = document.createElement("strong");
        name.textContent = review.name;
        const service = document.createElement("span");
        service.textContent = review.service;
        heading.append(name, service);
        if (Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5) {
          const rating = document.createElement("span");
          rating.className = "review-card-rating";
          rating.setAttribute("aria-label", `${review.rating} out of 5 stars`);
          rating.textContent = "★".repeat(review.rating);
          heading.appendChild(rating);
        }
        if (review.date) {
          const date = document.createElement("time");
          date.textContent = review.date;
          heading.appendChild(date);
        }
        if (review.verified === true) {
          const verified = document.createElement("span");
          verified.textContent = "Verified client";
          heading.appendChild(verified);
        }
        const quote = document.createElement("blockquote");
        quote.textContent = review.text;
        article.append(heading, quote);
        reviewList.appendChild(article);
      });
    }

    function configuredEndpoint() {
      try {
        const endpoint = new URL(form.dataset.reviewEndpoint || "");
        const validHost = endpoint.hostname === "formspree.io" || endpoint.hostname.endsWith(".formspree.io");
        return endpoint.protocol === "https:" && validHost && /^\/f\/[^/]+\/?$/.test(endpoint.pathname) ? endpoint.href : "";
      } catch {
        return "";
      }
    }

    const endpoint = configuredEndpoint();
    submitButton.disabled = !endpoint;
    status.textContent = endpoint
      ? "This form is configured to send reviews to the moderation service. A submission is confirmed only after the service responds."
      : "Review submission is not configured yet, so this form cannot send or store reviews.";
    status.dataset.state = endpoint ? "ready" : "unconfigured";
    const dateInput = $("#review-date", form);
    if (dateInput) {
      const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      dateInput.max = localToday;
    }
    const reviewText = form.elements.namedItem("review");
    const characterCount = $("#review-character-count");
    if (reviewText && characterCount) {
      reviewText.addEventListener("input", () => {
        characterCount.textContent = `${reviewText.value.length} / 1,200`;
        reviewText.setCustomValidity("");
      });
    }

    renderReviews();
    openButton.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
        $("#review-service", form).focus();
      }
    });
    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    if (retryButton) retryButton.addEventListener("click", () => form.requestSubmit());

    form.addEventListener("submit", async event => {
      event.preventDefault();
      const nameInput = form.elements.namedItem("name");
      nameInput.setCustomValidity(nameInput.value.trim() ? "" : "Enter a name or display name.");
      reviewText.setCustomValidity(reviewText.value.trim().length >= 20 ? "" : "Please write at least 20 characters.");
      if (!form.reportValidity()) {
        status.textContent = "Please correct the highlighted fields before submitting.";
        status.dataset.state = "error";
        return;
      }
      if (!endpoint) {
        status.textContent = "Submission is unavailable until the site owner configures the review service. Your review was not sent.";
        status.dataset.state = "error";
        return;
      }
      if (form.elements.namedItem("_gotcha").value) return;

      submitButton.disabled = true;
      submitButton.textContent = "Submitting…";
      if (retryButton) retryButton.hidden = true;
      status.textContent = "Sending your review securely…";
      status.dataset.state = "pending";
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`Review service returned ${response.status}`);
        status.textContent = "Your review was received and is pending moderation. It will not appear publicly unless approved.";
        status.dataset.state = "success";
        form.reset();
        if (characterCount) characterCount.textContent = "0 / 1,200";
      } catch (error) {
        console.error("Review submission failed.", error);
        status.textContent = "We could not confirm that your review was received. It was not marked as submitted; please retry.";
        status.dataset.state = "error";
        if (retryButton) retryButton.hidden = false;
      } finally {
        submitButton.disabled = !endpoint;
        submitButton.textContent = "Submit for review";
      }
    });
  }

  function init() {
    initMobileMenu();
    initHeader();
    initReveal();
    initCounters();
    initTicker();
    initGallery();
    initSlides();
    initReviewForm();
    initBooking();
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // Compatibility helper for any existing split-flap markup that calls FlapBoard.create().
  // The new design uses static headings by default; this API is retained for easy reuse.
  window.FlapBoard = window.FlapBoard || {
    create(container, words, options = {}) {
      if (!container) return { destroy() {} };
      const list = Array.isArray(words) ? words : [String(words || "")];
      const interval = Number(options.interval) > 0 ? Number(options.interval) : 2400;
      let index = 0;
      let timer = null;
      const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const paint = () => {
        container.textContent = list[index % list.length] || "";
        index += 1;
      };
      paint();
      if (!reduced && list.length > 1) timer = window.setInterval(paint, interval);
      return { destroy() { if (timer !== null) window.clearInterval(timer); timer = null; } };
    }
  };
})();