module.exports = {
  ci: {
    collect: {
      url: ['https://insight-edge-beta.vercel.app/'],
      numberOfRuns: 3,
      startServerCommand: '',
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'csp-xss': 'off',
        'total-byte-weight': 'warn',
        'unused-javascript': 'warn',
        'categories:performance': ['error', { minScore: 0.5 }],
      },
    },
  },
};
