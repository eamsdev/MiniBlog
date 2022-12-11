import { FC } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { LiveSearch } from './LiveSearch';
import { useRoute, useRouteNode } from 'react-router5';
import ReactPaginate from 'react-paginate';
import { PaginationWrapper } from './PaginationWrapper';

export const Blogs: FC = observer(() => {
  const { router } = useRoute();
  const { route } = useRouteNode('');
  const articleId = route.params.id;
  const pageNumber = route.params.page;
  console.log(pageNumber);
  const blogPost = rootStore.blogPostStore.getBlogPostById(articleId);
  return (
    <>
      {!!blogPost ? (
        <>
          <LiveSearch />
          <BlogPost key={blogPost.attributes.title as string} frontMatter={blogPost.attributes}>
            <StylisedMarkdown markdown={blogPost.body} />
          </BlogPost>
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
          {rootStore.blogPostStore.getItemsAtPage(pageNumber).map((x) => (
            <BlogPost key={x.attributes.title as string} frontMatter={x.attributes}>
              <StylisedMarkdown markdown={x.body} />
            </BlogPost>
          ))}
        </PaginationWrapper>
      )}
    </>
  );
});
