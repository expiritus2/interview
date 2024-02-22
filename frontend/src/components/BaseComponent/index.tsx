import React, { FC } from 'react';

interface IBaseComponent {
  className?: string;
}

const BaseComponent: FC<IBaseComponent> = () => {
  return (
    <div>
      BaseComponent
    </div>
  );
};

export default BaseComponent;
