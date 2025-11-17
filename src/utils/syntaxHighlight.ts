// Simple syntax highlighting for TypeScript/TSX code
export const highlightCode = (code: string): string => {
  // This returns HTML string with syntax highlighting
  const highlighted = code;

  return highlighted;
};

// Extract syntax tokens for rendering
export interface CodeToken {
  type: 'keyword' | 'string' | 'comment' | 'function' | 'component' | 'prop' | 'default';
  content: string;
}

export const tokenizeCode = (line: string): CodeToken[] => {
  const tokens: CodeToken[] = [];
  
  // Simple regex-based tokenization
  const patterns = [
    { type: 'comment' as const, regex: /\/\/.*$|\/\*[\s\S]*?\*\// },
    { type: 'string' as const, regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/ },
    { type: 'keyword' as const, regex: /\b(import|export|default|const|let|var|function|return|if|else|for|while|from|as|class|interface|type|extends)\b/ },
    { type: 'component' as const, regex: /\b[A-Z][a-zA-Z0-9]*\b/ },
    { type: 'function' as const, regex: /\b[a-z][a-zA-Z0-9]*(?=\()/ },
  ];

  let remaining = line;
  let position = 0;

  while (remaining.length > 0 && position < 1000) { // Safety limit
    position++;
    let matched = false;

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex);
      if (match && match.index === 0) {
        if (match.index > 0) {
          tokens.push({ type: 'default', content: remaining.slice(0, match.index) });
        }
        tokens.push({ type: pattern.type, content: match[0] });
        remaining = remaining.slice(match.index + match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Take one character as default
      tokens.push({ type: 'default', content: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
};

export const getTokenColor = (type: CodeToken['type']): string => {
  const colors = {
    keyword: 'text-purple-400',
    string: 'text-green-400',
    comment: 'text-gray-500',
    function: 'text-blue-400',
    component: 'text-yellow-400',
    prop: 'text-cyan-400',
    default: 'text-gray-300'
  };
  return colors[type];
};
