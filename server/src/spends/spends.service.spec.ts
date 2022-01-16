import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CategoriesService } from "../categories/categories.service";
import { UsersService } from "../users/users.service";
import { Spend } from "./entities/spend.entity";
import { SpendsService } from "./spends.service";

describe("SpendsService", () => {
  let service: SpendsService;
  const mockUsersTable = [
    {
      id: 1,
      username: "ben",
      email: "ben@gmail.com",
    },
  ];
  const mockCategoriesTable = [
    {
      id: 1,
      name: "Food",
    },
  ];
  const mockSpendRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      id: 1,
      ...dto,
    })),
    save: jest
      .fn()
      .mockImplementation((spend) =>
        Promise.resolve({ id: Date.now(), ...spend }),
      ),
  };
  const mockCategoriesService = {
    getCategoryById: jest.fn().mockImplementation((categoryId: number) => {
      const category = mockCategoriesTable.find(
        (category) => category.id === categoryId,
      );
      return category ? category : null;
    }),
  };
  const mockUsersService = {
    getUserById: jest.fn().mockImplementation((userId: number) => {
      const user = mockUsersTable.find((user) => user.id === userId);
      return user ? user : null;
    }),
  };

  const mockCreateSpendDto = {
    name: "fried rice",
    description: "i miss uncle soon",
    amount: 7,
    date: new Date(),
    categoryId: 1,
  };

  const mockPayload = {
    userId: 1,
    email: "ben@gmail.com",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpendsService,
        {
          provide: getRepositoryToken(Spend),
          useValue: mockSpendRepository,
        },
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();
    service = module.get<SpendsService>(SpendsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should return null", async () => {
      const newSpend = await service.create(mockCreateSpendDto, {
        ...mockPayload,
        userId: 123456,
      });
      expect(newSpend).toBeNull();
    });

    it("should return null", async () => {
      const newSpend = await service.create(
        {
          ...mockCreateSpendDto,
          categoryId: 123456,
        },
        mockPayload,
      );
      expect(newSpend).toBeNull();
    });

    it("should create a spend", async () => {
      const newSpend = await service.create(mockCreateSpendDto, mockPayload);
      expect(newSpend).toEqual({
        id: expect.any(Number),
        name: mockCreateSpendDto.name,
        description: mockCreateSpendDto.description,
        amount: mockCreateSpendDto.amount,
        date: mockCreateSpendDto.date,
        user: {
          id: mockPayload.userId,
          email: mockPayload.email,
          username: "ben",
        },
        category: {
          id: 1,
          name: "Food",
        },
      });
    });
  });
});
