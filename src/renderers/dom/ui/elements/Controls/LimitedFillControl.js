// Libraries
const React = require('react');

// TextFill class
class LimitedFillControl extends React.Component {

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
      { attr: '#000000', show: 'Black' }
    ];

    if (!this.props.layer.editable.fill) return null;

    if (this.props.layer.editable.fill === true) {
      // Check that this is a text layer
      if (this.props.layer.type === 'text' || this.props.layer.type === 'path' || this.props.layer.type === 'rectangle') {
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
    } else {
      return null;
    }
  }
}

LimitedFillControl.propTypes = {
  onNewValue: React.PropTypes.func.isRequired,
  layer: React.PropTypes.object.isRequired
}

// Export
module.exports = LimitedFillControl;
