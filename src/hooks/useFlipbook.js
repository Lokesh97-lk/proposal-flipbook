import { useState, useCallback } from 'react';

/**
 * useFlipbook hook
 * Manages active page index, transitions, and boundary checks.
 */
export function useFlipbook(totalPages = 6, onFinish = null) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' | 'prev'

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const nextPage = useCallback(() => {
    if (isFlipping) return;
    if (currentPage < totalPages) {
      setIsFlipping(true);
      setFlipDirection('next');
      setCurrentPage((prev) => prev + 1);
    } else if (currentPage === totalPages && onFinish) {
      onFinish();
    }
  }, [currentPage, totalPages, isFlipping, onFinish]);

  const prevPage = useCallback(() => {
    if (isFlipping) return;
    if (currentPage > 1) {
      setIsFlipping(true);
      setFlipDirection('prev');
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage, isFlipping]);

  const goToPage = useCallback((pageNum) => {
    if (isFlipping || pageNum < 1 || pageNum > totalPages) return;
    setFlipDirection(pageNum > currentPage ? 'next' : 'prev');
    setIsFlipping(true);
    setCurrentPage(pageNum);
  }, [currentPage, totalPages, isFlipping]);

  const onFlipComplete = useCallback(() => {
    setIsFlipping(false);
  }, []);

  const resetFlipbook = useCallback(() => {
    setCurrentPage(1);
    setIsFlipping(false);
  }, []);

  return {
    currentPage,
    totalPages,
    canGoNext,
    canGoPrev,
    isFlipping,
    flipDirection,
    nextPage,
    prevPage,
    goToPage,
    onFlipComplete,
    resetFlipbook
  };
}

export default useFlipbook;
