import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './MaterialDetailStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../../general/Loading';
import Color from '../../../style/Color';
import IconURL from '../../../style/IconURL'

export default function MaterialDetail(props) {
  const {
    uploading,
    message,
    requestServicePackage,
    isPrimary,
    usedMaterial,
    report,
  } = props;

  //state --- materialNewItem
  const [materialNewItem, setMaterialNewItem] = useState({
    id: 0,
    quantity: 0,
    note: '',
  });
  //state --- materialItem
  const [materialItem, setMaterialItem] = useState();
  //state --- showRequestMaterialDialog
  const [showRequestMaterialDialog, setShowRequestMaterialDialog] =
    useState(false);

  useEffect(() => {
    materialItem;
    if (message === 'INSERT_REQUEST_MATERIAL_SUCCESS') {
      setShowRequestMaterialDialog(false);
    }
  }, [message]);

  //button --- navigate to report problem
  const onShowReportProblem = () => {
    props.onShowReportProblem();
  };

  //button --- navigate to completed report
  const onShowCompletedReport = () => {
    props.onShowCompletedReport();
  };

  //button --- navigate to request material
  const onShowRequestMaterial = () => {
    props.onShowRequestMaterial();
  };

  //button --- add new material request
  const onShowRequestMaterialDialog = item => {
    setMaterialItem(item);
    setShowRequestMaterialDialog(true);
  };

  //button --- cancel request material
  const onCancelRequestMaterial = usedMaterialId => {
    props.onCancelRequestMaterial(usedMaterialId);
  };

  //handle quantity
  const onHandleQuantity = text => {
    materialNewItem.quantity = parseInt(text);
    setMaterialNewItem(materialNewItem);
  };

  //handle note
  const onHandleNote = text => {
    materialNewItem.note = text;
    setMaterialNewItem(materialNewItem);
  };

  //button --- request new material
  const onRequestNewMaterial = () => {
    materialNewItem.id = materialItem.material.materialId;
    props.onRequestNewMaterial(materialNewItem);
  };

  //get all available message of used material
  const getAllMessageWithMaterialName = () => {
    var result = '';
    if (usedMaterial.length > 0 && !usedMaterial.errorsMsg) {
      usedMaterial.map((item, index) => {
        if (item.message) {
          result += item.material.materialName + ': ' + item.message + '\n';
        }
      });
    }
    return result;
  };

  //button ---- show report detail
  const onShowReportDetail = item => {
    props.onShowReportDetail(item);
  };

  return (
    <ScrollView style={styles.container}>
      {isPrimary && (
        <View style={styles.serviceContainer}>
          <TouchableOpacity
            style={styles.serviceItemContainer}
            onPress={onShowReportProblem}>
            <Image
              source={{uri: IconURL.problemReportImg}}
              style={styles.serviceItemImg}
            />
            <View style={styles.serviceItemTextContainer}>
              <Text style={styles.serviceItemName}>Báo cáo vấn đề</Text>
              <Text style={styles.serviceItemDescription}>
                Báo cáo tình trạng của khách hàng về cho chúng tôi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {isPrimary && (
        <View style={styles.serviceContainer}>
          <TouchableOpacity
            style={styles.serviceItemContainer}
            onPress={onShowCompletedReport}>
            <Image
              source={{uri: IconURL.completeReportImg}}
              style={styles.serviceItemImg}
            />
            <View style={styles.serviceItemTextContainer}>
              <Text style={styles.serviceItemName}>Báo cáo hoàn thành</Text>
              <Text style={styles.serviceItemDescription}>
                Báo cáo sau khi đã hoàn thành xong công việc
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {requestServicePackage === 2 && isPrimary && (
        <View style={styles.serviceContainer}>
          <TouchableOpacity
            style={styles.serviceItemContainer}
            onPress={onShowRequestMaterial}>
            <Image
              source={{uri: IconURL.requestMaterialImg}}
              style={styles.serviceItemImg}
            />
            <View style={styles.serviceItemTextContainer}>
              <Text style={styles.serviceItemName}>Yêu cầu vật liệu</Text>
              <Text style={styles.serviceItemDescription}>
                Hãy gửi yêu cầu vật liệu để sửa chữa về cho chúng tôi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.materialTitle}>Danh sách vật liệu yêu cầu</Text>
      {
        usedMaterial.length > 0 &&
        !usedMaterial.errorsMsg && (
<View style={styles.materialHeader}>
        <Text style={styles.materialHeaderName}>Tên vật liệu</Text>
        <Text style={styles.materialHeaderQuantity}>Số lượng</Text>
      </View>
        )
      }
      
      {/* {usedMaterial.length === 0 && <Loading />}
      {usedMaterial.errorsMsg && (
        <Text style={styles.errorMsg}>
          Hiện tại bạn chưa có bất kì vật liệu nào
        </Text>
      )} */}
      {usedMaterial.length === 0 && (
        <View style={styles.errorView}>
          <Image
            source={{uri: IconURL.notFoundImg}}
            style={styles.errorImg}
          />
          <Text style={styles.errorMsg}>
            Hiện tại bạn chưa có bất kì vật liệu nào
          </Text>
        </View>
      )}
      <View style={styles.materialListItemContainer}>
        {usedMaterial.length > 0 &&
          !usedMaterial.errorsMsg &&
          usedMaterial.map((item, index) => {
            return (
              <View key={index} style={styles.materialContainer}>
                <View style={styles.materialItemContainer}>
                  {item.status.statusId === 3 && (
                    <Icon name="check" style={styles.materialItemIconApprove} />
                  )}
                  {item.status.statusId === 1 && (
                    <Icon name="times" style={styles.materialItemIconDeny} />
                  )}
                  {item.status.statusId === 2 && (
                    <Icon
                      name="spinner"
                      style={styles.materialItemIconPending}
                    />
                  )}
                  {item.status.statusId === 8 && (
                    <Icon name="ban" style={styles.materialItemIconCancel} />
                  )}
                  <View style={styles.materialItemNameContainer}>
                    <Text style={styles.materialItemName}>
                      {item.material.materialName}
                    </Text>
                    {item.note && (
                      <Text style={styles.materialItemNote}>{item.note}</Text>
                    )}
                  </View>
                  {item.quantityNew ? (
                    <Text style={styles.materialItemQuantity}>
                      {item.quantity} {'->'} {item.quantityNew}{' '}
                      {item.material.unit}
                    </Text>
                  ) : (
                    <Text style={styles.materialItemQuantity}>
                      {item.quantity} {item.material.unit}
                    </Text>
                  )}
                  {isPrimary && (
                    <TouchableOpacity
                      style={styles.marterialIconContainer}
                      onPress={() => onShowRequestMaterialDialog(item)}>
                      <Icon name="plus" style={styles.materialIcon} />
                    </TouchableOpacity>
                  )}
                  {isPrimary &&
                    item.status.statusId !== 3 &&
                    item.status.statusId !== 1 &&
                    item.status.statusId !== 8 && (
                      <TouchableOpacity
                        style={styles.marterialIconContainer}
                        onPress={() =>
                          onCancelRequestMaterial(item.usedMaterialId)
                        }>
                        <Icon name="times" style={styles.materialIcon} />
                      </TouchableOpacity>
                    )}
                </View>
              </View>
            );
          })}
      </View>
      {materialItem && (
        <Modal transparent={true} visible={showRequestMaterialDialog}>
          <TouchableWithoutFeedback
            onPress={() => setShowRequestMaterialDialog(false)}>
            <View style={styles.dialogBackground}>
              <View style={styles.requestMaterialContainer}>
                <Text style={styles.requestMaterialTitle}>
                  Yêu cầu thêm vật liệu
                </Text>
                <View style={styles.requestMaterialNameContainer}>
                  <Text style={styles.requestMaterialName}>Tên vật liệu: </Text>
                  <Text style={styles.requestMaterialNameData}>
                    {materialItem.material.materialName}
                  </Text>
                </View>
                <View style={styles.requestMaterialQuantityAndUnitContainer}>
                  <View style={styles.requestMaterialQuantityContainer}>
                    <Text style={styles.requestMaterialQuantityTitle}>
                      Số lượng
                    </Text>
                    <TextInput
                      style={styles.requestMaterialQuantity}
                      keyboardType={'numeric'}
                      onChangeText={text => onHandleQuantity(text)}
                    />
                  </View>
                  {materialItem.material.materialId !== 55 && (
                    <View style={styles.requestMaterialUnitContainer}>
                      <Text style={styles.requestMaterialUnitTitle}>
                        Đơn vị
                      </Text>
                      <Text style={styles.requestMaterialUnit}>
                        {materialItem.material.unit}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.requestMaterialNoteContainer}>
                  <Text style={styles.requestMaterialNoteTitle}>Ghi chú</Text>
                  <TextInput
                    style={styles.requestMaterialNote}
                    placeholder={
                      materialItem.material.materialId === 55
                        ? 'Tên vật liệu, Đơn vị, Ghi chú'
                        : ''
                    }
                    placeholderTextColor={Color.placeholder}
                    onChangeText={text => onHandleNote(text)}
                  />
                </View>
                {uploading ? (
                  <View style={styles.btnRequest}>
                    <ActivityIndicator size={'large'} color={Color.primary} />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.btnRequest}
                    onPress={onRequestNewMaterial}>
                    <Text style={styles.btnRequestText}>Gửi yêu cầu</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {usedMaterial.length > 0 && !usedMaterial.errorsMsg && (
        <View>
          <Text style={styles.messageHeaderName}>Tin nhắn</Text>
          <View style={styles.messageContentContainer}>
            <Text style={styles.messageContent}>
              {getAllMessageWithMaterialName()}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.reportProblemListContainer}>
        <Text style={styles.reportTitle}>Danh sách báo cáo</Text>
        {report.length === 0 && <Loading />}
        {report.errorsMsg && (
          <View style={styles.errorView}>
            <Image
              source={{uri: IconURL.notFoundImg}}
              style={styles.errorImg}
            />
            <Text style={styles.errorMsg}>
              Hiện tại bạn chưa có báo cáo nào
            </Text>
          </View>
        )}
        {report.length > 0 &&
          !report.errorsMsg &&
          report.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.reportProblemItem}
                onPress={() => onShowReportDetail(item)}>
                {item.reportTitle === 'Báo cáo vấn đề' ? (
                  <Image
                    source={{uri: IconURL.problemReportImg}}
                    style={styles.reportProblemItemImg}
                  />
                ) : (
                  <Image
                    source={{uri: IconURL.completeReportImg}}
                    style={styles.reportProblemItemImg}
                  />
                )}
                <Text style={styles.reportProblemItemName}>
                  {item.reportDescription}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
}
