/**
 * ỨNG DỤNG QUẢN LÝ VÀ CHẤM THI TRẮC NGHIỆM TRỰC TUYẾN - QMATH OMR 2025
 * Hỗ trợ:
 * - Chọn nhiều loại phiếu chấm (Chuẩn BGD 2025 1239, 40 câu, 50 câu, QMATH, TNMK, Azota)
 * - Khung hiển thị đáp án trực quan như phiếu thi (Interactive Bubble Answer Sheet)
 * - Nạp mã đề và bảng đáp án bằng FILE EXCEL (.xlsx) & MÃ QR (Camera & File ảnh QR)
 * - Xuất mã QR chia sẻ đáp án & Tải file Excel mẫu
 * - Chấm bài qua Camera / Tải ảnh, Xuất kết quả Excel đa trang
 * Bản quyền: QMATH (chamthi.qmath.io.vn)
 */

const STORAGE_KEY = "QMATH_OMR_DATA_V2";

// Danh mục các loại phiếu thi chuẩn hóa
const SHEET_TYPES = {
  "A4_TN2025_BGD_1239": {
    name: "A4 - Chuẩn Bộ GD&ĐT 2025 (1239)",
    desc: "12 câu TN (3.0đ) + 4 câu Đúng/Sai (4.0đ) + 6 câu Trả lời ngắn (3.0đ)",
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p3_score: 0.5
  },
  "A4_TN2025_QM_1239": {
    name: "A4 - Chuẩn QMATH 2025 (1239)",
    desc: "12 câu TN (3.0đ) + 4 câu Đúng/Sai (4.0đ) + 6 câu Trả lời ngắn (3.0đ) - Tối ưu quang học",
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p3_score: 0.5
  },
  "A4_TN2025_BGD_40": {
    name: "A4 - Trắc Nghiệm 40 câu thuần túy (Bộ GD&ĐT)",
    desc: "40 câu trắc nghiệm 4 lựa chọn A, B, C, D (0.25đ/câu)",
    p1_num: 40, p2_num: 0, p3_num: 0,
    p1_score: 0.25, p3_score: 0.0
  },
  "A4_TN_50": {
    name: "A4 - Trắc Nghiệm 50 câu (Mẫu truyền thống)",
    desc: "50 câu trắc nghiệm 4 lựa chọn A, B, C, D (0.2đ/câu)",
    p1_num: 50, p2_num: 0, p3_num: 0,
    p1_score: 0.2, p3_score: 0.0
  },
  "A4_TNMK_2025": {
    name: "A4 - Chuẩn TNMaker 2025 (1239)",
    desc: "Tương thích phiếu chấm TNMaker 2025 (12 TN + 4 Đ/S + 6 TLN)",
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p3_score: 0.5
  },
  "A4_AZOTA_2025": {
    name: "A4 - Chuẩn Azota 2025",
    desc: "Tương thích phiếu trả lời trắc nghiệm Azota 2025",
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p3_score: 0.5
  },
  "A5_TN_50": {
    name: "A5 - Trắc Nghiệm 50 câu (Khổ A5 rút gọn)",
    desc: "50 câu trắc nghiệm in trên khổ giấy A5 tiết kiệm (0.2đ/câu)",
    p1_num: 50, p2_num: 0, p3_num: 0,
    p1_score: 0.2, p3_score: 0.0
  }
};

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
        p1_num: 12,
        p2_num: 4,
        p3_num: 6,
        p1_score: 0.25,
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
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return defaultState;
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }

  getCurrentExam() {
    return this.data.exams.find(e => e.id === this.data.currentExamId) || this.data.exams[0];
  }

  getCurrentClass() {
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

// --- ÂM THANH BEEP THÔNG BÁO ---
function playBeep(isSuccess = true) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.18);
  } catch (e) {
    console.warn("AudioContext error:", e);
  }
}

// --- QUẢN LÝ CAMERA CHẤM BÀI ---
let activeStream = null;
let currentFacingMode = "environment";
let autoScanTimer = null;
let isAutoScanActive = false;
let lastGradedSBD = "";
let lastGradedTime = 0;

