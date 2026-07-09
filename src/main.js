import './style.css';
import './intro.css';
import { initHackerRoom } from './hackerRoom.js';

// ─── FOLDER CONTENT FOR FAKE DESKTOP ────────────────────
const FOLDERS = [
  'exploits/', '0days/', 'tools/', 'scripts/', 'recon/',
  'payloads/', 'wordlists/', 'sessions/', 'loot/', 'notes/',
  'portfolio_v2/', 'private/', 'configs/', 'logs/', 'backups/',
  'network_maps/', 'creds.txt', 'targets.txt', 'README.md',
  'nmap_results/', 'metasploit/', 'web_shells/', 'social_eng/',
  'phishing/', 'rootkits/', 'keyloggers/', 'pivots/', 'C2/',
];

function folderSVG(isFile = false) {
  if (isFile) return `<svg viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="34" height="26" rx="2" fill="#0a1a0a" stroke="#00ff44" stroke-width="1.5"/><line x1="4" y1="14" x2="38" y2="14" stroke="#00ff44" stroke-width="1"/><text x="21" y="27" font-size="8" fill="#00ff44" text-anchor="middle" font-family="monospace">TXT</text></svg>`;
  return `<svg viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10 Q2 8 4 8 L16 8 L19 5 L38 5 Q40 5 40 7 L40 30 Q40 32 38 32 L4 32 Q2 32 2 30 Z" fill="#0a1a0a" stroke="#00ff44" stroke-width="1.5"/><path d="M2 14 L40 14" stroke="#00ff44" stroke-width="0.8" opacity="0.5"/></svg>`;
}

function buildFakeDesktop() {
  const area = document.getElementById('desktop-area');
  if (!area) return;
  FOLDERS.forEach((name, i) => {
    const isFile = name.endsWith('.txt') || name.endsWith('.md');
    const div = document.createElement('div');
    div.className = 'folder-icon';
    div.style.animationDelay = `${i * 0.04}s`;
    div.innerHTML = `${folderSVG(isFile)}<span>${name}</span>`;
    div.addEventListener('click', () => {
      document.querySelectorAll('.folder-icon').forEach(f => f.classList.remove('selected'));
      div.classList.add('selected');
    });
    area.appendChild(div);
  });
}

function startClock() {
  function tick() {
    const now = new Date();
    const t = now.toLocaleTimeString('en-US', { hour12: false });
    const d = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const els = ['intro-time','desktop-time'].map(id => document.getElementById(id));
    els.forEach(el => { if (el) el.textContent = t; });
    const cl = document.getElementById('tb-clock-time');
    if (cl) cl.innerHTML = `${t}<br>${d}`;
  }
  tick();
  setInterval(tick, 1000);
}

function enterPortfolio() {
  const glitch    = document.getElementById('glitch-overlay');
  const intro     = document.getElementById('intro-wrapper');
  const space     = document.getElementById('intro-scroll-space');
  const portfolio = document.getElementById('portfolio-wrapper');
  glitch.classList.add('glitching');
  setTimeout(() => {
    if (intro) intro.style.display = 'none';
    if (space) space.remove();
    window.scrollTo(0, 0);
    if (portfolio) portfolio.classList.add('revealed');
    document.body.style.overflow = '';
    glitch.classList.remove('glitching');
  }, 900);
}

