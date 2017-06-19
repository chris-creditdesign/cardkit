// Libraries
const React = require('react');

// TextFill class
class TextFillControl extends React.Component {

  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    let element = e.target;
    this.props.onNewValue('fill', element.value);
  }

  render () {
    let fillOpts = [
      { attr: '#FFFFFF', show: 'White' },
      { attr: '#808080', show: 'Grey' },
      { attr: '#000000', show: 'Black' }
    ];

    if (!this.props.layer.editable.fill) return null;

    if (this.props.layer.editable.fill === true && this.props.layer.type === 'text') {
      // Check that this is a text layer
      return (
        <div>
          <strong>Colour</strong>
          <select defaultValue={this.props.layer.fill}
            onChange={this.handleChange}>
            {fillOpts.map((option, index) => {
              return (<option key={index} value={option.attr}>{option.show}</option>);
            })}
          </select>
        </div>
      )
    } else {
      return null;
    }
  }
}

TextFillControl.propTypes = {
  onNewValue: React.PropTypes.func.isRequired,
  layer: React.PropTypes.object.isRequired
}

// Export
module.exports = TextFillControl;
