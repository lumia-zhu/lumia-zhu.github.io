const copyButton = document.getElementById('copy-citation');
const citation = document.getElementById('bibtex');
const copyStatus = document.getElementById('copy-status');

if (copyButton && citation && copyStatus) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(citation.textContent.trim() + '\n');
      copyStatus.textContent = 'Citation copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citation);
      selection.removeAllRanges();
      selection.addRange(range);
      citation.closest('pre').focus();
      copyStatus.textContent = 'Citation selected. Press Ctrl+C (or Command+C) to copy.';
    }
  });
}
