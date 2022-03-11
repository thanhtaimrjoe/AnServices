import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Invoice from '../../../components/list/invoice/Invoice';
import {
  actGetInfomationInvoiceByRequestServiceIDRequest,
  actResetInvoice,
} from '../../../redux/actions/index';

export default function InvoiceContainer(props) {
  //get param from previous page
  const {requestServiceId} = props.route.params;
  //reducer --- invoice
  const invoice = useSelector(state => state.invoice);

  //get dipatch
  const dispatch = useDispatch();
  //reset invoice
  const resetInvoice = () => dispatch(actResetInvoice());
  //call api --- get information invoice by request service id
  const getInfomationInvoiceByRequestServiceID = requestServiceId =>
    dispatch(
      actGetInfomationInvoiceByRequestServiceIDRequest(requestServiceId),
    );

  useEffect(() => {
    resetInvoice();
    getInfomationInvoiceByRequestServiceID(requestServiceId);
  }, []);

  return <Invoice invoice={invoice} />;
}
