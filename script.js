// Core Mechanics and Logic

// DOM Elements
const mouseGlow = document.getElementById('mouse-glow');
const particlesCanvas = document.getElementById('particles-bg');
const introScreen = document.getElementById('intro-screen');
const mainLayout = document.getElementById('main-layout');
const glassLayer = document.getElementById('glass-layer');
const crack = document.getElementById('crack');
const introContent = document.getElementById('intro-content');
const enterBtn = document.getElementById('enter-btn');
const bashGrid = document.querySelector('.bash-grid');
const membersGrid = document.querySelector('.members-grid');
const memoriesGrid = document.getElementById('memories-grid');

// Audios
const sfxPunch = document.getElementById('sfx-punch');
const sfxGlass = document.getElementById('sfx-glass');
const sfxEnter = document.getElementById('sfx-enter');
const sfxNavHover = document.getElementById('sfx-nav-hover');
const sfxNavClick = document.getElementById('sfx-nav-click');
const sfxCardHover = document.getElementById('sfx-card-hover');
const sfxModalOpen = document.getElementById('sfx-modal-open');
const sfxTyping = document.getElementById('sfx-typing');

function playSound(soundElement) {
    if (soundElement) {
        soundElement.currentTime = 0;
        soundElement.play().catch(e => console.log('Audio play prevented by browser policy'));
    }
}

// 1. Mouse Glow Effect
document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
});

// Interactive Elements Hover Sounds (Separated for logic)
document.querySelectorAll('.nav-btn').forEach(el => {
    el.addEventListener('mouseenter', () => playSound(sfxNavHover));
    el.addEventListener('click', () => playSound(sfxNavClick));
});

document.querySelectorAll('.project-card, .bash-item, .member-card, .skill-node, .memory-card, .cyber-btn').forEach(el => {
    el.addEventListener('mouseenter', () => playSound(sfxCardHover));
});

// Deep Global Sound Effects addition for remaining UI
document.querySelectorAll('.social-links a').forEach(el => {
    el.addEventListener('mouseenter', () => playSound(sfxNavHover));
    el.addEventListener('click', () => playSound(sfxNavClick));
});

document.querySelectorAll('.skill-tag, .profile-img, .close-btn, h1.glitch, h2.section-title, .stat-item, .memory-info h4').forEach(el => {
    el.addEventListener('mouseenter', () => playSound(sfxCardHover));
});

// Dynamic Terminal Boot Sequence
const terminalText = document.getElementById('terminal-text');
const terminalContainer = document.getElementById('terminal-container');
const bootLines = [
    "From Rookie to Clan Member – Our Journey in Bashers Community...",
    "6 Weekly Bash, 4 Clans, One Journey...",
    "Code • Compete • Create • Bashers...",
    "Loading Clan Records...",
    "SYSTEM READY [ CLICK TO SHATTER ]"
];
let currentLine = 0;
let currentChar = 0;

function typeTerminal() {
    // Attempt to play typing noise only once on first characters so it loops
    if (sfxTyping.paused && currentLine < bootLines.length) {
        sfxTyping.volume = 0.5;
        sfxTyping.play().catch(e => console.log("Typing audio blocked by browser policy"));
    }

    if (currentLine < bootLines.length) {
        if (currentChar < bootLines[currentLine].length) {
            terminalText.innerHTML += bootLines[currentLine].charAt(currentChar);
            currentChar++;
            setTimeout(typeTerminal, 20 + Math.random() * 40);
        } else {
            terminalText.innerHTML += "<br>";
            currentLine++;
            currentChar = 0;

            // Shorter delay between lines, pause audio
            sfxTyping.pause();
            setTimeout(typeTerminal, currentLine === bootLines.length - 1 ? 600 : 200);
        }
    } else {
        sfxTyping.pause();
        const finalPrompt = bootLines[bootLines.length - 1];
        terminalText.innerHTML = terminalText.innerHTML.replace(finalPrompt, `<span class='pulse-prompt'>${finalPrompt}</span>`);
    }
}

