import TextInput from '../components-library/TextInput';
import { observer } from 'mobx-react';
import { FC, useEffect, useRef } from 'react';
import { rootStore } from '../stores/RootStore';
import { useRoute } from 'react-router5';

export const LiveSearch: FC = observer(() => {
  const { router } = useRoute();
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
    <div ref={wrapperRef} className="live-search ms-1 me-lg-2 overflow-visible d-flex w-100">
      <div style={{ height: '38px' }}>
        <TextInput
          isInvalid={false}
          isValid={false}
          disabled={false}
          placeholder={'Search for content...'}
          onChanged={(value: string) => liveSearchStore.updateSearchString(value)}
          value={liveSearchStore.searchString}
        />
        {liveSearchStore.searchString && (
          <ul className="results me-1 p-2 rounded position-absolute shadow">
            {liveSearchStore.matches.length > 0 ? (
              liveSearchStore.matches.map((x) => (
                <li
                  key={x.title}
                  className="search-result p-3 mb-2 rounded h-auto d-flex flex-row alignt-items-center justify-content-start"
                  onClick={() => {
                    router.navigate('article', { id: x.reference }, { reload: true });
                    liveSearchStore.clearSearch();
                  }}
                >
                  <i
                    className="icon fs-2 fa fa-file-o d-flex align-items-center"
                    aria-hidden="true"
                  />
                  <div className="card ms-3 border-0">
                    <span className="fw-bold fs-6">{x.title}</span>
                    <span className="fs-7 fst-italic">{x.description}</span>
                  </div>
                </li>
              ))
            ) : (
              <>No match found...</>
            )}
            {liveSearchStore.matches.length > 0 ? (
              <div className="hint fst-italic">Press Escape key to exit.</div>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
});
