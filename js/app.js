/**
 * ỨNG DỤNG QUẢN LÝ VÀ CHẤM THI TRẮC NGHIỆM TRỰC TUYẾN - QMATH OMR 2025
 * Phiên bản v2.2.1 - Tối giản, đồng nhất, phòng thủ lỗi tối đa
 * Bản quyền: QMATH (chamthi.qmath.io.vn)
 */

// BẢNG DANH MỤC ĐẦY ĐỦ 12 MẪU PHIẾU THI TỪ APP GỐC QM
const SHEET_TYPES = {
  "A4_TN2025_BGD_1239": {
    name: "A4 - Chuẩn Bộ GD&ĐT 2025 (1239)",
    desc: "12 câu TN (3.0đ) + 4 câu Đúng/Sai (4.0đ) + 6 câu Trả lời ngắn (3.0đ)",
    file: "a4_tn2025_bgd_1239.png",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
  },
  "A4_TN2025_QM_1239": {
    name: "A4 - Chuẩn QMATH 2025 (1239)",
    desc: "12 câu TN + 4 câu Đ/S + 6 câu TLN (Bản vẽ chuẩn nét cao của QMATH)",
    file: "a4_tn2025_qm_1239.png",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
  },
  "A4_TN2025_TNMK_1239": {
    name: "A4 - Chuẩn TNMaker 2025 (1239)",
    desc: "12 câu TN + 4 câu Đ/S + 6 câu TLN (Tương thích phiếu TNMaker 2025)",
    file: "a4_tn2025_tnmk_1239.jpg",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
  },
  "A4_TN2025_AZOTA": {
    name: "A4 - Chuẩn Azota 2025",
    desc: "Phiếu trả lời trắc nghiệm chuẩn Azota năm học 2025",
    file: "a4_tn2025_azota.png",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
  },
  "A4_TNTL_2025_AZOTA": {
    name: "A4 - Azota Tự Luận & Trắc Nghiệm 2025",
    desc: "Kết hợp phần trắc nghiệm OMR và phần tự luận học sinh viết tay",
    file: "a4_tntl_2025_azota.png",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
  },
  "A5_TN2025_AZOTA": {
    name: "A5 - Chuẩn Azota Khổ Nhỏ",
    desc: "Khổ giấy A5 (1/2 trang A4) nhỏ gọn, tiết kiệm chi phí in ấn",
    file: "a5_tn2025_azota.png",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
  },
  "A4_TN2025_BGD": {
    name: "A4 - Bộ GD&ĐT (40 câu trắc nghiệm)",
    desc: "40 câu trắc nghiệm 4 lựa chọn A, B, C, D (0.25đ/câu = 10.0đ)",
    file: "a4_tn2025_bgd.png",
    p1_num: 40, p2_num: 0, p3_num: 0, p1_score: 0.25, p3_score: 0.0
  },
  "A4_TN2025_QM": {
    name: "A4 - QMATH (40 câu trắc nghiệm)",
    desc: "40 câu trắc nghiệm 4 lựa chọn bản chuẩn hóa QMATH",
    file: "a4_tn2025_qm.png",
    p1_num: 40, p2_num: 0, p3_num: 0, p1_score: 0.25, p3_score: 0.0
  },
  "A4_TN2025_TNMK": {
    name: "A4 - TNMaker (40 câu trắc nghiệm)",
    desc: "40 câu trắc nghiệm 4 lựa chọn chuẩn TNMaker",
    file: "a4_tn2025_tnmk.png",
    p1_num: 40, p2_num: 0, p3_num: 0, p1_score: 0.25, p3_score: 0.0
  },
  "A4_UNT_2025": {
    name: "A4 - Phiếu Ôn Tập & Kiểm Tra (Có SBD)",
    desc: "Dành cho kiểm tra định kỳ 15 phút, 1 tiết trên lớp",
    file: "a4_unt_2025.png",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
  },
  "A4_UNT_NOSBD_2025": {
    name: "A4 - Phiếu Ôn Tập Nhanh (Không cần SBD)",
    desc: "Chỉ ghi tên học sinh, không cần tô 6 số báo danh",
    file: "a4_unt_nosbd_2025.png",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
  },
  "UNT_2025_NGANG": {
    name: "A4 - Phiếu Ôn Tập Khổ Ngang",
    desc: "Khổ ngang thuận tiện cho bài thi kết hợp sơ đồ tư duy",
    file: "unt_2025_ngang.png",
    p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
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
  } catch (e) {
    console.warn("Theme init error:", e);
  }
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

const STORAGE_KEY = "QMATH_OMR_DATA_V4";

const defaultState = {
  currentTab: "scan",
  currentClassId: "cls_12a1",
  currentExamId: "exam_101",
  activeMade: "101",
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
        p1_num: 12, p2_num: 4, p3_num: 6, p1_score: 0.25, p3_score: 0.5
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
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.exams) && parsed.exams.length > 0) {
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
    return this.data.classes.find(c => c.id === this.data.currentClassId) || this.data.classes[0];
  }

  findStudentName(sbd) {
    const cls = this.getCurrentClass();
    if (!cls || !cls.students) return "Chưa có tên";
    const std = cls.students.find(s => s.sbd === sbd || parseInt(s.sbd, 10) === parseInt(sbd, 10));
    return std ? std.name : "Thí sinh tự do";
  }

  addResult(resultItem) {
    const idx = this.data.results.findIndex(r => r.examId === resultItem.examId && r.sbd === resultItem.sbd);
    if (idx >= 0) {
      this.data.results[idx] = resultItem;
    } else {
      this.data.results.unshift(resultItem);
    }
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

// --- ÂM THANH BEEP ---
function playBeep(isSuccess = true) {
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
// === MODAL TẠO & CHỌN LOẠI PHIẾU CHẤM (ĐỊNH NGHĨA TRỰC TIẾP TRÊN WINDOW) ===
// =========================================================================

window.showCreateExamModal = function showCreateExamModal() {
  const modal = document.getElementById("createExamModal");
  if (!modal) return;

  const select = document.getElementById("examSheetTypeSelect");
  if (select && window.SHEET_TYPES) {
    select.innerHTML = Object.entries(window.SHEET_TYPES).map(([k, v]) => `
      <option value="${k}">${v.name} - ${v.desc}</option>
    `).join("");
  }

  const classSelect = document.getElementById("examClassSelect");
  if (classSelect && window.appState) {
    classSelect.innerHTML = window.appState.data.classes.map(c => `
      <option value="${c.id}" ${c.id === window.appState.data.currentClassId ? 'selected' : ''}>${c.name}</option>
    `).join("");
  }

  modal.classList.remove("hidden");
};

window.closeCreateExamModal = function closeCreateExamModal() {
  const modal = document.getElementById("createExamModal");
  if (modal) modal.classList.add("hidden");
};

window.saveNewExam = function saveNewExam() {
  const nameInput = document.getElementById("newExamNameInput");
  const sheetTypeSelect = document.getElementById("examSheetTypeSelect");
  const classSelect = document.getElementById("examClassSelect");

  const name = (nameInput && nameInput.value.trim()) || "Bài thi mới";
  const sheetTypeKey = (sheetTypeSelect && sheetTypeSelect.value) || "A4_TN2025_BGD_1239";
  const classId = (classSelect && classSelect.value) || window.appState.data.currentClassId;

  const sheetDef = window.SHEET_TYPES[sheetTypeKey] || window.SHEET_TYPES["A4_TN2025_BGD_1239"];

  const newExam = {
    id: "exam_" + Date.now(),
    classId: classId,
    name: name,
    sheet_type: sheetTypeKey,
    date: new Date().toISOString().split("T")[0],
    config: {
      p1_num: sheetDef.p1_num,
      p2_num: sheetDef.p2_num,
      p3_num: sheetDef.p3_num,
      p1_score: sheetDef.p1_score,
      p3_score: sheetDef.p3_score
    },
    answerKeys: {
      "101": createDefaultKey(sheetDef)
    }
  };

  window.appState.data.exams.push(newExam);
  window.appState.data.currentExamId = newExam.id;
  window.appState.data.activeMade = "101";
  window.appState.save();

  window.updateExamSelect && window.updateExamSelect();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
  window.closeCreateExamModal();
  alert(`Đã tạo bài thi "${name}" với loại phiếu [${sheetDef.name}]!`);
};

// =========================================================================
// === NẠP ĐÁP ÁN BẰNG EXCEL (.XLSX) ===
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

  const sampleRows = [
    headers,
    ["101", "A", "B", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D", "Đ", "S", "Đ", "S", "Đ", "Đ", "S", "S", "S", "Đ", "Đ", "S", "Đ", "S", "S", "Đ", "1.5", "-2", "0.75", "10", "-3.5", "4"],
    ["102", "B", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D", "A", "S", "Đ", "S", "Đ", "S", "S", "Đ", "Đ", "Đ", "S", "S", "Đ", "S", "Đ", "Đ", "S", "2.5", "-1", "1.25", "15", "-4.5", "6"]
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(sampleRows);
  XLSX.utils.book_append_sheet(wb, ws, "Mau_Dap_An");
  XLSX.writeFile(wb, "Mau_Dap_An_Chuan_BGD_2025.xlsx");
};

// =========================================================================
// === QUÉT & XUẤT MÃ QR ===
// =========================================================================

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
        const code = jsQR(imgData.data, imgData.width, imgData.height, {
          inversionAttempts: "dontInvert"
        });
        if (code && code.data) {
          handleQRDataImport(code.data);
        }
      }
    }, 250);
  } catch (err) {
    console.warn("QR Camera error:", err);
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
      alert(`Đã nạp thành công đáp án Mã Đề ${made} từ mã QR!`);
    } else {
      alert("Định dạng dữ liệu mã QR không hợp lệ!");
    }
  } catch (err) {
    console.error("QR Import error:", err);
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
  const code = prompt("Nhập Mã Đề mới (ví dụ: 103, 104, 201...):");
  if (!code) return;
  const cleanCode = code.trim();
  const exam = window.appState.getCurrentExam();
  if (exam.answerKeys[cleanCode]) {
    alert("Mã đề này đã tồn tại!");
    return;
  }
  exam.answerKeys[cleanCode] = createDefaultKey(exam.config);
  window.appState.data.activeMade = cleanCode;
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
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
  const p1 = Array(config.p1_num || 12).fill("A");
  const p2 = {};
  for (let i = 1; i <= (config.p2_num || 4); i++) {
    p2[String(i)] = ["Đ", "S", "Đ", "S"];
  }
  const p3 = Array(config.p3_num || 6).fill("0");
  return { part1: p1, part2: p2, part3: p3 };
}

