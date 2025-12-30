module.exports = {
  ci: {
    collect: {
      url: ['https://insight-edge-beta.vercel.app/'],
      numberOfRuns: 3,
      startServerCommand: '',
      settings: {
        preset: 'desktop',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['error', { minScore: 0.6 }],
        'unused-javascript': ['warn', { maxLength: 50000 }], // Giving some headroom
        'total-byte-weight': ['warn', { minScore: 0.6 }],
        'server-response-time': ['warn', { minScore: 0.5 }], // CI servers are often slow
        'bootup-time': 'warn',
        'mainthread-work-breakdown': 'warn',

        'landmark-one-main': 'error', // Keep this error but FIX your code with <main>
        'target-size': ['warn', { minScore: 0.7 }], // Standard buttons often hit 0.8

        'csp-xss': 'off',
        'modern-image-formats': ['warn', { maxLength: 2 }], // Allows for specific legacy assets

        'dom-size': ['warn', { minScore: 0.8 }],
      },
    },
  },
};
