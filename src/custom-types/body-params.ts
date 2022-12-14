export type RegisterBodyType = {
  name: string;
  email: string;
  password: string;
};

export type LoginBodyType = {
  email: string;
  password: string;
};

export type CreateCategoryBodyType = {
  userId: number;
  name: string;
};

export type UpdateCategoryBodyType = {
  id: number;
  name: string;
};

export type CreateExpenseBodyType = {
  userId: number;
  categoryId: number;
  spendingDate: Date;
  amount: number;
};

export type UpdateExpenseBodyType = {
  id: number;
  spendingDate: Date;
  amount: number;
};