document.addEventListener('DOMContentLoaded', () => {
  startClock();

  // 1. Launch Hacker Room Intro
  const introCanvas = document.getElementById('intro-canvas');
  const scrollSpace = document.getElementById('intro-scroll-space');

  if (introCanvas) {
    initHackerRoom(introCanvas, () => {
      buildFakeDesktop();
      const desktop  = document.getElementById('fake-desktop');
      const enterBtn = document.getElementById('enter-portfolio-btn');
      const hint     = document.getElementById('scroll-hint');
      if (hint) hint.style.display = 'none';
      if (scrollSpace) scrollSpace.style.height = '0';
      setTimeout(() => {
        if (desktop) desktop.classList.add('visible');
        if (enterBtn) enterBtn.classList.add('visible');
      }, 200);
    });
  }

  // 2. Enter Portfolio Button
  document.getElementById('enter-portfolio-btn')?.addEventListener('click', enterPortfolio);

  // 3. Initialize circuit background for portfolio (lazy)
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas) {
    import('./particles.js').then(({ initParticles }) => initParticles(bgCanvas));
  }

  // 4. Terminal Typewriter Animation Engine

  const terminalBody = document.getElementById('terminal-body');
  
  const terminalSequence = [
    { type: 'input', text: 'npx introduce-self' },
    { 
      type: 'output', 
      text: [
        'Fetching profile metadata... [OK]',
        '========================================',
        'NAME:     Saurabh',
        'ROLE:     Computer Science Student',
        'FOCUS:    Data Structures & Web Graphics',
        'STATUS:   Open for Software Internships!',
        '========================================'
      ]
    },
    { type: 'input', text: 'cat skills.json' },
    {
      type: 'output',
      text: [
        '{',
        '  "languages": ["JavaScript", "C++", "Python", "SQL"],',
        '  "technologies": ["Three.js", "Node.js", "Vite", "Git"],',
        '  "interests": ["Graph Theory", "P2P Encryption"]',
        '}'
      ]
    },
    { type: 'input', text: 'echo "Ready to build something amazing"' }
  ];

  let seqIndex = 0;
  
  const createPromptLine = () => {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-prompt">developer@saurabh:~$</span><span class="terminal-input"></span><span class="terminal-cursor"></span>`;
    terminalBody.appendChild(line);
    return line;
  };

  const createOutputLine = (text) => {
    const line = document.createElement('div');
    line.className = 'terminal-output';
    line.textContent = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  const typeInput = (element, text, charIdx, callback) => {
    if (charIdx < text.length) {
      element.textContent += text.charAt(charIdx);
      setTimeout(() => typeInput(element, text, charIdx + 1, callback), 60);
    } else {
      // Remove cursor from this line and callback
      const cursor = element.nextSibling;
      if (cursor && cursor.classList.contains('terminal-cursor')) {
        cursor.remove();
      }
      setTimeout(callback, 500);
    }
  };

  const runSequence = () => {
    if (seqIndex >= terminalSequence.length) {
      // End of sequence, add final static prompt with blinking cursor
      const finalPrompt = createPromptLine();
      return;
    }

    const currentStep = terminalSequence[seqIndex];
    seqIndex++;

    if (currentStep.type === 'input') {
      const line = createPromptLine();
      const inputSpan = line.querySelector('.terminal-input');
      typeInput(inputSpan, currentStep.text, 0, () => {
        runSequence();
      });
    } else if (currentStep.type === 'output') {
      let lineDelay = 0;
      currentStep.text.forEach((lineText, i) => {
        setTimeout(() => {
          createOutputLine(lineText);
          if (i === currentStep.text.length - 1) {
            setTimeout(runSequence, 600);
          }
        }, lineDelay);
        lineDelay += 150; // Delay between printing each output line
      });
    }
  };

  // Start terminal script after 1 second delay
  setTimeout(runSequence, 1000);


  // 3. Scroll-linked Navigation Highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);


  // 4. Certificate Carousel Slider
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentSlideIndex = 0;

  const updateCarouselPosition = () => {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 32; // Gap of 2rem
    const moveAmount = (slideWidth + gap) * currentSlideIndex;
    
    track.style.transform = `translateX(-${moveAmount}px)`;
  };

  if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
      const slidesCount = document.querySelectorAll('.carousel-slide').length;
      const visibleSlides = window.innerWidth > 968 ? 2 : 1;
      
      if (currentSlideIndex < slidesCount - visibleSlides) {
        currentSlideIndex++;
        updateCarouselPosition();
      } else {
        // Loop back to start
        currentSlideIndex = 0;
        updateCarouselPosition();
      }
    });

    prevBtn.addEventListener('click', () => {
      const slidesCount = document.querySelectorAll('.carousel-slide').length;
      const visibleSlides = window.innerWidth > 968 ? 2 : 1;
      
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateCarouselPosition();
      } else {
        // Jump to end
        currentSlideIndex = Math.max(0, slidesCount - visibleSlides);
        updateCarouselPosition();
      }
    });

    window.addEventListener('resize', () => {
      // Re-align on resize
      currentSlideIndex = 0;
      updateCarouselPosition();
    });
  }


  // 5. Certificate Modals Viewer Logic
  const certData = {
    'aws-cloud': {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      verificationId: 'AWS-ASA-994821-KM',
      body: 'Verified skills in designing cost-efficient, fault-tolerant, and scalable distributed systems on AWS. Detailed modules included: VPC Network Topologies, IAM security postures, Auto-scaling setups, S3 caching algorithms, and EC2/RDS deployment patterns.',
      verifyUrl: 'https://aws.amazon.com/verification'
    },
    'gcp-associate': {
      title: 'Associate Cloud Engineer',
      issuer: 'Google Cloud Platform',
      verificationId: 'GCP-ACE-88402-KM',
      body: 'Demonstrates capabilities to deploy applications, monitor operations, and manage enterprise solutions on Google Cloud. Handled Compute Engine VMs, Google Kubernetes Engine clusters, Cloud SQL, BigQuery analytics, and IAM resource mappings.',
      verifyUrl: 'https://google.accredible.com'
    },
    'dsa-expert': {
      title: 'Data Structures & Algorithms Expert',
      issuer: 'Coursera (Princeton University)',
      verificationId: 'COUR-DSA-5527-KM',
      body: 'Rigorous studies covering elementary data structures, union-find algorithms, quicksort/mergesort variations, binary heaps, graph-search models (BFS, DFS, Dijkstra, A*), minimum spanning trees (Prim, Kruskal), and substring search algorithms.',
      verifyUrl: 'https://coursera.org/verify'
    },
    'codeforces-expert': {
      title: 'Competitive Programming Expert',
      issuer: 'Codeforces (Max Rating 1650+)',
      verificationId: 'CF-HANDLE-SAURABH',
      body: 'Active solver of advanced algorithmic challenges, achieving an Expert rank on Codeforces. Demonstrates quick analytical skills under pressure in graph modeling, dynamic programming, number theory, and complex computational geometry.',
      verifyUrl: 'https://codeforces.com/profile'
    }
  };

  const modal = document.getElementById('cert-modal');
  const modalClose = document.getElementById('modal-close');
  const certCards = document.querySelectorAll('.certificate-card');

  if (modal && modalClose) {
    // Open Modal
    certCards.forEach(card => {
      card.addEventListener('click', () => {
        const certId = card.getAttribute('data-cert-id');
        const data = certData[certId];
        
        if (data) {
          document.getElementById('modal-title').textContent = data.title;
          document.getElementById('modal-issuer').textContent = data.issuer;
          document.getElementById('modal-verification-id').textContent = `VERIFICATION ID: ${data.verificationId}`;
          document.getElementById('modal-body').textContent = data.body;
          document.getElementById('modal-verify-link').setAttribute('href', data.verifyUrl);
          
          modal.classList.add('active');
        }
      });
    });

    // Close Modal
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });
  }


  // 6. Contact Form Mock Submission Handler
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate API submit delay
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success and reset form
        formSuccess.style.display = 'block';
        contactForm.reset();
        
        // Hide success alert after 5 seconds
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }
});
