import { useEffect, useState } from 'react';
import { debugModules } from '@/lib/content';

const TestPage = () => {
  const [debugInfo, setDebugInfo] = useState<{guideKeys: string[], guideCount: number} | null>(null);

  useEffect(() => {
    const info = debugModules();
    setDebugInfo(info);
    console.log('Test page debug info:', info);
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Content Loading Test</h1>
        
        <div className="bg-muted p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Debug Information:</h2>
          <pre className="text-sm">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
