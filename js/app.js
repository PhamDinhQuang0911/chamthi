/**
 * ỨNG DỤNG QUẢN LÝ VÀ CHẤM THI TRẮC NGHIỆM TRỰC TUYẾN - QMATH OMR 2025
 * Phiên bản v3.0 - Chuẩn hóa 100% theo mã nguồn App QM2025 APK (com.chamthi.chamtn2025cs)
 * Bản quyền: QMATH (chamthi.qmath.io.vn)
 */

// BẢNG DANH MỤC ĐẦY ĐỦ 12 MẪU PHIẾU THI TỪ APP GỐC QM
const SHEET_TYPES = {
  "A4_TN2025_BGD_1239": {
    name: "A4 - Chuẩn Bộ GD&ĐT 2025 (1239)",
    desc: "12 câu TN (3.0đ) + 4 câu Đúng/Sai (4.0đ) + 6 câu Trả lời ngắn (3.0đ)",
    file: "a4_tn2025_bgd_1239.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TN2025_QM_1239": {
    name: "A4 - Chuẩn QMATH 2025 (1239)",
    desc: "12 câu TN + 4 câu Đ/S + 6 câu TLN (Bản vẽ chuẩn nét cao của QMATH)",
    file: "a4_tn2025_qm_1239.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TN2025_TNMK_1239": {
    name: "A4 - Chuẩn TNMaker 2025 (1239)",
    desc: "12 câu TN + 4 câu Đ/S + 6 câu TLN (Tương thích phiếu TNMaker 2025)",
    file: "a4_tn2025_tnmk_1239.jpg",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TN2025_AZOTA": {
    name: "A4 - Chuẩn Azota 2025",
    desc: "Phiếu trả lời trắc nghiệm chuẩn Azota năm học 2025",
    file: "a4_tn2025_azota.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TNTL_2025_AZOTA": {
    name: "A4 - Azota Tự Luận & Trắc Nghiệm 2025",
    desc: "Kết hợp phần trắc nghiệm OMR và phần tự luận học sinh viết tay",
    file: "a4_tntl_2025_azota.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A5_TN2025_AZOTA": {
    name: "A5 - Chuẩn Azota Khổ Nhỏ",
    desc: "Khổ giấy A5 (1/2 trang A4) nhỏ gọn, tiết kiệm chi phí in ấn",
    file: "a5_tn2025_azota.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TN2025_BGD": {
    name: "A4 - Bộ GD&ĐT (40 câu trắc nghiệm)",
    desc: "40 câu trắc nghiệm 4 lựa chọn A, B, C, D (0.25đ/câu = 10.0đ)",
    file: "a4_tn2025_bgd.png",
    made_digits: 3, has_sbd: true,
    p1_num: 40, p2_num: 0, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.0
  },
  "A4_TN2025_QM": {
    name: "A4 - QMATH (40 câu trắc nghiệm)",
    desc: "40 câu trắc nghiệm 4 lựa chọn bản chuẩn hóa QMATH",
    file: "a4_tn2025_qm.png",
    made_digits: 3, has_sbd: true,
    p1_num: 40, p2_num: 0, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.0
  },
  "A4_TN2025_TNMK": {
    name: "A4 - TNMaker (40 câu trắc nghiệm)",
    desc: "40 câu trắc nghiệm 4 lựa chọn chuẩn TNMaker",
    file: "a4_tn2025_tnmk.png",
    made_digits: 3, has_sbd: true,
    p1_num: 40, p2_num: 0, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.0
  },
  "A4_UNT_2025": {
    name: "A4 - Phiếu Ôn Tập & Kiểm Tra (UNT 2025 - Có SBD)",
    desc: "Dành cho kiểm tra định kỳ 15 phút, 1 tiết trên lớp (Hỗ trợ 3 hoặc 4 số mã đề)",
    file: "a4_unt_2025.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_UNT_NOSBD_2025": {
    name: "A4 - Phiếu Ôn Tập Nhanh (Không quét SBD)",
    desc: "Chỉ ghi tên học sinh, không cần tô 6 số báo danh",
    file: "a4_unt_nosbd_2025.png",
    made_digits: 3, has_sbd: false,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "UNT_2025_NGANG": {
    name: "A4 - Phiếu Ôn Tập Khổ Ngang (Mã đề 3/4 số)",
    desc: "Khổ ngang thuận tiện cho bài thi kết hợp tự luận",
    file: "unt_2025_ngang.png",
    made_digits: 4, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  }
};

window.SHEET_TYPES = SHEET_TYPES;

// ================= THEME MANAGEMENT (SÁNG / TỐI) =================
window.initTheme = function() {
  try {
    const saved = localStorage.getItem("chamthi_theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefersDark);
    window.setTheme(isDark ? "dark" : "light");
  } catch (e) {}
};

window.toggleTheme = function() {
  const isCurrentlyDark = document.documentElement.classList.contains("dark");
  window.setTheme(isCurrentlyDark ? "light" : "dark");
};

window.setTheme = function(theme) {
  const icon = document.getElementById("themeToggleIcon");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    localStorage.setItem("chamthi_theme", "dark");
    if (icon) icon.innerText = "☀️";
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    localStorage.setItem("chamthi_theme", "light");
    if (icon) icon.innerText = "🌙";
  }
};

const STORAGE_KEY = "QMATH_OMR_DATA_V5";

const defaultSettings = {
  scanSpeed: "normal",          // "fast" (0.3s), "normal" (0.6s), "accurate" (1.0s)
  sensitivity: "normal",        // "high", "normal", "strict"
  soundEnabled: true,
  vibrationEnabled: true,
  viewScoreImmediately: true,
  showAnchors: true,
  warnNoKey: true,
  warnDoubleOrBlank: true,
  warnDuplicateSbd: true,
  scoreRounding: "0.01"
};

const defaultState = {
  currentTab: "hub",
  currentClassId: "cls_12a1",
  currentExamId: "exam_101",
  activeMade: "101",
  resultsViewMode: "table",
  settings: { ...defaultSettings },
  classes: [
    {
      id: "cls_12a1",
      name: "Lớp 12A1 (Toán THPT)",
      students: [
        { sbd: "123456", name: "Nguyễn Văn An" },
        { sbd: "000101", name: "Trần Thị Bình" },
        { sbd: "000102", name: "Lê Hoàng Long" },
        { sbd: "000103", name: "Phạm Minh Thư" },
        { sbd: "000104", name: "Đỗ Quốc Cường" }
      ]
    }
  ],
  exams: [
    {
      id: "exam_101",
      classId: "cls_12a1",
      name: "Khảo sát Chất lượng Toán 12 - Chuẩn BGD 2025",
      sheet_type: "A4_TN2025_BGD_1239",
      date: new Date().toISOString().split("T")[0],
      config: {
        made_digits: 3,
        has_sbd: true,
        p1_num: 12,
        p2_num: 4,
        p3_num: 6,
        p1_score: 0.25,
        p2_score_1: 0.1,
        p2_score_2: 0.25,
        p2_score_3: 0.5,
        p2_score_4: 1.0,
        p3_score: 0.5
      },
      answerKeys: {
        "101": {
          part1: ["A", "B", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D"],
          part2: {
            "1": ["Đ", "S", "Đ", "S"],
            "2": ["Đ", "Đ", "S", "S"],
            "3": ["S", "Đ", "Đ", "S"],
            "4": ["Đ", "S", "S", "Đ"]
          },
          part3: ["1.5", "-2", "0.75", "10", "-3.5", "4"]
        },
        "102": {
          part1: ["B", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D", "A"],
          part2: {
            "1": ["S", "Đ", "S", "Đ"],
            "2": ["S", "S", "Đ", "Đ"],
            "3": ["Đ", "S", "S", "Đ"],
            "4": ["S", "Đ", "Đ", "S"]
          },
          part3: ["2.5", "-1", "1.25", "15", "-4.5", "6"]
        }
      }
    }
  ],
  results: []
};

class AppState {
  constructor() {
    this.data = this.load();
    if (!this.data.activeMade) this.data.activeMade = "101";
    if (!this.data.settings) this.data.settings = { ...defaultSettings };
    if (!this.data.resultsViewMode) this.data.resultsViewMode = "table";
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("QMATH_OMR_DATA_V4");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.exams) && parsed.exams.length > 0) {
          // Bổ sung các trường cấu hình mới cho các bài thi cũ
          parsed.exams.forEach(ex => {
            if (!ex.config) ex.config = {};
            if (ex.config.made_digits === undefined) ex.config.made_digits = 3;
            if (ex.config.has_sbd === undefined) ex.config.has_sbd = true;
            if (ex.config.p2_score_1 === undefined) ex.config.p2_score_1 = 0.1;
            if (ex.config.p2_score_2 === undefined) ex.config.p2_score_2 = 0.25;
            if (ex.config.p2_score_3 === undefined) ex.config.p2_score_3 = 0.5;
            if (ex.config.p2_score_4 === undefined) ex.config.p2_score_4 = 1.0;
          });
          parsed.settings = { ...defaultSettings, ...(parsed.settings || {}) };
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Storage load error:", e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Storage save error:", e);
    }
  }

  getCurrentExam() {
    if (!this.data.exams || this.data.exams.length === 0) {
      this.data.exams = JSON.parse(JSON.stringify(defaultState.exams));
    }
    return this.data.exams.find(e => e.id === this.data.currentExamId) || this.data.exams[0];
  }

  getCurrentClass() {
    if (!this.data.classes || this.data.classes.length === 0) {
      this.data.classes = JSON.parse(JSON.stringify(defaultState.classes));
    }
    const exam = this.getCurrentExam();
    const targetClsId = (exam && exam.classId) || this.data.currentClassId;
    return this.data.classes.find(c => c.id === targetClsId) || this.data.classes[0];
  }

  findStudentName(sbd) {
    if (!sbd || sbd === "------") return "Không quét SBD";
    const cls = this.getCurrentClass();
    if (!cls || !cls.students) return "Thí sinh tự do";
    const std = cls.students.find(s => s.sbd === sbd || parseInt(s.sbd, 10) === parseInt(sbd, 10));
    return std ? std.name : "Thí sinh tự do";
  }

  addResult(resultItem) {
    if (resultItem.sbd && resultItem.sbd !== "------" && resultItem.sbd !== "000000") {
      const idx = this.data.results.findIndex(r => r.examId === resultItem.examId && r.sbd === resultItem.sbd);
      if (idx >= 0) {
        this.data.results[idx] = resultItem;
        this.save();
        return;
      }
    }
    this.data.results.unshift(resultItem);
    this.save();
  }

  deleteResult(id) {
    this.data.results = this.data.results.filter(r => r.id !== id);
    this.save();
  }

  clearResults() {
    const curExamId = this.data.currentExamId;
    this.data.results = this.data.results.filter(r => r.examId !== curExamId);
    this.save();
  }
}

const appState = new AppState();
window.appState = appState;

// --- ÂM THANH BEEP & RUNG PHẢN HỒI ---
function playBeep(isSuccess = true) {
  const settings = (window.appState && window.appState.data.settings) || defaultSettings;
  if (settings.vibrationEnabled && navigator.vibrate) {
    try {
      navigator.vibrate(isSuccess ? 60 : [80, 50, 80]);
    } catch (e) {}
  }
  if (!settings.soundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    if (isSuccess) {
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.12);
    } else {
      osc.frequency.setValueAtTime(330, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.2);
    }

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.18);
  } catch (e) {}
}
window.playBeep = playBeep;

// =========================================================================
// === REQUIREMENT 1: CẤU HÌNH BÀI CHẤM MỚI / SỬA CẤU HÌNH (CHUẨN HÌNH 1) ===
// =========================================================================

let editingExamId = null;

function populateExamModalSheetDropdown(madeDigits = 3, selectedKey = null) {
  const select = document.getElementById("examSheetTypeSelect");
  if (!select || !window.SHEET_TYPES) return;

  const entries = Object.entries(window.SHEET_TYPES);
  select.innerHTML = entries.map(([k, v]) => {
    const badge = `${madeDigits} số`;
    return `<option value="${k}" ${k === selectedKey ? "selected" : ""}>${v.name} (Mã đề ${badge})</option>`;
  }).join("");
}

window.onExamMadeDigitsChange = function onExamMadeDigitsChange() {
  const checkedRadio = document.querySelector('input[name="examMadeDigits"]:checked');
  const digits = checkedRadio ? parseInt(checkedRadio.value, 10) : 3;
  const select = document.getElementById("examSheetTypeSelect");
  const curVal = select ? select.value : "A4_TN2025_BGD_1239";
  populateExamModalSheetDropdown(digits, curVal);
};

window.onExamSheetTypeChange = function onExamSheetTypeChange() {
  const select = document.getElementById("examSheetTypeSelect");
  if (!select) return;
  const key = select.value;
  const def = window.SHEET_TYPES[key];
  if (!def) return;

  // Nếu đang tạo bài mới (không phải sửa bài cũ), tự động điền số câu gợi ý của loại phiếu đó
  if (!editingExamId) {
    const sbdToggle = document.getElementById("examHasSbdToggle");
    if (sbdToggle) sbdToggle.checked = def.has_sbd !== false;

    const p1NumEl = document.getElementById("examP1Num");
    const p1ScoreEl = document.getElementById("examP1Score");
    const p2NumEl = document.getElementById("examP2Num");
    const p3NumEl = document.getElementById("examP3Num");
    const p3ScoreEl = document.getElementById("examP3Score");

    if (p1NumEl) p1NumEl.value = def.p1_num;
    if (p1ScoreEl) p1ScoreEl.value = def.p1_score;
    if (p2NumEl) p2NumEl.value = def.p2_num;
    if (p3NumEl) p3NumEl.value = def.p3_num;
    if (p3ScoreEl) p3ScoreEl.value = def.p3_score;
    window.updateExamModalTotalScore();
  }
};

window.updateExamModalTotalScore = function updateExamModalTotalScore() {
  const p1Num = Math.max(0, parseInt(document.getElementById("examP1Num")?.value, 10) || 0);
  const p1Score = window.omrEngine.parseScoreValue(document.getElementById("examP1Score")?.value, 0);
  const p2Num = Math.max(0, parseInt(document.getElementById("examP2Num")?.value, 10) || 0);
  const p2Score4 = window.omrEngine.parseScoreValue(document.getElementById("examP2Score4")?.value, 0);
  const p3Num = Math.max(0, parseInt(document.getElementById("examP3Num")?.value, 10) || 0);
  const p3Score = window.omrEngine.parseScoreValue(document.getElementById("examP3Score")?.value, 0);

  const total = p1Num * p1Score + p2Num * p2Score4 + p3Num * p3Score;
  const totalFormatted = Number.isInteger(parseFloat(total.toFixed(2)))
    ? String(Math.round(total))
    : total.toFixed(2);

  const el = document.getElementById("examModalTotalScore");
  if (el) el.innerText = totalFormatted;
};

window.previewSelectedSheetTemplate = function previewSelectedSheetTemplate(sheetKeyOverride = null) {
  const select = document.getElementById("examSheetTypeSelect");
  const key = sheetKeyOverride || (select ? select.value : "A4_TN2025_BGD_1239");
  const def = window.SHEET_TYPES[key] || window.SHEET_TYPES["A4_TN2025_BGD_1239"];

  const modal = document.getElementById("sheetPreviewModal");
  const titleEl = document.getElementById("sheetPreviewTitle");
  const descEl = document.getElementById("sheetPreviewDesc");
  const imgEl = document.getElementById("sheetPreviewImg");
  const dlEl = document.getElementById("sheetPreviewDownloadLink");

  if (!modal) return;
  if (titleEl) titleEl.innerText = def.name;
  if (descEl) descEl.innerText = def.desc;
  if (imgEl) imgEl.src = `samples/${def.file}`;
  if (dlEl) {
    dlEl.href = `samples/${def.file}`;
    dlEl.download = def.file;
  }
  modal.classList.remove("hidden");
};

window.closeSheetPreviewModal = function closeSheetPreviewModal() {
  const modal = document.getElementById("sheetPreviewModal");
  if (modal) modal.classList.add("hidden");
};

window.showCreateExamModal = function showCreateExamModal() {
  editingExamId = null;
  const modal = document.getElementById("createExamModal");
  if (!modal) return;

  const titleEl = document.getElementById("createExamModalTitle");
  if (titleEl) titleEl.innerText = "Bài kiểm tra mới";

  const nameInput = document.getElementById("newExamNameInput");
  if (nameInput) nameInput.value = "";

  const radios = document.querySelectorAll('input[name="examMadeDigits"]');
  radios.forEach(r => { r.checked = r.value === "3"; });

  populateExamModalSheetDropdown(3, "A4_TN2025_BGD_1239");

  const sbdToggle = document.getElementById("examHasSbdToggle");
  if (sbdToggle) sbdToggle.checked = true;

  document.getElementById("examP1Num").value = 12;
  document.getElementById("examP1Score").value = "0.25";
  document.getElementById("examP2Num").value = 4;
  document.getElementById("examP2Score1").value = "0.1";
  document.getElementById("examP2Score2").value = "0.25";
  document.getElementById("examP2Score3").value = "0.5";
  document.getElementById("examP2Score4").value = "1.0";
  document.getElementById("examP3Num").value = 6;
  document.getElementById("examP3Score").value = "0.5";

  const classSelect = document.getElementById("examClassSelect");
  if (classSelect && window.appState) {
    classSelect.innerHTML = window.appState.data.classes.map(c => `
      <option value="${c.id}" ${c.id === window.appState.data.currentClassId ? "selected" : ""}>${c.name}</option>
    `).join("");
  }

  window.updateExamModalTotalScore();
  modal.classList.remove("hidden");
};

window.showEditCurrentExamModal = function showEditCurrentExamModal() {
  const exam = window.appState.getCurrentExam();
  if (!exam) return;

  editingExamId = exam.id;
  const modal = document.getElementById("createExamModal");
  if (!modal) return;

  const titleEl = document.getElementById("createExamModalTitle");
  if (titleEl) titleEl.innerText = "Chỉnh sửa cấu hình bài kiểm tra";

  const nameInput = document.getElementById("newExamNameInput");
  if (nameInput) nameInput.value = exam.name || "";

  const cfg = exam.config || {};
  const digits = cfg.made_digits === 4 ? 4 : 3;
  const radios = document.querySelectorAll('input[name="examMadeDigits"]');
  radios.forEach(r => { r.checked = parseInt(r.value, 10) === digits; });

  populateExamModalSheetDropdown(digits, exam.sheet_type || "A4_TN2025_BGD_1239");

  const sbdToggle = document.getElementById("examHasSbdToggle");
  if (sbdToggle) sbdToggle.checked = cfg.has_sbd !== false;

  document.getElementById("examP1Num").value = cfg.p1_num !== undefined ? cfg.p1_num : 12;
  document.getElementById("examP1Score").value = cfg.p1_score !== undefined ? cfg.p1_score : 0.25;
  document.getElementById("examP2Num").value = cfg.p2_num !== undefined ? cfg.p2_num : 4;
  document.getElementById("examP2Score1").value = cfg.p2_score_1 !== undefined ? cfg.p2_score_1 : 0.1;
  document.getElementById("examP2Score2").value = cfg.p2_score_2 !== undefined ? cfg.p2_score_2 : 0.25;
  document.getElementById("examP2Score3").value = cfg.p2_score_3 !== undefined ? cfg.p2_score_3 : 0.5;
  document.getElementById("examP2Score4").value = cfg.p2_score_4 !== undefined ? cfg.p2_score_4 : 1.0;
  document.getElementById("examP3Num").value = cfg.p3_num !== undefined ? cfg.p3_num : 6;
  document.getElementById("examP3Score").value = cfg.p3_score !== undefined ? cfg.p3_score : 0.5;

  const classSelect = document.getElementById("examClassSelect");
  if (classSelect && window.appState) {
    classSelect.innerHTML = window.appState.data.classes.map(c => `
      <option value="${c.id}" ${c.id === exam.classId ? "selected" : ""}>${c.name}</option>
    `).join("");
  }

  window.updateExamModalTotalScore();
  modal.classList.remove("hidden");
};

window.closeCreateExamModal = function closeCreateExamModal() {
  const modal = document.getElementById("createExamModal");
  if (modal) modal.classList.add("hidden");
  editingExamId = null;
};

function resizeAnswerKeyToConfig(keyObj, config) {
  const p1Num = Math.max(0, parseInt(config.p1_num, 10) || 0);
  const p2Num = Math.max(0, parseInt(config.p2_num, 10) || 0);
  const p3Num = Math.max(0, parseInt(config.p3_num, 10) || 0);

  const newP1 = Array(p1Num).fill("A");
  for (let i = 0; i < p1Num && i < (keyObj.part1 || []).length; i++) {
    newP1[i] = keyObj.part1[i];
  }

  const newP2 = {};
  for (let i = 1; i <= p2Num; i++) {
    const k = String(i);
    newP2[k] = (keyObj.part2 && keyObj.part2[k]) ? [...keyObj.part2[k]] : ["Đ", "S", "Đ", "S"];
  }

  const newP3 = Array(p3Num).fill("0");
  for (let i = 0; i < p3Num && i < (keyObj.part3 || []).length; i++) {
    newP3[i] = keyObj.part3[i];
  }

  return { part1: newP1, part2: newP2, part3: newP3 };
}

window.saveNewExam = function saveNewExam() {
  const nameInput = document.getElementById("newExamNameInput");
  const sheetTypeSelect = document.getElementById("examSheetTypeSelect");
  const classSelect = document.getElementById("examClassSelect");
  const checkedRadio = document.querySelector('input[name="examMadeDigits"]:checked');
  const sbdToggle = document.getElementById("examHasSbdToggle");

  const name = (nameInput && nameInput.value.trim()) || "Bài kiểm tra mới";
  const sheetTypeKey = (sheetTypeSelect && sheetTypeSelect.value) || "A4_TN2025_BGD_1239";
  const classId = (classSelect && classSelect.value) || window.appState.data.currentClassId;
  const madeDigits = checkedRadio ? parseInt(checkedRadio.value, 10) : 3;
  const hasSbd = sbdToggle ? sbdToggle.checked : true;

  const p1Num = Math.max(0, parseInt(document.getElementById("examP1Num")?.value, 10) || 0);
  const p1Score = window.omrEngine.parseScoreValue(document.getElementById("examP1Score")?.value, 0.25);
  const p2Num = Math.max(0, parseInt(document.getElementById("examP2Num")?.value, 10) || 0);
  const p2Score1 = window.omrEngine.parseScoreValue(document.getElementById("examP2Score1")?.value, 0.1);
  const p2Score2 = window.omrEngine.parseScoreValue(document.getElementById("examP2Score2")?.value, 0.25);
  const p2Score3 = window.omrEngine.parseScoreValue(document.getElementById("examP2Score3")?.value, 0.5);
  const p2Score4 = window.omrEngine.parseScoreValue(document.getElementById("examP2Score4")?.value, 1.0);
  const p3Num = Math.max(0, parseInt(document.getElementById("examP3Num")?.value, 10) || 0);
  const p3Score = window.omrEngine.parseScoreValue(document.getElementById("examP3Score")?.value, 0.5);

  const newConfig = {
    made_digits: madeDigits,
    has_sbd: hasSbd,
    p1_num: p1Num,
    p1_score: p1Score,
    p2_num: p2Num,
    p2_score_1: p2Score1,
    p2_score_2: p2Score2,
    p2_score_3: p2Score3,
    p2_score_4: p2Score4,
    p3_num: p3Num,
    p3_score: p3Score
  };

  if (editingExamId) {
    // Cập nhật bài kiểm tra hiện tại
    const exam = window.appState.data.exams.find(e => e.id === editingExamId);
    if (exam) {
      exam.name = name;
      exam.classId = classId;
      exam.sheet_type = sheetTypeKey;
      exam.config = newConfig;

      // Đồng bộ kích thước mảng đáp án của các mã đề hiện có
      Object.keys(exam.answerKeys || {}).forEach(code => {
        exam.answerKeys[code] = resizeAnswerKeyToConfig(exam.answerKeys[code], newConfig);
      });

      // Chấm lại điểm các bài đã chấm trong bài thi này theo thang điểm mới
      const examResults = window.appState.data.results.filter(r => r.examId === exam.id);
      examResults.forEach(r => {
        window.omrEngine.regradeRecordWithEdits(r, exam, r.manualOverrides || null);
      });
    }
  } else {
    // Tạo bài kiểm tra mới
    const defaultCode = madeDigits === 4 ? "0101" : "101";
    const newExam = {
      id: "exam_" + Date.now(),
      classId: classId,
      name: name,
      sheet_type: sheetTypeKey,
      date: new Date().toISOString().split("T")[0],
      config: newConfig,
      answerKeys: {
        [defaultCode]: createDefaultKey(newConfig)
      }
    };
    window.appState.data.exams.push(newExam);
    window.appState.data.currentExamId = newExam.id;
    window.appState.data.activeMade = defaultCode;
  }

  window.appState.data.currentClassId = classId;
  window.appState.save();

  window.updateExamSelect && window.updateExamSelect();
  window.renderExamHub && window.renderExamHub();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
  window.renderResultsTable && window.renderResultsTable();
  window.closeCreateExamModal();
  playBeep(true);
};

window.deleteCurrentExam = function deleteCurrentExam() {
  if (window.appState.data.exams.length <= 1) {
    alert("Hệ thống cần giữ lại ít nhất 1 bài kiểm tra!");
    return;
  }
  const exam = window.appState.getCurrentExam();
  if (confirm(`Bạn có chắc chắn muốn xóa bài kiểm tra "${exam.name}" và toàn bộ bài đã chấm của nó?`)) {
    window.appState.data.results = window.appState.data.results.filter(r => r.examId !== exam.id);
    window.appState.data.exams = window.appState.data.exams.filter(e => e.id !== exam.id);
    window.appState.data.currentExamId = window.appState.data.exams[0].id;
    window.appState.save();
    window.updateExamSelect();
    window.renderExamHub();
    window.renderVisualAnswerSheet();
    window.renderResultsTable();
  }
};

// =========================================================================
// === REQUIREMENT 2: TỔNG QUAN BÀI THI (EXAM HUB - CHUẨN HÌNH 2) ===
// =========================================================================

window.renderExamHub = function renderExamHub() {
  const exam = window.appState.getCurrentExam();
  if (!exam) return;

  const cfg = exam.config || {};
  const cls = window.appState.getCurrentClass();
  const results = window.appState.data.results.filter(r => r.examId === exam.id);
  const keyCount = Object.keys(exam.answerKeys || {}).length;

  const titleEl = document.getElementById("hubExamTitle");
  const dateEl = document.getElementById("hubExamDate");
  const keyBadge = document.getElementById("hubKeyCountBadge");
  const gradedBadge = document.getElementById("hubGradedCountBadge");
  const classBadge = document.getElementById("hubClassNameBadge");

  if (titleEl) titleEl.innerText = exam.name;
  if (dateEl) dateEl.innerText = exam.date || "";
  if (keyBadge) keyBadge.innerText = `${keyCount} mã đề`;
  if (gradedBadge) gradedBadge.innerText = `${results.length} bài`;
  if (classBadge && cls) classBadge.innerText = cls.name;

  // Cập nhật thẻ tóm tắt cấu hình bên dưới (Chuẩn Hình 2)
  const qEl = document.getElementById("hubSummaryQuestions");
  const sheetEl = document.getElementById("hubSummarySheet");
  const sbdIconEl = document.getElementById("hubSummarySbdIcon");
  const sbdTextEl = document.getElementById("hubSummarySbdText");
  const totalEl = document.getElementById("hubSummaryTotalScore");

  const p1Num = cfg.p1_num !== undefined ? cfg.p1_num : 12;
  const p2Num = cfg.p2_num !== undefined ? cfg.p2_num : 4;
  const p3Num = cfg.p3_num !== undefined ? cfg.p3_num : 6;
  const madeDigits = cfg.made_digits === 4 ? 4 : 3;
  const maxScore = window.omrEngine.calcMaxTotalScore(cfg);

  if (qEl) qEl.innerText = `${p1Num}; ${p2Num}; ${p3Num} câu`;
  if (sheetEl) sheetEl.innerText = `Phiếu: ${exam.sheet_type} - ${madeDigits} số`;
  if (cfg.has_sbd !== false) {
    if (sbdIconEl) sbdIconEl.innerText = "✅";
    if (sbdTextEl) sbdTextEl.innerText = "Quét số báo danh";
  } else {
    if (sbdIconEl) sbdIconEl.innerText = "⚪";
    if (sbdTextEl) sbdTextEl.innerText = "Không quét số báo danh";
  }
  if (totalEl) totalEl.innerText = `Tổng điểm: ${maxScore}`;

  // Đồng bộ tên bài thi trên màn hình Camera
  const scanTitle = document.getElementById("scanHeaderExamName");
  const scanCount = document.getElementById("scanHeaderCount");
  if (scanTitle) scanTitle.innerText = exam.name;
  if (scanCount) scanCount.innerText = String(results.length);
};

// =========================================================================
// === NẠP ĐÁP ÁN BẰNG EXCEL (.XLSX) & QUÉT MÃ QR ===
// =========================================================================

window.triggerExcelKeyUpload = function triggerExcelKeyUpload() {
  const fileInput = document.getElementById("excelKeyFileInput");
  if (fileInput) fileInput.click();
};

window.handleExcelKeyUpload = function handleExcelKeyUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (typeof XLSX === "undefined") {
    alert("Thư viện SheetJS chưa sẵn sàng! Vui lòng kiểm tra kết nối mạng.");
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (rows.length < 2) {
        alert("File Excel không có dữ liệu!");
        return;
      }

      const exam = window.appState.getCurrentExam();
      let importedCount = 0;

      const headerRow = rows[0].map(h => String(h || "").trim().toLowerCase());
      let madeColIdx = headerRow.findIndex(h => h.includes("mã") || h.includes("made") || h.includes("code") || h.includes("đề"));
      if (madeColIdx === -1) madeColIdx = 0;

      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0) continue;

        const codeVal = String(row[madeColIdx] || "").trim();
        if (!codeVal) continue;

        const newKey = createDefaultKey(exam.config);
        let cIdx = 1;

        for (let i = 0; i < exam.config.p1_num; i++) {
          if (cIdx < row.length && row[cIdx] !== undefined) {
            const v = String(row[cIdx]).trim().toUpperCase();
            if (["A", "B", "C", "D"].includes(v)) newKey.part1[i] = v;
          }
          cIdx++;
        }

        for (let q = 1; q <= exam.config.p2_num; q++) {
          const qKey = String(q);
          const subs = [];
          for (let s = 0; s < 4; s++) {
            if (cIdx < row.length && row[cIdx] !== undefined) {
              const v = String(row[cIdx]).trim().toUpperCase();
              subs.push(v.includes("Đ") || v === "D" || v === "T" ? "Đ" : "S");
            } else {
              subs.push("Đ");
            }
            cIdx++;
          }
          newKey.part2[qKey] = subs;
        }

        for (let i = 0; i < exam.config.p3_num; i++) {
          if (cIdx < row.length && row[cIdx] !== undefined) {
            newKey.part3[i] = String(row[cIdx]).trim();
          }
          cIdx++;
        }

        exam.answerKeys[codeVal] = newKey;
        window.appState.data.activeMade = codeVal;
        importedCount++;
      }

      window.appState.save();
      window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
      window.renderExamHub && window.renderExamHub();
      playBeep(true);
      alert(`Đã nạp thành công ${importedCount} mã đề từ File Excel!`);
    } catch (err) {
      console.error("Excel parse error:", err);
      alert("Lỗi khi đọc file Excel! Vui lòng tải file mẫu để kiểm tra.");
    }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = "";
};

window.downloadExcelKeyTemplate = function downloadExcelKeyTemplate() {
  if (typeof XLSX === "undefined") {
    alert("Thư viện SheetJS chưa sẵn sàng!");
    return;
  }
  const exam = window.appState.getCurrentExam();
  const headers = ["Mã Đề"];

  for (let i = 1; i <= exam.config.p1_num; i++) headers.push(`P1_C${i}`);
  for (let i = 1; i <= exam.config.p2_num; i++) {
    headers.push(`P2_C${i}_a`, `P2_C${i}_b`, `P2_C${i}_c`, `P2_C${i}_d`);
  }
  for (let i = 1; i <= exam.config.p3_num; i++) headers.push(`P3_C${i}`);

  const sampleRows = [headers];
  Object.entries(exam.answerKeys || {}).forEach(([code, keyObj]) => {
    const r = [code];
    for (let i = 0; i < exam.config.p1_num; i++) r.push(keyObj.part1[i] || "A");
    for (let i = 1; i <= exam.config.p2_num; i++) {
      const subs = keyObj.part2[String(i)] || ["Đ", "S", "Đ", "S"];
      r.push(subs[0], subs[1], subs[2], subs[3]);
    }
    for (let i = 0; i < exam.config.p3_num; i++) r.push(keyObj.part3[i] || "0");
    sampleRows.push(r);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(sampleRows);
  XLSX.utils.book_append_sheet(wb, ws, "Mau_Dap_An");
  XLSX.writeFile(wb, "Mau_Dap_An_QMATH_2025.xlsx");
};

let qrScannerStream = null;
let qrScanInterval = null;

window.openQRScannerModal = function openQRScannerModal() {
  const modal = document.getElementById("qrScannerModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  startQRCamera();
};

window.closeQRScannerModal = function closeQRScannerModal() {
  const modal = document.getElementById("qrScannerModal");
  if (modal) modal.classList.add("hidden");
  stopQRCamera();
};

async function startQRCamera() {
  const video = document.getElementById("qrVideoFeed");
  const statusEl = document.getElementById("qrCameraStatus");
  if (!video) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (statusEl) statusEl.innerHTML = `<span class="text-rose-600">Trình duyệt không hỗ trợ mở camera. Hãy dùng nút 'Tải ảnh QR từ máy'!</span>`;
    return;
  }

  try {
    qrScannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = qrScannerStream;
    await video.play();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    qrScanInterval = setInterval(() => {
      if (video.readyState !== 4) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (typeof jsQR !== "undefined") {
        const code = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: "dontInvert" });
        if (code && code.data) {
          handleQRDataImport(code.data);
        }
      }
    }, 250);
  } catch (err) {
    if (statusEl) statusEl.innerHTML = `<span class="text-rose-600">Camera QR không khả dụng. Hãy dùng nút 'Tải ảnh QR từ máy'!</span>`;
  }
}

function stopQRCamera() {
  if (qrScanInterval) {
    clearInterval(qrScanInterval);
    qrScanInterval = null;
  }
  if (qrScannerStream) {
    qrScannerStream.getTracks().forEach(t => t.stop());
    qrScannerStream = null;
  }
}

window.handleQRImageUpload = function handleQRImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (typeof jsQR !== "undefined") {
        const code = jsQR(imgData.data, imgData.width, imgData.height);
        if (code && code.data) {
          handleQRDataImport(code.data);
        } else {
          alert("Không tìm thấy mã QR trong ảnh! Vui lòng chọn ảnh rõ nét hơn.");
        }
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  event.target.value = "";
};

function handleQRDataImport(qrStr) {
  try {
    const exam = window.appState.getCurrentExam();
    let made = "";
    let keyObj = null;

    try {
      const parsed = JSON.parse(qrStr);
      if (parsed.made) {
        made = String(parsed.made);
        keyObj = { part1: parsed.p1 || [], part2: parsed.p2 || {}, part3: parsed.p3 || [] };
      }
    } catch (e) {}

    if (!keyObj && qrStr.startsWith("QM2025|")) {
      const parts = qrStr.split("|");
      made = parts[1] || "101";
      const p1Arr = (parts[2] || "").split("");
      const p2Arr = (parts[3] || "").split(";");
      const p2Map = {};
      p2Arr.forEach((block, idx) => {
        p2Map[String(idx + 1)] = block.split("").map(c => c === "D" || c === "Đ" ? "Đ" : "S");
      });
      const p3Arr = (parts[4] || "").split(",");
      keyObj = { part1: p1Arr, part2: p2Map, part3: p3Arr };
    }

    if (made && keyObj) {
      exam.answerKeys[made] = keyObj;
      window.appState.data.activeMade = made;
      window.appState.save();
      playBeep(true);
      window.closeQRScannerModal();
      window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
      window.renderExamHub && window.renderExamHub();
      alert(`Đã nạp thành công đáp án Mã Đề ${made} từ mã QR!`);
    } else {
      alert("Định dạng dữ liệu mã QR không hợp lệ!");
    }
  } catch (err) {
    alert("Lỗi khi xử lý dữ liệu mã QR!");
  }
}

window.showQRCodeShareModal = function showQRCodeShareModal(made) {
  const modal = document.getElementById("qrShareModal");
  const qrcodeContainer = document.getElementById("qrcodeDisplay");
  if (!modal || !qrcodeContainer) return;

  const exam = window.appState.getCurrentExam();
  const key = exam.answerKeys[made];
  if (!key) return;

  const p1Str = key.part1.join("");
  const p2Str = Object.values(key.part2).map(s => s.join("")).join(";");
  const p3Str = key.part3.join(",");
  const qrData = `QM2025|${made}|${p1Str}|${p2Str}|${p3Str}`;

  qrcodeContainer.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    new QRCode(qrcodeContainer, {
      text: qrData,
      width: 200,
      height: 200,
      colorDark: "#0f172a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  const codeEl = document.getElementById("qrShareMade");
  const nameEl = document.getElementById("qrShareExamName");
  if (codeEl) codeEl.innerText = made;
  if (nameEl) nameEl.innerText = exam.name;
  modal.classList.remove("hidden");
};

window.closeQRShareModal = function closeQRShareModal() {
  const modal = document.getElementById("qrShareModal");
  if (modal) modal.classList.add("hidden");
};

// =========================================================================
// === QUẢN LÝ MÃ ĐỀ & ĐÁP ÁN TRỰC QUAN ===
// =========================================================================

window.addNewMadePrompt = function addNewMadePrompt() {
  const exam = window.appState.getCurrentExam();
  const digits = (exam.config && exam.config.made_digits === 4) ? 4 : 3;
  const example = digits === 4 ? "0102, 0103..." : "103, 104, 201...";
  const code = prompt(`Nhập Mã Đề mới (${digits} chữ số, ví dụ: ${example}):`);
  if (!code) return;
  const cleanCode = code.trim();
  if (exam.answerKeys[cleanCode]) {
    alert("Mã đề này đã tồn tại!");
    return;
  }
  exam.answerKeys[cleanCode] = createDefaultKey(exam.config);
  window.appState.data.activeMade = cleanCode;
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
  window.renderExamHub && window.renderExamHub();
};

window.deleteCurrentMade = function deleteCurrentMade(made) {
  const exam = window.appState.getCurrentExam();
  const codes = Object.keys(exam.answerKeys);
  if (codes.length <= 1) {
    alert("Bài thi phải có ít nhất 1 mã đề!");
    return;
  }
  if (confirm(`Bạn có chắc muốn xóa mã đề ${made}?`)) {
    delete exam.answerKeys[made];
    window.appState.data.activeMade = Object.keys(exam.answerKeys)[0];
    window.appState.save();
    window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
    window.renderExamHub && window.renderExamHub();
  }
};

window.quickTextPastePrompt = function quickTextPastePrompt(made) {
  const exam = window.appState.getCurrentExam();
  const curKey = exam.answerKeys[made];
  const p1Text = prompt("Nhập chuỗi đáp án Phần I (các chữ cái A, B, C, D liền nhau, ví dụ ABCDABCDABCD):", curKey.part1.join(""));
  if (p1Text !== null) {
    const clean = p1Text.replace(/[^A-Za-z]/g, "").toUpperCase();
    for (let i = 0; i < exam.config.p1_num && i < clean.length; i++) {
      curKey.part1[i] = clean[i];
    }
  }
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
};

window.selectActiveMade = function selectActiveMade(made) {
  window.appState.data.activeMade = made;
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
};

function createDefaultKey(config) {
  const p1 = Array(config.p1_num !== undefined ? config.p1_num : 12).fill("A");
  const p2 = {};
  const p2Count = config.p2_num !== undefined ? config.p2_num : 4;
  for (let i = 1; i <= p2Count; i++) {
    p2[String(i)] = ["Đ", "S", "Đ", "S"];
  }
  const p3 = Array(config.p3_num !== undefined ? config.p3_num : 6).fill("0");
  return { part1: p1, part2: p2, part3: p3 };
}

window.setPart1Answer = function setPart1Answer(made, qIdx, opt) {
  const exam = window.appState.getCurrentExam();
  if (!exam.answerKeys[made]) return;
  exam.answerKeys[made].part1[qIdx] = exam.answerKeys[made].part1[qIdx] === opt ? "" : opt;
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
};

window.setPart2Answer = function setPart2Answer(made, qKey, subIdx, val) {
  const exam = window.appState.getCurrentExam();
  if (!exam.answerKeys[made]) return;
  if (!exam.answerKeys[made].part2[qKey]) {
    exam.answerKeys[made].part2[qKey] = ["", "", "", ""];
  }
  exam.answerKeys[made].part2[qKey][subIdx] = exam.answerKeys[made].part2[qKey][subIdx] === val ? "" : val;
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
};

window.setPart3Answer = function setPart3Answer(made, qIdx, val) {
  const exam = window.appState.getCurrentExam();
  if (!exam.answerKeys[made]) return;
  exam.answerKeys[made].part3[qIdx] = val.trim();
  window.appState.save();
};

window.renderVisualAnswerSheet = function renderVisualAnswerSheet() {
  const exam = window.appState.getCurrentExam();
  if (!exam) return;

  const titleEl = document.getElementById("examDetailTitle");
  const badgeEl = document.getElementById("examSheetBadge");
  const sheetInfo = window.SHEET_TYPES[exam.sheet_type] || window.SHEET_TYPES["A4_TN2025_BGD_1239"];
  const digits = (exam.config && exam.config.made_digits === 4) ? 4 : 3;

  if (titleEl) titleEl.innerText = exam.name;
  if (badgeEl) badgeEl.innerText = `${sheetInfo.name} • Mã đề ${digits} số`;

  const container = document.getElementById("visualAnswerSheetContainer");
  const codeSelector = document.getElementById("visualCodeSelector");
  if (!container || !codeSelector) return;

  const codes = Object.keys(exam.answerKeys);
  if (codes.length === 0) {
    exam.answerKeys["101"] = createDefaultKey(exam.config);
    window.appState.save();
  }

  if (!exam.answerKeys[window.appState.data.activeMade]) {
    window.appState.data.activeMade = Object.keys(exam.answerKeys)[0];
  }
  const curMade = window.appState.data.activeMade;
  const curKey = exam.answerKeys[curMade] || createDefaultKey(exam.config);

  let codeTabsHtml = "";
  Object.keys(exam.answerKeys).forEach(c => {
    const isActive = c === curMade;
    codeTabsHtml += `
      <button onclick="window.selectActiveMade('${c}')" class="code-tab-btn ${isActive ? "active" : ""}">
        MÃ ${c}
      </button>
    `;
  });
  codeSelector.innerHTML = codeTabsHtml;

  const p1Num = exam.config.p1_num !== undefined ? exam.config.p1_num : 12;
  const p2Num = exam.config.p2_num !== undefined ? exam.config.p2_num : 0;
  const p3Num = exam.config.p3_num !== undefined ? exam.config.p3_num : 0;

  let sheetHtml = `
    <div class="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center space-x-2">
          <span class="text-xs uppercase font-bold text-slate-400">Đang chọn:</span>
          <span class="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm border border-slate-200 dark:border-slate-700">
            MÃ ${curMade}
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400">(${p1Num} câu P1 • ${p2Num} câu P2 • ${p3Num} câu P3)</span>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button onclick="window.showQRCodeShareModal('${curMade}')" class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm">
            <span>📱 Mã QR chia sẻ</span>
          </button>
          <button onclick="window.quickTextPastePrompt('${curMade}')" class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm">
            <span>⚡ Dán chuỗi text</span>
          </button>
          <button onclick="window.deleteCurrentMade('${curMade}')" class="btn-danger px-2.5 py-1.5 rounded-lg text-xs font-semibold">
            Xóa mã này
          </button>
        </div>
      </div>
  `;

  if (p1Num > 0) {
    sheetHtml += `
      <div>
        <div class="flex items-center justify-between mb-2.5">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Phần I: Trắc Nghiệm Nhiều Lựa Chọn (${p1Num} câu - ${exam.config.p1_score || 0.25}đ/câu)
          </h4>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Chạm ô tròn để chọn/đổi</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
    `;

    for (let q = 0; q < p1Num; q++) {
      const qNum = q + 1;
      const curAns = curKey.part1[q] || "";
      const opts = ["A", "B", "C", "D"];

      sheetHtml += `
        <div class="p-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <span class="font-mono font-bold text-xs text-slate-500 dark:text-slate-400 w-7">C${qNum}</span>
          <div class="flex items-center space-x-1">
            ${opts.map(opt => `
              <button onclick="window.setPart1Answer('${curMade}', ${q}, '${opt}')" class="bubble-choice ${curAns === opt ? "selected" : ""}">
                ${opt}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }
    sheetHtml += `</div></div>`;
  }

  if (p2Num > 0) {
    const s1 = exam.config.p2_score_1 ?? 0.1;
    const s2 = exam.config.p2_score_2 ?? 0.25;
    const s3 = exam.config.p2_score_3 ?? 0.5;
    const s4 = exam.config.p2_score_4 ?? 1.0;

    sheetHtml += `
      <div class="border-t border-slate-100 dark:border-slate-800 pt-4">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Phần II: Trắc Nghiệm Đúng / Sai (${p2Num} câu • Điểm 1-2-3-4 ý: ${s1}; ${s2}; ${s3}; ${s4}đ)
          </h4>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Đ (Đúng - Xanh lá) | S (Sai - Đỏ)</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    `;

    for (let q = 0; q < p2Num; q++) {
      const qNum = q + 1;
      const qKey = String(qNum);
      const subs = curKey.part2[qKey] || ["", "", "", ""];
      const subLabels = ["a", "b", "c", "d"];

      sheetHtml += `
        <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div class="font-bold text-xs text-slate-700 dark:text-slate-300 mb-2 pb-1 border-b border-slate-200 dark:border-slate-700">
            CÂU ${qNum}
          </div>
          <div class="space-y-1.5">
            ${subLabels.map((sLabel, sIdx) => {
              const val = subs[sIdx] || "";
              return `
                <div class="flex items-center justify-between text-xs">
                  <span class="font-mono font-medium text-slate-600 dark:text-slate-400">${sLabel})</span>
                  <div class="flex items-center space-x-1">
                    <button onclick="window.setPart2Answer('${curMade}', '${qKey}', ${sIdx}, 'Đ')" class="bubble-tf ${val === "Đ" ? "selected-true" : ""}">
                      Đ
                    </button>
                    <button onclick="window.setPart2Answer('${curMade}', '${qKey}', ${sIdx}, 'S')" class="bubble-tf ${val === "S" ? "selected-false" : ""}">
                      S
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }
    sheetHtml += `</div></div>`;
  }

  if (p3Num > 0) {
    sheetHtml += `
      <div class="border-t border-slate-100 dark:border-slate-800 pt-4">
        <div class="flex items-center justify-between mb-2.5">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Phần III: Trả Lời Ngắn (${p3Num} câu - ${exam.config.p3_score || 0.5}đ/câu)
          </h4>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Nhập trực tiếp số</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
    `;

    for (let q = 0; q < p3Num; q++) {
      const qNum = q + 1;
      const curAns = curKey.part3[q] || "";

      sheetHtml += `
        <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <label class="block font-bold text-[11px] text-slate-600 dark:text-slate-400 mb-1">CÂU ${qNum}</label>
          <input type="text" value="${curAns}" onchange="window.setPart3Answer('${curMade}', ${q}, this.value)" placeholder="0.0" class="w-full py-1 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-xs text-center text-slate-900 dark:text-white focus:outline-none focus:border-blue-600">
        </div>
      `;
    }
    sheetHtml += `</div></div>`;
  }

  sheetHtml += `</div>`;
  container.innerHTML = sheetHtml;
};

// =========================================================================
// === CAMERA, 4 Ô ĐỊNH VỊ GÓC XANH LÁ & CHẤM BÀI TỰ ĐỘNG CHUẨN APP QM ===
// =========================================================================

let activeStream = null;
let currentFacingMode = "environment";
let cornerTrackTimer = null;
let isAutoScanActive = true;
let torchEnabled = false;
let lockProgress = 0;
let prevFrameResult = null;
let lastGradedSBD = "";
let lastGradedTime = 0;
let lastGradedRecordId = null;

async function initCamera() {
  const video = document.getElementById("scannerVideo");
  const statusEl = document.getElementById("cameraStatus");
  if (!video) return;

  stopCameraAndLoop();

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (statusEl) statusEl.innerHTML = `<span class="text-rose-600">Trình duyệt không hỗ trợ mở Camera trực tiếp. Hãy dùng nút 'Tải ảnh phiếu từ máy'!</span>`;
    return;
  }

  try {
    const constraints = {
      video: {
        facingMode: { ideal: currentFacingMode },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    };

    activeStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = activeStream;
    await video.play();

    if (statusEl) {
      statusEl.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>Camera sẵn sàng • Đưa 4 góc phiếu vào 4 ô vuông xanh`;
    }

    startCornerTrackingLoop();
  } catch (err) {
    if (statusEl) {
      statusEl.innerHTML = `<span class="text-rose-600">Không thể mở camera (${err.name || "lỗi quyền"}). Hãy dùng nút "Tải ảnh phiếu từ máy"!</span>`;
    }
  }
}

function stopCameraAndLoop() {
  if (cornerTrackTimer) {
    clearInterval(cornerTrackTimer);
    cornerTrackTimer = null;
  }
  if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
    activeStream = null;
  }
}

function updateCornerSquaresUI(cornerStatus, lockedCount) {
  const ids = ["cornerBoxTL", "cornerBoxTR", "cornerBoxBR", "cornerBoxBL"];
  ids.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (cornerStatus && cornerStatus[idx]) {
      el.classList.add("locked");
    } else {
      el.classList.remove("locked");
    }
  });

  const badge = document.getElementById("cornerLockBadge");
  if (badge) {
    if (lockedCount === 4) {
      badge.innerText = `✅ Đã khóa 4/4 ô định vị góc • Đang đọc phiếu...`;
      badge.className = "inline-flex items-center px-3 py-1 bg-emerald-600 text-white text-[11px] rounded-full font-bold shadow";
    } else {
      badge.innerText = `🎯 Định vị góc phiếu: ${lockedCount}/4 ô vuông xanh`;
      badge.className = "inline-flex items-center px-3 py-1 bg-black/75 text-emerald-400 text-[11px] rounded-full font-bold border border-emerald-500/40 shadow";
    }
  }
}

function triggerFlashOverlay() {
  const flash = document.getElementById("scannerFlashOverlay");
  if (!flash) return;
  flash.classList.add("active");
  setTimeout(() => flash.classList.remove("active"), 260);
}

function startCornerTrackingLoop() {
  if (cornerTrackTimer) clearInterval(cornerTrackTimer);

  cornerTrackTimer = setInterval(() => {
    const video = document.getElementById("scannerVideo");
    if (!video || video.readyState !== 4) return;

    // 1. Kiểm tra 4 ô định vị góc xanh lá
    const cornerCheck = window.omrEngine.checkVideoFrameCorners(video);
    updateCornerSquaresUI(cornerCheck.cornerStatus, cornerCheck.lockedCount);

    const progWrap = document.getElementById("scanLockProgressWrap");
    const progBar = document.getElementById("scanLockProgressBar");

    if (!isAutoScanActive) {
      if (progWrap) progWrap.classList.add("hidden");
      return;
    }

    // 2. Nếu bắt đủ 4/4 góc định vị -> tăng tiến trình khóa ảnh theo tốc độ Cài đặt chung
    const speedSetting = (window.appState.data.settings && window.appState.data.settings.scanSpeed) || "normal";
    const stepGain = speedSetting === "fast" ? 55 : (speedSetting === "accurate" ? 22 : 35);

    if (cornerCheck.lockedCount === 4) {
      if (progWrap) progWrap.classList.remove("hidden");
      lockProgress = Math.min(100, lockProgress + stepGain);
      if (progBar) progBar.style.width = `${lockProgress}%`;

      if (lockProgress >= 100) {
        lockProgress = 0;
        if (progBar) progBar.style.width = "0%";
        handleAutoScanCandidate(video, speedSetting);
      }
    } else {
      lockProgress = Math.max(0, lockProgress - 35);
      if (lockProgress === 0 && progWrap) progWrap.classList.add("hidden");
      if (progBar) progBar.style.width = `${lockProgress}%`;
    }
  }, 180);
}

function handleAutoScanCandidate(video, speedSetting) {
  try {
    const exam = window.appState.getCurrentExam();
    const out = window.omrEngine.gradeFromImageSource(video, exam.config, exam.answerKeys);
    const res = out.result;

    // Nếu tốc độ Chuẩn hoặc Chính xác cao: so sánh 2 khung hình liên tiếp (`compareAnswerSheetResults` của QM APK)
    if (speedSetting !== "fast") {
      if (!prevFrameResult || !window.omrEngine.compareAnswerSheetResults(prevFrameResult, res)) {
        prevFrameResult = res;
        return;
      }
    }
    prevFrameResult = null;

    const now = Date.now();
    if (res.sbd !== lastGradedSBD || now - lastGradedTime > 3200) {
      lastGradedSBD = res.sbd;
      lastGradedTime = now;
      saveGradedOutput(out, exam, true);
    }
  } catch (e) {}
}

window.toggleTorch = async function toggleTorch() {
  if (!activeStream) return;
  const track = activeStream.getVideoTracks()[0];
  if (!track) return;
  try {
    torchEnabled = !torchEnabled;
    await track.applyConstraints({ advanced: [{ torch: torchEnabled }] });
    const btn = document.getElementById("btnTorch");
    if (btn) btn.innerHTML = torchEnabled ? "🔦 Flash: BẬT" : "🔦 Flash";
  } catch (e) {
    alert("Thiết bị hoặc trình duyệt này không hỗ trợ bật đèn Flash trực tiếp!");
  }
};

window.switchCamera = function switchCamera() {
  currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
  initCamera();
};

window.toggleAutoScan = function toggleAutoScan() {
  isAutoScanActive = !isAutoScanActive;
  const btn = document.getElementById("btnAutoScan");
  if (btn) {
    btn.innerHTML = isAutoScanActive ? `<span>⚡ Tự động: BẬT</span>` : `<span>⚡ Tự động: TẮT</span>`;
  }
};

function saveGradedOutput(gradeOutput, exam, fromAutoScan = false) {
  const res = gradeOutput.result;
  const extracted = gradeOutput.extracted;
  const settings = window.appState.data.settings || defaultSettings;
  const studentName = window.appState.findStudentName(res.sbd);

  // Lưu bản gốc máy nhận diện (`originalRecord`) để đối chiếu khi giáo viên chỉnh sửa thủ công
  const originalSnapshot = {
    sbd: res.sbd,
    made: res.made,
    part1_answers: [...(res.part1_answers || [])],
    part2_answers: JSON.parse(JSON.stringify(res.part2_answers || {})),
    part3_answers: [...(res.part3_answers || [])]
  };

  // Lưu metadata tọa độ để có thể vẽ lại vòng tròn khi chỉnh sửa thủ công
  const extractedMeta = {
    sbdObj: extracted.sbdObj,
    madeObj: extracted.madeObj,
    part1Info: extracted.part1.infoMap,
    part2Info: extracted.part2.infoMap,
    part3Info: extracted.part3.infoMap,
    anchorData: extracted.anchorData
  };

  const resultRecord = {
    id: "res_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    examId: exam.id,
    classId: exam.classId,
    sbd: res.sbd,
    studentName: studentName,
    made: res.made,
    part1_score: res.part1_score,
    part2_score: res.part2_score,
    part3_score: res.part3_score,
    total_score: res.total_score,
    max_possible_score: res.max_possible_score || 10,
    part1_answers: [...res.part1_answers],
    part2_answers: JSON.parse(JSON.stringify(res.part2_answers)),
    part3_answers: [...res.part3_answers],
    part1_correct: res.part1_correct,
    part2_correct_items: res.part2_correct_items,
    part3_correct: res.part3_correct,
    double_count: res.double_count || 0,
    blank_count: res.blank_count || 0,
    status: res.status,
    timestamp: res.timestamp,
    cleanWarpedDataUrl: gradeOutput.cleanWarpedDataUrl,
    annotatedDataUrl: gradeOutput.annotatedDataUrl,
    originalRecord: originalSnapshot,
    extractedMeta: extractedMeta,
    manualOverrides: {
      hasAnyEdit: false,
      editCount: 0,
      sbd: false,
      made: false,
      part1: {},
      part2: {},
      part3: {}
    }
  };

  triggerFlashOverlay();
  window.appState.addResult(resultRecord);
  lastGradedRecordId = resultRecord.id;
  playBeep(true);

  window.renderExamHub && window.renderExamHub();
  window.renderResultsTable && window.renderResultsTable();

  // Hiển thị thông báo nhanh hoặc mở Modal xem chi tiết tùy theo cài đặt `viewScoreImmediately`
  const toastEl = document.getElementById("scanQuickToast");
  const toastText = document.getElementById("scanQuickToastText");
  if (toastEl && toastText) {
    toastText.innerText = `✅ Đã chấm SBD ${resultRecord.sbd} (${resultRecord.studentName}) • Mã ${resultRecord.made} • Điểm: ${resultRecord.total_score.toFixed(2)}`;
    toastEl.classList.remove("hidden");
  }

  if (settings.viewScoreImmediately !== false || !fromAutoScan) {
    window.showResultModal(resultRecord);
  }

  if (res.total_score >= (res.max_possible_score || 10) * 0.9 && typeof confetti === "function") {
    confetti({ particleCount: 55, spread: 60, origin: { y: 0.6 } });
  }
}

function doGrade(sourceElement) {
  const exam = window.appState.getCurrentExam();
  if (!exam) {
    alert("Vui lòng tạo hoặc chọn một bài thi trước!");
    return;
  }

  try {
    const gradeOutput = window.omrEngine.gradeFromImageSource(sourceElement, exam.config, exam.answerKeys);
    if (gradeOutput.cornerInfo) {
      updateCornerSquaresUI(gradeOutput.cornerInfo.cornerStatus, gradeOutput.cornerInfo.lockedCount);
    }
    saveGradedOutput(gradeOutput, exam, false);
  } catch (err) {
    console.error("Grading failed:", err);
    playBeep(false);
    alert("Chưa nhận diện được phiếu thi! Vui lòng căn 4 góc phiếu rõ ràng trong 4 ô vuông xanh và thử lại.");
  }
}

window.captureAndGrade = function captureAndGrade() {
  const video = document.getElementById("scannerVideo");
  if (!video || !activeStream) {
    alert("Camera chưa bật hoặc không khả dụng. Hãy dùng nút 'Tải ảnh phiếu từ máy'!");
    return;
  }
  doGrade(video);
};

window.handleFileUpload = function handleFileUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => doGrade(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  event.target.value = "";
};

window.gradeSampleSheet = function gradeSampleSheet() {
  const img = new Image();
  img.onload = () => doGrade(img);
  img.src = "samples/bai_thi_mau_101.png";
};

window.openLastGradedReview = function openLastGradedReview() {
  if (!lastGradedRecordId) return;
  window.previewGradedImage(lastGradedRecordId);
};

// =========================================================================
// === REQUIREMENT 4: XEM BÀI ĐÃ CHẤM & CHỈNH SỬA THỦ CÔNG CÓ DẤU HIỆU ===
// =========================================================================

let currentReviewRecordId = null;
let currentReviewZoom = 1.0;
let showingCleanImage = false;

function computeManualOverrides(record) {
  const orig = record.originalRecord || {
    sbd: record.sbd,
    made: record.made,
    part1_answers: record.part1_answers || [],
    part2_answers: record.part2_answers || {},
    part3_answers: record.part3_answers || []
  };

  const overrides = {
    sbd: record.sbd !== orig.sbd,
    made: record.made !== orig.made,
    part1: {},
    part2: {},
    part3: {},
    editCount: 0,
    hasAnyEdit: false
  };

  if (overrides.sbd) overrides.editCount++;
  if (overrides.made) overrides.editCount++;

  const p1Len = Math.max((record.part1_answers || []).length, (orig.part1_answers || []).length);
  for (let i = 0; i < p1Len; i++) {
    if ((record.part1_answers[i] || "") !== (orig.part1_answers[i] || "")) {
      overrides.part1[i] = true;
      overrides.editCount++;
    }
  }

  for (const qKey of Object.keys(record.part2_answers || {})) {
    const curSubs = record.part2_answers[qKey] || [];
    const origSubs = (orig.part2_answers && orig.part2_answers[qKey]) || [];
    for (let s = 0; s < 4; s++) {
      if ((curSubs[s] || "") !== (origSubs[s] || "")) {
        overrides.part2[`${qKey}_${s}`] = true;
        overrides.editCount++;
      }
    }
  }

  const p3Len = Math.max((record.part3_answers || []).length, (orig.part3_answers || []).length);
  for (let i = 0; i < p3Len; i++) {
    if ((record.part3_answers[i] || "") !== (orig.part3_answers[i] || "")) {
      overrides.part3[i] = true;
      overrides.editCount++;
    }
  }

  overrides.hasAnyEdit = overrides.editCount > 0;
  record.manualOverrides = overrides;
  return overrides;
}

window.zoomReviewImage = function zoomReviewImage(delta) {
  if (delta === 0) {
    currentReviewZoom = 1.0;
  } else {
    currentReviewZoom = Math.min(2.5, Math.max(0.75, currentReviewZoom + delta));
  }
  const img = document.getElementById("modalPreviewImg");
  const label = document.getElementById("reviewZoomLabel");
  if (img) img.style.transform = `scale(${currentReviewZoom})`;
  if (label) label.innerText = `${Math.round(currentReviewZoom * 100)}%`;
};

window.toggleReviewCleanImage = function toggleReviewCleanImage() {
  const record = window.appState.data.results.find(r => r.id === currentReviewRecordId);
  if (!record) return;
  showingCleanImage = !showingCleanImage;

  const img = document.getElementById("modalPreviewImg");
  const btn = document.getElementById("btnToggleCleanImage");
  if (img) {
    img.src = (showingCleanImage && record.cleanWarpedDataUrl) ? record.cleanWarpedDataUrl : record.annotatedDataUrl;
  }
  if (btn) {
    btn.innerText = showingCleanImage ? "🎯 Xem ảnh chấm (Có khoanh)" : "👁️ Xem ảnh gốc chưa khoanh";
  }
};

window.showResultModal = function showResultModal(record) {
  const modal = document.getElementById("resultModal");
  if (!modal || !record) return;

  currentReviewRecordId = record.id;
  currentReviewZoom = 1.0;
  showingCleanImage = false;
  window.zoomReviewImage(0);

  // Đảm bảo có bản lưu dữ liệu gốc máy nhận diện để đối chiếu
  if (!record.originalRecord) {
    record.originalRecord = {
      sbd: record.sbd,
      made: record.made,
      part1_answers: [...(record.part1_answers || [])],
      part2_answers: JSON.parse(JSON.stringify(record.part2_answers || {})),
      part3_answers: [...(record.part3_answers || [])]
    };
  }
  computeManualOverrides(record);

  updateResultModalHeaderAndImage(record);
  renderManualReviewEditor(record);

  modal.classList.remove("hidden");
};

function updateResultModalHeaderAndImage(record) {
  const nameEl = document.getElementById("modalStudentName");
  const scoreEl = document.getElementById("modalTotalScore");
  const p1El = document.getElementById("modalP1Score");
  const p2El = document.getElementById("modalP2Score");
  const p3El = document.getElementById("modalP3Score");
  const imgEl = document.getElementById("modalPreviewImg");
  const dlBtn = document.getElementById("btnDownloadGradedImg");
  const modHeaderBadge = document.getElementById("modalModifiedHeaderBadge");

  if (nameEl) nameEl.innerText = `${record.studentName} (SBD: ${record.sbd} • Mã đề: ${record.made})`;
  if (scoreEl) scoreEl.innerText = record.total_score.toFixed(2);
  if (p1El) p1El.innerText = `${record.part1_score.toFixed(2)} đ (${record.part1_correct || 0} câu đúng)`;
  if (p2El) p2El.innerText = `${record.part2_score.toFixed(2)} đ`;
  if (p3El) p3El.innerText = `${record.part3_score.toFixed(2)} đ (${record.part3_correct || 0} câu đúng)`;

  if (imgEl) {
    imgEl.src = showingCleanImage && record.cleanWarpedDataUrl ? record.cleanWarpedDataUrl : record.annotatedDataUrl;
  }
  if (dlBtn) {
    dlBtn.href = record.annotatedDataUrl;
    dlBtn.download = `Phieu_${record.sbd}_Ma_${record.made}.jpg`;
  }

  const ov = record.manualOverrides;
  if (modHeaderBadge) {
    if (ov && ov.hasAnyEdit) {
      modHeaderBadge.innerText = `✎ Đã chỉnh sửa (${ov.editCount} vị trí)`;
      modHeaderBadge.classList.remove("hidden");
    } else {
      modHeaderBadge.classList.add("hidden");
    }
  }
}

function formatRecognizedLabel(val) {
  if (!val) return "Bỏ trống";
  if (val === "DOUBLE") return "Tô đúp (>1 ô)";
  return val;
}

function renderManualReviewEditor(record) {
  const container = document.getElementById("manualReviewEditorContainer");
  if (!container) return;

  const exam = window.appState.data.exams.find(e => e.id === record.examId) || window.appState.getCurrentExam();
  const key = (exam.answerKeys && exam.answerKeys[record.made]) || (exam.answerKeys && exam.answerKeys[Object.keys(exam.answerKeys)[0]]) || { part1: [], part2: {}, part3: [] };
  const orig = record.originalRecord;
  const ov = computeManualOverrides(record);

  let html = "";

  // Cảnh báo nếu Mã đề nhận diện chưa có trong kho đáp án
  const settings = window.appState.data.settings || defaultSettings;
  if (settings.warnNoKey && record.status !== "OK") {
    html += `
      <div class="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-700 flex items-center justify-between gap-2 text-xs text-rose-800 dark:text-rose-200 font-semibold">
        <span>⚠ Cảnh báo: Mã đề [${record.made}] chưa có trong kho Đáp án! Hệ thống đang tạm chấm theo mã đề [${Object.keys(exam.answerKeys || {})[0] || "101"}]. Bạn có thể chọn lại Mã đề đúng ở ô bên dưới.</span>
      </div>
    `;
  }

  // Banner thông báo nếu phiếu có chỉnh sửa thủ công
  if (ov.hasAnyEdit) {
    html += `
      <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 dark:border-amber-600 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-semibold">
          <span class="text-base">✎</span>
          <span>Phiếu này đã được điều chỉnh thủ công tại <strong>${ov.editCount} vị trí</strong>. Các ô đã sửa được đóng khung màu cam nổi bật bên dưới.</span>
        </div>
        <button onclick="window.restoreAllOriginalFields('${record.id}')" class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm">
          ↺ Khôi phục toàn bộ kết quả gốc máy đọc
        </button>
      </div>
    `;
  }

  // 1. BẢNG THÔNG TIN ĐỊNH DANH (SBD & MÃ ĐỀ)
  html += `
    <div class="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
          1. Dữ Liệu Định Danh Nhận Diện Được (SBD & Mã Đề)
        </h4>
        <span class="text-[11px] text-slate-500 dark:text-slate-400">Có thể sửa trực tiếp nếu học sinh tô nhầm</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <!-- Ô Số Báo Danh -->
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 ${ov.sbd ? "modified-cell" : ""}">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-slate-700 dark:text-slate-300">Số Báo Danh:</span>
            ${ov.sbd ? `
              <span class="modified-badge">
                ✎ Đã sửa (Gốc máy đọc: ${orig.sbd})
                <button onclick="window.restoreSingleField('${record.id}', 'sbd')" title="Khôi phục SBD gốc" class="ml-1 underline font-extrabold">↺</button>
              </span>
            ` : `<span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">✓ Chuẩn máy đọc</span>`}
          </div>
          <div class="flex items-center space-x-2">
            <input type="text" value="${record.sbd}" onchange="window.updateManualField('${record.id}', 'sbd', 0, 0, this.value)" class="flex-1 py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-600 font-mono font-bold text-sm">
            <span class="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate max-w-[140px]">${record.studentName}</span>
          </div>
        </div>

        <!-- Ô Mã Đề -->
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 ${ov.made ? "modified-cell" : ""}">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-slate-700 dark:text-slate-300">Mã Đề Thi:</span>
            ${ov.made ? `
              <span class="modified-badge">
                ✎ Đã sửa (Gốc máy đọc: ${orig.made})
                <button onclick="window.restoreSingleField('${record.id}', 'made')" title="Khôi phục Mã đề gốc" class="ml-1 underline font-extrabold">↺</button>
              </span>
            ` : `<span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">✓ Chuẩn máy đọc</span>`}
          </div>
          <div class="flex items-center space-x-2">
            <input type="text" value="${record.made}" onchange="window.updateManualField('${record.id}', 'made', 0, 0, this.value)" class="w-28 py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-600 font-mono font-bold text-sm">
            <select onchange="if(this.value) window.updateManualField('${record.id}', 'made', 0, 0, this.value)" class="flex-1 py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs font-semibold">
              <option value="">-- Chọn từ kho mã đề --</option>
              ${Object.keys(exam.answerKeys || {}).map(c => `<option value="${c}" ${c === record.made ? "selected" : ""}>Mã đề ${c}</option>`).join("")}
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  // 2. BẢNG DỮ LIỆU PHẦN I (TRẮC NGHIỆM NHIỀU LỰA CHỌN)
  const p1Answers = record.part1_answers || [];
  if (p1Answers.length > 0) {
    html += `
      <div class="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            2. Bảng Dữ Liệu Phần I - Nhiều Lựa Chọn (${record.part1_correct}/${p1Answers.length} câu đúng = ${record.part1_score.toFixed(2)}đ)
          </h4>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Bấm A, B, C, D hoặc ∅ (Trống) để điều chỉnh thủ công</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
    `;

    const opts = ["A", "B", "C", "D"];
    for (let q = 0; q < p1Answers.length; q++) {
      const sAns = p1Answers[q] || "";
      const kAns = (key.part1 && key.part1[q]) || "";
      const origAns = (orig.part1_answers && orig.part1_answers[q]) || "";
      const isMod = Boolean(ov.part1[q]);
      const isCorrect = sAns && kAns && sAns === kAns;

      html += `
        <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-between gap-1.5 ${isMod ? "modified-cell" : ""}">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1.5">
              <span class="font-mono font-bold text-slate-900 dark:text-white">Câu ${q + 1}</span>
              <span class="text-[11px] px-1.5 py-0.2 rounded font-semibold ${isCorrect ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"}">
                ${isCorrect ? "✓ Đúng" : (sAns === "DOUBLE" ? "⚠ Tô đúp" : (!sAns ? "⚪ Trống" : "✗ Sai"))}
              </span>
            </div>
            <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400">Đ/A: <strong class="text-slate-900 dark:text-white">${kAns || "?"}</strong></span>
          </div>

          <div class="flex items-center justify-between pt-1">
            <div class="flex items-center space-x-1">
              ${opts.map(opt => {
                let btnCls = "";
                if (sAns === opt) {
                  btnCls = isCorrect ? "selected-correct" : "selected-wrong";
                }
                return `
                  <button onclick="window.updateManualField('${record.id}', 'p1', ${q}, 0, '${opt}')" class="bubble-choice ${btnCls}">
                    ${opt}
                  </button>
                `;
              }).join("")}
              <button onclick="window.updateManualField('${record.id}', 'p1', ${q}, 0, '')" title="Đặt là Bỏ trống" class="bubble-choice ${!sAns ? "selected" : ""}">
                ∅
              </button>
            </div>
          </div>

          ${isMod ? `
            <div class="flex items-center justify-between pt-1 border-t border-amber-300/60 dark:border-amber-700/60 text-[10px]">
              <span class="modified-badge">✎ Gốc máy đọc: ${formatRecognizedLabel(origAns)} → Sửa: ${formatRecognizedLabel(sAns)}</span>
              <button onclick="window.restoreSingleField('${record.id}', 'p1', ${q})" class="text-amber-700 dark:text-amber-300 font-bold hover:underline">↺ Hoàn tác</button>
            </div>
          ` : ""}
        </div>
      `;
    }

    html += `</div></div>`;
  }

  // 3. BẢNG DỮ LIỆU PHẦN II (TRẮC NGHIỆM ĐÚNG / SAI)
  const p2Keys = Object.keys(record.part2_answers || {});
  if (p2Keys.length > 0) {
    html += `
      <div class="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            3. Bảng Dữ Liệu Phần II - Đúng / Sai (${record.part2_score.toFixed(2)}đ)
          </h4>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Bấm Đ / S / ∅ từng ý a, b, c, d để điều chỉnh</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
    `;

    const subLabels = ["a", "b", "c", "d"];
    p2Keys.forEach(qKey => {
      const sSubs = record.part2_answers[qKey] || ["", "", "", ""];
      const kSubs = (key.part2 && key.part2[qKey]) || ["", "", "", ""];
      const origSubs = (orig.part2_answers && orig.part2_answers[qKey]) || ["", "", "", ""];

      let cCount = 0;
      for (let i = 0; i < 4; i++) {
        if (sSubs[i] && kSubs[i] && sSubs[i] === kSubs[i]) cCount++;
      }

      html += `
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
          <div class="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold text-slate-900 dark:text-white">CÂU ${qKey}</span>
            <span class="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[11px]">Đúng ${cCount}/4 ý</span>
          </div>
          <div class="space-y-1.5">
            ${subLabels.map((lbl, sIdx) => {
              const sVal = sSubs[sIdx] || "";
              const kVal = kSubs[sIdx] || "";
              const oVal = origSubs[sIdx] || "";
              const isSubMod = Boolean(ov.part2[`${qKey}_${sIdx}`]);
              const isSubCorrect = sVal && kVal && sVal === kVal;

              return `
                <div class="p-1.5 rounded-lg border border-transparent ${isSubMod ? "modified-cell" : ""}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-1">
                      <span class="font-mono font-bold text-slate-700 dark:text-slate-300">${lbl})</span>
                      <span class="text-[10px] ${isSubCorrect ? "text-emerald-600 font-bold" : "text-rose-500"}">${isSubCorrect ? "✓" : "✗"} (Đ/A:${kVal || "?"})</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <button onclick="window.updateManualField('${record.id}', 'p2', '${qKey}', ${sIdx}, 'Đ')" class="bubble-tf ${sVal === "Đ" ? "selected-true" : ""}">Đ</button>
                      <button onclick="window.updateManualField('${record.id}', 'p2', '${qKey}', ${sIdx}, 'S')" class="bubble-tf ${sVal === "S" ? "selected-false" : ""}">S</button>
                      <button onclick="window.updateManualField('${record.id}', 'p2', '${qKey}', ${sIdx}, '')" class="bubble-tf ${!sVal ? "selected" : ""}">∅</button>
                    </div>
                  </div>
                  ${isSubMod ? `
                    <div class="flex items-center justify-between mt-1 text-[10px]">
                      <span class="modified-badge">✎ Gốc: ${oVal || "Trống"}</span>
                      <button onclick="window.restoreSingleField('${record.id}', 'p2', '${qKey}', ${sIdx})" class="text-amber-700 dark:text-amber-300 font-bold hover:underline">↺</button>
                    </div>
                  ` : ""}
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
  }

  // 4. BẢNG DỮ LIỆU PHẦN III (TRẢ LỜI NGẮN - ĐIỀN SỐ)
  const p3Answers = record.part3_answers || [];
  if (p3Answers.length > 0) {
    html += `
      <div class="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            4. Bảng Dữ Liệu Phần III - Trả Lời Ngắn (${record.part3_correct}/${p3Answers.length} câu đúng = ${record.part3_score.toFixed(2)}đ)
          </h4>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Nhập lại số nếu máy nhận diện thiếu dấu phẩy/dấu âm</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
    `;

    for (let q = 0; q < p3Answers.length; q++) {
      const sVal = p3Answers[q] || "";
      const kVal = (key.part3 && key.part3[q]) || "";
      const oVal = (orig.part3_answers && orig.part3_answers[q]) || "";
      const isMod = Boolean(ov.part3[q]);
      const sNorm = window.omrEngine.normalizeNumber(sVal);
      const kNorm = window.omrEngine.normalizeNumber(kVal);
      const isCorrect = sNorm && kNorm && sNorm === kNorm;

      html += `
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1.5 ${isMod ? "modified-cell" : ""}">
          <div class="flex items-center justify-between">
            <span class="font-mono font-bold text-slate-900 dark:text-white">Câu ${q + 1}</span>
            <span class="text-[11px] font-semibold ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}">
              ${isCorrect ? "✓ Đúng" : "✗ Sai"} • Đ/A chuẩn: <strong class="font-mono">${kVal || "?"}</strong>
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <input type="text" value="${sVal}" onchange="window.updateManualField('${record.id}', 'p3', ${q}, 0, this.value)" placeholder="Trống" class="flex-1 py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-600 font-mono font-bold text-xs">
          </div>
          ${isMod ? `
            <div class="flex items-center justify-between pt-1 text-[10px]">
              <span class="modified-badge">✎ Gốc máy đọc: "${oVal || "Trống"}"</span>
              <button onclick="window.restoreSingleField('${record.id}', 'p3', ${q})" class="text-amber-700 dark:text-amber-300 font-bold hover:underline">↺ Hoàn tác</button>
            </div>
          ` : ""}
        </div>
      `;
    }

    html += `</div></div>`;
  }

  container.innerHTML = html;
}

window.updateManualField = async function updateManualField(recordId, fieldType, qIdxOrKey, subIdx, newVal) {
  const record = window.appState.data.results.find(r => r.id === recordId);
  if (!record) return;

  if (fieldType === "sbd") {
    record.sbd = String(newVal || "").trim();
    record.studentName = window.appState.findStudentName(record.sbd);
  } else if (fieldType === "made") {
    record.made = String(newVal || "").trim();
  } else if (fieldType === "p1") {
    record.part1_answers[qIdxOrKey] = newVal;
  } else if (fieldType === "p2") {
    const qKey = String(qIdxOrKey);
    if (!record.part2_answers[qKey]) record.part2_answers[qKey] = ["", "", "", ""];
    record.part2_answers[qKey][subIdx] = newVal;
  } else if (fieldType === "p3") {
    record.part3_answers[qIdxOrKey] = String(newVal || "").trim();
  }

  const overrides = computeManualOverrides(record);
  const exam = window.appState.data.exams.find(e => e.id === record.examId) || window.appState.getCurrentExam();
  await window.omrEngine.regradeRecordWithEdits(record, exam, overrides);

  window.appState.save();
  updateResultModalHeaderAndImage(record);
  renderManualReviewEditor(record);
  window.renderResultsTable && window.renderResultsTable();
};

window.restoreSingleField = async function restoreSingleField(recordId, fieldType, qIdxOrKey = 0, subIdx = 0) {
  const record = window.appState.data.results.find(r => r.id === recordId);
  if (!record || !record.originalRecord) return;
  const orig = record.originalRecord;

  if (fieldType === "sbd") {
    await window.updateManualField(recordId, "sbd", 0, 0, orig.sbd);
  } else if (fieldType === "made") {
    await window.updateManualField(recordId, "made", 0, 0, orig.made);
  } else if (fieldType === "p1") {
    await window.updateManualField(recordId, "p1", qIdxOrKey, 0, orig.part1_answers[qIdxOrKey] || "");
  } else if (fieldType === "p2") {
    const qKey = String(qIdxOrKey);
    const val = (orig.part2_answers && orig.part2_answers[qKey]) ? (orig.part2_answers[qKey][subIdx] || "") : "";
    await window.updateManualField(recordId, "p2", qKey, subIdx, val);
  } else if (fieldType === "p3") {
    await window.updateManualField(recordId, "p3", qIdxOrKey, 0, orig.part3_answers[qIdxOrKey] || "");
  }
};

window.restoreAllOriginalFields = async function restoreAllOriginalFields(recordId) {
  const record = window.appState.data.results.find(r => r.id === recordId);
  if (!record || !record.originalRecord) return;

  const orig = record.originalRecord;
  record.sbd = orig.sbd;
  record.studentName = window.appState.findStudentName(record.sbd);
  record.made = orig.made;
  record.part1_answers = [...(orig.part1_answers || [])];
  record.part2_answers = JSON.parse(JSON.stringify(orig.part2_answers || {}));
  record.part3_answers = [...(orig.part3_answers || [])];

  const overrides = computeManualOverrides(record);
  const exam = window.appState.data.exams.find(e => e.id === record.examId) || window.appState.getCurrentExam();
  await window.omrEngine.regradeRecordWithEdits(record, exam, overrides);

  window.appState.save();
  updateResultModalHeaderAndImage(record);
  renderManualReviewEditor(record);
  window.renderResultsTable && window.renderResultsTable();
};

window.closeResultModal = function closeResultModal() {
  const modal = document.getElementById("resultModal");
  if (modal) modal.classList.add("hidden");
};

// =========================================================================
// === XUẤT KẾT QUẢ 3 CHẾ ĐỘ CHUẨN APP QM (`QuizDetailActivity`) ===
// =========================================================================

window.openExportModal = function openExportModal() {
  const modal = document.getElementById("exportModal");
  if (modal) modal.classList.remove("hidden");
};

window.closeExportModal = function closeExportModal() {
  const modal = document.getElementById("exportModal");
  if (modal) modal.classList.add("hidden");
};

function buildExportWorksheets(exam, cls, results) {
  // 1. Sheet Kết quả Điểm
  const summaryRows = [
    ["BẢNG KẾT QUẢ ĐIỂM CHẤM THI TRẮC NGHIỆM - QMATH 2025"],
    [`Bài kiểm tra: ${exam.name}`, "", `Loại phiếu: ${exam.sheet_type}`, "", `Lớp: ${cls.name}`, "", `Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}`],
    [],
    ["STT", "Số Báo Danh", "Họ và Tên Học Sinh", "Mã Đề", "Điểm P.I", "Điểm P.II", "Điểm P.III", "TỔNG ĐIỂM", "Xếp Loại", "Trạng Thái Chỉnh Sửa", "Thời Gian Chấm"]
  ];

  results.forEach((r, idx) => {
    const maxS = r.max_possible_score || 10;
    const ratio = r.total_score / maxS;
    let rank = "Kém";
    if (ratio >= 0.9) rank = "Xuất sắc";
    else if (ratio >= 0.8) rank = "Giỏi";
    else if (ratio >= 0.65) rank = "Khá";
    else if (ratio >= 0.5) rank = "Trung bình";
    else if (ratio >= 0.35) rank = "Yếu";

    const modNote = (r.manualOverrides && r.manualOverrides.hasAnyEdit)
      ? `Đã sửa thủ công (${r.manualOverrides.editCount} vị trí)`
      : "Bản gốc máy chấm";

    summaryRows.push([
      idx + 1, r.sbd, r.studentName, r.made,
      r.part1_score, r.part2_score, r.part3_score, r.total_score,
      rank, modNote, r.timestamp
    ]);
  });

  // 2. Sheet Kết quả Lựa chọn
  const choiceHeaders = ["STT", "SBD", "Họ Tên", "Mã Đề", "Tổng Điểm"];
  for (let i = 1; i <= exam.config.p1_num; i++) choiceHeaders.push(`P1_C${i}`);
  for (let i = 1; i <= exam.config.p2_num; i++) {
    choiceHeaders.push(`P2_C${i}_a`, `P2_C${i}_b`, `P2_C${i}_c`, `P2_C${i}_d`);
  }
  for (let i = 1; i <= exam.config.p3_num; i++) choiceHeaders.push(`P3_C${i}`);

  const choiceRows = [choiceHeaders];
  results.forEach((r, idx) => {
    const row = [idx + 1, r.sbd, r.studentName, r.made, r.total_score];
    for (let i = 0; i < exam.config.p1_num; i++) row.push(r.part1_answers[i] || "");
    for (let i = 1; i <= exam.config.p2_num; i++) {
      const subs = r.part2_answers[String(i)] || ["", "", "", ""];
      row.push(subs[0] || "", subs[1] || "", subs[2] || "", subs[3] || "");
    }
    for (let i = 0; i < exam.config.p3_num; i++) row.push(r.part3_answers[i] || "");
    choiceRows.push(row);
  });

  // 3. Sheet Kết quả Đúng/Sai (Ma trận 1/0)
  const matrixHeaders = [...choiceHeaders];
  const matrixRows = [matrixHeaders];
  results.forEach((r, idx) => {
    const key = exam.answerKeys[r.made] || exam.answerKeys[Object.keys(exam.answerKeys)[0]] || { part1: [], part2: {}, part3: [] };
    const row = [idx + 1, r.sbd, r.studentName, r.made, r.total_score];

    for (let i = 0; i < exam.config.p1_num; i++) {
      const isOk = r.part1_answers[i] && key.part1[i] && r.part1_answers[i] === key.part1[i];
      row.push(isOk ? 1 : 0);
    }
    for (let i = 1; i <= exam.config.p2_num; i++) {
      const sSubs = r.part2_answers[String(i)] || ["", "", "", ""];
      const kSubs = (key.part2 && key.part2[String(i)]) || ["", "", "", ""];
      for (let s = 0; s < 4; s++) {
        row.push(sSubs[s] && kSubs[s] && sSubs[s] === kSubs[s] ? 1 : 0);
      }
    }
    for (let i = 0; i < exam.config.p3_num; i++) {
      const sNorm = window.omrEngine.normalizeNumber(r.part3_answers[i]);
      const kNorm = window.omrEngine.normalizeNumber(key.part3 ? key.part3[i] : "");
      row.push(sNorm && kNorm && sNorm === kNorm ? 1 : 0);
    }
    matrixRows.push(row);
  });

  return { summaryRows, choiceRows, matrixRows };
}

window.exportResultsByMode = function exportResultsByMode(mode) {
  if (typeof XLSX === "undefined") {
    alert("Thư viện SheetJS chưa sẵn sàng!");
    return;
  }
  const exam = window.appState.getCurrentExam();
  const cls = window.appState.getCurrentClass();
  const results = window.appState.data.results.filter(r => r.examId === exam.id);

  if (results.length === 0) {
    alert("Chưa có bài chấm nào trong bài kiểm tra này để xuất kết quả!");
    return;
  }

  const { summaryRows, choiceRows, matrixRows } = buildExportWorksheets(exam, cls, results);
  const wb = XLSX.utils.book_new();
  const safeName = exam.name.replace(/[^a-zA-Z0-9]/g, "_");

  if (mode === "scores") {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summaryRows), "Ket_Qua_Diem");
    XLSX.writeFile(wb, `Ket_Qua_Diem_${safeName}.xlsx`);
  } else if (mode === "choices") {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(choiceRows), "Ket_Qua_Lua_Chon");
    XLSX.writeFile(wb, `Ket_Qua_Lua_Chon_${safeName}.xlsx`);
  } else if (mode === "matrix") {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(matrixRows), "Ket_Qua_Dung_Sai");
    XLSX.writeFile(wb, `Ket_Qua_Dung_Sai_${safeName}.xlsx`);
  }
  window.closeExportModal();
};

window.exportResultsToExcel = function exportResultsToExcel() {
  if (typeof XLSX === "undefined") {
    alert("Thư viện SheetJS chưa sẵn sàng!");
    return;
  }
  const exam = window.appState.getCurrentExam();
  const cls = window.appState.getCurrentClass();
  const results = window.appState.data.results.filter(r => r.examId === exam.id);

  if (results.length === 0) {
    alert("Chưa có kết quả nào để xuất Excel!");
    return;
  }

  const { summaryRows, choiceRows, matrixRows } = buildExportWorksheets(exam, cls, results);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summaryRows), "1_Bang_Diem");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(choiceRows), "2_Lua_Chon_Chi_Tiet");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(matrixRows), "3_Ma_Tran_Dung_Sai");

  const filename = `Bao_Cao_Cham_Thi_${exam.name.replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`;
  XLSX.writeFile(wb, filename);
  window.closeExportModal();
};

