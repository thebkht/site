'use client';
import { useEffect, useRef } from 'react';

const Mouse = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursor2Ref = useRef<HTMLDivElement>(null);
  const cursor3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { pageX, pageY } = e;
      [cursorRef.current, cursor2Ref.current, cursor3Ref.current].forEach(
        (cursor) => {
          if (cursor) {
            cursor.style.left = `${pageX}px`;
            cursor.style.top = `${pageY}px`;
          }
        }
      );
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      {/* Cursor Elements */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor2" ref={cursor2Ref}></div>
      <div className="cursor3" ref={cursor3Ref}></div>
    </div>
  );
};

export default Mouse;
