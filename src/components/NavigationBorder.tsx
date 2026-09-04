import { bio } from './colors';

const WAVE =
  'M0,64L120,85.3C240,107,480,149,720,154.7C960,160,1200,128,1320,112L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z';

interface NavigationBorderProps {
  color?: string;
}

export function NavigationBorder({ color = 'broadcast-network' }: NavigationBorderProps) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        top: -90,
        left: 0,
        zIndex: -10,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ width: '100%', display: 'block' }}
      >
        <path fill={bio(color)} fillOpacity="1" d={WAVE} />
      </svg>
    </div>
  );
}
