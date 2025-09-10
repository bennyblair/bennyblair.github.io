// Simple markdown to HTML converter
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-foreground mb-3 mt-8">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-foreground mb-4 mt-8">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-foreground mb-6 mt-8">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary-dark underline">$1</a>');

  // Unordered lists
  html = html.replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>');
  html = html.replace(/(<li class="mb-2">.*<\/li>)/s, '<ul class="list-disc pl-6 text-muted-foreground mb-6 space-y-2">$1</ul>');

  // Ordered lists  
  html = html.replace(/^\d+\. (.*$)/gm, '<li class="mb-2">$1</li>');

  // Paragraphs (convert double line breaks to paragraphs)
  const paragraphs = html.split('\n\n');
  html = paragraphs
    .map(paragraph => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      
      // Skip if already wrapped in HTML tags
      if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
        return trimmed;
      }
      
      // Skip headers
      if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) {
        return trimmed;
      }
      
      return `<p class="text-muted-foreground mb-6">${trimmed}</p>`;
    })
    .join('\n\n');

  // Code blocks (basic support)
  html = html.replace(/```([^`]*?)```/gs, '<pre class="bg-muted p-4 rounded-lg mb-6 overflow-x-auto"><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>');

  // Tables (basic support)
  const lines = html.split('\n');
  let inTable = false;
  let tableRows: string[] = [];
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.includes('|') && !line.startsWith('<')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      
      // Skip separator rows
      if (line.match(/^[|\-\s:]+$/)) {
        continue;
      }
      
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
      const isHeader = tableRows.length === 0;
      const tag = isHeader ? 'th' : 'td';
      const className = isHeader 
        ? 'px-4 py-2 text-left font-semibold bg-muted border-b' 
        : 'px-4 py-2 text-muted-foreground border-b';
      
      const row = `<tr>${cells.map(cell => `<${tag} class="${className}">${cell}</${tag}>`).join('')}</tr>`;
      tableRows.push(row);
    } else {
      if (inTable) {
        // End of table
        const table = `<table class="w-full mb-6 border-collapse border border-border rounded-lg overflow-hidden">${tableRows.join('')}</table>`;
        processedLines.push(table);
        tableRows = [];
        inTable = false;
      }
      processedLines.push(line);
    }
  }
  
  // Handle table at end of content
  if (inTable) {
    const table = `<table class="w-full mb-6 border-collapse border border-border rounded-lg overflow-hidden">${tableRows.join('')}</table>`;
    processedLines.push(table);
  }

  return processedLines.join('\n');
}
