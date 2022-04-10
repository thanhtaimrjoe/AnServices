import React, {useEffect, useState} from 'react';
import CompletedReport from '../../../components/home/completed-report/CompletedReport';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  actCreateReportRequest,
  actResetMessage,
} from '../../../redux/actions/index';
import {Alert} from 'react-native';

export default function CompletedReportContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {requestDetailItem} = props.route.params;
  //state --- uploading
  const [uploading, setUploading] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- message
  const message = useSelector(state => state.message);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api --- create report
  const createReportRequest = (reportItem, token) =>
    dispatch(actCreateReportRequest(reportItem, token));
  //reset message
  const resetMessage = () => dispatch(actResetMessage());

  useEffect(() => {
    if (message === 'CREATE_REPORT_SUCCESS') {
      Alert.alert('Thông báo', 'Báo cáo của bạn đã được gửi về cho chúng tôi', [
        {
          text: 'OK',
          onPress: () => {
            setUploading(false);
            resetMessage();
            navigation.pop(2);
          },
        },
      ]);
    }
  }, [message]);

  //upload to firebase and receive url
  const uploadToFirebase = async (fileName, uri) => {
    try {
      //upload image to firebase
      await storage()
        .ref('/Reports/' + fileName)
        .putFile(uri);
      //get url of image from firebase
      const url = await storage()
        .ref('/Reports/' + fileName)
        .getDownloadURL();
      if (url) {
        return url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  //button --- create report problem
  const onCreateReportProblem = async (description, media) => {
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
    const reportItem = {
      requestDetailID: requestDetailItem.requestDetailId,
      workerID: user.id,
      reportTitle: 'Báo cáo hoàn thành',
      reportDescription: description,
      mediaList: mediaURL,
    };
    createReportRequest(reportItem, token);
  };

  return (
    <CompletedReport
      uploading={uploading}
      requestDetailItem={requestDetailItem}
      onCreateReportProblem={onCreateReportProblem}
    />
  );
}
