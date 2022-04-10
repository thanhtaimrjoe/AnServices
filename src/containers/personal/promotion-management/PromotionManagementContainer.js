import React, {useEffect, useState} from 'react';
import PromotionManagement from '../../../components/personal/promotion-management/PromotionManagement';
import {useDispatch, useSelector} from 'react-redux';
import {actGetAllPromotionValidByUserIDRequest} from '../../../redux/actions';

export default function PromotionManagementContainer(props) {
  //state --- refreshing
  const [refreshing, setRefreshing] = useState(false);
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- promotion
  const promotion = useSelector(state => state.promotion);
  //get token
  const token = 'Bearer ' + user.token;

  //get dipatch
  const dispatch = useDispatch();
  //call api --- get all promotion valid by user id
  const getAllPromotionValidByUserID = (userID, token) =>
    dispatch(actGetAllPromotionValidByUserIDRequest(userID, token));

  useEffect(() => {
    getAllPromotionValidByUserID(user.id, token);
  }, []);

  //refresh promotion
  const onRefreshPromotionManagement = () => {
    setRefreshing(true);
    getAllPromotionValidByUserID(user.id, token);
    setRefreshing(false);
  };

  return (
    <PromotionManagement
      promotion={promotion}
      refreshing={refreshing}
      onRefreshPromotionManagement={onRefreshPromotionManagement}
    />
  );
}
