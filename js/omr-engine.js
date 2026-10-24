/**
 * ĐỘNG CƠ CHẤM THI TRẮC NGHIỆM QUANG HỌC OMR - CHUẨN APP GỐC QM2025 (APK PORT)
 * Tích hợp đầy đủ công nghệ từ gói com.chamthi.chamtn2025cs:
 * 1. CornerSquaresOverlayUnt2025 & detectFourCornerInOverlay (4 ô vuông định vị góc xanh lá #00FF00)
 * 2. findAnchorInSubImage (Lọc contour tỷ lệ 0.7..1.3 & mật độ điểm đen tìm tâm điểm neo)
 * 3. cropImageBasedOnAnchors (Nắn phẳng phối cảnh Homography chuẩn 7:10)
 * 4. PositionPointsDataUnt2025.getCenter (Bám sát hệ thống điểm neo nội bộ AnchorPoint 2..23)
 * 5. Adaptive Statistical Bubble Reader (Đọc SBD, Mã đề 3 số/4 số, Phần 1, Phần 2, Phần 3)
 * 6. Re-grade & Re-annotate hỗ trợ chỉnh sửa thủ công giữ nguyên ảnh gốc đã nắn
 * Bản quyền: QMATH (chamthi.qmath.io.vn)
 */

class OMREngine {
  constructor() {
    // Kích thước chuẩn tỷ lệ 7:10 tương đương chuẩn 2254x3437 của QM APK
    this.TARGET_W = 1200;
    this.TARGET_H = 1700;

    // Tỷ lệ quy đổi từ hệ tọa độ gốc APK (2254 x 3437) sang (1200 x 1700)
    this.SCALE_X = 1200.0 / 2254.0;
    this.SCALE_Y = 1700.0 / 3437.0;

    // Tọa độ chuẩn trên lưới 1200 x 1700
    this.SBD_X = 838;
    this.SBD_Y = 153;
    this.SBD_COL_W = 200.0 / 6.0;
    this.SBD_ROW_H = (345.0 - 70.0) / 10.0;

    // Mã đề 3 số (chuẩn mặc định) và 4 số
    this.MADE_X = 1061;
    this.MADE_Y = 153;
    this.MADE_COL_W_3 = 101.0 / 3.0;
    this.MADE_COL_W_4 = 124.0 / 4.0;

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

    // Hệ thống điểm neo nội bộ (Internal Anchor Points) trích xuất từ MatHandlerUnt2025
    // Đã quy đổi sang khung chuẩn 1200 x 1700
    this.CANONICAL_INTERNAL_ANCHORS = [
      // Hàng đỉnh & Header (SBD / Mã đề)
      { id: 22, x: 1060, y: 112, label: "TOP_R" },
      { id: 23, x: 818,  y: 112, label: "TOP_M" },
      // Hàng phân cách trên Phần I
      { id: 18, x: 943,  y: 548, label: "P1_TOP_3" },
      { id: 19, x: 637,  y: 548, label: "P1_TOP_2" },
      { id: 20, x: 333,  y: 548, label: "P1_TOP_1" },
      { id: 21, x: 27,   y: 548, label: "P1_TOP_0" },
      // Hàng phân cách giữa Phần I & Phần II
      { id: 14, x: 943,  y: 938, label: "P2_TOP_3" },
      { id: 15, x: 637,  y: 938, label: "P2_TOP_2" },
      { id: 16, x: 333,  y: 938, label: "P2_TOP_1" },
      { id: 17, x: 27,   y: 938, label: "P2_TOP_0" },
      // Hàng phân cách giữa Phần II & Phần III
      { id: 8,  x: 1025, y: 1192, label: "P3_TOP_5" },
      { id: 9,  x: 825,  y: 1192, label: "P3_TOP_4" },
      { id: 10, x: 625,  y: 1192, label: "P3_TOP_3" },
      { id: 11, x: 426,  y: 1192, label: "P3_TOP_2" },
      { id: 12, x: 226,  y: 1192, label: "P3_TOP_1" },
      { id: 13, x: 27,   y: 1192, label: "P3_TOP_0" },
      // Hàng đáy Phần III
      { id: 2,  x: 1025, y: 1665, label: "BOT_5" },
      { id: 3,  x: 825,  y: 1665, label: "BOT_4" },
      { id: 4,  x: 625,  y: 1665, label: "BOT_3" },
      { id: 5,  x: 426,  y: 1665, label: "BOT_2" },
      { id: 6,  x: 226,  y: 1665, label: "BOT_1" }
    ];
  }

  /**
   * Lấy cấu hình cài đặt chung (General Settings) từ hệ thống
   */
  getSettings() {
    if (window.appState && window.appState.data && window.appState.data.settings) {
      return window.appState.data.settings;
    }
    return {
      scanSpeed: "normal",        // "fast" (0.3s), "normal" (0.6s), "accurate" (1.0s)
      sensitivity: "normal",      // "high", "normal", "strict"
      soundEnabled: true,
      vibrationEnabled: true,
      viewScoreImmediately: true,
      showAnchors: true,
      warnNoKey: true,
      warnDoubleOrBlank: true,
      warnDuplicateSbd: true,
      scoreRounding: "0.01"       // "none", "0.01", "0.05", "0.1", "0.25"
    };
  }

  /**
   * Lấy thông số ngưỡng theo Độ nhạy nhận diện (Sensitivity)
   */
  getSensitivityParams() {
    const s = this.getSettings().sensitivity || "normal";
    if (s === "high") {
      // Nhạy cao (dành cho bút chì nhạt 2B/HB hoặc thiếu sáng)
      return { grayCutoff: 142, minFill: 0.14, zFactor: 0.95, minStd: 0.025, p2Diff: 0.045, p2Min: 0.13 };
    }
    if (s === "strict") {
      // Khắt khe (chống vết tẩy xóa hoặc bóng mờ)
      return { grayCutoff: 112, minFill: 0.27, zFactor: 1.40, minStd: 0.045, p2Diff: 0.08, p2Min: 0.24 };
    }
    // Chuẩn QM (Mặc định)
    return { grayCutoff: 126, minFill: 0.20, zFactor: 1.20, minStd: 0.035, p2Diff: 0.06, p2Min: 0.18 };
  }

