import { FC } from 'react';

export type ArrowButtonProps = {
  direction: 'up' | 'down';
  onClick: () => void;
};

export const ArrowButton: FC<ArrowButtonProps> = (props: ArrowButtonProps) => {
  const { direction, onClick } = props;
  return (
    <div className="drawer d-flex flex-row justify-content-center">
      <button
        className="fs-4 rounded-circle border border-5 border-white"
        onClick={() => onClick()}
      >
        {direction == 'up' ? (
          <div className="fa fa-arrow-up" />
        ) : (
          <div className="fa fa-arrow-down" />
        )}
      </button>
    </div>
  );
};
