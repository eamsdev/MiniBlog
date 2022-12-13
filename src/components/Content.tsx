import { FC } from 'react';
import { useRouteNode } from 'react-router5';
import { observer } from 'mobx-react';
import { Blogs } from './Blogs';
import { AboutMe } from './AboutMe';

export const Content: FC = observer(() => {
  let component = <Blogs />;
  const { route } = useRouteNode('');

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
