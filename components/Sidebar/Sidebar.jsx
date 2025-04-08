"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/inicio", text: "Inicio" },
    { href: "/estadofinanciero", text: "Estados Financieros" },
    { href: "/accionistas", text: "Accionistas" },
    { href: "/normativas", text: "Normativas" },
    { href: "/solicitud-credito", text: "Créditos" },
    { href: "/notificaciones", text: "Notificaciones" }
  ];

  const isActive = (href) => {
    return pathname === href || (href === "/inicio" && pathname === "/");
  };

  return (
    <div className="w-full flex justify-center">
      <nav className={`${styles.sidebar} bg-gray-800 rounded-xl p-3 w-full md:max-w-[90%] overflow-x-auto whitespace-nowrap`}>
        <ul className={`${styles.sidebarList} inline-flex list-none p-0 m-0 min-w-full`}>
          {links.map((link) => (
            <li key={link.href} className="m-0 flex-shrink-0 mx-2"> {/* Añadido mx-2 para espacio horizontal */}
              <Link
                href={link.href}
                className={`${styles.sidebarLink} ${
                  isActive(link.href) ? styles.activeLink : ""
                } text-white no-underline inline-block px-4 py-3 rounded-md transition-all duration-300 whitespace-nowrap hover:bg-gray-700`} // Cambiado rounded-t-md a rounded-md
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;