async function initCamera() {
  const video = document.getElementById("scannerVideo");
  if (!video) return;

  if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
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

    document.getElementById("cameraStatus").innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>Camera đang sẵn sàng`;
  } catch (err) {
    console.error("Camera access failed:", err);
    document.getElementById("cameraStatus").innerHTML = `<span class="text-rose-500">Không thể mở camera (${err.name || "lỗi quyền"}). Hãy dùng nút "Tải ảnh từ máy"!</span>`;
  }
}

function switchCamera() {
  currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
  initCamera();
}

function doGrade(sourceElement) {
  const exam = appState.getCurrentExam();
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
    const studentName = appState.findStudentName(res.sbd);

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

    appState.addResult(resultRecord);
    playBeep(true);

    showResultModal(resultRecord);
    renderResultsTable();

    const viewport = document.getElementById("scannerViewport");
    if (viewport) {
      viewport.classList.add("flash-success");
      setTimeout(() => viewport.classList.remove("flash-success"), 400);
    }

    if (res.total_score >= 9.0 && typeof confetti === "function") {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  } catch (err) {
    console.error("Grading failed:", err);
    playBeep(false);
    alert("Chưa nhận diện được phiếu thi! Vui lòng căn phiếu thi rõ ràng trong khung sáng và thử lại.");
  }
}

function captureAndGrade() {
  const video = document.getElementById("scannerVideo");
  if (!video || !activeStream) {
    alert("Camera chưa bật hoặc không khả dụng. Hãy dùng nút 'Tải ảnh từ máy'!");
    return;
  }
  doGrade(video);
}

function toggleAutoScan() {
  isAutoScanActive = !isAutoScanActive;
  const btn = document.getElementById("btnAutoScan");

  if (isAutoScanActive) {
    btn.classList.remove("bg-slate-700", "text-slate-200");
    btn.classList.add("bg-emerald-600", "text-white", "animate-pulse");
    btn.innerHTML = `⚡ Tự động quét: BẬT`;

    autoScanTimer = setInterval(() => {
      const video = document.getElementById("scannerVideo");
      if (!video || video.readyState !== 4) return;

      try {
        const exam = appState.getCurrentExam();
        const output = window.omrEngine.gradeFromImageSource(video, exam.config, exam.answerKeys);
        const res = output.result;

        const now = Date.now();
        if (res.sbd && res.sbd !== "000000" && (res.sbd !== lastGradedSBD || now - lastGradedTime > 3000)) {
          lastGradedSBD = res.sbd;
          lastGradedTime = now;

          const studentName = appState.findStudentName(res.sbd);
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

          appState.addResult(resultRecord);
          playBeep(true);
          renderResultsTable();

          const viewport = document.getElementById("scannerViewport");
          if (viewport) {
            viewport.classList.add("flash-success");
            setTimeout(() => viewport.classList.remove("flash-success"), 350);
          }
        }
      } catch (e) {}
    }, 1500);
  } else {
    clearInterval(autoScanTimer);
    btn.classList.remove("bg-emerald-600", "text-white", "animate-pulse");
    btn.classList.add("bg-slate-700", "text-slate-200");
    btn.innerHTML = `⚡ Tự động quét: TẮT`;
  }
}

function handleFileUpload(event) {
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
}

function gradeSampleSheet() {
  const img = new Image();
  img.onload = () => doGrade(img);
  img.src = "samples/bai_thi_mau_101.png";
}

// --- POPUP KẾT QUẢ TỨC THÌ ---
function showResultModal(record) {
  const modal = document.getElementById("resultModal");
  if (!modal) return;

  document.getElementById("modalSbd").innerText = record.sbd;
  document.getElementById("modalStudentName").innerText = record.studentName;
  document.getElementById("modalMade").innerText = record.made;

  const scoreEl = document.getElementById("modalTotalScore");
  scoreEl.innerText = record.total_score.toFixed(2);
  scoreEl.className = `text-5xl font-extrabold ${record.total_score >= 8.0 ? 'text-emerald-500' : (record.total_score >= 5.0 ? 'text-sky-500' : 'text-rose-500')}`;

  document.getElementById("modalP1Score").innerText = record.part1_score.toFixed(2) + " đ";
  document.getElementById("modalP2Score").innerText = record.part2_score.toFixed(2) + " đ";
  document.getElementById("modalP3Score").innerText = record.part3_score.toFixed(2) + " đ";

  document.getElementById("modalPreviewImg").src = record.annotatedDataUrl;
  modal.classList.remove("hidden");
}

function closeResultModal() {
  const modal = document.getElementById("resultModal");
  if (modal) modal.classList.add("hidden");
}

// =========================================================================
// === BẢNG HIỂN THỊ ĐÁP ÁN TRỰC QUAN NHƯ PHIẾU CHẤM (VISUAL ANSWER SHEET) ===
// =========================================================================

function renderVisualAnswerSheet() {
  const exam = appState.getCurrentExam();
  if (!exam) return;

  const container = document.getElementById("visualAnswerSheetContainer");
  const codeSelector = document.getElementById("visualCodeSelector");
  if (!container || !codeSelector) return;

  const codes = Object.keys(exam.answerKeys);
  if (codes.length === 0) {
    exam.answerKeys["101"] = createDefaultKey(exam.config);
    appState.save();
  }

  // Đảm bảo activeMade hợp lệ
  if (!exam.answerKeys[appState.data.activeMade]) {
    appState.data.activeMade = Object.keys(exam.answerKeys)[0];
  }
  const curMade = appState.data.activeMade;
  const curKey = exam.answerKeys[curMade] || createDefaultKey(exam.config);

  // 1. Render danh sách tab mã đề
  let codeTabsHtml = "";
  Object.keys(exam.answerKeys).forEach(c => {
    const isActive = c === curMade;
    codeTabsHtml += `
      <button onclick="selectActiveMade('${c}')" class="px-4 py-2 rounded-xl text-sm font-bold font-mono transition flex items-center space-x-1.5 ${isActive ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'}">
        <span>MÃ ${c}</span>
      </button>
    `;
  });
  codeSelector.innerHTML = codeTabsHtml;

  // 2. Render nội dung bảng đáp án trực quan
  const p1Num = exam.config.p1_num || 12;
  const p2Num = exam.config.p2_num || 0;
  const p3Num = exam.config.p3_num || 0;

  let sheetHtml = `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      
      <!-- Thanh công cụ Mã Đề -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
        <div class="flex items-center space-x-2">
          <span class="text-xs uppercase font-bold text-slate-400">Đang xem:</span>
          <span class="px-3 py-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-mono font-extrabold text-base border border-sky-300 dark:border-sky-800">
            MÃ ĐỀ ${curMade}
          </span>
          <span class="text-xs text-slate-500 font-medium">(${p1Num} câu TN • ${p2Num} câu Đ/S • ${p3Num} câu TLN)</span>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button onclick="showQRCodeShareModal('${curMade}')" class="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 text-xs font-semibold border border-purple-200 dark:border-purple-800 flex items-center space-x-1">
            <span>📱 Xuất mã QR chia sẻ</span>
          </button>
          <button onclick="quickTextPastePrompt('${curMade}')" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-xs font-semibold flex items-center space-x-1">
            <span>⚡ Dán chuỗi text nhanh</span>
          </button>
          <button onclick="deleteCurrentMade('${curMade}')" class="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold">
            Xóa mã này
          </button>
        </div>
      </div>
  `;

  // === PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN ===
  if (p1Num > 0) {
    sheetHtml += `
      <div>
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wide flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>Phần I: Trắc Nghiệm 4 Lựa Chọn (${p1Num} câu - Mỗi câu chọn A, B, C hoặc D)</span>
          </h4>
          <span class="text-xs text-slate-500">Bấm ô tròn để chọn đáp án</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    `;

    for (let q = 0; q < p1Num; q++) {
      const qNum = q + 1;
      const curAns = curKey.part1[q] || "";
      const opts = ["A", "B", "C", "D"];

      sheetHtml += `
        <div class="p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
          <span class="font-mono font-bold text-xs text-slate-600 dark:text-slate-400 w-8">C${qNum}</span>
          <div class="flex items-center space-x-1.5">
            ${opts.map(opt => `
              <button onclick="setPart1Answer('${curMade}', ${q}, '${opt}')" class="bubble-choice ${curAns === opt ? 'selected' : ''}">
                ${opt}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }
    sheetHtml += `</div></div>`;
  }

  // === PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI ===
  if (p2Num > 0) {
    sheetHtml += `
      <div class="border-t border-slate-100 dark:border-slate-700 pt-5">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wide flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>Phần II: Đúng / Sai (${p2Num} câu - Mỗi câu có 4 ý a, b, c, d)</span>
          </h4>
          <span class="text-xs text-slate-500">Chọn Đ (Đúng - Xanh) hoặc S (Sai - Đỏ)</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    `;

    for (let q = 0; q < p2Num; q++) {
      const qNum = q + 1;
      const qKey = String(qNum);
      const subs = curKey.part2[qKey] || ["", "", "", ""];
      const subLabels = ["a", "b", "c", "d"];

      sheetHtml += `
        <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40">
          <div class="font-bold text-xs text-indigo-600 dark:text-indigo-400 mb-2 pb-1.5 border-b border-slate-200 dark:border-slate-700">
            CÂU ${qNum}
          </div>
          <div class="space-y-2">
            ${subLabels.map((sLabel, sIdx) => {
              const val = subs[sIdx] || "";
              return `
                <div class="flex items-center justify-between text-xs">
                  <span class="font-mono font-semibold text-slate-700 dark:text-slate-300">${sLabel})</span>
                  <div class="flex items-center space-x-1.5">
                    <button onclick="setPart2Answer('${curMade}', '${qKey}', ${sIdx}, 'Đ')" class="bubble-tf ${val === 'Đ' ? 'selected-true' : ''}">
                      Đ
                    </button>
                    <button onclick="setPart2Answer('${curMade}', '${qKey}', ${sIdx}, 'S')" class="bubble-tf ${val === 'S' ? 'selected-false' : ''}">
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

  // === PHẦN III: TRẢ LỜI NGẮN ===
  if (p3Num > 0) {
    sheetHtml += `
      <div class="border-t border-slate-100 dark:border-slate-700 pt-5">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wide flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Phần III: Câu Trả Lời Ngắn (${p3Num} câu - Điền số nguyên hoặc số thập phân)</span>
          </h4>
          <span class="text-xs text-slate-500">Nhập trực tiếp số hoặc click nút nhanh</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
    `;

    for (let q = 0; q < p3Num; q++) {
      const qNum = q + 1;
      const curAns = curKey.part3[q] || "";

      sheetHtml += `
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40">
          <label class="block font-bold text-xs text-emerald-600 dark:text-emerald-400 mb-1.5">CÂU ${qNum}</label>
          <input type="text" value="${curAns}" onchange="setPart3Answer('${curMade}', ${q}, this.value)" placeholder="Ví dụ: 1.5" class="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-mono font-bold text-sm text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>
      `;
    }
    sheetHtml += `</div></div>`;
  }

  sheetHtml += `</div>`;
  container.innerHTML = sheetHtml;
}

function selectActiveMade(made) {
  appState.data.activeMade = made;
  appState.save();
  renderVisualAnswerSheet();
}

function createDefaultKey(config) {
  const p1 = Array(config.p1_num || 12).fill("A");
  const p2 = {};
  for (let i = 1; i <= (config.p2_num || 4); i++) {
    p2[String(i)] = ["Đ", "S", "Đ", "S"];
  }
  const p3 = Array(config.p3_num || 6).fill("0");
  return { part1: p1, part2: p2, part3: p3 };
}

function setPart1Answer(made, qIdx, opt) {
  const exam = appState.getCurrentExam();
  if (!exam.answerKeys[made]) return;
  // Bấm lại phương án đang chọn thì bỏ chọn
  if (exam.answerKeys[made].part1[qIdx] === opt) {
    exam.answerKeys[made].part1[qIdx] = "";
  } else {
    exam.answerKeys[made].part1[qIdx] = opt;
  }
  appState.save();
  renderVisualAnswerSheet();
}

function setPart2Answer(made, qKey, subIdx, val) {
  const exam = appState.getCurrentExam();
  if (!exam.answerKeys[made]) return;
  if (!exam.answerKeys[made].part2[qKey]) {
    exam.answerKeys[made].part2[qKey] = ["", "", "", ""];
  }
  if (exam.answerKeys[made].part2[qKey][subIdx] === val) {
    exam.answerKeys[made].part2[qKey][subIdx] = "";
  } else {
    exam.answerKeys[made].part2[qKey][subIdx] = val;
  }
  appState.save();
  renderVisualAnswerSheet();
}

function setPart3Answer(made, qIdx, val) {
  const exam = appState.getCurrentExam();
  if (!exam.answerKeys[made]) return;
  exam.answerKeys[made].part3[qIdx] = val.trim();
  appState.save();
}

function addNewMadePrompt() {
  const code = prompt("Nhập Mã Đề mới (ví dụ 103, 104, 201...):");
  if (!code) return;
  const cleanCode = code.trim();
  const exam = appState.getCurrentExam();
  if (exam.answerKeys[cleanCode]) {
    alert("Mã đề này đã tồn tại!");
    return;
  }
  exam.answerKeys[cleanCode] = createDefaultKey(exam.config);
  appState.data.activeMade = cleanCode;
  appState.save();
  renderVisualAnswerSheet();
}

function deleteCurrentMade(made) {
  const exam = appState.getCurrentExam();
  const codes = Object.keys(exam.answerKeys);
  if (codes.length <= 1) {
    alert("Bài thi phải có ít nhất 1 mã đề!");
    return;
  }
  if (confirm(`Bạn có chắc muốn xóa mã đề ${made}?`)) {
    delete exam.answerKeys[made];
    appState.data.activeMade = Object.keys(exam.answerKeys)[0];
    appState.save();
    renderVisualAnswerSheet();
  }
}

function quickTextPastePrompt(made) {
  const exam = appState.getCurrentExam();
  const curKey = exam.answerKeys[made];
  const p1Text = prompt("Nhập chuỗi đáp án Phần I (các ký tự A, B, C, D cách nhau hoặc viết liền, ví dụ ABCDABCDABCD):", curKey.part1.join(""));
  if (p1Text !== null) {
    const clean = p1Text.replace(/[^A-Za-z]/g, "").toUpperCase();
    for (let i = 0; i < exam.config.p1_num && i < clean.length; i++) {
      curKey.part1[i] = clean[i];
    }
  }
  appState.save();
  renderVisualAnswerSheet();
}

// =========================================================================
// === NẠP MÃ ĐỀ & ĐÁP ÁN BẰNG FILE EXCEL (.XLSX) ===
// =========================================================================

function triggerExcelKeyUpload() {
  const fileInput = document.getElementById("excelKeyFileInput");
  if (fileInput) fileInput.click();
}

function handleExcelKeyUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

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

      const exam = appState.getCurrentExam();
      let importedCount = 0;

      // Tìm vị trí cột Mã Đề
      const headerRow = rows[0].map(h => String(h || "").trim().toLowerCase());
      let madeColIdx = headerRow.findIndex(h => h.includes("mã") || h.includes("made") || h.includes("code") || h.includes("đề"));
      if (madeColIdx === -1) madeColIdx = 0; // Mặc định cột A

      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0) continue;

        const codeVal = String(row[madeColIdx] || "").trim();
        if (!codeVal) continue;

        // Khởi tạo key
        const newKey = createDefaultKey(exam.config);

        // Đọc Phần 1: các cột tiếp theo
        let cIdx = 1;
        for (let i = 0; i < exam.config.p1_num; i++) {
          if (cIdx < row.length && row[cIdx] !== undefined) {
            const v = String(row[cIdx]).trim().toUpperCase();
            if (["A", "B", "C", "D"].includes(v)) {
              newKey.part1[i] = v;
            }
          }
          cIdx++;
        }

        // Đọc Phần 2
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

        // Đọc Phần 3
        for (let i = 0; i < exam.config.p3_num; i++) {
          if (cIdx < row.length && row[cIdx] !== undefined) {
            newKey.part3[i] = String(row[cIdx]).trim();
          }
          cIdx++;
        }

        exam.answerKeys[codeVal] = newKey;
        appState.data.activeMade = codeVal;
        importedCount++;
      }

      appState.save();
      renderVisualAnswerSheet();
      playBeep(true);
      alert(`Đã nạp thành công ${importedCount} mã đề từ File Excel!`);
    } catch (err) {
      console.error("Excel parse error:", err);
      alert("Lỗi khi đọc file Excel! Hãy kiểm tra định dạng file mẫu.");
    }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = "";
}

// Tải file Excel mẫu chuẩn Bộ GD&ĐT 2025
function downloadExcelKeyTemplate() {
  const exam = appState.getCurrentExam();
  const headers = ["Mã Đề"];

  // Header P1
  for (let i = 1; i <= exam.config.p1_num; i++) headers.push(`P1_C${i}`);
  // Header P2
  for (let i = 1; i <= exam.config.p2_num; i++) {
    headers.push(`P2_C${i}_a`, `P2_C${i}_b`, `P2_C${i}_c`, `P2_C${i}_d`);
  }
  // Header P3
  for (let i = 1; i <= exam.config.p3_num; i++) headers.push(`P3_C${i}`);

  const sampleRows = [
    headers,
    ["101", "A", "B", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D", "Đ", "S", "Đ", "S", "Đ", "Đ", "S", "S", "S", "Đ", "Đ", "S", "Đ", "S", "S", "Đ", "1.5", "-2", "0.75", "10", "-3.5", "4"],
    ["102", "B", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D", "A", "S", "Đ", "S", "Đ", "S", "S", "Đ", "Đ", "Đ", "S", "S", "Đ", "S", "Đ", "Đ", "S", "2.5", "-1", "1.25", "15", "-4.5", "6"],
    ["103", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D", "A", "B", "Đ", "Đ", "S", "S", "Đ", "S", "Đ", "S", "Đ", "S", "S", "Đ", "S", "Đ", "S", "Đ", "3.0", "4.2", "-5", "12", "0.5", "-8"]
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(sampleRows);
  XLSX.utils.book_append_sheet(wb, ws, "Mau_Dap_An");
  XLSX.writeFile(wb, "Mau_Dap_An_Chuan_BGD_2025.xlsx");
}

// =========================================================================
// === NẠP & XUẤT ĐÁP ÁN BẰNG MÃ QR (QR CODE) ===
// =========================================================================

let qrScannerStream = null;
let qrScanInterval = null;

function openQRScannerModal() {
  const modal = document.getElementById("qrScannerModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  startQRCamera();
}

function closeQRScannerModal() {
  const modal = document.getElementById("qrScannerModal");
  if (modal) modal.classList.add("hidden");
  stopQRCamera();
}

async function startQRCamera() {
  const video = document.getElementById("qrVideoFeed");
  if (!video) return;

  try {
    qrScannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = qrScannerStream;
    await video.play();

    // Vòng lặp nhận diện QR bằng jsQR
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
    console.error("QR Camera error:", err);
    document.getElementById("qrCameraStatus").innerHTML = `<span class="text-rose-500">Camera QR không khả dụng. Hãy dùng nút 'Tải ảnh QR từ máy'!</span>`;
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

function handleQRImageUpload(event) {
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
}

function handleQRDataImport(qrStr) {
  try {
    const exam = appState.getCurrentExam();
    let made = "";
    let keyObj = null;

    // 1. Thử parse dạng JSON
    try {
      const parsed = JSON.parse(qrStr);
      if (parsed.made) {
        made = String(parsed.made);
        keyObj = {
          part1: parsed.p1 || [],
          part2: parsed.p2 || {},
          part3: parsed.p3 || []
        };
      }
    } catch (e) {}

    // 2. Thử parse dạng chuỗi nén: QM2025|101|ABCD...|DSDS,DDSS...|1.5,-2...
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
      appState.data.activeMade = made;
      appState.save();
      playBeep(true);
      closeQRScannerModal();
      renderVisualAnswerSheet();
      alert(`Đã nạp thành công đáp án Mã Đề ${made} từ mã QR!`);
    } else {
      alert("Định dạng dữ liệu mã QR không hợp lệ!");
    }
  } catch (err) {
    console.error("QR Import error:", err);
    alert("Lỗi khi xử lý dữ liệu mã QR!");
  }
}

// Xuất mã QR để chia sẻ
function showQRCodeShareModal(made) {
  const modal = document.getElementById("qrShareModal");
  const qrcodeContainer = document.getElementById("qrcodeDisplay");
  if (!modal || !qrcodeContainer) return;

  const exam = appState.getCurrentExam();
  const key = exam.answerKeys[made];
  if (!key) return;

  // Tạo chuỗi nén gọn nhẹ để QR quét nhanh
  const p1Str = key.part1.join("");
  const p2Str = Object.values(key.part2).map(s => s.join("")).join(";");
  const p3Str = key.part3.join(",");
  const qrData = `QM2025|${made}|${p1Str}|${p2Str}|${p3Str}`;

  qrcodeContainer.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    new QRCode(qrcodeContainer, {
      text: qrData,
      width: 220,
      height: 220,
      colorDark: "#0f172a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  document.getElementById("qrShareMade").innerText = made;
  document.getElementById("qrShareExamName").innerText = exam.name;
  modal.classList.remove("hidden");
}

function closeQRShareModal() {
  const modal = document.getElementById("qrShareModal");
  if (modal) modal.classList.add("hidden");
}

// =========================================================================
// === MODAL TẠO & CHỌN LOẠI PHIẾU CHẤM BÀI THI ===
// =========================================================================

function showCreateExamModal() {
  const modal = document.getElementById("createExamModal");
  if (!modal) return;

  // Render danh sách loại phiếu
  const select = document.getElementById("examSheetTypeSelect");
  if (select) {
    select.innerHTML = Object.entries(SHEET_TYPES).map(([k, v]) => `
      <option value="${k}">${v.name} - ${v.desc}</option>
    `).join("");
  }

  // Render danh sách lớp
  const classSelect = document.getElementById("examClassSelect");
  if (classSelect) {
    classSelect.innerHTML = appState.data.classes.map(c => `
      <option value="${c.id}" ${c.id === appState.data.currentClassId ? 'selected' : ''}>${c.name}</option>
    `).join("");
  }

  modal.classList.remove("hidden");
}

function closeCreateExamModal() {
  const modal = document.getElementById("createExamModal");
  if (modal) modal.classList.add("hidden");
}

function saveNewExam() {
  const nameInput = document.getElementById("newExamNameInput");
  const sheetTypeSelect = document.getElementById("examSheetTypeSelect");
  const classSelect = document.getElementById("examClassSelect");

  const name = nameInput.value.trim() || "Bài thi mới";
  const sheetTypeKey = sheetTypeSelect.value || "A4_TN2025_BGD_1239";
  const classId = classSelect.value || appState.data.currentClassId;

  const sheetDef = SHEET_TYPES[sheetTypeKey];

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

  appState.data.exams.push(newExam);
  appState.data.currentExamId = newExam.id;
  appState.data.activeMade = "101";
  appState.save();

  updateExamSelect();
  renderVisualAnswerSheet();
  closeCreateExamModal();
  alert(`Đã tạo bài thi "${name}" với loại phiếu [${sheetDef.name}] thành công!`);
}

// =========================================================================
// === XUẤT FILE EXCEL KẾT QUẢ ĐA TRANG ===
// =========================================================================

function exportResultsToExcel() {
  const exam = appState.getCurrentExam();
  const cls = appState.getCurrentClass();
  const results = appState.data.results.filter(r => r.examId === exam.id);

  if (results.length === 0) {
    alert("Chưa có kết quả nào để xuất Excel!");
    return;
  }

  const summaryRows = [
    ["BẢNG TỔNG HỢP KẾT QUẢ CHẤM THI TRẮC NGHIỆM - CHUẨN BỘ GIÁO DỤC 2025"],
    [`Bài thi: ${exam.name}`, "", `Loại phiếu: ${SHEET_TYPES[exam.sheet_type]?.name || exam.sheet_type}`, "", `Lớp: ${cls.name}`, "", `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`],
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
      idx + 1,
      r.sbd,
      r.studentName,
      r.made,
      r.part1_score,
      r.part2_score,
      r.part3_score,
      r.total_score,
      rank,
      r.timestamp
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
}

// =========================================================================
// === RENDER GIAO DIỆN & TABS ===
// =========================================================================

function switchTab(tabName) {
  appState.data.currentTab = tabName;
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".tab-btn").forEach(el => {
    el.classList.remove("text-sky-600", "border-sky-600", "dark:text-sky-400", "dark:border-sky-400");
    el.classList.add("text-slate-500", "border-transparent");
  });

  const targetContent = document.getElementById(`tabContent_${tabName}`);
  const targetBtn = document.getElementById(`tabBtn_${tabName}`);

  if (targetContent) targetContent.classList.remove("hidden");
  if (targetBtn) {
    targetBtn.classList.remove("text-slate-500", "border-transparent");
    targetBtn.classList.add("text-sky-600", "border-sky-600", "dark:text-sky-400", "dark:border-sky-400");
  }

  if (tabName === "scan") {
    initCamera();
  } else if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
    activeStream = null;
  }

  if (tabName === "exams") {
    renderVisualAnswerSheet();
  } else if (tabName === "results") {
    renderResultsTable();
  }
}

function renderResultsTable() {
  const exam = appState.getCurrentExam();
  const results = appState.data.results.filter(r => r.examId === exam.id);
  const tbody = document.getElementById("resultsTableBody");
  const statsContainer = document.getElementById("resultsStats");
  if (!tbody) return;

  if (results.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="py-12 text-center text-slate-400">Chưa có bài thi nào được chấm trong bài thi này. Hãy chuyển sang tab "Chấm Bài" để bắt đầu!</td></tr>`;
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
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-xs text-slate-500">Tổng số bài đã chấm</p>
          <p class="text-2xl font-bold text-slate-800 dark:text-white mt-1">${results.length} bài</p>
        </div>
        <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-xs text-slate-500">Điểm trung bình</p>
          <p class="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">${avg} đ</p>
        </div>
        <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-xs text-slate-500">Điểm cao nhất</p>
          <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">${max} đ</p>
        </div>
        <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p class="text-xs text-slate-500">Tỷ lệ Đạt (≥ 5.0đ)</p>
          <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">${passRate}%</p>
        </div>
      </div>
    `;
  }

  let html = "";
  results.forEach((r, idx) => {
    const badgeColor = r.total_score >= 8.0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : (r.total_score >= 5.0 ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300');

    html += `
      <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
        <td class="py-3 px-3 text-slate-500">${idx + 1}</td>
        <td class="py-3 px-3 font-mono font-semibold text-slate-800 dark:text-slate-200">${r.sbd}</td>
        <td class="py-3 px-3 font-medium text-slate-900 dark:text-white">${r.studentName}</td>
        <td class="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">${r.made}</td>
        <td class="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">${r.part1_score.toFixed(2)}</td>
        <td class="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">${r.part2_score.toFixed(2)}</td>
        <td class="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">${r.part3_score.toFixed(2)}</td>
        <td class="py-3 px-3 text-right font-mono font-bold text-lg"><span class="px-2.5 py-0.5 rounded-full ${badgeColor}">${r.total_score.toFixed(2)}</span></td>
        <td class="py-3 px-3 text-center text-xs text-slate-500">${r.timestamp}</td>
        <td class="py-3 px-3 text-right space-x-2">
          <button onclick="previewGradedImage('${r.id}')" class="px-2.5 py-1 text-xs bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400 rounded hover:bg-sky-100 font-medium">Xem ảnh</button>
          <button onclick="deleteSingleResult('${r.id}')" class="px-2.5 py-1 text-xs bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 rounded hover:bg-rose-100 font-medium">Xóa</button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

function previewGradedImage(id) {
  const r = appState.data.results.find(item => item.id === id);
  if (r) showResultModal(r);
}

function deleteSingleResult(id) {
  if (confirm("Bạn có chắc chắn muốn xóa kết quả bài thi này?")) {
    appState.deleteResult(id);
    renderResultsTable();
  }
}

function clearAllResults() {
  if (confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa toàn bộ kết quả chấm của bài thi này?")) {
    appState.clearResults();
    renderResultsTable();
  }
}

function updateExamSelect() {
  const select = document.getElementById("headerExamSelect");
  if (!select) return;
  select.innerHTML = appState.data.exams.map(e => `
    <option value="${e.id}" ${e.id === appState.data.currentExamId ? 'selected' : ''}>
      ${e.name} (${SHEET_TYPES[e.sheet_type]?.name?.split("-")[0]?.trim() || "2025"})
    </option>
  `).join("");
}

function onExamChange(examId) {
  appState.data.currentExamId = examId;
  const exam = appState.getCurrentExam();
  if (exam && exam.answerKeys) {
    appState.data.activeMade = Object.keys(exam.answerKeys)[0] || "101";
  }
  appState.save();
  renderVisualAnswerSheet();
  renderResultsTable();
}

window.addEventListener("DOMContentLoaded", () => {
  updateExamSelect();
  switchTab(appState.data.currentTab || "scan");
});
