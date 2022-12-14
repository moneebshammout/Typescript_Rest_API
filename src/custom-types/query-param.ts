export type CategoryListByParam = {
  id?: number;
  name?: string;
  userId?: number;
};

export type ExpenseDeleteParam = {
  id?: number;
};

export type ExpenseListByParam = {
  day?: number;
  month?: number;
  year?: number;
};
