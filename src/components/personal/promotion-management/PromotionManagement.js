import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './PromotionManagementStyle';
import IconURL from '../../../style/IconURL';
import Loading from '../../general/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-community/clipboard'

export default function PromotionManagement(props) {
  const {promotion, refreshing} = props;
  //state --- contractItem
  const [promotionItem, setPromotionItem] = useState();
  //state --- showPromotionDialog
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  //state --- copiedText
  const [isCopied, setIsCopied] = useState(false);


  const onCopyToClipboard = (promotionCode) => {
    Clipboard.setString(promotionCode);
    setIsCopied(true);
  };

  //button --- refresh promotion
  const onRefreshPromotionManagement = () => {
    console.log('onRefreshPromotionManagement');
  };

  //show dialog
  const onShowDialog = promotionItem => {
    setPromotionItem(promotionItem);
    setShowPromotionDialog(true);
  };

  //exit dialog
  const onExitDialog = () => {
    setShowPromotionDialog(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefreshPromotionManagement}
        />
      }>
      <Text style={styles.title}>Danh sách voucher</Text>
      {promotion.length === 0 && <Loading />}
      {promotion.errorsMsg && (
        <View style={styles.errorView}>
          <Image source={{uri: IconURL.notFoundImg}} style={styles.errorImg} />
          <Text style={styles.errorMsg}>Không có voucher nào có sẵn</Text>
        </View>
      )}
      {promotion.length > 0 &&
        !promotion.errorsMsg &&
        promotion.map((item, index) => {
          return (
            <View key={index} style={styles.requestServiceItemContainer}>
              <TouchableOpacity
                style={styles.requestServiceItem}
                onPress={() => onShowDialog(item)}>
                <Image
                  source={{uri: IconURL.promotionImg}}
                  style={styles.requestServiceItemImg}
                />
                <Text numberOfLines={1} style={styles.requestServiceItemName}>
                  Giảm {item.promotionValue * 100}%
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      {promotionItem && (
        <Modal transparent={true} visible={showPromotionDialog}>
          <View style={styles.dialogBackground}>
            <View style={styles.dialogContainer}>
              <View style={styles.dialogHeader}>
                <Text style={styles.dialogTitle}>
                  Giảm {promotionItem.promotionValue * 100}%
                </Text>

                <TouchableOpacity onPress={onExitDialog}>
                  <Icon name="times" style={styles.exitIcon} />
                </TouchableOpacity>
              </View>
              <Text style={styles.promotionDescription}>
                {promotionItem.promotionDescription}
              </Text>
              <Text style={styles.promotionDescription}>
                Hạn sử dụng: {promotionItem.promotionDateExpired}
              </Text>
              <View style={styles.promotionCodeContainer}>
                <Text style={styles.promotionCode}>{promotionItem.promotionCode}</Text>
                {isCopied ? (
                  <View style={styles.promotionCodeBtn}>
                  <Text style={styles.promotionCodeBtnText}>Copied</Text>
                </View>
                ) : (
                  <TouchableOpacity style={styles.promotionCodeBtn} onPress={() => onCopyToClipboard(promotionItem.promotionCode)}>
                  <Text style={styles.promotionCodeBtnText}>Copy</Text>
                </TouchableOpacity>
                )}
                
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}
