import React from "react";
import Picker from "react-month-picker";
import "react-month-picker/css/month-picker.css";


export class MonthPickerControl extends React.Component {
  constructor(props) {
    super(props);

    this.monthpicker = null;

    this.getDisplayValue = this.getDisplayValue.bind(this);
    this.getObjectValue = this.getObjectValue.bind(this);
    this.onClickInput = this.onClickInput.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  getDisplayValue() {
    if (this.props.value) {
      const date = new Date(this.props.value);
      return date.toLocaleString('fr-FR', { year: 'numeric', month: 'long' });
    }
    else {
      return '';
    }
  }

  getObjectValue() {
    return this.props.value ? {
      month: parseInt(this.props.value.split('-')[1]),
      year: parseInt(this.props.value.split('-')[0])
    }
    : {
      month: null,
      year: null
    };
  }

  onClickInput(e) {
    this.monthpicker.show();
  }

  onMonthChange(year, month) {
    if (year && month) {
      let monthString = month.toString();
      if (monthString.length < 2) {
        monthString = 0 + monthString;
      }
      let dateText = year + '-' + monthString;
      this.props.onChange(dateText);
    }
  }

  onClear(e) {
    e.preventDefault();
    this.props.onChange('');
  }

  render() {
    let pickerLang = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
    const displayValue = this.getDisplayValue();
    const objectValue = this.getObjectValue();

    return (
      <div
        className="nc-controlPane-widget"
      >
        <Picker
          ref={div => this.monthpicker = div}
          value={objectValue}
          lang={pickerLang}
          years={{min: 1995}}
          onChange={this.onMonthChange}
        >
          <input
            type='text'
            onClick={this.onClickInput}
            value={displayValue}
          />
        </Picker>
        <button
          onClick={this.onClear}
        >Effacer</button>
      </div>
    );
  }
}

export class MonthPickerPreview extends React.Component {
  constructor(props) {
    super(props);

    this.getDisplayValue = this.getDisplayValue.bind(this);
  }

  getDisplayValue() {
    if (this.props.value) {
      let date = new Date(this.props.value);
      return date.toLocaleString('fr-FR', { year: 'numeric', month: 'long' });
    }
    else {
      return '';
    }
  }

  render() {
    const value = this.getDisplayValue();
    return (
      <div>
        Création : {value}
      </div>
    )
  }
}
