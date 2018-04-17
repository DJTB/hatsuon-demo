import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LineChart, Line, Dot } from 'recharts';

import hatsuon from 'hatsuon';
import { getPitchPatternName } from 'hatsuon/dist/utils';

PitchDiagram.propTypes = {
  reading: PropTypes.string,
  pitchNum: PropTypes.number,
  showMora: PropTypes.bool,
  showLabel: PropTypes.bool,
  colors: PropTypes.shape({
    平板: PropTypes.string,
    頭高: PropTypes.string,
    中高: PropTypes.string,
    尾高: PropTypes.string,
    不詳: PropTypes.string,
  }),
};

PitchDiagram.defaultProps = {
  reading: '',
  pitchNum: -1,
  showMora: true,
  showLabel: false,
  colors: {
    平板: '#d20ca3',
    頭高: '#ea9316',
    中高: '#27a2ff',
    尾高: '#0cd24d',
    不詳: '#cccccc',
  },
};

const COLORS = {
  placeholder: '#bababa',
  white: '#fff',
};

const placeholder = '（ツ）';
const placeholderMorae = ['', '', '', placeholder, '', '', ''];
const placeholderData = [
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 1 },
];

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  padding: 0.6rem;
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.6rem;
`;

function PitchDiagram({ reading, pitchNum, showMora, showLabel, colors, ...rest }) {
  let { morae, pattern, patternName } = hatsuon({ reading, pitchNum });
  let moraCount = morae.length;
  let data = [];
  let color = colors[patternName];
  let patternNameEn = getPitchPatternName(morae.length, pitchNum, 'EN');

  if (pitchNum !== -1 && pattern.length) {
    data = pattern.map((pitch, i, pattern) => ({
      name: i === pattern.length - 1 ? 'particle' : `${morae[i]}`,
      pitchHeight: pitch,
    }));
  } else {
    morae = placeholderMorae;
    data = placeholderData;
    moraCount = 5;
    patternName = '不詳';
    color = colors['不詳'];
    patternNameEn = 'unknown';
  }

  return (
    <Wrapper>
      <LineChart
        width={(moraCount + 1) * 22}
        height={pitchNum < 0 ? 55 : 50}
        data={data}
        margin={{
          top: 20,
          right: 10,
          bottom: 10,
          left: 10,
        }}
        {...rest}
      >
        <Line
          isAnimationActive={false}
          dataKey="pitchHeight"
          label={(props) => (showMora ? getMoraLabel(morae, props) : null)}
          stroke={color}
          strokeWidth={2}
          dot={(dot) => (
            <Dot {...dot} fill={dot.payload.name === 'particle' ? COLORS.white : color} />
          )}
        />
      </LineChart>
      {showLabel && (
        <Label>
          <span lang="ja">{patternName} </span>
          <small>({patternNameEn})</small>
        </Label>
      )}
    </Wrapper>
  );
}

function getMoraLabel(morae, { x, y, stroke, index }) {
  const label = morae[index];
  const isPlaceholder = label === placeholder;
  return (
    <text
      x={x}
      y={y - 2}
      dy={isPlaceholder ? -11 : -8}
      fill={isPlaceholder ? COLORS.placeholder : stroke}
      fontSize={isPlaceholder ? 20 : 12}
      textAnchor="middle"
    >
      {label}
    </text>
  );
}

export default PitchDiagram;
