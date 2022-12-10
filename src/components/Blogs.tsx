import { FC } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { LiveSearch } from './LiveSearch';
import { useRouteNode } from 'react-router5';

export const Blogs: FC = observer(() => {
  const { route } = useRouteNode('');
  const articleId = route.params.id;
  const blogPost = rootStore.blogPostStore.getBlogPostById(articleId);
  return (
    <>
      <LiveSearch />
      {!!blogPost ? (
        <BlogPost key={blogPost.attributes.title as string} frontMatter={blogPost.attributes}>
          <StylisedMarkdown markdown={blogPost.body} />
        </BlogPost>
      ) : (
        rootStore.blogPostStore.blogPosts.map((x) => (
          <BlogPost key={x.attributes.title as string} frontMatter={x.attributes}>
            <StylisedMarkdown markdown={x.body} />
          </BlogPost>
        ))
      )}
    </>
  );
});
