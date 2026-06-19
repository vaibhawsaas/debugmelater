'use client';

import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn('accordion', className)}>
      {items.map((item, i) => (
        <div key={i} className={`accordion__item ${openIndex === i ? 'accordion__item--open' : ''}`}>
          <button
            className="accordion__trigger"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            id={`accordion-trigger-${i}`}
            aria-controls={`accordion-content-${i}`}
          >
            <span>{item.question}</span>
            <ChevronDown
              size={18}
              className="accordion__icon"
              style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          <div
            id={`accordion-content-${i}`}
            role="region"
            aria-labelledby={`accordion-trigger-${i}`}
            className="accordion__content"
            style={{
              maxHeight: openIndex === i ? '400px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <p className="accordion__answer">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
