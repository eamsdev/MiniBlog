import TextInput from '../components-library/TextInput';
import { observer } from 'mobx-react';
import { FC, useEffect, useRef } from 'react';
import { rootStore } from '../stores/RootStore';

export const LiveSearch: FC = observer(() => {
  const liveSearchStore = rootStore.liveSearchStore;
  const wrapperRef = useRef(null);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      liveSearchStore.clearSearch();
    }
  };

  const handleEscapeKeydown = (evt) => {
    if (evt.key == 'Escape') {
      liveSearchStore.clearSearch();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    window.addEventListener('keydown', handleEscapeKeydown);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      window.removeEventListener('keydown', handleEscapeKeydown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="live-search">
      <TextInput
        size={'lg'}
        isInvalid={false}
        isValid={false}
        disabled={false}
        placeholder={'Search for content...'}
        onChanged={(value: string) => liveSearchStore.updateSearchString(value)}
        value={liveSearchStore.searchString}
      />
      {liveSearchStore.searchString && (
        <div className="results">
          <>
            {liveSearchStore.matches.length > 0 ? (
              liveSearchStore.matches.map((x) => (
                <div key={x.title} className="result">
                  <i className="icon fa fa-file-o" aria-hidden="true" />
                  <div className="card">
                    <div className="title">{x.title}</div>
                    <div className="description">{x.description}</div>
                  </div>
                </div>
              ))
            ) : (
              <>No match found...</>
            )}
            {liveSearchStore.matches.length > 0 ? (
              <div className="hint">Press Escape key to exit.</div>
            ) : null}
          </>
        </div>
      )}
    </div>
  );
});
