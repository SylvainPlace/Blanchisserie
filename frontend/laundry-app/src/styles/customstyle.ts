import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

/**
 * Custom Light Theme pour BlanchisseriePro
 * Couleurs principales: Bleu #163369 et Orange #ee8c21
 * Basé sur le preset Aura de PrimeNG v19
 */
export const CustomStyle = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0f4f8',
      100: '#d9e6f2',
      200: '#b8d0e6',
      300: '#8fb5d6',
      400: '#6299c4',
      500: '#4a7eb3',
      600: '#3867a0',
      700: '#2d5489',
      800: '#204471',
      900: '#163369',
      950: '#0f2548'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#163369',
          contrastColor: '#ffffff',
          hoverColor: '#2d5489',
          activeColor: '#0f2548'
        },
        highlight: {
          background: '#163369',
          focusBackground: '#2d5489',
          color: '#ffffff',
          focusColor: '#ffffff'
        },
        surface: {
          0: '#ffffff',
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#163369',
          950: '#0f2548'
        }
      }
    }
  },
  primitive: {
    borderRadius: {
      none: '0',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px'
    },
    // Couleurs principales
    emerald: {
      50: '#fff9f0',
      100: '#ffefd9',
      200: '#ffddb3',
      300: '#ffc782',
      400: '#ffa54f',
      500: '#ff8c29',
      600: '#ee8c21',
      700: '#d17a1a',
      800: '#b56714',
      900: '#9c5811',
      950: '#7d4510'
    },
    blue: {
      50: '#f0f4f8',
      100: '#d9e6f2',
      200: '#b8d0e6',
      300: '#8fb5d6',
      400: '#6299c4',
      500: '#4a7eb3',
      600: '#3867a0',
      700: '#2d5489',
      800: '#204471',
      900: '#163369',
      950: '#0f2548'
    },
    // Couleurs de statut
    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },
    yellow: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006'
    }
  },
  components: {
    button: {
      root: {
        paddingX: '1rem',
        paddingY: '0.75rem',
        borderRadius: '{border.radius.md}',
        gap: '0.5rem',
        fontWeight: '600',
        fontSize: '1rem',
        focusRing: {
          width: '2px',
          style: 'solid',
          color: '{primary.color}',
          offset: '2px',
          shadow: 'none'
        },
        transitionDuration: '{transition.duration}'
      },
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '#ee8c21',
              hoverBackground: '#d17a1a',
              activeBackground: '#b56714',
              borderColor: '#ee8c21',
              hoverBorderColor: '#d17a1a',
              activeBorderColor: '#b56714',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            secondary: {
              background: '#6c757d',
              hoverBackground: '#5a6268',
              activeBackground: '#495057',
              borderColor: '#6c757d',
              hoverBorderColor: '#5a6268',
              activeBorderColor: '#495057',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            info: {
              background: '#163369',
              hoverBackground: '#2d5489',
              activeBackground: '#0f2548',
              borderColor: '#163369',
              hoverBorderColor: '#2d5489',
              activeBorderColor: '#0f2548',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            success: {
              background: '{green.500}',
              hoverBackground: '{green.600}',
              activeBackground: '{green.700}',
              borderColor: '{green.500}',
              hoverBorderColor: '{green.600}',
              activeBorderColor: '{green.700}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            warn: {
              background: '{yellow.500}',
              hoverBackground: '{yellow.600}',
              activeBackground: '{yellow.700}',
              borderColor: '{yellow.500}',
              hoverBorderColor: '{yellow.600}',
              activeBorderColor: '{yellow.700}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            help: {
              background: '{blue.500}',
              hoverBackground: '{blue.600}',
              activeBackground: '{blue.700}',
              borderColor: '{blue.500}',
              hoverBorderColor: '{blue.600}',
              activeBorderColor: '{blue.700}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            danger: {
              background: '{red.500}',
              hoverBackground: '{red.600}',
              activeBackground: '{red.700}',
              borderColor: '{red.500}',
              hoverBorderColor: '{red.600}',
              activeBorderColor: '{red.700}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            contrast: {
              background: '{surface.900}',
              hoverBackground: '{surface.800}',
              activeBackground: '{surface.700}',
              borderColor: '{surface.900}',
              hoverBorderColor: '{surface.800}',
              activeBorderColor: '{surface.700}',
              color: '{surface.0}',
              hoverColor: '{surface.0}',
              activeColor: '{surface.0}'
            }
          }
        }
      }
    },
    inputtext: {
      root: {
        background: '{surface.0}',
        disabledBackground: '{surface.200}',
        filledBackground: '{surface.50}',
        filledHoverBackground: '{surface.50}',
        filledFocusBackground: '{surface.50}',
        borderColor: '{surface.300}',
        hoverBorderColor: '{surface.400}',
        focusBorderColor: '#163369',
        invalidBorderColor: '{red.400}',
        color: '{surface.700}',
        disabledColor: '{surface.500}',
        placeholderColor: '{surface.500}',
        shadow: 'none',
        paddingX: '0.75rem',
        paddingY: '0.75rem',
        borderRadius: '{border.radius.md}',
        focusRing: {
          width: '2px',
          style: 'solid',
          color: 'rgba(22, 51, 105, 0.2)',
          offset: '0',
          shadow: 'none'
        },
        transitionDuration: '{transition.duration}'
      }
    },
    card: {
      root: {
        background: '{surface.0}',
        borderRadius: '{border.radius.xl}',
        color: '{surface.700}',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
      },
      body: {
        padding: '1.5rem',
        gap: '0.5rem'
      },
      caption: {
        gap: '0.5rem'
      },
      title: {
        fontSize: '1.5rem',
        fontWeight: '600'
      },
      subtitle: {
        color: '{surface.600}'
      }
    },
    toast: {
      root: {
        borderRadius: '{border.radius.md}',
        borderWidth: '1px',
        transitionDuration: '{transition.duration}'
      },
      icon: {
        size: '1.125rem'
      },
      content: {
        padding: '0.75rem 1rem',
        gap: '0.5rem'
      },
      text: {
        gap: '0.5rem'
      },
      summary: {
        fontWeight: '500',
        fontSize: '1rem'
      },
      detail: {
        fontSize: '0.875rem',
        color: 'inherit'
      },
      closeButton: {
        width: '1.75rem',
        height: '1.75rem',
        borderRadius: '50%',
        focusRing: {
          width: '2px',
          style: 'solid',
          offset: '2px'
        }
      },
      closeIcon: {
        size: '1rem'
      },
      colorScheme: {
        light: {
          blur: '1.5rem',
          info: {
            background: 'rgba(219, 234, 254, 0.95)',
            borderColor: '#163369',
            color: '#163369',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          success: {
            background: 'rgba(220, 252, 231, 0.95)',
            borderColor: '{green.500}',
            color: '{green.700}',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          warn: {
            background: 'rgba(255, 243, 205, 0.95)',
            borderColor: '{yellow.500}',
            color: '{yellow.700}',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          error: {
            background: 'rgba(254, 242, 242, 0.95)',
            borderColor: '{red.500}',
            color: '{red.700}',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          secondary: {
            background: '{surface.100}',
            borderColor: '{surface.200}',
            color: '{surface.600}',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.50}',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  }
});

export default CustomStyle;
