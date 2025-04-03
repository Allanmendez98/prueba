'use client';

import { useState } from 'react';
import styles from './Inicio.module.css';
import Image from 'next/image';

// Importar imágenes locales
import noticia1 from '../../app/assets/image/Noticia1.jpg';
import noticia2 from '../../app/assets/image/noticia2.jpg';


export default function Inicio() {
  const [noticias, setNoticias] = useState([
    {
      id: 1,
      titulo: 'Banco Financiero lanza nueva plataforma digital',
      contenido: 'El Banco Financiero ha presentado su nueva plataforma digital con tecnología blockchain para transacciones más seguras...',
      imagen: noticia1,
      fecha: '15 Mayo 2023',
      meGusta: 124,
      comentarios: 28,
      liked: false,
      tamaño: 'grande'
    },
    {
      id: 2,
      titulo: 'Nuevas oficinas en Guayaquil',
      contenido: 'Inauguramos nuestras nuevas oficinas corporativas en el centro financiero de Guayaquil...',
      imagen: noticia2,
      fecha: '10 Mayo 2023',
      meGusta: 89,
      comentarios: 14,
      liked: true,
      tamaño: 'pequeño'
    },
    {
      id: 3,
      titulo: 'Convenio con universidades locales',
      contenido: 'Firmamos un importante convenio con las principales universidades para programas de pasantías...',
      imagen: noticia2,
      fecha: '5 Mayo 2023',
      meGusta: 156,
      comentarios: 42,
      liked: false,
      tamaño: 'pequeño'
    },
    {
      id: 4,
      titulo: 'Reporte financiero del primer trimestre',
      contenido: 'Presentamos nuestros resultados financieros del primer trimestre con un crecimiento del 12% en cartera crediticia...',
      imagen: noticia2,
      fecha: '1 Mayo 2023',
      meGusta: 210,
      comentarios: 35,
      liked: false,
      tamaño: 'grande'
    }
  ]);

  const handleLike = (id) => {
    setNoticias(noticias.map(noticia => {
      if (noticia.id === id) {
        return {
          ...noticia,
          liked: !noticia.liked,
          meGusta: noticia.liked ? noticia.meGusta - 1 : noticia.meGusta + 1
        };
      }
      return noticia;
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Últimas Noticias</h1>
      
      <div className={styles.grid}>
        {noticias.map(noticia => (
          <div 
            key={noticia.id} 
            className={`${styles.card} ${noticia.tamaño === 'grande' ? styles.large : ''}`}
          >
            <div className={styles.imageContainer}>
              <Image 
                src={noticia.imagen} 
                alt={noticia.titulo} 
                width={noticia.tamaño === 'grande' ? 600 : 300}
                height={noticia.tamaño === 'grande' ? 300 : 200}
                className={styles.image}
                placeholder="blur"
                priority={noticia.id === 1} // Prioriza la primera imagen
              />
            </div>
            
            <div className={styles.content}>
              <span className={styles.date}>{noticia.fecha}</span>
              <h2 className={styles.newsTitle}>{noticia.titulo}</h2>
              <p className={styles.summary}>{noticia.contenido}</p>
              
              <div className={styles.actions}>
                <button 
                  className={`${styles.likeButton} ${noticia.liked ? styles.liked : ''}`}
                  onClick={() => handleLike(noticia.id)}
                  aria-label={noticia.liked ? 'Quitar me gusta' : 'Dar me gusta'}
                >
                  <span className={styles.icon}>❤️</span>
                  <span className={styles.count}>{noticia.meGusta}</span>
                </button>
                
                <button 
                  className={styles.commentButton}
                  aria-label="Comentar"
                >
                  <span className={styles.icon}>💬</span>
                  <span className={styles.count}>{noticia.comentarios}</span>
                </button>
                
                <button 
                  className={styles.moreButton}
                  aria-label="Ver más detalles"
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}