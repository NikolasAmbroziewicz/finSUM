import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { AccountExpenseDto } from './account_expense.dto'
import { UserWithTokens } from '../../auth/auth.type';

@Injectable()
export class AccountExpenseService {
  constructor(private prisma: PrismaService) {}

  async getExpenses (
    user: UserWithTokens
  ) {
    const { userId } = user;
    const parsedNumber = Number(userId)

    const allExpenses = await this.prisma.expense.findMany({
      where: {
        account: {
          id: parsedNumber
        }
      }
    })

    return allExpenses
  }

  async addExpense(
    expense: AccountExpenseDto,
    user: UserWithTokens
  ) {
    const { userId } = user;
    const { title, date, description, amount } = expense

    const parsedDate = new Date(date);
    const parsedAmount = Number(amount);
    const parsedAccountId = Number(userId)

    const addedExpense = await this.prisma.expense.create({
      data: {
        title: title,
        date: parsedDate,
        amount: parsedAmount,
        description: description,
        account: {
          connect: {
            id: parsedAccountId
          }
        }
      }
    })

    return {
      ...addedExpense
    }
  }

  async deleteExpense(
    expense_id: string
  ) {
    try {
      const parsedExpenseId = Number(expense_id)

      const deletedExpense = this.prisma.expense.delete({
        where: {
          id: parsedExpenseId
        }
      })
  
      return {
        ...deletedExpense
      }
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Expense does not exist');
        }
      }
    }
  }

  async editExpense(
    expense: AccountExpenseDto,
    expense_id: string
  ) {
    try {
      const { title, date, description, amount } = expense

      const parsedDate = new Date(date);
      const parsedAmount = Number(amount);
      const parsedExpenseId = Number(expense_id)

      const updatedExpense = this.prisma.expense.update({
        data: {
          title: title,
          date: parsedDate,
          amount: parsedAmount,
          description: description,
        },
        where: {
          id: parsedExpenseId
        }
      })

      return {
        ...updatedExpense
      }
    } catch (e: any) {
      console.log('errors')
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Expense does not exist');
        }
      }
    }
  }
}