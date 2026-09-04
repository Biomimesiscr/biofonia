import type { CSSProperties } from 'react';
import { bio } from './colors';

const FILES: Record<string, string> = {
  home: 'home',
  instagram: 'instagram',
  whatsapp: 'whatsapp',
  youtube: 'youtube',
};

interface SocialIconProps {
  name?: string;
  size?: number;
  color?: string;
  basePath?: string;
}

export function SocialIcon({
  name = 'instagram',
  size = 30,
  color = 'broadcast-network',
  basePath = '/assets/icons/ui',
}: SocialIconProps) {
  const url = basePath + '/' + (FILES[name] || 'instagram') + '.svg';
  const style: CSSProperties = {
    display: 'inline-block',
    width: size + 'px',
    height: size + 'px',
    background: bio(color),
    WebkitMaskImage: 'url(' + url + ')',
    maskImage: 'url(' + url + ')',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  };
  return <span style={style} />;
}
