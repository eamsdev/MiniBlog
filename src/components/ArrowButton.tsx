import { FC } from 'react';

export type ArrowButtonProps = {
  direction: 'up' | 'down';
  onClick: () => void;
};

export const ArrowButton: FC<ArrowButtonProps> = (props: ArrowButtonProps) => {
  const { direction, onClick } = props;
  return (
    <div className="nav-arrow-container d-flex flex-row justify-content-center">
      <button className="nav-arrow rounded-circle" onClick={() => onClick()}>
        {direction == 'up' ? (
          <div className="icon fa fa-arrow-up" />
        ) : (
          <div className="icon fa fa-arrow-down" />
        )}
      </button>
    </div>
  );
};
