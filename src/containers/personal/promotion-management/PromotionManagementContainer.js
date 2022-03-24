import React, { useEffect } from 'react'
import PromotionManagement from '../../../components/personal/promotion-management/PromotionManagement'
import { useDispatch, useSelector } from 'react-redux';
import { actGetAllPromotionByUserIDRequest } from '../../../redux/actions';

export default function PromotionManagementContainer(props) {
  //get param from previous page
  const {userID} = props.route.params;

  //reducer --- promotion
  const promotion = useSelector(state => state.promotion);

  //get dipatch
  const dispatch = useDispatch();
  //call api --- get all promotion by user id
  const getAllPromotionByUserIDRequest = (userID) =>
    dispatch(actGetAllPromotionByUserIDRequest(userID));

  useEffect(() => {
    getAllPromotionByUserIDRequest(userID);
  }, [])
  

  return (
    <PromotionManagement promotion={promotion} />
  )
}