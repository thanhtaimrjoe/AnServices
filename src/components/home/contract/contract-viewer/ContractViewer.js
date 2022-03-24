import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './ContractViewerStyle';
import Pdf from 'react-native-pdf';

export default function ContractViewer(props) {
  //get param from previous page
  const {contractUrl} = props.route.params;
  return (
    <View style={styles.container}>
      <Pdf source={{uri: contractUrl, cache: true}} style={styles.pdf} />
    </View>
  );
}
