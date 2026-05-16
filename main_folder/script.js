(function () {
  // Theme toggle (preserved)
  const toggleBtn = document.querySelector("[data-theme-toggle]");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
    });
  }
  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  reveals.forEach((r) => observer.observe(r));

  // Simple dark theme style injection (keep original light as default)
  const style = document.createElement("style");
  style.textContent = `
                body.dark-theme {
                    --color-bg: #1a2a1a;
                    --color-surface: #2a3a2a;
                    --color-surface-2: #1f2e1f;
                    --color-text: #eef5e6;
                    --color-text-muted: #c0cfb0;
                    --color-border: rgba(139,195,74,0.3);
                }
            `;
  document.head.appendChild(style);

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (menuToggle && mainNav) {
    const syncMenu = (isOpen) => {
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      mainNav.classList.toggle("is-open", isOpen);
    };

    syncMenu(false);

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
      syncMenu(isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => syncMenu(false));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) {
        syncMenu(false);
      }
    });
  }
})();

const productData = {
  topliner: {
    title: "Картон Топлайнер",
    specs_name: "Преимущества",
    description:
      "Служит каркасом для плоских слоёв(лайнеров) в структуре гофрокартона: упаковка парфюмерии, косметики, смартфонов, электроники, детских товаров, дорогой обуви, а также для POS-материалов(дисплеи, коробана прилавок)",
    img: "../assets/images/big-topliner.png",
    specs: [
      "Экономия до 15% на постпечатной обработке",
      "Калиброванная толщина, однородная белизна, низкое водопоглощение",
      "Высокая жесткость",
      "Внешний вид как у премиальной бумаги",
    ],
  },
  lygnosulfonate: {
    title: "Лигносульфонат",
    specs_name: "Сферы применения",
    description: "Комплексное решение для разных отраслей",
    img: "../assets/images/lygnosulfonate.png",
    specs: [
      "<b>Строительство.</b> Производство бетона и железобетонных изделий:\n- увеличивает прочность бетона на 20-25% по сравнению с обычными смесями\n- экономит до 15% цемента без потери класса прочности конечного изделия, что значительно снижает себестоимость продукции\n- дозировка всего 0,25–0,35% от массы цемента повышает подвижность бетона(осадка конуса увеличивается с 4 см до 20 см)",
      "<b>Топливная промышленность.</b>\nБрикетирование угольной мелочи, пыли, шлама: готовые угольные брикеты стоят в два раза дороже исходного сырья. Лигносульфонат — ключевой компонент для максимальной прибыли и выхода продукта.",
      "<b>Горнорудная и металлургическая.</b>\nФлотация руд, литейное производство:повышает извлечение металла до 5-10% и снижает себестоимость концентрата;",
      "<b>Нефтегазовая.</b>\nРегулятор вязкости буровых растворов: универсальный разжижитель и стабилизатор для всех типов буровых жидкостей на водной основе.",
      "<b>Керамическая.</b>\nРазжижение шликера, связующее для огнеупоров: добавка 0.2–0.5% от массы сухих компонентов снижает вязкость шликера, позволяя уменьшить содержание воды на 20-30%, при этом шликер остаётся текучим. Это экономит энергию на помол и ускоряет производство.",
      "<b>Химическая. Производство удобрений.</b>\nСнижает себестоимость тонны: связывает гранулы (дозировка 0,5–1,0%), стабилизирует суспензии, предотвращает слёживание и рост кристаллов. Экономия до 15% на связующем при росте прочности продукта.",
    ],
  },
  feedyeast: {
    title: "Кормовые дрожи",
    specs_name: "Преимущества",
    description: "",
    img: "../assets/images/infographic.png",
    specs: [
      "Cодержат 40–55% легкоусваиваемого протеина, витамины группы B, ферменты и пробиотики.",
      "Усваиваемость протеина до 95%.",
      "Помогают снизить траты на дорогие корма вплоть до 15 %. ",
    ],
  },
  fluting: {
    title: "Флютинг",
    specs_name: "Преимущества",
    description:
      "Специальная гофрирующая бумага для среднего слоя гофрокартона. Обеспечивает отличные амортизационные свойства и защиту товаров при транспортировке. Подходит для всех типов гофрирования (E, B, C, BC флюта).",
    img: "https://placehold.co/600x200/556B2F/white?text=Fluting+Paper",
    specs: [
      "Плотность: 90-150 г/м²",
      "Тип гофры: E, B, C, BC",
      "CMT: > 180 N",
      "Стойкость к продавливанию: высокая",
      "Рекомендуемая влажность: 8-10%",
    ],
  },
};

// Get modal elements
const modal = document.getElementById("productModal");
const modalHeader = document.querySelector(".modal-header");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalSpecsName = document.getElementById("modalSpecsName");
const modalDescription = document.getElementById("modalDescription");
const modalSpecs = document.getElementById("modalSpecs");
const closeBtn = document.querySelector(".close-btn");
const modalContent = document.querySelector(".modal-content");

function closeModal() {
  if (!modal) {
    return;
  }

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Get all product cards
const productCards = document.querySelectorAll(".product-card");

// Add click event to each product card
productCards.forEach((card) => {
  card.addEventListener("click", function () {
    const productType = this.getAttribute("data-product");
    const data = productData[productType] || {
      title: this.querySelector("h3")?.textContent.trim() || "",
      description: this.querySelector("p")?.textContent.trim() || "",
      img: this.querySelector("img")?.src || "",
      specs: [],
    };

    if (
      modal &&
      modalTitle &&
      modalSpecsName &&
      modalDescription &&
      modalImg &&
      modalSpecs
    ) {
      modalTitle.textContent = data.title;
      modalSpecsName.textContent = data.specs_name;
      modalDescription.textContent = data.description;
      if (modalHeader) {
        modalHeader.classList.toggle(
          "modal-header--fit",
          productType === "feedyeast",
        );
        modalHeader.style.backgroundImage = `url("${data.img}")`;
      }
      modalImg.src = data.img;
      modalImg.alt = data.title;

      // Clear and populate specs list
      modalSpecs.innerHTML = "";
      data.specs.forEach((spec) => {
        const li = document.createElement("li");
        li.innerHTML = spec;
        modalSpecs.appendChild(li);
      });

      // Show modal
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  });
});

// Close modal on X click
if (closeBtn && modal) {
  ["click", "touchend"].forEach((eventName) => {
    closeBtn.addEventListener(eventName, function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    });
  });
}

// Close modal when clicking outside the modal content
if (modal && modalContent) {
  ["click", "touchend"].forEach((eventName) => {
    modal.addEventListener(eventName, function (event) {
      if (!modalContent.contains(event.target)) {
        closeModal();
      }
    });
  });
}

if (modalContent) {
  ["click", "touchend"].forEach((eventName) => {
    modalContent.addEventListener(eventName, function (event) {
      event.stopPropagation();
    });
  });
}

// Close modal on Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal && modal.style.display !== "none") {
    closeModal();
  }
});
