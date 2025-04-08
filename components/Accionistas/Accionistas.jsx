import { useState } from 'react';
import styles from './Accionistas.module.css'; // Using CSS Modules
import Image from 'next/image';

// Import images - make sure to place them in the public folder or configure your loader
import user1 from '../../app/assets/image/Perfil.jpg';
import user2 from '../../app/assets/image/Perfil1.png';

function Accionistas() {
  // Sample shareholder data
  const [accionistas, setAccionistas] = useState([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      imagen: user1,
      porcentaje: 15.5,
      seguido: false
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'Gómez',
      imagen: user2,
      porcentaje: 12.3,
      seguido: true
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'López',
      imagen: user1,
      porcentaje: 8.7,
      seguido: false
    },
    // You can add more shareholders here
  ]);

  // Function to handle follow button
  const handleSeguir = (id) => {
    setAccionistas(accionistas.map(accionista => 
      accionista.id === id 
        ? { ...accionista, seguido: !accionista.seguido } 
        : accionista
    ));
  };

  return (
    <div className={styles.accionistasContainer}>
      <h1>Lista de Accionistas</h1>
      
      <div className={styles.accionistasTableContainer}>
        <table className={styles.accionistasTable}>
          <thead>
            <tr>
              <th>Accionista</th>
              <th>Porcentaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {accionistas.map(accionista => (
              <tr key={accionista.id}>
                <td className={styles.accionistaInfo}>
                  <div className={styles.accionistaAvatar}>
                    <Image 
                      src={accionista.imagen} 
                      alt={`${accionista.nombre} ${accionista.apellido}`}
                      width={40}
                      height={40}
                      className={styles.avatarImage}
                    />
                  </div>
                  <div className={styles.accionistaNombre}>
                    <span className={styles.nombreCompleto}>
                      {accionista.nombre} {accionista.apellido}
                    </span>
                  </div>
                </td>
                <td className={styles.porcentaje}>
                  {accionista.porcentaje}%
                </td>
                <td className={styles.acciones}>
                  <button 
                    className={`${styles.seguirBtn} ${accionista.seguido ? styles.siguiendo : ''}`}
                    onClick={() => handleSeguir(accionista.id)}
                  >
                    {accionista.seguido ? 'Siguiendo' : 'Seguir'}
                  </button>
                  <button className={styles.verPerfilBtn}>
                    Ver Perfil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Accionistas;