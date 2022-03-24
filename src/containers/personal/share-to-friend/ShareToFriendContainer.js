import React from 'react';
import ShareToFriend from '../../../components/personal/share-to-friend/ShareToFriend';

export default function ShareToFriendContainer(props) {
  const {navigation} = props;
  //get param from previous page
  const {userID} = props.route.params;

  const onShowInviteCode = () => {
    navigation.navigate('InviteCodeContainer', {
      userID: userID,
    });
  };

  return <ShareToFriend onShowInviteCode={onShowInviteCode} />;
}
