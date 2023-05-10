import { useState } from 'react'

import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AppDispatch } from 'src/store/main';
import { incomeSchema, IncomeSchemaType } from 'src/features/income/validators'

import { addIncome } from 'src/store/income/incomeSlice';

interface IUseIncome {
  onClose?: () => void
}

export const useIncome = ({ onClose }: IUseIncome) => {
  const dispatch = useDispatch<AppDispatch>()
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<IncomeSchemaType>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      date: new Date()
    }
  })

  const handleAddIncome = (value: IncomeSchemaType) => {
    dispatch(addIncome(value))
    
    if(onClose) {
      onClose()
    }
  }

  const handleEditIncome = (value: IncomeSchemaType) => {
    console.log('handleEditIncome')
  }

  return {
    handleAddIncome,
    handleSubmit,
    errors,
    register,
    setValue,
    getValues
  }
}

