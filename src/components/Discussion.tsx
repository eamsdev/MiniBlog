import Giscus from '@giscus/react';
import { FC } from 'react';

export const Discussion: FC = () => {
  return (
    <Giscus
      id="comments"
      repo="eamsdev/MiniBlog"
      repoId="R_kgDOIgaTPw"
      category="General"
      categoryId="DIC_kwDOIgaTP84CTFoZ"
      mapping="title"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="bottom"
      theme="light"
      lang="en"
    />
  );
};
