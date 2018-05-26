import React from "react";
import styled from "styled-components";
import { List } from "immutable";
import { SelectList } from "react-widgets";


const Container = styled.div`
  & li {
    list-style: none;
  }
`

export class MultipleSelectControl extends React.Component {
  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  getValue() {
    if (this.props.value) {
      return this.props.value.toArray();
    }
    else {
      return [];
    }
  }

  onSelect(selected) {
    this.props.onChange(List(selected));
  }

  render() {
    const value = this.getValue();

    return (
      <Container className="nc-controlPane-widget">
        <SelectList
          defaultValue={value}
          multiple={true}
          onChange={this.onSelect}
          data={['Adulte', 'Tout public', 'Jeune public', 'Troupe']}
        />
    </Container>
    );
  }
}

export class MultipleSelectPreview extends React.Component {
  render() {
    return (
      <div>
        {this.props.value.map((value) => value)}
      </div>
    )
  }
}
