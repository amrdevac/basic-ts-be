export interface knexMysqlErrorType {
  code: string;
  errno: number;
  sqlState?: string;
  sqlMessage?: string;
  sql?: string;
}

export const databaseErrorHandler = (data: knexMysqlErrorType) => {
  return { data: data, isError: true };
};
