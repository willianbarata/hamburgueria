'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const testimonials = [
  {
    name: 'Lucas',
    label: 'Cliente frequente',
    text: '"Melhor hambúrguer de Rio Preto! Não tem comparação. O Double Bacon é absurdo de bom."',
    initial: 'L',
  },
  {
    name: 'Mariana',
    label: 'Via delivery',
    text: '"Chegou rápido e muito saboroso. O queijo derretido estava perfeito, igual da foto!"',
    initial: 'M',
  },
  {
    name: 'Rafael',
    label: 'Cliente novo',
    text: '"Viciante! Pedi uma vez e agora peço toda semana. O Smash Burger é insuperável."',
    initial: 'R',
  },
  {
    name: 'Camila',
    label: 'Retirada no local',
    text: '"O combo família é incrível! Veio tudo quentinho, bem embalado. Recomendo demais."',
    initial: 'C',
  },
  {
    name: 'Pedro',
    label: 'Via iFood',
    text: '"Supreme Grill é outro nível. A cebola caramelizada com bacon... chef\'s kiss!"',
    initial: 'P',
  },
];

export default function Depoimentos() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

  const maxIndex = Math.max(0, testimonials.length - (typeof window !== 'undefined' && window.innerWidth > 768 ? 2 : 1));

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [next]);

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
    <section id="depoimentos" className="section" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-tag">💬 Depoimentos</div>
        <h2 className="section-title">Quem prova, volta</h2>
        <p className="section-subtitle">Veja o que nossos clientes dizem</p>
      </div>

      <div className="testimonials-container fade-in">
        <div
          className="testimonials-track"
          style={{ transform: `translateX(-${current * 370}px)` }}
        >
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-label">{t.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial-controls fade-in">
        <button className="testimonial-btn" onClick={prev}>←</button>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button className="testimonial-btn" onClick={next}>→</button>
      </div>
    </section>
  );
}
