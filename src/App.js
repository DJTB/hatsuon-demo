import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import GithubCorner from 'react-github-corner';
import PitchPattern from './PitchPattern';

const pad = 0.75;
const bgColorHeader = '#222';
const textColorHeader = '#fefefe';
const fontEn =
  "system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Cantarell,'Helvetica Neue',sans-serif";
const fontJa =
  "'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'TakaoPゴシック' , TakaoPGothic, '游ゴシック', '游ゴシック体', YuGothic, 'Yu Gothic', 'メイリオ', Meiryo, 'ＭＳ ゴシック', 'MS Gothic', HiraKakuProN-W3, 'MotoyaLCedar', 'Droid Sans Japanese', sans-serif";

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: ${fontEn};

    & *[lang="ja"] {
      font-family: ${fontJa};
    }
  }
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: ${bgColorHeader};
  color: ${textColorHeader};
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
        <GithubCorner
          href="https://github.com/DJTB/hatsuon"
          octoColor={bgColorHeader}
          bannerColor={textColorHeader}
        />
        <Header>
          <Title lang="ja">発音</Title>
          <Intro>
            Enter a Japanese word as hiragana and the{' '}
            <a href="https://www.weblio.jp/content/%E7%99%BA%E9%9F%B3">pitch accent number</a> to
            visualize the word’s pronunciation.
          </Intro>
        </Header>
        <Controls>
          <Input
            lang="ja"
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
