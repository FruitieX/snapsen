import React from 'react';
import { Image } from 'react-native';
import { Drawer, Avatar, COLOR } from 'react-native-material-ui';
import { statusBarPadding, SnapsenAvatar } from '../components/styled';

export default class SnapsenDrawer extends React.Component {
  render() {
    return (
      <Drawer>
        <Drawer.Header
          style={{
            contentContainer: {
              paddingTop: statusBarPadding,
              backgroundColor: COLOR.brown300,
            },
          }}
        >
          <Drawer.Header.Account
            avatar={<Avatar image={<SnapsenAvatar />} />}
            footer={{
              centerElement: {
                primaryText: 'Snapsen',
              },
            }}
            style={{
              container: {
                color: 'white',
              },
            }}
          />
        </Drawer.Header>
        <Drawer.Section
          divider
          items={[
            {
              icon: 'music-note',
              value: 'Songs',
              active: this.props.activeItemKey === 'SongsNavigator',
              onPress: () => this.props.navigation.navigate('SongsNavigator'),
            },
            {
              icon: 'book',
              value: 'Songbooks',
              active: this.props.activeItemKey === 'BooksNavigator',
              onPress: () => this.props.navigation.navigate('BooksNavigator'),
            },
          ]}
        />
      </Drawer>
    );
  }
}
