import { useEffect, useRef } from 'react';

const useTruncateText = (text, maxHeight) => {
  const textRef = useRef(null);

  useEffect(() => {
    const truncateText = () => {
      const element = textRef.current;

      if (!element) return;

      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight, 10);
      const maxLines = Math.floor(maxHeight / lineHeight);

      let originalText = text;
      element.textContent = originalText;

      while (element.scrollHeight > maxHeight && originalText) {
        originalText = originalText.split(' ').slice(0, -1).join(' ');
        element.textContent = originalText + ' ...';
      }
    };

    truncateText();

    window.addEventListener('resize', truncateText);
    return () => window.removeEventListener('resize', truncateText);
  }, [text, maxHeight]);

  return textRef;
};

export default useTruncateText;
