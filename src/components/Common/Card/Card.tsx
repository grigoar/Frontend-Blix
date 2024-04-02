import React from 'react';

interface Props {
  children: React.ReactNode;
}
const Card = (props: Props) => {
  return (
    <div
      className={` m-auto  my-12 h-auto max-w-[600px] rounded-3xl bg-secondary p-8 border-2 border-primary bg-slate-50`}
    >
      {props.children}
    </div>
  );
};

export default Card;

