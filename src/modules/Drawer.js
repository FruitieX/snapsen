import React from 'react';
import { Drawer, Avatar, COLOR } from 'react-native-material-ui';

export default class SnapsenDrawer extends React.Component {
  render() {
    return (
      <Drawer>
        <Drawer.Header
          style={{
            contentContainer: {
              backgroundColor: COLOR.brown300,
            },
          }}
        >
          {/* <Drawer.Header.Account
          avatar={<Avatar text={'A'} />}
          footer={{
            dense: true,
            centerElement: {
              primaryText: 'Reservio',
              secondaryText: 'business@email.com',
            },
            rightElement: 'arrow-drop-down',
          }}
        /> */}
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
        <Drawer.Section
          items={[
            {
              icon: 'settings',
              value: 'Settings',
              active: this.props.activeItemKey === 'SettingsNavigator',
              onPress: () =>
                this.props.navigation.navigate('SettingsNavigator'),
            },
          ]}
        />
      </Drawer>
    );
  }
}
