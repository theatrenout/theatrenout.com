import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css"
import moment from "moment";
import "moment/locale/fr";



export class DatetimePickerControl extends React.Component {
  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  getValue() {
    return this.props.value ? this.props.value : '';
  }

  onChange(m) {
    this.props.onChange(m.format());
  }

  onClear(e) {
    e.preventDefault();
    this.props.onChange('');
  }

  render() {
    const time = moment(this.getValue());
    return (
      <div
        className="nc-controlPane-widget"
      >
        <Datetime
          value={time}
          onChange={value => this.onChange(value)}
          dateFormat="dddd D MMMM Y"
        />
      <button
          onClick={this.onClear}
        >Effacer</button>
      </div>
    );
  }
}

export class DatetimePickerPreview extends React.Component {
  render() {
    return (
      <div>
        Heure : {this.props.value}
      </div>
    )
  }
}
