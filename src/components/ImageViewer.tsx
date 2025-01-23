'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ImageViewerProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ImageViewer({ src, alt = 'Image', className }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`w-full rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity ${className}`}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center z-50 mt-0-important"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white z-10"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <div className="w-full h-full flex items-center justify-center mt-0-important">
            <img
              src={src}
              alt={alt}
              className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain cursor-zoom-out select-none"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
} 