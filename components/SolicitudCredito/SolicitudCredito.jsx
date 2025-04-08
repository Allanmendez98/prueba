import { FaHome, FaIdCard } from 'react-icons/fa';
import { FaMoneyCheckDollar, FaMoneyBill } from 'react-icons/fa6';
import Link from 'next/link';
import styles from './SolicitudCredito.module.css';

function SolicitudCredito() {
  return (
    <div className={styles.contactGrid}>
      {/* Fila 1 */}
      <Link href="/paquete-financiero" className={styles.contactCard}>
        <FaMoneyBill className={styles.contactIcon} />
        <h3>Paquete Financiero</h3>
        <p>Ver</p>
      </Link>

      <Link href="/creditos" className={styles.contactCard}>
        <FaMoneyCheckDollar className={styles.contactIcon} />
        <h3>Créditos Otorgados al Público</h3>
        <p>Ver</p>
      </Link>

      {/* Fila 2 */}
      <div className={styles.contactCard}>
        <FaIdCard className={styles.contactIcon} />
        <h3>Créditos Otorgados a Usted</h3>
        <p>Ver</p>
      </div>

      <div className={styles.contactCard}>
        <FaHome className={styles.contactIcon} />
        <h3>Solicitud de Crédito</h3>
        <p>Ver</p>
      </div>
    </div>
  );
}

export default SolicitudCredito;