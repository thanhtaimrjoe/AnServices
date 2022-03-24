import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ServiceRequest from '../../../components/home/service-request/ServiceRequest';
import {
  actResetMessage,
  actCreateServiceRequestRequest,
  actClearData,
} from '../../../redux/actions/index';
import storage from '@react-native-firebase/storage';
import {CommonActions} from '@react-navigation/native';

export default function ServiceRequestContainer(props) {
  const {navigation} = props;
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

  //get dipatch
  const dispatch = useDispatch();
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //call api --- create request service
  const createServiceRequest = requestService =>
    dispatch(actCreateServiceRequestRequest(requestService));
  //clear all reducer before log out
  const clearData = () => dispatch(actClearData());

  useEffect(() => {
    if (message === 'CREATE_SERVICE_REQUEST_SUCCESS') {
      Alert.alert(
        'Gửi yêu cầu thành công',
        'Yêu cầu của bạn sẽ được chúng tôi phản hồi trong thời gian sớm nhất',
        [
          {
            text: 'OK',
            onPress: () => {
              setUploading(false);
              resetMessage();
              navigation.goBack();
            },
          },
        ],
      );
    }
    if (message === 'CREATE_SERVICE_REQUEST_FAILURE') {
      Alert.alert(
        'Gửi yêu cầu thất bại',
        'Xin lỗi vì sự bất tiện này, mời bạn thử lại',
        [
          {
            text: 'OK',
            onPress: () => {
              setUploading(false);
              resetMessage();
              onLogOut();
            },
          },
        ],
      );
    }
    if (message === 'CREATE_SERVICE_REQUEST_BANNED') {
      Alert.alert(
        'Gửi yêu cầu thất bại',
        'Tài khoản của bạn đã bị khóa do gửi yêu cầu quá 3 lần',
        [
          {
            text: 'OK',
            onPress: () => {
              setUploading(false);
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
    } catch (error) {
      console.error(error);
    }
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
    };
    //-------------------------------------------
    // var formData = new FormData();
    // formData.append('CustomerId', user.id);
    // formData.append('CustomerName', fullName);
    // formData.append('CustomerPhone', phoneNumber);
    // formData.append('CustomerAddress', address);
    // formData.append('RequestServicePackage', packageId);
    // selectedService.map((item, index) => {
    //   formData.append('ServiceList', item.serviceId);
    // });
    // formData.append('RequestServiceDescription', description);
    // media.map((item, index) => {
    //   formData.append('File', {
    //     uri: item.uri,
    //     type: item.type,
    //     name: item.fileName,
    //   });
    // });
    createServiceRequest(requestService);
  };

  return (
    <ServiceRequest
      services={services}
      uploading={uploading}
      onCreateServiceRequest={onCreateServiceRequest}
    />
  );
}
