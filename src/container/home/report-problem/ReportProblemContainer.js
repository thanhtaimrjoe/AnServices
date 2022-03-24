import React, {useEffect, useState} from 'react';
import ReportProblem from '../../../components/home/report-problem/ReportProblem';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  actCreateReportRequest,
  actResetMessage,
  actTestRequest,
} from '../../../redux/actions/index';
import {Alert} from 'react-native';

export default function ReportProblemContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {requestDetailItem} = props.route.params;
  //state --- uploading
  const [uploading, setUploading] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- message
  const message = useSelector(state => state.message);

  //get dispatch
  const dispatch = useDispatch();
  //call api --- create report
  const createReportRequest = reportProblem =>
    dispatch(actCreateReportRequest(reportProblem));
  //reset message
  const resetMessage = () => dispatch(actResetMessage());
  //test
  const testRequest = formData => dispatch(actTestRequest(formData));

  useEffect(() => {
    if (message === 'CREATE_REPORT_SUCCESS') {
      Alert.alert('Thông báo', 'Báo cáo của bạn đã được gửi về cho chúng tôi', [
        {
          text: 'OK',
          onPress: () => {
            setUploading(false);
            resetMessage();
            navigation.goBack();
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
    //console.log('media', media);
    const mediaURL = [];
    //upload image and get image url from firebase
    await Promise.all(
      media.map(async (item, index) => {
        const fileName = Date.now() + item.fileName;
        const url = await uploadToFirebase(fileName, item.uri);
        mediaURL.push(url);
      }),
    );
    const reportProblem = {
      requestDetailID: requestDetailItem.requestDetailId,
      workerID: user.id,
      reportTitle: 'Báo cáo vấn đề',
      reportDescription: description,
      mediaList: mediaURL,
    };
    createReportRequest(reportProblem);
    //---------------------------------------
    // var formData = new FormData();
    // media.map((item, index) => {
    //   // const file = {
    //   //   uri: item.uri,
    //   //   name: item.fileName,
    //   //   type: item.type,
    //   // };
    //   // formData.append('file', {
    //   //   uri: item.uri,
    //   //   name: item.fileName,
    //   //   type: item.type,
    //   // });
    //   console.log('fileName', item.fileName);
    //   formData.append('file', {
    //     uri: item.uri,
    //     name: item.fileName,
    //     type: 'image/jpg',
    //   });
    // });
    // console.log('zzz', formData);
    // testRequest(formData);
  };

  return (
    <ReportProblem
      uploading={uploading}
      requestDetailItem={requestDetailItem}
      onCreateReportProblem={onCreateReportProblem}
    />
  );
}
