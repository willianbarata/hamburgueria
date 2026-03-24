'use client';

import { useEffect, useRef } from 'react';

const steps = [
  {
    icon: '🥬',
    step: 'Passo 01',
    title: 'Ingredientes Selecionados',
    desc: 'Cada ingrediente é escolhido a dedo para garantir frescor e qualidade premium em cada mordida.',
  },
  {
    icon: '🔥',
    step: 'Passo 02',
    title: 'Preparo na Hora',
    desc: 'Nada de hambúrguer congelado. Seu pedido é preparado na chapa no momento, com todo o sabor.',
  },
  {
    icon: '🍔',
    step: 'Passo 03',
    title: 'Montagem Artesanal',
    desc: 'Camada por camada, cada burger é montado com cuidado para uma experiência perfeita.',
  },
];

export default function Montagem() {
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

  return (
    <div ref={sectionRef}>
      <div className="montagem-section">
        <div className="section-header fade-in">
          <div className="section-tag">✨ Experiência</div>
          <h2 className="section-title">Feito na hora, do seu jeito</h2>
          <p className="section-subtitle">Do ingrediente ao prato, cada etapa com dedicação</p>
        </div>

        <div className="montagem-grid">
          {steps.map((step, index) => (
            <div key={index} className={`montagem-card fade-in fade-in-delay-${index + 1}`}>
              <div className="montagem-icon">{step.icon}</div>
              <div className="montagem-step">{step.step}</div>
              <h3 className="montagem-title">{step.title}</h3>
              <p className="montagem-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
