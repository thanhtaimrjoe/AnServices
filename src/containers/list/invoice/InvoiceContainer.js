import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Invoice from '../../../components/list/invoice/Invoice';
import {
  actGetInfomationInvoiceByRequestServiceIDRequest,
  actResetInvoice,
} from '../../../redux/actions/index';

export default function InvoiceContainer(props) {
  //get param from previous page
  const {serviceRequestId} = props.route.params;
  //reducer --- invoice
  const invoice = useSelector(state => state.invoice);

  //get dipatch
  const dispatch = useDispatch();
  //reset invoice
  const resetInvoice = () => dispatch(actResetInvoice());
  //call api --- get information invoice by request service id
  const getInfomationInvoiceByRequestServiceID = serviceRequestId =>
    dispatch(
      actGetInfomationInvoiceByRequestServiceIDRequest(serviceRequestId),
    );
  
  // const getTotalServicePrice = () => {
  //   var result = 0;
  //   invoice.details.map((item, index) => {
  //     result += item.requestDetailPrice;
  //   });
  //   setTotalServicePrice(result);
  // }

  useEffect(() => {
    resetInvoice();
    getInfomationInvoiceByRequestServiceID(serviceRequestId);
    // if (invoice.details) {
    //   getTotalServicePrice();
    // }
  }, []);

  return <Invoice invoice={invoice} />;
}
