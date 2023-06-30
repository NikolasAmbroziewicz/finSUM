import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { AccountsDto } from './accounts.dto';

import { UserWithTokens } from '../auth/auth.type';
import { AccountsResponse } from './accounts.type'

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async addAccounts(
    account: AccountsDto,
    user: UserWithTokens
  ): Promise<AccountsResponse> {
    const { email } = user
    const { title, currency } = account

    const addedAccount = await this.prisma.account.create({
      data: {
        name: title,
        currency: currency,
        user: {
          connect: {
            email: email
          }
        }
      },
    })

    return {
      ...addedAccount
    }
  }

  async getAccounts (
    user: UserWithTokens
  ): Promise<AccountsResponse[]>{
    const { email } = user

    const allAccounts = await this.prisma.account.findMany({
      where: {
        user: {
          email: email
        }
      }
    })

    return allAccounts
  }

  async deleteAccount (
    id: number
  ): Promise<AccountsResponse> {
    try {
      const deleteAccount = await this.prisma.account.delete({
        where: {
          id: id
        }
      })

      return {
        ...deleteAccount
      }
    } catch(e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Account does not exist');
        }
      }
    }
  }

  async editAccount (
    account: AccountsDto,
    id: number
  ): Promise<AccountsResponse> {
    try {
      const { title, currency } = account

      const updatedAccounts = await this.prisma.account.update({
        data: {
          name: title,
          currency: currency
        },
        where: {
          id: id
        }
      })

      return {
        ...updatedAccounts
      }
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Account does not exist');
        }
      }
    }
  }
}