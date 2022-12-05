import { FC } from 'react';

export type ArrowButtonProps = {
  direction: 'up' | 'down';
  onClick: () => void;
};

export const ArrowButton: FC<ArrowButtonProps> = (props: ArrowButtonProps) => {
  const { direction, onClick } = props;
  return (
    <div className="nav-arrow-container">
      <button className="nav-arrow" onClick={() => onClick()}>
        {direction == 'up' ? (
          <div className="icon fa fa-arrow-up" />
        ) : (
          <div className="icon fa fa-arrow-down" />
        )}
      </button>
    </div>
  );
};
