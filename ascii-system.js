(function () {
  const ASCII_SYSTEM_CONFIG = {
    cell: {
      desktop: { w: 11, h: 20 },
      tablet: { w: 9.6, h: 18 },
      mobile: { w: 8.2, h: 16 }
    },
    breakpoints: { tablet: 1180, mobile: 760 },
    gapDensity: 0.84,
    contentGapDensity: 0.9,
    noiseCharset: ".,:;|_\\/^~`'\"*+=-<>[]{}()!?#$%&@",
    accentCharset: "█▓▒░╬╣╠╩╦╔╗╚╝┼┤├┴┬│─¦¦",
    gutterMotifs: [
      ["╎", "╎", ":", "¦"],
      ["┆", ":", "┆", "."],
      ["░", "▒", "░", " "],
      ["╭", "─", "╮", " "],
      ["╰", "─", "╯", " "]
    ],
    zones: {
      leftGutterCols: 2,
      rightGutterCols: 2,
      contentInsetCols: 3,
      headerRows: 5,
      actionRows: 10,
      footerRows: 2
    },
    animation: { enabled: false, tickMs: 320 }
  };

  const ASCII_SPRITES = {
    cloud: [" .--. ", "(____)"],
    birdA: ["\\v/"],
    birdB: ["/v\\"]
  };

  const PAGE_BLOCKS_HOME = [
    { type: "title", text: "AIRPASTE // ASCII", priority: 10 },
    { type: "body", text: "A local-first workspace where every visible element is built from characters, borders, and signal noise.", priority: 9 },
    { type: "body", text: "No scrolling. No custom cursor. Two pages only. Everything lives inside the terminal fabric.", priority: 8 },
    { type: "body", text: "Links and actions are semantic HTML mapped to drawn ASCII boxes.", priority: 7 }
  ];

  const PAGE_BLOCKS_DOWNLOAD = [
    { type: "title", text: "DOWNLOAD AIRPASTE", priority: 10 },
    { type: "body", text: "Download the latest Windows build with a clean ASCII-first interface.", priority: 9 },
    { type: "body", text: "Keyboard focus and clickable regions map exactly to box boundaries.", priority: 8 }
  ];

  let spriteTimer = null;
  let lastState = null;

  function pickCell() {
    const w = window.innerWidth;
    if (w <= ASCII_SYSTEM_CONFIG.breakpoints.mobile) return ASCII_SYSTEM_CONFIG.cell.mobile;
    if (w <= ASCII_SYSTEM_CONFIG.breakpoints.tablet) return ASCII_SYSTEM_CONFIG.cell.tablet;
    return ASCII_SYSTEM_CONFIG.cell.desktop;
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function wrapWords(text, maxWidth) {
    if (maxWidth < 8) return [text.slice(0, Math.max(1, maxWidth))];
    const words = text.split(" ");
    const out = [];
    let line = "";
    for (const word of words) {
      if (!line) {
        line = word.length <= maxWidth ? word : word.slice(0, maxWidth);
        continue;
      }
      const next = `${line} ${word}`;
      if (next.length <= maxWidth) line = next;
      else {
        out.push(line);
        line = word.length <= maxWidth ? word : word.slice(0, maxWidth);
      }
    }
    if (line) out.push(line);
    return out;
  }

  function putLine(grid, row, col, text, tone = "signal") {
    if (!grid[row]) return;
    for (let i = 0; i < text.length; i++) {
      const x = col + i;
      if (x >= 0 && x < grid[row].length) {
        grid[row][x].char = text[i];
        grid[row][x].tone = tone;
      }
    }
  }

  function buildButtonLines(labelText, innerWidth) {
    const safeLabel = ` ${labelText} `;
    const contentWidth = Math.max(safeLabel.length, innerWidth);
    const padded = safeLabel.padEnd(contentWidth, " ");
    const top = `╭${"═".repeat(contentWidth)}╮`;
    const mid = `│${padded}│`;
    const bot = `╰${"═".repeat(contentWidth)}╯`;
    return { lines: [top, mid, bot], width: top.length };
  }

  function buildPanelLines(title, bodyLines, width) {
    const innerWidth = Math.max(width, title.length + 4, ...bodyLines.map(line => line.length + 2));
    const top = `╔${"═".repeat(innerWidth)}╗`;
    const titleLine = `║ ${title.padEnd(innerWidth - 2, " ")} ║`;
    const rule = `╟${"─".repeat(innerWidth)}╢`;
    const lines = [top, titleLine, rule];
    for (const line of bodyLines) {
      lines.push(`║ ${line.padEnd(innerWidth - 2, " ")} ║`);
    }
    lines.push(`╚${"═".repeat(innerWidth)}╝`);
    return { lines, width: top.length };
  }

  function drawGutterMotifs(grid, rows, cols, contentStart, contentEnd) {
    const motifs = ASCII_SYSTEM_CONFIG.gutterMotifs;
    for (let side = 0; side < 2; side++) {
      const startCol = side === 0 ? 0 : contentEnd + 2;
      const endCol = side === 0 ? contentStart - 2 : cols - 1;
      if (endCol <= startCol) continue;
      for (let r = 2; r < rows - 3; r += 4) {
        const motif = motifs[(r + side) % motifs.length];
        const baseCol = side === 0 ? startCol + ((r / 4) % Math.max(1, endCol - startCol)) : endCol - ((r / 4) % Math.max(1, endCol - startCol));
        for (let i = 0; i < motif.length; i++) {
          const rr = r + i;
          if (rr < rows && grid[rr] && grid[rr][baseCol] !== undefined) {
            grid[rr][baseCol].char = motif[i];
            grid[rr][baseCol].tone = "noise";
          }
        }
      }
    }
  }

  function makeBaseGrid(rows, cols, contentStart, contentEnd) {
    const chars = ASCII_SYSTEM_CONFIG.noiseCharset;
    const accents = ASCII_SYSTEM_CONFIG.accentCharset || "";
    const grid = Array.from(
      { length: rows },
      () => Array.from({ length: cols }, () => ({ char: " ", tone: "noise" }))
    );

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const inContent = c >= contentStart && c <= contentEnd;
        const density = inContent ? ASCII_SYSTEM_CONFIG.contentGapDensity : ASCII_SYSTEM_CONFIG.gapDensity;
        if (Math.random() > density) {
          const useAccent = accents.length > 0 && Math.random() < 0.13;
          const source = useAccent ? accents : chars;
          grid[r][c].char = source[Math.floor(Math.random() * source.length)];
        }
      }
    }
    return grid;
  }

  function escapeHtml(text) {
    return text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function renderMatrixHtml(grid) {
    return grid.map((row) => {
      let html = "";
      let buffer = "";
      let tone = row[0] ? row[0].tone : "noise";

      const flush = () => {
        if (!buffer) return;
        html += `<span class="ascii-${tone}">${escapeHtml(buffer)}</span>`;
        buffer = "";
      };

      for (const cell of row) {
        if (cell.tone !== tone) {
          flush();
          tone = cell.tone;
        }
        buffer += cell.char;
      }
      flush();
      return html;
    }).join("\n");
  }

  function renderAsciiPage(blocks, config) {
    const matrix = document.getElementById("asciiMatrix");
    const nav = document.getElementById("asciiInteractive");
    if (!matrix || !nav) return null;

    const cell = pickCell();
    document.documentElement.style.setProperty("--cell-w", `${cell.w}px`);
    document.documentElement.style.setProperty("--cell-h", `${cell.h}px`);

    const cols = Math.floor(window.innerWidth / cell.w);
    const rows = Math.floor(window.innerHeight / cell.h);
    const safeCols = Math.max(52, cols);
    const safeRows = Math.max(26, rows);

    const contentStart = config.zones.leftGutterCols + config.zones.contentInsetCols;
    const contentEnd = safeCols - config.zones.rightGutterCols - config.zones.contentInsetCols - 1;
    const contentWidth = Math.max(26, contentEnd - contentStart + 1);

    const headerRow = 0;
    const navRow = 1;
    const mainStartRow = config.zones.headerRows + 1;
    const actionStartRow = safeRows - config.zones.footerRows - config.zones.actionRows;
    const footerRow = safeRows - 2;
    const railWidth = clamp(Math.floor(contentWidth * 0.28), 18, 28);
    const railStart = contentEnd - railWidth + 1;
    const mainWidth = Math.max(24, railStart - contentStart - 3);

    const grid = makeBaseGrid(safeRows, safeCols, contentStart, contentEnd);
    drawGutterMotifs(grid, safeRows, safeCols, contentStart, contentEnd);

    putLine(grid, headerRow, 0, "╞" + "═╪".repeat(Math.ceil((safeCols - 2) / 2)).slice(0, safeCols - 2) + "╡", "signal");
    putLine(grid, navRow, contentStart, "〔 AIRPASTE ASCII 〕 〔 HOME 〕 〔 DOWNLOAD 〕".slice(0, contentWidth), "signal");
    putLine(grid, navRow + 2, contentStart, "░▒▓ SIGNAL FIELD // LOCAL CACHE // LINK VAULT ▓▒░".slice(0, contentWidth), "signal");

    let row = mainStartRow;
    const maxBodyRow = actionStartRow - 2;
    const titleBlock = blocks.find(block => block.type === "title");
    const bodyBlocks = blocks.filter(block => block.type !== "title");
    if (titleBlock) {
      const titlePanel = buildPanelLines(
        "PRIMARY NODE",
        [
          "    _ ___  ____  ____  ____  ___  _______ ____",
          "   / A  / / I / / R / / P / / A / / S C I I /",
          "  /_R__/_/ P /_/ A /_/ S /_/ T /_/ E _______/",
          `  ${titleBlock.text}`
        ],
        Math.min(mainWidth - 2, 50)
      );
      for (const line of titlePanel.lines) {
        if (row > maxBodyRow) break;
        putLine(grid, row, contentStart, line.slice(0, contentWidth), "signal");
        row++;
      }
      row += 2;
    }

    const bodyWidth = Math.min(mainWidth - 2, 62);
    for (const block of bodyBlocks) {
      const wrapped = wrapWords(block.text, bodyWidth);
      const panel = buildPanelLines("MEMO", wrapped, bodyWidth + 2);
      for (const line of panel.lines) {
        if (row > maxBodyRow) break;
        putLine(grid, row, contentStart, line.slice(0, contentWidth), "signal");
        row++;
      }
      row += 1;
      if (row > maxBodyRow) break;
    }

    const railPanel = buildPanelLines(
      "GLYPH FIELD",
      [
        "█▓▒░ <> {} [] ()",
        "╬╣╠╩╦ ╔╗╚╝ ┼┤├┴",
        "//// \\\\\\\\ ==== :::",
        "LOCAL CACHE LIVE",
        "ASCII SIGNAL MAP",
        "VOID / LINK / NODE"
      ],
      railWidth - 2
    );
    let railRow = mainStartRow;
    for (const line of railPanel.lines) {
      if (railRow > maxBodyRow) break;
      putLine(grid, railRow, railStart, line.slice(0, railWidth), "signal");
      railRow++;
    }

    nav.innerHTML = "";
    const links = [];
    if (document.body.dataset.page === "home") {
      links.push({ label: "OPEN DOWNLOAD", href: "download.html", title: "Open download page" });
    } else {
      links.push({ label: "DOWNLOAD AIRPASTE SETUP", href: "https://drive.google.com/uc?export=download&id=1Cv51GHgsaGfUtPdPy4s-Xb3ARbcBbXbQ", title: "Download AirPaste" });
      links.push({ label: "BACK HOME", href: "home.html", title: "Back to home" });
    }

    let actionRow = actionStartRow;
    for (const item of links) {
      const { lines, width } = buildButtonLines(item.label, Math.min(34, Math.max(18, Math.floor(contentWidth * 0.56))));
      for (let i = 0; i < lines.length; i++) {
        putLine(grid, actionRow + i, contentStart, lines[i], "signal");
      }

      const a = document.createElement("a");
      a.className = "ascii-link";
      a.href = item.href;
      if (item.href.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.setAttribute("aria-label", item.title);
      a.textContent = "";
      a.style.left = `${contentStart * cell.w}px`;
      a.style.top = `${actionRow * cell.h}px`;
      a.style.width = `${width * cell.w}px`;
      a.style.height = `${3 * cell.h}px`;
      nav.appendChild(a);

      actionRow += 4;
    }

    putLine(grid, footerRow, contentStart, "NO SCROLL :: ASCII-ONLY UI :: KEYBOARD READY :: LIVE GLYPH SYSTEM".slice(0, contentWidth), "signal");

    matrix.innerHTML = renderMatrixHtml(grid);

    return { rows: safeRows, cols: safeCols, contentStart, contentEnd, cell };
  }

  function initSprites() {
    if (spriteTimer) {
      clearInterval(spriteTimer);
      spriteTimer = null;
    }
    // intentionally disabled during layout hard reset
  }

  function reflowAsciiLayout() {
    const page = document.body.dataset.page === "download" ? "download" : "home";
    const blocks = page === "download" ? PAGE_BLOCKS_DOWNLOAD : PAGE_BLOCKS_HOME;
    lastState = renderAsciiPage(blocks, ASCII_SYSTEM_CONFIG);
    initSprites(lastState);
  }

  function setAsciiContent(blocks) {
    if (!Array.isArray(blocks)) return;
    lastState = renderAsciiPage(blocks, ASCII_SYSTEM_CONFIG);
  }

  window.ASCII_SYSTEM_CONFIG = ASCII_SYSTEM_CONFIG;
  window.ASCII_SPRITES = ASCII_SPRITES;
  window.PAGE_BLOCKS_HOME = PAGE_BLOCKS_HOME;
  window.PAGE_BLOCKS_DOWNLOAD = PAGE_BLOCKS_DOWNLOAD;
  window.renderAsciiPage = renderAsciiPage;
  window.reflowAsciiLayout = reflowAsciiLayout;
  window.setAsciiContent = setAsciiContent;

  window.addEventListener("resize", reflowAsciiLayout);
  window.addEventListener("DOMContentLoaded", reflowAsciiLayout);
})();
