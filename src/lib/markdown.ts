// Enhanced markdown to HTML converter with improved formatting and readability
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Step 1: Clean up and normalize content
  html = cleanupContent(html);

  // Step 2: Convert markdown elements
  html = convertMarkdownElements(html);

  // Step 3: Enhance HTML elements with better styling
  html = enhanceHtmlElements(html);

  // Step 4: Post-process for final cleanup and formatting
  html = postProcessContent(html);

  return html;
}

/**
 * Clean up and normalize the content
 */
function cleanupContent(content: string): string {
  let cleaned = content;

  // Remove excessive repetition (common in AI-generated content)
  cleaned = removeDuplicateParagraphs(cleaned);

  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, ' ');
  cleaned = cleaned.replace(/\n\s+/g, '\n');

  // Fix common formatting issues
  cleaned = cleaned.replace(/([.!?])\s*([A-Z])/g, '$1 $2'); // Ensure proper spacing after sentences
  cleaned = cleaned.replace(/(\w)–(\w)/g, '$1—$2'); // Use em dashes consistently

  return cleaned;
}

/**
 * Remove duplicate paragraphs that are common in AI-generated content
 */
function removeDuplicateParagraphs(content: string): string {
  const paragraphs = content.split(/\n\s*\n/);
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const paragraph of paragraphs) {
    const normalized = paragraph.trim().toLowerCase();
    
    // Skip if we've seen this exact paragraph before
    if (!seen.has(normalized) && normalized.length > 0) {
      seen.add(normalized);
      unique.push(paragraph);
    }
  }

  return unique.join('\n\n');
}

/**
 * Convert markdown elements to HTML
 */
