import { React, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import ConfirmationDialog from "../form/ConfirmationDialog";

export default function GenericTable({
  data,
  columns,
  onEdit,
  onDelete,
  deleteAllSelected,
  showCheckboxes = false,
  enablePagination = true,
  deleteCategory, // The delete function passed dynamically
  deleteMessage 
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control the confirmation dialog
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]); // Store selected category IDs

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Gather selected rows across all pages
  const selectedRowIds = table.getSelectedRowModel().rows.map((row) => row.original.id.toString());

  // Handle bulk delete action (trigger confirmation dialog)
  const handleDeleteAllSelected = () => {
    console.log("Selected Row IDs before deletion:", selectedRowIds); // Debugging log

    if (selectedRowIds.length > 0) {
      // Map selected row IDs to actual category IDs
      const selectedCategoryIds = selectedRowIds.map((rowId) => {
        const selectedRow = table.getRowModel().rows.find(
          (row) => row.original.id.toString() === rowId.toString()
        );
        return selectedRow ? selectedRow.original.id : null;
      }).filter(Boolean); // Filter out any null values

      console.log("Selected category IDs for deletion:", selectedCategoryIds); // Debugging log

      // Set selected category IDs to state and show confirmation dialog
      setSelectedCategoryIds(selectedCategoryIds);
      setShowDeleteConfirmation(true);
    } else {
      console.log("No rows selected."); // Add debug log if no rows are selected
    }
  };

  // Handle deletion after confirmation
  const handleConfirmDelete = () => {
    if (selectedCategoryIds.length > 0) {
      deleteCategory(selectedCategoryIds); // Call deleteCategory with selected category IDs
      setShowDeleteConfirmation(false); // Close the dialog after deletion
    }
  };

  // Cancel the deletion (close dialog without deleting)
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false); // Close the dialog without deleting
  };

  return (
    <div className="w-full">
      <div className="rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {showCheckboxes && (
                  <TableHead>
                    <Checkbox
                      checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                      }
                      onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                      }
                      aria-label="Select all"
                    />
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
                {/* Actions column (always visible) */}
                <TableHead>Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {showCheckboxes && (
                    <TableCell>
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                      />
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}

                  {/* Actions Dropdown for each row */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 noTransformTrigger">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(row.original)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(row.original.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (showCheckboxes ? 2 : 1)} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog for Delete All Selected */}
      <ConfirmationDialog
        open={showDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={`This action will permanently delete all selected ${deleteMessage}. Are you sure?`}
        confirmVariant="destructive"   // Custom variant for the confirm button
        cancelVariant="outline"       // Custom variant for the cancel button
      />

      
      {/* Buttons and Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        {/* Row Selection Info and Delete All Button */}
        {showCheckboxes && (
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteAllSelected}
              disabled={selectedRowIds.length === 0}
            >
              Delete All Selected
            </Button>
          </div>
        )}

        {/* Pagination */}
        <div className="space-x-2">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
