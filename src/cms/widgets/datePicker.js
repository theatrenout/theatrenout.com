import React from "react";


export class DatePickerControl extends React.Component {
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
    const date = this.getValue();
    return (
      <div>
        <input
          type='date'
          value={date}
          onChange={value => this.onChange(value)}
          className="nc-controlPane-widget"
        />
      </div>
    );
  }
}

export class DatePickerPreview extends React.Component {
  render() {
    return (
      <div>
        Date : {this.props.value}
      </div>
    )
  }
}
