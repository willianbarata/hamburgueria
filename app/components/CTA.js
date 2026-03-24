'use client';

import { useEffect, useRef } from 'react';

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const whatsappUrl = 'https://wa.me/5517999999999?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido';

  return (
    <div ref={sectionRef}>
      <div className="cta-section fade-in">
        <span className="cta-emoji">🍔</span>
        <h2 className="cta-title">Tá com fome?</h2>
        <p className="cta-text">Peça agora e receba em casa. Hambúrguer artesanal na sua porta.</p>
        <div className="cta-buttons">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            📲 Pedir no WhatsApp
          </a>
          <a href="#cardapio" className="btn-secondary">
            🍔 Ver Cardápio
          </a>
        </div>
      </div>
    </div>
  );
}