window.setPart1Answer = function setPart1Answer(made, qIdx, opt) {
  const exam = window.appState.getCurrentExam();
  if (!exam.answerKeys[made]) return;
  if (exam.answerKeys[made].part1[qIdx] === opt) {
    exam.answerKeys[made].part1[qIdx] = "";
  } else {
    exam.answerKeys[made].part1[qIdx] = opt;
  }
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
};

window.setPart2Answer = function setPart2Answer(made, qKey, subIdx, val) {
  const exam = window.appState.getCurrentExam();
  if (!exam.answerKeys[made]) return;
  if (!exam.answerKeys[made].part2[qKey]) {
    exam.answerKeys[made].part2[qKey] = ["", "", "", ""];
  }
  if (exam.answerKeys[made].part2[qKey][subIdx] === val) {
    exam.answerKeys[made].part2[qKey][subIdx] = "";
  } else {
    exam.answerKeys[made].part2[qKey][subIdx] = val;
  }
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

  if (titleEl) titleEl.innerText = exam.name;
  if (badgeEl) badgeEl.innerText = sheetInfo.name;

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
      <button onclick="window.selectActiveMade('${c}')" class="code-tab-btn ${isActive ? 'active' : ''}">
        MÃ ${c}
      </button>
    `;
  });
  codeSelector.innerHTML = codeTabsHtml;

  const p1Num = exam.config.p1_num || 12;
  const p2Num = exam.config.p2_num || 0;
  const p3Num = exam.config.p3_num || 0;

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
            Phần I: Trắc Nghiệm Nhiều Lựa Chọn (${p1Num} câu)
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
              <button onclick="window.setPart1Answer('${curMade}', ${q}, '${opt}')" class="bubble-choice ${curAns === opt ? 'selected' : ''}">
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
    sheetHtml += `
      <div class="border-t border-slate-100 dark:border-slate-800 pt-4">
        <div class="flex items-center justify-between mb-2.5">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Phần II: Trắc Nghiệm Đúng / Sai (${p2Num} câu - Mỗi câu 4 ý a, b, c, d)
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
                    <button onclick="window.setPart2Answer('${curMade}', '${qKey}', ${sIdx}, 'Đ')" class="bubble-tf ${val === 'Đ' ? 'selected-true' : ''}">
                      Đ
                    </button>
                    <button onclick="window.setPart2Answer('${curMade}', '${qKey}', ${sIdx}, 'S')" class="bubble-tf ${val === 'S' ? 'selected-false' : ''}">
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
            Phần III: Trả Lời Ngắn (${p3Num} câu - Điền số)
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
// === CAMERA & CHẤM BÀI ===
// =========================================================================

let activeStream = null;
let currentFacingMode = "environment";
let autoScanTimer = null;
let isAutoScanActive = false;
let lastGradedSBD = "";
let lastGradedTime = 0;

async function initCamera() {
  const video = document.getElementById("scannerVideo");
  const statusEl = document.getElementById("cameraStatus");
  if (!video) return;

  if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (statusEl) statusEl.innerHTML = `<span class="text-rose-600">Trình duyệt không hỗ trợ mở Camera trực tiếp. Hãy dùng nút 'Tải ảnh từ máy'!</span>`;
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
      statusEl.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-blue-600 mr-1.5 animate-pulse"></span>Camera đang sẵn sàng`;
    }
  } catch (err) {
    console.warn("Camera access failed:", err);
    if (statusEl) {
      statusEl.innerHTML = `<span class="text-rose-600">Không thể mở camera (${err.name || "lỗi quyền"}). Hãy dùng nút "Tải ảnh từ máy"!</span>`;
    }
  }
}

