const taglines = [
  "Reverse engineering sin miedo al reloj.",
  "Exploits quirúrgicos con narrativa creativa.",
  "OSINT, hardware hacking y zero-day hunting.",
  "Simetría operativa para cualquier tablero CTF.",
];

const typingTarget = document.getElementById("dynamic-tagline");
let taglineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentTagline = taglines[taglineIndex];
  if (!typingTarget) return;

  if (!deleting) {
    typingTarget.textContent = currentTagline.slice(0, charIndex++);
    if (charIndex > currentTagline.length + 12) {
      deleting = true;
    }
  } else {
    typingTarget.textContent = currentTagline.slice(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
    }
  }

  const delay = deleting ? 40 : 110;
  setTimeout(typeLoop, delay);
}

typeLoop();

/* Team rendering */
const team = [
  {
    name: "Fairwellito — Jose Andres Acuña Rodriguez",
    specialty: "Ofensiva & Forense",
    bio: "Como voy a saber si no se",
    avatar: "https://avatars.githubusercontent.com/JoseAndres20",
    profession: "Ingeniero en Tecnologías de la Información",
    github: "https://github.com/JoseAndres20",
    linkedin: "https://www.linkedin.com/in/joseandresacuna/",
    skills: ["Red Team", "Blue Team","Forense", "Exploit"],
  },
  {
    name: "Carlos Bravo Torres",
    specialty: "Offensive Debug & Firmware",
    bio: "Como voy a saber si no se",
    avatar: "https://avatars.githubusercontent.com/IamBr4vo",
    profession: "Ingeniero en Tecnologías de la Información",
    github: "https://github.com/IamBr4vo",
    linkedin: "https://www.linkedin.com/in/carlosbravo0405/",
    skills: ["Red Team", "Blue Team","Forense", "Exploit"],
  },
  {
    name: "Jairo Rodriguez Castro",
    specialty: "OSINT & Señuelos",
    bio: "Como voy a saber si no se",
    avatar: "https://avatars.githubusercontent.com/Jairo-RC",
    profession: "Ingeniero en Tecnologías de la Información",
    github: "https://github.com/Jairo-RC",
    linkedin: "https://www.linkedin.com/in/jairo-rodriguez-castro-a016ab193",
    skills: ["Blue Team", "Red Team", "Forense", "Exploit"],
  },
];

const teamGrid = document.getElementById("teamGrid");
if (teamGrid) {
  team.forEach((member, index) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";
    const highlightPhrase = "Como voy a saber si no se";
    const highlightedBio = member.bio.replace(
      new RegExp(highlightPhrase, "gi"),
      `<span class="bio-highlight">${highlightPhrase}</span>`
    );
    col.innerHTML = `
      <article class="team-card h-100" data-animate="rise" style="transition-delay:${index * 0.1}s">
        <img class="team-avatar" src="${member.avatar}" alt="${member.name}" loading="lazy" />
        <h3 class="h4">${member.name}</h3>
        <p class="team-specialty">${member.specialty}</p>
        <span class="profession-tag">${member.profession}</span>
        <p>${highlightedBio}</p>
        <div class="badge-grid mb-3">
          ${member.skills.map((badge) => `<span>${badge}</span>`).join("")}
        </div>
        <div class="contact-links">
          <a href="${member.linkedin}" target="_blank" rel="noreferrer">
            <i class="bi bi-linkedin me-2"></i>LinkedIn
          </a>
          <a href="${member.github}" target="_blank" rel="noreferrer">
            <i class="bi bi-github me-2"></i>GitHub
          </a>
        </div>
      </article>
    `;
    teamGrid.appendChild(col);
  });
}

/* Scroll observer for animations */
const animatedElements = document.querySelectorAll("[data-animate]");
const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        animateObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animatedElements.forEach((el) => animateObserver.observe(el));

/* Counter animation */
const statNumbers = document.querySelectorAll(".stat-number[data-stat]");
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const targetValue = parseFloat(element.dataset.stat);
      let current = 0;
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = targetValue * progress;
        element.textContent = targetValue < 1 ? current.toFixed(2) : Math.floor(current).toString().padStart(2, "0");
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
      statObserver.unobserve(element);
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((stat) => statObserver.observe(stat));

/* subtle hero parallax */
const heroCard = document.querySelector(".hero-card");
if (heroCard) {
  heroCard.addEventListener("mousemove", (event) => {
    const card = event.currentTarget;
    const x = (event.offsetX / card.clientWidth - 0.5) * 6;
    const y = (event.offsetY / card.clientHeight - 0.5) * 6;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

/* navbar active + glow */
const nav = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link[data-nav]");
const watchSections = Array.from(document.querySelectorAll("section[id]"));

function updateNavState() {
  if (nav) {
    nav.classList.toggle("is-scrolled", window.scrollY > 30);
  }

  const fromTop = window.scrollY + 160;
  let current = "hero";
  watchSections.forEach((section) => {
    if (fromTop >= section.offsetTop && fromTop < section.offsetTop + section.offsetHeight) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === current);
  });
}

updateNavState();
window.addEventListener("scroll", updateNavState);

/* footer year */
const yearTarget = document.getElementById("currentYear");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}
