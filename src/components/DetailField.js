import React from 'react';
import { Linking } from 'react-native';
import { ListItem, Avatar } from 'react-native-material-ui';

export default class DetailField extends React.Component {
  openURL = () => Linking.openURL(this.props.url);

  render = () => {
    const { icon, title, value, url, ...rest } = this.props;

    if (!value) return null;

    return (
      <ListItem
        leftElement={<Avatar icon={icon} />}
        centerElement={{
          primaryText: String(title),
          secondaryText: String(value),
        }}
        numberOfLines={'dynamic'}
        onPress={url && this.openURL}
        {...rest}
      />
    );
  };
}
