import { FC } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { LiveSearch } from './LiveSearch';
import { useRoute, useRouteNode } from 'react-router5';
import { PaginationWrapper } from './PaginationWrapper';
import { TransitionWrapper } from '../components-library/TransitionWrapper';
import { Button, Container } from 'react-bootstrap';

export const Blogs: FC = observer(() => {
  const { router } = useRoute();
  const { route } = useRouteNode('');
  const articleId = route.params.id;
  const pageNumber = route.params.page;
  const blogPost = rootStore.blogPostStore.getBlogPostById(articleId);
  const itemsAtPage = rootStore.blogPostStore.getItemsAtPage(pageNumber);
  const itemsKey = itemsAtPage[0]?.attributes.id ?? blogPost.attributes.id;
  return (
    <>
      {!!blogPost ? (
        <>
          {/* TODO: REFACTOR */}
          <div className="top-search-container d-flex justify-content-flex-start w-100 flex-nowrap">
            <div className="top-search d-flex justify-content-flex-start flex-nowrap w-100">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  router.navigate('blogs', { page: 0 }, { reload: true });
                  rootStore.blogPostStore.selectPage(0);
                }}
              >
                <i className="icon fa fa-home" />
              </Button>
              <LiveSearch />
            </div>
          </div>
          <TransitionWrapper transitionKey={itemsKey}>
            <Container className="p-0 m-0">
              <BlogPost key={blogPost.attributes.title as string} frontMatter={blogPost.attributes}>
                <StylisedMarkdown markdown={blogPost.body} />
              </BlogPost>
            </Container>
          </TransitionWrapper>
        </>
      ) : (
        <PaginationWrapper
          onPageSelected={(pageNumber) => {
            router.navigate('blogs', { page: pageNumber }, { reload: true });
            rootStore.blogPostStore.selectPage(pageNumber);
          }}
          currentPage={rootStore.blogPostStore.currentPage}
          pageCount={rootStore.blogPostStore.pageCount}
        >
          <TransitionWrapper transitionKey={itemsKey}>
            <Container className="p-0 m-0">
              {rootStore.blogPostStore.getItemsAtPage(pageNumber).map((x) => (
                <BlogPost key={x.attributes.title as string} frontMatter={x.attributes}>
                  <StylisedMarkdown markdown={x.body} />
                </BlogPost>
              ))}
            </Container>
          </TransitionWrapper>
        </PaginationWrapper>
      )}
    </>
  );
});
