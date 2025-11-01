import { createIcon } from '@chakra-ui/react';

export const LuxTriangle = createIcon({
  displayName: 'LuxTriangle',
  viewBox: '0 0 100 100',
  path: (
    <path
      d="M10 20 L90 20 L50 90 Z"
      fill="currentColor"
    />
  ),
});

// Inverted equilateral triangle:
// Top left: (10, 20)
// Top right: (90, 20)
// Bottom vertex: (50, 90)
// This creates an upside-down triangle pointing downward