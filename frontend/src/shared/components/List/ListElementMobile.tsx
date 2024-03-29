import H3 from 'src/shared/components/Headers/H3';
import H4 from 'src/shared/components/Headers/H4';

import { Position } from 'src/shared/components/Headers/Header.types';
import { useDate } from 'src/shared/hooks/useDate';

interface IListElementMobile {
  amount: string;
  currency?: string;
  date: Date;
  title: string;
  children: JSX.Element;
}

const ListElementMobile: React.FC<IListElementMobile> = ({
  amount,
  date,
  title,
  children
}) => {
  const { dateFormat } = useDate();

  const displayAmount = () => {
    return `${amount} USD`;
  };

  const displayDate = () => {
    return dateFormat(date);
  };

  return (
    <div className="bg-gray-100 p-2 rounded relative">
      <div className="flex justify-between items-center">
        <H3 position={Position.left}>{title}</H3>
        <div>{children}</div>
      </div>
      <div className="flex justify-between items-center my-1">
        <H4 position={Position.left}>{displayDate()}</H4>
        <H4 position={Position.right}>{displayAmount()}</H4>
      </div>
    </div>
  );
};

export default ListElementMobile;
