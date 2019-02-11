const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.API_HOST': prod
    ? 'https://api.example.com'
    : 'http://localhost:4000'
}