// Browser Audio Policy Bypass
const startOverlay = document.getElementById('start-overlay');
startOverlay.addEventListener('click', () => {
    startOverlay.style.display = 'none';
    // Initialize terminal precisely 400ms after audio context unlocks
    setTimeout(typeTerminal, 400);
});

// 2. Intro Sequence
let isPunched = false;

glassLayer.addEventListener('click', (e) => {
    if (!isPunched) {
        if (currentLine < bootLines.length) return; // Wait for boot

        isPunched = true;
        terminalContainer.style.display = 'none';

        playSound(sfxPunch);

        // Execute 3D Cinematic Reveal & Audio
        const logoContainer = document.getElementById('logo-container');
        if (logoContainer) {
            logoContainer.classList.add('reveal-3d-active');
        }
        const sfxLogoReveal = document.getElementById('sfx-logo-reveal');
        if (sfxLogoReveal) {
            sfxLogoReveal.volume = 0.7;
            sfxLogoReveal.play().catch(e => console.log('Audio overlap'));
        }

        setTimeout(() => playSound(sfxGlass), 100);

        // Procedural Glass Shards Explosion
        for (let i = 0; i < 40; i++) {
            let shard = document.createElement('div');
            shard.className = 'shard';
            shard.style.left = e.clientX + 'px';
            shard.style.top = e.clientY + 'px';
            document.body.appendChild(shard);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 80 + Math.random() * 400;
            const rotX = Math.random() * 1080;
            const rotY = Math.random() * 1080;
            const rotZ = Math.random() * 1080;

            shard.animate([
                { transform: `translate(-50%, -50%) rotate3d(0,0,0,0) scale(1)`, opacity: 1 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px)) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1500,
                easing: 'cubic-bezier(.17,.67,.83,.67)'
            });
            setTimeout(() => shard.remove(), 2500);
        }

        // Show central crack
        crack.style.left = e.clientX + 'px';
        crack.style.top = e.clientY + 'px';
        crack.style.opacity = 1;
        crack.style.width = '250px';
        crack.style.height = '250px';

        glassLayer.classList.add('shatter');
        document.body.classList.add('shake-screen');

        setTimeout(() => {
            introContent.classList.remove('hidden');
            setTimeout(() => {
                enterBtn.classList.remove('hidden');
            }, 2000);
        }, 800);
    }
});

enterBtn.addEventListener('click', () => {
    playSound(sfxEnter);
    const flash = document.getElementById('flash-bang');
    flash.classList.add('flash'); // Instant white

    setTimeout(() => {
        introScreen.style.display = 'none';
        mainLayout.classList.remove('hidden');
        flash.classList.remove('flash'); // Slow fade out from white
        flash.style.opacity = '0';
    }, 150); // Flash duration before swap
});

// 3. Navigation
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.add('hidden'));

        // Add active to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        targetSection.classList.remove('hidden');
    });
});

// 4. Populate Dynamic Sections

