import React, { FC, memo } from 'react';

interface INotFound {
  className?: string;
}

const NotFound: FC<INotFound> = memo(() => {
  return (
    <div>
      NotFound
    </div>
  );
});

export default NotFound;
