import React, { useRef, useEffect } from 'react';

const FloatingShapes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let shapes = []; 

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      const shapeSize = 220; 
      const numShapes = 7; 
      
      shapes = Array.from({ length: numShapes }).map((_, index) => {
        const shapeTypes = ['square', 'triangle', 'circle'];
        return {
          type: shapeTypes[index % shapeTypes.length],
          size: shapeSize,
          rotation: Math.random() * Math.PI * 2,
          vRotation: (Math.random() - 0.5) * 0.002,
          x: shapeSize / 2 + Math.random() * (canvas.width - shapeSize),
          y: shapeSize / 2 + Math.random() * (canvas.height - shapeSize),
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          mass: 1,
        }
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    handleResize();

    const update = () => {
      if (canvas.width > 0 && shapes.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Define the light source position (top right)
        const lightSource = { x: canvas.width, y: 0 };

        shapes.forEach((shape, i) => {
          shape.x += shape.vx;
          shape.y += shape.vy;
          shape.rotation += shape.vRotation;

          const radius = shape.size / 2;
          if (shape.x + radius > canvas.width || shape.x - radius < 0) {
            shape.vx *= -1;
          }
          if (shape.y + radius > canvas.height || shape.y - radius < 0) {
            shape.vy *= -1;
          }

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
          
          // --- DYNAMIC LIGHTING LOGIC ---
          const lightVector = { x: lightSource.x - shape.x, y: lightSource.y - shape.y };
          const lightDistance = Math.sqrt(lightVector.x * lightVector.x + lightVector.y * lightVector.y);
          const lightNormal = { x: lightVector.x / lightDistance, y: lightVector.y / lightDistance };
          
          const shadowOffsetX = -lightNormal.x * 15;
          const shadowOffsetY = -lightNormal.y * 15;
          
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 30;
          ctx.shadowOffsetX = shadowOffsetX;
          ctx.shadowOffsetY = shadowOffsetY;
          // --- END DYNAMIC LIGHTING LOGIC ---

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
          ctx.lineWidth = 22;
          const size = shape.size / 2;

          if (shape.type === 'square') {
            ctx.rect(-size, -size, shape.size, shape.size);
          } else if (shape.type === 'circle') {
            ctx.arc(0, 0, size, 0, Math.PI * 2);
          } else if (shape.type === 'triangle') {
            ctx.moveTo(-size, -size);
            ctx.lineTo(size, -size);
            ctx.lineTo(-size, size);
            ctx.closePath();
          }
          ctx.stroke();

          // --- DYNAMIC SHINE EFFECT ---
          ctx.globalCompositeOperation = 'source-atop';
          const gradient = ctx.createLinearGradient(
            -size * lightNormal.x, -size * lightNormal.y, 
            size * lightNormal.x, size * lightNormal.y
          );
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;

          if (shape.type === 'square') {
            ctx.fillRect(-size, -size, shape.size, shape.size);
          } else if (shape.type === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, size - ctx.lineWidth / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (shape.type === 'triangle') {
             ctx.fill();
          }
          // --- END DYNAMIC SHINE EFFECT ---

          ctx.restore();
        });
      }

      animationFrameId = window.requestAnimationFrame(update);
    };

    update();

    return () => {
      if (canvas.parentElement) {
        resizeObserver.unobserve(canvas.parentElement);
      }
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default FloatingShapes;
