'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 59;
const IMAGE_PREFIX = '/img/Create_a_cinematic_food_animation_showing_burger_i_b39562aac9_';

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const images = [];
    let loadedCount = 0;

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const num = String(index).padStart(3, '0');
        img.src = `${IMAGE_PREFIX}${num}.jpg`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };
        images[index] = img;
      });
    };

    const loadAll = async () => {
      const promises = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        promises.push(loadImage(i));
      }
      await Promise.all(promises);
      imagesRef.current = images;
      setLoaded(true);
      drawFrame(0);
    };

    loadAll();
  }, []);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];
    if (!img) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useEffect(() => {
    if (!loaded) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const container = containerRef.current;
          if (!container) return;

          const rect = container.getBoundingClientRect();
          const scrollableHeight = container.offsetHeight - window.innerHeight;
          const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
          const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(scrollProgress * TOTAL_FRAMES));

          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [loaded]);

  const whatsappUrl = 'https://wa.me/5517999999999?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido';

  return (
    <>
      {!loaded && (
        <div className="loading-screen">
          <div className="loading-logo">BLACK <span>GRILL</span></div>
          <div className="loading-bar-container">
            <div className="loading-bar" style={{ width: `${loadingProgress}%` }} />
          </div>
          <div className="loading-text">Carregando experiência... {loadingProgress}%</div>
        </div>
      )}

      <div className="hero-wrapper" ref={containerRef}>
        <div className="hero-sticky">
          <canvas ref={canvasRef} className="hero-canvas" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-badge">🔥 O sabor que vicia</div>
            <h1 className="hero-title">
              O hambúrguer que você <em>nunca esquece</em>
            </h1>
            <p className="hero-subtitle">
              Feito na hora, com ingredientes selecionados
            </p>
            <div className="hero-buttons">
              <a href="#cardapio" className="btn-primary">
                🍔 Ver Cardápio
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                📲 Pedir no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
