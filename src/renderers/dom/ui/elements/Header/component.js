// Libraries
const React = require('react');

// Styles
require('./style.scss');

// Images
const images = {
  logo: require('../../images/logo.png')
};

// Header class
class Header extends React.Component {

  render () {
    return (
      <header className="header">
        <img src={images.logo} />

        <a href="./templates/nature-sm-template.psd" target="_blank">Download PSD template</a>

        <a href="http://github.com/times/cardkit" target="_blank">About CardKit</a>
      </header>
    );
  }

}

Header.propTypes = {}

// Export
module.exports = Header;
