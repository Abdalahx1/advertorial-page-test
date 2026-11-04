/**
 * CLINICAL DERMA JOURNAL - INTERACTIVE ADVERTORIAL ENGINE
 * Product: Salicylic Acid + Vitamin B5 Duo Care Set
 */

// ========================================================
// 1. CONFIGURATION: TARGET PRODUCT URL
// ========================================================
// Update this URL with your custom AliExpress, Shopify, or affiliate tracking link
const PRODUCT_PURCHASE_URL = "https://www.aliexpress.us/item/3256813050600415.html";

document.addEventListener("DOMContentLoaded", () => {
  // Bind all CTA links & Track Outbound Clicks
  const buyButtons = document.querySelectorAll(".affiliate-link, .btn-cta, .btn-sidebar-cta, .btn-mobile-sticky");
  buyButtons.forEach(btn => {
    btn.setAttribute("href", PRODUCT_PURCHASE_URL);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");

    // OUTBOUND CLICK TRACKING LISTENER
    btn.addEventListener("click", (e) => {
      const buttonLocation = btn.classList.contains("btn-mobile-sticky") ? "mobile_sticky_bar" 
                           : btn.classList.contains("btn-sidebar-cta") ? "desktop_sidebar" 
                           : btn.closest(".offer-box") ? "offer_box_main" 
                           : "article_link";

      console.log(`[Outbound Click Tracked] Destination: ${PRODUCT_PURCHASE_URL} | From: ${buttonLocation}`);

      // 1. Google Analytics 4 Outbound Event
      if (typeof gtag === "function") {
        gtag("event", "click", {
          event_category: "outbound",
          event_label: buttonLocation,
          outbound_url: PRODUCT_PURCHASE_URL,
          value: 14.99
        });
      }

      // 2. Meta (Facebook) Pixel Event
      if (typeof fbq === "function") {
        fbq("track", "InitiateCheckout", {
          content_name: "Salicylic Acid + B5 Duo Care Set",
          content_category: "Skincare",
          value: 14.99,
          currency: "USD"
        });
      }

      // 3. TikTok Pixel Event
      if (typeof ttq !== "undefined" && typeof ttq.track === "function") {
        ttq.track("InitiateCheckout", {
          content_name: "Salicylic Acid + B5 Duo Care Set",
          value: 14.99,
          currency: "USD"
        });
      }

      // 4. Microsoft Clarity Tag
      if (typeof clarity === "function") {
        clarity("event", "outbound_click");
      }
    });
  });

  // ========================================================
  // 2. INTERACTIVE BEFORE / AFTER SLIDER
  // ========================================================
  const sliderInput = document.getElementById("baSlider");
  const overlay = document.getElementById("baOverlay");
  const handle = document.getElementById("baHandle");

  if (sliderInput && overlay && handle) {
    const updateSlider = (val) => {
      overlay.style.width = `${val}%`;
      handle.style.left = `${val}%`;
    };

    sliderInput.addEventListener("input", (e) => {
      updateSlider(e.target.value);
    });

    // Default 50%
    updateSlider(50);
  }

  // ========================================================
  // 3. INTERACTIVE SKIN TYPE ROUTINE ADVISOR
  // ========================================================
  const quizData = {
    oily: {
      ar: {
        title: "بروتوكول البشرة الدهنية والمسامات الواسعة",
        desc: "استخدمي الغسول مرتين يومياً (صباحاً ومساءً) مع التركيز لمدة 60 ثانية على منطقة الـ T-Zone وحول الأنف لتفكيك الدهون المتراكمة. بعد التجفيف بلطف، طبقي الكريم المرطب بـ B5 فوراً لمنع تحفيز إفراز دهون إضافية."
      },
      en: {
        title: "Oily Skin & Enlarged Pores Protocol",
        desc: "Use the Salicylic Acid Cleanser twice daily (morning & night), massaging into the T-zone and nose for 60 seconds to break down sebum plugs. Follow immediately with the B5 Soothing Cream to hydrate without triggering rebound oiliness."
      }
    },
    acne: {
      ar: {
        title: "بروتوكول البشرة المعرضة لحب الشباب والرؤوس السوداء",
        desc: "يعمل حمض الساليسيليك على اختراق المسام وقتل البكتيريا المسببة للحبوب، بينما يخفف فيتامين ب5 الالتهاب والاحمرار خلال ساعات. استخدمي الغسول بحركات دائرية خفيفة ثم المرطب لتهدئة البثور النشطة."
      },
      en: {
        title: "Acne-Prone & Blackhead Protocol",
        desc: "Salicylic acid clears active blemish microbes deep in follicles, while B5 soothes visible irritation and accelerates healing. Gentle morning/night duo use restores clear texture in under 14 days."
      }
    },
    combo: {
      ar: {
        title: "بروتوكول البشرة المختلطة (T-Zone دهنية وخدود جافة)",
        desc: "الغسول الذكي ينظم دهون الجبهة والأنف دون التسبب في أي قشور أو شد في منطقة الخدين، ثم يوفر كريم B5 التوازن المثالي عبر ترطيب خفيف وسريع الامتصاص لكامل الوجه."
      },
      en: {
        title: "Combination Skin (Oily T-Zone + Dry Cheeks) Protocol",
        desc: "The smart foaming cleanser balances forehead and nose shine without drying cheekbones. The lightweight B5 cream delivers deep multi-layer hydration with zero oily sheen."
      }
    },
    sensitive: {
      ar: {
        title: "بروتوكول البشرة الحساسة المعرضة للتهيج",
        desc: "بفضل تركيبة البانثينول (B5) المهدئة والمحمية لحاجز البشرة، يمكنك الاستفادة من قوة تقشير حمض الساليسيليك دون الشعور بالحرقان أو الاحمرار المعتاد في المقشرات الكيميائية القاسية."
      },
      en: {
        title: "Sensitive & Reactive Skin Protocol",
        desc: "Thanks to barrier-repairing Panthenol (B5), enjoy the pore-clearing power of Salicylic Acid without stinging, tightness, or redness associated with harsh chemical exfoliants."
      }
    }
  };

  const quizBtns = document.querySelectorAll(".quiz-btn");
  const quizResultTitle = document.getElementById("quizResultTitle");
  const quizResultDesc = document.getElementById("quizResultDesc");

  let currentType = "oily";

  quizBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      quizBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentType = btn.getAttribute("data-type");
      updateQuizDisplay();
    });
  });

  function updateQuizDisplay() {
    const isArabic = document.documentElement.lang === "ar" || document.body.getAttribute("dir") === "rtl";
    const langKey = isArabic ? "ar" : "en";
    if (quizData[currentType] && quizResultTitle && quizResultDesc) {
      quizResultTitle.textContent = quizData[currentType][langKey].title;
      quizResultDesc.textContent = quizData[currentType][langKey].desc;
    }
  }

  // ========================================================
  // 4. REAL-TIME SCARCITY & COUNTDOWN TIMER
  // ========================================================
  let stockCount = 17;
  const stockDisplay = document.getElementById("stockCount");

  // Decrement stock slowly to add authentic conversion urgency
  setInterval(() => {
    if (stockCount > 4 && Math.random() > 0.65) {
      stockCount--;
      if (stockDisplay) {
        stockDisplay.textContent = stockCount;
      }
    }
  }, 25000);

  // Countdown Timer (14:59)
  let timeRemaining = 14 * 60 + 59;
  const timerElement = document.getElementById("timerCountdown");

  function updateTimer() {
    if (!timerElement) return;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeRemaining > 0) {
      timeRemaining--;
    } else {
      timeRemaining = 15 * 60; // reset loop
    }
  }
  setInterval(updateTimer, 1000);
  updateTimer();

  // ========================================================
  // 5. FAQ ACCORDION
  // ========================================================
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // ========================================================
  // 6. LANGUAGE TOGGLE (ARABIC <-> ENGLISH)
  // ========================================================
  const langToggleBtn = document.getElementById("langToggleBtn");

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const isCurrentlyRTL = document.body.getAttribute("dir") === "rtl";
      if (isCurrentlyRTL) {
        switchToEnglish();
      } else {
        switchToArabic();
      }
    });
  }

  function switchToEnglish() {
    document.documentElement.lang = "en";
    document.body.setAttribute("dir", "ltr");
    langToggleBtn.innerHTML = `
      <svg style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
      العربية (RTL)
    `;
    translatePage("en");
    updateQuizDisplay();
  }

  function switchToArabic() {
    document.documentElement.lang = "ar";
    document.body.setAttribute("dir", "rtl");
    langToggleBtn.innerHTML = `
      <svg style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
      English (LTR)
    `;
    translatePage("ar");
    updateQuizDisplay();
  }

  function translatePage(lang) {
    const translatableElements = document.querySelectorAll("[data-i18n-ar]");
    translatableElements.forEach(el => {
      const text = lang === "ar" ? el.getAttribute("data-i18n-ar") : el.getAttribute("data-i18n-en");
      if (text) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.value = text;
        } else {
          el.innerHTML = text;
        }
      }
    });
  }
});
