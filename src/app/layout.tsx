import Navbar from './components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Quran App',
  description: 'An app to read and explore the Quran',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
