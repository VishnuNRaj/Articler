import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', ...fontFamily.sans],
        body: ['var(--font-body)', ...fontFamily.sans]
      },
      colors: {
        error: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        black:"bg-black",
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
        full:"rounded-full"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'popover-show': 'popover-show 0.4s ease-out',
        'popover-hide': 'popover-hide 0.2s ease-in',
      },
    },
    colors: {
      "border": "hsl(var(--border))",
      "input": "hsl(var(--input))",
      "ring": "hsl(var(--ring))",
      "background": "hsl(var(--background))",
      "foreground": "hsl(var(--foreground))",
      "primary": {
        "DEFAULT": "hsl(var(--primary))",
        "foreground": "hsl(var(--primary-foreground))"
      },
      "secondary": {
        "DEFAULT": "hsl(var(--secondary))",
        "foreground": "hsl(var(--secondary-foreground))"
      },
      "destructive": {
        "DEFAULT": "hsl(var(--destructive))",
        "foreground": "hsl(var(--destructive-foreground))"
      },
      "muted": {
        "DEFAULT": "hsl(var(--muted))",
        "foreground": "hsl(var(--muted-foreground))"
      },
      "accent": {
        "DEFAULT": "hsl(var(--accent))",
        "foreground": "hsl(var(--accent-foreground))"
      },
      "popover": {
        "DEFAULT": "hsl(var(--popover))",
        "foreground": "hsl(var(--popover-foreground))"
      },
      "card": {
        "DEFAULT": "hsl(var(--card))",
        "foreground": "hsl(var(--card-foreground))"
      }
    },
    borderRadius: {
      "lg": "var(--radius)",
      "md": "calc(var(--radius) - 2px)",
      "sm": "calc(var(--radius) - 4px)"
    },
    keyframes: {
      "accordion-down": {
        "from": {
          "height": "0"
        },
        "to": {
          "height": "var(--radix-accordion-content-height)"
        }
      },
      "accordion-up": {
        "from": {
          "height": "var(--radix-accordion-content-height)"
        },
        "to": {
          "height": "0"
        }
      },
      'popover-show': {
        '0%': { opacity: '0', transform: 'scale(0.95)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
      'popover-hide': {
        '0%': { opacity: '1', transform: 'scale(1)' },
        '100%': { opacity: '0', transform: 'scale(0.95)' },
      },
    }
  },
  plugins: [import("tailwindcss-animate"), import("tailwindcss-animate")],
};

// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;
