import { FC } from 'react';
import { rootStore } from '../stores/RootStore';
import { Profile } from './Profile';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { ArrowButton } from './ArrowButton';

type StyledNavbarProps = {
  navbarActive: boolean;
};

const StyledNavbarContainer = styled.div<StyledNavbarProps>`
  @media (min-width: 992px) {
    transform: translateY(-505px);
    -webkit-transform: translateY(-505px);
  }

  @media (max-width: 991.98px) {
    // this is bootstrap large (lg) breakpoint
    // cant reference boostrap media query here zzzz.

    transform: ${(props) => (props.navbarActive ? 'translateY(0px)' : 'translateY(-451px)')};
    -webkit-transform: ${(props) =>
      props.navbarActive ? 'translateY(0px)' : 'translateY(-451px)'};
  }
`;

export const Navbar: FC = observer(() => {
  const showNavbar = rootStore.uiStore.showNavbar;
  return (
    <StyledNavbarContainer navbarActive={showNavbar} className="navbar">
      <Profile />
      <ArrowButton
        onClick={() => rootStore.uiStore.toggleShowNavbar()}
        direction={rootStore.uiStore.showNavbar ? 'up' : 'down'}
      />
    </StyledNavbarContainer>
  );
});
