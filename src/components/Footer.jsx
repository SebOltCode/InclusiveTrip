import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#C1DCDC] text-[rgba(30,30,30,0.5)] py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <aside className="flex items-center space-x-4">
          <img className="w-[206px] h-[44px]" src="/images/Logo.png" alt="Logo" />
          <p>Urheberrecht © {new Date().getFullYear()} - Alle Rechte vorbehalten</p>
        </aside>
        <nav className="flex flex-wrap space-x-4 mt-4 md:mt-0">
          <Link to="/impressum" className="text-black hover:underline">Impressum</Link>
          <Link to="/datenschutz" className="text-black hover:underline">Datenschutz</Link>
          <Link to="/ueberuns" className="text-black hover:underline">Über uns</Link>
        </nav>
      </div>
    </footer>
  );
};






