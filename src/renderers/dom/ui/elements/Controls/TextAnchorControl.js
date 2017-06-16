// Libraries
const React = require('react');

// TextAnchor class
class TextAnchorControl extends React.Component {

  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    let element = e.target;
    this.props.onNewValue('textAnchor', element.value);
  }

  render () {
    let alignOpts = [
      { attr: 'start', show: 'left' },
      { attr: 'middle', show: 'center' },
      { attr: 'end', show: 'right' }
    ];

    if (!this.props.layer.editable.textAnchor) return null;

    if (this.props.layer.editable.textAnchor === true) {
      // We have a select
      return (
        <div>
          <strong>Text Align</strong>
          <select defaultValue={this.props.layer.textAnchor}
            onChange={this.handleChange}>
            {alignOpts.map((option, index) => {
              return (<option key={index} value={option.attr}>{option.show}</option>);
            })}
          </select>
        </div>
      );
    }
  }
}

TextAnchorControl.propTypes = {
  onNewValue: React.PropTypes.func.isRequired,
  layer: React.PropTypes.object.isRequired
}

// Export
module.exports = TextAnchorControl;
