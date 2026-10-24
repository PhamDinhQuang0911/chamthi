/**
 * ĐỘNG CƠ CHẤM THI TRẮC NGHIỆM QUANG HỌC OMR - CHUẨN BỘ GIÁO DỤC 2025
 * Chạy 100% Client-Side trên trình duyệt (JavaScript + Canvas 2D + TypedArray)
 * Tích hợp: Nắn góc phối cảnh (Perspective Warp), Nhận diện Marker 4 góc, Thống kê tô mờ/tô đậm
 * Bản quyền: QMATH (chamthi.qmath.io.vn)
 */

class OMREngine {
  constructor() {
    this.TARGET_W = 1200;
    this.TARGET_H = 1700;

    // Tọa độ chuẩn trên lưới 1200 x 1700
    this.SBD_X = 838;
    this.SBD_Y = 153;
    this.SBD_COL_W = 200.0 / 6.0;
    this.SBD_ROW_H = (345.0 - 70.0) / 10.0;

    this.MADE_X = 1061;
    this.MADE_Y = 153;
    this.MADE_COL_W = 101.0 / 3.0;

    this.P1_COLS_X = [34, 321, 609, 897];
    this.P1_Y = 576;
    this.P1_HEADER_H = 32.0;
    this.P1_QNUM_W = 48.0;
    this.P1_OPT_W = (245.0 - this.P1_QNUM_W) / 4.0;
    this.P1_ROW_H = (338.0 - this.P1_HEADER_H) / 10.0;

    this.P2_BLOCKS_X = [35, 320, 608, 896];
    this.P2_Y = 959;
    this.P2_HEADER_H = 40.0;
    this.P2_SUB_W = 247.0 / 2.0;
    this.P2_LABEL_W = 45.0;
    this.P2_OPT_W = (this.P2_SUB_W - this.P2_LABEL_W) / 2.0;
    this.P2_ROW_H = (202.0 - this.P2_HEADER_H) / 4.0;

    this.P3_X = 35;
    this.P3_Y = 1214;
    this.P3_BLOCK_W = 184.0;
  }

  /**
   * Tính ma trận đồng quy nghịch đảo (Inverse Homography)
   * Ánh xạ từ tọa độ đích (1200x1700) về tọa độ nguồn (pts)
   */
  getHomographyCoeffs(pts, W, H) {
    const x0 = pts[0][0], y0 = pts[0][1];
    const x1 = pts[1][0], y1 = pts[1][1];
    const x2 = pts[2][0], y2 = pts[2][1];
    const x3 = pts[3][0], y3 = pts[3][1];

    const dx1 = x1 - x2;
    const dx2 = x3 - x2;
    const dx3 = x0 - x1 + x2 - x3;
    const dy1 = y1 - y2;
    const dy2 = y3 - y2;
    const dy3 = y0 - y1 + y2 - y3;

    const det = dx1 * dy2 - dx2 * dy1;
    if (Math.abs(det) < 1e-7) {
      // Affine fallback
      return {
        m0: (x1 - x0) / W, m1: (x3 - x0) / H, m2: x0,
        m3: (y1 - y0) / W, m4: (y3 - y0) / H, m5: y0,
        m6: 0, m7: 0
      };
    }

    const a6 = (dx3 * dy2 - dx2 * dy3) / det;
    const a7 = (dx1 * dy3 - dx3 * dy1) / det;

    return {
      m0: (x1 - x0 + a6 * x1) / W,
      m1: (x3 - x0 + a7 * x3) / H,
      m2: x0,
      m3: (y1 - y0 + a6 * y1) / W,
      m4: (y3 - y0 + a7 * y3) / H,
      m5: y0,
      m6: a6 / W,
      m7: a7 / H
    };
  }

