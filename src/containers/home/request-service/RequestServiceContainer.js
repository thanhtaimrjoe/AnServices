import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RequestService from '../../../components/home/request-service/RequestService';
import {
  actResetMessage,
  actCreateRequestServiceRequest,
} from '../../../redux/actions/index';
import storage from '@react-native-firebase/storage';

export default function RequestServiceContainer(props) {
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
  const createRequestServiceRequest = formData =>
    dispatch(actCreateRequestServiceRequest(formData));

  useEffect(() => {
    if (message === 'SUCCESS') {
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
    if (message === 'FAILURE') {
      Alert.alert(
        'Gửi yêu cầu thất bại',
        'Xin lỗi vì sự bất tiện này, mời bạn thử lại',
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
  }, [message]);

  //upload to firebase
  const uploadToFirebase = async (fileName, uri) => {
    try {
      //upload image to firebase
      await storage()
        .ref('/requestService/' + fileName)
        .putFile(uri);
      //get url of image from firebase
      const url = await storage()
        .ref('/requestService/' + fileName)
        .getDownloadURL();
      if (url) {
        return url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createRequestServiceAPITest = async formData => {
    try {
      console.log('formData', formData);
      const response = await fetch(
        'https://anservice-capstone-yx3.conveyor.cloud/api/Service/' +
          'CreateRequestService',
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
      console.log('response.status', response.status);
    } catch (error) {
      console.error(error);
      dispatch(createRequestFailure());
    }
  };

  //create request service
  const createRequestService = async (
    selectedPackage,
    fullName,
    phoneNumber,
    address,
    selectedService,
    description,
    media,
  ) => {
    setUploading(true);
    // const mediaURL = [];
    // //upload image and get image url from firebase
    // await Promise.all(
    //   media.map(async (item, index) => {
    //     const fileName = Date.now() + item.fileName;
    //     const url = await uploadToFirebase(fileName, item.uri);
    //     mediaURL.push(url);
    //   }),
    // );
    //insert service id to list
    // const serviceList = [];
    // selectedService.map(item => {
    //   serviceList.push(item.serviceId);
    // });
    //create requestService
    // const requestService = {
    //   customerId: user.id,
    //   customerName: fullName,
    //   customerPhone: phoneNumber,
    //   customerAddress: address,
    //   serviceList: serviceList,
    //   requestServiceDescription: description,
    //   mediaList: mediaURL,
    // };
    //-------------------------------------------
    var formData = new FormData();
    formData.append('CustomerId', user.id);
    formData.append('CustomerName', fullName);
    formData.append('CustomerPhone', phoneNumber);
    formData.append('CustomerAddress', address);
    formData.append('RequestServicePackage', selectedPackage.packageId);
    selectedService.map((item, index) => {
      formData.append('ServiceList', item.serviceId);
    });
    formData.append('RequestServiceDescription', description);
    media.map((item, index) => {
      formData.append('File', {
        uri: item.uri,
        name: item.fileName,
        type: item.type,
      });
    });
    console.log('test', formData);
    createRequestServiceAPITest(formData);
    //createRequestServiceRequest(formData);
  };

  return (
    <RequestService
      services={services}
      uploading={uploading}
      onCreateRequestService={createRequestService}
    />
  );
}