window.switchCamera = function switchCamera() {
  currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
  initCamera();
};

function doGrade(sourceElement) {
  const exam = window.appState.getCurrentExam();
  if (!exam) {
    alert("Vui lòng tạo hoặc chọn một bài thi trước!");
    return;
  }

  try {
    const tStart = performance.now();
    const gradeOutput = window.omrEngine.gradeFromImageSource(sourceElement, exam.config, exam.answerKeys);
    const tEnd = performance.now();
    const durationMs = Math.round(tEnd - tStart);

    const res = gradeOutput.result;
    const studentName = window.appState.findStudentName(res.sbd);

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
      part1_answers: res.part1_answers,
      part2_answers: res.part2_answers,
      part3_answers: res.part3_answers,
      part1_correct: res.part1_correct,
      part3_correct: res.part3_correct,
      status: res.status,
      timestamp: res.timestamp,
      annotatedDataUrl: gradeOutput.annotatedDataUrl,
      durationMs: durationMs
    };

    window.appState.addResult(resultRecord);
    playBeep(true);

    window.showResultModal(resultRecord);
    renderResultsTable();

    if (res.total_score >= 9.0 && typeof confetti === "function") {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }
  } catch (err) {
    console.error("Grading failed:", err);
    playBeep(false);
    alert("Chưa nhận diện được phiếu thi! Vui lòng căn phiếu thi rõ ràng trong khung sáng và thử lại.");
  }
}

