/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        'glow-blue': 'rgba(37, 99, 235, 0.1)',
        'node-blue': '#3b82f6', // Blue for web frontend nodes
        'node-green': '#10b981', // Green for backend nodes
        'node-yellow': '#fbbf24', // Yellow for notification services
        'connector-gray': '#a1a1aa', // Connector line color
        'hover-glow': 'rgba(255, 255, 255, 0.2)',
      },
      width: {
        circle: '800px',
        'small-circle': '80px',
        'center-circle': '256px',
        'nav-circle': '96px',
      },
      height: {
        circle: '800px',
        'small-circle': '80px',
        'center-circle': '256px',
        'nav-circle': '96px',
      },
      blur: {
        glow: '120px',
      },
      spacing: {
        'circle-offset': '400px',
        'orbit-radius': '250px',
      },
      keyframes: {
        slideDown: {
          '0%': { 
            transform: 'translateY(-10px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        slideUp: {
          '0%': { 
            transform: 'translateY(10px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        fadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        scaleIn: {
          '0%': { 
            transform: 'scale(0.9)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        gradientSpin: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': '0% 50%'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': '100% 50%'
          }
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.6)',
          },
        },
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out forwards',
        slideUp: 'slideUp 0.2s ease-out forwards',
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        scaleIn: 'scaleIn 0.2s ease-out forwards',
        gradientSpin: 'gradientSpin 3s ease infinite',
        pulseGlow: 'pulseGlow 1.5s infinite',
      }
    },
  },
  plugins: [],
};