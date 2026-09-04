import { Navigation } from '../components/Navigation';
import './ComingSoon.css';

export function ComingSoon() {
  return (
    <>
      <Navigation
        title="Biofonía"
        color="community-membrane"
        iconBasePath="assets/icons/ui"
        homeHref="https://biomimesiscr.org"
      />

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 24px',
          marginTop: '-40px',
        }}
      >
        <section
          className="bf-hero"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1040px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '112px 0 128px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/hero-bloom.svg"
            alt=""
            style={{
              position: 'absolute',
              top: '40px',
              left: '50%',
              width: '760px',
              maxWidth: '150%',
              transform: 'translateX(-50%)',
              opacity: 0.14,
              animation: 'bf-breathe 14s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
         

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--community-membrane-light)',
              }}
            >
              PRÓXIMAMENTE...
            </p>
            <h2
              className="bf-hero-title"
              style={{
                margin: 0,
                maxWidth: '15ch',
                fontSize: '56px',
                fontWeight: 400,
                lineHeight: 1.15,
                color: 'var(--community-membrane)',
                textWrap: 'pretty',
              }}
            >
              Un foro para conversar entre laboratorio y territorio
            </h2>
            <p
              style={{
                margin: 0,
                maxWidth: '60ch',
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'var(--broadcast-network)',
                textWrap: 'pretty',
              }}
            >
              Biofonía es el módulo de foro de Biomímesis Costa Rica. Un espacio donde las
              personas que investigan en el Centro de Investigación en Ciencia e Ingeniería de
              Materiales (CICIMA) de la UCR y las personas de comunidades locales que observan
              estos fenómenos en la naturaleza pueden preguntar, responder y construir
              conocimiento juntas.
            </p>
            <p
              style={{
                margin: 0,
                maxWidth: '52ch',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--community-membrane-light)',
                textWrap: 'pretty',
              }}
            >
              También para quien solo pasa a leer y aprender: vas a poder usar el foro sin crear
              una cuenta.
            </p>
          </div>
        </section>

        <section
          className="bf-cards-section"
          style={{
            width: '100%',
            maxWidth: '1040px',
            display: 'flex',
            flexDirection: 'column',
            gap: '56px',
            paddingBottom: '128px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--community-membrane-light)',
              }}
            >
              CÓMO VA A FUNCIONAR
            </p>
            <h3
              style={{
                margin: 0,
                fontSize: '30px',
                fontWeight: 500,
                color: 'var(--community-membrane)',
              }}
            >
              Tres formas de participar
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '48px 40px',
            }}
          >
            <article style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <img src="/assets/icon-publicar.svg" alt="" style={{ width: '48px', height: '48px' }} />
              <h4
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 500,
                  color: 'var(--community-membrane)',
                }}
              >
                Publicar sobre un tema
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--broadcast-network)',
                  textWrap: 'pretty',
                }}
              >
                Cualquier persona podrá abrir un posteo sobre un tema específico y adjuntar
                fotos, audio, video o archivos que enriquezcan la conversación.
              </p>
            </article>
            <article style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <img src="/assets/icon-hilo.svg" alt="" style={{ width: '48px', height: '48px' }} />
              <h4
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 500,
                  color: 'var(--community-membrane)',
                }}
              >
                Abrir un hilo o una duda
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--broadcast-network)',
                  textWrap: 'pretty',
                }}
              >
                Las preguntas se responden en hilos, para que la experiencia empírica del campo
                y la investigación del laboratorio se encuentren en el mismo lugar.
              </p>
            </article>
            <article style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <img src="/assets/icon-votar.svg" alt="" style={{ width: '48px', height: '48px' }} />
              <h4
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 500,
                  color: 'var(--community-membrane)',
                }}
              >
                Votar lo que aporta
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--broadcast-network)',
                  textWrap: 'pretty',
                }}
              >
                Los votos dan más visibilidad a los temas que la comunidad encuentra más útiles,
                sin que nadie tenga que moderar de más.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer
        style={{
          position: 'relative',
          marginTop: 'auto',
          background: 'var(--community-membrane)',
          padding: '72px 24px 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          textAlign: 'center',
        }}
      >
        <img
          src="/assets/biomimesis-logo.svg"
          alt="Biomímesis Costa Rica"
          style={{ width: '132px', filter: 'brightness(0) invert(1)' }}
        />
        <p
          style={{
            margin: 0,
            maxWidth: '44ch',
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,.8)',
            textWrap: 'pretty',
          }}
        >
          Biofonía es parte del ecosistema de Biomímesis Costa Rica, en alianza con el CICIMA de
          la Universidad de Costa Rica.
        </p>
        <a
          href="https://biomimesiscr.org"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 28px',
            border: '1px solid rgba(255,255,255,.85)',
            borderRadius: '999px',
            fontSize: '14px',
            color: '#fff',
          }}
        >
          Volver a biomimesiscr.org
        </a>
      </footer>
    </>
  );
}
