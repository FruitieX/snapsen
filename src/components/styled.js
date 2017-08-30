import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import SnapsenIcon from '../../assets/snapsen.png';
import Color from 'color';

export const SnapsenAvatar = styled.Image.attrs({
  source: SnapsenIcon,
})`
  height: 56px;
  width: 56px;
`;

export const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Bold = styled.Text`font-weight: bold;`;

export const WelcomeText = styled.Text`
  color: #4b5c5d;
  font-size: 28;
  text-align: center;
  padding: 16px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #fff;
  margin: 16px;
`;

export const FlexRow = styled.View`flex-direction: row;`;

export const statusBarPadding =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const StatusBarPadding = styled.View`
  padding-top: ${statusBarPadding};
  background-color: ${props => props.backgroundColor};
  elevation: 4;
`;

export const AppContainer = styled.View`
  flex: 1;
  ${'' /* padding-top: ${statusBarPadding}; */};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const Lyrics = styled.Text`
  line-height: 30px;
  font-size: 18px;
`;

export const PreLyrics = styled.Text`
  padding-bottom: ${props => (props.children ? '16px' : '0px')};
  color: #aaa;
`;
export const PostLyrics = styled.Text`
  padding-top: ${props => (props.children ? '16px' : '0px')};
  color: #aaa;
`;

export const Padding = styled.View`padding: 16px;`;

export const NoteField = styled.TextInput.attrs({
  multiline: true,
})`
  margin-horizontal: 8px;
  textAlignVertical: top;
  padding-horizontal: 10px;
  padding-bottom: 20px;
  font-size: 20px;
`;

export const BookFilter = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 16px;
  opacity: ${props => (props.active ? 1 : 0.2)};
`;

export const BookFilterTitle = styled.Text`
  text-align: center;
  padding: 10px;
`;

export const TypeBadge = styled.View`
  height: 30px;
  border-radius: 15px;
  paddingVertical: 2px;
  paddingHorizontal: 10px;
  margin: 10px;
  background-color: ${props =>
    Color(props.backgroundColor || '#aaa')
      .fade(props.active ? 0 : 0.8)
      .string()};
`;

export const Type = styled.Text`
  font-size: 18px;
  color: white;
`;

export const FilterContainer = styled.View`paddingVertical: 4px;`;
