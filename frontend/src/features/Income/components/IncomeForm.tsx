import { useEffect } from 'react';

import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseInput from 'src/shared/components/Input/base/BaseInput';
import ButtonDropdownMenu from 'src/shared/components/Dropdown/ButtonDropdownMenu';

import FormElement from 'src/shared/components/Form/FormElement';
import IncomeFormCalendar from 'src/shared/components/Calendar/IncomeFormCalendar';

import { useIncome } from '../hooks/useIncome';

import { supportedCurrency } from 'src/shared/data/SupportedCurrencies';
import { IncomeSchemaType } from '../validators';
import { DropdownContent } from 'src/shared/components/Dropdown/types';

interface IIncomeForm {
  onClose: () => void;
  editForm: boolean;
  income?: IncomeSchemaType;
}

const IncomeForm: React.FC<IIncomeForm> = ({ onClose, editForm, income }) => {
  const {
    handleAddIncome,
    handleEditIncome,
    errors,
    handleSubmit,
    register,
    setValue,
    getValues
  } = useIncome({ onClose });

  const handleValue = (val: DropdownContent) => {
    setValue('currency', val.content, { shouldValidate: true });
  };

  const handleDateValue = (val: Date) => {
    setValue('date', val, { shouldValidate: true });
  };

  useEffect(() => {
    if (editForm && income) {
      setValue('id', income?.id);
      setValue('title', income.title);
      setValue('date', new Date(income.date));
      setValue('amount', income.amount);
      setValue('currency', income.currency, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit(editForm ? handleEditIncome : handleAddIncome)}
      className="flex flex-col gap-4 w-screen mx-4"
    >
      <FormElement value="Title" error={errors.title?.message}>
        <BaseInput
          id="name"
          type="text"
          placeholder="Title"
          error={!!errors.title?.message}
          formHandler={register('title')}
        />
      </FormElement>
      <FormElement value="Amount" error={errors.amount?.message}>
        <BaseInput
          id="amount"
          type="number"
          placeholder="Amount"
          error={!!errors.amount?.message}
          formHandler={register('amount')}
        />
      </FormElement>
      <FormElement value="Date" error={errors.date?.message}>
        <IncomeFormCalendar
          date={getValues('date')}
          setDate={handleDateValue}
        />
      </FormElement>
      <FormElement value="Currency" error={errors.currency?.message}>
        <ButtonDropdownMenu
          dropdownContent={supportedCurrency}
          handleValue={handleValue}
          value={getValues('currency')}
          error={!!errors.currency?.message}
        />
      </FormElement>
      <BaseButton type="submit">Submit</BaseButton>
    </form>
  );
};

export default IncomeForm;
