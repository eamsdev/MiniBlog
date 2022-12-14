import { observer } from 'mobx-react';
import { FC } from 'react';
import { rootStore } from '../stores/RootStore';
import { ArrowButton } from './ArrowButton';
import { Profile } from './Profile';

export const Sidebar: FC = observer(() => {
  return (
    <div className="sidebar position-relative position-lg-fixed  h-100">
      <Profile />
      <ArrowButton
        onClick={() => rootStore.uiStore.toggleShowNavbar()}
        direction={rootStore.uiStore.showNavbar ? 'up' : 'down'}
      />
    </div>
  );
});

export const SidebarMobile: FC = () => {
  return <Profile />;
};
