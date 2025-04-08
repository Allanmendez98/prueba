import { FaBook, FaBookOpen, FaHome, FaIdCard } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Normativas.module.css';

function Normativas() {
  return (
    <div className={styles.contactGrid}>
      {/* Fila 1 */}
      <Link href="/reglamento-interno" className={styles.contactCard}>
        <FaBook className={styles.contactIcon} />
        <h3>Reglamento Interno</h3>
        <p>Ver Reglamento Interno</p>
      </Link>

      <Link href="/resoluciones" className={styles.contactCard}>
        <FaBookOpen className={styles.contactIcon} />
        <h3>Resoluciones</h3>
        <p>Ver Resoluciones</p>
      </Link>

      {/* Fila 2 */}
      <div className={styles.contactCard}>
        <FaIdCard className={styles.contactIcon} />
        <h3>Puesto</h3>
        <p>Jefe de Area</p>
      </div>

      <div className={styles.contactCard}>
        <FaHome className={styles.contactIcon} />
        <h3>Dirección</h3>
        <p>GUAYAQUIL</p>
      </div>
    </div>
  );
}

export default Normativas;