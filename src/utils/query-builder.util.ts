import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource, SelectQueryBuilder } from 'typeorm';

export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
  select?: string;
  relations?: Record<string, string[]>;
}

export function applyQueryOptions<T>(
  query: SelectQueryBuilder<T>,
  queryOptions: QueryOptions,
  alias: string,
  entityClass: EntityClassOrSchema,
  dataSource: DataSource,
): SelectQueryBuilder<T> {
  const {
    page = 1,
    limit = 100,
    sort,
    order,
    filters,
    select,
    relations,
  } = queryOptions;

  if (filters) {
    Object.entries(filters).forEach(([field, value]) => {
      query.andWhere(`${alias}.${field} = :${field}`, { [field]: value });
    });
  }

  if (select) {
    const validFields = Object.keys(
      dataSource.getMetadata(entityClass).propertiesMap,
    );
    const selectedFields = select.split(',').map((field) => field.trim());

    selectedFields.forEach((field) => {
      if (!validFields.includes(field)) {
        throw new HttpException(
          `The field "${field}" does not exist in the entity.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    query.select(selectedFields.map((field) => `${alias}.${field}`));
  }

  if (relations) {
    Object.entries(relations).forEach(([relation, relationFields]) => {
      query.leftJoinAndSelect(`${alias}.${relation}`, relation);

      if (relationFields && relationFields.length > 0) {
        relationFields.forEach((field) =>
          query.addSelect(`${relation}.${field}`, `${relation}_${field}`),
        );
      }
    });
  }

  if (sort) {
    query.orderBy(`${alias}.${sort}`, order || 'ASC');
  }

  if (page && limit) {
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);
  }

  return query;
}
