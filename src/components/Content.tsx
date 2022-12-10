import { FC } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { useRouteNode } from 'react-router5';
import { observer } from 'mobx-react';
import { LiveSearch } from './LiveSearch';
import { Blogs } from './Blogs';
import { AboutMe } from './AboutMe';

export const Content: FC = observer(() => {
  let component = <Blogs />;
  const { route } = useRouteNode('');

  console.log(route.name);
  switch (route.name.split('.')[0]) {
    case 'about':
      component = <AboutMe />;
      break;
    default:
      component = <Blogs />;
      break;
  }

  return <div className="content">{component}</div>;
});
