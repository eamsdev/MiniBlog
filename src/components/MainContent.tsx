import { FC } from 'react';
import { PreviewContainer } from './PreviewContainer';

export const MainContent: FC = () => {
  return (
    <div className="content">
      <PreviewContainer />
      <PreviewContainer />
    </div>
  );
};
