import { Knex } from "knex";

export type FilterType<T> = {
  [K in keyof T]: FilterOperator;
};

export type FilterOperator = "=" | "LIKE" | ">" | "<" | ">=" | "<=";

interface repositoryType {
  query: Knex.QueryBuilder;
  filter: any;
  request: any;
}

class repository {
  filter({ query, filter, request }: repositoryType): Knex.QueryBuilder {
    Object.entries(request).forEach(([key, value]: any) => {
      const dataFilter = filter[key];
      if (value !== "" && dataFilter) {
        let filteredValue = value;
        if (dataFilter == "LIKE") filteredValue = `%${value}%`;
        query = query.where(key, dataFilter, filteredValue);
      }
    });

    return query;
  }
}

export default repository;
