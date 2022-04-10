import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import InviteCode from '../../../components/personal/invite-code/InviteCode';
import {
  actCreateInviteCodeRequest,
  actResetInviteCode,
} from '../../../redux/actions/index';

export default function InviteCodeContainer(props) {
  //reducer --- user
  const user = useSelector(state => state.user);
  //reducer --- inviteCode
  const inviteCode = useSelector(state => state.inviteCode);
  //get token
  const token = 'Bearer ' + user.token;

  //get dispatch
  const dispatch = useDispatch();
  //call api
  const createInviteCodeRequest = (userID, token) =>
    dispatch(actCreateInviteCodeRequest(userID, token));
  //reset invite code
  const resetInviteCode = () => dispatch(actResetInviteCode());

  useEffect(() => {
    resetInviteCode();
    createInviteCodeRequest(user.id, token);
  }, []);

  return <InviteCode inviteCode={inviteCode} />;
}
