const environments = {
  development: {
    seedData: true,
    sampleDataCount: 20,
    clearExisting: true,
    logLevel: 'debug'
  },
  staging: {
    seedData: true,
    sampleDataCount: 50,
    clearExisting: false,
    logLevel: 'info'
  },
  production: {
    seedData: false,
    sampleDataCount: 0,
    clearExisting: false,
    logLevel: 'error'
  }
};

const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return environments[env];
};

module.exports = { getConfig }; 