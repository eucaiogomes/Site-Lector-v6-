import React, { useEffect, useRef, useState } from 'react';
import bannerNr1 from '../../assets/banner-nr1.webp';
import bannerPlataforma from '../../assets/banner-plataforma-lector.jpg';

/**
 * Faixa de banner abaixo do topbar do admin (copiada de Tela-Recompensas-2.0): quadrado branco
 * com o logo à esquerda (link para o site) e o carrossel no centro (imagens não clicáveis).
 * Carrossel acessível: troca a cada 6s, pausa com mouse/foco/aba oculta/prefers-reduced-motion
 * e tem botão de pausa + bolinhas navegáveis por teclado.
 */

/** Logo do site (assets/brand/logo-lector.svg, 1238x246): símbolo em x 0-273, palavra "lector" à direita. */
const LOGO_SRC = '/assets/brand/logo-lector.svg';

/** Logo empilhado (símbolo, "lector", "tecnologia") recortado do logo horizontal. */
const StackedLogo: React.FC = () => (
  <>
    <svg className="adm-banner-logo-sym" viewBox="0 0 274 246" aria-hidden="true">
      <image href={LOGO_SRC} width="1238" height="246" />
    </svg>
    <svg className="adm-banner-logo-word" viewBox="300 18 938 228" aria-hidden="true">
      <image href={LOGO_SRC} width="1238" height="246" />
    </svg>
    <span className="adm-banner-logo-tag" aria-hidden="true">tecnologia</span>
  </>
);

interface Slide { src: string; alt: string }

const SLIDES: Slide[] = [
  { src: bannerNr1, alt: 'Banner: a NR-1 exige gestão de riscos psicossociais; a Lector entrega o processo inteiro.' },
  { src: bannerPlataforma, alt: 'Banner: conheça a plataforma Lector.' },
];

const INTERVAL_MS = 6000;

export const AdminBanner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReduced(mq.matches);
    const onVis = () => setHidden(document.hidden);
    mq.addEventListener('change', onMq);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      mq.removeEventListener('change', onMq);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const playing = !reduced && !userPaused && !hover && !focus && !hidden;

  useEffect(() => {
    window.clearInterval(timer.current);
    if (!playing || SLIDES.length < 2) return undefined;
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => window.clearInterval(timer.current);
  }, [playing, index]);

  return (
    <div className="adm-banner">
      <a href="/" className="adm-banner-logo" aria-label="Lector tecnologia, ir para o site" title="Lector tecnologia">
        <StackedLogo />
      </a>
      <section
        className="adm-banner-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Banners do admin"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setFocus(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false); }}
      >
        <div className="adm-banner-stage" aria-live={playing ? 'off' : 'polite'}>
          {SLIDES.map((s, i) => (
            <div
              key={s.src}
              className={`adm-banner-slide${i === index ? ' is-active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${SLIDES.length}`}
              aria-hidden={i !== index}
            >
              <img
                src={s.src}
                alt={s.alt}
                draggable={false}
                decoding="async"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            </div>
          ))}
        </div>

        <div className="adm-banner-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className={`adm-banner-dot${i === index ? ' is-active' : ''}`}
              aria-label={`Banner ${i + 1} de ${SLIDES.length}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        {!reduced && SLIDES.length > 1 && (
          <button
            type="button"
            className="adm-banner-pause"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? 'Retomar rotação dos banners' : 'Pausar rotação dos banners'}
            title={userPaused ? 'Retomar' : 'Pausar'}
          >
            {userPaused ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v14l11-7-11-7z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            )}
          </button>
        )}
      </section>
    </div>
  );
};

export default AdminBanner;