  /**
   * Nắn thẳng phối cảnh siêu tốc bằng TypedArray (<25ms cho 2MP)
   */
  warpPerspective(srcCanvas, pts, dstW = 1200, dstH = 1700) {
    const dstCanvas = document.createElement('canvas');
    dstCanvas.width = dstW;
    dstCanvas.height = dstH;
    const dstCtx = dstCanvas.getContext('2d');

    const srcW = srcCanvas.width;
    const srcH = srcCanvas.height;
    const srcCtx = srcCanvas.getContext('2d');
    const srcImageData = srcCtx.getImageData(0, 0, srcW, srcH);
    const srcBuf = new Uint32Array(srcImageData.data.buffer);

    const dstImageData = dstCtx.createImageData(dstW, dstH);
    const dstBuf = new Uint32Array(dstImageData.data.buffer);

    const h = this.getHomographyCoeffs(pts, dstW, dstH);

    for (let y = 0; y < dstH; y++) {
      const rowOffset = y * dstW;
      for (let x = 0; x < dstW; x++) {
        const den = h.m6 * x + h.m7 * y + 1.0;
        const sx = ((h.m0 * x + h.m1 * y + h.m2) / den) | 0;
        const sy = ((h.m3 * x + h.m4 * y + h.m5) / den) | 0;

        if (sx >= 0 && sx < srcW && sy >= 0 && sy < srcH) {
          dstBuf[rowOffset + x] = srcBuf[sy * srcW + sx];
        } else {
          dstBuf[rowOffset + x] = 0xffffffff; // White
        }
      }
    }

    dstCtx.putImageData(dstImageData, 0, 0);
    return dstCanvas;
  }

  /**
   * Tự động dò 4 góc đánh dấu (Corner Fiducial Markers) của phiếu thi BGD 2025
   */
  detectCornerMarkers(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext('2d');

    // Mặc định trả về 4 góc khung nếu không nhận diện được
    const defaultPts = [
      [0, 0],
      [w - 1, 0],
      [w - 1, h - 1],
      [0, h - 1]
    ];

    // Thu nhỏ ảnh xuống để dò nhanh trong 3ms
    const scanScale = Math.min(1.0, 480 / Math.max(w, h));
    const sw = Math.floor(w * scanScale);
    const sh = Math.floor(h * scanScale);

    const smallCanvas = document.createElement('canvas');
    smallCanvas.width = sw;
    smallCanvas.height = sh;
    const sctx = smallCanvas.getContext('2d');
    sctx.drawImage(canvas, 0, 0, sw, sh);
    const sData = sctx.getImageData(0, 0, sw, sh).data;

    // Tìm điểm tối nhất ở mỗi góc trong vùng 25% biên
    const findDarkCentroid = (minX, maxX, minY, maxY) => {
      let sumX = 0, sumY = 0, count = 0;
      let minLum = 255;

      for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
          const idx = (y * sw + x) * 4;
          const lum = sData[idx] * 0.299 + sData[idx + 1] * 0.587 + sData[idx + 2] * 0.114;
          if (lum < minLum) minLum = lum;
        }
      }

