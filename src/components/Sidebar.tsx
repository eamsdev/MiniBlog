import { FC } from 'react';
import { Profile } from './Profile';

export const Sidebar: FC = () => {
  return (
    <div className="sidebar">
      <Profile />
    </div>
  );
};

export const SidebarMobile: FC = () => {
  return <Profile />;
};
