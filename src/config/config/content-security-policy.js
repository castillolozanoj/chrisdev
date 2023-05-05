module.exports = function (environment) {
  return {
    directives: {
      'default-src': ["'none'"],
      'script-src': ["'self'", 'https://code.jquery.com/jquery-3.6.0.min.js', 'https://www.googletagmanager.com/gtag/js?id=UA-150948906-1'],
      'font-src': ["'self'", 'http://fonts.gstatic.com'],
      'connect-src': ["'self'"],
      'img-src': ["'self'", 'https://img.icons8.com'],
      'style-src': ["'self'", 'https://fonts.googleapis.com'],
      'media-src': null
    }
  }
}
