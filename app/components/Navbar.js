'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Destaques', href: '#destaques' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Localização', href: '#localizacao' },
  ];

  const whatsappUrl = 'https://wa.me/5517999999999?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">
          BLACK <span>GRILL</span>
        </a>

        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-cta"
              style={{ marginTop: '1rem', color: 'black', fontWeight: 'bold' }}
            >
              📲 Pedir Agora
            </a>
          </li>
        </ul>

        <button className="hamburger-btn" onClick={() => setMobileOpen(true)} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'active' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-cta"
          style={{ marginTop: '1rem', color: 'black', fontWeight: 'bold' }}
        >
          📲 Pedir Agora
        </a>
      </div>
    </>
  );
}
