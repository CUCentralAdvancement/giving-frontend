module.exports = {
  eslint: {
    // Warning: Vercel pretentiously added eslint runs during the build
    // phase, but implmented it poorly. So now they make you add this line
    // even though your CI lint check passes...maybe you should stop using
    // Node.js entirely...just a thought.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/confirmation',
        destination: 'http://localhost:4000/api/confirmation'
      },
      {
        source: '/api/graphql',
        destination: 'http://localhost:4000/graphql'
      },
    ]
  }
}
