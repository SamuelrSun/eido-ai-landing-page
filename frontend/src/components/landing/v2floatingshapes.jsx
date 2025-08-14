import React, { useRef, useEffect } from 'react';
const FloatingShapes = () => {
  const canvasRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let shapes = [];

    // --- MOUSE TRACKING ---
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- SHAPE INITIALIZATION & RESIZE LOGIC ---
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      mousePosRef.current = { x: canvas.width / 2, y: canvas.height / 2 };

      const shapeSize = 220;
      const numShapes = 10;
      const shapeTypes = ['square', 'triangle', 'circle'];
      
      const newShapes = [];
      const minDistance = shapeSize;
      const maxAttempts = 100;
      for (let i = 0; i < numShapes; i++) {
        let newShape;
        let positionFound = false;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const potentialX = shapeSize / 2 + Math.random() * (canvas.width - shapeSize);
          const potentialY = shapeSize / 2 + Math.random() * (canvas.height - shapeSize);
          let isOverlapping = false;
          for (const existingShape of newShapes) {
            const dx = existingShape.x - potentialX;
            const dy = existingShape.y - potentialY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
              isOverlapping = true;
              break;
            }
          }

          if (!isOverlapping) {
            newShape = {
              type: shapeTypes[i % shapeTypes.length],
              size: shapeSize,
              rotation: Math.random() * Math.PI * 2,
              vRotation: (Math.random() - 0.5) * 0.002,
              x: potentialX,
              y: potentialY,
              vx: (Math.random() - 0.5) * 0.6,
              vy: (Math.random() - 0.5) * 0.6,
              mass: 1,
            };
            positionFound = true;
            break;
          }
        }

        if (!positionFound) {
          newShape = {
            type: shapeTypes[i % shapeTypes.length],
            size: shapeSize,
            rotation: Math.random() * Math.PI * 2,
            vRotation: (Math.random() - 0.5) * 0.002,
            x: shapeSize / 2 + Math.random() * (canvas.width - shapeSize),
            y: shapeSize / 2 + Math.random() * (canvas.height - shapeSize),
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            mass: 1,
          };
        }
        newShapes.push(newShape);
      }
      shapes = newShapes;
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    handleResize();
    // --- ANIMATION LOOP ---
    const update = () => {
      if (canvas.width > 0 && shapes.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const lightSource = mousePosRef.current;

        shapes.forEach((shape, i) => {
          // Update shape position and rotation
          shape.x += shape.vx;
          shape.y += shape.vy;
          shape.rotation += shape.vRotation;

          // Wall collision
          const radius = shape.size / 2;
          if (shape.x + radius > canvas.width || shape.x - radius < 0) {
            shape.vx *= -1;
          }
          if (shape.y + radius > canvas.height || shape.y - radius < 0) {
            shape.vy *= -1;
          }

          // Shape-to-shape collision
          for (let j = i + 1; j < shapes.length; j++) {
              const otherShape = shapes[j];
              const dx = otherShape.x - shape.x;
              const dy = otherShape.y - shape.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = (shape.size / 2) + (otherShape.size / 2);

              if (distance < minDistance) {
                  const angle = Math.atan2(dy, dx);
                  const sin = Math.sin(angle);
                  const cos = Math.cos(angle);
                  const pos0 = { x: 0, y: 0 };
                  const pos1 = { x: (otherShape.x - shape.x) * cos + (otherShape.y - shape.y) * sin, y: (otherShape.y - shape.y) * cos - (otherShape.x - shape.x) * sin };
                  const vel0 = { x: shape.vx * cos + shape.vy * sin, y: shape.vy * cos - shape.vx * sin };
                  const vel1 = { x: otherShape.vx * cos + otherShape.vy * sin, y: otherShape.vy * cos - otherShape.vx * sin };
                  const vxTotal = vel0.x - vel1.x;
                  vel0.x = ((shape.mass - otherShape.mass) * vel0.x + 2 * otherShape.mass * vel1.x) / (shape.mass + otherShape.mass);
                  vel1.x = vxTotal + vel0.x;
                  const absV = Math.abs(vel0.x) + Math.abs(vel1.x);
                  const overlap = minDistance - Math.abs(pos0.x - pos1.x);
                  pos0.x += vel0.x / absV * overlap;
                  pos1.x += vel1.x / absV * overlap;
                  const pos0F = { x: pos0.x * cos - pos0.y * sin, y: pos0.y * cos + pos0.x * sin };
                  const pos1F = { x: pos1.x * cos - pos1.y * sin, y: pos1.y * cos + pos1.x * sin };
                  otherShape.x = shape.x + pos1F.x;
                  otherShape.y = shape.y + pos1F.y;
                  shape.x = shape.x + pos0F.x;
                  shape.y = shape.y + pos0F.y;
                  shape.vx = vel0.x * cos - vel0.y * sin;
                  shape.vy = vel0.y * cos + vel0.x * sin;
                  otherShape.vx = vel1.x * cos - vel1.y * sin;
                  otherShape.vy = vel1.y * cos + vel1.x * sin;
              }
          }

          ctx.save();
          ctx.translate(shape.x, shape.y);
          ctx.rotate(shape.rotation);

          // Dynamic lighting
          const lightVector = { x: lightSource.x - shape.x, y: lightSource.y - shape.y };
          const lightDistance = Math.sqrt(lightVector.x * lightVector.x + lightVector.y * lightVector.y);
          const lightNormal = { x: lightVector.x / lightDistance, y: lightVector.y / lightDistance };
          const lightRadius = 500;
          const intensity = Math.max(0, 1 - lightDistance / lightRadius);

          // Shadow effect
          ctx.shadowColor = `rgba(0, 0, 0, ${0.4 * intensity})`;
          ctx.shadowBlur = 25 * intensity;
          ctx.shadowOffsetX = -lightNormal.x * 10 * intensity;
          ctx.shadowOffsetY = -lightNormal.y * 10 * intensity;
          // --- 🎨 FINAL: Layered Border Drawing Logic ---
          const size = shape.size / 2;
          const outerBorderWidth = 26;
          const innerBorderWidth = 22;
          
          const createShapePath = () => {
            ctx.beginPath();
            if (shape.type === 'square') {
              ctx.rect(-size, -size, shape.size, shape.size);
            } else if (shape.type === 'circle') {
              ctx.arc(0, 0, size, 0, Math.PI * 2);
            } else if (shape.type === 'triangle') {
              ctx.moveTo(0, -size);
              ctx.lineTo(size, size);
              ctx.lineTo(-size, size);
              ctx.closePath();
            }
          };
          // Layer 1: Draw a solid black base for the entire border.
          ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
          ctx.lineWidth = outerBorderWidth;
          createShapePath();
          ctx.stroke();

          // Set composite operation to paint on top of the existing stroke.
          ctx.globalCompositeOperation = 'source-atop';
          // Layer 2: Paint the darker, outer shine over the entire base.
          // This gradient is now opaque, fading from medium to dark grey.
          const outerGradient = ctx.createLinearGradient(-size * lightNormal.x, -size * lightNormal.y, size * lightNormal.x, size * lightNormal.y);
          outerGradient.addColorStop(0, `rgba(120, 120, 120, ${0.7 * intensity})`);
          outerGradient.addColorStop(1, `rgba(40, 40, 40, ${0.7 * intensity})`);
          
          ctx.strokeStyle = outerGradient;
          ctx.lineWidth = outerBorderWidth;
          createShapePath();
          ctx.stroke();
          // Layer 3: Paint the brighter, inner shine on top of the outer shine.
          // This gradient is also opaque, fading from white to light grey.
          const innerGradient = ctx.createLinearGradient(-size * lightNormal.x, -size * lightNormal.y, size * lightNormal.x, size * lightNormal.y);
          innerGradient.addColorStop(0, `rgba(255, 255, 255, ${0.5 * intensity})`);
          innerGradient.addColorStop(1, `rgba(180, 180, 180, ${0.5 * intensity})`);

          ctx.strokeStyle = innerGradient;
          ctx.lineWidth = innerBorderWidth;
          createShapePath();
          ctx.stroke();
          
          ctx.restore();
        });
      }

      animationFrameId = window.requestAnimationFrame(update);
    };

    update();
    // --- CLEANUP ---
    return () => {
      if (canvas.parentElement) {
        resizeObserver.unobserve(canvas.parentElement);
      }
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default FloatingShapes;