// Weekly Bash
const weeklyBashes = [
    {
        title: "Week 1 – Rookie Weekly Bash",
        subtitle: "Beginning of Journey",
        img: "WEEKLY BASH/W1.jpg",
        desc: `<p>Week 1 was our first entry into the Bashers Community. We were introduced as new members and given the name Rookies.</p>
           <p><strong>In this session:</strong></p>
           <ul>
             <li>Community introduction was given</li>
             <li>Bashers meaning and rules were explained</li>
             <li>There are 4 clans in the community</li>
             <li>We were asked to choose clan later</li>
             <li>Everyone gave self-introduction</li>
             <li>Small technical tasks were given</li>
             <li>Selection round was conducted</li>
           </ul>
           <p>This week helped us understand the community structure and teamwork.</p>`
    },
    {
        title: "Week 2 – Luminar Weekly Bash",
        subtitle: "Luminar Clan Session",
        img: "WEEKLY BASH/W2.jpg",
        desc: `<p>Week 2 bash was conducted by Luminar Clan, one of the four clans in Bashers Community.</p>
           <p>This session was more interactive and fun compared to the first week. We had a friendly meeting in the afternoon where everyone participated actively.</p>
           <p><strong>Activities included:</strong></p>
           <ul>
             <li>Programming session</li>
             <li>Git start introduction</li>
             <li>Team interaction</li>
             <li>Lunch break discussion</li>
             <li>Shuffle relay game</li>
             <li>Accuracy challenge</li>
           </ul>
           <p>This bash helped us improve teamwork and communication skills.</p>`
    },
    {
        title: "Week 3 – Shadastria Adepti Weekly Bash",
        subtitle: "Shadastria Adepti Session",
        img: "WEEKLY BASH/W3.jpg",
        desc: `<p>Week 3 bash was conducted by Shadastria Adepti Clan.</p>
           <p>This bash focused on competition and group activities.</p>
           <p><strong>Activities included:</strong></p>
           <ul>
             <li>Competitive program session</li>
             <li>Break the box challenge</li>
             <li>Byte size battles</li>
             <li>Freshie panic round</li>
             <li>Feedback session</li>
           </ul>
           <p>This week was exciting because we had more games and technical tasks.</p>`
    },
    {
        title: "Week 4 – Aura 7F Weekly Bash",
        subtitle: "Aura 7F Session",
        img: "WEEKLY BASH/W4.jpg",
        desc: `<p>Week 4 bash was conducted by Aura 7F Clan.</p>
           <p>This bash had many creative and thinking activities.</p>
           <p><strong>Activities included:</strong></p>
           <ul>
             <li>Blueprint session</li>
             <li>Blockpop challenge</li>
             <li>Control the game activity</li>
             <li>Level up live round</li>
             <li>Final conclusion session</li>
           </ul>
           <p>This bash improved our thinking speed and teamwork.</p>`
    },
    {
        title: "Week 5 – Belmonts Chronicle Bash",
        subtitle: "Belmonts Chronicle",
        img: "WEEKLY BASH/W5.jpg",
        desc: `<p>Week 5 bash was conducted by Belmonts Clan.</p>
           <p>This bash had a unique theme and story style event.</p>
           <p><strong>Activities included:</strong></p>
           <ul>
             <li>Throne hall arrangement</li>
             <li>Opening proclamation</li>
             <li>Imperial nexus session</li>
             <li>Forge of Ingenium</li>
             <li>Quest for lost relic</li>
             <li>Arena of valor round</li>
           </ul>
           <p>This bash was very interesting and creative. We learned teamwork and leadership.</p>`
    },
    {
        title: "Week 6 – Wrap Up Bash",
        subtitle: "Final Wrap Up",
        img: "WEEKLY BASH/W6.jpg",
        desc: `<p>Week 6 bash was the final bash of our journey.</p>
           <p><strong>This session included:</strong></p>
           <ul>
             <li>Intro and hurdle activity</li>
             <li>Comeback session</li>
             <li>Rookie rounds</li>
             <li>Lunch break</li>
             <li>Final feeds</li>
             <li>Rookie reward</li>
             <li>Closing session</li>
           </ul>
           <p>In this bash, we presented our project and completed our rookie journey in Bashers Community.</p>
           <p>This was the most memorable bash.</p>`
    }
];

if (bashGrid) {
    weeklyBashes.forEach((bash, index) => {
        bashGrid.innerHTML += `
            <div class="bash-item tilt-card" onclick="openBash(${index})">
                <img src="${bash.img}" alt="${bash.title}">
                <h4>${bash.title}</h4>
                <p>${bash.subtitle}</p>
            </div>
        `;
    });
}

