import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import PepperoniLogoAsset from '../../assets/pepperoni-logo.png';
import PepperoniIconAsset from '../../assets/pepperoni-icon.png';

export const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PepperoniLogo = styled.Image.attrs({
  source: PepperoniLogoAsset,
  resizeMode: 'contain',
})`
  align-self: center;
  width: 80%;
`;

export const PepperoniIcon = styled.Image.attrs({
  source: PepperoniIconAsset,
  resizeMode: 'contain',
})`
  flex: 1;
  width: 70px;
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

const statusBarPadding =
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
  font-weight: bold;
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
  height: 200px;
  margin-horizontal: 16px;
  textAlignVertical: top;
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
  background-color: ${props => props.backgroundColor || '#aaa'};
  opacity: ${props => (props.active ? 1 : 0.2)};
`;

export const Type = styled.Text`
  font-size: 18px;
  color: white;
`;

export const FilterContainer = styled.View`paddingVertical: 4px;`;
