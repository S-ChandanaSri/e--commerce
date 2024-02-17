
module.exports = {
    webpack: (config, {isServer}) => {
      if (!isServer) {
        config.node = {
          path:'false',
          crypto: 'empty',
          stream: 'empty',
        };
      }
  
      return config;
    },
  };
  