// Members
const clanMembers = [
    { name: 'Aadhithya Mahesh', role: 'Captain Basher (CB)', domain: 'Game Developer', character: 'Julia Belmont', img: 'MEMBERS/AADHITHYA MAHESH.png' },
    { name: 'Geo Nithin', role: 'Captain Basher (CB)', domain: 'Full-stack Web Developer', character: 'Richter Belmont', img: 'MEMBERS/GEO NITHIN.png' },
    { name: 'Sriharshini', role: 'OG Captain Basher (OG CB)', domain: 'Full-stack Web Developer', character: 'Sypha Belnades', img: 'MEMBERS/SRIHARSHINI.png' },
    { name: 'Jeswin Antony', role: 'EO Organizer', domain: 'AI / ML', character: 'Juste Belmont', img: 'MEMBERS/JESWIN ANTONY.png' },
    { name: 'Michal Nithish', role: 'IT Organizer', domain: 'Software Developer', character: 'Leon Belmont', img: 'MEMBERS/MICHAL NITHISH.png' },
    { name: 'Maxwell Rubert', role: 'Former Lead Organizer', domain: 'Data Scientist', character: 'Simon Belmont', img: 'MEMBERS/MAXWELL RUBERT.png' },
    { name: 'Prim Sajun', role: 'Basher', domain: 'Web Developer & UI/UX Designer', character: 'Trevor Belmont', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=150&q=80' },
    { name: 'Amrutha', role: 'Basher', domain: 'Full Stack Developer & AI Integration', character: 'Charlotte Aulin', img: 'MEMBERS/AMRUTHA.png' },
    { name: 'Ancy', role: 'Basher', domain: 'Full-stack Web Developer', character: 'Loretta Belmont', img: 'MEMBERS/ANSY.png' },
    { name: 'Samuel Morris', role: 'Basher', domain: 'Web Development & UI/UX Design', character: 'Maxim Kischine', img: 'MEMBERS/SAMUEL MORRIS.png' },
    { name: 'Andrea Betrina', role: 'Basher', domain: 'Web Developer & UI/UX Designer', character: 'Lysandra', img: 'MEMBERS/ANDREA BETRINA.png' },
    { name: 'Sowmiya', role: 'Basher', domain: 'DevOps & Cloud Automation', character: 'Maria Renard', img: 'MEMBERS/SOWMIYA.png' }
];

if (membersGrid) {
    clanMembers.forEach((m, idx) => {
        membersGrid.innerHTML += `
            <div class="member-card tilt-card" onclick="openMember(${idx})">
                <div class="glass-layer-inner"></div>
                <img src="${m.img}" alt="${m.name}">
                <div class="member-details">
                    <h4>${m.name}</h4>
                    <p class="m-role">${m.role}</p>
                    <p class="m-domain">${m.domain}</p>
                </div>
            </div>
        `;
    });
}

// Memories
const clanMemoriesData = [
    { img: "MEMORIES/M1.jpg" },
    { img: "MEMORIES/M2.jpg" },
    { img: "MEMORIES/M3.jpg" },
    { img: "MEMORIES/M4_updated.jpg" },
    { img: "MEMORIES/M5.jpg" },
    { img: "MEMORIES/M6.jpg" },
    { img: "MEMORIES/M7.jpg" },
    { img: "MEMORIES/M8.jpg" },
    { img: "MEMORIES/M9.jpg" },
    { img: "MEMORIES/M10.jpg" },
    { img: "MEMORIES/M11.jpg" },
    { img: "MEMORIES/M12.jpg" },
    { img: "MEMORIES/M13.jpg" },
    { img: "MEMORIES/M14.jpg" },
    { img: "MEMORIES/M15.jpg" },
];

if (memoriesGrid) {
    clanMemoriesData.forEach((mem, index) => {
        memoriesGrid.innerHTML += `
            <div class="memory-card tilt-card" onclick="window.open('${mem.img}', '_blank')">
                <img src="${mem.img}" alt="Memory ${index + 1}">
            </div>
        `;
    });
}

// 5. 3D Tilt Effect (Vanilla VanillaTilt logic)
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease-out';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

const projectDetails = {
    '2D Games': 'I developed two distinct 2D games during this journey: an exhilarating Endless Runner and an immersive Adventure Game. Building these games helped me master core programming logic, physics manipulation, and game design principles.',
    'Bash Selection Website': 'I created a fully functional, dynamic website specifically designed to automate the Game Selection process for our Weekly Bash events. This ensured a smooth, fair, and incredibly fast selection system for the entire clan.',
    'Task Tracker Discord Bot': 'I programmed a custom AI-driven Discord Bot that acts as a comprehensive task tracker. It actively manages clan assignments, tracks user progress, and keeps everyone in our community organized and accountable right inside Discord.',
    'Smart Home IoT': 'An innovative IoT (Internet of Things) project focused on practical smart home automation. I built integrated systems allowing for the remote control, efficiency tracking, and environmental monitoring of household features.',
    'Live Emotion Detection': 'Developed an advanced computer vision model utilizing deep neural networks to perform Live Emotion Detection on human faces. The system analyzes real-time webcam feeds to instantly classify subtle micro-expressions into distinct psychological states.'
};

window.openProject = function (title) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').innerText = title;
    const desc = projectDetails[title] || `Detailed information about ${title}. Developed during the Belmont Clan journey showing incredible skills and dedication.`;
    document.getElementById('modal-desc').innerHTML = `<p>${desc}</p>`;
    modal.classList.remove('hidden');
    playSound(sfxModalOpen);
};

