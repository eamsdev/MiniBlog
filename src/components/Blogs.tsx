import { FC } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { useRoute, useRouteNode } from 'react-router5';
import { Container } from 'react-bootstrap';
import { ContentType, ContentWrapper } from './ContentWrapper';

export const Blogs: FC = observer(() => {
  const { router } = useRoute();
  const { route } = useRouteNode('');
  const articleId = route.params.id;
  const pageNumber = route.params.page;

  let content = undefined;
  let itemsKey = undefined;
  const contentType =
    route.params.id != undefined ? ContentType.NAVIGATION : ContentType.PAGINATION;

  if (contentType == ContentType.NAVIGATION) {
    const blogPost = rootStore.blogPostStore.getBlogPostById(articleId);
    itemsKey = blogPost.attributes.id;
    content = (
      <BlogPost key={blogPost.attributes.title as string} frontMatter={blogPost.attributes}>
        <StylisedMarkdown markdown={blogPost.body} />
      </BlogPost>
    );
  } else {
    const itemsAtPage = rootStore.blogPostStore.getItemsAtPage(pageNumber);
    itemsKey = itemsAtPage[0]?.attributes.id;
    content = (
      <Container className="p-0 m-0">
        {itemsAtPage.map((x) => (
          <BlogPost key={x.attributes.title as string} frontMatter={x.attributes}>
            <StylisedMarkdown markdown={x.body} />
          </BlogPost>
        ))}
      </Container>
    );
  }

  return (
    <ContentWrapper
      onPageSelected={(pageNumber) => {
        router.navigate('blogs', { page: pageNumber }, { reload: true });
        rootStore.blogPostStore.selectPage(pageNumber);
      }}
      pageCount={rootStore.blogPostStore.pageCount}
      currentPage={rootStore.blogPostStore.currentPage}
      onNewerBlogPost={() => {}} // TODO: Implement
      hasNewerBlogPost={true} // TODO: Implement
      onOlderBlogPost={() => {}} // TODO: Implement
      hasOlderBlogPost={true} // TODO: Implement
      blogPostDate={'01-01-1973'} // TODO: Implement
      type={contentType}
      transitionKey={itemsKey}
    >
      {content}
    </ContentWrapper>
  );
});
