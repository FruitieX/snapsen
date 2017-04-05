import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { connectStyle } from '@shoutem/theme';
import mapPropsToStyleNames from 'native-base/dist/src/Utils/mapPropsToStyleNames';

class List extends Component {
  render() {
    return (
      <FlatList
        {...this.props}
        data={this.props.dataArray}
        renderItem={this.props.renderRow}
      />
    );
  }
}
const StyledList = connectStyle('NativeBase.List', {}, mapPropsToStyleNames)(List);

export {
  StyledList as NBFlatList,
};
