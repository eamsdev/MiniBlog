import Giscus from '@giscus/react';
import { observer } from 'mobx-react';
import { FC } from 'react';
import { rootStore } from '../stores/RootStore';

export const Discussion: FC = observer(() => {
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
      loading="eager"
      theme={rootStore.themeStore.isLight ? 'light_high_contrast' : 'transparent_dark'}
      lang="en"
    />
  );
});
