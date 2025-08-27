"use client"

import { useRef, useState, useEffect } from 'react';

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState('auto');

  // Measure heights for smooth transition
  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    // First child = collapsed, second = expanded
    const collapsed = node.children[0];
    const expanded = node.children[1];
    const next = isExpanded ? expanded : collapsed;
    setHeight(next.scrollHeight + 'px');
  }, [isExpanded, children]);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className="transition-[height] duration-200 ease-out overflow-hidden"
        style={{ height }}
      >
        {/* Collapsed (line-clamped) */}
        <div className={`${isExpanded ? 'hidden' : 'block'} text-primary-300`}> 
          <span className="line-clamp-3">{children}</span>
        </div>
        {/* Expanded (full text) */}
        <div className={`${isExpanded ? 'block' : 'hidden'} text-primary-300`}>
          {children}
        </div>
      </div>

      <button
        className='mt-2 inline-block text-primary-700 border-b border-primary-700 leading-3 pb-1'
        onClick={() => setIsExpanded((v) => !v)}
        type="button"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
}

export default TextExpander;