function convertMarkdownElements(html: string): string {
  // Headers with improved spacing and typography
  html = html.replace(/^#### (.*$)/gm, '<h4 class="text-lg font-semibold text-foreground mb-3 mt-6 leading-tight">$1</h4>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-foreground mb-4 mt-8 leading-tight">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-foreground mb-5 mt-10 leading-tight border-b border-border/20 pb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-foreground mb-6 mt-8 leading-tight">$1</h1>');

  // Bold and italic with better contrast
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-foreground/90">$1</em>');

  // Links with better hover states
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">$1</a>');

  // Lists with better spacing
  html = html.replace(/^- (.*$)/gm, '<li class="mb-3 leading-relaxed">$1</li>');
  html = html.replace(/(<li class="mb-3 leading-relaxed">.*<\/li>)/s, '<ul class="list-disc pl-6 text-muted-foreground mb-8 space-y-1 marker:text-primary/60">$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gm, '<li class="mb-3 leading-relaxed">$1</li>');

  // Code blocks with syntax highlighting preparation
  html = html.replace(/```([^`]*?)```/gs, '<pre class="bg-muted/50 border border-border/20 p-6 rounded-lg mb-8 overflow-x-auto font-mono text-sm leading-relaxed"><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted/60 px-2 py-1 rounded text-sm font-mono border border-border/20">$1</code>');

  return html;
}

/**
 * Enhance existing HTML elements with better styling
 */
function enhanceHtmlElements(html: string): string {
  // Enhance existing HTML headers
  html = html.replace(/<h1([^>]*)>(.*?)<\/h1>/gi, '<h1 class="text-3xl font-bold text-foreground mb-6 mt-8 leading-tight">$2</h1>');
  html = html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, '<h2 class="text-2xl font-bold text-foreground mb-5 mt-10 leading-tight border-b border-border/20 pb-2">$2</h2>');
  html = html.replace(/<h3([^>]*)>(.*?)<\/h3>/gi, '<h3 class="text-xl font-bold text-foreground mb-4 mt-8 leading-tight">$2</h3>');
  html = html.replace(/<h4([^>]*)>(.*?)<\/h4>/gi, '<h4 class="text-lg font-semibold text-foreground mb-3 mt-6 leading-tight">$2</h4>');

  // Enhance existing paragraphs
  html = html.replace(/<p([^>]*)>(.*?)<\/p>/gi, '<p class="text-muted-foreground mb-6 leading-relaxed">$2</p>');

  // Enhance existing lists
  html = html.replace(/<ul([^>]*)>/gi, '<ul class="list-disc pl-6 text-muted-foreground mb-8 space-y-2 marker:text-primary/60">');
  html = html.replace(/<ol([^>]*)>/gi, '<ol class="list-decimal pl-6 text-muted-foreground mb-8 space-y-2 marker:text-primary/60">');
  html = html.replace(/<li([^>]*)>/gi, '<li class="leading-relaxed">');

  // Enhanced tables
  html = processTablesAdvanced(html);

  // Enhanced definition lists (for FAQs)
  html = html.replace(/<dl([^>]*)>/gi, '<dl class="space-y-6 mb-8">');
  html = html.replace(/<dt([^>]*)>/gi, '<dt class="font-semibold text-foreground text-lg mb-2">');
  html = html.replace(/<dd([^>]*)>/gi, '<dd class="text-muted-foreground leading-relaxed ml-0 pl-4 border-l-2 border-primary/20">');

  return html;
}

/**
 * Advanced table processing with improved styling
 */
function processTablesAdvanced(html: string): string {
  const lines = html.split('\n');
  let inTable = false;
  let tableRows: string[] = [];
  let tableHeaders: string[] = [];
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect table rows (both markdown and HTML)
    if ((line.includes('|') && !line.startsWith('<')) || line.includes('<tr>') || line.includes('<th>') || line.includes('<td>')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
        tableHeaders = [];
      }
      
      // Skip separator rows
      if (line.match(/^[|\-\s:]+$/)) {
        continue;
      }

      // Process markdown table rows
      if (line.includes('|') && !line.startsWith('<')) {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        const isHeader = tableRows.length === 0;
        
        if (isHeader) {
          tableHeaders = cells;
          const headerRow = `<tr class="border-b-2 border-primary/20 bg-muted/30">
            ${cells.map(cell => `<th class="px-6 py-4 text-left font-semibold text-foreground">${cell}</th>`).join('')}
          </tr>`;
          tableRows.push(headerRow);
        } else {
          const dataRow = `<tr class="border-b border-border/20 hover:bg-muted/20 transition-colors">
            ${cells.map((cell, index) => {
              const isFirstCol = index === 0;
              const className = isFirstCol 
                ? 'px-6 py-4 font-medium text-foreground' 
                : 'px-6 py-4 text-muted-foreground';
              return `<td class="${className}">${cell}</td>`;
            }).join('')}
          </tr>`;
          tableRows.push(dataRow);
        }
      }
      // Process existing HTML table elements
      else if (line.includes('<tr>') || line.includes('<th>') || line.includes('<td>')) {
        // Clean up existing table HTML and apply new styles
        let processedLine = line;
        processedLine = processedLine.replace(/<th([^>]*)>/gi, '<th class="px-6 py-4 text-left font-semibold text-foreground bg-muted/30 border-b-2 border-primary/20">');
        processedLine = processedLine.replace(/<td([^>]*)>/gi, '<td class="px-6 py-4 text-muted-foreground border-b border-border/20">');
        processedLine = processedLine.replace(/<tr([^>]*)>/gi, '<tr class="hover:bg-muted/20 transition-colors">');
        tableRows.push(processedLine);
      }
    } else {
      if (inTable && tableRows.length > 0) {
        // End of table - wrap with enhanced styling
        const table = `<div class="overflow-x-auto mb-8 rounded-lg border border-border/20 shadow-sm">
          <table class="w-full border-collapse">
            <tbody>
              ${tableRows.join('\n              ')}
            </tbody>
          </table>
        </div>`;
        processedLines.push(table);
        tableRows = [];
        inTable = false;
      }
      processedLines.push(line);
    }
  }
  
  // Handle table at end of content
  if (inTable && tableRows.length > 0) {
    const table = `<div class="overflow-x-auto mb-8 rounded-lg border border-border/20 shadow-sm">
      <table class="w-full border-collapse">
        <tbody>
          ${tableRows.join('\n          ')}
        </tbody>
      </table>
    </div>`;
    processedLines.push(table);
  }

  return processedLines.join('\n');
}

/**
 * Post-process content for final cleanup and formatting
 */
function postProcessContent(html: string): string {
  let processed = html;

  // Convert remaining plain text to paragraphs
  const paragraphs = processed.split(/\n\s*\n/);
  processed = paragraphs
    .map(paragraph => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      
      // Skip if already wrapped in HTML tags
      if (trimmed.startsWith('<') && trimmed.includes('>')) {
        return trimmed;
      }
      
      // Convert plain text to paragraph
      return `<p class="text-muted-foreground mb-6 leading-relaxed">${trimmed}</p>`;
    })
    .filter(p => p.length > 0)
    .join('\n\n');

  // Add reading flow improvements
  processed = addReadingFlowElements(processed);

  // Final cleanup
  processed = processed.replace(/\n{3,}/g, '\n\n'); // Remove excessive line breaks
  processed = processed.replace(/\s+/g, ' '); // Normalize spaces
  processed = processed.replace(/>\s+</g, '><'); // Remove spaces between tags

  return processed;
}

/**
 * Add elements that improve reading flow
 */
function addReadingFlowElements(html: string): string {
  let enhanced = html;

  // Add dividers between major sections
  enhanced = enhanced.replace(/(<\/h2>\s*<h2)/g, '$1');
  
  // Wrap FAQ sections with better styling
  if (enhanced.includes('<dt') && enhanced.includes('<dd')) {
    enhanced = enhanced.replace(/<dl class="space-y-6 mb-8">/g, 
      '<div class="bg-muted/20 rounded-lg p-6 mb-8"><dl class="space-y-6">');
    enhanced = enhanced.replace(/<\/dl>/g, '</dl></div>');
  }

  // Add subtle separators for better visual hierarchy
  enhanced = enhanced.replace(/(<h2[^>]*>.*?<\/h2>)/g, 
    '<div class="mt-12 mb-8">$1</div>');

  return enhanced;
}
