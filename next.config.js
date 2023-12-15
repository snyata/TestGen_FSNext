module.exports = {
    // Place any environment variables here if needed. 
    // For example, if you're using an external API:
    env: {
      API_BASE_URL: 'localhost:3000/api/v1/',
    },
  
    // If you need to add additional configurations like custom webpack config, 
    // headers, or redirects, you can add them here.
  
    // Example of adding a simple redirect (optional)
    async redirects() {
      return [
        {
          source: '/old-route',
          destination: '/new-route',
          permanent: true,
        },
      ];
    },
  
    // Enable React strict mode (optional but recommended)
    reactStrictMode: true,
  };
  