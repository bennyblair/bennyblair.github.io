/**
 * Performance optimization utilities for article content
 */

/**
 * Lazy load images in article content
 */
export function enableLazyLoading(element: HTMLElement) {
  const images = element.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('fade-in-up');
            observer.unobserve(img);
          }
        }
      });
    });

    images.forEach(img => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }
}

/**
 * Add smooth scrolling behavior to anchor links
 */
export function enhanceSmoothScrolling(element: HTMLElement) {
  const anchorLinks = element.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = (link as HTMLAnchorElement).getAttribute('href')?.slice(1);
      
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/**
 * Add copy-to-clipboard functionality for code blocks
 */
export function enhanceCodeBlocks(element: HTMLElement) {
  const codeBlocks = element.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    if (pre) {
      const copyButton = document.createElement('button');
      copyButton.className = 'absolute top-2 right-2 px-2 py-1 text-xs bg-muted hover:bg-muted-foreground text-muted-foreground hover:text-muted rounded transition-colors';
      copyButton.textContent = 'Copy';
      copyButton.onclick = async () => {
        try {
          await navigator.clipboard.writeText(block.textContent || '');
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      };
      
      pre.style.position = 'relative';
      pre.appendChild(copyButton);
    }
  });
}

/**
 * Add table of contents functionality
 */
export function generateTableOfContents(element: HTMLElement): HTMLElement | null {
  const headings = element.querySelectorAll('h2, h3, h4');
  
  if (headings.length < 3) {
    return null; // Don't create TOC for short articles
  }

  const toc = document.createElement('div');
  toc.className = 'table-of-contents bg-muted/20 p-6 rounded-lg mb-8 border border-border/20';
  
  const tocTitle = document.createElement('h3');
  tocTitle.className = 'text-lg font-semibold mb-4 text-foreground';
  tocTitle.textContent = 'Table of Contents';
  toc.appendChild(tocTitle);
  
  const tocList = document.createElement('ul');
  tocList.className = 'space-y-2';
  
  headings.forEach((heading, index) => {
    // Generate ID if it doesn't exist
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.className = `
      block py-1 px-2 rounded text-sm text-muted-foreground hover:text-primary hover:bg-muted/40 transition-colors
      ${heading.tagName === 'H2' ? 'font-medium' : ''}
      ${heading.tagName === 'H3' ? 'ml-4' : ''}
      ${heading.tagName === 'H4' ? 'ml-8' : ''}
    `.trim();
    
    // Add smooth scrolling
    link.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
    
    listItem.appendChild(link);
    tocList.appendChild(listItem);
  });
  
  toc.appendChild(tocList);
  return toc;
}

/**
 * Add reading progress indicator
 */
export function addReadingProgress(): void {
  const progressBar = document.createElement('div');
  progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-muted z-50';
  
  const progressFill = document.createElement('div');
  progressFill.className = 'h-full bg-gradient-to-r from-primary to-accent transition-all duration-150';
  progressBar.appendChild(progressFill);
  
  document.body.prepend(progressBar);
  
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    
    progressFill.style.width = `${Math.min(scrollPercent, 100)}%`;
  };
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress(); // Initialize
}

/**
 * Enhance article accessibility
 */
export function enhanceAccessibility(element: HTMLElement): void {
  // Add alt text to images that don't have it
  const images = element.querySelectorAll('img:not([alt])');
  images.forEach(img => {
    (img as HTMLImageElement).alt = 'Article image';
  });
  
  // Add proper ARIA labels to tables
  const tables = element.querySelectorAll('table');
  tables.forEach((table, index) => {
    if (!table.getAttribute('aria-label')) {
      table.setAttribute('aria-label', `Data table ${index + 1}`);
    }
  });
  
  // Add skip links for long articles
  const headings = element.querySelectorAll('h2');
  if (headings.length > 5) {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'sr-only focus-within:not-sr-only bg-primary text-primary-foreground p-2 rounded mb-4';
    skipLinks.innerHTML = '<a href="#article-end" class="underline">Skip to end of article</a>';
    element.prepend(skipLinks);
    
    // Add anchor at the end
    const endAnchor = document.createElement('div');
    endAnchor.id = 'article-end';
    element.appendChild(endAnchor);
  }
}

/**
 * Initialize all article enhancements
 */
export function initializeArticleEnhancements(element: HTMLElement): void {
  enableLazyLoading(element);
  enhanceSmoothScrolling(element);
  enhanceCodeBlocks(element);
  enhanceAccessibility(element);
  
  // Add table of contents if applicable
  const toc = generateTableOfContents(element);
  if (toc) {
    const firstHeading = element.querySelector('h1, h2');
    if (firstHeading) {
      firstHeading.parentNode?.insertBefore(toc, firstHeading.nextSibling);
    }
  }
  
  // Add reading progress for long articles
  const wordCount = element.textContent?.split(/\s+/).length || 0;
  if (wordCount > 1000) {
    addReadingProgress();
  }
}
