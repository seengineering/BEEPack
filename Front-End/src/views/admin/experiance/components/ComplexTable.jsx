import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function ComplexTable(props) {
  const { tableData = [] } = props; // Default to empty array if no data provided
  const [sorting, setSorting] = React.useState([]);

  const columns = [
    columnHelper.accessor("alert_type", {
      id: "alert_type",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ALERT TYPE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">STATUS</p>
      ),
      cell: (info) => {
        const status = info.getValue().toLowerCase();
        return (
          <div className="flex items-center">
            {status.includes("high temp") ? (
              <MdOutlineError className="text-amber-500 me-1 dark:text-amber-300" />
            ) : status.includes("normal") ? (
              <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
            ) : (
              <MdCancel className="text-red-500 me-1 dark:text-red-300" />
            )}
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {info.getValue()}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("sensor_id", {
      id: "sensor_id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">SENSOR ID</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {new Date(info.getValue()).toLocaleString()}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Alerts History
        </div>
        <CardMenu />
      </div>

      {tableData.length === 0 ? (
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          No alerts found
        </div>
      ) : (
        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="!border-px !border-gray-400">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: "",
                            desc: "",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 5)
                .map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="min-w-[150px] border-white/0 py-3 pr-4"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}