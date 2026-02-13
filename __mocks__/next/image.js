const React = require('react')

module.exports = function MockImage({ src, alt, ...props }) {
  return React.createElement('img', { src, alt, ...props })
}
