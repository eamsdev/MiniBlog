import { FC, useEffect } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { ContentType, ContentWrapper } from './ContentWrapper';
import { BlogPostModel, blogPostStore } from '../stores/BlogPostStore';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components-library/Spinner';

const Blogs: FC = observer(() => {
  const navigate = useNavigate();
  let { pageNumber } = useParams();
  if (pageNumber == undefined) {
    pageNumber = '0';
  }

  rootStore.blogPostStore.selectPage(+pageNumber);

  const itemsAtPage = rootStore.blogPostStore.getItemsAtPage(+pageNumber);
  const itemsKey = itemsAtPage[0]?.attributes.id;
  const styles = { display: rootStore.blogPostStore.isLoading ? 'none' : 'block' };

  useEffect(() => {
    blogPostStore.loadBlogContents(itemsAtPage);
  }, [pageNumber]);

  return (
    <ContentWrapper
      onPageSelected={(pageNumber) => {
        rootStore.blogPostStore.onNavigate(pageNumber.toString());
        navigate('/blogs/page/' + pageNumber);
        rootStore.blogPostStore.selectPage(pageNumber);
      }}
      isLoading={rootStore.blogPostStore.isLoading}
      pageCount={rootStore.blogPostStore.pageCount}
      currentPage={rootStore.blogPostStore.currentPage}
      onNewerBlogPost={undefined}
      hasNewerBlogPost={undefined}
      onOlderBlogPost={undefined}
      hasOlderBlogPost={false}
      blogPostDate={undefined}
      type={ContentType.PAGINATION}
      transitionKey={ContentType.PAGINATION + '-' + itemsKey}
    >
      <>
        <MultiBlogView styles={styles} blogPosts={itemsAtPage} />
        {rootStore.blogPostStore.isLoading && (
          <div className="container p-0 m-0">
            <Spinner />
          </div>
        )}
      </>
    </ContentWrapper>
  );
});

type MultiBlogViewProps = {
  styles: React.CSSProperties;
  blogPosts: BlogPostModel[];
};

const MultiBlogView = observer(({ blogPosts, styles }: MultiBlogViewProps) => {
  return (
    <div style={styles} className="container p-0 m-0">
      {blogPosts.map((x) => (
        <BlogPost key={x.attributes.title as string} frontMatter={x.attributes}>
          <StylisedMarkdown markdown={blogPostStore.blogPostsMap[x.attributes.id]} />
        </BlogPost>
      ))}
    </div>
  );
});

export default Blogs;
