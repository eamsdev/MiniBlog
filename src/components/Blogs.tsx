import { FC } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { LiveSearch } from './LiveSearch';
import { useRoute, useRouteNode } from 'react-router5';
import ReactPaginate from 'react-paginate';

export const Blogs: FC = observer(() => {
  const { router } = useRoute();
  const { route } = useRouteNode('');
  const articleId = route.params.id;
  const pageNumber = route.params.page;
  console.log(pageNumber);
  const blogPost = rootStore.blogPostStore.getBlogPostById(articleId);
  return (
    <>
      <LiveSearch />
      {!!blogPost ? (
        <BlogPost key={blogPost.attributes.title as string} frontMatter={blogPost.attributes}>
          <StylisedMarkdown markdown={blogPost.body} />
        </BlogPost>
      ) : (
        <>
          <nav>
            <ReactPaginate
              className="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              nextLabel="next"
              onPageChange={(evt) => {
                router.navigate('blogs', { page: evt.selected }, { reload: true });
              }}
              pageRangeDisplayed={5}
              pageCount={rootStore.blogPostStore.pageCount}
              previousLabel="previous"
              renderOnZeroPageCount={null}
            />
          </nav>
          {rootStore.blogPostStore.getItemsAtPage(pageNumber).map((x) => (
            <BlogPost key={x.attributes.title as string} frontMatter={x.attributes}>
              <StylisedMarkdown markdown={x.body} />
            </BlogPost>
          ))}
        </>
      )}
    </>
  );
});