// =========================================================================
// === THỐNG KÊ PHỔ ĐIỂM & PHÂN TÍCH TỪNG CÂU HỎI (`ReportActivity`) ===
// =========================================================================

window.renderStatsReport = function renderStatsReport() {
  const container = document.getElementById("statsReportContainer");
  if (!container) return;

  const exam = window.appState.getCurrentExam();
  const results = window.appState.data.results.filter(r => r.examId === exam.id);

  if (results.length === 0) {
    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-xl p-10 text-center border border-slate-200 dark:border-slate-800">
        <p class="text-sm text-slate-500 dark:text-slate-400">Chưa có bài chấm nào trong bài kiểm tra này. Hãy chấm ít nhất 1 phiếu để xem biểu đồ thống kê & phân tích câu hỏi!</p>
        <button onclick="window.switchTab('scan')" class="btn-primary mt-3 py-2 px-4 rounded-xl text-xs font-bold">📷 Đi tới Chấm bài</button>
      </div>
    `;
    return;
  }

  const scores = results.map(r => r.total_score);
  const n = scores.length;
  const mean = scores.reduce((a, b) => a + b, 0) / n;
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  const passCount = scores.filter(s => s >= 5.0).length;
  const goodCount = scores.filter(s => s >= 8.0).length;

  // Phổ điểm 10 khoảng: [0-1), [1-2), ..., [9-10]
  const bins = Array(10).fill(0);
  scores.forEach(s => {
    const idx = Math.min(9, Math.max(0, Math.floor(s)));
    bins[idx]++;
  });
  const maxBin = Math.max(1, ...bins);

  let html = `
    <!-- Thẻ chỉ số tổng hợp -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
      <div class="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-slate-500 dark:text-slate-400">Tổng số bài</span>
        <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">${n}</div>
      </div>
      <div class="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-slate-500 dark:text-slate-400">Điểm trung bình</span>
        <div class="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">${mean.toFixed(2)}</div>
      </div>
      <div class="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-slate-500 dark:text-slate-400">Cao nhất / Thấp nhất</span>
        <div class="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">${max.toFixed(2)} / ${min.toFixed(2)}</div>
      </div>
      <div class="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-slate-500 dark:text-slate-400">Độ lệch chuẩn</span>
        <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">${stdDev.toFixed(2)}</div>
      </div>
      <div class="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-slate-500 dark:text-slate-400">Tỷ lệ Đạt (≥ 5.0)</span>
        <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">${Math.round((passCount / n) * 100)}%</div>
      </div>
      <div class="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-slate-500 dark:text-slate-400">Tỷ lệ Giỏi (≥ 8.0)</span>
        <div class="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">${Math.round((goodCount / n) * 100)}%</div>
      </div>
    </div>

    <!-- Biểu đồ Phổ điểm -->
    <div class="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-4">📊 Biểu Đồ Phân Phối Phổ Điểm</h3>
      <div class="grid grid-cols-10 gap-2 items-end h-44 pt-6 px-2 border-b border-slate-200 dark:border-slate-800">
        ${bins.map((count, idx) => {
          const pct = Math.round((count / maxBin) * 100);
          const label = idx === 9 ? "9-10" : `${idx}-${idx + 1}`;
          return `
            <div class="flex flex-col items-center h-full justify-end">
              <span class="text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">${count > 0 ? count : ""}</span>
              <div class="w-full max-w-[34px] rounded-t-md bg-blue-600 dark:bg-blue-500 transition-all" style="height: ${Math.max(4, pct)}%;"></div>
              <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1.5">${label}</span>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // Phân tích tỷ lệ làm đúng từng câu hỏi Phần I
  const p1Num = exam.config.p1_num || 0;
  if (p1Num > 0) {
    html += `
      <div class="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-3">🎯 Phân Tích Tỷ Lệ Làm Đúng Từng Câu (Phần I)</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
    `;

    for (let q = 0; q < p1Num; q++) {
      let c = 0;
      results.forEach(r => {
        const k = exam.answerKeys[r.made] || exam.answerKeys[Object.keys(exam.answerKeys)[0]];
        if (k && k.part1 && r.part1_answers[q] === k.part1[q]) c++;
      });
      const rate = Math.round((c / n) * 100);
      const barColor = rate >= 70 ? "bg-emerald-500" : (rate >= 40 ? "bg-amber-500" : "bg-rose-500");

      html += `
        <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="font-bold font-mono">Câu ${q + 1}</span>
            <span class="font-bold ${rate < 40 ? "text-rose-600" : "text-slate-700 dark:text-slate-300"}">${c}/${n} bài (${rate}%)</span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div class="h-full ${barColor}" style="width: ${rate}%;"></div>
          </div>
        </div>
      `;
    }
    html += `</div></div>`;
  }

  container.innerHTML = html;
};

// =========================================================================
// === REQUIREMENT 3: CÀI ĐẶT CHUNG (GENERAL SETTINGS) ===
// =========================================================================

window.loadSettingsToUI = function loadSettingsToUI() {
  const s = (window.appState && window.appState.data.settings) || defaultSettings;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  const setChk = (id, val) => { const el = document.getElementById(id); if (el) el.checked = Boolean(val); };

  setVal("settingScanSpeed", s.scanSpeed || "normal");
  setVal("settingSensitivity", s.sensitivity || "normal");
  setChk("settingShowAnchors", s.showAnchors !== false);
  setChk("settingViewScoreImmediately", s.viewScoreImmediately !== false);
  setChk("settingSoundEnabled", s.soundEnabled !== false);
  setChk("settingVibrationEnabled", s.vibrationEnabled !== false);
  setChk("settingWarnNoKey", s.warnNoKey !== false);
  setChk("settingWarnDoubleOrBlank", s.warnDoubleOrBlank !== false);
  setVal("settingScoreRounding", s.scoreRounding || "0.01");
};

window.saveSettingsFromUI = function saveSettingsFromUI() {
  const getVal = id => document.getElementById(id)?.value;
  const getChk = id => Boolean(document.getElementById(id)?.checked);

  window.appState.data.settings = {
    scanSpeed: getVal("settingScanSpeed") || "normal",
    sensitivity: getVal("settingSensitivity") || "normal",
    showAnchors: getChk("settingShowAnchors"),
    viewScoreImmediately: getChk("settingViewScoreImmediately"),
    soundEnabled: getChk("settingSoundEnabled"),
    vibrationEnabled: getChk("settingVibrationEnabled"),
    warnNoKey: getChk("settingWarnNoKey"),
    warnDoubleOrBlank: getChk("settingWarnDoubleOrBlank"),
    warnDuplicateSbd: true,
    scoreRounding: getVal("settingScoreRounding") || "0.01"
  };

  window.appState.save();
};

window.resetDefaultSettings = function resetDefaultSettings() {
  if (confirm("Khôi phục toàn bộ Cài đặt chung về mặc định chuẩn QM?")) {
    window.appState.data.settings = { ...defaultSettings };
    window.appState.save();
    window.loadSettingsToUI();
    playBeep(true);
  }
};

window.exportBackupJson = function exportBackupJson() {
  const dataStr = JSON.stringify(window.appState.data, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `QMATH_Backup_${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.handleImportBackupJson = function handleImportBackupJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && Array.isArray(parsed.exams)) {
        window.appState.data = parsed;
        window.appState.save();
        window.updateExamSelect();
        window.renderExamHub();
        window.renderVisualAnswerSheet();
        window.renderResultsTable();
        window.loadSettingsToUI();
        alert("Đã khôi phục dữ liệu thành công!");
      } else {
        alert("File sao lưu không hợp lệ!");
      }
    } catch (err) {
      alert("Lỗi khi đọc file sao lưu JSON!");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
};

// =========================================================================
// === BÀI ĐÃ CHẤM (BẢNG DỮ LIỆU & THƯ VIỆN ẢNH PHIẾU) ===
// =========================================================================

window.setResultsViewMode = function setResultsViewMode(mode) {
  window.appState.data.resultsViewMode = mode;
  window.appState.save();

  const btnTable = document.getElementById("btnViewModeTable");
  const btnGallery = document.getElementById("btnViewModeGallery");
  const tableWrap = document.getElementById("resultsTableWrap");
  const galleryWrap = document.getElementById("resultsGalleryWrap");

  if (mode === "gallery") {
    if (btnTable) btnTable.className = "btn-secondary py-1.5 px-2.5 rounded-lg text-xs";
    if (btnGallery) btnGallery.className = "btn-primary py-1.5 px-2.5 rounded-lg text-xs";
    if (tableWrap) tableWrap.classList.add("hidden");
    if (galleryWrap) galleryWrap.classList.remove("hidden");
  } else {
    if (btnTable) btnTable.className = "btn-primary py-1.5 px-2.5 rounded-lg text-xs";
    if (btnGallery) btnGallery.className = "btn-secondary py-1.5 px-2.5 rounded-lg text-xs";
    if (tableWrap) tableWrap.classList.remove("hidden");
    if (galleryWrap) galleryWrap.classList.add("hidden");
  }
  window.renderResultsTable();
};

window.renderResultsTable = function renderResultsTable() {
  const exam = window.appState.getCurrentExam();
  if (!exam) return;

  const allExamResults = window.appState.data.results.filter(r => r.examId === exam.id);
  const searchVal = (document.getElementById("searchResultInput")?.value || "").trim().toLowerCase();
  const filterMode = document.getElementById("filterResultSelect")?.value || "all";

  const results = allExamResults.filter(r => {
    if (searchVal) {
      const matchSbd = (r.sbd || "").toLowerCase().includes(searchVal);
      const matchName = (r.studentName || "").toLowerCase().includes(searchVal);
      const matchMade = (r.made || "").toLowerCase().includes(searchVal);
      if (!matchSbd && !matchName && !matchMade) return false;
    }
    if (filterMode === "modified") {
      return Boolean(r.manualOverrides && r.manualOverrides.hasAnyEdit);
    }
    if (filterMode === "warning") {
      return (r.double_count > 0 || r.blank_count > 0 || r.status !== "OK");
    }
    return true;
  });

  const tbody = document.getElementById("resultsTableBody");
  const galleryWrap = document.getElementById("resultsGalleryWrap");
  const statsContainer = document.getElementById("resultsStats");
  if (!tbody) return;

  if (allExamResults.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="py-10 text-center text-slate-400">Chưa có bài thi nào được chấm trong bài kiểm tra này. Hãy bấm sang mục "Chấm bài" để bắt đầu!</td></tr>`;
    if (galleryWrap) galleryWrap.innerHTML = `<div class="col-span-full py-10 text-center text-slate-400 text-xs">Chưa có ảnh phiếu chấm nào.</div>`;
    if (statsContainer) statsContainer.innerHTML = "";
    return;
  }

  const scores = allExamResults.map(r => r.total_score);
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  const max = Math.max(...scores).toFixed(2);
  const modifiedCount = allExamResults.filter(r => r.manualOverrides && r.manualOverrides.hasAnyEdit).length;

  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p class="text-xs text-slate-500 dark:text-slate-400">Số bài đã chấm</p>
          <p class="text-xl font-bold text-slate-900 dark:text-white mt-0.5">${allExamResults.length} bài</p>
        </div>
        <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p class="text-xs text-slate-500 dark:text-slate-400">Điểm trung bình</p>
          <p class="text-xl font-bold text-blue-600 dark:text-blue-400 mt-0.5">${avg} đ</p>
        </div>
        <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p class="text-xs text-slate-500 dark:text-slate-400">Điểm cao nhất</p>
          <p class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">${max} đ</p>
        </div>
        <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p class="text-xs text-slate-500 dark:text-slate-400">Bài có chỉnh sửa thủ công</p>
          <p class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">${modifiedCount} bài</p>
        </div>
      </div>
    `;
  }

  let tableHtml = "";
  let galleryHtml = "";

  results.forEach((r, idx) => {
    const isMod = Boolean(r.manualOverrides && r.manualOverrides.hasAnyEdit);
    const editCount = isMod ? r.manualOverrides.editCount : 0;

    let statusBadges = "";
    if (isMod) {
      statusBadges += `<span class="modified-badge mr-1">✎ Đã sửa (${editCount})</span>`;
    }
    if (r.double_count > 0) {
      statusBadges += `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 mr-1">Tô đúp (${r.double_count})</span>`;
    }
    if (!statusBadges) {
      statusBadges = `<span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">✓ Chuẩn</span>`;
    }

    tableHtml += `
      <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${isMod ? "bg-amber-50/40 dark:bg-amber-950/20" : ""}">
        <td class="py-2.5 px-3 text-slate-400">${idx + 1}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white">${r.sbd}</td>
        <td class="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">${r.studentName}</td>
        <td class="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-300">${r.made}</td>
        <td class="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-300">${r.part1_score.toFixed(2)}</td>
        <td class="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-300">${r.part2_score.toFixed(2)}</td>
        <td class="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-300">${r.part3_score.toFixed(2)}</td>
        <td class="py-2.5 px-3 text-right font-mono font-bold text-sm text-blue-600 dark:text-blue-400">${r.total_score.toFixed(2)}</td>
        <td class="py-2.5 px-3 text-center">${statusBadges}</td>
        <td class="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
          <button onclick="window.previewGradedImage('${r.id}')" class="btn-secondary px-2.5 py-1 text-xs rounded-lg">🔍 Xem & Sửa</button>
          <button onclick="window.deleteSingleResult('${r.id}')" class="btn-danger px-2 py-1 text-xs rounded-lg">Xóa</button>
        </td>
      </tr>
    `;

    galleryHtml += `
      <div onclick="window.previewGradedImage('${r.id}')" class="cursor-pointer bg-white dark:bg-slate-900 rounded-xl border ${isMod ? "border-amber-400" : "border-slate-200 dark:border-slate-800"} p-3 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div>
          <div class="relative h-52 bg-slate-950 rounded-lg overflow-hidden mb-2.5 flex items-center justify-center">
            <img src="${r.annotatedDataUrl}" alt="SBD ${r.sbd}" class="h-full object-contain">
            <span class="absolute top-2 right-2 px-2 py-0.5 rounded bg-blue-600 text-white font-extrabold text-xs shadow">${r.total_score.toFixed(2)}đ</span>
            ${isMod ? `<span class="absolute top-2 left-2 modified-badge shadow">✎ Đã sửa (${editCount})</span>` : ""}
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="font-mono font-bold text-slate-900 dark:text-white">SBD: ${r.sbd}</span>
            <span class="font-mono text-slate-500 dark:text-slate-400">Mã: ${r.made}</span>
          </div>
          <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate mt-0.5">${r.studentName}</p>
        </div>
        <div class="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>P1:${r.part1_score} • P2:${r.part2_score} • P3:${r.part3_score}</span>
          <span class="text-blue-600 dark:text-blue-400 font-bold">Xem & Sửa ›</span>
        </div>
      </div>
    `;
  });

  tbody.innerHTML = tableHtml;
  if (galleryWrap) galleryWrap.innerHTML = galleryHtml;
};

window.previewGradedImage = function previewGradedImage(id) {
  const r = window.appState.data.results.find(item => item.id === id);
  if (r) window.showResultModal(r);
};

window.deleteSingleResult = function deleteSingleResult(id) {
  if (confirm("Bạn có chắc chắn muốn xóa kết quả bài thi này?")) {
    window.appState.deleteResult(id);
    window.renderResultsTable();
    window.renderExamHub();
  }
};

window.clearAllResults = function clearAllResults() {
  if (confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa toàn bộ kết quả chấm của bài kiểm tra này?")) {
    window.appState.clearResults();
    window.renderResultsTable();
    window.renderExamHub();
  }
};

// =========================================================================
// === QUẢN LÝ LỚP HỌC, KHO MẪU PHIẾU & ĐIỀU HƯỚNG TABS ===
// =========================================================================

window.renderTemplateGallery = function renderTemplateGallery() {
  const container = document.getElementById("templateGalleryContainer");
  if (!container || !window.SHEET_TYPES) return;

  let html = "";
  Object.entries(window.SHEET_TYPES).forEach(([key, item]) => {
    html += `
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div onclick="window.previewSelectedSheetTemplate('${key}')" class="cursor-pointer h-44 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3 border border-slate-100 dark:border-slate-700">
            <img src="samples/${item.file}" alt="${item.name}" class="h-full object-contain mx-auto shadow-sm">
          </div>
          <h4 class="font-bold text-sm text-slate-900 dark:text-white leading-snug">${item.name}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">${item.desc}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <button onclick="window.previewSelectedSheetTemplate('${key}')" class="btn-secondary py-1.5 px-2.5 rounded-lg text-xs">
            🔍 Xem rõ
          </button>
          <a href="samples/${item.file}" download="${item.file}" class="btn-primary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition">
            <span>⬇️ Tải phiếu in</span>
          </a>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
};

window.switchTab = function switchTab(tabName) {
  window.appState.data.currentTab = tabName;
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));

  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
  const targetBtn = document.getElementById(`tabBtn_${tabName}`);
  if (targetBtn) targetBtn.classList.add("active");

  document.querySelectorAll(".mobile-nav-item").forEach(el => el.classList.remove("active"));
  const mobileBtn = document.getElementById(`mobileNavBtn_${tabName}`);
  if (mobileBtn) mobileBtn.classList.add("active");

  const targetContent = document.getElementById(`tabContent_${tabName}`);
  if (targetContent) targetContent.classList.remove("hidden");

  if (tabName === "scan") {
    initCamera();
  } else {
    stopCameraAndLoop();
  }

  if (tabName === "hub") {
    window.renderExamHub && window.renderExamHub();
  } else if (tabName === "exams") {
    window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
  } else if (tabName === "results") {
    window.renderResultsTable && window.renderResultsTable();
  } else if (tabName === "stats") {
    window.renderStatsReport && window.renderStatsReport();
  } else if (tabName === "classes") {
    window.renderStudentsList && window.renderStudentsList();
  } else if (tabName === "templates") {
    window.renderTemplateGallery && window.renderTemplateGallery();
  } else if (tabName === "settings") {
    window.loadSettingsToUI && window.loadSettingsToUI();
  }
};

window.updateExamSelect = function updateExamSelect() {
  const select = document.getElementById("headerExamSelect");
  if (!select) return;
  select.innerHTML = window.appState.data.exams.map(e => `
    <option value="${e.id}" ${e.id === window.appState.data.currentExamId ? "selected" : ""}>
      ${e.name}
    </option>
  `).join("");
};

window.onExamChange = function onExamChange(examId) {
  window.appState.data.currentExamId = examId;
  const exam = window.appState.getCurrentExam();
  if (exam && exam.answerKeys) {
    window.appState.data.activeMade = Object.keys(exam.answerKeys)[0] || "101";
  }
  window.appState.save();
  window.renderExamHub && window.renderExamHub();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
  window.renderResultsTable && window.renderResultsTable();
  window.renderStatsReport && window.renderStatsReport();
};

window.onSelectActiveClass = function onSelectActiveClass(classId) {
  window.appState.data.currentClassId = classId;
  const exam = window.appState.getCurrentExam();
  if (exam) exam.classId = classId;
  window.appState.save();
  window.renderStudentsList();
  window.renderExamHub();
};

window.createNewClassPrompt = function createNewClassPrompt() {
  const name = prompt("Nhập tên Lớp học mới (VD: Lớp 12A2, Lớp Bồi Dưỡng Toán...):");
  if (!name || !name.trim()) return;
  const newCls = {
    id: "cls_" + Date.now(),
    name: name.trim(),
    students: []
  };
  window.appState.data.classes.push(newCls);
  window.onSelectActiveClass(newCls.id);
};

window.renderStudentsList = function renderStudentsList() {
  const cls = window.appState.getCurrentClass();
  const select = document.getElementById("activeClassSelect");
  if (select) {
    select.innerHTML = window.appState.data.classes.map(c => `
      <option value="${c.id}" ${cls && c.id === cls.id ? "selected" : ""}>${c.name} (${(c.students || []).length} HS)</option>
    `).join("");
  }

  const tbody = document.getElementById("studentsTableBody");
  if (!tbody || !cls) return;

  if (!cls.students || cls.students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="py-8 text-center text-slate-400">Lớp này chưa có danh sách học sinh. Bấm "📋 Dán danh sách HS" để thêm nhanh!</td></tr>`;
    return;
  }

  let html = "";
  cls.students.forEach((s, idx) => {
    html += `
      <tr class="border-b border-slate-100 dark:border-slate-800">
        <td class="py-2 px-3 text-slate-400">${idx + 1}</td>
        <td class="py-2 px-3 font-mono font-bold text-slate-900 dark:text-white">${s.sbd}</td>
        <td class="py-2 px-3 text-slate-800 dark:text-slate-200 font-medium">${s.name}</td>
        <td class="py-2 px-3 text-right">
          <button onclick="window.removeStudent('${s.sbd}')" class="text-xs text-rose-600 hover:underline">Xóa</button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
};

window.removeStudent = function removeStudent(sbd) {
  const cls = window.appState.getCurrentClass();
  cls.students = cls.students.filter(s => s.sbd !== sbd);
  window.appState.save();
  window.renderStudentsList();
};

window.showImportStudentsModal = function showImportStudentsModal() {
  const text = prompt("Dán danh sách học sinh (Mỗi dòng một học sinh: SBD [dấu cách] Họ và Tên):\nVí dụ:\n000101 Nguyễn Văn A\n000102 Trần Thị B");
  if (!text) return;

  const lines = text.trim().split("\n");
  const cls = window.appState.getCurrentClass();
  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      const sbd = parts[0].padStart(6, "0");
      const name = parts.slice(1).join(" ");
      const existing = cls.students.find(s => s.sbd === sbd);
      if (existing) {
        existing.name = name;
      } else {
        cls.students.push({ sbd, name });
      }
    }
  });
  window.appState.save();
  window.renderStudentsList();
  alert("Đã cập nhật danh sách học sinh!");
};

// Khởi chạy khi tài liệu sẵn sàng
window.addEventListener("DOMContentLoaded", () => {
  window.initTheme && window.initTheme();
  window.updateExamSelect && window.updateExamSelect();
  window.loadSettingsToUI && window.loadSettingsToUI();
  window.renderExamHub && window.renderExamHub();
  window.renderStudentsList && window.renderStudentsList();
  window.renderTemplateGallery && window.renderTemplateGallery();
  window.switchTab && window.switchTab(window.appState.data.currentTab || "hub");
});
