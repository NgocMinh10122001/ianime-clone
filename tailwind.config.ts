import type { Config } from 'tailwindcss'

const config: Config = {

  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      
      padding: '1rem',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        
      },
      width: {
        '0375': '0.375rem',
        '268':'16.75rem',
        '296': '18.5rem',
        '300': '18.75rem',
        '304': '19rem',

        
      },
      borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
      height: {
        '206':'12.875rem',
        '228':'14.25rem',
        '420': '26.25rem',
        '564': '35.25rem',
        '572': '35.75rem'
        
        
      },
      spacing: {
        '80':'80%',
        '85':'85%',
        '90' : '90%'
      }
    },
  },
  plugins: [],
}
export default config
