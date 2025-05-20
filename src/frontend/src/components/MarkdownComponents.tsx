import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Common class names
const textWhite = 'text-white';
const my2 = 'my-2';
const my3 = 'my-3';
const my4 = 'my-4';
const textBlue = 'text-blue-400';
const textBlueDark = 'border-blue-500';
const listInside = 'list-inside';
const listDisc = 'list-disc';
const listDecimal = 'list-decimal';
const tableStyle = 'min-w-full bg-black/20 border-collapse text-sm';
const thStyle = 'px-4 py-2 border-b border-gray-600 text-left text-white font-semibold';
const tdStyle = 'px-4 py-2 border-b border-gray-600 text-white';

// Shared Props Type
type ChildrenProps = { children?: React.ReactNode };

export const MarkdownComponents = {
  h1: ({ children }: ChildrenProps) => (
    <h1 className={`text-2xl font-bold ${textWhite} ${my4}`}>{children}</h1>
  ),
  h2: ({ children }: ChildrenProps) => (
    <h2 className={`text-xl font-semibold ${textWhite} ${my3}`}>{children}</h2>
  ),
  h3: ({ children }: ChildrenProps) => (
    <h3 className={`text-lg font-medium ${textWhite} ${my2}`}>{children}</h3>
  ),
  p: ({ children }: ChildrenProps) => (
    <p className={`${textWhite} ${my2} leading-relaxed`}>{children}</p>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className={`${textBlue} underline`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }: ChildrenProps) => (
    <ul className={`${listDisc} ${listInside} ${textWhite} ${my2}`}>{children}</ul>
  ),
  ol: ({ children }: ChildrenProps) => (
    <ol className={`${listDecimal} ${listInside} ${textWhite} ${my2}`}>{children}</ol>
  ),
  li: ({ children }: ChildrenProps) => (
    <li className={`ml-4 ${textWhite}`}>{children}</li>
  ),
  code: ({ inline, className, children }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">
        {String(children).trim()}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-gray-800 text-white px-1 py-0.5 rounded">{children}</code>
    );
  },
  blockquote: ({ children }: ChildrenProps) => (
    <blockquote className={`border-l-4 ${textBlueDark} pl-4 italic ${textWhite}`}>
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-gray-600 my-4" />,
  table: ({ children }: ChildrenProps) => (
    <table className={tableStyle}>
      {children}
    </table>
  ),
  th: ({ children }: ChildrenProps) => (
    <th className={thStyle}>{children}</th>
  ),
  td: ({ children }: ChildrenProps) => (
    <td className={tdStyle}>{children}</td>
  ),
};
