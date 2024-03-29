import { useRef } from 'react';

import BaseModal from 'src/shared/components/Modals/BaseModal';
import BaseButton from 'src/shared/components/Button/base/BaseButton';
import IconDropdownMenu, {
  IIconDropdownMenuRef
} from 'src/shared/components/Dropdown/IconDropdownMenu';

import { ButtonTheme } from 'src/shared/components/Button/base/types';
import { DropdownContent } from 'src/shared/components/Dropdown/types';

import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';

interface IListElementAction<T> {
  element: T;
  titleDeleteModal: string;
  titleEditModal: string;
  contentDeleteModal: string;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  handleDeleteElement: (value: number) => void;
  handleDeleteModal: () => void;
  handleEditModal: () => void;
  contentEditModal: JSX.Element;
}

export default function ListElementAction<
  T extends { id?: number | undefined }
>({
  element,
  titleDeleteModal,
  titleEditModal,
  contentDeleteModal,
  isDeleteModalOpen,
  isEditModalOpen,
  handleDeleteModal,
  handleDeleteElement,
  handleEditModal,
  contentEditModal
}: IListElementAction<T>) {
  const incomeMenuRef = useRef<IIconDropdownMenuRef>(null);
  const handleEditAction = () => {
    //Open Modal
    handleEditModal();
    // Close Action Menu
    incomeMenuRef.current?.handleMenuOpen();
  };

  const handleDeleteAction = () => {
    // Open Modal
    handleDeleteModal();
    // Close Action Menu
    incomeMenuRef.current?.handleMenuOpen();
  };

  const dropdownContent: DropdownContent[] = [
    {
      id: 1,
      content: 'Edit',
      icon: <AiFillEdit data-test="editIcon" />,
      handler: handleEditAction
    },
    {
      id: 2,
      content: 'Delete',
      icon: <AiOutlineClose data-test="deleteIcon" />,
      handler: handleDeleteAction
    }
  ];

  return (
    <div className="relative">
      <IconDropdownMenu ref={incomeMenuRef} dropdownContent={dropdownContent} />
      {isDeleteModalOpen && (
        <BaseModal
          dataTest="deleteModal"
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModal}
          title={titleDeleteModal}
          content={
            <span className="text-gray-600 mx-4">
              { contentDeleteModal }
            </span>
          }
          action={
            <>
              <BaseButton
                dataTest="confirmDeleteButton"
                color={ButtonTheme.base}
                styles="w-[45%]"
                handler={() => handleDeleteElement(element.id as number)}
              >
                Yes
              </BaseButton>
              <BaseButton
                dataTest="declineDeleteButton"
                color={ButtonTheme.error}
                styles="w-[45%]"
                handler={() => handleDeleteModal()}
              >
                No
              </BaseButton>
            </>
          }
        />
      )}
      {isEditModalOpen && (
        <BaseModal
          dataTest="editModal"
          isOpen={isEditModalOpen}
          onClose={handleEditModal}
          title={titleEditModal}
          content={contentEditModal}
        />
      )}
    </div>
  );
}
