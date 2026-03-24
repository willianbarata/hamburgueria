'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">
            BLACK <span>GRILL</span>
          </div>
          <p className="footer-brand-desc">
            Hambúrgueres artesanais feitos na hora, com ingredientes selecionados. O sabor que vicia.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label="Instagram">📷</a>
            <a href="#" className="footer-social-link" aria-label="Facebook">👍</a>
            <a href="#" className="footer-social-link" aria-label="TikTok">🎵</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Menu</div>
          <div className="footer-col-links">
            <a href="#cardapio">Cardápio</a>
            <a href="#destaques">Destaques</a>
            <a href="#galeria">Galeria</a>
            <a href="#depoimentos">Depoimentos</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Contato</div>
          <div className="footer-col-links">
            <a href="https://wa.me/5517999999999" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="mailto:contato@blackgrill.com.br">E-mail</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Horário</div>
          <div className="footer-col-links">
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Terça a Domingo</span>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>18h às 23h</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Segunda: Fechado</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Black Grill Burger. Todos os direitos reservados.</span>
        <span>São José do Rio Preto - SP</span>
      </div>
    </footer>
  );
}
