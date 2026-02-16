import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Column {
  header: string;
  accessor: string;
  className?: string;
  isHeader?: boolean;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  testId?: string;
}

export default function ResponsiveTable({ columns, data, title, testId }: ResponsiveTableProps) {
  return (
    <div className="my-12" data-testid={testId}>
      {title && <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>}
      
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-600 text-white font-semibold">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  scope="col" 
                  className={cn("border py-3 px-4 text-center", col.className)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((col, colIdx) => {
                  const content = row[col.accessor];
                  if (col.isHeader) {
                    return (
                      <th 
                        key={colIdx} 
                        scope="row" 
                        className={cn("border py-3 px-4 text-left font-medium text-gray-700", col.className)}
                      >
                        {content}
                      </th>
                    );
                  }
                  return (
                    <td 
                      key={colIdx} 
                      className={cn("border py-3 px-4 text-center", col.className)}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIdx) => (
          <Card key={rowIdx} className="overflow-hidden border-orange-100">
            <CardContent className="p-0">
              <div className="bg-orange-50 px-4 py-2 border-b border-orange-100">
                <p className="font-bold text-orange-700">
                  {columns.find(c => c.isHeader)?.accessor ? row[columns.find(c => c.isHeader)!.accessor] : `Entry ${rowIdx + 1}`}
                </p>
              </div>
              <div className="p-4 space-y-2">
                {columns.filter(c => !c.isHeader).map((col, colIdx) => (
                  <div key={colIdx} className="flex justify-between items-center gap-4 text-sm">
                    <span className="text-gray-500 font-medium">{col.header}</span>
                    <span className="text-gray-900 font-bold text-right">{row[col.accessor]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
