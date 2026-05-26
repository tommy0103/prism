import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    colors: {
      p: {
        bg: 'var(--p-bg)',
        'bg-secondary': 'var(--p-bg-secondary)',
        'bg-tertiary': 'var(--p-bg-tertiary)',
        'bg-hover': 'var(--p-bg-hover)',
        surface: 'var(--p-surface)',
        text: 'var(--p-text)',
        'text-secondary': 'var(--p-text-secondary)',
        'text-light': 'var(--p-text-light)',
        border: 'var(--p-border)',
        'border-strong': 'var(--p-border-strong)',
        divider: 'var(--p-divider)',
        accent: 'var(--p-accent)',
        'accent-text': 'var(--p-accent-text)',
        'accent-bg': 'var(--p-accent-bg)',
        success: 'var(--p-success)',
        'success-text': 'var(--p-success-text)',
        'success-bg': 'var(--p-success-bg)',
        warning: 'var(--p-warning)',
        'warning-text': 'var(--p-warning-text)',
        'warning-bg': 'var(--p-warning-bg)',
        danger: 'var(--p-danger)',
        'danger-text': 'var(--p-danger-text)',
        'danger-bg': 'var(--p-danger-bg)',
        info: 'var(--p-info)',
        'info-text': 'var(--p-info-text)',
        'info-bg': 'var(--p-info-bg)',
        purple: 'var(--p-purple)',
        'purple-text': 'var(--p-purple-text)',
        'purple-bg': 'var(--p-purple-bg)',
      },
    },
    fontFamily: {
      display: 'var(--p-font-display)',
      body: 'var(--p-font-body)',
      mono: 'var(--p-font-mono)',
    },
    borderRadius: {
      p: 'var(--p-radius)',
      'p-lg': 'var(--p-radius-lg)',
    },
    boxShadow: {
      'p-sm': 'var(--p-shadow-sm)',
      p: 'var(--p-shadow)',
      'p-lg': 'var(--p-shadow-lg)',
    },
    spacing: {
      'p-1': 'var(--p-space-1)',
      'p-2': 'var(--p-space-2)',
      'p-3': 'var(--p-space-3)',
      'p-4': 'var(--p-space-4)',
      'p-5': 'var(--p-space-5)',
      'p-6': 'var(--p-space-6)',
      'p-7': 'var(--p-space-7)',
      'p-8': 'var(--p-space-8)',
    },
    easing: {
      p: 'var(--p-ease)',
    },
    duration: {
      p: 'var(--p-duration)',
      'p-fast': 'var(--p-duration-fast)',
    },
  },
})
