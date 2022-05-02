import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './RequestMaterialStyle';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../../style/Color';
import IconURL from '../../../style/IconURL';

export default function RequestMaterial(props) {
  const {uploading, requestDetailItem, material} = props;
  //state --- materialList
  const [materialList, setMaterialList] = useState([]);

  //button --- add new object material
  const onAddMaterial = () => {
    setMaterialList([
      ...materialList,
      {
        id: 0,
        quantity: '',
        note: '',
        unit: '',
      },
    ]);
  };

  //get material unit by material id
  const getMaterialUnitByMaterialID = id => {
    var result = '';
    material.map((item, index) => {
      if (item.materialId === id) {
        result = item.unit;
      }
    });
    return result;
  };

  //handle picker
  const onHandlePicker = (text, index) => {
    materialList[index].id = text;
    const unit = getMaterialUnitByMaterialID(text);
    materialList[index].unit = unit;
    setMaterialList([...materialList]);
  };

  //handle quantity
  const onHandleQuantity = (text, index) => {
    if (text.length > 0 && text !== '.' && text !== '-') {
      materialList[index].quantity = parseInt(text);
    } else {
      materialList[index].quantity = '';
    }
    setMaterialList([...materialList]);
  };

  //handle note
  const onHandleNote = (text, index) => {
    materialList[index].note = text;
    setMaterialList([...materialList]);
  };

  //remove item in material list
  const onRemoveItem = index => {
    setMaterialList(materialList =>
      materialList.filter(item => item !== materialList[index]),
    );
  };

  //validation
  const checkValidate = () => {
    var result = true;
    var errorMsg = '';
    if (materialList.length === 0) {
      errorMsg = 'Bạn chưa nhập vật liệu';
      result = false;
    } else {
      materialList.map((item, index) => {
        if (
          item.id === 0 ||
          item.quantity.length === 0 ||
          item.quantity === 0
        ) {
          errorMsg = 'Vật liệu hay số lượng bạn nhập vào không đúng';
          result = false;
        }
      });
    }
    if (!result) {
      Alert.alert('Thông báo', errorMsg);
    }
    return result;
  };

  //button --- insert request material
  const onInsertRequestMaterial = () => {
    const result = checkValidate();
    if (result) {
      props.onInsertRequestMaterial(materialList);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>Tên dịch vụ</Text>
        <View style={styles.serviceItemContainer}>
          <Image
            source={{uri: requestDetailItem.service.serviceImg}}
            style={styles.serviceItemImg}
          />
          <View style={styles.serviceItemTextContainer}>
            <Text style={styles.serviceItemName}>
              {requestDetailItem.service.serviceName}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.requestContainer}>
        <Text style={styles.requestTitle}>Yêu cầu bạn đã chọn</Text>
        <View style={styles.requestItemContainer}>
          <Image
            source={{uri: IconURL.materialColorImg}}
            style={styles.requestItemImg}
          />
          <View style={styles.requestItemTextContainer}>
            <Text style={styles.requestItemName}>Yêu cầu vật liệu</Text>
            <Text style={styles.requestItemDescription}>
              Hãy gửi yêu cầu vật liệu để sửa chữa về cho chúng tôi
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.materialTitle}>Chọn vật liệu</Text>
      {materialList.map((item, index) => {
        return (
          <View key={index} style={styles.materialContainer}>
            <View style={styles.materialMainContainer}>
              <View style={styles.materialPickerContainer}>
                <Picker
                  dropdownIconColor={Color.primary}
                  selectedValue={item.id}
                  onValueChange={(itemValue, itemIndex) => {
                    onHandlePicker(itemValue, index);
                  }}>
                  <Picker.Item
                    style={styles.materialPickerItem}
                    label="- - -"
                    value={0}
                  />
                  {material.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        style={styles.materialPickerItem}
                        label={item.materialName}
                        value={item.materialId}
                      />
                    );
                  })}
                </Picker>
              </View>
              <TouchableOpacity
                style={styles.removeContainer}
                onPress={() => onRemoveItem(index)}>
                <Icon name="times" style={styles.removeIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.materialInfoContainer}>
              <Text style={styles.materialQuantityTitle}>Số lượng:</Text>
              <TextInput
                maxLength={8}
                keyboardType="numeric"
                style={styles.materialQuantity}
                value={materialList[index].quantity + ''}
                onChangeText={text => onHandleQuantity(text, index)}
              />
              {item.id !== 55 && (
                <Text style={styles.materialUnitTitle}>Đơn vị: </Text>
              )}
              {item.id !== 55 && (
                <Text style={styles.materialUnitText}>
                  {materialList[index].unit}
                </Text>
              )}
            </View>
            <View style={styles.materialNoteContainer}>
              <Text style={styles.materialNoteTitle}>Ghi chú:</Text>
              <TextInput
                style={styles.materialNote}
                multiline={true}
                placeholder={
                  item.id === 55 ? 'Tên vật liệu, Đơn vị, Ghi chú' : ''
                }
                placeholderTextColor={Color.placeholder}
                value={materialList[index].note}
                onChangeText={text => onHandleNote(text, index)}
              />
            </View>
          </View>
        );
      })}
      <TouchableOpacity style={styles.btnAdd} onPress={onAddMaterial}>
        <Text style={styles.btnAddText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={onInsertRequestMaterial}>
        <Text style={styles.confirmBtnText}>Yêu cầu</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={uploading}>
        <View style={styles.dialogBackground}>
          <View style={styles.loadingView}>
            <ActivityIndicator size={'large'} color={Color.primary} />
            <Text style={styles.loadingText}>Đang gửi yêu cầu</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
