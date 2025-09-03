// Efficiently read the last N lines with an adaptive backward block scan.
// - Starts from EOF, reads backwards in blocks.
// - Doubles block size up to maxBlock if not enough newlines found.
// - Optional maxScanBytes to prevent unbounded memory use on sparse-newline files.
const fs = require('fs/promises');

async function readLastNLines(path, n = 10, opts = {}) {
  const {
    block = 64 * 1024,          // initial block size (64KB)
    maxBlock = 4 * 1024 * 1024, // max block size (4MB)
    maxScanBytes = Infinity,    // cap total bytes scanned (Infinity = no cap)
    encoding = 'utf8'
  } = opts;

  const fh = await fs.open(path, 'r').catch(() => null);
  if (!fh) return [];
  try {
    const stat = await fh.stat();
    let size = stat.size;
    if (size === 0) return [];

    let pos = size;
    let chunked = '';
    let lines = 0;
    let curBlock = block;
    let scanned = 0;

    while (pos > 0 && lines <= n && scanned < maxScanBytes) {
      const budget = maxScanBytes - scanned;
      const readSize = Math.min(curBlock, pos, budget);
      pos -= readSize;
      scanned += readSize;

      const { bytesRead, buffer } = await fh.read({
        buffer: Buffer.allocUnsafe(readSize),
        position: pos
      });

      // Prepend (we're scanning backwards)
      chunked = buffer.toString(encoding, 0, bytesRead) + chunked;

      // Count newlines; if still not enough, grow block (up to maxBlock)
      lines = (chunked.match(/\n/g) || []).length;
      if (lines <= n && curBlock < maxBlock) {
        curBlock = Math.min(curBlock * 2, maxBlock);
      }
    }

    // Split into lines, drop trailing empty (if file ended with \n)
    let arr = chunked.split(/\r?\n/);
    if (arr[arr.length - 1] === '') arr.pop();

    // Keep only the last N
    if (arr.length > n) arr = arr.slice(-n);
    return arr;
  } finally {
    await fh.close();
  }
}

module.exports = { readLastNLines };