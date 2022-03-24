import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { styles } from './CodeReedemStyle';
import IconURL from '../../../style/IconURL';
import Color from '../../../style/Color'

export default function CodeReedem(props) {
  const {uploading} = props;
  //state --- codeReedem
  const [codeReedem, setCodeReedem] = useState();

  //button --- get promotion code
  const onGetPromotionCode = () => {
    props.onGetPromotionCode(codeReedem);
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: IconURL.codeReedemImg}} style={styles.image}/>
      <Text style={styles.bigText}>Nhập mã giới thiệu</Text>
      <Text style={styles.smallText}>Bạn đã có mã giới thiệu từ bạn bè? Hãy nhập vào bên dưới nhé</Text>
      <TextInput onChangeText={text => setCodeReedem(text)} placeholder='Nhập mã giới thiệu' placeholderTextColor={Color.placeholder} style={styles.codeReedemInput}/>
      {uploading ? (
        <View style={styles.codeReedemBtn}>
        <ActivityIndicator size={'large'} color={Color.primary}/>
      </View>
      ) : (
        <TouchableOpacity style={styles.codeReedemBtn} onPress={onGetPromotionCode}>
        <Text style={styles.codeReedemBtnText}>Xác nhận</Text>
      </TouchableOpacity>
      )}
    </View>
  )
}