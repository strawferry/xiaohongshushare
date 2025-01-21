'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageViewer({ src, alt, className = '' }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src={src} 
        alt={alt}
        width={800}
        height={600}
        loading="lazy"
        className={`cursor-pointer ${className}`}
        onClick={() => setIsOpen(true)}
      />
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={24} />
          </button>
          <Image 
            src={src} 
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            width={800}
            height={600}
            loading="lazy"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
} 