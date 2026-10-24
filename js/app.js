/**
 * ỨNG DỤNG QUẢN LÝ VÀ CHẤM THI TRẮC NGHIỆM TRỰC TUYẾN - QMATH OMR 2025
 * Tích hợp: Camera trực tiếp, Chấm ảnh tải lên, Quản lý lớp & đề thi, Xuất Excel
 * Domain: chamthi.qmath.io.vn
 */

// --- KHỞI TẠO STATE & LOCALSTORAGE ---
const STORAGE_KEY = "QMATH_OMR_DATA_V1";

const defaultState = {
  currentTab: "scan",
  currentClassId: "cls_12a1",
  currentExamId: "exam_101",
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
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
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
    // Nếu cùng SBD và bài thi, cập nhật kết quả mới nhất
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

// --- ÂM THANH BEEP THÔNG BÁO (WEB AUDIO API) ---
function playBeep(isSuccess = true) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    if (isSuccess) {
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
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

// --- QUẢN LÝ CAMERA ---
let activeStream = null;
let currentFacingMode = "environment"; // camera sau
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
    document.getElementById("cameraStatus").innerHTML = `<span class="text-rose-500">Không thể mở camera (${err.name || "lỗi quyền truy cập"}). Hãy dùng nút "Tải ảnh từ máy"!</span>`;
  }
}

function switchCamera() {
  currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
  initCamera();
}

// --- XỬ LÝ CHẤM BÀI ---
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

    // Hiển thị kết quả tức thì
    showResultModal(resultRecord);
    renderResultsTable();

    // Hiệu ứng chớp màn hình báo thành công
    const viewport = document.getElementById("scannerViewport");
    if (viewport) {
      viewport.classList.add("flash-success");
      setTimeout(() => viewport.classList.remove("flash-success"), 400);
    }

    // Hiệu ứng pháo hoa nếu điểm xuất sắc (>= 9.0)
    if (res.total_score >= 9.0 && typeof confetti === "function") {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  } catch (err) {
    console.error("Grading failed:", err);
    playBeep(false);
    alert("Chưa nhận diện được phiếu thi! Vui lòng căn phiếu thi rõ ràng trong khung sáng và thử lại.");
  }
}

// Chụp từ video camera
function captureAndGrade() {
  const video = document.getElementById("scannerVideo");
  if (!video || !activeStream) {
    alert("Camera chưa bật hoặc không khả dụng. Hãy dùng nút 'Tải ảnh từ máy'!");
    return;
  }
  doGrade(video);
}

// Bật/Tắt chế độ Quét Tự Động (Auto-Scan)
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

        // Chỉ lưu nếu đọc được SBD hợp lệ và không trùng lặp trong 3 giây
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

          // Flash UI
          const viewport = document.getElementById("scannerViewport");
          if (viewport) {
            viewport.classList.add("flash-success");
            setTimeout(() => viewport.classList.remove("flash-success"), 350);
          }
        }
      } catch (e) {
        // Tiếp tục quét frame tiếp theo
      }
    }, 1500);
  } else {
    clearInterval(autoScanTimer);
    btn.classList.remove("bg-emerald-600", "text-white", "animate-pulse");
    btn.classList.add("bg-slate-700", "text-slate-200");
    btn.innerHTML = `⚡ Tự động quét: TẮT`;
  }
}

// Xử lý nạp ảnh từ máy (Hỗ trợ chấm hàng loạt - Batch grading)
function handleFileUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const total = files.length;
  let processed = 0;

  for (let i = 0; i < total; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        doGrade(img);
        processed++;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Reset input để có thể chọn lại
  event.target.value = "";
}

// Nạp bài thi mẫu 101 để test 1-click
function gradeSampleSheet() {
  const img = new Image();
  img.onload = () => {
    doGrade(img);
  };
  img.src = "samples/bai_thi_mau_101.png";
}

