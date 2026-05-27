'use client';

import React from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  MenuUnfoldOutlined, 
  MenuFoldOutlined,
  BellOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'ADMIN' | 'WORKER' | 'CUSTOMER';
  menuItems: any[];
}

export default function DashboardLayout({ children, role, menuItems }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleMenuClick = async (e: any) => {
    if (e.key === 'logout') {
      await signOut();
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Thông tin cá nhân',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleSidebarClick = (e: any) => {
    const item = menuItems.find(m => m.key === e.key);
    if (item?.path) {
      router.push(item.path);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        className="shadow-md border-r border-gray-100"
        breakpoint="lg"
        collapsedWidth={role === 'ADMIN' ? 80 : 0}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-100 font-bold text-xl text-blue-600">
          {collapsed ? 'AS' : 'AnServices'}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          className="border-none"
          onClick={handleSidebarClick}
        />
      </Sider>
      <Layout>
        <Header 
          style={{ backgroundColor: 'white', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'between' }}
          className="shadow-sm pr-6 border-b border-gray-100 h-16"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg w-16 h-16 hover:bg-gray-50 flex items-center justify-center"
          />
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <Button type="text" icon={<BellOutlined />} className="text-lg text-gray-400 hover:text-blue-600 hover:bg-gray-50" />
            <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} placement="bottomRight" trigger={['click']}>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-gray-100">
                <Avatar icon={<UserOutlined />} className="bg-gray-100 text-gray-400" />
                <span className="hidden md:inline font-semibold text-gray-600 uppercase text-[11px] tracking-widest">Người dùng {role}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-4 p-6 bg-white rounded-xl shadow-sm overflow-auto border border-gray-100">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
