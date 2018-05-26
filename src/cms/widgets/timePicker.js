import React from "react";


export class TimePickerControl extends React.Component {
  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getValue() {
    return this.props.value ? this.props.value : '';
  }

  onChange(e) {
    this.props.onChange(e.currentTarget.value);
  }

  render() {
    const time = this.getValue();
    return (
      <div>
        <input
          type='time'
          value={time}
          onChange={value => this.onChange(value)}
          className="nc-controlPane-widget"
        />
      </div>
    );
  }
}

export class TimePickerPreview extends React.Component {
  render() {
    return (
      <div>
        Heure : {this.props.value}
      </div>
    )
  }
}
