'use client';

import { useEffect, useRef } from 'react';

export default function Localizacao() {
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
    <section id="localizacao" className="section" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-tag">📍 Localização</div>
        <h2 className="section-title">Estamos em São José do Rio Preto</h2>
        <p className="section-subtitle">Atendemos retirada e delivery</p>
      </div>

      <div className="location-grid fade-in">
        <div className="location-info">
          <div className="location-item">
            <div className="location-icon">📍</div>
            <div>
              <div className="location-item-title">Endereço</div>
              <div className="location-item-text">
                Rua Bernardino de Campos, 1234 - Centro<br />
                São José do Rio Preto - SP
              </div>
            </div>
          </div>

          <div className="location-item">
            <div className="location-icon">🕐</div>
            <div>
              <div className="location-item-title">Horário de Funcionamento</div>
              <div className="location-item-text">
                Terça a Domingo: 18h às 23h<br />
                Segunda: Fechado
              </div>
            </div>
          </div>

          <div className="location-item">
            <div className="location-icon">📞</div>
            <div>
              <div className="location-item-title">WhatsApp</div>
              <div className="location-item-text">
                (17) 99999-9999
              </div>
            </div>
          </div>

          <div className="location-item">
            <div className="location-icon">🛵</div>
            <div>
              <div className="location-item-title">Delivery</div>
              <div className="location-item-text">
                Entregamos em toda a cidade<br />
                Tempo médio: 30-45 min
              </div>
            </div>
          </div>
        </div>

        <div className="location-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119417.47206959668!2d-49.42768!3d-20.8113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bdad67925a9691%3A0x810a3e4a615e3bcd!2sS%C3%A3o%20Jos%C3%A9%20do%20Rio%20Preto%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Black Grill Burger"
          />
        </div>
      </div>
    </section>
  );
}
