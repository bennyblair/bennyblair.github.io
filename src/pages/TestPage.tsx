import { useEffect, useState } from 'react';
import { debugModules, getPrecompiledArticleBySlug } from '@/lib/content';
import { debugPrecompiledContent } from '@/lib/precompiled-content';

const TestPage = () => {
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null);
  const [articleTest, setArticleTest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log('TestPage: Starting debug...');
      
      // Test 1: Debug modules
      const moduleDebug = debugModules();
      console.log('Module debug:', moduleDebug);
      
      // Test 2: Debug precompiled content
      const precompiledDebug = debugPrecompiledContent();
      console.log('Precompiled debug:', precompiledDebug);
      
      // Test 3: Try to load a specific article
      const testArticle = getPrecompiledArticleBySlug('guides', 'bridging-loan');
      console.log('Test article:', testArticle);
      
      setDebugInfo({
        modules: moduleDebug,
        precompiled: precompiledDebug,
        articleExists: !!testArticle,
        articleTitle: testArticle?.title || 'Not found'
      });
      
      setArticleTest(testArticle);
      
    } catch (err) {
      console.error('TestPage error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Content Loading Test</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <div className="bg-muted p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Debug Information:</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
        
        {articleTest && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <h3 className="font-semibold">Article Test Result:</h3>
            <p><strong>Title:</strong> {articleTest.title}</p>
            <p><strong>Content Length:</strong> {articleTest.content?.length || 0} characters</p>
            <p><strong>Content Preview:</strong> {articleTest.content?.substring(0, 100)}...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
