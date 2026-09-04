export const COLORS: Record<string, string> = {
  'community-membrane': 'var(--community-membrane)',
  'community-membrane-dark': 'var(--community-membrane-dark)',
  'community-membrane-light': 'var(--community-membrane-light)',
  'broadcast-network': 'var(--broadcast-network)',
  'broadcast-network-dark': 'var(--broadcast-network-dark)',
  'broadcast-network-light': 'var(--broadcast-network-light)',
  'broadcast-network-extra-light': 'var(--broadcast-network-extra-light)',
  'collaborative-space': 'var(--collaborative-space)',
  'collaborative-space-dark': 'var(--collaborative-space-dark)',
  'collaborative-space-light': 'var(--collaborative-space-light)',
  'collaborative-space-extra-light': 'var(--collaborative-space-extra-light)',
  'core-base': 'var(--core-base)',
  'core-base-secondary': 'var(--core-base-secondary)',
  'core-base-light': 'var(--core-base-light)',
  white: 'var(--white)',
};

export const bio = (c: string): string => COLORS[c] || COLORS['broadcast-network'];
