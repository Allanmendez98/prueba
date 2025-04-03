"use client"; // Necesario para componentes que usan hooks y eventos

import styles from "./ProfileHeader.module.css"; // Recomiendo usar CSS Modules
import { useRouter } from "next/navigation";
import { FaPen, FaCamera } from "react-icons/fa";

// Importar imágenes - Asegúrate de que estas rutas son correctas
import coverPhoto from "../../app/assets/image/Banco.jpg"; // Ajusta la ruta según tu estructura
import profilePhoto from "../../app/assets/image/Perfil1.png"; // Ajusta la ruta según tu estructura

function ProfileHeader() {
  const router = useRouter(); // Next.js usa useRouter en lugar de useNavigate

  return (
    <div className={styles.profileContainer}>
      {/* Portada */}
      <div className={styles.coverPhotoContainer}>
        <img 
          src={coverPhoto.src} // Next.js maneja imágenes estáticas así
          alt="Cover" 
          className={styles.coverPhoto} 
        />
        <button className={styles.changeCoverBtn}>
          <FaCamera className={styles.changePhotoIcon} /> Cambiar portada
        </button>
      </div>

      {/* Información de perfil */}
      <div className={styles.informacionPerfil}>
        <div className={styles.profileContent}>
          {/* Foto de perfil */}
          <div className={styles.profilePhotoWrapper}>
            <img
              src={profilePhoto.src}
              alt="Foto de perfil"
              className={styles.profilePhoto}
            />
            <button className={styles.changeProfileBtn}>
              <FaCamera className={styles.changePhotoIcon} />
            </button>
          </div>

          {/* Información principal a la derecha */}
          <div className={styles.profileMainInfo}>
            <div className={styles.profileNameRow}>
              <h1 className={styles.profileName}>DAYSI CAMAS</h1>
              <button
                className={styles.updateInfoBtn}
                onClick={() => router.push("/informacion")}
              >
                <FaPen className={styles.penIcon} />
              </button>
            </div>

            <div className={styles.profileRoles}>
              <span className={styles.roleTitle}>Accionistas:</span>
              <span className={styles.roleValue}>Banco Financiero ANEUPI</span>
            </div>

            <div className={styles.profileDescription}>
              <p>
                Soy una mujer visionaria que trabajo con mis objetivos grandes y
                lo estoy cumpliendo, siempre me conocerán por mis acciones y no
                por mis palabras.
              </p>
            </div>

            {/* Botones de acción apilados */}
            <div className={styles.profileButtonsRow}>
              <button
                className={`${styles.actionBtn} ${styles.primaryBtn}`}
                onClick={() => router.push("/informacion")}
              >
                Overview
              </button>
              <button className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
                Contactar
              </button>
              <button className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
                Seguir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;