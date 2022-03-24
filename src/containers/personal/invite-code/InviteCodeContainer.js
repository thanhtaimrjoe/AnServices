import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import InviteCode from '../../../components/personal/invite-code/InviteCode';
import {
  actCreateInviteCodeRequest,
  actResetInviteCode,
} from '../../../redux/actions/index';

export default function InviteCodeContainer(props) {
  //get param from previous page
  const {userID} = props.route.params;
  //reducer --- inviteCode
  const inviteCode = useSelector(state => state.inviteCode);

  //get dispatch
  const dispatch = useDispatch();
  //call api
  const createInviteCodeRequest = userID =>
    dispatch(actCreateInviteCodeRequest(userID));
  //reset invite code
  const resetInviteCode = userID => dispatch(actResetInviteCode(userID));

  useEffect(() => {
    resetInviteCode();
    createInviteCodeRequest(userID);
  }, []);

  return <InviteCode inviteCode={inviteCode} />;
}