window.captureAndGrade = function captureAndGrade() {
  const video = document.getElementById("scannerVideo");
  if (!video || !activeStream) {
    alert("Camera chưa bật hoặc không khả dụng. Hãy dùng nút 'Tải ảnh từ máy'!");
    return;
  }
  doGrade(video);
};

window.toggleAutoScan = function toggleAutoScan() {
  isAutoScanActive = !isAutoScanActive;
  const btn = document.getElementById("btnAutoScan");

  if (isAutoScanActive) {
    if (btn) {
      btn.classList.remove("bg-slate-800", "text-slate-300");
      btn.classList.add("bg-blue-600", "text-white");
      btn.innerHTML = `⚡ Tự động: BẬT`;
    }

    autoScanTimer = setInterval(() => {
      const video = document.getElementById("scannerVideo");
      if (!video || video.readyState !== 4) return;

      try {
        const exam = window.appState.getCurrentExam();
        const output = window.omrEngine.gradeFromImageSource(video, exam.config, exam.answerKeys);
        const res = output.result;

        const now = Date.now();
        if (res.sbd && res.sbd !== "000000" && (res.sbd !== lastGradedSBD || now - lastGradedTime > 3000)) {
          lastGradedSBD = res.sbd;
          lastGradedTime = now;

          const studentName = window.appState.findStudentName(res.sbd);
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
            part1_answers: res.part1_answers,
            part2_answers: res.part2_answers,
            part3_answers: res.part3_answers,
            part1_correct: res.part1_correct,
            part3_correct: res.part3_correct,
            status: res.status,
            timestamp: res.timestamp,
            annotatedDataUrl: output.annotatedDataUrl
          };

          window.appState.addResult(resultRecord);
          playBeep(true);
          renderResultsTable();
        }
      } catch (e) {}
    }, 1500);
  } else {
    clearInterval(autoScanTimer);
    if (btn) {
      btn.classList.remove("bg-blue-600", "text-white");
      btn.classList.add("bg-slate-800", "text-slate-300");
      btn.innerHTML = `⚡ Tự động: TẮT`;
    }
  }
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

