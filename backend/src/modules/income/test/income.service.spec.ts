import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import { IncomeService } from '../income.service';
import { PrismaService } from '../../../prisma/prisma.service';

import {
  addedIncome,
  addedIncomeInput,
  userWithToken,
  editIncome,
  editIncomeInput,
  mockDate,
} from './mocks';

let service: IncomeService;

// Mocks Function
const createIncomeMock = jest.fn();
const findManyIncomeMock = jest.fn();
const deleteIncomeMock = jest.fn();
const updateIncomeMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      IncomeService,
      {
        provide: PrismaService,
        useValue: {
          income: {
            create: createIncomeMock,
            findMany: findManyIncomeMock,
            delete: deleteIncomeMock,
            update: updateIncomeMock,
          },
        },
      },
    ],
  }).compile();

  service = module.get<IncomeService>(IncomeService);
});

describe('IncomeService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('IncomeService > methods > addIncome', () => {
  it('Should be defined', () => {
    expect(service.addIncome).toBeDefined();
  });

  it('Should return added income when data is correct', async () => {
    createIncomeMock.mockResolvedValue(addedIncome);

    const serviceMethod = await service.addIncome(
      addedIncomeInput,
      userWithToken,
    );

    expect(serviceMethod).toEqual(addedIncome);
  });
});

describe('IncomeService > methods > getIncome', () => {
  it('Should be defined', () => {
    expect(service.getIncome).toBeDefined();
  });

  it('Should return List of Incomes for specyfic user', async () => {
    findManyIncomeMock.mockResolvedValue([addedIncome, addedIncome]);

    const serviceMethod = await service.getIncome(userWithToken, mockDate);

    expect(serviceMethod).toEqual([addedIncome, addedIncome]);
  });
});

describe('IncomeService > methods > deleteIncome', () => {
  it('Should be defined', () => {
    expect(service.deleteIncome).toBeDefined();
  });

  it('Should remove Income from database and return', async () => {
    deleteIncomeMock.mockResolvedValue(addedIncome);
    const serviceMethod = await service.deleteIncome(10);

    expect(serviceMethod).toEqual(addedIncome);
  });

  it('Should return Error when income does not exist in database', async () => {
    deleteIncomeMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );
    const serviceMethod = (await service.deleteIncome(10)) as any;

    expect(serviceMethod.message).toEqual('Income does not exist');
  });
});

describe('IncomeService > methods > editIncome', () => {
  it('Should be defined', () => {
    expect(service.editIncome).toBeDefined();
  });

  it('Should edit and return income', async () => {
    updateIncomeMock.mockResolvedValue(editIncome);

    const serviceMethod = await service.editIncome(editIncomeInput, 11);

    expect(serviceMethod).toEqual(editIncome);
  });

  it('Should return Error when income does not exist in database', async () => {
    updateIncomeMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );
    const serviceMethod = (await service.editIncome(editIncomeInput, 9)) as any;

    expect(serviceMethod.message).toEqual('Income does not exist');
  });
});
