/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
      display: ['Fraunces', 'serif'],
      sans: ['Plus Jakarta Sans', 'sans-serif'],
      
    },
      keyframes: {
  marquee: {
    '0%':   { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
},
animation: {
  marquee: 'marquee 35s linear infinite',
},
      colors: {
        // ── 9Ex Celestial Palette ──────────────────────────────────────────────
        // Ground: deep forest/void green — background
        ink: {
          DEFAULT: '#080E0A',  // Dark Forest base bg
          soft:    '#0D1710',  // Slightly lifted for card/panel backgrounds
          line:    '#1A2E1F',  // Dividers & borders
        },
        // Moon Silver — headlines, body text
        paper: {
          DEFAULT: '#C8D8CE',  // Moon Silver — primary text
          dim:     '#A8BEB4',  // Moon Silver dimmed — secondary text
          line:    '#3D5445',  // Subtle divider against dark bg
        },
        // Venus Gold — buttons, key accents (15% usage)
        brass: {
          DEFAULT: '#C9A84C',  // Venus Gold
          bright:  '#DFC070',  // Venus Gold highlight
          dim:     '#9A7C35',  // Venus Gold shadow
        },
        // Mercury Green — CTA panels, active states (12% usage)
        blood: {
          DEFAULT: '#4A6B55',  // Mercury Green
          bright:  '#5C7A64',  // Virgo Green (secondary buttons)
        },
        // Libra Steel — secondary UI, inactive labels (8% usage)
        muted: '#8FA4B0',
        // Virgo Green — secondary buttons (named token)
        virgo: '#5C7A64',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body:    ['"Inter"', 'sans-serif'],
        data:    ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      maxWidth: {
        site: '1320px',
      },
      
    },
  },
  plugins: [],
};
