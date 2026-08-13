export function generateBuilderIdNumber(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `HHG26-${randomNum}`;
}

const PREFIXES = [
  'THE SIGNAL',
  'THE PATTERN',
  'THE SYSTEM',
  'THE PRODUCT',
  'THE PROTOCOL',
  'THE KERNEL',
  'THE NEURAL',
  'THE ZERO-KNOWLEDGE',
  'THE SYNAPSE',
  'THE BYTE',
  'THE MATRIX',
  'THE SHARD',
  'THE LOGIC',
  'THE INFRA'
];

const SUFFIXES = [
  'HUNTER',
  'BUILDER',
  'ALCHEMIST',
  'ARCHITECT',
  'CRAFTER',
  'WEAVER',
  'VANGUARD',
  'NAVIGATOR',
  'ENGINEER',
  'PIONEER',
  'WIZARD',
  'MAVERICK',
  'FORGER',
  'SCULPTOR'
];

export function generateBuilderClass(role: string, stack: string[]): string {
  const combined = (role + ' ' + stack.join(' ')).toUpperCase();
  
  // Deterministic hash based on character sum
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash += combined.charCodeAt(i);
  }
  
  const prefix = PREFIXES[hash % PREFIXES.length];
  const suffix = SUFFIXES[(hash * 7) % SUFFIXES.length];
  
  return `${prefix} ${suffix}`;
}