window.openBash = function (index) {
    const bash = weeklyBashes[index];
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').innerText = bash.title;
    document.getElementById('modal-desc').innerHTML = bash.desc;
    modal.classList.remove('hidden');
    playSound(sfxModalOpen);
};

window.openMember = function (idx) {
    const modal = document.getElementById('member-modal');
    const member = clanMembers[idx];
    document.getElementById('member-modal-name').innerText = member.name;
    document.getElementById('member-modal-role').innerText = member.role;
    document.getElementById('member-modal-domain').innerText = member.domain;
    document.getElementById('member-modal-character').innerText = member.character;
    document.getElementById('member-modal-img').src = member.img;
    modal.classList.remove('hidden');
    playSound(sfxModalOpen);
};

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        playSound(sfxCardHover);
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
    }
});

// 7. Background Particles (Native Canvas)
const ctx = particlesCanvas.getContext('2d');
let particlesArray = [];

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.5)' : 'rgba(157, 0, 255, 0.5)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > particlesCanvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > particlesCanvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let num = (particlesCanvas.width * particlesCanvas.height) / 9000;
    for (let i = 0; i < num; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ==============================================
// CYBER RUNNER - MINIGAME ENGINE
// ==============================================
const gameContainer = document.getElementById('game-container');
const gamePlayer = document.getElementById('game-player');
const playerInner = document.getElementById('player-inner'); // Target for rotation only
const gameObstacle = document.getElementById('game-obstacle');
const gameScoreDisplay = document.getElementById('game-score');
const gameHiScoreDisplay = document.getElementById('game-hi-score');
const gameStartPrompt = document.getElementById('game-start-prompt');
const gameGround = document.getElementById('game-ground'); // Target for scrolling

let isGameRunning = false;
let isGameOver = false;
let isJumping = false;
let score = 0;
let hiScore = 0;

let playerBottom = 40;
let velocityY = 0;
const gravity = 1.0;
const jumpStrength = 18;

let obstacleLeft = 1000;
let baseSpeed = 7;
let currentSpeed = baseSpeed;
let gameInterval;
let groundPosition = 0;

function jump() {
    if (!isGameRunning) {
        if (!isGameOver) startGame(); // Initial start
        return;
    }
    if (!isJumping) {
        isJumping = true;
        velocityY = jumpStrength;
        playSound(sfxNavClick);
    }
}

function startGame() {
    isGameRunning = true;
    isGameOver = false;
    score = 0;
    currentSpeed = baseSpeed;
    gameScoreDisplay.innerText = "Score: " + score;
    gameStartPrompt.style.display = 'none';

    // Reset Entity Positions
    playerBottom = 40;
    velocityY = 0;
    isJumping = false;
    gamePlayer.style.bottom = playerBottom + 'px';
    playerInner.style.transform = `rotate(0deg)`;

    obstacleLeft = gameContainer.offsetWidth;
    gameObstacle.style.left = obstacleLeft + 'px';

    playSound(sfxModalOpen); // Start sound

    clearInterval(gameInterval);
    // Lock physics engine exactly to 60 "frames" per second (16.6ms interval)
    // This absolutely guarantees jump height logic is hardware-independent and perfectly consistent crossing 60hz -> 240hz monitors.
    gameInterval = setInterval(gameLoop, 16);
}

function gameOver() {
    isGameRunning = false;
    isGameOver = true;
    clearInterval(gameInterval);
    if (score > hiScore) {
        hiScore = score;
        gameHiScoreDisplay.innerText = "High: " + hiScore;
    }
    gameStartPrompt.innerHTML = "<div style='letter-spacing: 5px; text-shadow: 0 0 20px var(--primary-pink);'>SYSTEM FAILURE</div><div style='font-size: 1rem; color: #fff; margin-top: 10px; font-family: Rajdhani, sans-serif; letter-spacing: 2px;'>[ FINAL THREAT OVERRIDE: " + Math.floor(currentSpeed) + " ]</div><br><button onclick='startGame()' onmouseover=\"this.style.background='var(--primary-cyan)'; this.style.color='#000';\" onmouseout=\"this.style.background='transparent'; this.style.color='#fff';\" style='margin-top: 5px; background: transparent; border: 2px solid var(--primary-cyan); color: #fff; padding: 10px 30px; border-radius: 8px; font-family: Orbitron, sans-serif; font-size: 1.2rem; cursor: pointer; box-shadow: 0 0 15px rgba(0,243,255,0.4); text-shadow: 0 0 10px var(--primary-cyan); transition: all 0.3s ease;'>RESTART SEQUENCE</button>";
    gameStartPrompt.style.display = 'block';
    gameStartPrompt.style.color = 'var(--primary-pink)';
    playSound(sfxPunch); // Crash sound
    setTimeout(() => playSound(sfxGlass), 100);
}

function checkCollision() {
    const pRect = gamePlayer.getBoundingClientRect();
    const oRect = gameObstacle.getBoundingClientRect();

    // Check strict intersection bounding-box overlaps
    if (
        pRect.right - 8 > oRect.left &&
        pRect.left + 5 < oRect.right &&
        pRect.bottom - 5 > oRect.top &&
        pRect.top + 5 < oRect.bottom
    ) {
        return true;
    }
    return false;
}

function gameLoop() {
    if (!isGameRunning) return;

    // --- PHYSICS ENGINE --- //
    if (isJumping) {
        playerBottom += velocityY;
        velocityY -= gravity;

        if (playerBottom <= 40) {
            playerBottom = 40;
            isJumping = false;
            velocityY = 0;
            playerInner.style.transform = `rotate(0deg)`;
        } else {
            // Spin player inner box while jumping so Collision Box remains strictly squared
            playerInner.style.transform = `rotate(${(40 - playerBottom) * 3}deg)`;
        }
        gamePlayer.style.bottom = playerBottom + 'px';
    }

    // --- WORLD ENGINE --- //
    groundPosition -= currentSpeed * 0.8;
    gameGround.style.transform = `translateX(${groundPosition % 40}px)`; // Tiles every 40px

    obstacleLeft -= currentSpeed;
    if (obstacleLeft < -60) {
        obstacleLeft = gameContainer.offsetWidth;
        score += 10;
        gameScoreDisplay.innerText = "Score: " + score;
        currentSpeed += 0.15; // Speed escalation curve

        // Randomize obstacle property for highly dynamic hurdles
        let obHeight = Math.floor(40 + Math.random() * 50);
        gameObstacle.style.height = obHeight + 'px';
        gameObstacle.style.backgroundColor = Math.random() > 0.5 ? 'var(--primary-purple)' : 'var(--primary-cyan)';
        gameObstacle.style.boxShadow = `0 0 25px ${gameObstacle.style.backgroundColor}`;
        gameObstacle.style.width = Math.floor(25 + Math.random() * 15) + 'px';
    }
    gameObstacle.style.left = obstacleLeft + 'px';

    // --- COLLISION LOGIC --- //
    if (checkCollision()) {
        gameOver();
        return;
    }
}

// Controls configuration
gameContainer.addEventListener('click', jump);
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        // Prevent default spacebar window scrolling if hovering on game page
        if (!document.getElementById('game').classList.contains('hidden')) {
            e.preventDefault();
            jump();
        }
    }
});
