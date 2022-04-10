import React from 'react';
import ShareToFriend from '../../../components/personal/share-to-friend/ShareToFriend';

export default function ShareToFriendContainer(props) {
  const {navigation} = props;

  const onShowInviteCode = () => {
    navigation.navigate('InviteCodeContainer');
  };

  return <ShareToFriend onShowInviteCode={onShowInviteCode} />;
}
