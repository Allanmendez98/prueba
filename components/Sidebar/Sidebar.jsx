"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/inicio", text: "Inicio" }, // Directamente a /inicio
    { href: "/estadofinanciero", text: "Estados Financieros" },
    { href: "/accionistas", text: "Accionistas" },
    { href: "/normativas", text: "Normativas" },
    { href: "/solicitud-credito", text: "Créditos" },
    { href: "/notificaciones", text: "Notificaciones" }
  ];

  // Función para manejar rutas activas
  const isActive = (href) => {
    return pathname === href || 
           (href === "/inicio" && pathname === "/"); // Opcional si quieres que / también active el estilo
  };

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {links.map((link) => (
          <li key={link.href} className={styles.sidebarItem}>
            <Link
              href={link.href} // Elimina la redirección a "/"
              className={`${styles.sidebarLink} ${
                isActive(link.href) ? styles.activeLink : ""
              }`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;