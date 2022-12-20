import { FC } from 'react';
import { useRouteNode } from 'react-router5';
import { observer } from 'mobx-react';
import { Blogs } from './Blogs';
import { AboutMe } from './AboutMe';
import { ArticlesSearch } from './ArticlesSearch';

export const Content: FC = observer(() => {
  let component = <Blogs />;
  const { route } = useRouteNode('');

  switch (route.name.split('.')[0]) {
    case 'about':
      component = <AboutMe />;
      break;
    case 'articles':
      component = <ArticlesSearch />;
      break;
    default:
      component = <Blogs />;
      break;
  }

  return (
    <main className="min-vh-100 p-lg-4 p-2 pb-4 mt-lg-0 mt-4 d-flex flex-column align-items-center w-100">
      {component}
    </main>
  );
});
