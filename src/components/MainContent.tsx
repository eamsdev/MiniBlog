import { FC } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';

export const MainContent: FC = observer(() => {
  return (
    <div className="content">
      {rootStore.blogPostStore.blogPosts.map((x) => (
        <BlogPost key={x.attributes.title as string} frontMatter={x.attributes}>
          <StylisedMarkdown markdown={x.body} />
        </BlogPost>
      ))}
    </div>
  );
});
