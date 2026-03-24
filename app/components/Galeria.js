'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const galleryImages = [
  { src: '/img/smash_burger.png', alt: 'Smash Burger artesanal' },
  { src: '/img/cheese_melting.png', alt: 'Queijo derretendo' },
  { src: '/img/bacon_closeup.png', alt: 'Bacon crocante' },
  { src: '/img/double_bacon.png', alt: 'Double Bacon' },
  { src: '/img/burger_combo.png', alt: 'Combo completo' },
  { src: '/img/supreme_grill.png', alt: 'Supreme Grill' },
];

export default function Galeria() {
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
    <section id="galeria" className="section" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-tag">📸 Galeria</div>
        <h2 className="section-title">Dá uma olhada nisso</h2>
        <p className="section-subtitle">Cada foto vai abrir seu apetite</p>
      </div>

      <div className="gallery-grid fade-in">
        {galleryImages.map((img, index) => (
          <div key={index} className="gallery-item">
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={600}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
