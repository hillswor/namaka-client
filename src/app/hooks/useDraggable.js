import { useState, useCallback, useRef } from "react";

export default function useDraggable() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  let dragOffset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((event) => {
    if (dragRef.current) {
      dragOffset.current.x =
        event.clientX - dragRef.current.getBoundingClientRect().left;
      dragOffset.current.y =
        event.clientY - dragRef.current.getBoundingClientRect().top;

      const onMouseMove = (event) => {
        setPosition({
          x: event.clientX - dragOffset.current.x,
          y: event.clientY - dragOffset.current.y,
        });
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  }, []);

  return { position, onMouseDown, dragRef };
}
