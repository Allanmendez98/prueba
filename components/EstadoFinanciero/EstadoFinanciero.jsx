import { FaBalanceScale, FaHome, FaIdCard } from 'react-icons/fa';
import { FaMoneyCheckDollar, FaMoneyBillTrendUp } from 'react-icons/fa6';
import Link from 'next/link';
import styles from './EstadoFinanciero.module.css';

function ContactCard({ href, icon: Icon, title, description }) {
  return (
    <Link href={href} className={styles.contactCard}>
      <Icon className={styles.contactIcon} />
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default function EstadoFinanciero() {
  return (
    <div className={styles.contactGrid}>
      {/* Fila 1 */}
      <ContactCard
        href="/creditosEF"
        icon={FaMoneyCheckDollar}
        title="Total"
        description="de ingresos"
      />

      <ContactCard
        href="/aportaciones-mensuales"
        icon={FaMoneyBillTrendUp}
        title="Aportaciones Mensuales"
        description="Ver Aportaciones Mensuales"
      />

      <ContactCard
        href="/Balances"
        icon={FaBalanceScale}
        title="Balances"
        description="Mensuales"
      />

      {/* Fila 2 */}
      <div className={styles.contactCard}>
        <FaIdCard className={styles.contactIcon} />
        <h3>Otros</h3>
        <p>ingresos</p>
      </div>

      <div className={styles.contactCard}>
        <FaHome className={styles.contactIcon} />
        <h3>Ganancias</h3>
        <p>los creditos</p>
      </div>
    </div>
  );
}