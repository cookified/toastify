import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CodeBlockProps = {
  code: string;
  filename?: string;
};

function highlightCode(code: string) {
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    // Check for comment line
    if (line.trim().startsWith("//")) {
      return (
        <span key={lineIndex} className="text-neutral-500 italic">
          {line}
          {"\n"}
        </span>
      );
    }

    // Tokenize line with regex capturing strings, comments, keywords, functions, keys
    const tokenRegex =
      /(\/\/.*$)|(".*?"|'.*?'|`.*?`)|(\b(?:import|export|from|const|let|var|function|return|new|type|default|as|typeof|async|await)\b)|(\b(?:toast|Toaster|promise|custom|dismiss|setTimeout|console)\b)|(\b(?:description|action|cancel|label|onClick|position|animation|duration|loading|error|success|springConfig|visibleToasts|theme|stiffness|damping|className|style)\b(?=:))|(<[A-Za-z0-9_]+|<\/[A-Za-z0-9_]+|\/>|>)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span
            key={`${lineIndex}-text-${lastIndex}`}
            className="text-neutral-300 dark:text-neutral-300"
          >
            {line.substring(lastIndex, match.index)}
          </span>,
        );
      }

      const [, comment, str, keyword, fn, key, tag] = match;

      if (comment) {
        parts.push(
          <span
            key={`${lineIndex}-comm-${match.index}`}
            className="text-neutral-500 italic"
          >
            {comment}
          </span>,
        );
      } else if (str) {
        parts.push(
          <span
            key={`${lineIndex}-str-${match.index}`}
            className="text-emerald-400 font-mono"
          >
            {str}
          </span>,
        );
      } else if (keyword) {
        parts.push(
          <span
            key={`${lineIndex}-kw-${match.index}`}
            className="text-purple-400 font-medium"
          >
            {keyword}
          </span>,
        );
      } else if (fn) {
        parts.push(
          <span
            key={`${lineIndex}-fn-${match.index}`}
            className="text-sky-400 font-medium"
          >
            {fn}
          </span>,
        );
      } else if (key) {
        parts.push(
          <span
            key={`${lineIndex}-key-${match.index}`}
            className="text-amber-300"
          >
            {key}
          </span>,
        );
      } else if (tag) {
        parts.push(
          <span
            key={`${lineIndex}-tag-${match.index}`}
            className="text-rose-400 font-medium"
          >
            {tag}
          </span>,
        );
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(
        <span
          key={`${lineIndex}-rest-${lastIndex}`}
          className="text-neutral-300 dark:text-neutral-300"
        >
          {line.substring(lastIndex)}
        </span>,
      );
    }

    return (
      <span key={lineIndex}>
        {parts}
        {"\n"}
      </span>
    );
  });
}

export function CodeBlock({ code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-[#0d0d0f] shadow-md dark:border-neutral-800">
      {filename && (
        <div className="flex items-center justify-between border-b border-neutral-800/80 bg-[#121215] px-4 py-2 text-[11px] font-mono text-neutral-400">
          <span>{filename}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex cursor-pointer items-center gap-1 text-neutral-400 transition-colors hover:text-white"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400 font-mono">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto selection:bg-neutral-800">
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}
