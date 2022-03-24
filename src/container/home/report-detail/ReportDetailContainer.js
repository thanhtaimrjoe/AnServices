import React from 'react';
import ReportDetail from '../../../components/home/report-detail/ReportDetail';

export default function ReportDetailContainer(props) {
  //get param from previous page
  const {reportDetail, requestDetailItem} = props.route.params;

  return (
    <ReportDetail
      reportDetail={reportDetail}
      requestDetailItem={requestDetailItem}
    />
  );
}
