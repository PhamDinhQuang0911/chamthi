/**
 * QMATH OMR 2025 - MODULE BỔ SUNG v4
 * 1. Giải mã QR đáp án: định dạng JSON type 6 ("P1#P2_P2#P3_P3") và mảng QM decodeData [[made, ...]]
 * 2. Nạp đáp án Excel: chuẩn QM (ngang: mã đề | 40 TN | 32 ý Đ/S | 12 TLN), SmartTest, YoungMix (dọc: Câu × Mã đề)
 * 3. Chọn bài cần chấm trước khi quét + nút "Chấm" trên từng bài trong danh sách
 * 4. Danh sách bài kiểm tra được gán cho từng lớp học
 */
(function () {
  "use strict";

  // =========================================================================
  // TIỆN ÍCH CHUẨN HÓA Ô DỮ LIỆU
  // =========================================================================
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function cleanCell(v) {
    if (v === null || v === undefined) return "";
    let s = String(v).trim();
    if (s.startsWith("'")) s = s.slice(1).trim();
    return s;
  }

  function normalizeMade(raw) {
    let s = cleanCell(raw).replace(/\.0+$/, "");
    if (!/^\d{1,6}$/.test(s)) return null;
    if (s.length < 3) s = s.padStart(3, "0");
    return s;
  }

  function normP1(v) {
    const s = cleanCell(v).toUpperCase();
    return ["A", "B", "C", "D"].includes(s) ? s : "";
  }

  function normTF(v) {
    const s = cleanCell(v).toUpperCase();
    if (["Đ", "D", "T", "TRUE", "ĐÚNG", "DUNG", "1"].includes(s)) return "Đ";
    if (["S", "F", "FALSE", "SAI", "0"].includes(s)) return "S";
    return "";
  }

  function normP3(v) {
    let s = cleanCell(v);
    if (!s) return "";
    if (/^-?\d+[.,]0+$/.test(s)) s = s.replace(/[.,]0+$/, "");
    if (/^-?\d*\.\d+$/.test(s)) s = s.replace(".", ",");
    return s;
  }

  // Sửa lỗi mã hóa chữ "Đ" khi QR được đọc theo Latin-1
  function fixMojibake(s) {
    if (!/[ÃÄÆáº]/.test(s)) return s;
    try { return decodeURIComponent(escape(s)); } catch (e) { return s; }
  }

  // Tách chuỗi "ĐĐSS" thành 4 ý
  function splitTFGroup(str) {
    const chars = Array.from(cleanCell(str).toUpperCase().replace(/[\s,;|]/g, ""));
    const out = ["", "", "", ""];
    for (let i = 0; i < 4 && i < chars.length; i++) out[i] = normTF(chars[i]);
    return out;
  }

  const isP1Token = s => /^[ABCD]$/i.test(s);
  const isTFToken = s => /^[ĐDS]$/i.test(s);

  // =========================================================================
  // 1. GIẢI MÃ QR ĐÁP ÁN
  // =========================================================================

  // Mảng phẳng sau mã đề: [P1..., P2 (4 ý/câu)..., P3...] -> tách theo cấu hình bài hoặc tự suy luận
  function splitFlatItems(items, cfg) {
    const vals = items.map(cleanCell);
    const n1 = cfg ? (parseInt(cfg.p1_num, 10) || 0) : 0;
    const n2 = cfg ? (parseInt(cfg.p2_num, 10) || 0) : 0;
    const n3 = cfg ? (parseInt(cfg.p3_num, 10) || 0) : 0;

    // a) Khớp đúng cấu hình bài hiện tại (giống QM decodeData)
    if (cfg && vals.length === n1 + 4 * n2 + n3) {
      const p1ok = vals.slice(0, n1).every(v => !v || isP1Token(v));
      const p2ok = vals.slice(n1, n1 + 4 * n2).every(v => !v || isTFToken(v));
      if (p1ok && p2ok) return { p1c: n1, p2c: n2, p3c: n3, vals };
    }

    // b) Tự suy luận: Phần III là đuôi không phải chữ cái
    let end = vals.length;
    while (end > 0 && !isP1Token(vals[end - 1]) && !isTFToken(vals[end - 1])) end--;
    const p3c = vals.length - end;
    const letters = vals.slice(0, end);

    // Phần II: số nhóm 4 ý Đ/S lớn nhất ở cuối dãy chữ cái
    let p2c = 0;
    while (letters.length - 4 * (p2c + 1) >= 0) {
      const grp = letters.slice(letters.length - 4 * (p2c + 1), letters.length - 4 * p2c);
      if (grp.every(isTFToken)) p2c++; else break;
    }
    // Ưu tiên số câu Đ/S theo cấu hình nếu hợp lệ
    if (cfg && n2 > 0 && n2 <= p2c) p2c = n2;
    return { p1c: letters.length - 4 * p2c, p2c, p3c, vals };
  }

  function entryFromFlat(made, items, cfg) {
    const m = normalizeMade(made);
    if (!m) return null;
    const { p1c, p2c, p3c, vals } = splitFlatItems(items, cfg);
    const p1 = vals.slice(0, p1c).map(normP1);
    const p2 = [];
    for (let q = 0; q < p2c; q++) p2.push(vals.slice(p1c + 4 * q, p1c + 4 * q + 4).map(normTF));
    const p3 = vals.slice(p1c + 4 * p2c, p1c + 4 * p2c + p3c).map(normP3);
    return { made: m, p1, p2, p3 };
  }

  // "DCBA...#ĐĐSS_SSĐS#-4_71,7_2,29"
  function entryFromHashString(made, str) {
    const m = normalizeMade(made);
    if (!m || typeof str !== "string") return null;
    const seg = fixMojibake(str).split("#");
    const p1 = Array.from((seg[0] || "").replace(/\s/g, "")).map(normP1);
    const p2 = (seg[1] || "").split("_").filter(g => g.trim() !== "").map(splitTFGroup);
    const p3 = (seg[2] || "").split("_").map(normP3);
    while (p3.length && !p3[p3.length - 1]) p3.pop();
    return { made: m, p1, p2, p3 };
  }

  function parseQRPayload(raw, cfg) {
    const s = fixMojibake(String(raw || "").trim());
    if (!s) return null;
    let parsed = null;
    try { parsed = JSON.parse(s); } catch (e) { parsed = null; }

    if (Array.isArray(parsed)) {
      // [[made, ...], [made, ...]] hoặc [made, ...]
      const list = Array.isArray(parsed[0]) ? parsed : [parsed];
      const entries = list.filter(a => Array.isArray(a) && a.length > 1).map(a => entryFromFlat(a[0], a.slice(1), cfg)).filter(Boolean);
      return entries.length ? { format: "Mảng đáp án QM", entries } : null;
    }

    if (parsed && typeof parsed === "object") {
      // Định dạng chia sẻ nội bộ QMATH
      if (parsed.made && (parsed.part1 || parsed.part2 || parsed.part3)) {
        const p2 = [];
        const p2obj = parsed.part2 || {};
        Object.keys(p2obj).sort((a, b) => a - b).forEach(k => p2.push((p2obj[k] || []).map(normTF)));
        return {
          format: "QMATH",
          entries: [{ made: normalizeMade(parsed.made) || String(parsed.made), p1: (parsed.part1 || []).map(normP1), p2, p3: (parsed.part3 || []).map(normP3) }]
        };
      }
      // Định dạng type 6: {"0101": "P1#P2#P3", "success": true, "type": 6}
      const entries = Object.keys(parsed)
        .filter(k => /^\d{1,6}$/.test(k) && typeof parsed[k] === "string")
        .map(k => entryFromHashString(k, parsed[k]))
        .filter(Boolean);
      if (entries.length) return { format: `QR type ${parsed.type != null ? parsed.type : "?"}`, entries };
      return null;
    }

    // Chuỗi thô "0101:DCBA#...#..." hoặc "0101|..."
    const mRaw = s.match(/^(\d{3,6})\s*[:|=]\s*(.+)$/);
    if (mRaw) {
      const e = entryFromHashString(mRaw[1], mRaw[2]);
      if (e) return { format: "Chuỗi mã đề", entries: [e] };
    }
    if (s.includes("#")) {
      const e = entryFromHashString((cfg && cfg.made_digits === 4) ? "0101" : "101", s);
      if (e) return { format: "Chuỗi đáp án", entries: [e] };
    }
    return null;
  }

  // =========================================================================
  // 2. ĐỌC FILE EXCEL ĐÁP ÁN (QM / SMARTTEST / YOUNGMIX)
  // =========================================================================

  function qNum(v) {
    const m = cleanCell(v).match(/^(?:c[âa]u\s*)?(\d+)\s*$/i);
    return m ? parseInt(m[1], 10) : null;
  }

  // Bảng dọc: hàng đầu "Câu\Mã đề" | mã đề..., các khối câu đánh số lại từ 1 cho mỗi phần
  function parseVerticalSheet(rows, headerIdx) {
    const header = rows[headerIdx];
    const cols = [];
    for (let c = 1; c < header.length; c++) {
      const m = normalizeMade(header[c]);
      if (m) cols.push({ c, made: m });
    }
    if (!cols.length) return null;

    // Chia thành các khối theo số thứ tự câu reset
    const blocks = [];
    let cur = null, prev = 0;
    for (let r = headerIdx + 1; r < rows.length; r++) {
      const q = qNum(rows[r][0]);
      if (q == null) continue;
      if (!cur || q <= prev) { cur = []; blocks.push(cur); }
      cur.push({ q, row: rows[r] });
      prev = q;
    }
    if (!blocks.length) return null;

    // Xác định khối nào là Phần II (chuỗi Đ/S) và Phần III
    const looksTF = blk => {
      const vals = [];
      blk.forEach(({ row }) => cols.forEach(({ c }) => { const v = cleanCell(row[c]); if (v) vals.push(v); }));
      return vals.length > 0 && vals.every(v => /^[ĐDSđds]{2,4}$/.test(v));
    };
    let p2Block = null, p3Block = null;
    const rest = blocks.slice(1);
    if (rest.length >= 1) {
      if (looksTF(rest[0])) { p2Block = rest[0]; p3Block = rest[1] || null; }
      else { p3Block = rest[0]; }
    }

    const entries = cols.map(({ c, made }) => {
      const p1 = [], p2 = [], p3 = [];
      blocks[0].forEach(({ q, row }) => { p1[q - 1] = normP1(row[c]); });
      (p2Block || []).forEach(({ q, row }) => { p2[q - 1] = cleanCell(row[c]) ? splitTFGroup(row[c]) : ["", "", "", ""]; });
      (p3Block || []).forEach(({ q, row }) => { p3[q - 1] = normP3(row[c]); });
      return { made, p1: Array.from(p1, v => v || ""), p2: Array.from(p2, v => v || ["", "", "", ""]), p3: Array.from(p3, v => v || "") };
    });
    return { format: "Bảng dọc Câu × Mã đề (YoungMix / SmartTest)", entries };
  }

  // Bảng ngang có tiêu đề: "Đề\câu" | 1..40 | 1a..8d | 1..12
  function parseHorizontalWithHeader(rows, headerIdx) {
    const header = rows[headerIdx];
    const map = []; // {c, part, q, k}
    let part = 1, prevNum = 0, seenP2 = false;
    for (let c = 1; c < header.length; c++) {
      const h = cleanCell(header[c]).toLowerCase();
      if (!h) continue;
      const tf = h.match(/^(?:c[âa]u\s*)?(\d+)\s*([a-d])$/i);
      if (tf) {
        seenP2 = true; part = 2;
        map.push({ c, part: 2, q: parseInt(tf[1], 10), k: "abcd".indexOf(tf[2].toLowerCase()) });
        continue;
      }
      const n = qNum(h);
      if (n == null) continue;
      if (part === 2 || (part === 1 && n <= prevNum)) part = 3;
      map.push({ c, part, q: n });
      prevNum = n;
    }
    if (!map.length) return null;

    const entries = [];
    for (let r = headerIdx + 1; r < rows.length; r++) {
      const row = rows[r];
      const made = normalizeMade(row[0]);
      if (!made) continue;
      const p1 = [], p2 = [], p3 = [];
      map.forEach(({ c, part: pt, q, k }) => {
        if (pt === 1) p1[q - 1] = normP1(row[c]);
        else if (pt === 2) { if (!p2[q - 1]) p2[q - 1] = ["", "", "", ""]; p2[q - 1][k] = normTF(row[c]); }
        else p3[q - 1] = normP3(row[c]);
      });
      entries.push({ made, p1: Array.from(p1, v => v || ""), p2: Array.from(p2, v => v || ["", "", "", ""]), p3: Array.from(p3, v => v || "") });
    }
    return entries.length ? { format: seenP2 ? "Bảng ngang chuẩn QM / SmartTest" : "Bảng ngang", entries } : null;
  }

  // Bảng ngang không tiêu đề: vị trí cột cố định như QM importXLSX (cột 1-40, 41-72, 73-84)
  function parseQMFixedColumns(rows) {
    const entries = [];
    rows.forEach(row => {
      const made = normalizeMade(row[0]);
      if (!made) return;
      const p1 = [], p2 = [], p3 = [];
      for (let c = 1; c <= 40; c++) p1.push(normP1(row[c]));
      for (let q = 0; q < 8; q++) {
        const g = [];
        for (let k = 0; k < 4; k++) g.push(normTF(row[41 + q * 4 + k]));
        p2.push(g);
      }
      for (let c = 73; c <= 84; c++) p3.push(normP3(row[c]));
      entries.push({ made, p1, p2, p3 });
    });
    return entries.length ? { format: "Bảng ngang chuẩn QM (cột cố định)", entries } : null;
  }

  function parseAnswerSheetRows(rows) {
    rows = (rows || []).map(r => Array.isArray(r) ? r : []);
    for (let r = 0; r < Math.min(rows.length, 6); r++) {
      const h = cleanCell(rows[r][0]).toLowerCase();
      if (/c[âa]u\s*[\\\/]\s*m[ãa]/.test(h) || /^c[âa]u$/.test(h)) {
        const res = parseVerticalSheet(rows, r);
        if (res) return res;
      }
      if (/đ[ềe]\s*[\\\/]\s*c[âa]u/.test(h) || /^m[ãa]\s*đ[ềe]$/.test(h) || /^đ[ềe]$/.test(h)) {
        const res = parseHorizontalWithHeader(rows, r);
        if (res) return res;
      }
      // Tiêu đề không có nhãn ô đầu nhưng có cột "1a"
      if (rows[r].some(v => /^\d+\s*[a-d]$/i.test(cleanCell(v)))) {
        const res = parseHorizontalWithHeader(rows, r);
        if (res) return res;
      }
    }
    // Không có tiêu đề: thử kiểu dọc (hàng đầu là mã đề) rồi kiểu QM cố định
    if (rows.length && !normalizeMade(rows[0][0]) && rows[0].slice(1).filter(v => normalizeMade(v)).length >= 1 && qNum(rows[1] && rows[1][0]) === 1) {
      const res = parseVerticalSheet(rows, 0);
      if (res) return res;
    }
    return parseQMFixedColumns(rows);
  }

  // =========================================================================
  // ĐỌC TRỰC TIẾP XML TRONG FILE .xlsx (dự phòng cho file xuất tối giản từ
  // SmartTest / YoungMix: thiếu [Content_Types] hoặc thẻ dimension -> SheetJS bỏ qua sheet)
  // =========================================================================
  function colIndexFromRef(ref) {
    const m = String(ref || "").match(/^([A-Z]+)/i);
    if (!m) return -1;
    let n = 0;
    for (const ch of m[1].toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
    return n - 1;
  }

  function readXlsxRowsRaw(u8) {
    if (!window.XLSX || !XLSX.CFB) return [];
    const zip = XLSX.CFB.read(u8, { type: "array" });
    const getText = path => {
      const f = XLSX.CFB.find(zip, path) || XLSX.CFB.find(zip, "/" + path);
      if (!f || !f.content) return null;
      return new TextDecoder("utf-8").decode(f.content instanceof Uint8Array ? f.content : new Uint8Array(f.content));
    };
    const parser = new DOMParser();
    const shared = [];
    const ssXml = getText("xl/sharedStrings.xml");
    if (ssXml) {
      const doc = parser.parseFromString(ssXml, "application/xml");
      Array.from(doc.getElementsByTagName("si")).forEach(si => {
        shared.push(Array.from(si.getElementsByTagName("t")).map(t => t.textContent).join(""));
      });
    }
    // Tìm sheet đầu tiên
    let sheetXml = getText("xl/worksheets/sheet1.xml");
    if (!sheetXml) {
      const name = (zip.FullPaths || []).find(p => /xl\/worksheets\/[^/]+\.xml$/i.test(p));
      if (name) sheetXml = getText(name.replace(/^\/?(Root Entry\/)?/, ""));
    }
    if (!sheetXml) return [];
    const doc = parser.parseFromString(sheetXml, "application/xml");
    const rows = [];
    Array.from(doc.getElementsByTagName("row")).forEach((rowEl, ri) => {
      const rIdx = (parseInt(rowEl.getAttribute("r"), 10) || ri + 1) - 1;
      const row = [];
      let autoCol = 0;
      Array.from(rowEl.getElementsByTagName("c")).forEach(c => {
        const ref = c.getAttribute("r");
        const ci = ref ? colIndexFromRef(ref) : autoCol;
        autoCol = ci + 1;
        const t = c.getAttribute("t");
        const vEl = c.getElementsByTagName("v")[0];
        let val = "";
        if (t === "inlineStr") val = Array.from(c.getElementsByTagName("t")).map(x => x.textContent).join("");
        else if (t === "s") val = shared[parseInt(vEl && vEl.textContent, 10)] || "";
        else if (vEl) {
          val = vEl.textContent;
          if (t !== "str" && t !== "e" && val !== "" && !isNaN(Number(val))) val = Number(val);
        }
        row[ci] = val;
      });
      rows[rIdx] = Array.from(row, v => (v === undefined ? "" : v));
    });
    return Array.from(rows, r => r || []);
  }

  // =========================================================================
  // ÁP DỤNG ĐÁP ÁN ĐÃ GIẢI MÃ VÀO BÀI KIỂM TRA
  // =========================================================================
  function lastFilled(arr, isFilled) {
    for (let i = arr.length - 1; i >= 0; i--) if (isFilled(arr[i])) return i + 1;
    return 0;
  }

  function applyImportedKeys(result, sourceLabel) {
    const exam = window.appState.getCurrentExam();
    if (!exam) { alert("Vui lòng tạo bài kiểm tra trước khi nạp đáp án!"); return false; }
    const entries = (result && result.entries || []).filter(e => e && e.made);
    if (!entries.length) { alert(`Không tìm thấy mã đề hợp lệ trong ${sourceLabel}!`); return false; }

    const cfg = exam.config;
    let n1 = 0, n2 = 0, n3 = 0, maxLen = 0;
    entries.forEach(e => {
      n1 = Math.max(n1, lastFilled(e.p1, v => !!v));
      n2 = Math.max(n2, lastFilled(e.p2, g => g && g.some(v => !!v)));
      n3 = Math.max(n3, lastFilled(e.p3, v => v !== "" && v != null));
      maxLen = Math.max(maxLen, e.made.length);
    });

    const notes = [];
    if (n1 !== cfg.p1_num || n2 !== cfg.p2_num || n3 !== cfg.p3_num) {
      const ok = confirm(
        `Dữ liệu ${sourceLabel} có cấu trúc: ${n1} câu TN – ${n2} câu Đ/S – ${n3} câu TLN.\n` +
        `Cấu hình bài "${exam.name}" hiện tại: ${cfg.p1_num} – ${cfg.p2_num} – ${cfg.p3_num}.\n\n` +
        `• OK: cập nhật cấu trúc đề theo dữ liệu nạp vào (khuyên dùng)\n• Hủy: giữ cấu trúc hiện tại (phần thừa bị bỏ qua)`
      );
      if (ok) {
        cfg.p1_num = n1; cfg.p2_num = n2; cfg.p3_num = n3;
        Object.keys(exam.answerKeys || {}).forEach(m => { exam.answerKeys[m] = resizeAnswerKeyToConfig(exam.answerKeys[m], cfg); });
        notes.push(`Đã cập nhật cấu trúc đề: ${n1} – ${n2} – ${n3}`);
      }
    }

    const digits = cfg.made_digits === 4 ? 4 : 3;
    if (maxLen >= 4 && digits === 3) {
      cfg.made_digits = 4;
      notes.push("Mã đề có 4 chữ số → đã chuyển bài sang chế độ mã đề 4 số");
    }
    const finalDigits = cfg.made_digits === 4 ? 4 : 3;

    const existing = Object.keys(exam.answerKeys || {});
    let replaceAll = false;
    if (existing.length) {
      replaceAll = confirm(
        `Bài đang có ${existing.length} mã đề (${existing.slice(0, 6).join(", ")}${existing.length > 6 ? "…" : ""}).\n\n` +
        `• OK: XÓA mã đề cũ, thay bằng ${entries.length} mã đề mới\n• Hủy: GIỮ mã đề cũ, chỉ thêm/ghi đè mã đề trùng`
      );
    }
    if (replaceAll || !exam.answerKeys) exam.answerKeys = {};

    const imported = [];
    entries.forEach(e => {
      const made = e.made.length < finalDigits ? e.made.padStart(finalDigits, "0") : e.made;
      const key = createDefaultKey(cfg);
      for (let i = 0; i < key.part1.length; i++) key.part1[i] = e.p1[i] || "";
      for (let q = 1; q <= (parseInt(cfg.p2_num, 10) || 0); q++) {
        const g = e.p2[q - 1];
        key.part2[String(q)] = g ? g.map(v => v || "") : ["", "", "", ""];
      }
      for (let i = 0; i < key.part3.length; i++) key.part3[i] = e.p3[i] || "";
      exam.answerKeys[made] = key;
      imported.push(made);
    });

    window.appState.data.activeMade = imported[0];
    window.appState.save();
    window.renderVisualAnswerSheet && window.renderVisualAnswerSheet();
    window.renderExamHub && window.renderExamHub();
    typeof playBeep === "function" && playBeep(true);

    alert(
      `✅ Đã nạp ${imported.length} mã đề từ ${sourceLabel}\n` +
      `Định dạng nhận dạng: ${result.format}\n` +
      `Mã đề: ${imported.slice(0, 12).join(", ")}${imported.length > 12 ? "…" : ""}\n` +
      `Cấu trúc: ${cfg.p1_num} TN – ${cfg.p2_num} Đ/S – ${cfg.p3_num} TLN` +
      (notes.length ? `\n\n${notes.map(n => "• " + n).join("\n")}` : "")
    );
    return true;
  }

  // =========================================================================
  // GHI ĐÈ CÁC HÀM NẠP EXCEL / QR TRONG app.js
  // =========================================================================
  window.handleExcelKeyUpload = function handleExcelKeyUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const u8 = new Uint8Array(e.target.result);
        let result = null;
        try {
          const wb = XLSX.read(u8, { type: "array" });
          for (const name of wb.SheetNames) {
            if (!wb.Sheets[name]) continue;
            const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "", raw: true });
            result = parseAnswerSheetRows(rows);
            if (result && result.entries.length) break;
          }
        } catch (readErr) {
          console.warn("SheetJS không đọc được, dùng bộ đọc XML dự phòng:", readErr);
        }
        if ((!result || !result.entries.length) && /\.xlsx$/i.test(file.name)) {
          result = parseAnswerSheetRows(readXlsxRowsRaw(u8));
        }
        if (!result || !result.entries.length) {
          alert("Không đọc được đáp án trong file Excel.\n\nHỗ trợ: file chuẩn QM (tải \"File mẫu\"), file xuất từ SmartTest, YoungMix.");
          return;
        }
        applyImportedKeys(result, `file "${file.name}"`);
      } catch (err) {
        console.error("Excel import error:", err);
        alert("Lỗi khi đọc file Excel: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = "";
  };

  // File mẫu chuẩn QM: cột A mã đề | B..AO: 40 câu TN | AP..BU: 1a..8d | BV..CG: 12 câu TLN
  window.downloadExcelKeyTemplate = function downloadExcelKeyTemplate() {
    const exam = window.appState && window.appState.getCurrentExam();
    const header = ["Đề\\câu"];
    for (let i = 1; i <= 40; i++) header.push(i);
    for (let q = 1; q <= 8; q++) "abcd".split("").forEach(k => header.push(`${q}${k}`));
    for (let i = 1; i <= 12; i++) header.push(i);

    const rows = [header];
    const keys = exam ? exam.answerKeys || {} : {};
    const codes = Object.keys(keys);
    const buildRow = (made, key) => {
      const row = [made];
      for (let i = 0; i < 40; i++) row.push((key.part1 && key.part1[i]) || "");
      for (let q = 1; q <= 8; q++) {
        const g = (key.part2 && key.part2[String(q)]) || [];
        for (let k = 0; k < 4; k++) row.push(g[k] === "Đ" ? "D" : (g[k] || ""));
      }
      for (let i = 0; i < 12; i++) row.push((key.part3 && key.part3[i]) || "");
      return row;
    };

    if (codes.length) {
      codes.forEach(m => rows.push(buildRow(m, keys[m])));
    } else {
      const L = ["A", "B", "C", "D"];
      ["101", "102", "103", "104"].forEach((m, idx) => {
        const key = { part1: [], part2: {}, part3: [] };
        for (let i = 0; i < 12; i++) key.part1.push(L[(i + idx) % 4]);
        for (let q = 1; q <= 4; q++) key.part2[String(q)] = ["Đ", "S", "Đ", "S"].map((v, k) => ((k + q + idx) % 2 ? "Đ" : "S"));
        key.part3 = ["1,5", "-2", "12", "0,25", "3", "45"];
        rows.push(buildRow(m, key));
      });
    }

    const ws = XLSX.utils.aoa_to_sheet(rows);
    // Mã đề dạng chữ để giữ số 0 đứng đầu (vd 0101)
    for (let r = 1; r < rows.length; r++) {
      const ref = XLSX.utils.encode_cell({ r, c: 0 });
      if (ws[ref]) { ws[ref].t = "s"; ws[ref].v = String(rows[r][0]); }
    }
    ws["!cols"] = [{ wch: 9 }].concat(Array(84).fill({ wch: 4.5 }));

    const guide = XLSX.utils.aoa_to_sheet([
      ["HƯỚNG DẪN FILE ĐÁP ÁN CHUẨN QM (chamthi.qmath.io.vn)"],
      [""],
      ["• Mỗi hàng là 1 mã đề. Cột A: mã đề (3 hoặc 4 chữ số, nhập dạng chữ để giữ số 0 đầu)."],
      ["• Cột B → AO (40 cột): Phần I – trắc nghiệm nhiều lựa chọn, ghi A/B/C/D."],
      ["• Cột AP → BU (32 cột, 1a..8d): Phần II – Đúng/Sai, ghi D (hoặc Đ) / S cho từng ý."],
      ["• Cột BV → CG (12 cột): Phần III – trả lời ngắn, ghi số (vd: 1,5 hoặc -2)."],
      ["• Câu không dùng thì để trống. Chỉ Sheet đầu tiên được đọc."],
      [""],
      ["Web cũng tự nhận dạng file đáp án xuất từ SmartTest và YoungMix (bảng dọc Câu\\Mã đề hoặc bảng ngang Đề\\câu)."]
    ]);
    guide["!cols"] = [{ wch: 100 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DapAn");
    XLSX.utils.book_append_sheet(wb, guide, "HuongDan");
    const safe = exam ? exam.name.replace(/[^\p{L}\p{N}]+/gu, "_").slice(0, 40) : "QMATH";
    XLSX.writeFile(wb, codes.length ? `DapAn_${safe}.xlsx` : "Mau_Dap_An_QM.xlsx");
  };

  // ---------- QR ----------
  let qrStream = null, qrAnim = null, qrBusy = false;
  const qrCanvas = document.createElement("canvas");
  const qrCtx = qrCanvas.getContext("2d", { willReadFrequently: true });

  function decodeQRFromSource(src, w, h) {
    const maxSide = 1280;
    const scale = Math.min(1, maxSide / Math.max(w, h));
    qrCanvas.width = Math.round(w * scale);
    qrCanvas.height = Math.round(h * scale);
    qrCtx.drawImage(src, 0, 0, qrCanvas.width, qrCanvas.height);
    if (typeof jsQR !== "function") return null;
    const img = qrCtx.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
    const code = jsQR(img.data, img.width, img.height, { inversionAttempts: "attemptBoth" });
    if (!code) return null;
    // Ưu tiên giải mã UTF-8 từ dữ liệu nhị phân (chữ "Đ")
    if (code.binaryData && code.binaryData.length && typeof TextDecoder !== "undefined") {
      try { return new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(code.binaryData)); } catch (e) { /* fallback */ }
    }
    return code.data;
  }

  async function detectWithBarcodeAPI(src) {
    if (!("BarcodeDetector" in window)) return null;
    try {
      const det = new window.BarcodeDetector({ formats: ["qr_code"] });
      const res = await det.detect(src);
      return res && res[0] ? res[0].rawValue : null;
    } catch (e) { return null; }
  }

  function stopQR() {
    if (qrAnim) { cancelAnimationFrame(qrAnim); qrAnim = null; }
    if (qrStream) { qrStream.getTracks().forEach(t => t.stop()); qrStream = null; }
  }

  window.importQRText = function importQRText(text) {
    const exam = window.appState.getCurrentExam();
    if (!exam) { alert("Vui lòng tạo bài kiểm tra trước!"); return false; }
    const result = parseQRPayload(text, exam.config);
    if (!result) {
      alert("Mã QR không đúng định dạng đáp án.\n\nNội dung đọc được:\n" + String(text).slice(0, 300));
      return false;
    }
    window.closeQRScannerModal();
    return applyImportedKeys(result, "mã QR");
  };

  window.importQRFromTextarea = function importQRFromTextarea() {
    const ta = document.getElementById("qrManualText");
    const v = ta ? ta.value.trim() : "";
    if (!v) { alert("Hãy dán nội dung mã QR vào ô trước."); return; }
    if (window.importQRText(v) && ta) ta.value = "";
  };

  window.openQRScannerModal = function openQRScannerModal() {
    const modal = document.getElementById("qrScannerModal");
    if (!modal) return;
    modal.classList.remove("hidden");
    const video = document.getElementById("qrVideoFeed");
    const status = document.getElementById("qrCameraStatus");
    if (!video || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (status) status.innerText = "Trình duyệt không hỗ trợ camera. Hãy tải ảnh QR hoặc dán nội dung.";
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } } })
      .then(stream => {
        qrStream = stream;
        video.srcObject = stream;
        video.play();
        if (status) status.innerText = "Hướng camera vào mã QR đáp án…";
        let frame = 0;
        const tick = async () => {
          if (!qrStream) return;
          frame++;
          if (!qrBusy && video.readyState === video.HAVE_ENOUGH_DATA && frame % 3 === 0) {
            qrBusy = true;
            let text = await detectWithBarcodeAPI(video);
            if (!text) text = decodeQRFromSource(video, video.videoWidth, video.videoHeight);
            qrBusy = false;
            if (text) { stopQR(); window.importQRText(text); return; }
          }
          qrAnim = requestAnimationFrame(tick);
        };
        qrAnim = requestAnimationFrame(tick);
      })
      .catch(() => { if (status) status.innerText = "Không mở được camera. Hãy tải ảnh QR hoặc dán nội dung bên dưới."; });
  };

  window.closeQRScannerModal = function closeQRScannerModal() {
    const modal = document.getElementById("qrScannerModal");
    if (modal) modal.classList.add("hidden");
    stopQR();
  };

  window.handleQRImageUpload = function handleQRImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
      let text = await detectWithBarcodeAPI(img);
      if (!text) text = decodeQRFromSource(img, img.naturalWidth, img.naturalHeight);
      if (!text && Math.max(img.naturalWidth, img.naturalHeight) > 800) {
        // Thử lại ở độ phân giải thấp hơn (ảnh chụp màn hình lớn)
        const c = document.createElement("canvas");
        const s = 800 / Math.max(img.naturalWidth, img.naturalHeight);
        c.width = img.naturalWidth * s; c.height = img.naturalHeight * s;
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        text = decodeQRFromSource(c, c.width, c.height);
      }
      URL.revokeObjectURL(url);
      if (text) window.importQRText(text);
      else alert("Không tìm thấy mã QR trong ảnh. Hãy chụp rõ, đủ sáng và không bị cắt mất góc.");
    };
    img.src = url;
    event.target.value = "";
  };

  // =========================================================================
  // 3. CHỌN BÀI CẦN CHẤM + NÚT "CHẤM" TRÊN DANH SÁCH BÀI
  // =========================================================================
  function examStats(exam) {
    const results = (window.appState.data.results || []).filter(r => r.examId === exam.id);
    const keyCount = Object.keys(exam.answerKeys || {}).length;
    const sheet = (window.SHEET_TYPES || {})[exam.sheet_type];
    const classes = (exam.classIds || []).map(id => (window.appState.data.classes || []).find(c => c.id === id)).filter(Boolean);
    return { results, keyCount, sheet, classes };
  }

  function examRowHTML(exam, opts) {
    const o = opts || {};
    const { results, keyCount, sheet, classes } = examStats(exam);
    const isCurrent = exam.id === window.appState.data.currentExamId;
    const cfg = exam.config || {};
    const classText = classes.length === 0 ? "Chưa gán lớp" : classes.length <= 2 ? classes.map(c => c.name).join(", ") : `${classes.length} lớp`;
    const classResCount = o.classId ? results.filter(r => r.classId === o.classId).length : null;
    const noKey = keyCount === 0;
    return `
      <div class="exam-row ${isCurrent && !o.picker ? "exam-row-current" : ""}" ${o.picker ? `onclick="window.gradeExam('${exam.id}')" role="button"` : ""}>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-sm text-slate-900 dark:text-white truncate">${esc(exam.name)}</span>
            ${isCurrent ? `<span class="exam-chip exam-chip-accent">Đang mở</span>` : ""}
          </div>
          <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span>${esc(sheet ? sheet.name : exam.sheet_type || "")} · ${cfg.made_digits === 4 ? 4 : 3} số</span>
            <span>·</span>
            <span class="${noKey ? "text-rose-600 dark:text-rose-400 font-semibold" : ""}">${noKey ? "Chưa có đáp án" : keyCount + " mã đề"}</span>
            <span>·</span>
            <span>${classResCount != null ? classResCount + " bài của lớp" : results.length + " bài đã chấm"}</span>
            ${o.classId ? "" : `<span>·</span><span class="truncate max-w-[140px]">${esc(classText)}</span>`}
          </div>
        </div>
        ${o.picker ? `
          <span class="btn-primary py-1.5 px-3 rounded-lg text-xs font-bold shrink-0">Chấm ›</span>
        ` : `
          <div class="flex items-center gap-1.5 shrink-0">
            ${o.classId ? `<button onclick="event.stopPropagation(); window.openExamResultsForClass('${exam.id}','${o.classId}')" class="btn-secondary py-1.5 px-2.5 rounded-lg text-xs font-semibold" title="Xem bài đã chấm của lớp">Kết quả</button>` : ""}
            ${isCurrent && !o.classId ? "" : `<button onclick="event.stopPropagation(); window.openExam('${exam.id}')" class="btn-secondary py-1.5 px-2.5 rounded-lg text-xs font-semibold" title="Mở bài kiểm tra">Mở</button>`}
            <button onclick="event.stopPropagation(); window.gradeExam('${exam.id}')" class="btn-primary py-1.5 px-3 rounded-lg text-xs font-bold" title="Chấm bài bằng đáp án của bài này">📷 Chấm</button>
          </div>
        `}
      </div>`;
  }

  window.openExam = function openExam(examId) {
    window.onExamChange(examId);
    window.switchTab("hub");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.gradeExam = function gradeExam(examId) {
    const exam = (window.appState.data.exams || []).find(e => e.id === examId);
    if (!exam) return;
    window.closeGradeExamPicker();
    if (examId !== window.appState.data.currentExamId) window.onExamChange(examId);
    if (!Object.keys(exam.answerKeys || {}).length) {
      if (!confirm(`Bài "${exam.name}" chưa có đáp án. Vẫn mở màn hình chấm?`)) { window.switchTab("exams"); return; }
    }
    window.switchTab("scan");
  };

  window.openGradeExamPicker = function openGradeExamPicker() {
    const exams = window.appState.data.exams || [];
    const modal = document.getElementById("gradeExamPickerModal");
    const list = document.getElementById("gradeExamPickerList");
    if (!modal || !list) { window.switchTab("scan"); return; }
    if (!exams.length) {
      list.innerHTML = `
        <div class="text-center py-8 space-y-3">
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">Chưa có bài kiểm tra nào</p>
          <button onclick="window.closeGradeExamPicker(); window.showCreateExamModal()" class="btn-primary py-2 px-4 rounded-lg text-xs font-bold">+ Tạo bài kiểm tra</button>
        </div>`;
    } else {
      list.innerHTML = exams.map(e => examRowHTML(e, { picker: true })).join("");
    }
    modal.classList.remove("hidden");
  };

  window.closeGradeExamPicker = function closeGradeExamPicker() {
    const modal = document.getElementById("gradeExamPickerModal");
    if (modal) modal.classList.add("hidden");
  };

  function renderHubExamList() {
    const box = document.getElementById("hubExamList");
    if (!box) return;
    const exams = window.appState.data.exams || [];
    if (!exams.length) { box.innerHTML = ""; box.classList.add("hidden"); return; }
    box.classList.remove("hidden");
    box.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Danh sách bài kiểm tra <span class="text-slate-400">(${exams.length})</span></h2>
          <button onclick="window.showCreateExamModal()" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">+ Bài mới</button>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-800 max-h-[300px] overflow-y-auto">
          ${exams.map(e => examRowHTML(e)).join("")}
        </div>
      </div>`;
  }

  // Bọc renderExamHub: không xóa khung HTML khi chưa có bài (tránh reload trang)
  const origRenderExamHub = window.renderExamHub;
  window.renderExamHub = function renderExamHub() {
    const exam = window.appState.getCurrentExam();
    const panel = document.getElementById("hubExamPanel");
    const empty = document.getElementById("hubEmptyState");
    if (panel && empty) {
      if (!exam) {
        panel.classList.add("hidden");
        empty.classList.remove("hidden");
        renderHubExamList();
        return;
      }
      panel.classList.remove("hidden");
      empty.classList.add("hidden");
    }
    origRenderExamHub();
    renderHubExamList();
  };

  // Cập nhật thanh tiêu đề màn hình chấm theo bài đang chấm
  function updateScanHeader() {
    const exam = window.appState.getCurrentExam();
    const nameEl = document.getElementById("scanHeaderExamName");
    const cntEl = document.getElementById("scanHeaderCount");
    const metaEl = document.getElementById("scanHeaderExamMeta");
    if (nameEl) nameEl.innerText = exam ? exam.name : "Chưa chọn bài";
    if (cntEl) cntEl.innerText = exam ? (window.appState.data.results || []).filter(r => r.examId === exam.id).length : 0;
    if (metaEl && exam) {
      const { keyCount, sheet } = examStats(exam);
      metaEl.innerText = `${sheet ? sheet.name : ""} · ${keyCount} mã đề`;
    }
  }
  window.updateScanHeader = updateScanHeader;

  const origSwitchTab = window.switchTab;
  window.switchTab = function switchTab(tabName) {
    origSwitchTab(tabName);
    if (tabName === "scan") updateScanHeader();
  };

  // =========================================================================
  // 4. DANH SÁCH BÀI KIỂM TRA ĐƯỢC GÁN CHO LỚP
  // =========================================================================
  window.openExamResultsForClass = function openExamResultsForClass(examId, classId) {
    if (examId !== window.appState.data.currentExamId) window.onExamChange(examId);
    window.switchTab("results");
    const sel = document.getElementById("resultsClassFilter");
    if (sel && Array.from(sel.options).some(o => o.value === classId)) {
      sel.value = classId;
      sel.dispatchEvent(new Event("change"));
    }
  };

  function renderClassExams() {
    const box = document.getElementById("classAssignedExams");
    if (!box) return;
    const cls = window.appState.getCurrentClass();
    if (!cls) { box.innerHTML = ""; return; }
    const exams = (window.appState.data.exams || []).filter(e => (e.classIds || []).includes(cls.id));
    box.innerHTML = `
      <div class="rounded-xl border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 rounded-t-xl">
          <h3 class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Bài kiểm tra được gán · ${esc(cls.name)} <span class="text-slate-400">(${exams.length})</span></h3>
          <button onclick="window.showCreateExamModal()" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">+ Bài mới</button>
        </div>
        ${exams.length ? `
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            ${exams.map(e => examRowHTML(e, { classId: cls.id })).join("")}
          </div>` : `
          <p class="px-3.5 py-5 text-center text-xs text-slate-400">Lớp này chưa được gán bài kiểm tra nào. Khi tạo / sửa bài, tích chọn lớp ${esc(cls.name)} ở mục "Lớp áp dụng".</p>`}
      </div>`;
  }

  const origRenderStudentsList = window.renderStudentsList;
  window.renderStudentsList = function renderStudentsList() {
    origRenderStudentsList();
    renderClassExams();
  };

  // Các thao tác làm thay đổi bài thi -> làm mới các danh sách
  ["saveNewExam", "deleteCurrentExam", "onExamChange"].forEach(fn => {
    const orig = window[fn];
    if (typeof orig !== "function") return;
    window[fn] = function () {
      const r = orig.apply(this, arguments);
      renderHubExamList();
      renderClassExams();
      return r;
    };
  });

  // Xuất cho kiểm thử
  window.__qmImport = { parseQRPayload, parseAnswerSheetRows, applyImportedKeys };

  document.addEventListener("DOMContentLoaded", () => {
    // Chạy sau khởi tạo của app.js
    setTimeout(() => {
      renderHubExamList();
      renderClassExams();
      if (window.appState && window.appState.data.currentTab === "scan") updateScanHeader();
    }, 0);
  });
})();
