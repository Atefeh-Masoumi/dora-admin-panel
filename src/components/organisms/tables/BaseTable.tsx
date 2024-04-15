import { Fragment, useEffect, useState, FC, ChangeEvent } from "react";
import {
  Stack,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  Typography,
  Skeleton,
  Box,
  TableSortLabel,
} from "@mui/material";
import {
  DorsaTableCell,
  DorsaTablePagination,
  DorsaTableRow,
} from "src/components/atoms/DorsaTable";
import { columnType } from "./table.types";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { numberComparator } from "src/utils/compare";
import { visuallyHidden } from "@mui/utils";

export type tableOrderType = "asc" | "desc";

const defaultRowsPerPage = 10;

type BaseTablePropsType = {
  rows: any[];
  struct: columnType[];
  RowComponent: FC<any>;
  text: string;
  isLoading: boolean;
  initialOrder?: number;
  initialSortDirection?: 1 | -1;
  RowsPerPage?: number;
};

export const BaseTable: FC<BaseTablePropsType> = ({
  rows,
  struct,
  RowComponent,
  text,
  isLoading,
  initialOrder = -1,
  initialSortDirection = -1,
  RowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<number>(initialOrder);
  const [sortDirection, setSortDirection] =
    useState<number>(initialSortDirection);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => setPage(1), [rows]);

  const sortingColumn = orderBy >= 0 && struct[orderBy];

  return (
    <Fragment>
      {isLoading ? (
        <Stack spacing={1} px={2}>
          {[...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={50}
              sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
            />
          ))}
        </Stack>
      ) : rows.length === 0 ? (
        <EmptyTable text={text} />
      ) : (
        <Stack direction="row" justifyContent="center">
          <Stack spacing={1.5} width="100%" overflow="auto">
            <Stack direction="row">
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <DorsaTableRow>
                      {struct.map((column, index) => {
                        const isActive = orderBy === index;

                        return (
                          <DorsaTableCell
                            key={column.id}
                            align="center"
                            sx={{
                              px: 1,
                              py: 2,
                              whiteSpace: "nowrap",
                              cursor: !column?.disableSort
                                ? "pointer"
                                : "default",
                            }}
                            onClick={() => {
                              if (column?.disableSort) return;
                              if (orderBy === index) {
                                setSortDirection(-sortDirection);
                              } else setOrderBy(index);
                            }}
                          >
                            <TableSortLabel
                              active={isActive}
                              direction={
                                isActive
                                  ? sortDirection === 1
                                    ? "asc"
                                    : "desc"
                                  : "asc"
                              }
                            >
                              {column.label}
                              {isActive ? (
                                <Box component="span" sx={visuallyHidden}>
                                  {sortDirection === -1
                                    ? "sorted descending"
                                    : "sorted ascending"}
                                </Box>
                              ) : null}
                            </TableSortLabel>
                          </DorsaTableCell>
                        );
                      })}
                    </DorsaTableRow>
                  </TableHead>
                  <TableBody>
                    {sortingColumn && !sortingColumn?.disableSort
                      ? [...rows]
                          .sort(
                            (a: any, b: any) =>
                              sortDirection *
                              (sortingColumn.comparator || numberComparator)(
                                a[sortingColumn.id],
                                b[sortingColumn.id]
                              )
                          )
                          .slice(
                            (page - 1) * (rowsPerPage || defaultRowsPerPage),
                            page * (rowsPerPage || defaultRowsPerPage)
                          )
                          .map((row: any, index: number) => (
                            <RowComponent
                              key={
                                page * (rowsPerPage || defaultRowsPerPage) +
                                index
                              }
                              row={row}
                            />
                          ))
                      : rows
                          .slice(
                            (page - 1) * (rowsPerPage || defaultRowsPerPage),
                            page * (rowsPerPage || defaultRowsPerPage)
                          )
                          .map((row: any, index: number) => (
                            <RowComponent
                              key={
                                page * (rowsPerPage || defaultRowsPerPage) +
                                index
                              }
                              row={row}
                            />
                          ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="start"
              alignItems="center"
              py={1}
              spacing={3}
              display={
                rows.length <= (rowsPerPage || defaultRowsPerPage)
                  ? "none"
                  : "flex"
              }
            >
              <DorsaTablePagination
                count={Math.ceil(
                  rows.length / (rowsPerPage || defaultRowsPerPage)
                )}
                color="primary"
                siblingCount={0}
                shape="rounded"
                page={page}
                onChange={handleChange}
                size="large"
              />
              <Typography color="rgba(110, 118, 138, 0.8)">
                {rows.length} نتیجه ، صفحه {page} از
                {Math.ceil(rows.length / (rowsPerPage || defaultRowsPerPage))}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Fragment>
  );
};