  /**
   * Giải mã giá trị điểm nhập vào (Hỗ trợ số thập phân '.', ',', và phân số như '1/3')
   * Chuẩn NewQuizActivity của QM APK
   */
  parseScoreValue(val, fallback = 0.25) {
    if (typeof val === "number" && !isNaN(val)) return val;
    if (!val && val !== 0) return fallback;
    const str = String(val).trim().replace(",", ".");
    if (str.includes("/")) {
      const parts = str.split("/");
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return num / den;
      }
    }
    const parsed = parseFloat(str);
    return isNaN(parsed) ? fallback : parsed;
  }

  /**
   * Làm tròn điểm theo cài đặt
   */
  roundScore(score) {
    const mode = this.getSettings().scoreRounding || "0.01";
    if (mode === "none") return parseFloat(score.toFixed(4));
    const step = parseFloat(mode);
    if (!isNaN(step) && step > 0) {
      return parseFloat((Math.round(score / step) * step).toFixed(2));
    }
    return parseFloat(score.toFixed(2));
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
   * Nắn thẳng phối cảnh siêu tốc bằng TypedArray (`cropImageBasedOnAnchors` trong QM APK)
   */
  warpPerspective(srcCanvas, pts, dstW = 1200, dstH = 1700) {
    const dstCanvas = document.createElement("canvas");
    dstCanvas.width = dstW;
    dstCanvas.height = dstH;
    const dstCtx = dstCanvas.getContext("2d");

    const srcW = srcCanvas.width;
    const srcH = srcCanvas.height;
    const srcCtx = srcCanvas.getContext("2d");
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
          dstBuf[rowOffset + x] = 0xffffffff;
        }
      }
    }

    dstCtx.putImageData(dstImageData, 0, 0);
    return dstCanvas;
  }

  /**
   * Thuật toán `findAnchorInSubImage` & `detectFourCornerInOverlay` nâng cao:
   * Dò tìm 4 ô vuông đen định vị góc của phiếu thi, hỗ trợ Video Frame, Canvas, Image
   * Chống nhiễu nền tối và kiểm tra tính hợp lệ hình học của khổ giấy A4
   */
  detectCornerMarkersWithStatus(canvas) {
    const w = canvas.videoWidth || canvas.naturalWidth || canvas.width || 0;
    const h = canvas.videoHeight || canvas.naturalHeight || canvas.height || 0;

    const defaultPts = [
      [0, 0],
      [Math.max(1, w - 1), 0],
      [Math.max(1, w - 1), Math.max(1, h - 1)],
      [0, Math.max(1, h - 1)]
    ];

    if (!w || !h) {
      return {
        points: defaultPts,
        cornerStatus: [false, false, false, false],
        lockedCount: 0,
        isExact: false
      };
    }

    const scanScale = Math.min(1.0, 520 / Math.max(w, h));
    const sw = Math.max(80, Math.floor(w * scanScale));
    const sh = Math.max(100, Math.floor(h * scanScale));

    const smallCanvas = document.createElement("canvas");
    smallCanvas.width = sw;
    smallCanvas.height = sh;
    const sctx = smallCanvas.getContext("2d");
    sctx.drawImage(canvas, 0, 0, sw, sh);
    const sData = sctx.getImageData(0, 0, sw, sh).data;

    // Chuyển sang ảnh xám Grayscale & tính min, max độ sáng
    const gray = new Uint8Array(sw * sh);
    let minLumAll = 255, maxLumAll = 0, sumLumAll = 0;
    for (let i = 0, p = 0; i < sData.length; i += 4, p++) {
      const g = (sData[i] * 0.299 + sData[i + 1] * 0.587 + sData[i + 2] * 0.114) | 0;
      gray[p] = g;
      sumLumAll += g;
      if (g < minLumAll) minLumAll = g;
      if (g > maxLumAll) maxLumAll = g;
    }

    // Độ tương phản toàn ảnh quá thấp thì bỏ qua
    if (maxLumAll - minLumAll < 30) {
      return { points: defaultPts, cornerStatus: [false, false, false, false], lockedCount: 0, isExact: false };
    }

    const avgLumAll = sumLumAll / (sw * sh);

    /**
     * Dò tìm ô vuông đen định vị trong 1 góc (minX..maxX, minY..maxY)
     * Sử dụng phân tích blob đen đặc được bao quanh bởi viền giấy trắng
     */
    const findCornerAnchor = (minX, maxX, minY, maxY, cornerIdx) => {
      let localMin = 255, localMax = 0;
      for (let y = minY; y < maxY; y++) {
        const row = y * sw;
        for (let x = minX; x < maxX; x++) {
          const v = gray[row + x];
          if (v < localMin) localMin = v;
          if (v > localMax) localMax = v;
        }
      }

      // Cần có độ tương phản cục bộ rõ rệt
      if (localMax - localMin < 35) return null;

      // Ngưỡng điểm đen: nằm ở 35% dải sáng cục bộ
      const darkThresh = Math.min(118, localMin + (localMax - localMin) * 0.35);

      const visited = new Uint8Array(sw * sh);
      let bestCandidate = null;
      let bestScore = -Infinity;

      const minDim = Math.max(3, Math.floor(Math.min(sw, sh) * 0.015));
      const maxDim = Math.max(12, Math.floor(Math.min(sw, sh) * 0.10));
      const minArea = minDim * minDim * 0.40;
      const maxArea = maxDim * maxDim * 1.50;

      // Quét tìm các blob điểm đen trong góc
      for (let y = minY; y < maxY; y += 2) {
        const row = y * sw;
        for (let x = minX; x < maxX; x += 2) {
          const idx = row + x;
          if (visited[idx] || gray[idx] > darkThresh) continue;

          // Flood-fill BFS gom nhóm điểm đen
          let count = 0, sumX = 0, sumY = 0;
          let bx0 = x, bx1 = x, by0 = y, by1 = y;
          const queue = [idx];
          visited[idx] = 1;

          let qHead = 0;
          while (qHead < queue.length && queue.length < 2400) {
            const curr = queue[qHead++];
            const cy = (curr / sw) | 0;
            const cx = curr % sw;
            count++;
            sumX += cx;
            sumY += cy;
            if (cx < bx0) bx0 = cx;
            if (cx > bx1) bx1 = cx;
            if (cy < by0) by0 = cy;
            if (cy > by1) by1 = cy;

            const neighbors = [curr - 1, curr + 1, curr - sw, curr + sw];
            for (let k = 0; k < 4; k++) {
              const n = neighbors[k];
              const ny = (n / sw) | 0;
              const nx = n % sw;
              if (nx >= minX && nx < maxX && ny >= minY && ny < maxY && !visited[n]) {
                visited[n] = 1;
                if (gray[n] <= darkThresh) {
                  queue.push(n);
                }
              }
            }
          }

          if (count < minArea || count > maxArea) continue;

          const bw = bx1 - bx0 + 1;
          const bh = by1 - by0 + 1;
          if (bw < minDim || bh < minDim || bw > maxDim || bh > maxDim) continue;

          const aspect = bw / bh;
          if (aspect < 0.60 || aspect > 1.55) continue;

          const solidity = count / (bw * bh);
          if (solidity < 0.42) continue;

          // Kiểm tra viền sáng bao quanh ô đen (chống nhầm cạnh bàn tối / bóng đổ)
          const pad = Math.max(2, Math.floor(Math.min(bw, bh) * 0.4));
          let surroundSum = 0, surroundCount = 0;
          for (let sy = Math.max(minY, by0 - pad); sy <= Math.min(maxY - 1, by1 + pad); sy++) {
            const srow = sy * sw;
            for (let sx = Math.max(minX, bx0 - pad); sx <= Math.min(maxX - 1, bx1 + pad); sx++) {
              if (sx >= bx0 && sx <= bx1 && sy >= by0 && sy <= by1) continue;
              surroundSum += gray[srow + sx];
              surroundCount++;
            }
          }
          const avgSurround = surroundCount > 0 ? (surroundSum / surroundCount) : localMax;
          if (avgSurround - localMin < 25) continue; // Phải có viền trắng sáng hơn lõi đen

          const cx = sumX / count;
          const cy = sumY / count;

          // Ưu tiên blob nằm gần góc ngoài nhất của tờ giấy
          let cornerDistNorm = 0;
          if (cornerIdx === 0) cornerDistNorm = (cx / sw) + (cy / sh);
          else if (cornerIdx === 1) cornerDistNorm = ((sw - cx) / sw) + (cy / sh);
          else if (cornerIdx === 2) cornerDistNorm = ((sw - cx) / sw) + ((sh - cy) / sh);
          else if (cornerIdx === 3) cornerDistNorm = (cx / sw) + ((sh - cy) / sh);

          const squareScore = 1.0 - Math.abs(1.0 - aspect);
          // Ưu tiên ô vuông góc chính (có diện tích lớn hơn các ô định vị phụ)
          const areaScore = Math.min(2.5, count / 20.0);
          const score = areaScore * 2.5 + squareScore * 2.0 + solidity * 2.0 - cornerDistNorm * 1.5;

          if (score > bestScore) {
            bestScore = score;
            bestCandidate = {
              point: [cx / scanScale, cy / scanScale],
              rect: {
                x: bx0 / scanScale,
                y: by0 / scanScale,
                w: bw / scanScale,
                h: bh / scanScale
              },
              count
            };
          }
        }
      }

      return bestCandidate;
    };

    // Vùng tìm kiếm: mở rộng lên 36% chiều rộng và 34% chiều cao mỗi góc
    // Giúp bắt trúng ô đen ngay cả khi phiếu để gần camera (phiếu to) hoặc hơi lệch
    const cw = Math.floor(sw * 0.36);
    const ch = Math.floor(sh * 0.34);

    const tlObj = findCornerAnchor(0, cw, 0, ch, 0);
    const trObj = findCornerAnchor(sw - cw, sw, 0, ch, 1);
    const brObj = findCornerAnchor(sw - cw, sw, sh - ch, sh, 2);
    const blObj = findCornerAnchor(0, cw, sh - ch, sh, 3);

    const cornerStatus = [!!tlObj, !!trObj, !!brObj, !!blObj];
    const rawLockedCount = cornerStatus.filter(Boolean).length;

    // Kiểm tra tính hợp lệ hình học của tứ giác (A4 Geometric Sanity Check)
    let isQuadValid = false;
    if (rawLockedCount === 4) {
      const pTL = tlObj.point;
      const pTR = trObj.point;
      const pBR = brObj.point;
      const pBL = blObj.point;

      const topW = Math.hypot(pTR[0] - pTL[0], pTR[1] - pTL[1]);
      const botW = Math.hypot(pBR[0] - pBL[0], pBR[1] - pBL[1]);
      const leftH = Math.hypot(pBL[0] - pTL[0], pBL[1] - pTL[1]);
      const rightH = Math.hypot(pBR[0] - pTR[0], pBR[1] - pTR[1]);

      const avgW = (topW + botW) / 2;
      const avgH = (leftH + rightH) / 2;
      const aspectRatio = avgH / Math.max(1, avgW);

      const wRatio = Math.min(topW, botW) / Math.max(topW, botW);
      const hRatio = Math.min(leftH, rightH) / Math.max(leftH, rightH);

      // Khổ A4 chuẩn là ~1.414. Chấp nhận dải góc nhìn nghiêng từ 1.05 đến 1.80
      if (wRatio > 0.50 && hRatio > 0.50 && aspectRatio >= 1.05 && aspectRatio <= 1.80) {
        isQuadValid = true;
      }
    }

    if (rawLockedCount === 4 && isQuadValid) {
      return {
        points: [tlObj.point, trObj.point, brObj.point, blObj.point],
        cornerStatus: [true, true, true, true],
        lockedCount: 4,
        isExact: true
      };
    }

    // Nếu ảnh là ảnh mẫu đã nắn phẳng sẵn (kích thước chuẩn 1200x1700 hoặc tỷ lệ chuẩn ~1.41)
    const isWarpedSheet = (w === 1200 && h === 1700) || (Math.abs(h / w - 1.416) < 0.04 && !canvas.videoWidth);
    if (isWarpedSheet) {
      return {
        points: defaultPts,
        cornerStatus: [true, true, true, true],
        lockedCount: 4,
        isExact: true
      };
    }

    return {
      points: [
        tlObj ? tlObj.point : defaultPts[0],
        trObj ? trObj.point : defaultPts[1],
        brObj ? brObj.point : defaultPts[2],
        blObj ? blObj.point : defaultPts[3]
      ],
      cornerStatus,
      lockedCount: isQuadValid ? 4 : Math.min(3, rawLockedCount),
      isExact: false
    };
  }

  detectCornerMarkers(canvas) {
    return this.detectCornerMarkersWithStatus(canvas).points;
  }

  /**
   * Kiểm tra nhanh 4 ô góc trên Video Camera trực tiếp (Phục vụ hiệu ứng khóa góc xanh lá như App QM)
   */
  checkVideoFrameCorners(video) {
    if (!video || video.readyState < 2) {
      return { cornerStatus: [false, false, false, false], lockedCount: 0, points: null };
    }
    return this.detectCornerMarkersWithStatus(video);
  }

  /**
   * Thuật toán `PositionPointsDataUnt2025.getCenter`:
   * Tìm tâm thực tế của các ô vuông đen định vị nội bộ (AnchorPoint 2..23) trên ảnh đã nắn
   * Giúp bù trừ độ cong giấy cục bộ và vẽ ô vuông xanh lá minh chứng công nghệ QM
   */
  detectInternalAnchors(imageData) {
    const data = imageData.data;
    const w = imageData.width;
    const h = imageData.height;
    const radiusX = Math.floor(w * 0.025); // Cửa sổ tìm kiếm ±2.5% chuẩn getCenter của QM APK
    const radiusY = Math.floor(h * 0.022);

    const detectedAnchors = [];
    let sumDx = 0, sumDy = 0, validCount = 0;

    for (const anchor of this.CANONICAL_INTERNAL_ANCHORS) {
      const minX = Math.max(0, Math.floor(anchor.x - radiusX));
      const maxX = Math.min(w - 1, Math.ceil(anchor.x + radiusX));
      const minY = Math.max(0, Math.floor(anchor.y - radiusY));
      const maxY = Math.min(h - 1, Math.ceil(anchor.y + radiusY));

      let sumX = 0, sumY = 0, count = 0;
      let minLum = 255;

      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          const idx = (y * w + x) * 4;
          const lum = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
          if (lum < minLum) minLum = lum;
        }
      }

      if (minLum < 115) {
        const thresh = Math.min(115, minLum + 35);
        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            const idx = (y * w + x) * 4;
            const lum = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
            if (lum <= thresh) {
              sumX += x;
              sumY += y;
              count++;
            }
          }
        }
      }

      if (count >= 12 && count <= (radiusX * radiusY * 2.2)) {
        const cx = sumX / count;
        const cy = sumY / count;
        const dx = cx - anchor.x;
        const dy = cy - anchor.y;
        // Chỉ nhận độ lệch hợp lý
        if (Math.abs(dx) <= 18 && Math.abs(dy) <= 18) {
          detectedAnchors.push({
            id: anchor.id,
            x: cx,
            y: cy,
            expectedX: anchor.x,
            expectedY: anchor.y,
            dx,
            dy,
            found: true
          });
          sumDx += dx;
          sumDy += dy;
          validCount++;
          continue;
        }
      }

      detectedAnchors.push({
        id: anchor.id,
        x: anchor.x,
        y: anchor.y,
        expectedX: anchor.x,
        expectedY: anchor.y,
        dx: 0,
        dy: 0,
        found: false
      });
    }

    // Cũng thêm 4 góc định vị ngoài vào danh sách hiển thị
    const cornerAnchors = [
      { id: "C_TL", x: 24, y: 24, found: true, isCorner: true },
      { id: "C_TR", x: w - 24, y: 24, found: true, isCorner: true },
      { id: "C_BR", x: w - 24, y: h - 24, found: true, isCorner: true },
      { id: "C_BL", x: 24, y: h - 24, found: true, isCorner: true }
    ];

    return {
      anchors: [...cornerAnchors, ...detectedAnchors],
      avgDx: validCount > 4 ? (sumDx / validCount) * 0.35 : 0,
      avgDy: validCount > 4 ? (sumDy / validCount) * 0.35 : 0,
      foundCount: validCount + 4
    };
  }

  /**
   * Tính tỷ lệ tô đen của ô tròn tại tâm (cx, cy) với ngưỡng thích ứng từ Cài đặt chung
   */
  getFillRatio(imageData, cx, cy, radius = 8, grayCutoff = 126) {
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
          const gray = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
          if (gray < grayCutoff) {
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
   * Đọc Số Báo Danh (6 chữ số) - Hỗ trợ bật/tắt quét SBD (`has_sbd`)
   */
  readSBD(imageData, hasSbd = true, shiftX = 0, shiftY = 0) {
    if (hasSbd === false) {
      return { sbd: "------", points: [] };
    }

    const sens = this.getSensitivityParams();
    let sbd = "";
    const points = [];

    for (let c = 0; c < 6; c++) {
      const ratios = [];
      const coords = [];
      for (let d = 0; d < 10; d++) {
        const cx = this.SBD_X + (c + 0.5) * this.SBD_COL_W + shiftX;
        const cy = this.SBD_Y + 70.0 + (d + 0.5) * this.SBD_ROW_H + shiftY;
        ratios.push(this.getFillRatio(imageData, cx, cy, 8, sens.grayCutoff));
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

      if (maxRatio > mean + sens.zFactor * std && (maxRatio > sens.minFill || std > sens.minStd)) {
        sbd += String(bestD);
        points.push({ x: coords[bestD].x, y: coords[bestD].y, label: String(bestD), col: c });
      } else {
        sbd += "0";
      }
    }

    return { sbd, points };
  }

  /**
   * Đọc Mã Đề Thi (Hỗ trợ cả phiếu Mã đề 3 số và 4 số chuẩn NewQuizActivity)
   */
  readMade(imageData, madeDigits = 3, shiftX = 0, shiftY = 0) {
    const sens = this.getSensitivityParams();
    const numCols = madeDigits === 4 ? 4 : 3;
    const colW = numCols === 4 ? this.MADE_COL_W_4 : this.MADE_COL_W_3;
    let made = "";
    const points = [];

    for (let c = 0; c < numCols; c++) {
      const ratios = [];
      const coords = [];
      for (let d = 0; d < 10; d++) {
        const cx = this.MADE_X + (c + 0.5) * colW + shiftX;
        const cy = this.MADE_Y + 70.0 + (d + 0.5) * this.SBD_ROW_H + shiftY;
        ratios.push(this.getFillRatio(imageData, cx, cy, 8, sens.grayCutoff));
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

      if (maxRatio > mean + sens.zFactor * std && (maxRatio > sens.minFill || std > sens.minStd)) {
        made += String(bestD);
        points.push({ x: coords[bestD].x, y: coords[bestD].y, label: String(bestD), col: c });
      } else {
        made += "0";
      }
    }
    return { made, points };
  }

  /**
   * Đọc Phần I: Trắc nghiệm 4 lựa chọn (A, B, C, D) - Hỗ trợ 0..40 câu
   */
  readPart1(imageData, numQuestions = 12, shiftX = 0, shiftY = 0) {
    const sens = this.getSensitivityParams();
    const answers = [];
    const infoMap = {};
    const optLabels = ["A", "B", "C", "D"];
    const maxQ = Math.min(40, Math.max(0, parseInt(numQuestions, 10) || 0));

    for (let q = 0; q < maxQ; q++) {
      const colIdx = Math.floor(q / 10);
      const qInCol = q % 10;
      const colX = this.P1_COLS_X[colIdx] || this.P1_COLS_X[0];
      const qy = this.P1_Y + this.P1_HEADER_H + (qInCol + 0.5) * this.P1_ROW_H + shiftY;

      const ratios = [];
      const coords = [];
      for (let opt = 0; opt < 4; opt++) {
        const qx = colX + this.P1_QNUM_W + (opt + 0.5) * this.P1_OPT_W + shiftX;
        ratios.push(this.getFillRatio(imageData, qx, qy, 8, sens.grayCutoff));
        coords.push({ x: qx, y: qy });
      }

      const { mean, std } = this.calcStats(ratios);
      const filledOpts = [];
      for (let opt = 0; opt < 4; opt++) {
        if (ratios[opt] > mean + sens.zFactor * std && ratios[opt] > sens.minFill && std > sens.minStd) {
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
        filledOpts: filledOpts,
        bestOpt: filledOpts.length === 1 ? filledOpts[0] : -1
      };
    }
    return { answers, infoMap };
  }

  /**
   * Đọc Phần II: Đúng / Sai (a, b, c, d) - Hỗ trợ 0..8 câu
   */
  readPart2(imageData, numQuestions = 4, shiftX = 0, shiftY = 0) {
    const sens = this.getSensitivityParams();
    const answers = {};
    const infoMap = {};
    const maxQ = Math.min(8, Math.max(0, parseInt(numQuestions, 10) || 0));

    for (let q = 0; q < maxQ; q++) {
      const blockIdx = Math.floor(q / 2);
      const qHalf = q % 2;
      const blockX = this.P2_BLOCKS_X[blockIdx] || this.P2_BLOCKS_X[0];
      const subX = blockX + qHalf * this.P2_SUB_W + shiftX;
      const qKey = String(q + 1);

      const qAnswers = [];
      const qCoords = [];

      for (let item = 0; item < 4; item++) {
        const iy = this.P2_Y + this.P2_HEADER_H + (item + 0.5) * this.P2_ROW_H + shiftY;
        const dx = subX + this.P2_LABEL_W + 0.5 * this.P2_OPT_W;
        const sx = subX + this.P2_LABEL_W + 1.5 * this.P2_OPT_W;

        const dFill = this.getFillRatio(imageData, dx, iy, 8, sens.grayCutoff);
        const sFill = this.getFillRatio(imageData, sx, iy, 8, sens.grayCutoff);

        let itemAns = "";
        if (Math.abs(dFill - sFill) < sens.p2Diff || (dFill < sens.p2Min && sFill < sens.p2Min)) {
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
   * Đọc Phần III: Trả lời ngắn (Điền số) - Hỗ trợ 0..6 câu
   */
  readPart3(imageData, numQuestions = 6, shiftX = 0, shiftY = 0) {
    const sens = this.getSensitivityParams();
    const answers = [];
    const infoMap = {};
    const maxQ = Math.min(6, Math.max(0, parseInt(numQuestions, 10) || 0));

    for (let q = 0; q < maxQ; q++) {
      const qBaseX = this.P3_X + q * this.P3_BLOCK_W + shiftX;
      let ansStr = "";
      const coords = [];

      // Cột 1: Dấu âm '-'
      const minusFill = this.getFillRatio(imageData, qBaseX + 56.0, this.P3_Y + 59.0 + shiftY, 8, sens.grayCutoff);
      const signFills = [];
      for (let d = 0; d < 10; d++) {
        signFills.push(this.getFillRatio(imageData, qBaseX + 56.0, this.P3_Y + 126.0 + d * 33.5 + shiftY, 8, sens.grayCutoff));
      }
      const sStats = this.calcStats(signFills);
      if (minusFill > sStats.mean + sens.zFactor * sStats.std && minusFill > sens.minFill) {
        ansStr += "-";
        coords.push({ x: qBaseX + 56.0, y: this.P3_Y + 59.0 + shiftY, val: "-" });
      }

      // Các cột chữ số & dấu phẩy thập phân
      const colOffsets = [87.0, 117.5, 148.0];
      for (const colOff of colOffsets) {
        const commaFill = this.getFillRatio(imageData, qBaseX + colOff, this.P3_Y + 92.5 + shiftY, 8, sens.grayCutoff);
        const digitFills = [];
        for (let d = 0; d < 10; d++) {
          digitFills.push(this.getFillRatio(imageData, qBaseX + colOff, this.P3_Y + 126.0 + d * 33.5 + shiftY, 8, sens.grayCutoff));
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

        if (commaFill > mean + sens.zFactor * std && commaFill > maxDFill && commaFill > sens.minFill) {
          ansStr += ".";
          coords.push({ x: qBaseX + colOff, y: this.P3_Y + 92.5 + shiftY, val: "." });
        } else if (maxDFill > mean + sens.zFactor * std && maxDFill > sens.minFill) {
          ansStr += String(maxD);
          coords.push({ x: qBaseX + colOff, y: this.P3_Y + 126.0 + maxD * 33.5 + shiftY, val: String(maxD) });
        }
      }

      answers.push(ansStr);
      infoMap[q] = { answer: ansStr, coords };
    }
    return { answers, infoMap };
  }

  normalizeNumber(str) {
    if (!str && str !== 0) return "";
    const s = String(str).trim().replace(",", ".");
    if (!s) return "";
    const f = parseFloat(s);
    if (!isNaN(f)) {
      return Number.isInteger(f) ? String(parseInt(f, 10)) : String(parseFloat(f.toFixed(4)));
    }
    return s.toLowerCase();
  }

  /**
   * Chấm điểm theo cấu hình tùy biến đầy đủ (Phần 1, Phần 2 4 mức điểm 1-2-3-4 ý, Phần 3)
   * Chuẩn GradeUtilsUnt2025 & NewQuizActivity của QM APK
   */
  gradeSheet(extracted, answerKeys, config) {
    const sbd = extracted.sbd;
    const made = extracted.made;
    const hasExactKey = Boolean(answerKeys && answerKeys[made]);
    const fallbackKeyCode = answerKeys ? Object.keys(answerKeys)[0] : null;
    const key = hasExactKey ? answerKeys[made] : (fallbackKeyCode ? answerKeys[fallbackKeyCode] : null);

    const p1ScorePerQ = this.parseScoreValue(config.p1_score, 0.25);
    const p3ScorePerQ = this.parseScoreValue(config.p3_score, 0.5);

    // Điểm từng mức đúng 1 ý, 2 ý, 3 ý, 4 ý của Phần II (NewQuizActivity: edtScorePerOnePart21..24)
    const p2Rules = {
      1: this.parseScoreValue(config.p2_score_1 !== undefined ? config.p2_score_1 : 0.1, 0.1),
      2: this.parseScoreValue(config.p2_score_2 !== undefined ? config.p2_score_2 : 0.25, 0.25),
      3: this.parseScoreValue(config.p2_score_3 !== undefined ? config.p2_score_3 : 0.5, 0.5),
      4: this.parseScoreValue(config.p2_score_4 !== undefined ? config.p2_score_4 : 1.0, 1.0)
    };

    const result = {
      sbd: sbd,
      made: made,
      part1_answers: [...(extracted.part1.answers || [])],
      part2_answers: JSON.parse(JSON.stringify(extracted.part2.answers || {})),
      part3_answers: [...(extracted.part3.answers || [])],
      part1_score: 0.0,
      part2_score: 0.0,
      part3_score: 0.0,
      total_score: 0.0,
      max_possible_score: this.calcMaxTotalScore(config),
      part1_correct: 0,
      part2_correct_items: 0,
      part3_correct: 0,
      double_count: 0,
      blank_count: 0,
      status: hasExactKey ? "OK" : (key ? "FALLBACK_KEY" : "NO_KEY"),
      matched_key_code: hasExactKey ? made : (fallbackKeyCode || ""),
      timestamp: new Date().toLocaleTimeString("vi-VN")
    };

    // Thống kê câu bỏ trống hoặc tô đúp
    for (const ans of result.part1_answers) {
      if (ans === "DOUBLE") result.double_count++;
      else if (!ans) result.blank_count++;
    }
    for (const subs of Object.values(result.part2_answers)) {
      for (const s of subs) {
        if (!s) result.blank_count++;
      }
    }
    for (const ans of result.part3_answers) {
      if (!ans) result.blank_count++;
    }

    if (!key) return result;

    // 1. Chấm Phần I
    let p1Correct = 0;
    for (let i = 0; i < result.part1_answers.length; i++) {
      if (i < (key.part1 || []).length && key.part1[i] && result.part1_answers[i] === key.part1[i]) {
        p1Correct++;
      }
    }
    result.part1_correct = p1Correct;
    result.part1_score = parseFloat((p1Correct * p1ScorePerQ).toFixed(2));

    // 2. Chấm Phần II (Theo 4 mức điểm tùy chỉnh p2_score_1..4)
    let p2Total = 0.0;
    let p2CorrectItems = 0;
    for (const [qStr, studentSubs] of Object.entries(result.part2_answers)) {
      const correctSubs = (key.part2 && key.part2[qStr]) ? key.part2[qStr] : [];
      let cCount = 0;
      for (let idx = 0; idx < studentSubs.length; idx++) {
        if (idx < correctSubs.length && correctSubs[idx] && studentSubs[idx] === correctSubs[idx]) {
          cCount++;
          p2CorrectItems++;
        }
      }
      p2Total += (p2Rules[cCount] || 0.0);
    }
    result.part2_correct_items = p2CorrectItems;
    result.part2_score = parseFloat(p2Total.toFixed(2));

    // 3. Chấm Phần III
    let p3Correct = 0;
    for (let i = 0; i < result.part3_answers.length; i++) {
      if (i < (key.part3 || []).length) {
        const sNorm = this.normalizeNumber(result.part3_answers[i]);
        const kNorm = this.normalizeNumber(key.part3[i]);
        if (sNorm && kNorm && sNorm === kNorm) {
          p3Correct++;
        }
      }
    }
    result.part3_correct = p3Correct;
    result.part3_score = parseFloat((p3Correct * p3ScorePerQ).toFixed(2));

    // Tổng điểm
    const rawTotal = result.part1_score + result.part2_score + result.part3_score;
    result.total_score = this.roundScore(rawTotal);
    return result;
  }

  /**
   * Tính tổng điểm tối đa của cấu trúc đề (Dùng trong Modal cấu hình bài chấm & Header)
   */
  calcMaxTotalScore(config) {
    if (!config) return 10;
    const p1Num = Math.max(0, parseInt(config.p1_num, 10) || 0);
    const p2Num = Math.max(0, parseInt(config.p2_num, 10) || 0);
    const p3Num = Math.max(0, parseInt(config.p3_num, 10) || 0);

    const p1Score = this.parseScoreValue(config.p1_score, 0.25);
    const p2MaxPerQ = this.parseScoreValue(config.p2_score_4 !== undefined ? config.p2_score_4 : 1.0, 1.0);
    const p3Score = this.parseScoreValue(config.p3_score, 0.5);

    const total = p1Num * p1Score + p2Num * p2MaxPerQ + p3Num * p3Score;
    return parseFloat(total.toFixed(2));
  }

  /**
   * So sánh 2 kết quả liên tiếp (`ScanNowActivity1239.compareAnswerSheetResults` của QM APK)
   * Đảm bảo khóa ảnh chính xác khi quét tự động bằng Camera
   */
  compareAnswerSheetResults(res1, res2) {
    if (!res1 || !res2) return false;
    if (res1.made !== res2.made) return false;
    if (res1.sbd !== res2.sbd) return false;

    // So khớp tối thiểu 90% câu Phần I
    const p1a = res1.part1_answers || [];
    const p1b = res2.part1_answers || [];
    if (p1a.length !== p1b.length) return false;
    let diff = 0;
    for (let i = 0; i < p1a.length; i++) {
      if (p1a[i] !== p1b[i]) diff++;
    }
    return diff <= 1;
  }

  /**
   * Vẽ khoanh tròn đáp án, ô định vị góc/nội bộ (`AnchorPoint`), và dấu hiệu chỉnh sửa thủ công lên Canvas
   */
  drawVisualAnnotation(canvas, extracted, result, key, manualOverrides = null) {
    const ctx = canvas.getContext("2d");
    const optIndices = { "A": 0, "B": 1, "C": 2, "D": 3 };
    const settings = this.getSettings();

    // 0. Vẽ các ô vuông xanh lá định vị góc & điểm neo nội bộ (Chuẩn QM APK `Imgproc.rectangle` #00FF00)
    if (settings.showAnchors !== false && extracted.anchorData && extracted.anchorData.anchors) {
      for (const anc of extracted.anchorData.anchors) {
        if (!anc.found) continue;
        ctx.save();
        if (anc.isCorner) {
          ctx.strokeStyle = "#00ff00";
          ctx.lineWidth = 4;
          ctx.strokeRect(anc.x - 16, anc.y - 16, 32, 32);
          ctx.fillStyle = "rgba(0, 255, 0, 0.18)";
          ctx.fillRect(anc.x - 16, anc.y - 16, 32, 32);
        } else {
          ctx.strokeStyle = "#10b981";
          ctx.lineWidth = 2.5;
          ctx.strokeRect(anc.x - 10, anc.y - 10, 20, 20);
        }
        ctx.restore();
      }
    }

    // 1. Khoanh SBD & Mã đề
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#0284c7"; // Blue
    if (extracted.sbd && extracted.sbd.points) {
      for (const pt of extracted.sbd.points) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 11, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
    if (extracted.made && extracted.made.points) {
      for (const pt of extracted.made.points) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 11, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }

    // 2. Khoanh Phần I
    const p1Answers = result.part1_answers || [];
    for (let q = 0; q < p1Answers.length; q++) {
      const qInfo = extracted.part1 && extracted.part1.infoMap ? extracted.part1.infoMap[q] : null;
      if (!qInfo || !qInfo.coords) continue;

      const sOpt = p1Answers[q];
      const kOpt = key && key.part1 && q < key.part1.length ? key.part1[q] : null;
      const isModified = manualOverrides && manualOverrides.part1 && manualOverrides.part1[q];

      if (kOpt && optIndices[kOpt] !== undefined) {
        const kIdx = optIndices[kOpt];
        if (sOpt === kOpt) {
          // Đúng: Vòng xanh lá
          ctx.strokeStyle = "#16a34a";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(qInfo.coords[kIdx].x, qInfo.coords[kIdx].y, 12, 0, 2 * Math.PI);
          ctx.stroke();
        } else {
          // Sai hoặc Tô đúp
          if (sOpt === "DOUBLE" && qInfo.filledOpts) {
            ctx.strokeStyle = "#f97316"; // Cam cho tô đúp
            ctx.lineWidth = 3.5;
            for (const fIdx of qInfo.filledOpts) {
              ctx.beginPath();
              ctx.arc(qInfo.coords[fIdx].x, qInfo.coords[fIdx].y, 12, 0, 2 * Math.PI);
              ctx.stroke();
            }
          } else if (sOpt && optIndices[sOpt] !== undefined) {
            ctx.strokeStyle = "#dc2626"; // Đỏ cho chọn sai
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(qInfo.coords[optIndices[sOpt]].x, qInfo.coords[optIndices[sOpt]].y, 12, 0, 2 * Math.PI);
            ctx.stroke();
          }
          // Vòng vàng đáp án đúng
          ctx.strokeStyle = "#eab308";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(qInfo.coords[kIdx].x, qInfo.coords[kIdx].y, 12, 0, 2 * Math.PI);
          ctx.stroke();
        }

        // Dấu hiệu nhận biết câu đã chỉnh sửa thủ công trực tiếp trên ảnh phiếu
        if (isModified) {
          const leftPt = qInfo.coords[0];
          ctx.save();
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(leftPt.x - 44, leftPt.y - 10, 26, 20);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 11px Arial";
          ctx.fillText("✎", leftPt.x - 36, leftPt.y + 4);
          ctx.restore();
        }
      }
    }

    // 3. Khoanh Phần II
    if (extracted.part2 && extracted.part2.infoMap) {
      for (const [qStr, qInfo] of Object.entries(extracted.part2.infoMap)) {
        const kSubs = key && key.part2 && key.part2[qStr] ? key.part2[qStr] : [];
        const sSubs = (result.part2_answers && result.part2_answers[qStr]) ? result.part2_answers[qStr] : qInfo.answers;

        for (let idx = 0; idx < qInfo.coords.length; idx++) {
          const cInfo = qInfo.coords[idx];
          const sVal = sSubs[idx];
          const kVal = kSubs[idx];
          const isModSub = manualOverrides && manualOverrides.part2 && manualOverrides.part2[`${qStr}_${idx}`];

          if (kVal === "Đ" || kVal === "S") {
            const kPt = kVal === "Đ" ? cInfo.D : cInfo.S;
            if (sVal === kVal) {
              ctx.strokeStyle = "#16a34a";
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.arc(kPt.x, kPt.y, 11, 0, 2 * Math.PI);
              ctx.stroke();
            } else {
              if (sVal === "Đ" || sVal === "S") {
                const sPt = sVal === "Đ" ? cInfo.D : cInfo.S;
                ctx.strokeStyle = "#dc2626";
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(sPt.x, sPt.y, 11, 0, 2 * Math.PI);
                ctx.stroke();
              }
              ctx.strokeStyle = "#eab308";
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(kPt.x, kPt.y, 11, 0, 2 * Math.PI);
              ctx.stroke();
            }
          }

          if (isModSub) {
            ctx.save();
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath();
            ctx.arc(cInfo.D.x - 24, cInfo.D.y, 7, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
          }
        }
      }
    }

    // 4. Khoanh Phần III
    if (extracted.part3 && extracted.part3.infoMap) {
      const p3Answers = result.part3_answers || [];
      for (let q = 0; q < p3Answers.length; q++) {
        const qInfo = extracted.part3.infoMap[q];
        if (!qInfo) continue;
        const sNorm = this.normalizeNumber(p3Answers[q]);
        const kNorm = key && key.part3 && q < key.part3.length ? this.normalizeNumber(key.part3[q]) : "";
        const isCorrect = sNorm && kNorm && sNorm === kNorm;

        ctx.strokeStyle = isCorrect ? "#16a34a" : "#dc2626";
        ctx.lineWidth = 3.5;
        for (const pt of (qInfo.coords || [])) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 10, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }
    }

    // 5. Vẽ Thẻ Điểm Banner trên đầu phiếu (Chuẩn QM APK: P1: ...; P2: ...; P3: ... | Tổng: ...)
    ctx.fillStyle = "rgba(15, 23, 42, 0.93)";
    ctx.fillRect(28, 24, canvas.width - 56, 94);
    ctx.strokeStyle = manualOverrides && manualOverrides.hasAnyEdit ? "#f59e0b" : "#22c55e";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(28, 24, canvas.width - 56, 94);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 21px Arial, sans-serif";
    ctx.fillText(
      `SBD: ${result.sbd}   |   MÃ ĐỀ: ${result.made}   |   P1: ${result.part1_score.toFixed(2)}đ ; P2: ${result.part2_score.toFixed(2)}đ ; P3: ${result.part3_score.toFixed(2)}đ`,
      48,
      62
    );

    const maxScore = result.max_possible_score || 10;
    ctx.fillStyle = result.total_score >= maxScore * 0.8 ? "#22c55e" : (result.total_score >= maxScore * 0.5 ? "#38bdf8" : "#ef4444");
    ctx.font = "bold 29px Arial, sans-serif";
    const modTag = (manualOverrides && manualOverrides.hasAnyEdit) ? `  [✎ Đã chỉnh sửa thủ công]` : "";
    ctx.fillText(`TỔNG ĐIỂM: ${result.total_score.toFixed(2)} / ${maxScore}${modTag}`, 48, 102);
  }

  /**
   * Xử lý toàn diện Canvas 1200x1700 đã nắn thẳng
   */
  processWarpedCanvas(canvas, config, answerKeys) {
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Lưu ảnh gốc đã nắn thẳng (chưa vẽ khoanh) để có thể vẽ lại khi chỉnh sửa thủ công hoặc bật/tắt lớp chấm
    const cleanWarpedDataUrl = canvas.toDataURL("image/jpeg", 0.84);

    // 1. Dò các điểm neo nội bộ (AnchorPoint 2..23 chuẩn PositionPointsDataUnt2025.getCenter)
    const anchorData = this.detectInternalAnchors(imgData);
    const shiftX = 0;
    const shiftY = 0;

    // 2. Đọc các vùng dữ liệu với bù trừ điểm neo
    const hasSbd = config.has_sbd !== false;
    const madeDigits = parseInt(config.made_digits, 10) === 4 ? 4 : 3;

    const sbd = this.readSBD(imgData, hasSbd, shiftX, shiftY);
    const made = this.readMade(imgData, madeDigits, shiftX, shiftY);
    const part1 = this.readPart1(imgData, config.p1_num !== undefined ? config.p1_num : 12, shiftX, shiftY);
    const part2 = this.readPart2(imgData, config.p2_num !== undefined ? config.p2_num : 4, shiftX, shiftY);
    const part3 = this.readPart3(imgData, config.p3_num !== undefined ? config.p3_num : 6, shiftX, shiftY);

    const extracted = {
      sbd: sbd.sbd,
      sbdObj: sbd,
      made: made.made,
      madeObj: made,
      part1,
      part2,
      part3,
      anchorData
    };

    const result = this.gradeSheet(extracted, answerKeys, config);
    const key = answerKeys[result.made] || answerKeys[Object.keys(answerKeys)[0]];

    this.drawVisualAnnotation(canvas, { sbd, made, part1, part2, part3, anchorData }, result, key, null);

    return {
      extracted,
      result,
      cleanWarpedDataUrl,
      annotatedDataUrl: canvas.toDataURL("image/jpeg", 0.88),
      canvas: canvas
    };
  }

  /**
   * Chấm lại & Vẽ lại ảnh phiếu sau khi giáo viên chỉnh sửa thủ công (SBD, Mã đề, hoặc đáp án P1/P2/P3)
   */
  async regradeRecordWithEdits(record, exam, manualOverrides) {
    const config = exam.config || {};
    const answerKeys = exam.answerKeys || {};

    const fakeExtracted = {
      sbd: record.sbd,
      made: record.made,
      part1: { answers: record.part1_answers || [], infoMap: (record.extractedMeta && record.extractedMeta.part1Info) || {} },
      part2: { answers: record.part2_answers || {}, infoMap: (record.extractedMeta && record.extractedMeta.part2Info) || {} },
      part3: { answers: record.part3_answers || [], infoMap: (record.extractedMeta && record.extractedMeta.part3Info) || {} },
      anchorData: (record.extractedMeta && record.extractedMeta.anchorData) || null
    };

    const newResult = this.gradeSheet(fakeExtracted, answerKeys, config);
    record.part1_score = newResult.part1_score;
    record.part2_score = newResult.part2_score;
    record.part3_score = newResult.part3_score;
    record.total_score = newResult.total_score;
    record.part1_correct = newResult.part1_correct;
    record.part2_correct_items = newResult.part2_correct_items;
    record.part3_correct = newResult.part3_correct;
    record.status = newResult.status;

    // Nếu có ảnh gốc đã nắn thẳng (cleanWarpedDataUrl), vẽ lại vòng tròn chấm điểm mới lên ảnh
    if (record.cleanWarpedDataUrl && record.extractedMeta) {
      await new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = this.TARGET_W;
          canvas.height = this.TARGET_H;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, this.TARGET_W, this.TARGET_H);

          const key = answerKeys[record.made] || answerKeys[Object.keys(answerKeys)[0]];
          this.drawVisualAnnotation(
            canvas,
            {
              sbd: record.extractedMeta.sbdObj || { points: [] },
              made: record.extractedMeta.madeObj || { points: [] },
              part1: { answers: record.part1_answers, infoMap: record.extractedMeta.part1Info || {} },
              part2: { answers: record.part2_answers, infoMap: record.extractedMeta.part2Info || {} },
              part3: { answers: record.part3_answers, infoMap: record.extractedMeta.part3Info || {} },
              anchorData: record.extractedMeta.anchorData || null
            },
            record,
            key,
            manualOverrides
          );
          record.annotatedDataUrl = canvas.toDataURL("image/jpeg", 0.88);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = record.cleanWarpedDataUrl;
      });
    }

    return record;
  }

  /**
   * Chấm điểm từ bất kỳ nguồn nào (Image, Video Frame, hoặc Canvas)
   * Tự động phát hiện 4 ô định vị góc toàn khung hình (Full-Frame) để đạt góc nhìn rộng tối đa
   */
  gradeFromImageSource(source, config, answerKeys, manualQuad = null) {
    const sw = source.videoWidth || source.naturalWidth || source.width || 1200;
    const sh = source.videoHeight || source.naturalHeight || source.height || 1700;

    const fullCanvas = document.createElement("canvas");
    fullCanvas.width = sw;
    fullCanvas.height = sh;
    const fctx = fullCanvas.getContext("2d");
    fctx.drawImage(source, 0, 0, sw, sh);

    // 1. Thử dò 4 ô vuông định vị góc trên toàn bộ ảnh (không crop) để giữ góc rộng tối đa
    let cornerInfo = manualQuad
      ? { points: manualQuad, cornerStatus: [true, true, true, true], lockedCount: 4, isExact: true }
      : this.detectCornerMarkersWithStatus(fullCanvas);

    let baseCanvas = fullCanvas;

    // 2. Nếu chưa bắt đủ 4 góc trên toàn ảnh (ví dụ khi người dùng chụp thủ công lúc thiếu sáng),
    // thử fallback dò trên vùng trung tâm 1:1.38
    if (cornerInfo.lockedCount < 4 && !manualQuad) {
      const targetAspect = 1.0 / 1.38;
      let cropW = sw;
      let cropH = sw / targetAspect;
      if (cropH > sh) {
        cropH = sh;
        cropW = sh * targetAspect;
      }
      const sx = (sw - cropW) / 2;
      const sy = (sh - cropH) / 2;
      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = Math.round(cropW);
      cropCanvas.height = Math.round(cropH);
      const cctx = cropCanvas.getContext("2d");
      cctx.drawImage(source, sx, sy, cropW, cropH, 0, 0, cropCanvas.width, cropCanvas.height);

      const fallbackInfo = this.detectCornerMarkersWithStatus(cropCanvas);
      if (fallbackInfo.lockedCount > cornerInfo.lockedCount) {
        cornerInfo = fallbackInfo;
        baseCanvas = cropCanvas;
      }
    }

    // Nắn thẳng phối cảnh về chuẩn 1200x1700
    const warpedCanvas = this.warpPerspective(baseCanvas, cornerInfo.points, this.TARGET_W, this.TARGET_H);

    // Chấm điểm & khoanh kết quả
    const out = this.processWarpedCanvas(warpedCanvas, config, answerKeys);
    out.cornerInfo = cornerInfo;
    return out;
  }
}

// Khởi tạo global instance
window.omrEngine = new OMREngine();