      // Ngưỡng tối cho marker
      const darkThresh = Math.min(90, minLum + 40);
      for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
          const idx = (y * sw + x) * 4;
          const lum = sData[idx] * 0.299 + sData[idx + 1] * 0.587 + sData[idx + 2] * 0.114;
          if (lum <= darkThresh) {
            sumX += x;
            sumY += y;
            count++;
          }
        }
      }

      if (count >= 15 && count <= (sw * sh * 0.05)) {
        return [sumX / count / scanScale, sumY / count / scanScale];
      }
      return null;
    };

    const tl = findDarkCentroid(0, Math.floor(sw * 0.25), 0, Math.floor(sh * 0.25));
    const tr = findDarkCentroid(Math.floor(sw * 0.75), sw, 0, Math.floor(sh * 0.25));
    const br = findDarkCentroid(Math.floor(sw * 0.75), sw, Math.floor(sh * 0.75), sh);
    const bl = findDarkCentroid(0, Math.floor(sw * 0.25), Math.floor(sh * 0.75), sh);

    if (tl && tr && br && bl) {
      return [tl, tr, br, bl];
    }

    return defaultPts;
  }

  /**
   * Tính tỷ lệ tô đen của ô tròn tại tâm (cx, cy)
   */
  getFillRatio(imageData, cx, cy, radius = 8) {
    const data = imageData.data;
    const w = imageData.width;
    const h = imageData.height;

    let filledPixels = 0;
    let totalCirclePixels = 0;

    const r2 = radius * radius;
    const minX = Math.max(0, Math.floor(cx - radius));
    const maxX = Math.min(w - 1, Math.ceil(cx + radius));
    const minY = Math.max(0, Math.floor(cy - radius));
    const maxY = Math.min(h - 1, Math.ceil(cy + radius));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy <= r2) {
          totalCirclePixels++;
          const idx = (y * w + x) * 4;
          // Độ sáng grayscale (Rec. 601)
          const gray = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
          // Pixel đen / bút chì tô: độ sáng < 125
          if (gray < 125) {
            filledPixels++;
          }
        }
      }
    }

    return totalCirclePixels > 0 ? filledPixels / totalCirclePixels : 0;
  }

  calcStats(arr) {
    const n = arr.length;
    if (n === 0) return { mean: 0, std: 0 };
    const mean = arr.reduce((a, b) => a + b, 0) / n;
    const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    return { mean, std: Math.sqrt(variance) };
  }

  /**
   * Đọc Số Báo Danh (6 chữ số)
   */
  readSBD(imageData) {
    let sbd = "";
    const points = [];

    for (let c = 0; c < 6; c++) {
      const ratios = [];
      const coords = [];
      for (let d = 0; d < 10; d++) {
        const cx = this.SBD_X + (c + 0.5) * this.SBD_COL_W;
        const cy = this.SBD_Y + 70.0 + (d + 0.5) * this.SBD_ROW_H;
        ratios.push(this.getFillRatio(imageData, cx, cy));
        coords.push({ x: cx, y: cy });
      }

      const { mean, std } = this.calcStats(ratios);
      let bestD = 0;
      let maxRatio = -1;
      for (let i = 0; i < 10; i++) {
        if (ratios[i] > maxRatio) {
          maxRatio = ratios[i];
          bestD = i;
        }
      }

      if (maxRatio > mean + 1.2 * std && (maxRatio > 0.22 || std > 0.04)) {
        sbd += String(bestD);
        points.push({ x: coords[bestD].x, y: coords[bestD].y, label: String(bestD) });
      } else {
        sbd += "0";
      }
    }

    return { sbd, points };
  }

  /**
   * Đọc Mã Đề Thi (3 chữ số)
   */
  readMade(imageData) {
    let made = "";
    const points = [];

    for (let c = 0; c < 3; c++) {
      const ratios = [];
      const coords = [];
      for (let d = 0; d < 10; d++) {
        const cx = this.MADE_X + (c + 0.5) * this.MADE_COL_W;
        const cy = this.MADE_Y + 70.0 + (d + 0.5) * this.SBD_ROW_H;
        ratios.push(this.getFillRatio(imageData, cx, cy));
        coords.push({ x: cx, y: cy });
      }

      const { mean, std } = this.calcStats(ratios);
      let bestD = 0;
      let maxRatio = -1;
      for (let i = 0; i < 10; i++) {
        if (ratios[i] > maxRatio) {
          maxRatio = ratios[i];
          bestD = i;
        }
      }

      if (maxRatio > mean + 1.2 * std && (maxRatio > 0.22 || std > 0.04)) {
        made += String(bestD);
        points.push({ x: coords[bestD].x, y: coords[bestD].y, label: String(bestD) });
      } else {
        made += "0";
      }
    }
    return { made, points };
  }

  /**
   * Đọc Phần I: Trắc nghiệm 4 lựa chọn (A, B, C, D)
   */
  readPart1(imageData, numQuestions = 12) {
    const answers = [];
    const infoMap = {};
    const optLabels = ['A', 'B', 'C', 'D'];

    for (let q = 0; q < numQuestions; q++) {
      const colIdx = Math.floor(q / 10);
      const qInCol = q % 10;
      const colX = this.P1_COLS_X[colIdx];
      const qy = this.P1_Y + this.P1_HEADER_H + (qInCol + 0.5) * this.P1_ROW_H;

      const ratios = [];
      const coords = [];
      for (let opt = 0; opt < 4; opt++) {
        const qx = colX + this.P1_QNUM_W + (opt + 0.5) * this.P1_OPT_W;
        ratios.push(this.getFillRatio(imageData, qx, qy));
        coords.push({ x: qx, y: qy });
      }

      const { mean, std } = this.calcStats(ratios);
      const filledOpts = [];
      for (let opt = 0; opt < 4; opt++) {
        if (ratios[opt] > mean + 1.2 * std && ratios[opt] > 0.20 && std > 0.035) {
          filledOpts.push(opt);
        }
      }

      let ansStr = "";
      if (filledOpts.length === 1) {
        ansStr = optLabels[filledOpts[0]];
      } else if (filledOpts.length > 1) {
        ansStr = "DOUBLE";
      }

      answers.push(ansStr);
      infoMap[q] = {
        answer: ansStr,
        coords: coords,
        ratios: ratios,
        bestOpt: filledOpts.length === 1 ? filledOpts[0] : -1
      };
    }
    return { answers, infoMap };
  }

  /**
   * Đọc Phần II: Đúng / Sai (a, b, c, d)
   */
  readPart2(imageData, numQuestions = 4) {
    const answers = {};
    const infoMap = {};

    for (let q = 0; q < numQuestions; q++) {
      const blockIdx = Math.floor(q / 2);
      const qHalf = q % 2;
      const blockX = this.P2_BLOCKS_X[blockIdx];
      const subX = blockX + qHalf * this.P2_SUB_W;
      const qKey = String(q + 1);

      const qAnswers = [];
      const qCoords = [];

      for (let item = 0; item < 4; item++) {
        const iy = this.P2_Y + this.P2_HEADER_H + (item + 0.5) * this.P2_ROW_H;
        const dx = subX + this.P2_LABEL_W + 0.5 * this.P2_OPT_W;
        const sx = subX + this.P2_LABEL_W + 1.5 * this.P2_OPT_W;

        const dFill = this.getFillRatio(imageData, dx, iy);
        const sFill = this.getFillRatio(imageData, sx, iy);

        let itemAns = "";
        if (Math.abs(dFill - sFill) < 0.06 || (dFill < 0.18 && sFill < 0.18)) {
          itemAns = "";
        } else if (dFill > sFill) {
          itemAns = "Đ";
        } else {
          itemAns = "S";
        }

        qAnswers.push(itemAns);
        qCoords.push({
          D: { x: dx, y: iy },
          S: { x: sx, y: iy },
          chosen: itemAns
        });
      }

      answers[qKey] = qAnswers;
      infoMap[qKey] = { answers: qAnswers, coords: qCoords };
    }
    return { answers, infoMap };
  }

  /**
   * Đọc Phần III: Trả lời ngắn
   */
  readPart3(imageData, numQuestions = 6) {
    const answers = [];
    const infoMap = {};

    for (let q = 0; q < numQuestions; q++) {
      const qBaseX = this.P3_X + q * this.P3_BLOCK_W;
      let ansStr = "";
      const coords = [];

      // Dấu âm '-'
      const minusFill = this.getFillRatio(imageData, qBaseX + 56.0, this.P3_Y + 59.0);
      const signFills = [];
      for (let d = 0; d < 10; d++) {
        signFills.push(this.getFillRatio(imageData, qBaseX + 56.0, this.P3_Y + 126.0 + d * 33.5));
      }
      const sStats = this.calcStats(signFills);
      if (minusFill > sStats.mean + 1.2 * sStats.std && minusFill > 0.20) {
        ansStr += "-";
        coords.push({ x: qBaseX + 56.0, y: this.P3_Y + 59.0, val: "-" });
      }

      // Các cột số & dấu phẩy
      const colOffsets = [87.0, 117.5, 148.0];
      for (const colOff of colOffsets) {
        const commaFill = this.getFillRatio(imageData, qBaseX + colOff, this.P3_Y + 92.5);
        const digitFills = [];
        for (let d = 0; d < 10; d++) {
          digitFills.push(this.getFillRatio(imageData, qBaseX + colOff, this.P3_Y + 126.0 + d * 33.5));
        }

        let maxD = 0;
        let maxDFill = -1;
        for (let d = 0; d < 10; d++) {
          if (digitFills[d] > maxDFill) {
            maxDFill = digitFills[d];
            maxD = d;
          }
        }

        const allFills = [commaFill, ...digitFills];
        const { mean, std } = this.calcStats(allFills);

        if (commaFill > mean + 1.2 * std && commaFill > maxDFill && commaFill > 0.20) {
          ansStr += ".";
          coords.push({ x: qBaseX + colOff, y: this.P3_Y + 92.5, val: "." });
        } else if (maxDFill > mean + 1.2 * std && maxDFill > 0.20) {
          ansStr += String(maxD);
          coords.push({ x: qBaseX + colOff, y: this.P3_Y + 126.0 + maxD * 33.5, val: String(maxD) });
        }
      }

      answers.push(ansStr);
      infoMap[q] = { answer: ansStr, coords };
    }
    return { answers, infoMap };
  }

  normalizeNumber(str) {
    if (!str) return "";
    const s = str.trim().replace(",", ".");
    const f = parseFloat(s);
    if (!isNaN(f)) {
      return Number.isInteger(f) ? String(parseInt(f, 10)) : String(parseFloat(f.toFixed(4)));
    }
    return s.toLowerCase();
  }

  /**
   * Chấm điểm theo chuẩn Bộ GD&ĐT 2025
   */
  gradeSheet(extracted, answerKeys, config) {
    const sbd = extracted.sbd;
    const made = extracted.made;
    const key = answerKeys[made] || answerKeys[Object.keys(answerKeys)[0]];

    const result = {
      sbd: sbd,
      made: made,
      part1_answers: extracted.part1.answers,
      part2_answers: extracted.part2.answers,
      part3_answers: extracted.part3.answers,
      part1_score: 0.0,
      part2_score: 0.0,
      part3_score: 0.0,
      total_score: 0.0,
      part1_correct: 0,
      part3_correct: 0,
      status: key ? "OK" : "NO_KEY",
      timestamp: new Date().toLocaleTimeString('vi-VN')
    };

    if (!key) return result;

    // 1. Chấm Phần I
    let p1Correct = 0;
    for (let i = 0; i < extracted.part1.answers.length; i++) {
      if (i < key.part1.length && extracted.part1.answers[i] === key.part1[i]) {
        p1Correct++;
      }
    }
    result.part1_correct = p1Correct;
    result.part1_score = parseFloat((p1Correct * config.p1_score).toFixed(2));

    // 2. Chấm Phần II (Biểu điểm chuẩn BGD 2025)
    // 1 ý = 0.1đ | 2 ý = 0.25đ | 3 ý = 0.5đ | 4 ý = 1.0đ
    const p2Rules = { 1: 0.1, 2: 0.25, 3: 0.5, 4: 1.0 };
    let p2Total = 0.0;
    for (const [qStr, studentSubs] of Object.entries(extracted.part2.answers)) {
      const correctSubs = key.part2[qStr] || [];
      let cCount = 0;
      for (let idx = 0; idx < studentSubs.length; idx++) {
        if (idx < correctSubs.length && studentSubs[idx] === correctSubs[idx]) {
          cCount++;
        }
      }
      p2Total += (p2Rules[cCount] || 0.0);
    }
    result.part2_score = parseFloat(p2Total.toFixed(2));

    // 3. Chấm Phần III
    let p3Correct = 0;
    for (let i = 0; i < extracted.part3.answers.length; i++) {
      if (i < key.part3.length) {
        const sNorm = this.normalizeNumber(extracted.part3.answers[i]);
        const kNorm = this.normalizeNumber(key.part3[i]);
        if (sNorm && kNorm && sNorm === kNorm) {
          p3Correct++;
        }
      }
    }
    result.part3_correct = p3Correct;
    result.part3_score = parseFloat((p3Correct * config.p3_score).toFixed(2));

    // Tổng điểm
    result.total_score = parseFloat((result.part1_score + result.part2_score + result.part3_score).toFixed(2));
    return result;
  }

  /**
   * Vẽ khoanh tròn và thẻ kết quả trực tiếp lên Canvas
   */
  drawVisualAnnotation(canvas, extracted, result, key) {
    const ctx = canvas.getContext('2d');
    const optIndices = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

    // 1. Khoanh SBD & Mã đề
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0284c7'; // Blue
    for (const pt of extracted.sbd.points) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 11, 0, 2 * Math.PI);
      ctx.stroke();
    }
    for (const pt of extracted.made.points) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 11, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // 2. Khoanh Phần I
    for (let q = 0; q < extracted.part1.answers.length; q++) {
      const qInfo = extracted.part1.infoMap[q];
      const sOpt = qInfo.answer;
      const kOpt = key && q < key.part1.length ? key.part1[q] : null;

      if (kOpt && optIndices[kOpt] !== undefined) {
        const kIdx = optIndices[kOpt];
        if (sOpt === kOpt) {
          // Đúng: Vòng xanh lá
          ctx.strokeStyle = '#16a34a';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(qInfo.coords[kIdx].x, qInfo.coords[kIdx].y, 12, 0, 2 * Math.PI);
          ctx.stroke();
        } else {
          // Sai: Vòng đỏ ô học sinh chọn
          if (sOpt && optIndices[sOpt] !== undefined) {
            ctx.strokeStyle = '#dc2626';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(qInfo.coords[optIndices[sOpt]].x, qInfo.coords[optIndices[sOpt]].y, 12, 0, 2 * Math.PI);
            ctx.stroke();
          }
          // Vòng vàng ô đáp án đúng
          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(qInfo.coords[kIdx].x, qInfo.coords[kIdx].y, 12, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }
    }

    // 3. Khoanh Phần II
    for (const [qStr, qInfo] of Object.entries(extracted.part2.infoMap)) {
      const kSubs = key && key.part2[qStr] ? key.part2[qStr] : [];
      for (let idx = 0; idx < qInfo.coords.length; idx++) {
        const cInfo = qInfo.coords[idx];
        const sVal = cInfo.chosen;
        const kVal = kSubs[idx];

        if (kVal === 'Đ' || kVal === 'S') {
          const kPt = kVal === 'Đ' ? cInfo.D : cInfo.S;
          if (sVal === kVal) {
            ctx.strokeStyle = '#16a34a';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(kPt.x, kPt.y, 11, 0, 2 * Math.PI);
            ctx.stroke();
          } else {
            if (sVal === 'Đ' || sVal === 'S') {
              const sPt = sVal === 'Đ' ? cInfo.D : cInfo.S;
              ctx.strokeStyle = '#dc2626';
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.arc(sPt.x, sPt.y, 11, 0, 2 * Math.PI);
              ctx.stroke();
            }
            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(kPt.x, kPt.y, 11, 0, 2 * Math.PI);
            ctx.stroke();
          }
        }
      }
    }

    // 4. Vẽ Thẻ Điểm Banner trên đầu phiếu
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(30, 30, canvas.width - 60, 90);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, canvas.width - 60, 90);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText(`SBD: ${result.sbd}    MÃ ĐỀ: ${result.made}    P.I: ${result.part1_score.toFixed(2)}đ    P.II: ${result.part2_score.toFixed(2)}đ    P.III: ${result.part3_score.toFixed(2)}đ`, 50, 68);

    ctx.fillStyle = result.total_score >= 8.0 ? '#22c55e' : (result.total_score >= 5.0 ? '#38bdf8' : '#ef4444');
    ctx.font = 'bold 30px Arial, sans-serif';
    ctx.fillText(`TỔNG ĐIỂM: ${result.total_score.toFixed(2)} / 10.0`, 50, 106);
  }

  /**
   * Xử lý toàn diện Canvas 1200x1700
   */
  processWarpedCanvas(canvas, config, answerKeys) {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const sbd = this.readSBD(imgData);
    const made = this.readMade(imgData);
    const part1 = this.readPart1(imgData, config.p1_num || 12);
    const part2 = this.readPart2(imgData, config.p2_num || 4);
    const part3 = this.readPart3(imgData, config.p3_num || 6);

    const extracted = { sbd: sbd.sbd, sbdObj: sbd, made: made.made, madeObj: made, part1, part2, part3 };
    const result = this.gradeSheet(extracted, answerKeys, config);

    const key = answerKeys[result.made] || answerKeys[Object.keys(answerKeys)[0]];
    this.drawVisualAnnotation(canvas, { sbd, made, part1, part2, part3 }, result, key);

    return {
      extracted,
      result,
      annotatedDataUrl: canvas.toDataURL('image/jpeg', 0.88),
      canvas: canvas
    };
  }

  /**
   * Chấm điểm từ bất kỳ nguồn nào (Image, Video Frame, hoặc Canvas bất kỳ kích thước)
   */
  gradeFromImageSource(source, config, answerKeys, manualQuad = null) {
    // 1. Vẽ nguồn lên temporary canvas
    const tempCanvas = document.createElement('canvas');
    const sw = source.videoWidth || source.naturalWidth || source.width;
    const sh = source.videoHeight || source.naturalHeight || source.height;
    tempCanvas.width = sw;
    tempCanvas.height = sh;
    const tctx = tempCanvas.getContext('2d');
    tctx.drawImage(source, 0, 0, sw, sh);

    // 2. Tìm 4 góc
    let pts = manualQuad;
    if (!pts) {
      // Tự động tìm marker hoặc fallback
      pts = this.detectCornerMarkers(tempCanvas);
    }

    // 3. Nắn thẳng phối cảnh về chuẩn 1200x1700
    const warpedCanvas = this.warpPerspective(tempCanvas, pts, this.TARGET_W, this.TARGET_H);

    // 4. Chấm điểm & khoanh kết quả
    return this.processWarpedCanvas(warpedCanvas, config, answerKeys);
  }
}

// Khởi tạo global instance
window.omrEngine = new OMREngine();
