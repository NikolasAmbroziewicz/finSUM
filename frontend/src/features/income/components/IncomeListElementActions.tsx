import { useRef } from 'react';

import BaseModal from 'src/shared/components/Modals/BaseModal';
import BaseButton from 'src/shared/components/Button/base/BaseButton';
import IconDropdownMenu from 'src/shared/components/Dropdown/IconDropdownMenu';

import IncomeForm from 'src/features/Income/components/IncomeForm';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';
import { useIncome } from 'src/features/Income/hooks/useIncome';

import { ButtonTheme } from 'src/shared/components/Button/base/types';
import { DropdownContent } from 'src/shared/components/Dropdown/types';
import { IIconDropdownMenuRef } from 'src/shared/components/Dropdown/IconDropdownMenu';
import { IncomeSchemaType } from 'src/features/Income/validators';

import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';

interface IIncomeListElementActions {
  income: IncomeSchemaType;
}

const IncomeListElementActions: React.FC<IIncomeListElementActions> = ({
  income
}) => {
  const incomeMenuRef = useRef<IIconDropdownMenuRef>(null);

  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } = useModal();

  const { handleDeleteIncome } = useIncome({
    onClose: handleDeleteOpen
  });

  const handleEditAction = () => {
    //Open Modal
    handleEditOpen();
    // Close Action Menu
    incomeMenuRef.current?.handleMenuOpen();
  };

  const handleDeleteAction = () => {
    // Open Modal
    handleDeleteOpen();
    // Close Action Menu
    incomeMenuRef.current?.handleMenuOpen();
  };

  const dropdownContent: DropdownContent[] = [
    {
      id: 1,
      content: 'Edit',
      icon: <AiFillEdit />,
      handler: handleEditAction
    },
    {
      id: 2,
      content: 'Delete',
      icon: <AiOutlineClose />,
      handler: handleDeleteAction
    }
  ];

  return (
    <div className="relative">
      <IconDropdownMenu ref={incomeMenuRef} dropdownContent={dropdownContent} />
      {isDeleteOpen && (
        <BaseModal
          isOpen={isDeleteOpen}
          onClose={handleDeleteOpen}
          title="Delete Income"
          content={
            <span className="text-gray-600 mx-4">
              Do you want do delete this Income?
            </span>
          }
          action={
            <>
              <BaseButton
                color={ButtonTheme.base}
                styles="w-[45%]"
                handler={() => handleDeleteIncome(income.id as number)}
              >
                Yes
              </BaseButton>
              <BaseButton
                color={ButtonTheme.error}
                styles="w-[45%]"
                handler={() => handleDeleteOpen()}
              >
                No
              </BaseButton>
            </>
          }
        />
      )}
      {isEditOpen && (
        <BaseModal
          isOpen={isEditOpen}
          onClose={handleEditOpen}
          title="Edit Income"
          content={
            <IncomeForm
              onClose={handleEditOpen}
              editForm={true}
              income={income}
            />
          }
        />
      )}
    </div>
  );
};

export default IncomeListElementActions;
