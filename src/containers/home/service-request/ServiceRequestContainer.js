import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ServiceRequest from '../../../components/home/service-request/ServiceRequest';
import {
  actResetMessage,
  actCreateServiceRequestRequest,
  actClearData,
  actGetAllPromotionValidByUserIDRequest,
} from '../../../redux/actions/index';
import storage from '@react-native-firebase/storage';
import {CommonActions} from '@react-navigation/native';

export default function ServiceRequestContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {serviceRequestRework} = props.route.params;
  //state --- uploading
  const [uploading, setUploading] = useState(false);
  //reducer --- services
  const services = useSelector(state => state.services);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- message
  const message = useSelector(state => state.message);
  //get token
  const token = 'Bearer ' + user.token;
  //reducer --- promotion
  const promotion = useSelector(state => state.promotion);

  //get dipatch
  const dispatch = useDispatch();
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //call api --- create request service
  const createServiceRequest = (requestService, token) =>
    dispatch(actCreateServiceRequestRequest(requestService, token));
  //clear all reducer before log out
  const clearData = () => dispatch(actClearData());
  //call api --- get all promotion valid by user id
  const getAllPromotionValidByUserID = (userID, token) =>
    dispatch(actGetAllPromotionValidByUserIDRequest(userID, token));

  useEffect(() => {
    getAllPromotionValidByUserID(user.id, token);
    if (message === 'CREATE_SERVICE_REQUEST_SUCCESS') {
      setUploading(false);
      Alert.alert(
        'Gửi yêu cầu thành công',
        'Yêu cầu của bạn sẽ được chúng tôi phản hồi trong thời gian sớm nhất',
        [
          {
            text: 'OK',
            onPress: () => {
              resetMessage();
              navigation.goBack();
            },
          },
        ],
      );
    }
    if (message === 'CREATE_SERVICE_REQUEST_FAILURE') {
      setUploading(false);
      Alert.alert(
        'Gửi yêu cầu thất bại',
        'Xin lỗi vì sự bất tiện này, mời bạn thử lại',
        [
          {
            text: 'OK',
            onPress: () => {
              resetMessage();
            },
          },
        ],
      );
    }
    if (message === 'ACCOUNT_HAVE_BEEN_BANNED') {
      setUploading(false);
      Alert.alert(
        'Gửi yêu cầu thất bại',
        'Tài khoản của bạn đã bị khóa do gửi yêu cầu quá 3 lần trong 1 ngày',
        [
          {
            text: 'OK',
            onPress: () => {
              resetMessage();
              onLogOut();
            },
          },
        ],
      );
    }
  }, [message]);

  //clear all reducers -> log out -> back to log in page
  const onLogOut = () => {
    //clear all reducers
    clearData();
    //navigate to home page
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'LoginContainer'}],
      }),
    );
  };

  //upload to firebase
  const uploadToFirebase = async (fileName, uri) => {
    try {
      //upload image to firebase
      await storage()
        .ref('/RequestServices/' + fileName)
        .putFile(uri);
      //get url of image from firebase
      const url = await storage()
        .ref('/RequestServices/' + fileName)
        .getDownloadURL();
      if (url) {
        return url;
      }
    } catch (error) {}
  };

  //create service request
  const onCreateServiceRequest = async (
    packageId,
    fullName,
    phoneNumber,
    address,
    selectedService,
    description,
    media,
    promotionID,
  ) => {
    setUploading(true);
    const mediaURL = [];
    //upload image and get image url from firebase
    await Promise.all(
      media.map(async (item, index) => {
        const fileName = Date.now() + item.fileName;
        const url = await uploadToFirebase(fileName, item.uri);
        mediaURL.push(url);
      }),
    );
    //insert service id to list
    const serviceList = [];
    selectedService.map(item => {
      serviceList.push(item.serviceId);
    });
    const serviceRequestIDParent = serviceRequestRework
      ? serviceRequestRework.serviceRequestIDParent
      : 0;
    //create requestService
    const requestService = {
      customerId: user.id,
      customerName: fullName,
      customerPhone: phoneNumber,
      customerAddress: address,
      requestServicePackage: packageId,
      serviceList: serviceList,
      requestServiceDescription: description,
      mediaList: mediaURL,
      promotionID: promotionID,
      serviceRequestIDParent: serviceRequestIDParent,
    };
    createServiceRequest(requestService, token);
  };

  return (
    <ServiceRequest
      services={services}
      promotion={promotion}
      uploading={uploading}
      serviceRequestRework={serviceRequestRework}
      onCreateServiceRequest={onCreateServiceRequest}
    />
  );
}
