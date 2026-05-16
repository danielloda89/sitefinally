(function () {
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
})();

const productData = {
  topliner: {
    title: "Topliner Cardboard",
    specs_name: "Advantages",
    description:
      "A structural face layer for corrugated cardboard used in packaging for perfume, cosmetics, smartphones, electronics, children's goods, premium footwear, and POS materials.",
    img: "../assets/images/big-topliner.png",
    specs: [
      "Up to 15% savings on post-print processing",
      "Calibrated thickness, uniform whiteness, and low water absorption",
      "High stiffness",
      "Premium paper-like appearance",
    ],
  },
  lygnosulfonate: {
    title: "Lignosulfonate",
    specs_name: "Applications",
    description: "A complex solution for different industries",
    img: "../assets/images/lygnosulfonate.png",
    specs: [
      "<b>Construction.</b> Concrete and reinforced concrete production: increases concrete strength by 20-25%, saves up to 15% cement without losing final strength class, and improves concrete mobility at only 0.25-0.35% of cement mass.",
      "<b>Fuel industry.</b> Briquetting coal fines, dust, and sludge: finished coal briquettes can cost twice as much as the raw material. Lignosulfonate is a key component for yield and profitability.",
      "<b>Mining and metallurgy.</b> Ore flotation and foundry production: improves metal recovery by 5-10% and reduces concentrate cost.",
      "<b>Oil and gas.</b> Drilling fluid viscosity regulator: a universal thinner and stabilizer for water-based drilling fluids.",
      "<b>Ceramics.</b> Slurry thinner and refractory binder: a 0.2-0.5% additive reduces slurry viscosity, lowers water content by 20-30%, and helps speed up production.",
      "<b>Chemical and fertilizer production.</b> Binds granules, stabilizes suspensions, prevents caking and crystal growth, and can save up to 15% on binder while increasing product strength.",
    ],
  },
  feedyeast: {
    title: "Feed Yeast",
    specs_name: "Advantages",
    description: "Bio-protein for livestock production and balanced feed formulas",
    img: "../assets/images/infographic.png",
    specs: [
      "Contains 40-55% highly digestible protein, B vitamins, enzymes, and probiotic components.",
      "Protein digestibility can reach up to 95%.",
      "Helps reduce the cost of expensive feed components by up to 15%.",
    ],
  },
};

const modal = document.getElementById("productModal");
const modalHeader = document.querySelector(".modal-header");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalSpecsName = document.getElementById("modalSpecsName");
const modalDescription = document.getElementById("modalDescription");
const modalSpecs = document.getElementById("modalSpecs");
const closeBtn = document.querySelector(".close-btn");
const modalContent = document.querySelector(".modal-content");
const productCards = document.querySelectorAll(".product-card");

function closeModal() {
  if (!modal) {
    return;
  }

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

productCards.forEach((card) => {
  card.addEventListener("click", function () {
    const productType = this.getAttribute("data-product");
    const data = productData[productType] || {
      title: this.querySelector("h3")?.textContent.trim() || "",
      specs_name: "",
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

      modalSpecs.innerHTML = "";
      data.specs.forEach((spec) => {
        const li = document.createElement("li");
        li.innerHTML = spec;
        modalSpecs.appendChild(li);
      });

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  });
});

if (closeBtn && modal) {
  ["click", "touchend"].forEach((eventName) => {
    closeBtn.addEventListener(eventName, function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    });
  });
}

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

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal && modal.style.display !== "none") {
    closeModal();
  }
});
