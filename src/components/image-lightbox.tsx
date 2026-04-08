"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  images?: string[];
  index?: number;
}

export function ImageLightbox({ src, alt, className, images, index = 0 }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const hasMultiple = images && images.length > 1;
  const currentSrc = hasMultiple ? images[currentIndex] : src;

  const openLightbox = () => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultiple) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultiple) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !hasMultiple) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasMultiple, images]);

  return (
    <>
      <div 
        className={className || "group relative mb-8 aspect-[2/1] w-full cursor-pointer overflow-hidden rounded-[20px] transition-transform"}
        onClick={openLightbox}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
           <span className="scale-90 opacity-0 transition-all duration-300 drop-shadow-lg group-hover:scale-100 group-hover:opacity-100">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3H21V9"/><path d="M9 21H3V15"/><path d="M21 3L14 10"/><path d="M3 21L10 14"/></svg>
           </span>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          {hasMultiple && (
            <button 
              className="absolute left-4 top-1/2 z-[101] -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition-colors hover:bg-white/20 sm:left-8"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          )}

          <div 
            className="relative h-[70vh] w-[80vw] max-w-5xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentSrc}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {hasMultiple && (
            <button 
              className="absolute right-4 top-1/2 z-[101] -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition-colors hover:bg-white/20 sm:right-8"
              onClick={handleNext}
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}

          <button 
            className="absolute right-6 top-6 z-[101] rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            onClick={() => setIsOpen(false)}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6L18 18"/></svg>
          </button>
          
          {hasMultiple && (
            <div className="absolute bottom-6 left-1/2 z-[101] -translate-x-1/2 text-sm font-medium tracking-wide text-white/70">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
