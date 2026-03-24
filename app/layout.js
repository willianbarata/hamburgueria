import './globals.css';

export const metadata = {
  title: 'Black Grill Burger | O sabor que vicia',
  description: 'Hambúrgueres artesanais feitos na hora com ingredientes premium. Delivery e retirada em São José do Rio Preto. Peça agora!',
  keywords: 'hamburgueria, burger, São José do Rio Preto, delivery, smash burger, gourmet',
  openGraph: {
    title: 'Black Grill Burger | O sabor que vicia',
    description: 'Hambúrgueres artesanais feitos na hora com ingredientes premium.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
