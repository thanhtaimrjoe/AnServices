import React from 'react';
import Personal from '../../components/personal/Personal';

export default function PersonalContainer() {
  const options = [
    {
      name: 'Lịch sử yêu cầu',
      icon: 'rocket',
    },
    {
      name: 'Giới thiệu cho bạn bè',
      icon: 'user-alt',
    },
    {
      name: 'Nhập mã giới thiệu',
      icon: 'home',
    },
    {
      name: 'Quản lý voucher',
      icon: 'bird',
    },
  ];
  return <Personal />;
}
