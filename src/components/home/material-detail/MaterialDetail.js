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
import Loading from '../../general/Loading';
import Color from '../../../style/Color';
import IconURL from '../../../style/IconURL';

export default function MaterialDetail(props) {
  const {
    uploading,
    message,
    requestServicePackage,
    isPrimary,
    usedMaterial,
    report,
    requestDetailStatus,
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
    if (text.length > 0) {
      materialNewItem.quantity = parseFloat(text);
    } else {
      materialNewItem.quantity = '';
    }
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

  //button ---- show report detail
  const onShowReportDetail = item => {
    props.onShowReportDetail(item);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.serviceContainer}>
        {isPrimary &&
        requestServicePackage === 2 &&
        (requestDetailStatus === 2 || requestDetailStatus === 6) ? (
          <TouchableOpacity
            style={styles.serviceButtonContainer}
            onPress={onShowRequestMaterial}>
            <Image
              source={{uri: IconURL.materialImg}}
              style={styles.serviceButtonIcon}
            />
            <Text style={styles.serviceButtonText}>Yêu cầu vật liệu</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.serviceButtonDisableContainer}>
            <Image
              source={{uri: IconURL.materialDisableImg}}
              style={styles.serviceButtonIcon}
            />
            <Text style={styles.serviceButtonDisableText}>
              Yêu cầu vật liệu
            </Text>
          </View>
        )}
        {isPrimary &&
        (requestDetailStatus === 2 || requestDetailStatus === 6) ? (
          <TouchableOpacity
            style={styles.serviceButtonContainer}
            onPress={onShowReportProblem}>
            <Image
              source={{uri: IconURL.problemImg}}
              style={styles.serviceButtonIcon}
            />
            <Text style={styles.serviceButtonText}>Báo cáo vấn đề</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.serviceButtonDisableContainer}>
            <Image
              source={{uri: IconURL.problemDisableImg}}
              style={styles.serviceButtonIcon}
            />
            <Text style={styles.serviceButtonDisableText}>Báo cáo vấn đề</Text>
          </View>
        )}
        {isPrimary &&
        (requestDetailStatus === 2 || requestDetailStatus === 6) ? (
          <TouchableOpacity
            style={styles.serviceButtonContainer}
            onPress={onShowCompletedReport}>
            <Image
              source={{uri: IconURL.completeImg}}
              style={styles.serviceButtonIcon}
            />
            <Text style={styles.serviceButtonText}>Báo cáo hoàn thành</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.serviceButtonDisableContainer}>
            <Image
              source={{uri: IconURL.completeDisableImg}}
              style={styles.serviceButtonIcon}
            />
            <Text style={styles.serviceButtonDisableText}>
              Báo cáo hoàn thành
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.materialTitle}>Danh sách vật liệu yêu cầu</Text>
      {usedMaterial.length === 0 && (
        <View style={styles.loadingScreen}>
          <Loading />
        </View>
      )}
      {usedMaterial.errorsMsg && (
        <View style={styles.errorView}>
          <Image source={{uri: IconURL.notFoundImg}} style={styles.errorImg} />
          <Text style={styles.errorMsg}>Chưa có yêu cầu vật liệu nào</Text>
        </View>
      )}
      <View style={styles.materialListItemContainer}>
        {usedMaterial.length > 0 &&
          !usedMaterial.errorsMsg &&
          usedMaterial.map((item, index) => {
            return (
              <View key={index} style={styles.materialContainer}>
                <View style={styles.materialMainInfoContainer}>
                  <View style={styles.materialMainTextContainer}>
                    <Text style={styles.materialName}>
                      {item.material.materialName}
                    </Text>
                    {item.note && (
                      <Text style={styles.materialNote}>{item.note}</Text>
                    )}
                    <View style={styles.materialQuantityContainer}>
                      <Text style={styles.materialQuantityTitle}>
                        Số lượng:
                      </Text>
                      {item.quantityNew !== 0 ? (
                        <Text style={styles.materialQuantityDeny}>
                          {item.quantity}
                        </Text>
                      ) : (
                        <Text style={styles.materialQuantity}>
                          {item.quantity}
                        </Text>
                      )}
                      {item.quantityNew !== 0 && (
                        <Text style={styles.materialQuantity}>
                          {item.quantityNew}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.materialIconContainer}>
                    {item.status === 3 && (
                      <Image
                        source={{uri: IconURL.materialApprove}}
                        style={styles.materialIcon}
                      />
                    )}
                    {item.status === 1 && (
                      <Image
                        source={{uri: IconURL.materialDeny}}
                        style={styles.materialIcon}
                      />
                    )}
                    {item.status === 2 && (
                      <Image
                        source={{uri: IconURL.materialPending}}
                        style={styles.materialIcon}
                      />
                    )}
                    {item.status === 8 && (
                      <Image
                        source={{uri: IconURL.materialDeny}}
                        style={styles.materialIcon}
                      />
                    )}
                    {(requestDetailStatus === 2 ||
                      requestDetailStatus === 6) && (
                      <View style={styles.materialOtherContainer}>
                        <TouchableOpacity
                          style={styles.materialButtonContainer}
                          onPress={() => onShowRequestMaterialDialog(item)}>
                          <Image
                            source={{uri: IconURL.plus}}
                            style={styles.materialIcon}
                          />
                        </TouchableOpacity>
                        {item.status === 3 ||
                        item.status === 1 ||
                        item.status === 8 ? (
                          <View style={styles.materialButtonContainer}>
                            <Image
                              source={{uri: IconURL.cancelDisalbe}}
                              style={styles.materialIcon}
                            />
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={styles.materialButtonContainer}
                            onPress={() =>
                              onCancelRequestMaterial(item.usedMaterialId)
                            }>
                            <Image
                              source={{uri: IconURL.cancel}}
                              style={styles.materialIcon}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                </View>
                {item.message && (
                  <View style={styles.messageContainer}>
                    <Text style={styles.messageTitle}>Tin nhắn</Text>
                    <View style={styles.messageMainContainer}>
                      <Text>{item.message}</Text>
                    </View>
                  </View>
                )}
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
                <View style={styles.materialInfoContainer1}>
                  <Text style={styles.materialQuantityTitle1}>Số lượng:</Text>
                  <TextInput
                    maxLength={8}
                    keyboardType="numeric"
                    style={styles.materialQuantity1}
                    onChangeText={text => onHandleQuantity(text)}
                  />
                  {materialItem.material.materialId !== 55 && (
                    <Text style={styles.materialUnitTitle1}>Đơn vị: </Text>
                  )}
                  {materialItem.material.materialId !== 55 && (
                    <Text style={styles.materialUnitText1}>
                      {materialItem.material.unit}
                    </Text>
                  )}
                </View>
                <View style={styles.materialNoteContainer1}>
                  <Text style={styles.materialNoteTitle1}>Ghi chú:</Text>
                  <TextInput
                    style={styles.materialNote1}
                    multiline={true}
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
                  <View style={styles.btnRequestLoading}>
                    <ActivityIndicator size={'large'} color={Color.white} />
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
      <Text style={styles.reportTitle}>Danh sách báo cáo</Text>
      {report.length === 0 && (
        <View style={styles.loadingScreen}>
          <Loading />
        </View>
      )}
      {report.errorsMsg && (
        <View style={styles.errorView}>
          <Image source={{uri: IconURL.notFoundImg}} style={styles.errorImg} />
          <Text style={styles.errorMsg}>Hiện tại bạn chưa có báo cáo nào</Text>
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
                  source={{uri: IconURL.problemImg}}
                  style={styles.reportProblemItemImg}
                />
              ) : (
                <Image
                  source={{uri: IconURL.completeImg}}
                  style={styles.reportProblemItemImg}
                />
              )}
              <Text style={styles.reportProblemItemName}>
                {item.reportDescription}
              </Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}