// --- POPUP KẾT QUẢ TỨC THÌ (SCORE MODAL) ---
function showResultModal(record) {
  const modal = document.getElementById("resultModal");
  if (!modal) return;

  document.getElementById("modalSbd").innerText = record.sbd;
  document.getElementById("modalStudentName").innerText = record.studentName;
  document.getElementById("modalMade").innerText = record.made;

  const scoreEl = document.getElementById("modalTotalScore");
  scoreEl.innerText = record.total_score.toFixed(2);
  scoreEl.className = `text-4xl font-extrabold ${record.total_score >= 8.0 ? 'text-emerald-500' : (record.total_score >= 5.0 ? 'text-sky-500' : 'text-rose-500')}`;

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

// --- XUẤT EXCEL CHUẨN BỘ GIÁO DỤC (SHEETJS) ---
function exportResultsToExcel() {
  const exam = appState.getCurrentExam();
  const cls = appState.getCurrentClass();
  const results = appState.data.results.filter(r => r.examId === exam.id);

  if (results.length === 0) {
    alert("Chưa có kết quả nào để xuất Excel!");
    return;
  }

  if (typeof XLSX === "undefined") {
    alert("Thư viện SheetJS chưa sẵn sàng. Vui lòng kiểm tra kết nối mạng!");
    return;
  }

  // 1. Tạo Sheet 1: Bảng Điểm Tổng Hợp
  const summaryRows = [
    ["BẢNG TỔNG HỢP KẾT QUẢ CHẤM THI TRẮC NGHIỆM - CHUẨN BỘ GIÁO DỤC 2025"],
    [`Bài thi: ${exam.name}`, "", `Lớp: ${cls.name}`, "", `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`],
    [],
    ["STT", "Số Báo Danh", "Họ và Tên Học Sinh", "Mã Đề", "Điểm P.I (TN 4 Lựa chọn)", "Điểm P.II (Đúng/Sai)", "Điểm P.III (Trả lời ngắn)", "TỔNG ĐIỂM", "Xếp Loại", "Thời Gian Chấm"]
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

  // Thêm dòng thống kê cuối bảng
  const scores = results.map(r => r.total_score);
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  const max = Math.max(...scores).toFixed(2);
  const min = Math.min(...scores).toFixed(2);

  summaryRows.push([]);
  summaryRows.push(["THỐNG KÊ CHUNG", `Tổng số bài: ${results.length}`, `Điểm TB: ${avg}`, `Điểm cao nhất: ${max}`, `Điểm thấp nhất: ${min}`]);

  const wb = XLSX.utils.book_new();
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);

  // 2. Tạo Sheet 2: Chi Tiết Từng Câu
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
    // Part 1
    for (let i = 0; i < exam.config.p1_num; i++) {
      row.push(r.part1_answers[i] || "");
    }
    // Part 2
    for (let i = 1; i <= exam.config.p2_num; i++) {
      const subs = r.part2_answers[String(i)] || ["", "", "", ""];
      row.push(subs[0] || "", subs[1] || "", subs[2] || "", subs[3] || "");
    }
    // Part 3
    for (let i = 0; i < exam.config.p3_num; i++) {
      row.push(r.part3_answers[i] || "");
    }
    row.push(r.total_score);
    detailRows.push(row);
  });

  const wsDetails = XLSX.utils.aoa_to_sheet(detailRows);

  XLSX.utils.book_append_sheet(wb, wsSummary, "Bang_Diem_Tong_Hop");
  XLSX.utils.book_append_sheet(wb, wsDetails, "Chi_Tiet_Cau_Tra_Loi");

  const filename = `Bang_Diem_${exam.name.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(wb, filename);
}

// --- RENDER GIAO DIỆN & TABS ---
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
    // Tạm dừng camera nếu sang tab khác để tiết kiệm pin điện thoại
    activeStream.getTracks().forEach(track => track.stop());
    activeStream = null;
  }

  if (tabName === "results") {
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

  // Thống kê metrics
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
  if (r) {
    showResultModal(r);
  }
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

// Khởi chạy khi load xong trang
window.addEventListener("DOMContentLoaded", () => {
  switchTab(appState.data.currentTab || "scan");
});
