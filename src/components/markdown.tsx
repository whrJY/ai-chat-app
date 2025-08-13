import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  content: string;
  role?: string;
}


//创建一个markdown组件
const Markdown : React.FC<MarkdownProps> = ({content,role}) => {

    return(
        <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        // 自定义组件样式以适应聊天框
        h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
        h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
        h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
        code: ({children}) => (
          <code className={`px-1 py-0.5 rounded text-xs ${
            role === 'user' 
              ? 'bg-blue-400 text-blue-50' 
              : 'bg-gray-200 text-gray-800'
          }`}>
            {children}
          </code>
        ),
        pre: ({children}) => (
          <pre className={`p-2 rounded text-xs overflow-x-auto ${
            role === 'user' 
              ? 'bg-blue-400 text-blue-50' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {children}
          </pre>
        ),
        ul: ({children}) => <ul className="list-disc list-inside mb-2">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
        li: ({children}) => <li className="mb-1">{children}</li>,
        blockquote: ({children}) => (
          <blockquote className={`border-l-2 pl-2 italic ${
            role === 'user' 
              ? 'border-blue-300' 
              : 'border-gray-300'
          }`}>
            {children}
          </blockquote>
        ),
        a: ({children, href}) => (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`underline ${
              role === 'user' 
                ? 'text-blue-100 hover:text-white' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            {children}
          </a>
        )
      }}
    >
      {content}
    </ReactMarkdown>)
    
}
export default Markdown;