window.showResultModal = function showResultModal(record) {
  const modal = document.getElementById("resultModal");
  if (!modal) return;

  const sbdEl = document.getElementById("modalSbd");
  const nameEl = document.getElementById("modalStudentName");
  const madeEl = document.getElementById("modalMade");
  const scoreEl = document.getElementById("modalTotalScore");
  const p1El = document.getElementById("modalP1Score");
  const p2El = document.getElementById("modalP2Score");
  const p3El = document.getElementById("modalP3Score");
  const imgEl = document.getElementById("modalPreviewImg");

  if (sbdEl) sbdEl.innerText = record.sbd;
  if (nameEl) nameEl.innerText = record.studentName;
  if (madeEl) madeEl.innerText = record.made;

  if (scoreEl) {
    scoreEl.innerText = record.total_score.toFixed(2);
    scoreEl.className = `text-4xl font-extrabold ${record.total_score >= 5.0 ? 'text-blue-700' : 'text-slate-800'}`;
  }

  if (p1El) p1El.innerText = record.part1_score.toFixed(2) + " đ";
  if (p2El) p2El.innerText = record.part2_score.toFixed(2) + " đ";
  if (p3El) p3El.innerText = record.part3_score.toFixed(2) + " đ";

  if (imgEl) imgEl.src = record.annotatedDataUrl;
  modal.classList.remove("hidden");
};

window.closeResultModal = function closeResultModal() {
  const modal = document.getElementById("resultModal");
  if (modal) modal.classList.add("hidden");
};

// =========================================================================
// === XUẤT FILE EXCEL & QUẢN LÝ KẾT QUẢ ===
// =========================================================================

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

  const summaryRows = [
    ["BẢNG TỔNG HỢP KẾT QUẢ CHẤM THI TRẮC NGHIỆM - CHUẨN BỘ GIÁO DỤC 2025"],
    [`Bài thi: ${exam.name}`, "", `Loại phiếu: ${window.SHEET_TYPES[exam.sheet_type]?.name || exam.sheet_type}`, "", `Lớp: ${cls.name}`, "", `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`],
    [],
    ["STT", "Số Báo Danh", "Họ và Tên Học Sinh", "Mã Đề", "Điểm P.I", "Điểm P.II", "Điểm P.III", "TỔNG ĐIỂM", "Xếp Loại", "Thời Gian Chấm"]
  ];

  results.forEach((r, idx) => {
    let rank = "Kém";
    if (r.total_score >= 9.0) rank = "Xuất sắc";
    else if (r.total_score >= 8.0) rank = "Giỏi";
    else if (r.total_score >= 6.5) rank = "Khá";
    else if (r.total_score >= 5.0) rank = "Trung bình";
    else if (r.total_score >= 3.5) rank = "Yếu";

    summaryRows.push([
      idx + 1, r.sbd, r.studentName, r.made,
      r.part1_score, r.part2_score, r.part3_score, r.total_score,
      rank, r.timestamp
    ]);
  });

  const scores = results.map(r => r.total_score);
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  const max = Math.max(...scores).toFixed(2);
  const min = Math.min(...scores).toFixed(2);

  summaryRows.push([]);
  summaryRows.push(["THỐNG KÊ CHUNG", `Tổng số bài: ${results.length}`, `Điểm TB: ${avg}`, `Điểm cao nhất: ${max}`, `Điểm thấp nhất: ${min}`]);

  const wb = XLSX.utils.book_new();
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);

  const detailHeaders = ["STT", "SBD", "Họ Tên", "Mã Đề"];
  for (let i = 1; i <= exam.config.p1_num; i++) detailHeaders.push(`P1_C${i}`);
  for (let i = 1; i <= exam.config.p2_num; i++) {
    detailHeaders.push(`P2_C${i}_a`, `P2_C${i}_b`, `P2_C${i}_c`, `P2_C${i}_d`);
  }
  for (let i = 1; i <= exam.config.p3_num; i++) detailHeaders.push(`P3_C${i}`);
  detailHeaders.push("TỔNG ĐIỂM");

  const detailRows = [detailHeaders];
  results.forEach((r, idx) => {
    const row = [idx + 1, r.sbd, r.studentName, r.made];
    for (let i = 0; i < exam.config.p1_num; i++) row.push(r.part1_answers[i] || "");
    for (let i = 1; i <= exam.config.p2_num; i++) {
      const subs = r.part2_answers[String(i)] || ["", "", "", ""];
      row.push(subs[0] || "", subs[1] || "", subs[2] || "", subs[3] || "");
    }
    for (let i = 0; i < exam.config.p3_num; i++) row.push(r.part3_answers[i] || "");
    row.push(r.total_score);
    detailRows.push(row);
  });

  const wsDetails = XLSX.utils.aoa_to_sheet(detailRows);

  XLSX.utils.book_append_sheet(wb, wsSummary, "Bang_Diem_Tong_Hop");
  XLSX.utils.book_append_sheet(wb, wsDetails, "Chi_Tiet_Cau_Tra_Loi");

  const filename = `Bang_Diem_${exam.name.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(wb, filename);
};

window.renderTemplateGallery = function renderTemplateGallery() {
  const container = document.getElementById("templateGalleryContainer");
  if (!container || !window.SHEET_TYPES) return;

  let html = "";
  Object.entries(window.SHEET_TYPES).forEach(([key, item]) => {
    html += `
      <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div class="h-44 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3 border border-slate-100">
            <img src="samples/${item.file}" alt="${item.name}" class="h-full object-contain mx-auto shadow-sm">
          </div>
          <h4 class="font-bold text-sm text-slate-900 leading-snug">${item.name}</h4>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">${item.desc}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] font-mono font-medium text-slate-400">${item.file.endsWith('.jpg') ? 'JPG' : 'PNG'}</span>
          <a href="samples/${item.file}" download="${item.file}" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center space-x-1 transition">
            <span>Tải phiếu in</span>
          </a>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
};

