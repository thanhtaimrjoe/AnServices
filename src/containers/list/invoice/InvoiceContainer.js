import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Invoice from '../../../components/list/invoice/Invoice';
import {
  actGetInfomationInvoiceByRequestServiceIDRequest,
  actGetInformationPromotionByIDRequest,
  actResetInvoice,
} from '../../../redux/actions/index';

export default function InvoiceContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {serviceRequestId, promotionId, serviceRequestReference} =
    props.route.params;
  //reducer --- invoice
  const invoice = useSelector(state => state.invoice);
  //reducer --- promotionInfo
  const promotionInfo = useSelector(state => state.promotionInfo);
  //reduer --- user
  const user = useSelector(state => state.user);
  //get token
  const token = 'Bearer ' + user.token;

  //get dipatch
  const dispatch = useDispatch();
  //reset invoice
  const resetInvoice = () => dispatch(actResetInvoice());
  //call api --- get information invoice by request service id
  const getInfomationInvoiceByRequestServiceID = (serviceRequestId, token) =>
    dispatch(
      actGetInfomationInvoiceByRequestServiceIDRequest(serviceRequestId, token),
    );
  //call api --- get information promotion by id
  const getInformationPromotionByID = (promotionID, token) =>
    dispatch(actGetInformationPromotionByIDRequest(promotionID, token));

  useEffect(() => {
    resetInvoice();
    getInfomationInvoiceByRequestServiceID(serviceRequestId, token);
    getInformationPromotionByID(promotionId, token);
  }, []);

  //button --- show parent invoice
  const onShowParentInvoice = () => {
    navigation.replace('InvoiceContainer', {
      serviceRequestId: serviceRequestReference,
      promotionId: promotionId,
      serviceRequestReference: null,
    });
  };

  return (
    <Invoice
      invoice={invoice}
      promotionInfo={promotionInfo}
      serviceRequestReference={serviceRequestReference}
      onShowParentInvoice={onShowParentInvoice}
    />
  );
}
