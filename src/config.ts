export default {
  server: process.env.NODE_ENV === 'production' ? 'https://api.overfronted.net' : 'http://localhost:5000',
  cdn: '/static/image'
}
