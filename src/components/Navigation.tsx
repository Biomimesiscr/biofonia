import { NavigationBorder } from './NavigationBorder';

interface NavigationProps {
  title: string;
  color?: string;
  iconBasePath?: string;
  homeHref?: string;
}

export function Navigation({
  title,
  color = 'broadcast-network',
}: NavigationProps) {
  return (
    <header
      style={{
        position: 'relative',
        zIndex: 40,
        isolation: 'isolate',
      }}
    >
      <NavigationBorder color={color} />
      <nav
        style={{
          padding: 'var(--pad-nav-y) var(--pad-nav-x)',
          position: 'relative',
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <h1
            style={{
              color: 'var(--white)',
              fontSize: 'var(--text-5xl)',
              fontWeight: 'var(--weight-regular)',
              margin: 0,
              lineHeight: 'var(--leading-tight)',
            }}
          >
            {title}
          </h1>
        </div>
      </nav>
    </header>
  );
}
