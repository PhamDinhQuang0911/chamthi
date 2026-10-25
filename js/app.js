/**
 * ỨNG DỤNG QUẢN LÝ VÀ CHẤM THI TRẮC NGHIỆM TRỰC TUYẾN - QMATH OMR 2025
 * Phiên bản v3.1 - Nâng cấp toàn diện:
 * 1. Tối ưu giao diện mobile siêu sạch, chống tràn header
 * 2. Tinh gọn khu vực chọn và thống kê mã đề đáp án
 * 3. Cho phép xóa không giới hạn (không bắt buộc giữ 1 bài thi)
 * 4. Quản lý lớp học đầy đủ: Tạo lớp, nạp học sinh thủ công / Excel / text
 * 5. Một bài thi gán cho NHIỀU LỚP, phân tích & đối chiếu so sánh giữa các lớp
 * Bản quyền: QMATH (chamthi.qmath.io.vn)
 */

// BẢNG DANH MỤC ĐẦY ĐỦ 12 MẪU PHIẾU THI TỪ APP GỐC QM
// =========================================================================
// BẢNG CẤU HÌNH TOÀN BỘ 24 LOẠI PHIẾU CHẤM TỪ BẢN APK QM 2025 MỚI NHẤT
// ĐẢM BẢO 100% ĐÚNG TÊN GỐC, ĐẦY ĐỦ CÁC LOẠI PHIẾU 4 SỐ VÀ 3 SỐ MÃ ĐỀ
// =========================================================================
const SHEET_TYPES = {
  // === NHÓM 1: CÁC MẪU PHIẾU CÔNG VĂN 1239 (HỖ TRỢ MÃ ĐỀ 4 SỐ & 3 SỐ) ===
  "A4_TN2025_QM_1239": {
    name: "QM 2025 - CV 1239",
    desc: "12 câu TN (3.0đ) + 4 câu Đ/S (4.0đ) + 6 câu TLN (3.0đ) - Chuẩn QMATH CV 1239",
    file: "a4_tn2025_qm_1239.png",
    made_digits: [3, 4], has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TN2025_BGD_1239": {
    name: "Bộ GD 2025 - CV 1239",
    desc: "12 câu TN (3.0đ) + 4 câu Đ/S (4.0đ) + 6 câu TLN (3.0đ) - Chuẩn Bộ GD&ĐT CV 1239",
    file: "a4_tn2025_bgd_1239.png",
    made_digits: [3, 4], has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TN2025_TNMK_1239": {
    name: "TNMaker 2025 - CV 1239",
    desc: "12 câu TN + 4 câu Đ/S + 6 câu TLN - Chuẩn TNMaker CV 1239",
    file: "a4_tn2025_tnmk_1239.jpg",
    made_digits: [3, 4], has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "CV_1239_401612": {
    name: "CV 1239 - 40.16.12",
    desc: "40 câu TN + 4 câu Đ/S (16 ý) + 12 câu TLN - Cấu trúc mở rộng CV 1239",
    file: "cv_1239_40_16_12.jpg",
    made_digits: 4, has_sbd: true,
    p1_num: 40, p2_num: 4, p3_num: 12,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TN2025_AZOTA_1239": {
    name: "Azota 2025 - CV 1239",
    desc: "12 câu TN + 4 câu Đ/S + 6 câu TLN - Chuẩn Azota CV 1239",
    file: "a4_tn2025_azota_1239.jpg",
    made_digits: 4, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_AZOTA_v_32_0": {
    name: "Azota 2025 - TN và TL - CV 1239",
    desc: "Trắc nghiệm OMR kết hợp phần tự luận viết tay - Chuẩn Azota",
    file: "a4_azota_v_32_0.jpg",
    made_digits: 4, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "KHTN_NINHBINH_K9": {
    name: "KHTN - Ninh Bình - Khối 9",
    desc: "Khảo sát Khoa học tự nhiên Ninh Bình Khối 9: 18 câu TN + 4 câu Đ/S + 6 câu TLN",
    file: "khtn_ninhbinh_k9.jpg",
    made_digits: 4, has_sbd: true,
    p1_num: 18, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "UNT_2025_NGANG": {
    name: "UNT 2025 - Ngang",
    desc: "Phiếu ôn tập kiểm tra khổ ngang (12 TN + 4 Đ/S + 6 TLN - Hỗ trợ cả 3 và 4 số)",
    file: "unt_2025_ngang.png",
    made_digits: [3, 4], has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },

  // === NHÓM 2: CÁC MẪU PHIẾU CHUẨN MÃ ĐỀ 3 SỐ (THREEDIGITCODESHEETS) ===
  "A4_TN2025_QM": {
    name: "QM 2025 - A4",
    desc: "40 câu trắc nghiệm 4 lựa chọn bản chuẩn nét cao QMATH (10.0đ)",
    file: "a4_tn2025_qm.png",
    made_digits: 3, has_sbd: true,
    p1_num: 40, p2_num: 0, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0, p2_score_2: 0, p2_score_3: 0, p2_score_4: 0, p3_score: 0
  },
  "QM_2025_TOAN": {
    name: "QM 2025 - Toán",
    desc: "12 câu TN (3.0đ) + 4 câu Đ/S (4.0đ) + 6 câu TLN (3.0đ) môn Toán",
    file: "qm_2025_toan.jpg",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "QM_2025_LY_HOA_SINH_DIA": {
    name: "Địa",
    desc: "Môn Địa lý: 28 câu TN nhiều lựa chọn (7.0đ) + 4 câu Đ/S (3.0đ)",
    file: "qm_2025_ly_hoa_sinh_dia.jpg",
    made_digits: 3, has_sbd: true,
    p1_num: 28, p2_num: 4, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 0.75, p3_score: 0
  },
  "QM_2025_SU_GDCD_CONGNGHE_TIN": {
    name: "GDPL",
    desc: "Môn Giáo dục kinh tế & Pháp luật: 24 câu TN (6.0đ) + 4 câu Đ/S (4.0đ)",
    file: "qm_2025_su_gdcd_congnghe_tin.jpg",
    made_digits: 3, has_sbd: true,
    p1_num: 24, p2_num: 4, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0
  },
  "QM_2025_NGOAI_NGU": {
    name: "QM 2025 - Ngoại ngữ",
    desc: "40 câu trắc nghiệm 4 lựa chọn môn Ngoại ngữ (10.0đ)",
    file: "qm_2025_ngoai_ngu.jpg",
    made_digits: 3, has_sbd: true,
    p1_num: 40, p2_num: 0, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0, p2_score_2: 0, p2_score_3: 0, p2_score_4: 0, p3_score: 0
  },
  "QM_2025_OT_TLN": {
    name: "QM 2025 - Ôn tập - TL ngắn",
    desc: "20 câu Trả lời ngắn chuyên đề ôn tập (0.5đ/câu = 10.0đ)",
    file: "qm_2025_ot_tln.jpg",
    made_digits: 3, has_sbd: true,
    p1_num: 0, p2_num: 0, p3_num: 20,
    p1_score: 0, p2_score_1: 0, p2_score_2: 0, p2_score_3: 0, p2_score_4: 0, p3_score: 0.5
  },
  "A4_TN2025_BGD": {
    name: "Bộ GD 2025 - A4",
    desc: "40 câu trắc nghiệm 4 lựa chọn chuẩn Bộ GD&ĐT (10.0đ)",
    file: "a4_tn2025_bgd.png",
    made_digits: 3, has_sbd: true,
    p1_num: 40, p2_num: 0, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0, p2_score_2: 0, p2_score_3: 0, p2_score_4: 0, p3_score: 0
  },
  "A4_TN2025_TNMK": {
    name: "TNmaker 2025 - A4",
    desc: "40 câu trắc nghiệm 4 lựa chọn chuẩn TNMaker (10.0đ)",
    file: "a4_tn2025_tnmk.png",
    made_digits: 3, has_sbd: true,
    p1_num: 40, p2_num: 0, p3_num: 0,
    p1_score: 0.25, p2_score_1: 0, p2_score_2: 0, p2_score_3: 0, p2_score_4: 0, p3_score: 0
  },
  "A4_TN2025_AZOTA": {
    name: "Azota 2025 - A4",
    desc: "12 câu TN (3.0đ) + 4 câu Đ/S (4.0đ) + 6 câu TLN (3.0đ) chuẩn Azota",
    file: "a4_tn2025_azota.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A5_TN2025_AZOTA": {
    name: "Azota 2025 - A5",
    desc: "Khổ giấy A5 (1/2 trang A4) nhỏ gọn: 12 TN + 4 Đ/S + 6 TLN",
    file: "a5_tn2025_azota.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_TNTL_2025_AZOTA": {
    name: "Azota 2025 - A4 TN và Tự luận",
    desc: "Kết hợp phần trắc nghiệm OMR và phần tự luận học sinh viết tay",
    file: "a4_tntl_2025_azota.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "QM_2025_KHTN_10": {
    name: "QM 2025 - KH Tự Nhiên - 10",
    desc: "Môn Khoa học Tự nhiên lớp 10: 18 câu TN + 4 câu Đ/S + 6 câu TLN",
    file: "qm_2025_khtn_10.png",
    made_digits: 3, has_sbd: true,
    p1_num: 18, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "QM_2025_HSG_30_10_10": {
    name: "QM 2025 - HSG - 30.10.10",
    desc: "Đề thi Học sinh giỏi: 30 câu TN + 10 câu Đ/S + 10 câu TLN",
    file: "qm_2025_hsg_30_10_10.png",
    made_digits: 3, has_sbd: true,
    p1_num: 30, p2_num: 10, p3_num: 10,
    p1_score: 0.2, p2_score_1: 0.1, p2_score_2: 0.2, p2_score_3: 0.3, p2_score_4: 0.4, p3_score: 0.5
  },
  "QM_2025_HSG_30_20_00": {
    name: "QM 2025 - HSG - 30.20.00",
    desc: "Đề thi Học sinh giỏi: 30 câu TN + 20 câu Đ/S (Không có TLN)",
    file: "qm_2025_hsg_30_20_00.png",
    made_digits: 3, has_sbd: true,
    p1_num: 30, p2_num: 20, p3_num: 0,
    p1_score: 0.2, p2_score_1: 0.05, p2_score_2: 0.1, p2_score_3: 0.15, p2_score_4: 0.2, p3_score: 0
  },
  "A4_UNT_2025": {
    name: "UNT 2025 - A4",
    desc: "Phiếu ôn tập & kiểm tra định kỳ (12 TN + 4 Đ/S + 6 TLN - Có SBD)",
    file: "a4_unt_2025.png",
    made_digits: 3, has_sbd: true,
    p1_num: 12, p2_num: 4, p3_num: 6,
    p1_score: 0.25, p2_score_1: 0.1, p2_score_2: 0.25, p2_score_3: 0.5, p2_score_4: 1.0, p3_score: 0.5
  },
  "A4_UNT_NOSBD_2025": {
    name: "UNT 2025 - Phách - A4",
    desc: "Phiếu ôn tập kiểm tra rọc phách (Chỉ ghi họ tên, không quét 6 số báo danh)",
    file: "a4_unt_nosbd_2025.png",
    made_digits: 3, has_sbd: false,
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

const STORAGE_KEY = "QMATH_OMR_DATA_V6";

const defaultSettings = {
  scanSpeed: "normal",          // "fast", "normal", "accurate"
  sensitivity: "normal",        // "high", "normal", "strict"
  soundEnabled: true,
  vibrationEnabled: true,
  viewScoreImmediately: true,
  showAnchors: true,
  warnNoKey: true,
  warnDoubleOrBlank: true,
  scoreRounding: "0.01"
};

const defaultClasses = [
  {
    id: "cls_12a1",
    name: "Lớp 12A1 (Toán THPT)",
    grade: "12",
    students: [
      { sbd: "123456", name: "Nguyễn Văn An" },
      { sbd: "120101", name: "Trần Thị Bình" },
      { sbd: "120102", name: "Lê Hoàng Long" },
      { sbd: "120103", name: "Phạm Minh Thư" },
      { sbd: "120104", name: "Đỗ Quốc Cường" }
    ]
  },
  {
    id: "cls_12a2",
    name: "Lớp 12A2 (Toán Tự Nhiên)",
    grade: "12",
    students: [
      { sbd: "120201", name: "Bùi Tuấn Anh" },
      { sbd: "120202", name: "Vũ Phương Linh" },
      { sbd: "120203", name: "Hoàng Minh Trí" },
      { sbd: "120204", name: "Đặng Mai Phương" },
      { sbd: "120205", name: "Nguyễn Đức Phúc" }
    ]
  },
  {
    id: "cls_12a3",
    name: "Lớp 12A3 (Toán Xã Hội)",
    grade: "12",
    students: [
      { sbd: "120301", name: "Trịnh Gia Huy" },
      { sbd: "120302", name: "Phan Bảo Ngọc" },
      { sbd: "120303", name: "Đinh Quang Khải" },
      { sbd: "120304", name: "Lý Khánh Chi" }
    ]
  }
];

const defaultState = {
  currentTab: "hub",
  currentClassId: "cls_12a1",
  currentExamId: "exam_101",
  activeMade: "101",
  resultsViewMode: "table",
  resultsClassFilter: "all",
  statsClassFilter: "all",
  settings: { ...defaultSettings },
  classes: JSON.parse(JSON.stringify(defaultClasses)),
  exams: [
    {
      id: "exam_101",
      classIds: ["cls_12a1", "cls_12a2", "cls_12a3"],
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
    if (!this.data.settings) this.data.settings = { ...defaultSettings };
    if (!this.data.resultsViewMode) this.data.resultsViewMode = "table";
    if (!this.data.resultsClassFilter) this.data.resultsClassFilter = "all";
    if (!this.data.statsClassFilter) this.data.statsClassFilter = "all";
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("QMATH_OMR_DATA_V5");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
          if (!Array.isArray(parsed.classes) || parsed.classes.length === 0) {
            parsed.classes = JSON.parse(JSON.stringify(defaultClasses));
          }
          if (Array.isArray(parsed.exams)) {
            parsed.exams.forEach(ex => {
              if (!ex.classIds) {
                ex.classIds = ex.classId ? [ex.classId] : [parsed.classes[0].id];
              }
              if (!ex.config) ex.config = {};
              if (ex.config.made_digits === undefined) ex.config.made_digits = 3;
              if (ex.config.has_sbd === undefined) ex.config.has_sbd = true;
            });
          }
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
      return null;
    }
    return this.data.exams.find(e => e.id === this.data.currentExamId) || this.data.exams[0] || null;
  }

  getCurrentClass() {
    if (!this.data.classes || this.data.classes.length === 0) {
      this.data.classes = JSON.parse(JSON.stringify(defaultClasses));
    }
    return this.data.classes.find(c => c.id === this.data.currentClassId) || this.data.classes[0];
  }

  findStudentInfo(sbd, exam = null) {
    if (!sbd || sbd === "------") {
      return { name: "Không quét SBD", classId: "", className: "Tự do" };
    }

    const targetExam = exam || this.getCurrentExam();
    const candidateClasses = [];

    if (targetExam && targetExam.classIds && targetExam.classIds.length > 0) {
      targetExam.classIds.forEach(cId => {
        const c = this.data.classes.find(cls => cls.id === cId);
        if (c) candidateClasses.push(c);
      });
    }

    if (candidateClasses.length === 0) {
      candidateClasses.push(...this.data.classes);
    }

    for (const cls of candidateClasses) {
      const std = cls.students?.find(s => s.sbd === sbd || parseInt(s.sbd, 10) === parseInt(sbd, 10));
      if (std) {
        return { name: std.name, classId: cls.id, className: cls.name };
      }
    }

    return { name: "Thí sinh tự do", classId: "", className: "Tự do" };
  }

  findStudentName(sbd, exam = null) {
    return this.findStudentInfo(sbd, exam).name;
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
}

function playBeep(isSuccess = true) {
  try {
    const settings = (window.appState && window.appState.data.settings) || defaultSettings;
    if (settings.soundEnabled === false) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isSuccess) {
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    }
  } catch (e) {}

  try {
    const settings = (window.appState && window.appState.data.settings) || defaultSettings;
    if (settings.vibrationEnabled !== false && navigator.vibrate) {
      navigator.vibrate(isSuccess ? 80 : [100, 50, 100]);
    }
  } catch (e) {}
}

// =========================================================================
// === YÊU CẦU 1: CẤU HÌNH BÀI THI & CHỌN MẪU PHIẾU (NEWQUIZACTIVITY) ===
// =========================================================================

let editingExamId = null;

function populateExamModalSheetDropdown(madeDigits = 3, selectedKey = null) {
  const select = document.getElementById("examSheetTypeSelect");
  if (!select) return;

  const validEntries = Object.entries(SHEET_TYPES).filter(([k, item]) => {
    if (Array.isArray(item.made_digits)) {
      return item.made_digits.includes(madeDigits);
    }
    return item.made_digits === madeDigits;
  });

  const defaultKey = madeDigits === 4 ? "A4_TN2025_QM_1239" : "A4_TN2025_QM";

  select.innerHTML = validEntries.map(([k, item]) => {
    const isSelected = selectedKey ? (k === selectedKey) : (k === defaultKey || k === validEntries[0][0]);
    return `<option value="${k}" ${isSelected ? "selected" : ""}>${item.name}</option>`;
  }).join("");

  window.onExamSheetTypeChange();
}

window.onExamMadeDigitsChange = function onExamMadeDigitsChange() {
  const checkedRadio = document.querySelector('input[name="examMadeDigits"]:checked');
  const digits = checkedRadio ? parseInt(checkedRadio.value, 10) : 3;
  populateExamModalSheetDropdown(digits, null);
};

window.onExamSheetTypeChange = function onExamSheetTypeChange() {
  const select = document.getElementById("examSheetTypeSelect");
  if (!select) return;
  const sheetKey = select.value;
  const sheet = SHEET_TYPES[sheetKey];
  if (!sheet) return;

  const p1Num = document.getElementById("examP1Num");
  const p1Score = document.getElementById("examP1Score");
  const p2Num = document.getElementById("examP2Num");
  const p2Score1 = document.getElementById("examP2Score1");
  const p2Score2 = document.getElementById("examP2Score2");
  const p2Score3 = document.getElementById("examP2Score3");
  const p2Score4 = document.getElementById("examP2Score4");
  const p3Num = document.getElementById("examP3Num");
  const p3Score = document.getElementById("examP3Score");
  const sbdToggle = document.getElementById("examHasSbdToggle");

  if (!editingExamId) {
    if (p1Num) p1Num.value = sheet.p1_num;
    if (p1Score) p1Score.value = sheet.p1_score;
    if (p2Num) p2Num.value = sheet.p2_num;
    if (p2Score1) p2Score1.value = sheet.p2_score_1;
    if (p2Score2) p2Score2.value = sheet.p2_score_2;
    if (p2Score3) p2Score3.value = sheet.p2_score_3;
    if (p2Score4) p2Score4.value = sheet.p2_score_4;
    if (p3Num) p3Num.value = sheet.p3_num;
    if (p3Score) p3Score.value = sheet.p3_score;
    if (sbdToggle) sbdToggle.checked = Boolean(sheet.has_sbd);
  }

  window.updateExamModalTotalScore();
};

window.updateExamModalTotalScore = function updateExamModalTotalScore() {
  const p1Num = Math.max(0, parseInt(document.getElementById("examP1Num")?.value, 10) || 0);
  const p1Score = window.omrEngine ? window.omrEngine.parseScoreValue(document.getElementById("examP1Score")?.value, 0.25) : 0.25;
  const p2Num = Math.max(0, parseInt(document.getElementById("examP2Num")?.value, 10) || 0);
  const p2Score4 = window.omrEngine ? window.omrEngine.parseScoreValue(document.getElementById("examP2Score4")?.value, 1.0) : 1.0;
  const p3Num = Math.max(0, parseInt(document.getElementById("examP3Num")?.value, 10) || 0);
  const p3Score = window.omrEngine ? window.omrEngine.parseScoreValue(document.getElementById("examP3Score")?.value, 0.5) : 0.5;

  const total = (p1Num * p1Score) + (p2Num * p2Score4) + (p3Num * p3Score);
  const totalScoreEl = document.getElementById("examModalTotalScore");
  if (totalScoreEl) {
    totalScoreEl.innerText = Number.isInteger(total) ? total : total.toFixed(2);
  }
};

window.previewSelectedSheetTemplate = function previewSelectedSheetTemplate(sheetKeyOverride = null) {
  const sheetKey = sheetKeyOverride || document.getElementById("examSheetTypeSelect")?.value || "A4_TN2025_BGD_1239";
  const sheet = SHEET_TYPES[sheetKey];
  if (!sheet) return;

  const modal = document.getElementById("sheetPreviewModal");
  const img = document.getElementById("sheetPreviewImg");
  const title = document.getElementById("sheetPreviewTitle");
  const desc = document.getElementById("sheetPreviewDesc");
  const dlLink = document.getElementById("sheetPreviewDownloadLink");

  if (title) title.innerText = sheet.name;
  if (desc) desc.innerText = sheet.desc;
  if (img) img.src = `samples/${sheet.file}`;
  if (dlLink) {
    dlLink.href = `samples/${sheet.file}`;
    dlLink.download = sheet.file;
  }
  if (modal) modal.classList.remove("hidden");
};

window.closeSheetPreviewModal = function closeSheetPreviewModal() {
  const modal = document.getElementById("sheetPreviewModal");
  if (modal) modal.classList.add("hidden");
};

// Hiển thị danh sách checkbox các lớp cho Modal Tạo/Sửa bài thi
function renderExamModalClassCheckboxes(selectedClassIds = []) {
  const container = document.getElementById("examClassCheckboxesList");
  if (!container || !window.appState) return;

  const classes = window.appState.data.classes || [];
  let html = `
    <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-700">
        <label class="inline-flex items-center space-x-1.5 font-bold text-xs text-blue-600 dark:text-blue-400 cursor-pointer">
          <input type="checkbox" id="chkSelectAllClasses" onchange="window.toggleSelectAllExamClasses(this.checked)" class="w-4 h-4 accent-blue-600 rounded">
          <span>Chọn tất cả các lớp (${classes.length} lớp)</span>
        </label>
        <span class="text-[11px] text-slate-400">1 bài có thể cài cho nhiều lớp</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
  `;

  classes.forEach(c => {
    const isChecked = selectedClassIds.length === 0 || selectedClassIds.includes(c.id);
    const count = (c.students || []).length;
    html += `
      <label class="inline-flex items-center space-x-2 py-1 px-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 cursor-pointer text-xs">
        <input type="checkbox" name="examAssignedClass" value="${c.id}" ${isChecked ? "checked" : ""} class="w-3.5 h-3.5 accent-blue-600 rounded">
        <span class="font-medium text-slate-800 dark:text-slate-200 truncate">${c.name}</span>
        <span class="text-[10px] text-slate-400 font-mono">(${count} HS)</span>
      </label>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

window.toggleSelectAllExamClasses = function toggleSelectAllExamClasses(isChecked) {
  const checkboxes = document.querySelectorAll('input[name="examAssignedClass"]');
  checkboxes.forEach(cb => { cb.checked = isChecked; });
};

window.showCreateExamModal = function showCreateExamModal() {
  editingExamId = null;
  const modal = document.getElementById("createExamModal");
  if (!modal) return;

  const titleEl = document.getElementById("createExamModalTitle");
  if (titleEl) titleEl.innerText = "Bài kiểm tra mới";

  const nameInput = document.getElementById("newExamNameInput");
  if (nameInput) {
    const nextIdx = (window.appState.data.exams ? window.appState.data.exams.length : 0) + 1;
    nameInput.value = `Kiểm tra Toán ${nextIdx}`;
  }

  const radio3 = document.querySelector('input[name="examMadeDigits"][value="3"]');
  if (radio3) radio3.checked = true;
  populateExamModalSheetDropdown(3, "A4_TN2025_BGD_1239");

  const allClasses = (window.appState.data.classes || []).map(c => c.id);
  renderExamModalClassCheckboxes(allClasses);

  window.updateExamModalTotalScore();
  modal.classList.remove("hidden");
};

window.showEditCurrentExamModal = function showEditCurrentExamModal() {
  const exam = window.appState.getCurrentExam();
  if (!exam) {
    window.showCreateExamModal();
    return;
  }

  editingExamId = exam.id;
  const modal = document.getElementById("createExamModal");
  if (!modal) return;

  const titleEl = document.getElementById("createExamModalTitle");
  if (titleEl) titleEl.innerText = "Chỉnh sửa cấu hình bài kiểm tra";

  const nameInput = document.getElementById("newExamNameInput");
  if (nameInput) nameInput.value = exam.name;

  const digits = exam.config?.made_digits === 4 ? 4 : 3;
  const radio = document.querySelector(`input[name="examMadeDigits"][value="${digits}"]`);
  if (radio) radio.checked = true;

  populateExamModalSheetDropdown(digits, exam.sheet_type);

  const cfg = exam.config || {};
  const setVal = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.value = val; };
  setVal("examP1Num", cfg.p1_num);
  setVal("examP1Score", cfg.p1_score);
  setVal("examP2Num", cfg.p2_num);
  setVal("examP2Score1", cfg.p2_score_1);
  setVal("examP2Score2", cfg.p2_score_2);
  setVal("examP2Score3", cfg.p2_score_3);
  setVal("examP2Score4", cfg.p2_score_4);
  setVal("examP3Num", cfg.p3_num);
  setVal("examP3Score", cfg.p3_score);

  const sbdToggle = document.getElementById("examHasSbdToggle");
  if (sbdToggle) sbdToggle.checked = Boolean(cfg.has_sbd);

  renderExamModalClassCheckboxes(exam.classIds || []);

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
  for (let q = 1; q <= p2Num; q++) {
    const qStr = String(q);
    newP2[qStr] = (keyObj.part2 && keyObj.part2[qStr]) ? [...keyObj.part2[qStr]] : ["Đ", "S", "Đ", "S"];
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
  const checkedRadio = document.querySelector('input[name="examMadeDigits"]:checked');
  const sbdToggle = document.getElementById("examHasSbdToggle");

  const name = (nameInput && nameInput.value.trim()) || "Bài kiểm tra mới";
  const sheetTypeKey = (sheetTypeSelect && sheetTypeSelect.value) || "A4_TN2025_BGD_1239";
  const madeDigits = checkedRadio ? parseInt(checkedRadio.value, 10) : 3;
  const hasSbd = sbdToggle ? sbdToggle.checked : true;

  // Lấy danh sách các lớp được tích chọn
  const checkedBoxes = document.querySelectorAll('input[name="examAssignedClass"]:checked');
  const selectedClassIds = Array.from(checkedBoxes).map(cb => cb.value);
  if (selectedClassIds.length === 0 && (window.appState.data.classes || []).length > 0) {
    selectedClassIds.push(window.appState.data.classes[0].id);
  }

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
    p2_num: p2Num,
    p3_num: p3Num,
    p1_score: p1Score,
    p2_score_1: p2Score1,
    p2_score_2: p2Score2,
    p2_score_3: p2Score3,
    p2_score_4: p2Score4,
    p3_score: p3Score
  };

  if (editingExamId) {
    const exam = window.appState.data.exams.find(e => e.id === editingExamId);
    if (exam) {
      exam.name = name;
      exam.sheet_type = sheetTypeKey;
      exam.classIds = selectedClassIds;
      exam.config = newConfig;

      // Đồng bộ đáp án theo cấu hình mới
      Object.keys(exam.answerKeys || {}).forEach(mCode => {
        exam.answerKeys[mCode] = resizeAnswerKeyToConfig(exam.answerKeys[mCode], newConfig);
      });
    }
  } else {
    const newExamId = "exam_" + Date.now().toString(36);
    const defaultCode = madeDigits === 4 ? "0101" : "101";
    const initialKey = createDefaultKey(newConfig);

    const newExam = {
      id: newExamId,
      classIds: selectedClassIds,
      name: name,
      sheet_type: sheetTypeKey,
      date: new Date().toISOString().split("T")[0],
      config: newConfig,
      answerKeys: {
        [defaultCode]: initialKey
      }
    };

    window.appState.data.exams.unshift(newExam);
    window.appState.data.currentExamId = newExamId;
    window.appState.data.activeMade = defaultCode;
  }

  window.appState.save();
  window.updateExamSelect();
  window.renderExamHub();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
  window.renderResultsTable && window.renderResultsTable();
  window.closeCreateExamModal();
  playBeep(true);
};

// YÊU CẦU 3: LOẠI BỎ VIỆC PHẢI GIỮ LẠI 1 BÀI THI - CHO PHÉP XÓA HẾT BẤT KỲ LÚC NÀO
window.deleteCurrentExam = function deleteCurrentExam() {
  const exam = window.appState.getCurrentExam();
  if (!exam) return;

  if (confirm(`Bạn có chắc chắn muốn xóa bài kiểm tra "${exam.name}" và toàn bộ bài đã chấm của nó?`)) {
    window.appState.data.results = window.appState.data.results.filter(r => r.examId !== exam.id);
    window.appState.data.exams = window.appState.data.exams.filter(e => e.id !== exam.id);
    window.appState.data.currentExamId = window.appState.data.exams.length > 0 ? window.appState.data.exams[0].id : null;
    window.appState.save();

    window.updateExamSelect();
    window.renderExamHub();
    window.renderVisualAnswerSheet();
    window.renderResultsTable();
    playBeep(true);
  }
};

// =========================================================================
// === TỔNG QUAN BÀI THI (EXAM HUB) ===
// =========================================================================

window.renderExamHub = function renderExamHub() {
  const exam = window.appState.getCurrentExam();
  const hubContainer = document.getElementById("tabContent_hub");
  if (!hubContainer) return;

  // Nếu không có bài thi nào (đã xóa hết) -> hiển thị màn hình trống thân thiện
  if (!exam) {
    hubContainer.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-lg mx-auto my-6">
        <div class="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-3xl flex items-center justify-center mx-auto shadow-inner">
          📝
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Chưa Có Bài Kiểm Tra Nào</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Bạn đã xóa hết bài kiểm tra. Hãy bấm nút bên dưới để tạo bài kiểm tra mới, chọn loại phiếu và cài đặt thang điểm.
          </p>
        </div>
        <button onclick="window.showCreateExamModal()" class="btn-primary py-2.5 px-6 rounded-xl text-xs font-bold shadow-md inline-flex items-center space-x-2">
          <span>+ Tạo Bài Kiểm Tra Mới</span>
        </button>
      </div>
    `;
    return;
  }

  // Khôi phục khung HTML chuẩn nếu trước đó bị trống
  if (!document.getElementById("hubExamTitle")) {
    window.location.reload();
    return;
  }

  const titleEl = document.getElementById("hubExamTitle");
  const dateEl = document.getElementById("hubExamDate");
  const keyCountBadge = document.getElementById("hubKeyCountBadge");
  const gradedCountBadge = document.getElementById("hubGradedCountBadge");
  const classNameBadge = document.getElementById("hubClassNameBadge");
  const qSummary = document.getElementById("hubSummaryQuestions");
  const sheetSummary = document.getElementById("hubSummarySheet");
  const sbdSummary = document.getElementById("hubSummarySbdText");
  const totalScoreSummary = document.getElementById("hubSummaryTotalScore");

  if (titleEl) titleEl.innerText = exam.name;
  if (dateEl) dateEl.innerText = exam.date || new Date().toISOString().split("T")[0];

  const keyCount = Object.keys(exam.answerKeys || {}).length;
  if (keyCountBadge) keyCountBadge.innerText = `${keyCount} mã đề`;

  const examResults = window.appState.data.results.filter(r => r.examId === exam.id);
  if (gradedCountBadge) gradedCountBadge.innerText = `${examResults.length} bài`;

  // Hiển thị các lớp được gán cho bài thi này
  if (classNameBadge) {
    const assignedClasses = (exam.classIds || []).map(cId => {
      const c = window.appState.data.classes.find(cls => cls.id === cId);
      return c ? c.name : null;
    }).filter(Boolean);

    if (assignedClasses.length === 0) {
      classNameBadge.innerText = "Tất cả các lớp";
    } else if (assignedClasses.length === 1) {
      classNameBadge.innerText = assignedClasses[0];
    } else {
      classNameBadge.innerText = `${assignedClasses.length} lớp học`;
    }
  }

  const cfg = exam.config || {};
  if (qSummary) {
    const p1 = cfg.p1_num !== undefined ? cfg.p1_num : 12;
    const p2 = cfg.p2_num !== undefined ? cfg.p2_num : 4;
    const p3 = cfg.p3_num !== undefined ? cfg.p3_num : 6;
    qSummary.innerText = `${p1}; ${p2}; ${p3} câu (P.I: ${p1}, P.II: ${p2}, P.III: ${p3})`;
  }

  const sheet = SHEET_TYPES[exam.sheet_type] || SHEET_TYPES["A4_TN2025_BGD_1239"];
  if (sheetSummary) {
    sheetSummary.innerText = `Phiếu: ${sheet.name} (${cfg.made_digits || 3} số)`;
  }

  if (sbdSummary) {
    sbdSummary.innerText = cfg.has_sbd !== false ? "Quét số báo danh (6 số)" : "Không quét SBD";
  }

  if (totalScoreSummary) {
    const p1Score = (cfg.p1_num || 0) * (cfg.p1_score || 0.25);
    const p2Score = (cfg.p2_num || 0) * (cfg.p2_score_4 || 1.0);
    const p3Score = (cfg.p3_num || 0) * (cfg.p3_score || 0.5);
    const sum = p1Score + p2Score + p3Score;
    totalScoreSummary.innerText = `Tổng điểm: ${Number.isInteger(sum) ? sum : sum.toFixed(2)}`;
  }
};

// =========================================================================
// === YÊU CẦU 2: BẢNG ĐÁP ÁN TRỰC QUAN & THANH MÃ ĐỀ TINH GỌN ===
// =========================================================================

window.triggerExcelKeyUpload = function triggerExcelKeyUpload() {
  const input = document.getElementById("excelKeyFileInput");
  if (input) input.click();
};

window.handleExcelKeyUpload = function handleExcelKeyUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const exam = window.appState.getCurrentExam();
      if (!exam) {
        alert("Vui lòng tạo bài kiểm tra trước!");
        return;
      }

      let importedKeysCount = 0;
      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (!json || json.length === 0) return;

        let detectedMade = sheetName.replace(/[^0-9]/g, "");
        if (!detectedMade || detectedMade.length < 3) {
          detectedMade = String(Object.keys(exam.answerKeys).length + 101);
        }

        const newKey = createDefaultKey(exam.config);
        json.forEach(row => {
          if (!row || row.length < 2) return;
          const qCol = String(row[0]).trim();
          const ansCol = String(row[1]).trim().toUpperCase();

          const p1Match = qCol.match(/(?:câu\s*)?(\d+)/i);
          if (p1Match) {
            const qNum = parseInt(p1Match[1], 10);
            if (qNum >= 1 && qNum <= exam.config.p1_num) {
              if (["A", "B", "C", "D"].includes(ansCol[0])) {
                newKey.part1[qNum - 1] = ansCol[0];
              }
            }
          }
        });

        exam.answerKeys[detectedMade] = newKey;
        importedKeysCount++;
        window.appState.data.activeMade = detectedMade;
      });

      window.appState.save();
      window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
      window.renderExamHub && window.renderExamHub();
      alert(`Đã nạp thành công ${importedKeysCount} mã đề từ file Excel!`);
    } catch (err) {
      console.error("Excel import error:", err);
      alert("Lỗi khi đọc file Excel: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = "";
};

window.downloadExcelKeyTemplate = function downloadExcelKeyTemplate() {
  const exam = window.appState.getCurrentExam();
  const p1Num = (exam && exam.config && exam.config.p1_num) || 12;

  const wb = XLSX.utils.book_new();
  const sampleRows = [["Câu", "Đáp Án", "Ghi Chú"]];
  const sampleChoices = ["A", "B", "C", "D"];
  for (let i = 1; i <= p1Num; i++) {
    sampleRows.push([i, sampleChoices[(i - 1) % 4], ""]);
  }

  const ws = XLSX.utils.aoa_to_sheet(sampleRows);
  ws["!cols"] = [{ wch: 10 }, { wch: 12 }, { wch: 25 }];
  XLSX.utils.book_append_sheet(wb, ws, "101");

  XLSX.writeFile(wb, "Mau_Dap_An_QMATH.xlsx");
};

// QUÉT QR CODE ĐÁP ÁN BẰNG CAMERA HOẶC ẢNH
let qrStream = null;
let qrScanAnimId = null;

window.openQRScannerModal = function openQRScannerModal() {
  const modal = document.getElementById("qrScannerModal");
  if (!modal) return;
  modal.classList.remove("hidden");

  const video = document.getElementById("qrVideoFeed");
  const statusEl = document.getElementById("qrCameraStatus");
  if (!video) return;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        qrStream = stream;
        video.srcObject = stream;
        video.play();
        if (statusEl) statusEl.innerText = "Hướng camera vào mã QR...";

        const checkQR = () => {
          if (video.readyState === video.HAVE_ENOUGH_DATA && typeof jsQR === "function") {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imgData.data, imgData.width, imgData.height);
            if (code && code.data) {
              handleQRDataImport(code.data);
              window.closeQRScannerModal();
              return;
            }
          }
          qrScanAnimId = requestAnimationFrame(checkQR);
        };
        qrScanAnimId = requestAnimationFrame(checkQR);
      })
      .catch(err => {
        if (statusEl) statusEl.innerText = "Không thể mở camera quét QR. Hãy dùng nút 'Tải ảnh QR'.";
      });
  }
};

window.closeQRScannerModal = function closeQRScannerModal() {
  const modal = document.getElementById("qrScannerModal");
  if (modal) modal.classList.add("hidden");
  stopQRCamera();
};

function stopQRCamera() {
  if (qrScanAnimId) {
    cancelAnimationFrame(qrScanAnimId);
    qrScanAnimId = null;
  }
  if (qrStream) {
    qrStream.getTracks().forEach(t => t.stop());
    qrStream = null;
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
      if (typeof jsQR === "function") {
        const code = jsQR(imgData.data, imgData.width, imgData.height);
        if (code && code.data) {
          handleQRDataImport(code.data);
          window.closeQRScannerModal();
        } else {
          alert("Không tìm thấy mã QR hợp lệ trong bức ảnh này!");
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
    if (!exam) return;

    if (qrStr.startsWith("{") && qrStr.endsWith("}")) {
      const parsed = JSON.parse(qrStr);
      if (parsed.made && (parsed.part1 || parsed.part2 || parsed.part3)) {
        exam.answerKeys[parsed.made] = {
          part1: parsed.part1 || Array(exam.config.p1_num).fill(""),
          part2: parsed.part2 || {},
          part3: parsed.part3 || Array(exam.config.p3_num).fill("")
        };
        window.appState.data.activeMade = parsed.made;
        window.appState.save();
        window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
        playBeep(true);
        alert(`Đã nạp thành công mã đề ${parsed.made} từ mã QR!`);
        return;
      }
    }

    const cleanMade = (exam.config.made_digits === 4 ? "0101" : "101");
    const newKey = createDefaultKey(exam.config);
    const cleanLetters = qrStr.replace(/[^A-Za-z]/g, "").toUpperCase();
    for (let i = 0; i < exam.config.p1_num && i < cleanLetters.length; i++) {
      newKey.part1[i] = cleanLetters[i];
    }
    exam.answerKeys[cleanMade] = newKey;
    window.appState.data.activeMade = cleanMade;
    window.appState.save();
    window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
    playBeep(true);
    alert(`Đã nạp đáp án mã đề ${cleanMade} từ chuỗi ký tự QR!`);
  } catch (err) {
    alert("Dữ liệu mã QR không đúng định dạng đáp án QMATH!");
  }
}

window.showQRCodeShareModal = function showQRCodeShareModal(made) {
  const modal = document.getElementById("qrShareModal");
  if (!modal) return;

  const exam = window.appState.getCurrentExam();
  if (!exam) return;

  const curKey = exam.answerKeys[made];
  if (!curKey) return;

  document.getElementById("qrShareExamName").innerText = exam.name;
  document.getElementById("qrShareMade").innerText = made;

  const qrcodeContainer = document.getElementById("qrcodeDisplay");
  qrcodeContainer.innerHTML = "";

  const payload = JSON.stringify({
    app: "QMATH_2025",
    made: made,
    part1: curKey.part1,
    part2: curKey.part2,
    part3: curKey.part3
  });

  new QRCode(qrcodeContainer, {
    text: payload,
    width: 180,
    height: 180,
    colorDark: "#0f172a",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });

  modal.classList.remove("hidden");
};

window.closeQRShareModal = function closeQRShareModal() {
  const modal = document.getElementById("qrShareModal");
  if (modal) modal.classList.add("hidden");
};

window.addNewMadePrompt = function addNewMadePrompt() {
  const exam = window.appState.getCurrentExam();
  if (!exam) return;
  const digits = (exam.config && exam.config.made_digits === 4) ? 4 : 3;

  const nextCodeNum = Object.keys(exam.answerKeys || {}).length + 101;
  const defaultCode = digits === 4 ? String(nextCodeNum).padStart(4, "0") : String(nextCodeNum);

  const inputCode = prompt(`Nhập mã đề thi mới (${digits} chữ số):`, defaultCode);
  if (!inputCode) return;

  const cleanCode = inputCode.trim();
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
  if (!exam) return;
  const codes = Object.keys(exam.answerKeys || {});
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
  if (!exam) return;
  const curKey = exam.answerKeys[made];
  const p1Text = prompt("Nhập chuỗi đáp án Phần I (ví dụ ABCDABCDABCD):", (curKey.part1 || []).join(""));
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
  if (!exam || !exam.answerKeys[made]) return;
  exam.answerKeys[made].part1[qIdx] = exam.answerKeys[made].part1[qIdx] === opt ? "" : opt;
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
};

window.setPart2Answer = function setPart2Answer(made, qKey, subIdx, val) {
  const exam = window.appState.getCurrentExam();
  if (!exam || !exam.answerKeys[made]) return;
  if (!exam.answerKeys[made].part2[qKey]) {
    exam.answerKeys[made].part2[qKey] = ["", "", "", ""];
  }
  exam.answerKeys[made].part2[qKey][subIdx] = exam.answerKeys[made].part2[qKey][subIdx] === val ? "" : val;
  window.appState.save();
  window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
};

window.setPart3Answer = function setPart3Answer(made, qIdx, val) {
  const exam = window.appState.getCurrentExam();
  if (!exam || !exam.answerKeys[made]) return;
  exam.answerKeys[made].part3[qIdx] = val.trim();
  window.appState.save();
};

// BẢNG ĐÁP ÁN TRỰC QUAN & THANH MÃ ĐỀ TINH GỌN, SẠCH SẼ
window.renderVisualAnswerSheet = function renderVisualAnswerSheet() {
  const exam = window.appState.getCurrentExam();
  const container = document.getElementById("visualAnswerSheetContainer");
  const topControl = document.getElementById("examDetailControlWrap");
  if (!container) return;

  if (!exam) {
    if (topControl) topControl.classList.add("hidden");
    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-xl p-8 text-center text-slate-400">
        Vui lòng tạo bài kiểm tra trước khi cài đặt đáp án.
      </div>
    `;
    return;
  }
  if (topControl) topControl.classList.remove("hidden");

  const titleEl = document.getElementById("examDetailTitle");
  const badgeEl = document.getElementById("examSheetBadge");
  const sheetInfo = window.SHEET_TYPES[exam.sheet_type] || window.SHEET_TYPES["A4_TN2025_BGD_1239"];
  const digits = (exam.config && exam.config.made_digits === 4) ? 4 : 3;

  if (titleEl) titleEl.innerText = exam.name;
  if (badgeEl) badgeEl.innerText = `${sheetInfo.name} • Mã đề ${digits} số`;

  const codes = Object.keys(exam.answerKeys || {});
  if (codes.length === 0) {
    const dCode = digits === 4 ? "0101" : "101";
    exam.answerKeys = { [dCode]: createDefaultKey(exam.config) };
    window.appState.data.activeMade = dCode;
    window.appState.save();
  }

  if (!exam.answerKeys[window.appState.data.activeMade]) {
    window.appState.data.activeMade = Object.keys(exam.answerKeys)[0];
  }
  const curMade = window.appState.data.activeMade;
  const curKey = exam.answerKeys[curMade] || createDefaultKey(exam.config);

  const p1Num = exam.config.p1_num !== undefined ? exam.config.p1_num : 12;
  const p2Num = exam.config.p2_num !== undefined ? exam.config.p2_num : 0;
  const p3Num = exam.config.p3_num !== undefined ? exam.config.p3_num : 0;

  let sheetHtml = `
    <div class="space-y-3">
      <!-- THANH CHỌN MÃ ĐỀ & HÀNH ĐỘNG GỌN GÀNG (YÊU CẦU 2) -->
      <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
        <div class="flex items-center space-x-1.5 overflow-x-auto py-0.5 max-w-full">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Mã đề:</span>
          ${Object.keys(exam.answerKeys).map(c => `
            <button onclick="window.selectActiveMade('${c}')" class="code-tab-btn ${c === curMade ? "active" : ""}">
              ${c}
            </button>
          `).join("")}
          <button onclick="window.addNewMadePrompt()" class="py-1 px-2.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold hover:border-blue-500 hover:text-blue-600 transition shrink-0">
            + Thêm mã
          </button>
        </div>

        <div class="flex items-center space-x-1.5 text-xs">
          <button onclick="window.showQRCodeShareModal('${curMade}')" class="btn-secondary py-1 px-2.5 rounded-lg font-semibold flex items-center space-x-1">
            <span>📱 QR chia sẻ</span>
          </button>
          <button onclick="window.quickTextPastePrompt('${curMade}')" class="btn-secondary py-1 px-2.5 rounded-lg font-semibold flex items-center space-x-1">
            <span>⚡ Dán text</span>
          </button>
          <button onclick="window.deleteCurrentMade('${curMade}')" class="btn-danger py-1 px-2 rounded-lg font-semibold" title="Xóa mã đề này">
            Xóa
          </button>
        </div>
      </div>

      <!-- BẢNG TÔ ĐÁP ÁN GỌN GÀNG -->
      <div class="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
  `;

  if (p1Num > 0) {
    sheetHtml += `
      <div>
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Phần I: Nhiều Lựa Chọn (${p1Num} câu - ${exam.config.p1_score || 0.25}đ/câu)
          </h4>
          <span class="text-[10px] text-slate-400">Chạm để chọn/đổi</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
    `;

    for (let q = 0; q < p1Num; q++) {
      const qNum = q + 1;
      const curAns = curKey.part1[q] || "";

      sheetHtml += `
        <div class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
          <span class="font-mono font-bold text-xs text-slate-500 w-6">#${qNum}</span>
          <div class="flex items-center space-x-1">
            ${["A", "B", "C", "D"].map(opt => `
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
    sheetHtml += `
      <div class="border-t border-slate-100 dark:border-slate-800 pt-3">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Phần II: Đúng / Sai (${p2Num} câu - 4 ý a, b, c, d)
          </h4>
          <span class="text-[10px] text-slate-400">Đ: Xanh | S: Đỏ</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
    `;

    for (let q = 0; q < p2Num; q++) {
      const qNum = q + 1;
      const qKey = String(qNum);
      const subs = curKey.part2[qKey] || ["", "", "", ""];
      const subLabels = ["a", "b", "c", "d"];

      sheetHtml += `
        <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <div class="font-bold text-[11px] text-slate-700 dark:text-slate-300 mb-1.5 pb-1 border-b border-slate-200 dark:border-slate-700">
            CÂU ${qNum}
          </div>
          <div class="space-y-1">
            ${subLabels.map((sLabel, sIdx) => {
              const val = subs[sIdx] || "";
              return `
                <div class="flex items-center justify-between text-xs">
                  <span class="font-mono font-medium text-slate-500">${sLabel})</span>
                  <div class="flex items-center space-x-1">
                    <button onclick="window.setPart2Answer('${curMade}', '${qKey}', ${sIdx}, 'Đ')" class="bubble-tf ${val === "Đ" ? "selected-true" : ""}">Đ</button>
                    <button onclick="window.setPart2Answer('${curMade}', '${qKey}', ${sIdx}, 'S')" class="bubble-tf ${val === "S" ? "selected-false" : ""}">S</button>
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
      <div class="border-t border-slate-100 dark:border-slate-800 pt-3">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Phần III: Trả Lời Ngắn (${p3Num} câu - ${exam.config.p3_score || 0.5}đ/câu)
          </h4>
          <span class="text-[10px] text-slate-400">Điền số</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
    `;

    for (let q = 0; q < p3Num; q++) {
      const qNum = q + 1;
      const curAns = curKey.part3[q] || "";

      sheetHtml += `
        <div class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <label class="block font-bold text-[10px] text-slate-500 mb-1">CÂU ${qNum}</label>
          <input type="text" value="${curAns}" onchange="window.setPart3Answer('${curMade}', ${q}, this.value)" placeholder="0.0" class="w-full py-1 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-xs text-center text-slate-900 dark:text-white focus:outline-none focus:border-blue-600">
        </div>
      `;
    }
    sheetHtml += `</div></div>`;
  }

  sheetHtml += `</div></div>`;
  container.innerHTML = sheetHtml;
};

// =========================================================================
// === CAMERA SCANNER & CORNER TRACKING LOOP (CÔNG NGHỆ APP QM) ===
// =========================================================================

let currentFacingMode = "environment";
let activeCameraStream = null;
let cornerTrackingTimer = null;
let isAutoScanActive = true;
let isScanningInProgress = false;
let currentTorchState = false;
let lastGradedRecordId = null;
let consecutiveLockedFrames = 0;
let lastScanFrameTime = 0;
let scanCooldownUntil = 0;
let lastGradedKey = "";
let lastGradedTime = 0;
let currentZoomLevel = 1.0;
let availableZoomCapabilities = null;

function updateZoomButtonsUI(caps, currentVal) {
  const wrap = document.getElementById("zoomControlGroup");
  if (!wrap) return;

  if (!caps) {
    wrap.classList.add("hidden");
    return;
  }

  wrap.classList.remove("hidden");
  const minZ = caps.min || 1.0;
  const maxZ = caps.max || 1.0;

  const presets = [];
  if (minZ < 0.95) presets.push(Number(minZ.toFixed(1)));
  presets.push(1.0);
  if (maxZ >= 2.0) presets.push(2.0);

  const uniquePresets = Array.from(new Set(presets)).sort((a, b) => a - b);

  wrap.innerHTML = uniquePresets.map(z => {
    const isActive = Math.abs(currentVal - z) < 0.15;
    const label = z < 1.0 ? `${z}x (Rộng)` : `${z}x`;
    return `<button type="button" onclick="window.setCameraZoom(${z})" class="px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-sm ${
      isActive
        ? "bg-emerald-500 text-white ring-2 ring-emerald-300"
        : "bg-black/60 text-white/90 hover:bg-black/80"
    }">${label}</button>`;
  }).join("");
}

window.setCameraZoom = async function setCameraZoom(val) {
  if (!activeCameraStream) return;
  const track = activeCameraStream.getVideoTracks()[0];
  if (!track || !track.applyConstraints) return;

  try {
    let target = parseFloat(val);
    if (availableZoomCapabilities) {
      target = Math.max(availableZoomCapabilities.min, Math.min(availableZoomCapabilities.max, target));
    }
    await track.applyConstraints({ advanced: [{ zoom: target }] });
    currentZoomLevel = target;
    updateZoomButtonsUI(availableZoomCapabilities, currentZoomLevel);
  } catch (e) {
    console.warn("Set zoom failed:", e);
  }
};

async function initCamera() {
  stopCameraAndLoop();
  const video = document.getElementById("scannerVideo");
  if (!video) return;

  const statusEl = document.getElementById("cameraStatus");
  if (statusEl) {
    statusEl.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>Đang mở camera...`;
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
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    activeCameraStream = stream;
    video.srcObject = stream;
    await video.play();

    // Khai thác Camera Zoom API: tự động chọn góc rộng nhất nếu camera hỗ trợ
    const track = stream.getVideoTracks()[0];
    if (track && track.getCapabilities) {
      const caps = track.getCapabilities();
      if (caps && caps.zoom) {
        availableZoomCapabilities = caps.zoom;
        const defaultZoom = caps.zoom.min < 0.95 ? caps.zoom.min : 1.0;
        try {
          await track.applyConstraints({ advanced: [{ zoom: defaultZoom }] });
          currentZoomLevel = defaultZoom;
        } catch (e) {}
        updateZoomButtonsUI(caps.zoom, currentZoomLevel);
      } else {
        availableZoomCapabilities = null;
        updateZoomButtonsUI(null, 1.0);
      }
    } else {
      availableZoomCapabilities = null;
      updateZoomButtonsUI(null, 1.0);
    }

    if (statusEl) {
      statusEl.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>Camera sẵn sàng`;
    }

    startCornerTrackingLoop();
  } catch (err) {
    console.warn("Camera init error:", err);
    if (statusEl) {
      statusEl.innerHTML = `<span class="text-rose-500 font-semibold">⚠️ Không thể mở camera. Hãy dùng nút 'Tải ảnh phiếu'.</span>`;
    }
    const box = document.getElementById("cameraErrorBox");
    if (box) box.classList.remove("hidden");
  }
}

function stopCameraAndLoop() {
  if (cornerTrackingTimer) {
    cancelAnimationFrame(cornerTrackingTimer);
    cornerTrackingTimer = null;
  }
  if (activeCameraStream) {
    activeCameraStream.getTracks().forEach(t => t.stop());
    activeCameraStream = null;
  }
  const video = document.getElementById("scannerVideo");
  if (video) video.srcObject = null;
}

function updateCornerSquaresUI(cornerStatus, lockedCount) {
  const ids = ['cornerBoxTL', 'cornerBoxTR', 'cornerBoxBR', 'cornerBoxBL'];
  ids.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (!el) return;
    const isLocked = !!(cornerStatus && cornerStatus[idx]);
    if (isLocked) {
      el.classList.add('locked');
    } else {
      el.classList.remove('locked');
    }
  });

  const badge = document.getElementById('cornerLockBadge');
  if (badge) {
    if (Date.now() < scanCooldownUntil) {
      badge.className = 'inline-flex items-center px-3.5 py-1 bg-blue-600/90 text-white text-[11px] rounded-full font-bold shadow-md';
      badge.innerText = '✓ Đã chấm xong! Hãy đưa bài tiếp theo vào...';
    } else if (lockedCount === 4) {
      badge.className = 'inline-flex items-center px-3.5 py-1 bg-emerald-600 text-white text-[11px] rounded-full font-bold shadow-lg animate-pulse ring-2 ring-emerald-300';
      badge.innerText = `🎯 Đã khóa 4 góc chuẩn QM! Giữ yên (${consecutiveLockedFrames}/2)...`;
    } else if (lockedCount > 0) {
      badge.className = 'inline-flex items-center px-3.5 py-1 bg-black/80 backdrop-blur-md text-amber-400 text-[11px] rounded-full font-bold border border-amber-500/40 shadow';
      badge.innerText = `🎯 Đã bắt ${lockedCount}/4 góc... Căn nốt các góc còn lại`;
    } else {
      badge.className = 'inline-flex items-center px-3.5 py-1 bg-black/80 backdrop-blur-md text-emerald-400 text-[11px] rounded-full font-bold border border-emerald-500/40 shadow';
      badge.innerText = '🎯 Căn 4 ô đen vào đúng 4 ô vuông xanh';
    }
  }
}

function triggerFlashOverlay() {
  const fl = document.getElementById('scannerFlashOverlay');
  if (fl) {
    fl.classList.add('active');
    setTimeout(() => { fl.classList.remove('active'); }, 180);
  }
}

function startCornerTrackingLoop() {
  const video = document.getElementById('scannerVideo');
  if (!video) return;

  const checkFrame = (now) => {
    if (!activeCameraStream || video.paused || video.ended || video.readyState < 2) {
      cornerTrackingTimer = requestAnimationFrame(checkFrame);
      return;
    }

    if (isScanningInProgress) {
      cornerTrackingTimer = requestAnimationFrame(checkFrame);
      return;
    }

    // Nhịp quét 80ms (~12 fps) tối ưu CPU mượt mà trên mọi thiết bị
    if (now - lastScanFrameTime < 80) {
      cornerTrackingTimer = requestAnimationFrame(checkFrame);
      return;
    }
    lastScanFrameTime = now;

    try {
      const cornerResult = window.omrEngine.checkVideoFrameCorners(video);
      updateCornerSquaresUI(cornerResult.cornerStatus, cornerResult.lockedCount);

      if (cornerResult.lockedCount === 4) {
        consecutiveLockedFrames++;
        const requiredFrames = 2; // Cần 2 frame liên tiếp chuẩn QM để xác nhận ổn định

        // Nếu đã đủ 2 frame ổn định và hết thời gian cooldown
        if (isAutoScanActive && consecutiveLockedFrames >= requiredFrames && Date.now() > scanCooldownUntil) {
          consecutiveLockedFrames = 0;
          isScanningInProgress = true;

          try {
            const exam = window.appState.getCurrentExam();
            if (exam) {
              triggerFlashOverlay();
              if (typeof navigator !== 'undefined' && navigator.vibrate) {
                try { navigator.vibrate(80); } catch(e) {}
              }
              const gradeOutput = window.omrEngine.gradeFromImageSource(video, exam.config, exam.answerKeys, cornerResult.points);
              const curKey = `${gradeOutput.result.sbd || ''}_${gradeOutput.result.made || ''}`;

              // Chống quét trùng bài vừa chấm trong 5 giây
              if (curKey && curKey === lastGradedKey && Date.now() < lastGradedTime + 5000) {
                const badge = document.getElementById('cornerLockBadge');
                if (badge) {
                  badge.innerText = '⚠️ Đã chấm bài này. Hãy đưa phiếu tiếp theo vào...';
                }
              } else {
                lastGradedKey = curKey;
                lastGradedTime = Date.now();
                scanCooldownUntil = Date.now() + 2200; // Cooldown 2.2 giây
                saveGradedOutput(gradeOutput, exam, true);
              }
            }
          } catch (e) {
            console.warn('Auto scan evaluation skipped:', e);
          } finally {
            setTimeout(() => { isScanningInProgress = false; }, 600);
          }
        }
      } else {
        consecutiveLockedFrames = 0;
      }
    } catch (err) {}

    cornerTrackingTimer = requestAnimationFrame(checkFrame);
  };

  cornerTrackingTimer = requestAnimationFrame(checkFrame);
}

window.toggleTorch = async function toggleTorch() {
  if (!activeCameraStream) return;
  const track = activeCameraStream.getVideoTracks()[0];
  if (!track) return;

  try {
    currentTorchState = !currentTorchState;
    await track.applyConstraints({ advanced: [{ torch: currentTorchState }] });
    const btn = document.getElementById("btnTorch");
    if (btn) {
      btn.innerHTML = currentTorchState ? "<span>⚡ Tắt</span>" : "<span>🔦 Flash</span>";
      btn.classList.toggle("bg-amber-500", currentTorchState);
      btn.classList.toggle("text-white", currentTorchState);
    }
  } catch (e) {
    alert("Thiết bị không hỗ trợ bật đèn Flash!");
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
    btn.innerHTML = isAutoScanActive
      ? `<span class="flex items-center space-x-1"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>Tự động: BẬT</span></span>`
      : `<span class="flex items-center space-x-1"><span class="w-2 h-2 rounded-full bg-slate-400"></span><span>Tự động: TẮT</span></span>`;
    btn.classList.toggle("border-emerald-500/50", isAutoScanActive);
  }
};

function saveGradedOutput(gradeOutput, exam, fromAutoScan = false) {
  const res = gradeOutput.result;
  const extracted = gradeOutput.extracted;
  const settings = window.appState.data.settings || defaultSettings;
  const stdInfo = window.appState.findStudentInfo(res.sbd, exam);

  const originalSnapshot = {
    sbd: res.sbd,
    made: res.made,
    part1_answers: [...(res.part1_answers || [])],
    part2_answers: JSON.parse(JSON.stringify(res.part2_answers || {})),
    part3_answers: [...(res.part3_answers || [])]
  };

  const extractedMeta = {
    sbdObj: extracted.sbdObj,
    madeObj: extracted.madeObj,
    part1Info: extracted.part1 ? extracted.part1.infoMap : null,
    part2Info: extracted.part2 ? extracted.part2.infoMap : null,
    part3Info: extracted.part3 ? extracted.part3.infoMap : null,
    anchorData: extracted.anchorData
  };

  const resultRecord = {
    id: "res_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    examId: exam.id,
    classId: stdInfo.classId || (exam.classIds && exam.classIds[0]) || "",
    className: stdInfo.className || "Tự do",
    sbd: res.sbd,
    studentName: stdInfo.name,
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

  if (navigator.vibrate) {
    try { navigator.vibrate([100, 50, 100]); } catch (e) {}
  }

  window.updateScanHeader && window.updateScanHeader();

  const toastEl = document.getElementById("scanQuickToast");
  const toastText = document.getElementById("scanQuickToastText");
  const toastSub = document.getElementById("scanQuickToastSub");
  if (toastEl && toastText) {
    toastText.innerText = `✅ SBD: ${resultRecord.sbd || "---"} • Điểm: ${resultRecord.total_score.toFixed(2)}/10`;
    if (toastSub) {
      toastSub.innerText = `Mã đề: ${resultRecord.made || "---"} • [${resultRecord.className || "Tự do"}] ${resultRecord.studentName || ""}`;
    }
    toastEl.classList.remove("hidden");
    if (window._quickToastTimer) clearTimeout(window._quickToastTimer);
    window._quickToastTimer = setTimeout(() => {
      if (toastEl) toastEl.classList.add("hidden");
    }, 4000);
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
    alert("Vui lòng tạo bài kiểm tra trước khi chấm bài!");
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
  if (!video || !activeCameraStream) {
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
// === XEM BÀI ĐÃ CHẤM & CHỈNH SỬA THỦ CÔNG (CÓ DẤU HIỆU NHẬN BIẾT) ===
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

  if (nameEl) nameEl.innerText = `${record.studentName} (Lớp: ${record.className || "Tự do"} • SBD: ${record.sbd} • Mã: ${record.made})`;
  if (scoreEl) scoreEl.innerText = record.total_score.toFixed(2);
  if (p1El) p1El.innerText = `${record.part1_score.toFixed(2)} đ (${record.part1_correct || 0} đúng)`;
  if (p2El) p2El.innerText = `${record.part2_score.toFixed(2)} đ`;
  if (p3El) p3El.innerText = `${record.part3_score.toFixed(2)} đ (${record.part3_correct || 0} đúng)`;

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
  if (!val) return "Trống";
  if (val === "DOUBLE") return "Tô đúp (>1 ô)";
  return val;
}

function renderManualReviewEditor(record) {
  const container = document.getElementById("manualReviewEditorContainer");
  if (!container) return;

  const exam = window.appState.data.exams.find(e => e.id === record.examId) || window.appState.getCurrentExam();
  if (!exam) return;
  const key = (exam.answerKeys && exam.answerKeys[record.made]) || (exam.answerKeys && exam.answerKeys[Object.keys(exam.answerKeys)[0]]) || { part1: [], part2: {}, part3: [] };
  const orig = record.originalRecord;
  const ov = computeManualOverrides(record);

  let html = "";

  const settings = window.appState.data.settings || defaultSettings;
  if (settings.warnNoKey && record.status !== "OK") {
    html += `
      <div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-700 text-xs text-rose-800 dark:text-rose-200 font-semibold mb-3">
        ⚠ Cảnh báo: Mã đề [${record.made}] chưa có trong kho Đáp án! Đang tạm chấm theo mã [${Object.keys(exam.answerKeys || {})[0] || "101"}]. Hãy chỉnh lại mã đề bên dưới.
      </div>
    `;
  }

  if (ov.hasAnyEdit) {
    html += `
      <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 dark:border-amber-600 flex flex-wrap items-center justify-between gap-2 text-xs mb-3">
        <div class="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-semibold">
          <span>✎ Đã điều chỉnh thủ công tại <strong>${ov.editCount} vị trí</strong> (viền cam).</span>
        </div>
        <button onclick="window.restoreAllOriginalFields('${record.id}')" class="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm">
          ↺ Khôi phục gốc máy đọc
        </button>
      </div>
    `;
  }

  // 1. SBD & MÃ ĐỀ
  html += `
    <div class="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800 mb-3">
      <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">Thông Tin Nhận Diện</h4>
      <div class="grid grid-cols-2 gap-3 text-xs">
        <div class="p-2 rounded border ${ov.sbd ? "border-amber-400 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"}">
          <label class="block text-[10px] text-slate-400 font-bold mb-1">SỐ BÁO DANH</label>
          <div class="flex items-center space-x-1.5">
            <input type="text" value="${record.sbd}" onchange="window.updateManualField('${record.id}', 'sbd', 0, 0, this.value)" class="w-full py-1 px-2 rounded border border-slate-300 dark:border-slate-600 font-mono font-bold text-sm text-slate-900 dark:text-white">
            ${ov.sbd ? `<button onclick="window.restoreSingleField('${record.id}', 'sbd')" title="Khôi phục gốc" class="text-amber-600 dark:text-amber-400 font-bold text-xs">↺</button>` : ""}
          </div>
          ${ov.sbd ? `<div class="text-[10px] text-amber-600 dark:text-amber-400 mt-1">Gốc: "${orig.sbd}"</div>` : ""}
        </div>

        <div class="p-2 rounded border ${ov.made ? "border-amber-400 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"}">
          <label class="block text-[10px] text-slate-400 font-bold mb-1">MÃ ĐỀ THI</label>
          <div class="flex items-center space-x-1.5">
            <select onchange="window.updateManualField('${record.id}', 'made', 0, 0, this.value)" class="w-full py-1 px-2 rounded border border-slate-300 dark:border-slate-600 font-mono font-bold text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-800">
              ${Object.keys(exam.answerKeys || {}).map(mCode => `<option value="${mCode}" ${mCode === record.made ? "selected" : ""}>Mã ${mCode}</option>`).join("")}
              ${!exam.answerKeys || !exam.answerKeys[record.made] ? `<option value="${record.made}" selected>Mã ${record.made} (Chưa có Đ/A)</option>` : ""}
            </select>
            ${ov.made ? `<button onclick="window.restoreSingleField('${record.id}', 'made')" title="Khôi phục gốc" class="text-amber-600 dark:text-amber-400 font-bold text-xs">↺</button>` : ""}
          </div>
          ${ov.made ? `<div class="text-[10px] text-amber-600 dark:text-amber-400 mt-1">Gốc: "${orig.made}"</div>` : ""}
        </div>
      </div>
    </div>
  `;

  // 2. PHẦN I: TRẮC NGHIỆM
  const p1Num = exam.config.p1_num || 0;
  if (p1Num > 0) {
    html += `
      <div class="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800 mb-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">Phần I: Trắc Nghiệm (${p1Num} câu)</h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
    `;

    for (let q = 0; q < p1Num; q++) {
      const qNum = q + 1;
      const sVal = record.part1_answers[q] || "";
      const oVal = orig.part1_answers[q] || "";
      const kVal = key.part1 ? (key.part1[q] || "") : "";
      const isMod = ov.part1[q];
      const isCorrect = sVal && kVal && sVal === kVal;

      html += `
        <div class="p-2 rounded border ${isMod ? "border-amber-400 bg-amber-50/40 dark:bg-amber-950/20" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"}">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-[11px] text-slate-700 dark:text-slate-300">CÂU ${qNum}</span>
            <span class="text-[10px] font-semibold ${isCorrect ? "text-emerald-600" : "text-rose-500"}">${isCorrect ? "✓ Đúng" : "✗ Sai"} (Đ/A: ${kVal})</span>
          </div>
          <div class="flex items-center space-x-1">
            ${["A", "B", "C", "D"].map(opt => `
              <button onclick="window.updateManualField('${record.id}', 'p1', ${q}, 0, '${sVal === opt ? "" : opt}')" class="w-6 h-6 rounded text-xs font-bold font-mono transition-all ${sVal === opt ? (isCorrect ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"}">${opt}</button>
            `).join("")}
            ${isMod ? `<button onclick="window.restoreSingleField('${record.id}', 'p1', ${q})" title="Khôi phục gốc" class="text-amber-600 font-bold text-xs ml-auto">↺</button>` : ""}
          </div>
          ${isMod ? `<div class="text-[9px] text-amber-600 dark:text-amber-400 mt-1">Gốc: "${formatRecognizedLabel(oVal)}"</div>` : ""}
        </div>
      `;
    }
    html += `</div></div>`;
  }

  // 3. PHẦN II: ĐÚNG / SAI
  const p2Num = exam.config.p2_num || 0;
  if (p2Num > 0) {
    html += `
      <div class="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800 mb-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">Phần II: Đúng / Sai (${p2Num} câu)</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
    `;

    for (let q = 0; q < p2Num; q++) {
      const qNum = q + 1;
      const qKey = String(qNum);
      const sSubs = record.part2_answers[qKey] || ["", "", "", ""];
      const oSubs = (orig.part2_answers && orig.part2_answers[qKey]) || ["", "", "", ""];
      const kSubs = (key.part2 && key.part2[qKey]) || ["", "", "", ""];
      const subLabels = ["a", "b", "c", "d"];

      html += `
        <div class="p-2.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div class="font-bold text-xs text-slate-700 dark:text-slate-300 mb-1.5 pb-1 border-b border-slate-200 dark:border-slate-700">CÂU ${qNum}</div>
          <div class="space-y-1.5">
            ${subLabels.map((sLabel, sIdx) => {
              const sVal = sSubs[sIdx] || "";
              const oVal = oSubs[sIdx] || "";
              const kVal = kSubs[sIdx] || "";
              const isMod = ov.part2[`${qKey}_${sIdx}`];
              const isCorrect = sVal && kVal && sVal === kVal;

              return `
                <div class="flex items-center justify-between text-xs p-1 rounded ${isMod ? "bg-amber-50/60 dark:bg-amber-950/30 border border-amber-300" : ""}">
                  <span class="font-mono font-medium text-slate-500">${sLabel}) <span class="${isCorrect ? "text-emerald-600" : "text-rose-500"}">${isCorrect ? "✓" : "✗"}</span></span>
                  <div class="flex items-center space-x-1">
                    <button onclick="window.updateManualField('${record.id}', 'p2', '${qKey}', ${sIdx}, '${sVal === "Đ" ? "" : "Đ"}')" class="bubble-tf ${sVal === "Đ" ? "selected-true" : ""}">Đ</button>
                    <button onclick="window.updateManualField('${record.id}', 'p2', '${qKey}', ${sIdx}, '${sVal === "S" ? "" : "S"}')" class="bubble-tf ${sVal === "S" ? "selected-false" : ""}">S</button>
                    ${isMod ? `<button onclick="window.restoreSingleField('${record.id}', 'p2', '${qKey}', ${sIdx})" title="Khôi phục" class="text-amber-600 font-bold text-xs ml-1">↺</button>` : ""}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }
    html += `</div></div>`;
  }

  // 4. PHẦN III: TRẢ LỜI NGẮN
  const p3Num = exam.config.p3_num || 0;
  if (p3Num > 0) {
    html += `
      <div class="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
        <h4 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">Phần III: Trả Lời Ngắn (${p3Num} câu)</h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
    `;

    for (let q = 0; q < p3Num; q++) {
      const qNum = q + 1;
      const sVal = record.part3_answers[q] || "";
      const oVal = orig.part3_answers[q] || "";
      const kVal = key.part3 ? (key.part3[q] || "") : "";
      const isMod = ov.part3[q];
      const isCorrect = sVal && kVal && sVal.replace(/,/g, ".") === kVal.replace(/,/g, ".");

      html += `
        <div class="p-2 rounded border ${isMod ? "border-amber-400 bg-amber-50/40 dark:bg-amber-950/20" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"}">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-[10px] text-slate-700 dark:text-slate-300">CÂU ${qNum}</span>
            <span class="text-[9px] font-semibold ${isCorrect ? "text-emerald-600" : "text-rose-500"}">${isCorrect ? "✓" : "✗"} (Đ/A: ${kVal || "?"})</span>
          </div>
          <div class="flex items-center space-x-1">
            <input type="text" value="${sVal}" onchange="window.updateManualField('${record.id}', 'p3', ${q}, 0, this.value)" placeholder="Trống" class="w-full py-1 px-1.5 rounded border border-slate-300 dark:border-slate-600 font-mono font-bold text-xs text-center">
            ${isMod ? `<button onclick="window.restoreSingleField('${record.id}', 'p3', ${q})" title="Khôi phục" class="text-amber-600 font-bold text-xs">↺</button>` : ""}
          </div>
          ${isMod ? `<div class="text-[9px] text-amber-600 dark:text-amber-400 mt-1">Gốc: "${oVal || "Trống"}"</div>` : ""}
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
    const stdInfo = window.appState.findStudentInfo(record.sbd);
    record.studentName = stdInfo.name;
    if (stdInfo.classId) {
      record.classId = stdInfo.classId;
      record.className = stdInfo.className;
    }
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
  window.renderExamHub && window.renderExamHub();
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
  const stdInfo = window.appState.findStudentInfo(record.sbd);
  record.studentName = stdInfo.name;
  if (stdInfo.classId) {
    record.classId = stdInfo.classId;
    record.className = stdInfo.className;
  }
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
  window.renderExamHub && window.renderExamHub();
};

window.closeResultModal = function closeResultModal() {
  const modal = document.getElementById("resultModal");
  if (modal) modal.classList.add("hidden");
};

// =========================================================================
// === YÊU CẦU 4: QUẢN LÝ LỚP HỌC & HỌC SINH ĐẦY ĐỦ (THỦ CÔNG / EXCEL / TEXT) ===
// =========================================================================

window.onSelectActiveClass = function onSelectActiveClass(classId) {
  window.appState.data.currentClassId = classId;
  window.appState.save();
  window.renderStudentsList();
};

window.showCreateClassModal = function showCreateClassModal() {
  const modal = document.getElementById("createClassModal");
  if (modal) {
    const nameInput = document.getElementById("newClassNameInput");
    const gradeInput = document.getElementById("newClassGradeInput");
    if (nameInput) nameInput.value = "";
    if (gradeInput) gradeInput.value = "12";
    modal.classList.remove("hidden");
  }
};

window.closeCreateClassModal = function closeCreateClassModal() {
  const modal = document.getElementById("createClassModal");
  if (modal) modal.classList.add("hidden");
};

window.saveNewClass = function saveNewClass() {
  const nameInput = document.getElementById("newClassNameInput");
  const gradeInput = document.getElementById("newClassGradeInput");
  const name = (nameInput?.value || "").trim();
  const grade = (gradeInput?.value || "12").trim();

  if (!name) {
    alert("Vui lòng nhập tên lớp học!");
    return;
  }

  const newClass = {
    id: "cls_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 4),
    name: name,
    grade: grade,
    students: []
  };

  window.appState.data.classes.push(newClass);
  window.appState.data.currentClassId = newClass.id;

  const exam = window.appState.getCurrentExam();
  if (exam) {
    if (!exam.classIds) exam.classIds = [];
    if (!exam.classIds.includes(newClass.id)) {
      exam.classIds.push(newClass.id);
    }
  }

  window.appState.save();
  window.closeCreateClassModal();
  window.renderStudentsList();
  window.renderExamHub && window.renderExamHub();
};

window.editCurrentClassName = function editCurrentClassName() {
  const cls = window.appState.getCurrentClass();
  if (!cls) return;
  const newName = prompt("Nhập tên mới cho lớp học:", cls.name);
  if (newName && newName.trim() && newName.trim() !== cls.name) {
    cls.name = newName.trim();
    window.appState.save();
    window.renderStudentsList();
    window.renderExamHub && window.renderExamHub();
  }
};

window.deleteCurrentClass = function deleteCurrentClass() {
  const cls = window.appState.getCurrentClass();
  if (!cls) return;

  if (confirm(`Bạn có chắc muốn xóa lớp "${cls.name}" cùng ${cls.students?.length || 0} học sinh?`)) {
    window.appState.data.classes = window.appState.data.classes.filter(c => c.id !== cls.id);
    if (window.appState.data.classes.length === 0) {
      window.appState.data.classes = [{
        id: "cls_" + Date.now().toString(36),
        name: "Lớp Mới",
        grade: "12",
        students: []
      }];
    }
    window.appState.data.currentClassId = window.appState.data.classes[0].id;

    window.appState.data.exams.forEach(ex => {
      if (ex.classIds) {
        ex.classIds = ex.classIds.filter(cId => cId !== cls.id);
        if (ex.classIds.length === 0) {
          ex.classIds = [window.appState.data.classes[0].id];
        }
      }
    });

    window.appState.save();
    window.renderStudentsList();
    window.renderExamHub && window.renderExamHub();
  }
};

window.addStudentManual = function addStudentManual() {
  const sbdInput = document.getElementById("manualStudentSbd");
  const nameInput = document.getElementById("manualStudentName");
  if (!sbdInput || !nameInput) return;

  let sbd = sbdInput.value.trim();
  const name = nameInput.value.trim();

  if (!sbd || !name) {
    alert("Vui lòng nhập cả Số báo danh và Họ tên học sinh!");
    return;
  }

  if (/^\d+$/.test(sbd) && sbd.length < 6) {
    sbd = sbd.padStart(6, "0");
  }

  const cls = window.appState.getCurrentClass();
  if (!cls) return;
  if (!cls.students) cls.students = [];

  const existingIdx = cls.students.findIndex(s => s.sbd === sbd);
  if (existingIdx >= 0) {
    if (confirm(`SBD ${sbd} đã tồn tại (${cls.students[existingIdx].name}). Bạn có muốn cập nhật tên mới không?`)) {
      cls.students[existingIdx].name = name;
    } else {
      return;
    }
  } else {
    cls.students.push({ sbd: sbd, name: name });
  }

  cls.students.sort((a, b) => a.sbd.localeCompare(b.sbd));
  window.appState.save();

  sbdInput.value = "";
  nameInput.value = "";
  sbdInput.focus();
  window.renderStudentsList();
};

window.triggerStudentExcelUpload = function triggerStudentExcelUpload() {
  const input = document.getElementById("studentExcelFileInput");
  if (input) input.click();
};

window.handleStudentExcelUpload = function handleStudentExcelUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

      if (!rows || rows.length === 0) {
        alert("File Excel không có dữ liệu!");
        return;
      }

      let sbdCol = -1;
      let nameCol = -1;
      let startRow = 0;

      for (let r = 0; r < Math.min(rows.length, 10); r++) {
        const row = rows[r];
        for (let c = 0; c < row.length; c++) {
          const cell = String(row[c]).toLowerCase().trim();
          if (cell === "sbd" || cell.includes("báo danh") || cell.includes("sobaodanh") || cell.includes("mã hs") || cell.includes("mahs")) {
            sbdCol = c;
          }
          if (cell.includes("họ") || cell.includes("tên") || cell.includes("hoten") || cell.includes("học sinh")) {
            nameCol = c;
          }
        }
        if (sbdCol !== -1 && nameCol !== -1) {
          startRow = r + 1;
          break;
        }
      }

      if (sbdCol === -1 || nameCol === -1) {
        if (rows[0].length >= 3 && typeof rows[0][0] === "number") {
          sbdCol = 1;
          nameCol = 2;
          startRow = 0;
        } else {
          sbdCol = 0;
          nameCol = 1;
          startRow = 1;
        }
      }

      const cls = window.appState.getCurrentClass();
      if (!cls.students) cls.students = [];

      let addedCount = 0;
      let updatedCount = 0;

      for (let r = startRow; r < rows.length; r++) {
        const row = rows[r];
        let rawSbd = String(row[sbdCol] !== undefined ? row[sbdCol] : "").trim();
        let rawName = String(row[nameCol] !== undefined ? row[nameCol] : "").trim();

        if (!rawSbd && !rawName) continue;
        if (!rawSbd) continue;

        if (/^\d+$/.test(rawSbd) && rawSbd.length < 6) {
          rawSbd = rawSbd.padStart(6, "0");
        }
        if (!rawName) rawName = "Học sinh " + rawSbd;

        const exIdx = cls.students.findIndex(s => s.sbd === rawSbd);
        if (exIdx >= 0) {
          cls.students[exIdx].name = rawName;
          updatedCount++;
        } else {
          cls.students.push({ sbd: rawSbd, name: rawName });
          addedCount++;
        }
      }

      cls.students.sort((a, b) => a.sbd.localeCompare(b.sbd));
      window.appState.save();
      window.renderStudentsList();
      alert(`Đã nạp thành công từ Excel:\n• Thêm mới: ${addedCount} học sinh\n• Cập nhật: ${updatedCount} học sinh\n• Tổng sĩ số lớp: ${cls.students.length} học sinh`);
    } catch (err) {
      console.error("Excel import error:", err);
      alert("Lỗi khi đọc file Excel: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = "";
};

window.downloadStudentExcelTemplate = function downloadStudentExcelTemplate() {
  const wb = XLSX.utils.book_new();
  const sampleData = [
    ["STT", "Số Báo Danh", "Họ và Tên"],
    [1, "120101", "Nguyễn Văn An"],
    [2, "120102", "Trần Thị Bình"],
    [3, "120103", "Lê Hoàng Long"],
    [4, "120104", "Phạm Minh Thư"],
    [5, "120105", "Đỗ Quốc Cường"]
  ];
  const ws = XLSX.utils.aoa_to_sheet(sampleData);
  ws["!cols"] = [{ wch: 6 }, { wch: 16 }, { wch: 28 }];
  XLSX.utils.book_append_sheet(wb, ws, "DanhSachHocSinh");
  XLSX.writeFile(wb, "Mau_Danh_Sach_Hoc_Sinh_QMATH.xlsx");
};

window.exportClassStudentsToExcel = function exportClassStudentsToExcel() {
  const cls = window.appState.getCurrentClass();
  if (!cls || !cls.students || cls.students.length === 0) {
    alert("Lớp học chưa có học sinh để xuất file!");
    return;
  }
  const wb = XLSX.utils.book_new();
  const exportData = [
    [`DANH SÁCH HỌC SINH - ${cls.name.toUpperCase()}`],
    [`Sĩ số: ${cls.students.length} học sinh • Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}`],
    [],
    ["STT", "Số Báo Danh", "Họ và Tên Học Sinh"]
  ];

  cls.students.forEach((s, idx) => {
    exportData.push([idx + 1, s.sbd, s.name]);
  });

  const ws = XLSX.utils.aoa_to_sheet(exportData);
  ws["!cols"] = [{ wch: 6 }, { wch: 18 }, { wch: 32 }];
  XLSX.utils.book_append_sheet(wb, ws, "DanhSach");
  XLSX.writeFile(wb, `DanhSach_${cls.name.replace(/[^A-Za-z0-9]/g, "_")}.xlsx`);
};

window.renderStudentsList = function renderStudentsList() {
  const cls = window.appState.getCurrentClass();
  const select = document.getElementById("activeClassSelect");
  const countBadge = document.getElementById("classStudentCountBadge");
  const tbody = document.getElementById("studentsTableBody");

  if (select) {
    select.innerHTML = window.appState.data.classes.map(c => 
      `<option value="${c.id}" ${c.id === cls.id ? "selected" : ""}>${c.name} (${c.students?.length || 0} HS)</option>`
    ).join("");
  }

  if (countBadge) {
    countBadge.innerText = `${cls.students?.length || 0} học sinh`;
  }

  if (!tbody) return;

  if (!cls.students || cls.students.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="py-8 text-center text-slate-400">
          <p class="text-sm font-semibold mb-1">Lớp này chưa có học sinh nào</p>
          <p class="text-xs">Dùng form thêm thủ công bên trên hoặc bấm "Nạp file Excel danh sách" để nạp nhanh</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = cls.students.map((s, idx) => `
    <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
      <td class="py-2.5 px-3 font-mono text-slate-400 text-xs">${idx + 1}</td>
      <td class="py-2.5 px-3 font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
        <span class="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">${s.sbd}</span>
      </td>
      <td class="py-2.5 px-3 font-medium text-slate-900 dark:text-white text-xs">${s.name}</td>
      <td class="py-2.5 px-3 text-right">
        <button onclick="window.removeStudent('${s.sbd}')" title="Xóa học sinh" class="text-rose-500 hover:text-rose-700 text-xs font-semibold px-2 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40">
          ✕ Xóa
        </button>
      </td>
    </tr>
  `).join("");
};

window.removeStudent = function removeStudent(sbd) {
  const cls = window.appState.getCurrentClass();
  if (!cls) return;
  const std = cls.students.find(s => s.sbd === sbd);
  if (confirm(`Xóa học sinh "${std ? std.name : sbd}" khỏi lớp ${cls.name}?`)) {
    cls.students = cls.students.filter(s => s.sbd !== sbd);
    window.appState.save();
    window.renderStudentsList();
  }
};

window.clearAllStudentsInClass = function clearAllStudentsInClass() {
  const cls = window.appState.getCurrentClass();
  if (!cls || !cls.students || cls.students.length === 0) return;
  if (confirm(`Bạn có chắc muốn XÓA TOÀN BỘ ${cls.students.length} học sinh trong lớp "${cls.name}"?`)) {
    cls.students = [];
    window.appState.save();
    window.renderStudentsList();
  }
};

window.showImportStudentsModal = function showImportStudentsModal() {
  const modal = document.getElementById("importStudentsModal");
  if (modal) {
    document.getElementById("batchStudentsText").value = "";
    modal.classList.remove("hidden");
  }
};

window.closeImportStudentsModal = function closeImportStudentsModal() {
  const modal = document.getElementById("importStudentsModal");
  if (modal) modal.classList.add("hidden");
};

window.handleBatchStudentsImport = function handleBatchStudentsImport() {
  const text = document.getElementById("batchStudentsText")?.value || "";
  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);

  if (lines.length === 0) {
    alert("Vui lòng dán danh sách học sinh!");
    return;
  }

  const cls = window.appState.getCurrentClass();
  if (!cls.students) cls.students = [];

  let count = 0;
  lines.forEach(line => {
    let parts = line.split("\t");
    if (parts.length < 2) parts = line.split(",");
    if (parts.length < 2) {
      const match = line.match(/^(\d+)\s+(.+)$/);
      if (match) {
        parts = [match[1], match[2]];
      }
    }

    if (parts.length >= 2) {
      let sbd = parts[0].trim();
      const name = parts[1].trim();
      if (/^\d+$/.test(sbd) && sbd.length < 6) sbd = sbd.padStart(6, "0");
      if (sbd && name) {
        const exIdx = cls.students.findIndex(s => s.sbd === sbd);
        if (exIdx >= 0) {
          cls.students[exIdx].name = name;
        } else {
          cls.students.push({ sbd: sbd, name: name });
        }
        count++;
      }
    }
  });

  cls.students.sort((a, b) => a.sbd.localeCompare(b.sbd));
  window.appState.save();
  window.closeImportStudentsModal();
  window.renderStudentsList();
  alert(`Đã nạp thành công ${count} học sinh vào lớp ${cls.name}!`);
};

// =========================================================================
// === YÊU CẦU 5: BÀI ĐÃ CHẤM & LỌC THEO ĐA LỚP ===
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

window.setResultsClassFilter = function setResultsClassFilter(classId) {
  window.appState.data.resultsClassFilter = classId;
  window.appState.save();
  window.renderResultsTable();
};

window.renderResultsTable = function renderResultsTable() {
  const exam = window.appState.getCurrentExam();
  const tbody = document.getElementById("resultsTableBody");
  const gallery = document.getElementById("resultsGalleryGrid");
  const filterSelect = document.getElementById("resultsClassFilterSelect");

  if (!exam) {
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="9" class="py-8 text-center text-slate-400">Chưa có bài kiểm tra nào</td></tr>`;
    }
    return;
  }

  const allExamResults = window.appState.data.results.filter(r => r.examId === exam.id);

  if (filterSelect) {
    const curFilter = window.appState.data.resultsClassFilter || "all";
    let filterHtml = `<option value="all" ${curFilter === "all" ? "selected" : ""}>Tất cả các lớp (${allExamResults.length} bài)</option>`;

    const examClassIds = exam.classIds || [];
    examClassIds.forEach(cId => {
      const cls = window.appState.data.classes.find(c => c.id === cId);
      if (cls) {
        const count = allExamResults.filter(r => r.classId === cId).length;
        filterHtml += `<option value="${cId}" ${curFilter === cId ? "selected" : ""}>${cls.name} (${count} bài)</option>`;
      }
    });

    const freeCount = allExamResults.filter(r => !r.classId || r.className === "Tự do").length;
    if (freeCount > 0) {
      filterHtml += `<option value="free" ${curFilter === "free" ? "selected" : ""}>Thí sinh tự do (${freeCount} bài)</option>`;
    }
    filterSelect.innerHTML = filterHtml;
  }

  const searchVal = (document.getElementById("searchResultInput")?.value || "").trim().toLowerCase();
  const classFilter = window.appState.data.resultsClassFilter || "all";

  const results = allExamResults.filter(r => {
    if (classFilter === "free") {
      if (r.classId && r.className !== "Tự do") return false;
    } else if (classFilter !== "all") {
      if (r.classId !== classFilter) return false;
    }

    if (searchVal) {
      const matchSbd = (r.sbd || "").toLowerCase().includes(searchVal);
      const matchName = (r.studentName || "").toLowerCase().includes(searchVal);
      const matchMade = (r.made || "").toLowerCase().includes(searchVal);
      const matchClass = (r.className || "").toLowerCase().includes(searchVal);
      if (!matchSbd && !matchName && !matchMade && !matchClass) return false;
    }
    return true;
  });

  const countBadge = document.getElementById("resultsFilteredCount");
  if (countBadge) {
    countBadge.innerText = `${results.length} bài`;
  }

  if (tbody) {
    if (results.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="py-10 text-center text-slate-400">
            <p class="text-sm font-semibold mb-1">Chưa có bài thi nào phù hợp</p>
            <p class="text-xs">Bấm tab "Chấm bài" để quét camera hoặc tải ảnh phiếu thi</p>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = results.map((r, idx) => {
        const ov = r.manualOverrides;
        const isModified = ov && ov.hasAnyEdit;

        return `
          <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <td class="py-2.5 px-3 font-mono text-slate-400 text-xs">${idx + 1}</td>
            <td class="py-2.5 px-3 font-mono font-bold text-xs text-blue-600 dark:text-blue-400">${r.sbd}</td>
            <td class="py-2.5 px-3 font-medium text-slate-900 dark:text-white text-xs">${r.studentName}</td>
            <td class="py-2.5 px-3 text-xs">
              <span class="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">${r.className || "Tự do"}</span>
            </td>
            <td class="py-2.5 px-3 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">${r.made}</td>
            <td class="py-2.5 px-3 font-mono text-xs text-slate-600 dark:text-slate-400">${(r.part1_score || 0).toFixed(2)}</td>
            <td class="py-2.5 px-3 font-mono text-xs text-slate-600 dark:text-slate-400">${(r.part2_score || 0).toFixed(2)}</td>
            <td class="py-2.5 px-3 font-mono text-xs text-slate-600 dark:text-slate-400">${(r.part3_score || 0).toFixed(2)}</td>
            <td class="py-2.5 px-3 text-right">
              <div class="flex items-center justify-end space-x-2">
                <span class="font-bold text-sm text-slate-900 dark:text-white font-mono">${(r.total_score || 0).toFixed(2)}</span>
                ${isModified ? `<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300" title="Đã sửa ${ov.editCount} vị trí">✎ Sửa</span>` : ""}
                <button onclick="window.previewGradedImage('${r.id}')" title="Xem & Chỉnh sửa phiếu" class="btn-secondary py-1 px-2 rounded text-xs ml-1">👁️ Xem</button>
                <button onclick="window.deleteSingleResult('${r.id}')" title="Xóa kết quả này" class="text-rose-500 hover:text-rose-700 text-xs px-1.5 py-1">✕</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  if (gallery) {
    if (results.length === 0) {
      gallery.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400 text-sm">Chưa có ảnh bài thi nào</div>`;
    } else {
      gallery.innerHTML = results.map(r => `
        <div onclick="window.previewGradedImage('${r.id}')" class="bg-white dark:bg-slate-900 rounded-xl p-2.5 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-blue-500 transition-all">
          <div class="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 relative mb-2">
            <img src="${r.annotatedDataUrl}" alt="${r.sbd}" class="w-full h-full object-cover">
            <span class="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md font-mono font-bold text-xs bg-slate-900/85 text-white">${r.total_score.toFixed(2)} đ</span>
            <span class="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-900/75 text-slate-200">${r.className}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold truncate text-slate-900 dark:text-white">${r.studentName}</span>
            <span class="font-mono text-slate-400">SBD: ${r.sbd}</span>
          </div>
        </div>
      `).join("");
    }
  }
};

window.previewGradedImage = function previewGradedImage(id) {
  const record = window.appState.data.results.find(r => r.id === id);
  if (record) {
    window.showResultModal(record);
  }
};

window.deleteSingleResult = function deleteSingleResult(id) {
  const record = window.appState.data.results.find(r => r.id === id);
  if (!record) return;
  if (confirm(`Xóa kết quả bài thi của học sinh "${record.studentName}" (SBD: ${record.sbd})?`)) {
    window.appState.data.results = window.appState.data.results.filter(r => r.id !== id);
    window.appState.save();
    window.renderResultsTable();
    window.renderExamHub && window.renderExamHub();
  }
};

window.clearAllResults = function clearAllResults() {
  const exam = window.appState.getCurrentExam();
  if (!exam) return;
  if (confirm(`Bạn có chắc chắn muốn XÓA TOÀN BỘ bài đã chấm của bài thi "${exam.name}"?`)) {
    window.appState.data.results = window.appState.data.results.filter(r => r.examId !== exam.id);
    window.appState.save();
    window.renderResultsTable();
    window.renderExamHub && window.renderExamHub();
  }
};

// =========================================================================
// === YÊU CẦU 5: THỐNG KÊ & PHÂN TÍCH LIÊN LỚP (INTER-CLASS COMPARISON) ===
// =========================================================================

window.setStatsClassFilter = function setStatsClassFilter(classId) {
  window.appState.data.statsClassFilter = classId;
  window.appState.save();
  window.renderStatsReport();
};

window.renderStatsReport = function renderStatsReport() {
  const exam = window.appState.getCurrentExam();
  const container = document.getElementById("statsContentContainer");
  const filterSelect = document.getElementById("statsClassFilterSelect");

  if (!container) return;

  if (!exam) {
    container.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-xl p-8 text-center text-slate-400">
        Chưa có bài kiểm tra nào để thống kê
      </div>
    `;
    return;
  }

  const allExamResults = window.appState.data.results.filter(r => r.examId === exam.id);

  if (filterSelect) {
    const curFilter = window.appState.data.statsClassFilter || "all";
    let filterHtml = `<option value="all" ${curFilter === "all" ? "selected" : ""}>Toàn bộ học sinh (So sánh các lớp)</option>`;

    (exam.classIds || []).forEach(cId => {
      const cls = window.appState.data.classes.find(c => c.id === cId);
      if (cls) {
        const count = allExamResults.filter(r => r.classId === cId).length;
        filterHtml += `<option value="${cId}" ${curFilter === cId ? "selected" : ""}>Lớp ${cls.name} (${count} bài)</option>`;
      }
    });
    filterSelect.innerHTML = filterHtml;
  }

  const curFilter = window.appState.data.statsClassFilter || "all";

  if (curFilter === "all") {
    renderInterClassComparisonStats(exam, allExamResults, container);
  } else {
    const cls = window.appState.data.classes.find(c => c.id === curFilter);
    const classResults = allExamResults.filter(r => r.classId === curFilter);
    renderSingleClassStats(exam, cls, classResults, container);
  }
};

function renderInterClassComparisonStats(exam, allResults, container) {
  const assignedClassIds = exam.classIds || [];
  const assignedClasses = assignedClassIds.map(cId => window.appState.data.classes.find(c => c.id === cId)).filter(Boolean);

  const totalRegistered = assignedClasses.reduce((sum, c) => sum + (c.students?.length || 0), 0);
  const totalGraded = allResults.length;
  const scores = allResults.map(r => r.total_score);
  const totalAvg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const passRate = scores.length > 0 ? Math.round((scores.filter(s => s >= 5.0).length / scores.length) * 100) : 0;
  const goodRate = scores.length > 0 ? Math.round((scores.filter(s => s >= 8.0).length / scores.length) * 100) : 0;

  const classStats = assignedClasses.map(cls => {
    const cResults = allResults.filter(r => r.classId === cls.id);
    const cScores = cResults.map(r => r.total_score);
    const cRoster = cls.students?.length || 0;
    const cGraded = cResults.length;
    const cAvg = cScores.length > 0 ? (cScores.reduce((a, b) => a + b, 0) / cScores.length) : 0;
    const cMax = cScores.length > 0 ? Math.max(...cScores) : 0;
    const cMin = cScores.length > 0 ? Math.min(...cScores) : 0;
    const cPass = cScores.length > 0 ? Math.round((cScores.filter(s => s >= 5.0).length / cScores.length) * 100) : 0;
    const cGood = cScores.length > 0 ? Math.round((cScores.filter(s => s >= 8.0).length / cScores.length) * 100) : 0;
    const turnInRate = cRoster > 0 ? Math.round((cGraded / cRoster) * 100) : (cGraded > 0 ? 100 : 0);

    return {
      class: cls,
      roster: cRoster,
      graded: cGraded,
      turnInRate: turnInRate,
      avg: cAvg,
      max: cMax,
      min: cMin,
      passRate: cPass,
      goodRate: cGood
    };
  });

  let html = `
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-[11px] text-slate-400 font-medium">Tổng Sĩ Số</span>
        <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">${totalRegistered} HS</div>
      </div>
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-[11px] text-slate-400 font-medium">Đã Chấm</span>
        <div class="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">${totalGraded} bài</div>
      </div>
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-[11px] text-slate-400 font-medium">Điểm TB Chung</span>
        <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">${totalAvg.toFixed(2)}</div>
      </div>
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-[11px] text-slate-400 font-medium">Tỷ Lệ Đạt (≥5.0)</span>
        <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">${passRate}%</div>
      </div>
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
        <span class="text-[11px] text-slate-400 font-medium">Tỷ Lệ Giỏi (≥8.0)</span>
        <div class="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">${goodRate}%</div>
      </div>
    </div>

    <!-- BẢNG ĐỐI CHIẾU & SO SÁNH GIỮA CÁC LỚP -->
    <div class="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 class="font-bold text-sm text-slate-900 dark:text-white">📊 Bảng So Sánh Chỉ Số Giữa Các Lớp</h3>
          <p class="text-xs text-slate-400">Đối chiếu sĩ số, tiến độ nộp bài, điểm trung bình và phổ chất lượng từng lớp</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-semibold">
            <tr>
              <th class="py-2.5 px-3">STT</th>
              <th class="py-2.5 px-3">Tên Lớp</th>
              <th class="py-2.5 px-3 text-center">Sĩ Số</th>
              <th class="py-2.5 px-3 text-center">Đã Nộp</th>
              <th class="py-2.5 px-3 text-center">Tỷ Lệ Nộp</th>
              <th class="py-2.5 px-3 text-center font-bold text-slate-900 dark:text-white">Điểm TB</th>
              <th class="py-2.5 px-3 text-center">Cao Nhất</th>
              <th class="py-2.5 px-3 text-center">Thấp Nhất</th>
              <th class="py-2.5 px-3 text-center text-emerald-600">Đạt (≥5)</th>
              <th class="py-2.5 px-3 text-center text-indigo-600">Giỏi (≥8)</th>
            </tr>
          </thead>
          <tbody>
            ${classStats.map((cs, idx) => `
              <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td class="py-2.5 px-3 font-mono text-slate-400">${idx + 1}</td>
                <td class="py-2.5 px-3 font-bold text-slate-900 dark:text-white">${cs.class.name}</td>
                <td class="py-2.5 px-3 text-center font-mono">${cs.roster}</td>
                <td class="py-2.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400">${cs.graded}</td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-500">${cs.turnInRate}%</td>
                <td class="py-2.5 px-3 text-center font-mono font-extrabold text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60">${cs.avg.toFixed(2)}</td>
                <td class="py-2.5 px-3 text-center font-mono text-emerald-600 font-semibold">${cs.max.toFixed(2)}</td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-500">${cs.min.toFixed(2)}</td>
                <td class="py-2.5 px-3 text-center font-mono font-bold text-emerald-600">${cs.passRate}%</td>
                <td class="py-2.5 px-3 text-center font-mono font-bold text-indigo-600">${cs.goodRate}%</td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot class="bg-slate-50 dark:bg-slate-800/80 font-bold border-t-2 border-slate-200 dark:border-slate-700">
            <tr>
              <td colspan="2" class="py-2.5 px-3 uppercase text-slate-700 dark:text-slate-300">Tổng / Chung Toàn Bài</td>
              <td class="py-2.5 px-3 text-center font-mono">${totalRegistered}</td>
              <td class="py-2.5 px-3 text-center font-mono text-blue-600 dark:text-blue-400">${totalGraded}</td>
              <td class="py-2.5 px-3 text-center font-mono">${totalRegistered > 0 ? Math.round((totalGraded / totalRegistered) * 100) : 100}%</td>
              <td class="py-2.5 px-3 text-center font-mono text-sm text-slate-900 dark:text-white">${totalAvg.toFixed(2)}</td>
              <td class="py-2.5 px-3 text-center font-mono text-emerald-600">${scores.length > 0 ? Math.max(...scores).toFixed(2) : "0.00"}</td>
              <td class="py-2.5 px-3 text-center font-mono text-slate-500">${scores.length > 0 ? Math.min(...scores).toFixed(2) : "0.00"}</td>
              <td class="py-2.5 px-3 text-center font-mono text-emerald-600">${passRate}%</td>
              <td class="py-2.5 px-3 text-center font-mono text-indigo-600">${goodRate}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- BIỂU ĐỒ CỘT SO SÁNH ĐIỂM TRUNG BÌNH GIỮA CÁC LỚP -->
    <div class="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <h3 class="font-bold text-sm text-slate-900 dark:text-white">📈 Biểu Đồ So Sánh Điểm Trung Bình Giữa Các Lớp</h3>
      <div class="space-y-3 pt-2">
        ${classStats.map(cs => {
          const pct = Math.min(100, (cs.avg / 10.0) * 100);
          return `
            <div>
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="font-bold text-slate-800 dark:text-slate-200">${cs.class.name}</span>
                <span class="font-mono font-extrabold text-slate-900 dark:text-white">${cs.avg.toFixed(2)} / 10.0</span>
              </div>
              <div class="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                <div class="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-500" style="width: ${pct}%;"></div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- PHỔ ĐIỂM TOÀN BỘ BÀI THI -->
    <div class="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-4">📊 Biểu Đồ Phân Phối Phổ Điểm (Toàn Bài Thi)</h3>
      ${renderScoreDistributionBars(scores)}
    </div>
  `;

  container.innerHTML = html;
}

function renderSingleClassStats(exam, cls, classResults, container) {
  if (!cls) return;
  const scores = classResults.map(r => r.total_score);
  const n = scores.length;
  const roster = cls.students?.length || 0;
  const avg = n > 0 ? (scores.reduce((a, b) => a + b, 0) / n) : 0;
  const max = n > 0 ? Math.max(...scores) : 0;
  const min = n > 0 ? Math.min(...scores) : 0;
  const passRate = n > 0 ? Math.round((scores.filter(s => s >= 5.0).length / n) * 100) : 0;
  const goodRate = n > 0 ? Math.round((scores.filter(s => s >= 8.0).length / n) * 100) : 0;

  let html = `
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-[11px] text-slate-400 font-medium">Sĩ Số Lớp</span>
        <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">${roster} HS</div>
      </div>
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-[11px] text-slate-400 font-medium">Đã Nộp Bài</span>
        <div class="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">${n} bài</div>
      </div>
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-[11px] text-slate-400 font-medium">Điểm TB Lớp</span>
        <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">${avg.toFixed(2)}</div>
      </div>
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span class="text-[11px] text-slate-400 font-medium">Điểm Cao Nhất</span>
        <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">${max.toFixed(2)}</div>
      </div>
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
        <span class="text-[11px] text-slate-400 font-medium">Tỷ Lệ Đạt (≥5)</span>
        <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">${passRate}%</div>
      </div>
    </div>

    <!-- Phổ điểm của riêng lớp -->
    <div class="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-4">📊 Phổ Điểm Của Lớp ${cls.name}</h3>
      ${renderScoreDistributionBars(scores)}
    </div>
  `;

  const p1Num = exam.config.p1_num || 0;
  if (p1Num > 0 && n > 0) {
    html += `
      <div class="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-3">🎯 Phân Tích Tỷ Lệ Làm Đúng Từng Câu (Lớp ${cls.name})</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
    `;

    for (let q = 0; q < p1Num; q++) {
      let c = 0;
      classResults.forEach(r => {
        const k = exam.answerKeys[r.made] || exam.answerKeys[Object.keys(exam.answerKeys)[0]];
        if (k && k.part1 && r.part1_answers[q] === k.part1[q]) c++;
      });
      const rate = Math.round((c / n) * 100);
      const barColor = rate >= 70 ? "bg-emerald-500" : (rate >= 40 ? "bg-amber-500" : "bg-rose-500");

      html += `
        <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1">
          <div class="flex items-center justify-between font-mono">
            <span class="font-bold">Câu ${q + 1}</span>
            <span class="${rate < 40 ? "text-rose-600 font-bold" : "text-slate-600 dark:text-slate-400"}">${c}/${n} (${rate}%)</span>
          </div>
          <div class="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div class="h-full ${barColor}" style="width: ${rate}%;"></div>
          </div>
        </div>
      `;
    }
    html += `</div></div>`;
  }

  container.innerHTML = html;
}

function renderScoreDistributionBars(scores) {
  const bins = Array(10).fill(0);
  scores.forEach(s => {
    let idx = Math.min(9, Math.floor(s));
    if (idx < 0) idx = 0;
    bins[idx]++;
  });
  const maxBin = Math.max(...bins, 1);

  return `
    <div class="grid grid-cols-10 gap-1.5 sm:gap-2 items-end h-40 pt-6 px-1 border-b border-slate-200 dark:border-slate-800">
      ${bins.map((count, idx) => {
        const pct = Math.round((count / maxBin) * 100);
        const label = idx === 9 ? "9-10" : `${idx}-${idx + 1}`;
        return `
          <div class="flex flex-col items-center h-full justify-end">
            <span class="text-[9px] sm:text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">${count > 0 ? count : ""}</span>
            <div class="w-full max-w-[32px] rounded-t bg-blue-600 dark:bg-blue-500 transition-all" style="height: ${Math.max(4, pct)}%;"></div>
            <span class="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-1">${label}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// =========================================================================
// === YÊU CẦU 5: XUẤT EXCEL ĐA LỚP & BẢNG SO SÁNH TỔNG HỢP ===
// =========================================================================

window.openExportModal = function openExportModal() {
  const modal = document.getElementById("exportModal");
  if (modal) modal.classList.remove("hidden");
};

window.closeExportModal = function closeExportModal() {
  const modal = document.getElementById("exportModal");
  if (modal) modal.classList.add("hidden");
};

window.exportResultsToExcel = function exportResultsToExcel() {
  const exam = window.appState.getCurrentExam();
  if (!exam) return;

  const allResults = window.appState.data.results.filter(r => r.examId === exam.id);
  const assignedClasses = (exam.classIds || []).map(cId => window.appState.data.classes.find(c => c.id === cId)).filter(Boolean);

  const wb = XLSX.utils.book_new();

  // SHEET 1: TỔNG HỢP & SO SÁNH GIỮA CÁC LỚP
  const summaryData = [
    [`BẢNG TỔNG HỢP & SO SÁNH CHẤT LƯỢNG GIỮA CÁC LỚP`],
    [`Bài thi: ${exam.name} • Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}`],
    [],
    ["STT", "Tên Lớp", "Sĩ Số", "Đã Nộp", "Tỷ Lệ Nộp (%)", "Điểm Trung Bình", "Điểm Cao Nhất", "Điểm Thấp Nhất", "Tỷ Lệ Đạt (≥5đ)", "Tỷ Lệ Giỏi (≥8đ)"]
  ];

  let totalRoster = 0;
  let totalGraded = 0;

  assignedClasses.forEach((cls, idx) => {
    const cRes = allResults.filter(r => r.classId === cls.id);
    const cScores = cRes.map(r => r.total_score);
    const roster = cls.students?.length || 0;
    const graded = cRes.length;
    const avg = cScores.length > 0 ? (cScores.reduce((a, b) => a + b, 0) / cScores.length) : 0;
    const max = cScores.length > 0 ? Math.max(...cScores) : 0;
    const min = cScores.length > 0 ? Math.min(...cScores) : 0;
    const passRate = cScores.length > 0 ? Math.round((cScores.filter(s => s >= 5.0).length / cScores.length) * 100) : 0;
    const goodRate = cScores.length > 0 ? Math.round((cScores.filter(s => s >= 8.0).length / cScores.length) * 100) : 0;
    const turnInRate = roster > 0 ? Math.round((graded / roster) * 100) : 100;

    totalRoster += roster;
    totalGraded += graded;

    summaryData.push([
      idx + 1,
      cls.name,
      roster,
      graded,
      turnInRate + "%",
      Number(avg.toFixed(2)),
      Number(max.toFixed(2)),
      Number(min.toFixed(2)),
      passRate + "%",
      goodRate + "%"
    ]);
  });

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary["!cols"] = [{ wch: 6 }, { wch: 22 }, { wch: 10 }, { wch: 10 }, { wch: 14 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, "TongHopSoSanh");

  // SHEET 2..N: TỪNG SHEET CHO TỪNG LỚP HỌC
  assignedClasses.forEach(cls => {
    const cRes = allResults.filter(r => r.classId === cls.id);
    const classData = [
      [`BẢNG ĐIỂM CHI TIẾT - ${cls.name.toUpperCase()}`],
      [`Bài thi: ${exam.name} • Sĩ số: ${cls.students?.length || 0} • Đã nộp: ${cRes.length}`],
      [],
      ["STT", "Số Báo Danh", "Họ và Tên", "Mã Đề", "Điểm Phần I", "Điểm Phần II", "Điểm Phần III", "Tổng Điểm", "Chỉnh Sửa"]
    ];

    if (cls.students && cls.students.length > 0) {
      cls.students.forEach((std, sIdx) => {
        const r = cRes.find(res => res.sbd === std.sbd);
        if (r) {
          classData.push([
            sIdx + 1,
            std.sbd,
            std.name,
            r.made,
            r.part1_score || 0,
            r.part2_score || 0,
            r.part3_score || 0,
            r.total_score || 0,
            r.manualOverrides && r.manualOverrides.hasAnyEdit ? "Đã sửa thủ công" : ""
          ]);
        } else {
          classData.push([
            sIdx + 1,
            std.sbd,
            std.name,
            "-",
            "-",
            "-",
            "-",
            "Chưa nộp bài",
            ""
          ]);
        }
      });
    } else {
      cRes.forEach((r, rIdx) => {
        classData.push([
          rIdx + 1,
          r.sbd,
          r.studentName,
          r.made,
          r.part1_score || 0,
          r.part2_score || 0,
          r.part3_score || 0,
          r.total_score || 0,
          r.manualOverrides && r.manualOverrides.hasAnyEdit ? "Đã sửa thủ công" : ""
        ]);
      });
    }

    const wsClass = XLSX.utils.aoa_to_sheet(classData);
    wsClass["!cols"] = [{ wch: 6 }, { wch: 14 }, { wch: 24 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 18 }];
    const safeSheetName = cls.name.replace(/[^A-Za-z0-9]/g, "_").substr(0, 28);
    XLSX.utils.book_append_sheet(wb, wsClass, safeSheetName || "Lop");
  });

  // NẾU CÓ THÍ SINH TỰ DO
  const freeResults = allResults.filter(r => !r.classId || r.className === "Tự do");
  if (freeResults.length > 0) {
    const freeData = [
      [`BẢNG ĐIỂM THÍ SINH TỰ DO`],
      [`Bài thi: ${exam.name} • Số lượng: ${freeResults.length}`],
      [],
      ["STT", "Số Báo Danh", "Họ và Tên", "Mã Đề", "Điểm Phần I", "Điểm Phần II", "Điểm Phần III", "Tổng Điểm"]
    ];
    freeResults.forEach((r, idx) => {
      freeData.push([idx + 1, r.sbd, r.studentName, r.made, r.part1_score || 0, r.part2_score || 0, r.part3_score || 0, r.total_score || 0]);
    });
    const wsFree = XLSX.utils.aoa_to_sheet(freeData);
    XLSX.utils.book_append_sheet(wb, wsFree, "ThiSinhTuDo");
  }

  const fileName = `BangDiem_${exam.name.replace(/[^A-Za-z0-9]/g, "_")}.xlsx`;
  XLSX.writeFile(wb, fileName);
  window.closeExportModal();
};

window.exportResultsByMode = function exportResultsByMode(mode) {
  window.exportResultsToExcel();
};

// =========================================================================
// === CÀI ĐẶT CHUNG (GENERAL SETTINGS) ===
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
    scoreRounding: getVal("settingScoreRounding") || "0.01"
  };

  window.appState.save();
};

window.resetDefaultSettings = function resetDefaultSettings() {
  if (confirm("Khôi phục toàn bộ Cài đặt chung về mặc định?")) {
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
        window.renderStudentsList();
        window.loadSettingsToUI();
        alert("Đã khôi phục dữ liệu thành công!");
      } else {
        alert("File sao lưu JSON không hợp lệ!");
      }
    } catch (err) {
      alert("Lỗi khi đọc file sao lưu JSON!");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
};

// =========================================================================
// === DANH MỤC MẪU PHIẾU IN (TEMPLATE GALLERY) ===
// =========================================================================

window.renderTemplateGallery = function renderTemplateGallery() {
  const container = document.getElementById("templateGalleryGrid");
  if (!container) return;

  const entries = Object.entries(SHEET_TYPES);
  container.innerHTML = entries.map(([key, item]) => `
    <div class="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div class="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3 relative group">
          <img src="samples/${item.file}" alt="${item.name}" class="w-full h-full object-contain p-1">
          <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
            <button onclick="window.previewSelectedSheetTemplate('${key}')" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md">
              👁️ Xem lớn
            </button>
            <a href="samples/${item.file}" download="${item.file}" class="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-xs font-semibold shadow-md">
              ⬇️ Tải file
            </a>
          </div>
        </div>
        <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">${item.name}</h4>
        <p class="text-[11px] text-slate-400 mt-0.5 line-clamp-2">${item.desc}</p>
      </div>
      <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span class="font-mono text-[10px] text-slate-500">${item.p1_num} TN | ${item.p2_num} Đ/S | ${item.p3_num} TLN</span>
        <a href="samples/${item.file}" download="${item.file}" class="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tải về in</a>
      </div>
    </div>
  `).join("");
};

// =========================================================================
// === ĐIỀU HƯỚNG TAB & KHỞI CHẠY ỨNG DỤNG ===
// =========================================================================

window.switchTab = function switchTab(tabName) {
  const tabIds = ["hub", "scan", "exams", "classes", "results", "stats", "templates", "settings"];

  tabIds.forEach(t => {
    const content = document.getElementById("tabContent_" + t);
    const dBtn = document.getElementById("tabBtn_" + t);
    const mBtn = document.getElementById("mobileTabBtn_" + t);

    if (t === tabName) {
      if (content) content.classList.remove("hidden");
      if (dBtn) dBtn.classList.add("active");
      if (mBtn) mBtn.classList.add("active");
    } else {
      if (content) content.classList.add("hidden");
      if (dBtn) dBtn.classList.remove("active");
      if (mBtn) mBtn.classList.remove("active");
    }
  });

  window.appState.data.currentTab = tabName;
  window.appState.save();

  if (tabName === "scan") {
    initCamera();
  } else {
    stopCameraAndLoop();
  }

  if (tabName === "hub") window.renderExamHub();
  if (tabName === "exams") window.renderVisualAnswerSheet();
  if (tabName === "classes") window.renderStudentsList();
  if (tabName === "results") window.renderResultsTable();
  if (tabName === "stats") window.renderStatsReport();
  if (tabName === "templates") window.renderTemplateGallery();
  if (tabName === "settings") window.loadSettingsToUI();
};

window.updateExamSelect = function updateExamSelect() {
  const select = document.getElementById("headerExamSelect");
  if (!select) return;

  const exams = window.appState.data.exams || [];
  if (exams.length === 0) {
    select.innerHTML = '<option value="">(Chưa có bài thi)</option>';
    return;
  }

  select.innerHTML = exams.map(e => 
    `<option value="${e.id}" ${e.id === window.appState.data.currentExamId ? "selected" : ""}>${e.name}</option>`
  ).join("");
};

window.onExamChange = function onExamChange(examId) {
  if (!examId) return;
  window.appState.data.currentExamId = examId;
  const exam = window.appState.getCurrentExam();
  if (exam && exam.answerKeys) {
    window.appState.data.activeMade = Object.keys(exam.answerKeys)[0] || "101";
  }
  window.appState.save();
  window.updateExamSelect();
  window.renderExamHub();
  window.renderVisualAnswerSheet();
  window.renderResultsTable();
  window.renderStatsReport();
};

// =========================================================================
// === DOMContentLoaded: KHỞI TẠO HỆ THỐNG ===
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  window.initTheme();
  window.appState = new AppState();

  window.updateExamSelect();
  window.renderExamHub();
  window.renderVisualAnswerSheet();
  window.renderStudentsList();
  window.renderResultsTable();
  window.renderStatsReport();
  window.renderTemplateGallery();
  window.loadSettingsToUI();

  const startTab = window.appState.data.currentTab || "hub";
  window.switchTab(startTab);
});
