"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CursorEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  // Click ripple
  const onClick = useCallback((e: MouseEvent) => {
    const id = ++idRef.current;
    const scrollContainer = document.getElementById("scroll-container");
    const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY + scrollTop }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [onClick]);

  return (
    <>
      {/* Click ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: r.x,
            top: r.y - (document.getElementById("scroll-container")?.scrollTop || 0),
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: 0,
              height: 0,
              border: "1px solid rgba(99,102,241,0.4)",
              animation: "cursorRipple 0.7s ease-out forwards",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 4,
              height: 4,
              background: "rgba(99,102,241,0.6)",
              animation: "cursorDot 0.4s ease-out forwards",
            }}
          />
        </div>
      ))}

      <style jsx global>{`
        @keyframes cursorRipple {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 80px; height: 80px; opacity: 0; margin: -40px 0 0 -40px; }
        }
        @keyframes cursorDot {
          0% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
      `}</style>
    </>
  );
}
