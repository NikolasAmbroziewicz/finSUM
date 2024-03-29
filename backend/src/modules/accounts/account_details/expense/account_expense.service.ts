import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../../prisma/prisma.service';

import { AccountExpenseDto } from './account_expense.dto';

@Injectable()
export class AccountExpenseService {
  constructor(private prisma: PrismaService) {}

  async getExpenses(account_id: string, date: Date) {
    const parsedAccountId = Number(account_id);
    
    const currentMonth = new Date(date).getMonth()
    const currentYear = new Date(date).getFullYear()

    const allExpenses = await this.prisma.$queryRawUnsafe(`
      SELECT *
      FROM expense
      WHERE expense.account_id = ${parsedAccountId} AND 
        EXTRACT('MONTH' FROM expense.date) = ${currentMonth + 1} AND
        EXTRACT('YEAR' FROM expense.date) = ${currentYear};
    `)

    return allExpenses;
  }

  async addExpense(expense: AccountExpenseDto, account_id: string) {
    const { title, date, amount } = expense;

    const parsedDate = new Date(date);
    const parsedAmount = Number(amount);
    const parsedAccountId = Number(account_id);

    const addedExpense = await this.prisma.expense.create({
      data: {
        title: title,
        date: parsedDate,
        amount: parsedAmount,
        account: {
          connect: {
            id: parsedAccountId,
          },
        },
      },
    });

    return {
      ...addedExpense,
    };
  }

  async deleteExpense(expense_id: string) {
    try {
      const parsedExpenseId = Number(expense_id);

      const deletedExpense = this.prisma.expense.delete({
        where: {
          id: parsedExpenseId,
        },
      });

      return {
        ...deletedExpense,
      };
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Expense does not exist');
        }
      }
    }
  }

  async editExpense(expense: AccountExpenseDto, expense_id: string) {
    try {
      const { title, date, amount } = expense;

      const parsedDate = new Date(date);
      const parsedAmount = Number(amount);
      const parsedExpenseId = Number(expense_id);

      const updatedExpense = this.prisma.expense.update({
        data: {
          title: title,
          date: parsedDate,
          amount: parsedAmount,
        },
        where: {
          id: parsedExpenseId,
        },
      });

      return {
        ...updatedExpense,
      };
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Expense does not exist');
        }
      }
    }
  }
}