// =========================================================================
// === ĐIỀU HƯỚNG TABS & MOBILE BOTTOM BAR ===
// =========================================================================

window.switchTab = function switchTab(tabName) {
  window.appState.data.currentTab = tabName;
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));

  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
  const targetBtn = document.getElementById(`tabBtn_${tabName}`);
  if (targetBtn) {
    targetBtn.classList.add("active");
  }

  document.querySelectorAll(".mobile-nav-item").forEach(el => el.classList.remove("active"));
  const mobileBtn = document.getElementById(`mobileNavBtn_${tabName}`);
  if (mobileBtn) mobileBtn.classList.add("active");

  const targetContent = document.getElementById(`tabContent_${tabName}`);
  if (targetContent) targetContent.classList.remove("hidden");

  if (tabName === "scan") {
    initCamera();
  } else if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
    activeStream = null;
  }

  if (tabName === "exams") {
    window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
  } else if (tabName === "results") {
    renderResultsTable();
  } else if (tabName === "templates") {
    window.renderTemplateGallery && window.renderTemplateGallery();
  }
};

function renderResultsTable() {
  const exam = window.appState.getCurrentExam();
  const results = window.appState.data.results.filter(r => r.examId === exam.id);
  const tbody = document.getElementById("resultsTableBody");
  const statsContainer = document.getElementById("resultsStats");
  if (!tbody) return;

  if (results.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="py-10 text-center text-slate-400">Chưa có bài thi nào được chấm trong bài thi này. Hãy chuyển sang mục "Chấm Bài" để bắt đầu!</td></tr>`;
    if (statsContainer) statsContainer.innerHTML = "";
    return;
  }

  const scores = results.map(r => r.total_score);
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  const max = Math.max(...scores).toFixed(2);
  const min = Math.min(...scores).toFixed(2);
  const passCount = scores.filter(s => s >= 5.0).length;
  const passRate = Math.round((passCount / scores.length) * 100);

  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p class="text-xs text-slate-500">Số bài đã chấm</p>
          <p class="text-xl font-bold text-slate-900 mt-0.5">${results.length} bài</p>
        </div>
        <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p class="text-xs text-slate-500">Điểm trung bình</p>
          <p class="text-xl font-bold text-blue-700 mt-0.5">${avg} đ</p>
        </div>
        <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p class="text-xs text-slate-500">Điểm cao nhất</p>
          <p class="text-xl font-bold text-slate-900 mt-0.5">${max} đ</p>
        </div>
        <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p class="text-xs text-slate-500">Tỷ lệ Đạt (≥ 5.0đ)</p>
          <p class="text-xl font-bold text-slate-900 mt-0.5">${passRate}%</p>
        </div>
      </div>
    `;
  }

  let html = "";
  results.forEach((r, idx) => {
    html += `
      <tr class="border-b border-slate-100 hover:bg-slate-50">
        <td class="py-2.5 px-3 text-slate-400">${idx + 1}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-slate-900">${r.sbd}</td>
        <td class="py-2.5 px-3 font-medium text-slate-800">${r.studentName}</td>
        <td class="py-2.5 px-3 font-mono text-slate-600">${r.made}</td>
        <td class="py-2.5 px-3 text-right font-mono text-slate-600">${r.part1_score.toFixed(2)}</td>
        <td class="py-2.5 px-3 text-right font-mono text-slate-600">${r.part2_score.toFixed(2)}</td>
        <td class="py-2.5 px-3 text-right font-mono text-slate-600">${r.part3_score.toFixed(2)}</td>
        <td class="py-2.5 px-3 text-right font-mono font-bold text-sm text-blue-700">${r.total_score.toFixed(2)}</td>
        <td class="py-2.5 px-3 text-center text-xs text-slate-400">${r.timestamp}</td>
        <td class="py-2.5 px-3 text-right space-x-1.5">
          <button onclick="previewGradedImage('${r.id}')" class="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 font-medium">Xem</button>
          <button onclick="deleteSingleResult('${r.id}')" class="px-2 py-1 text-xs bg-rose-50 text-rose-600 rounded hover:bg-rose-100 font-medium">Xóa</button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

window.previewGradedImage = function previewGradedImage(id) {
  const r = window.appState.data.results.find(item => item.id === id);
  if (r) window.showResultModal(r);
};

window.deleteSingleResult = function deleteSingleResult(id) {
  if (confirm("Bạn có chắc chắn muốn xóa kết quả bài thi này?")) {
    window.appState.deleteResult(id);
    renderResultsTable();
  }
};

window.clearAllResults = function clearAllResults() {
  if (confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa toàn bộ kết quả chấm của bài thi này?")) {
    window.appState.clearResults();
    renderResultsTable();
  }
};

window.updateExamSelect = function updateExamSelect() {
  const select = document.getElementById("headerExamSelect");
  if (!select) return;
  select.innerHTML = window.appState.data.exams.map(e => `
    <option value="${e.id}" ${e.id === window.appState.data.currentExamId ? 'selected' : ''}>
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
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
  renderResultsTable();
};

window.renderStudentsList = function renderStudentsList() {
  const cls = window.appState.getCurrentClass();
  const tbody = document.getElementById("studentsTableBody");
  if (!tbody || !cls) return;

  let html = "";
  cls.students.forEach((s, idx) => {
    html += `
      <tr class="border-b border-slate-100">
        <td class="py-2 px-3 text-slate-400">${idx + 1}</td>
        <td class="py-2 px-3 font-mono font-bold text-slate-900">${s.sbd}</td>
        <td class="py-2 px-3 text-slate-800 font-medium">${s.name}</td>
        <td class="py-2 px-3 text-right">
          <button onclick="removeStudent('${s.sbd}')" class="text-xs text-rose-600 hover:underline">Xóa</button>
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
  const text = prompt("Dán danh sách học sinh (Mỗi dòng một học sinh: SBD [dấu cách] Tên):\nVí dụ:\n000101 Nguyễn Văn A\n000102 Trần Thị B");
  if (!text) return;

  const lines = text.trim().split("\n");
  const cls = window.appState.getCurrentClass();
  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      const sbd = parts[0].padStart(6, '0');
      const name = parts.slice(1).join(" ");
      if (!cls.students.some(s => s.sbd === sbd)) {
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
  window.renderStudentsList && window.renderStudentsList();
  window.renderTemplateGallery && window.renderTemplateGallery();
  window.switchTab && window.switchTab(window.appState.data.currentTab || "scan");
});
