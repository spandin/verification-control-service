export default () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  HOST: process.env.HOST || 'http://localhost:3000',
})
