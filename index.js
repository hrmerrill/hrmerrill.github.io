// ===== Role Switcher =====
const heroTitleEl = document.getElementById('hero-title');
const bioTextEl   = document.getElementById('bio-text');

const originalHeroTitle = 'Principal Data Scientist | Program Lead';
const originalBioText   = bioTextEl ? bioTextEl.innerHTML : '';

const roleConfig = {
  ds: {
    title: 'Data Scientist',
    bio: 'Outcome-driven <strong>Data Scientist</strong> with 8+ years applying advanced probabilistic and deep learning methods to high-impact problems in agriculture and global health. Expert in Bayesian modeling, uncertainty quantification, and probabilistic forecasting. Author of multiple <a href="https://scholar.google.com/citations?user=Tpw16M0AAAAJ" target="_blank" rel="noopener noreferrer">peer-reviewed publications</a> and <a href="https://patents.google.com/?inventor=Hunter+Merrill" target="_blank" rel="noopener noreferrer">patents</a>.',
  },
  eng: {
    title: 'ML Engineer | Full-Stack Developer',
    bio: 'Outcome-driven <strong>ML Engineer</strong> with end-to-end experience building and deploying production ML systems — from model development to cloud infrastructure (AWS, GCP, DigitalOcean), CI/CD pipelines, Docker containerization, and large-scale data processing with Apache Spark. Delivered real-world systems for agriculture and global health.',
  },
  lead: {
    title: 'Technical Program Lead',
    bio: 'Outcome-driven <strong>Technical Program Lead</strong> with 4+ years leading cross-functional agile teams to deliver scalable AI solutions for agriculture and global health. Defines scientific strategy, sets quarterly roadmaps, manages stakeholders, and aligns data science research with commercial business goals.',
  },
};

function setRole(role) {
  // Update buttons
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });

  // Update URL
  const url = new URL(window.location);
  if (role === 'all') { url.searchParams.delete('role'); }
  else { url.searchParams.set('role', role); }
  history.pushState({}, '', url);

  // Swap hero bio
  if (role !== 'all' && roleConfig[role]) {
    heroTitleEl.textContent = roleConfig[role].title;
    bioTextEl.innerHTML     = roleConfig[role].bio;
  } else {
    heroTitleEl.textContent = originalHeroTitle;
    bioTextEl.innerHTML     = originalBioText;
  }

  // Dim bullets that don't match this role
  document.querySelectorAll('li[data-roles]').forEach(li => {
    if (role === 'all') {
      li.classList.remove('role-dimmed');
    } else {
      const roles = li.dataset.roles.split(' ');
      li.classList.toggle('role-dimmed', !roles.includes(role));
    }
  });

  // Show/hide skill cards
  document.querySelectorAll('.skill-card[data-roles]').forEach(card => {
    if (role === 'all') {
      card.classList.remove('role-hidden');
    } else {
      const roles = card.dataset.roles.split(' ');
      card.classList.toggle('role-hidden', !roles.includes(role));
    }
  });
}

// Expose for inline onclick handlers (module scope ≠ global)
window.setRole = setRole;

// ===== Collapsible Experience Entries =====
function toggleEntry(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  const wrap = document.getElementById(btn.dataset.target);
  wrap.classList.toggle('open', !expanded);
}

window.toggleEntry = toggleEntry;

// ===== Active Nav Link on Scroll =====
const sections  = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ===== Fade-in on Scroll =====
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.tl-card, .skill-card, .info-card, .edu-entry').forEach(el => {
  el.classList.add('fade-target');
  fadeObserver.observe(el);
});

// ===== Apply ?role= query param on load =====
document.addEventListener('DOMContentLoaded', () => {
  const params      = new URLSearchParams(window.location.search);
  const initialRole = params.get('role');
  if (initialRole && roleConfig[initialRole]) {
    setRole(initialRole);
  }
});
