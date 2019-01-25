import * as React from 'react';
import styled from 'styled-components/native';
import Voice from 'react-native-voice';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;
const ButtonRecord = styled.Button``;
const VoiceText = styled.Text`
  margin: 32px;
`;
interface Props {}
interface State {
  isRecord: boolean;
  voice: string;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isRecord: false,
      voice: undefined,
    };

    Voice.onSpeechStart = this._onSpeechStart;
    Voice.onSpeechEnd = this._onSpeechEnd;
    Voice.onSpeechResults = this._onSpeechResults;
    Voice.onSpeechError = this._onSpeechError;
  }
  render() {
    const { isRecord, voice } = this.state;
    const buttonLabel = isRecord ? 'Stop' : 'Start';
    const voiceLabel = voice
      ? voice
      : isRecord
      ? 'Say something...'
      : 'press Start button';
    return (
      <Container>
        <VoiceText>{voiceLabel}</VoiceText>
        <ButtonRecord onPress={this._onRecordVoice} title={buttonLabel} />
      </Container>
    );
  }

  private _onSpeechStart = event => {
    console.log('onSpeechStart');
    this.setState({
      voice: '',
    });
  };
  private _onSpeechEnd = event => {
    console.log('onSpeechEnd');
  };
  private _onSpeechResults = event => {
    console.log('onSpeechResults');
    this.setState({
      voice: event.value[0],
    });
  };
  private _onSpeechError = event => {
    console.log('_onSpeechError');
    console.log(event.error);
  };

  private _onRecordVoice = () => {
    const { isRecord } = this.state;
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start('en-US');
    }
    this.setState({
      isRecord: !isRecord,
    });
  };
}
