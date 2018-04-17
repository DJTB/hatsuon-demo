import React, { Component } from 'react';
import styled from 'styled-components';
import PitchPattern from './PitchPattern';

const pad = 0.75;

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #222;
  color: white;
  font-size: 2rem;
  padding: ${pad}em;
`;

const Title = styled.h1`
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: ${pad}rem;
`;

const Intro = styled.p`
  font-size: large;
  margin: ${pad}rem;
  & a,
  & a:visited {
    color: lightgrey;
  }
`;

const Input = styled.input`
  display: block;
  font-size: 1.25rem;
  margin: 0.5rem;
  padding: 0.2rem;
`;

class App extends Component {
  state = {
    reading: 'はつおん',
    pitchNum: 0,
  };

  setReading = ({ target: { value } }) => this.setState({ reading: value });
  setPitchNum = ({ target: { value } }) => this.setState({ pitchNum: +value });

  render() {
    return (
      <Wrapper>
        <Header>
          <Title>発音</Title>
          <Intro>
            Enter a Japanese word as hiragana and the{' '}
            <a href="https://www.weblio.jp/content/%E7%99%BA%E9%9F%B3">pitch accent number</a> to
            visualize the word’s pronunciation.
          </Intro>
        </Header>
        <Controls>
          <Input
            name="reading"
            type="text"
            placeholder="よみかた"
            onChange={this.setReading}
            defaultValue={this.state.reading}
          />
          <Input
            name="pitch"
            type="number"
            onChange={this.setPitchNum}
            min={0}
            max={this.state.reading.length}
            defaultValue={this.state.pitchNum}
          />
        </Controls>
        <PitchPattern
          reading={this.state.reading}
          pitchNum={this.state.pitchNum}
          showMora
          showLabel
        />
      </Wrapper>
    );
  }
}

export default App;
