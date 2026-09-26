
    /* Complete Student Database */
    const STUDENT_DATABASE = [
      { 
        username: "karan", pass: "karan@123", id: "SS-STU-2026-001", name: "Karan", 
        clan: "Gond Hamlet (Bastar)", npci: "Aadhaar Unlinked", npciCode: "WARN", 
        soundex: "95.4%", digi: "Verified", stage: "Nodal Action Required", stipend: "₹48,000 / Year", 
        certAlias: "Karan Uraon", notice: "प्रिय करण, आपकी ₹48,000 छात्रवृत्ति 15 नवम्बर को जारी होनी है। कृपया 31 अक्टूबर से पहले बैंक जाकर आधार सीडिंग करवा लें।"
      },
      { 
        username: "kishan", pass: "kishan@123", id: "SS-STU-2026-002", name: "Kishan", 
        clan: "Oraon Clan (Ranchi)", npci: "Active Seeded", npciCode: "OK", 
        soundex: "98.2%", digi: "Verified", stage: "Pre-Cleared for PFMS", stipend: "₹48,000 / Year", 
        certAlias: "Kishan Oraon", notice: "प्रिय किशन, आपके सभी दस्तावेज एवं बैंक खाता पूर्ण रूप से सत्यापित हैं।"
      },
      { 
        username: "sanyam", pass: "sanyam@123", id: "SS-STU-2026-003", name: "Sanyam", 
        clan: "Baiga Tribe (Dindori)", npci: "Active Seeded", npciCode: "OK", 
        soundex: "94.8%", digi: "Verified", stage: "Pre-Cleared for PFMS", stipend: "₹48,000 / Year", 
        certAlias: "Sanyam Baiga", notice: "प्रिय संयम, आपका जाति प्रमाण पत्र शत-प्रतिशत सत्यापित हो चुका है।"
      },
      { 
        username: "punyam", pass: "punyam@123", id: "SS-STU-2026-004", name: "Punyam", 
        clan: "Kharia Settlement", npci: "Active Seeded", npciCode: "OK", 
        soundex: "96.4%", digi: "Verified", stage: "Cleared", stipend: "₹48,000 / Year", 
        certAlias: "Puniam Kharia", notice: "प्रिय पुण्यम, आपके रिकॉर्ड स्वतः-सत्यापित हो चुके हैं।"
      },
      { 
        username: "shantanu", pass: "shantanu@123", id: "SS-STU-2026-005", name: "Shantanu", 
        clan: "Birhor Hamlet (Gumla)", npci: "Active Seeded", npciCode: "OK", 
        soundex: "97.1%", digi: "Verified", stage: "Pre-Cleared for PFMS", stipend: "₹48,000 / Year", 
        certAlias: "Shantanu Birhor", notice: "प्रिय शांतनु, आपकी छात्रवृत्ति को अंतिम डिजिटल हस्ताक्षर प्रदान कर दिया गया है।"
      },
      { 
        username: "sanjay", pass: "sanjay@123", id: "SS-STU-2026-006", name: "Sanjay", 
        clan: "Kamarr PVTG (Gariaband)", npci: "Dormancy Warning", npciCode: "DORM", 
        soundex: "91.8%", digi: "Verified", stage: "Testing Bank Link", stipend: "₹48,000 / Year", 
        certAlias: "Sanjay Kamar", notice: "अति आवश्यक: संजय, आपका केनरा बैंक खाता निष्क्रिय है। तत्काल शाखा जाकर वीडियो-केवाईसी पूर्ण करें।"
      }
    ];

    let loggedInStudent = null;

    /* 3D Scene Variables strictly on front face */
    let scene, camera, renderer, diyaParticles, indiaMapGroup;
    let animFrameId = null;
    let isWarpEngaged = false;

    function init3DHero() {
      const container = document.getElementById('three-viewport');
      if (!container || typeof THREE === "undefined") return;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x02140e, 0.08);

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, -0.4, 9.5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      const ambLight = new THREE.AmbientLight(0x064e3b, 1.4);
      scene.add(ambLight);

      const goldLight = new THREE.PointLight(0xf59e0b, 3.5, 25);
      goldLight.position.set(0, 4, 6);
      scene.add(goldLight);

      // Knowledge Sparks
      const pCount = 380;
      const pGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 8 + 2;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.12,
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      diyaParticles = new THREE.Points(pGeo, pMat);
      scene.add(diyaParticles);

      // Extruded 3D India Mesh
      indiaMapGroup = new THREE.Group();
      const shape = new THREE.Shape();
      const pts = [
        [0, 2.8], [0.4, 2.6], [0.8, 2.3], [1.3, 2.0], [1.2, 1.6], [1.7, 1.4], [2.2, 1.5], [2.6, 1.2],
        [2.8, 0.9], [2.3, 0.7], [1.8, 0.6], [1.5, 0.3], [1.4, -0.2], [1.5, -0.6], [1.3, -1.0], [1.0, -1.5],
        [0.8, -2.1], [0.5, -2.6], [0.1, -3.2], [0.0, -3.4], [-0.2, -3.2], [-0.5, -2.7], [-0.7, -2.1],
        [-1.0, -1.6], [-1.3, -1.0], [-1.4, -0.5], [-1.8, -0.1], [-2.1, 0.1], [-2.3, 0.4], [-2.0, 0.8],
        [-1.6, 0.9], [-1.3, 1.3], [-1.0, 1.6], [-0.8, 2.1], [-0.4, 2.6], [0, 2.8]
      ];
      shape.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);

      const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
      const meshGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const meshMat = new THREE.MeshPhysicalMaterial({ color: 0x053322, metalness: 0.8, roughness: 0.35, clearcoat: 0.8 });
      const mesh = new THREE.Mesh(meshGeo, meshMat);
      indiaMapGroup.add(mesh);

      const edgeGeo = new THREE.EdgesGeometry(meshGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6 });
      indiaMapGroup.add(new THREE.LineSegments(edgeGeo, edgeMat));

      indiaMapGroup.rotation.x = 0.42;
      indiaMapGroup.position.set(0, -0.2, 1.2);
      scene.add(indiaMapGroup);

      animate3D();
    }

    function animate3D() {
      animFrameId = requestAnimationFrame(animate3D);

      if (diyaParticles) {
        const arr = diyaParticles.geometry.attributes.position.array;
        for (let i = 1; i < arr.length; i += 3) {
          arr[i] += 0.006;
          if (arr[i] > 6) arr[i] = -5;
        }
        diyaParticles.geometry.attributes.position.needsUpdate = true;
      }

      if (indiaMapGroup && !isWarpEngaged) {
        indiaMapGroup.rotation.y = 0.05 + Math.sin(Date.now() * 0.001) * 0.03;
      }

      if (isWarpEngaged) {
        camera.position.z -= 0.3;
        camera.fov = THREE.MathUtils.lerp(camera.fov, 105, 0.05);
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
    }

    function stop3DAnimation() {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    /* Transition out of 3D Front Face into Clean Internal UI */
    function triggerWormholeWarp() {
      if (isWarpEngaged) return;
      isWarpEngaged = true;

      const flash = document.getElementById('warp-flash');
      flash.classList.add('active');

      setTimeout(() => {
        // Stop 3D WebGL loop and hide front face completely
        stop3DAnimation();
        document.getElementById('portalFrontFace').style.display = 'none';
        document.getElementById('loginPortalStage').classList.remove('hidden');
        flash.classList.remove('active');
        isWarpEngaged = false;
      }, 700);
    }

    function returnTo3DFrontFace() {
      document.getElementById('mainApplication').classList.add('hidden');
      document.getElementById('loginPortalStage').classList.add('hidden');
      const front = document.getElementById('portalFrontFace');
      front.style.display = 'flex';
      camera.position.set(0, -0.4, 9.5);
      camera.fov = 45;
      camera.updateProjectionMatrix();
      animate3D(); // resume 3D rendering only on front face
    }

    /* Role Login & View Toggles */
    function switchLoginRole(role) {
      ['student', 'university', 'admin'].forEach(r => {
        document.getElementById(`roleBtn-${r}`).classList.toggle('active', r === role);
        document.getElementById(`loginForm-${r}`).classList.toggle('active', r === role);
      });
    }

    function executeStudentLogin(e) {
      e.preventDefault();
      const u = document.getElementById("studentUsernameInput").value.trim().toLowerCase();
      const p = document.getElementById("studentPasswordInput").value.trim();
      const err = document.getElementById("studentLoginError");

      const match = STUDENT_DATABASE.find(s => s.username === u && s.pass === p);
      if (match) {
        err.style.display = "none";
        loggedInStudent = match;
        document.getElementById("loginPortalStage").classList.add("hidden");
        document.getElementById("mainApplication").classList.remove("hidden");
        document.getElementById("sessionLabel").innerText = match.name + " (Student)";
        loadStudentPrivateProfile(match);
        switchPortalView('studentPortal');
      } else {
        err.style.display = "block";
      }
    }

    function executeInstitutionalLogin(e, roleType) {
      e.preventDefault();
      document.getElementById("loginPortalStage").classList.add("hidden");
      document.getElementById("mainApplication").classList.remove("hidden");
      document.getElementById("sessionLabel").innerText = roleType === 'university' ? "University Registrar" : "DWO Nodal Officer";
      switchPortalView(roleType === 'university' ? 'universityPortal' : 'adminPortal');
    }

    function bypassToPublicDashboard() {
      document.getElementById("loginPortalStage").classList.add("hidden");
      document.getElementById("mainApplication").classList.remove("hidden");
      document.getElementById("sessionLabel").innerText = "Public Mode";
      switchPortalView('publicView');
    }

    function switchPortalView(viewId) {
      document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

      if (viewId === 'studentPortal') {
        const gate = document.getElementById('studentAuthGate');
        const content = document.getElementById('studentPrivateContent');
        if (!loggedInStudent) {
          gate.style.display = 'block';
          content.style.display = 'none';
        } else {
          gate.style.display = 'none';
          content.style.display = 'block';
        }
      }

      const target = document.getElementById(viewId);
      if (target) target.classList.add("active");

      if (viewId === 'publicView') document.getElementById('navBtn-public').classList.add('active');
      if (viewId === 'studentPortal') document.getElementById('navBtn-student').classList.add('active');
      if (viewId === 'universityPortal') document.getElementById('navBtn-university').classList.add('active');
      if (viewId === 'adminPortal') document.getElementById('navBtn-admin').classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openStudentLoginModal() {
      document.getElementById("loginPortalStage").classList.remove("hidden");
      switchLoginRole('student');
    }

    function logoutStudent() {
      loggedInStudent = null;
      document.getElementById("sessionLabel").innerText = "Public Mode";
      switchPortalView('publicView');
    }

    function loadStudentPrivateProfile(s) {
      document.getElementById('spStudentName').innerText = s.name;
      document.getElementById('spStudentMeta').innerHTML = `Registration: <strong>${s.id}</strong> • ${s.clan} • B.Tech IT`;
      document.getElementById('spStipendAmount').innerText = s.stipend;
      document.getElementById('spSoundexScore').innerHTML = `<i class="fa-solid fa-language text-emerald-600"></i> ${s.soundex} Match`;
      document.getElementById('spNotificationText').innerText = s.notice;

      const alertBox = document.getElementById('spWarningAlertBox');
      const npciEl = document.getElementById('spNpciStatus');
      const npciDesc = document.getElementById('spNpciDesc');

      if (s.npciCode === 'WARN') {
        alertBox.style.display = 'flex';
        npciEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-500"></i> Aadhaar Unlinked`;
        npciDesc.innerText = `Bank record requires Aadhaar Payment Bridge seeding before 31 Oct.`;
      } else if (s.npciCode === 'DORM') {
        alertBox.style.display = 'flex';
        npciEl.innerHTML = `<i class="fa-solid fa-circle-exclamation text-red-500"></i> Dormancy Risk`;
        npciDesc.innerText = `Bank account inactive. Payouts blocked until Video-KYC is complete.`;
      } else {
        alertBox.style.display = 'none';
        npciEl.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600"></i> Active Seeded`;
        npciDesc.innerText = `Seeded with NPCI mapper. Pre-cleared for DBT payment.`;
      }
    }

    function selectMapCluster(key) {
      const data = {
        bastar: { title: "Bastar Tribal Zone (Chhattisgarh)", badge: "Bastar PVTG Cluster", desc: "Covers Eklavya Model Residential Schools in Southern Bastar.", s: 482, c: 18, r: "2 Warnings" },
        ranchi: { title: "Ranchi Higher Education Cluster (Jharkhand)", badge: "Ranchi Hub", desc: "Integrated with Bhashini dialect transliteration for Santhali & Oraon.", s: 624, c: 26, r: "0 Critical" },
        dindori: { title: "Dindori Baiga Belt (Madhya Pradesh)", badge: "Dindori Ashram Unit", desc: "Specialized PVTG education tracking cell for Baiga scholars.", s: 310, c: 12, r: "1 Pending" },
        sundargarh: { title: "Sundargarh Kharia District (Odisha)", badge: "Sundargarh Mining Belt", desc: "Focuses on technical degrees with DigiLocker auto-retrieval.", s: 395, c: 15, r: "0 Critical" },
        gumla: { title: "Gumla Birhor Agency (Jharkhand)", badge: "Gumla Forest Division", desc: "Dedicated monitoring terminal providing proactive 30-day early warnings.", s: 198, c: 8, r: "0 Critical" },
        gariaband: { title: "Gariaband Kamar Corridor (Chhattisgarh)", badge: "Gariaband PVTG Hub", desc: "Offline edge-mesh PWA enabled for remote hostels.", s: 230, c: 9, r: "1 Dormancy Alert" },
        delhi: { title: "Central Apex Command (New Delhi)", badge: "MoTA National Core", desc: "Apex oversight desk monitoring national PFMS payment rails.", s: "14,850 Total", c: 142, r: "99.2% Cleared" }
      }[key];

      if (!data) return;
      document.getElementById("mapClusterBadge").innerText = data.badge;
      document.getElementById("mapClusterTitle").innerText = data.title;
      document.getElementById("mapClusterDesc").innerText = data.desc;
      document.getElementById("mapClusterStudents").innerText = data.s;
      document.getElementById("mapClusterColleges").innerText = data.c;
      document.getElementById("mapClusterRisk").innerText = data.r;
    }

    function renderUniversityMasterTable() {
      const b = document.getElementById('univTableBody');
      if (!b) return;
      b.innerHTML = '';
      STUDENT_DATABASE.forEach(s => {
        const tr = document.createElement('tr');
        const badge = s.npciCode === 'OK' ? 'badge-success' : (s.npciCode === 'WARN' ? 'badge-warning' : 'badge-danger');
        tr.innerHTML = `
          <td><code>${s.id}</code></td>
          <td><strong>${s.name}</strong></td>
          <td>${s.clan}</td>
          <td><span class="badge badge-success">${s.digi}</span></td>
          <td><span class="badge ${badge}">${s.npci}</span></td>
          <td><strong style="color:#059669;">${s.soundex}</strong></td>
          <td><span class="badge badge-success">${s.stage}</span></td>
        `;
        b.appendChild(tr);
      });
    }

    function filterUniversityTable() {
      const q = document.getElementById('univSearchInput').value.toLowerCase();
      document.querySelectorAll('#univTableBody tr').forEach(r => {
        r.style.display = r.innerText.toLowerCase().includes(q) ? '' : 'none';
      });
    }

    /* 4-Tier Pipeline Stepper */
    let pStep = 1;
    function stepPipelineAnimation() {
      pStep = pStep >= 4 ? 1 : pStep + 1;
      const coords = [{ cx: 140 }, { cx: 400 }, { cx: 660 }, { cx: 920 }];
      document.getElementById("signalPacket").setAttribute("cx", coords[pStep - 1].cx);
      for (let i = 1; i <= 4; i++) {
        document.getElementById(`node${i}`).classList.toggle("active", i <= pStep);
      }
    }

    let pStream = null;
    function autoPlayPipeline() {
      if (pStream) { clearInterval(pStream); pStream = null; return; }
      pStream = setInterval(stepPipelineAnimation, 1200);
    }

    /* Chatbot Interactions */
    function toggleChatDrawer() {
      document.getElementById("chatDrawer").classList.toggle("hidden");
    }

    function submitUserMessage() {
      const inp = document.getElementById("userInputField");
      const txt = inp.value.trim();
      if (!txt) return;

      const body = document.getElementById("chatBody");
      body.innerHTML += `<div class="msg-bubble user-msg">${txt}</div>`;
      inp.value = '';

      setTimeout(() => {
        let reply = "Your query has been recorded by Pragati Setu.";
        const low = txt.toLowerCase();
        if (low.includes("karan")) reply = "Karan from Bastar has a 30-day early warning: Bank account unlinked with NPCI.";
        else if (low.includes("kishan")) reply = "Kishan from Ranchi is 100% pre-cleared for PFMS stipend dispatch.";
        else if (low.includes("founders")) reply = "Pragati Setu was built by Risabh Nainwal, Trilok Pratap Singh, Sahjul Arora, Khushi Joshi, Abhey Kumar, and Aditya.";
        body.innerHTML += `<div class="msg-bubble bot-msg">${reply}</div>`;
        body.scrollTop = body.scrollHeight;
      }, 400);
    }

    function playVoiceNotification() {
      if (loggedInStudent && 'speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(loggedInStudent.notice);
        u.lang = 'hi-IN';
        window.speechSynthesis.speak(u);
      }
    }

    /* App Boot */
    window.addEventListener('DOMContentLoaded', () => {
      init3DHero();
      renderUniversityMasterTable();
    });
  