'use client';

import { useState, useEffect, useRef } from 'react';

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'smash', label: 'Smash Burgers' },
  { id: 'gourmet', label: 'Burgers Gourmet' },
  { id: 'combos', label: 'Combos' },
  { id: 'porcoes', label: 'Porções' },
  { id: 'bebidas', label: 'Bebidas' },
];

const menuItems = [
  {
    id: 1,
    name: 'Smash Burger',
    desc: 'Pão brioche, smash burger 90g, queijo cheddar, cebola caramelizada, molho especial',
    price: 'R$ 24,90',
    category: 'smash',
    icon: '🔥',
  },
  {
    id: 2,
    name: 'Double Smash',
    desc: '2 carnes smash 90g, queijo cheddar duplo, picles, molho da casa',
    price: 'R$ 29,90',
    category: 'smash',
    icon: '🔥',
  },
  {
    id: 3,
    name: 'Double Bacon',
    desc: '2 carnes, queijo cheddar, bacon crocante, molho da casa no pão brioche',
    price: 'R$ 34,90',
    category: 'gourmet',
    icon: '🥓',
  },
  {
    id: 4,
    name: 'Supreme Grill',
    desc: '2 carnes premium, cheddar, bacon, cebola caramelizada, molho especial',
    price: 'R$ 39,90',
    category: 'gourmet',
    icon: '👑',
  },
  {
    id: 5,
    name: 'Black Angus',
    desc: 'Carne angus 180g, queijo brie, rúcula, tomate seco, molho trufado',
    price: 'R$ 44,90',
    category: 'gourmet',
    icon: '🥩',
  },
  {
    id: 6,
    name: 'BBQ Monster',
    desc: 'Carne dupla, cheddar, onion rings, bacon, molho barbecue defumado',
    price: 'R$ 42,90',
    category: 'gourmet',
    icon: '🍖',
  },
  {
    id: 7,
    name: 'Combo Smash',
    desc: 'Smash Burger + Batata frita + Refrigerante 350ml',
    price: 'R$ 34,90',
    category: 'combos',
    icon: '🍟',
  },
  {
    id: 8,
    name: 'Combo Gourmet',
    desc: 'Supreme Grill + Batata cheddar bacon + Milk shake',
    price: 'R$ 54,90',
    category: 'combos',
    icon: '🍟',
  },
  {
    id: 9,
    name: 'Combo Família',
    desc: '2 Double Bacon + 2 Smash + Batata grande + 4 Refrigerantes',
    price: 'R$ 99,90',
    category: 'combos',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 10,
    name: 'Batata Frita',
    desc: 'Batata frita crocante com sal e temperos da casa',
    price: 'R$ 14,90',
    category: 'porcoes',
    icon: '🍟',
  },
  {
    id: 11,
    name: 'Batata Cheddar Bacon',
    desc: 'Batata frita coberta com cheddar cremoso e bacon crocante',
    price: 'R$ 22,90',
    category: 'porcoes',
    icon: '🧀',
  },
  {
    id: 12,
    name: 'Onion Rings',
    desc: 'Anéis de cebola empanados crocantes com molho especial',
    price: 'R$ 18,90',
    category: 'porcoes',
    icon: '🧅',
  },
  {
    id: 13,
    name: 'Refrigerante 350ml',
    desc: 'Coca-Cola, Guaraná ou Sprite',
    price: 'R$ 7,90',
    category: 'bebidas',
    icon: '🥤',
  },
  {
    id: 14,
    name: 'Milk Shake',
    desc: 'Chocolate, Morango ou Ovomaltine (400ml)',
    price: 'R$ 16,90',
    category: 'bebidas',
    icon: '🥛',
  },
  {
    id: 15,
    name: 'Suco Natural',
    desc: 'Laranja, Limão ou Maracujá (300ml)',
    price: 'R$ 9,90',
    category: 'bebidas',
    icon: '🧃',
  },
];

export default function Cardapio() {
  const [activeFilter, setActiveFilter] = useState('all');
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

  const filtered = activeFilter === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeFilter);

  const handleOrder = (itemName) => {
    const msg = encodeURIComponent(`Olá! Gostaria de pedir: ${itemName}`);
    window.open(`https://wa.me/5517999999999?text=${msg}`, '_blank');
  };

  return (
    <section id="cardapio" className="section" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-tag">🍔 Cardápio</div>
        <h2 className="section-title">Nosso Cardápio</h2>
        <p className="section-subtitle">Escolha seu favorito e peça direto pelo WhatsApp</p>
      </div>

      <div className="menu-filters fade-in">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filtered.map((item, index) => (
          <div
            key={item.id}
            className={`menu-card fade-in fade-in-delay-${(index % 4) + 1}`}
          >
            <div className="menu-card-header">
              <div className="menu-card-name">
                {item.icon} {item.name}
              </div>
              <div className="menu-card-price">{item.price}</div>
            </div>
            <p className="menu-card-desc">{item.desc}</p>
            <button
              className="menu-card-order"
              onClick={() => handleOrder(item.name)}
            >
              📲 Pedir no WhatsApp
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
