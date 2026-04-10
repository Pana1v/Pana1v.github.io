import { useState } from 'react';
import { Terminal, Copy, Check, Save } from 'lucide-react';
import { DATA } from '../data';

export function DevMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jsonContent, setJsonContent] = useState(JSON.stringify(DATA, null, 2));

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(var(--primary-rgb),0.3)] transition-transform hover:scale-110 active:scale-95"
        title="Open Dev Mode"
      >
        <Terminal className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="flex h-full max-h-[80vh] w-full max-w-4xl flex-col overflow-hidden border-2 border-primary bg-card shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),0.2)]">
        <div className="flex items-center justify-between border-b-2 border-primary bg-muted/50 px-6 py-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest">
            <Terminal className="h-4 w-4 text-primary" />
            DEV_MODE_EDITOR // ROOT_ACCESS
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            [Terminate_Session]
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden p-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            // Edit portfolio data. Copy JSON and update src/data.ts.
          </p>
          <textarea
            value={jsonContent}
            onChange={(e) => setJsonContent(e.target.value)}
            className="h-full w-full border-2 border-border bg-background p-4 font-mono text-xs focus:outline-none focus:border-primary"
            spellCheck={false}
          />
        </div>

        <div className="flex items-center justify-end gap-4 border-t-2 border-primary bg-muted/50 px-6 py-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 border-2 border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy_JSON'}
          </button>
        </div>
      </div>
    </div>
  );
}
