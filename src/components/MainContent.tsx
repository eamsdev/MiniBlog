import { FC } from 'react';
import { BlogPost } from './BlogPost';
// import fm from '../assets/posts/test-blog-post.md';
import { StylisedMarkdown } from './StylisedMarkdown';
import styled from 'styled-components';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';

type ContentProps = {
  navbarActive: boolean;
};

const StyledContentContainer = styled.div<ContentProps>`
  @media (min-width: 992px) {
    // transform: translateY(-505px);
    // -webkit-transform: translateY(-505px);
  }
`;

// @media (max-width: 991.98px) {
// this is bootstrap large (lg) breakpoint
// cant reference boostrap media query here zzzz.

//   transform: ${(props) => (props.navbarActive ? 'translateY(0px)' : 'translateY(-451px)')};
//   -webkit-transform: ${(props) =>
//     props.navbarActive ? 'translateY(0px)' : 'translateY(-451px)'};
//}
//`;

export const MainContent: FC = observer(() => {
  return (
    <StyledContentContainer navbarActive={rootStore.uiStore.showNavbar} className="content">
      {rootStore.blogPostStore.blogPosts.map((x) => (
        <BlogPost key={x.attributes.title as string} headerData={x.attributes}>
          <StylisedMarkdown markdown={x.body} />
        </BlogPost>
      ))}
    </StyledContentContainer>
  );
});
