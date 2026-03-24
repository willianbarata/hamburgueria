'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const highlights = [
  {
    id: 1,
    name: 'Smash Burger',
    desc: 'Pão brioche, smash burger, queijo, molho especial. O clássico que conquistou Rio Preto.',
    price: 'R$ 24,90',
    badge: 'Mais vendido',
    badgeType: 'best-seller',
    image: '/img/smash_burger.png',
  },
  {
    id: 2,
    name: 'Double Bacon',
    desc: '2 carnes, queijo cheddar, bacon crocante, molho da casa. Irresistível.',
    price: 'R$ 34,90',
    badge: 'Favorito',
    badgeType: 'favorite',
    image: '/img/double_bacon.png',
  },
  {
    id: 3,
    name: 'Supreme Grill',
    desc: '2 carnes premium, cheddar, bacon, cebola caramelizada, molho especial. O rei do cardápio.',
    price: 'R$ 39,90',
    badge: 'Novo',
    badgeType: 'new',
    image: '/img/supreme_grill.png',
  },
];

export default function Destaques() {
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

  const handleOrder = (name) => {
    const msg = encodeURIComponent(`Olá! Gostaria de pedir: ${name}`);
    window.open(`https://wa.me/5517999999999?text=${msg}`, '_blank');
  };

  return (
    <section id="destaques" className="section" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-tag">⭐ Destaques</div>
        <h2 className="section-title">Mais pedidos</h2>
        <p className="section-subtitle">Os favoritos de quem já provou</p>
      </div>

      <div className="highlights-grid">
        {highlights.map((item, index) => (
          <div key={item.id} className={`highlight-card fade-in fade-in-delay-${index + 1}`}>
            <div className="highlight-card-image">
              <span className={`highlight-badge ${item.badgeType}`}>{item.badge}</span>
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={300}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="highlight-card-body">
              <h3 className="highlight-card-title">{item.name}</h3>
              <p className="highlight-card-desc">{item.desc}</p>
              <div className="highlight-card-footer">
                <span className="highlight-card-price">{item.price}</span>
                <button
                  className="highlight-order-btn"
                  onClick={() => handleOrder(item.name)}
                >
                  Pedir 📲
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
