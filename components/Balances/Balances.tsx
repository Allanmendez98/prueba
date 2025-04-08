import { useState } from 'react';
import styles from './Balances.module.css';

function Balances() {
  const [selectedYear, setSelectedYear] = useState(2023);
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const expenses = [
    { name: "Sueldos y salarios", amount: 0 },
    { name: "Alquiler", amount: 0 },
    { name: "Servicios públicos", amount: 0 },
    { name: "Marketing", amount: 0 },
    { name: "Gastos administrativos", amount: 0 },
    { name: "Impuestos", amount: 0 }
  ];

  // Datos de ejemplo
  const monthlyIncome = 31;
  const totalIncome = monthlyIncome * months.length;
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Balances Mensuales</h1>
      
      <div className={styles.yearSelector}>
        {years.map(year => (
          <button
            key={year}
            className={`${styles.yearButton} ${selectedYear === year ? styles.active : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      
      <h2 className={styles.statementTitle}>Estado de Resultados - {selectedYear}</h2>
      
      <div className={styles.statementTable}>
        <div className={styles.tableHeader}>
          <div className={styles.incomeHeader}>Ingresos Mensuales</div>
          <div className={styles.expensesHeader}>Egresos</div>
        </div>
        
        <div className={styles.tableBody}>
          <div className={styles.tableColumn}>
            {months.map((month, index) => (
              <div key={month} className={styles.tableRow}>
                <div className={styles.monthCell}>{month}</div>
                <div className={styles.amountCell}>${monthlyIncome}</div>
              </div>
            ))}
            <div className={`${styles.tableRow} ${styles.totalRow}`}>
              <div className={styles.totalCell}>Total Ingresos Anuales</div>
              <div className={styles.amountCell}>${totalIncome}</div>
            </div>
          </div>
          
          <div className={styles.tableColumn}>
            {expenses.map((expense, index) => (
              <div key={expense.name} className={styles.tableRow}>
                <div className={styles.expenseCell}>{expense.name}</div>
                <div className={styles.amountCell}>${expense.amount}</div>
              </div>
            ))}
            <div className={`${styles.tableRow} ${styles.totalRow}`}>
              <div className={styles.totalCell}>Total Egresos</div>
              <div className={styles.amountCell}>${totalExpenses}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.netProfit}>
        Ganancia Neto: <span className={styles.profitAmount}>${netProfit}</span>
      </div>
    </div>
  );
}

export default Balances;