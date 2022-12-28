import { FC } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { useRoute, useRouteNode } from 'react-router5';
import { ContentType, ContentWrapper } from './ContentWrapper';
import { Helmet } from 'react-helmet';

export const Blogs: FC = observer(() => {
  const { router } = useRoute();
  const { route } = useRouteNode('');
  const articleId = route.params.id;
  const pageNumber = route.params.page;

  let content = undefined;
  let itemsKey = undefined;
  let newerPostId: string | undefined = undefined;
  let olderPostId: string | undefined = undefined;
  let blogPostDate: string | undefined = undefined;
  const contentType =
    route.params.id != undefined ? ContentType.NAVIGATION : ContentType.PAGINATION;

  if (contentType == ContentType.NAVIGATION) {
    const navigatableBlogPostModel = rootStore.blogPostStore.getBlogPostById(articleId);
    if (navigatableBlogPostModel == undefined) {
      return (
        <div className="container p-0 m-0 d-flex flex-row align-items-center justify-content-center">
          <h1>Content Not Found</h1>
        </div>
      );
    }

    const blogPost = navigatableBlogPostModel.currentPost;
    newerPostId = navigatableBlogPostModel.newerPostId;
    olderPostId = navigatableBlogPostModel.olderPostId;
    blogPostDate = navigatableBlogPostModel.currentPost.attributes.date;
    itemsKey = blogPost.attributes.id;
    content = (
      <div className="container p-0 m-0">
        <Helmet>
          <title>{blogPost.attributes.title}</title>
          <meta name="description" content={blogPost.attributes.meta} />
        </Helmet>
        <BlogPost key={blogPost.attributes.title as string} frontMatter={blogPost.attributes}>
          <StylisedMarkdown markdown={blogPost.body} />
        </BlogPost>
      </div>
    );
  } else {
    const itemsAtPage = rootStore.blogPostStore.getItemsAtPage(pageNumber);
    itemsKey = itemsAtPage[0]?.attributes.id;
    content = (
      <div className="container p-0 m-0">
        {itemsAtPage.map((x) => (
          <BlogPost key={x.attributes.title as string} frontMatter={x.attributes}>
            <StylisedMarkdown markdown={x.body} />
          </BlogPost>
        ))}
      </div>
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
      onNewerBlogPost={() => router.navigate('article', { id: newerPostId }, { reload: true })}
      hasNewerBlogPost={!!newerPostId}
      onOlderBlogPost={() => router.navigate('article', { id: olderPostId }, { reload: true })}
      hasOlderBlogPost={!!olderPostId}
      blogPostDate={blogPostDate}
      type={contentType}
      transitionKey={contentType + '-' + itemsKey}
    >
      {content}
    </ContentWrapper>
  );
});
