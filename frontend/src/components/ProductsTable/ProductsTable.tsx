import { Box, Button, Paper } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridRowId,
  type GridRowModel,
  GridRowModes,
  GridRowModesModel,
  type GridRowsProp,
  GridToolbarContainer,
  type GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Add, Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { useState } from 'react';
import { randomId } from '@mui/x-data-grid-generator';
import { useProduct } from '@/models/product';

type EditToolbarProps = {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<ApolloCommerce.Models.Product>,
    ) => GridRowsProp<ApolloCommerce.Models.Product>,
  ) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  rowsSelected: GridRowSelectionModel;
  onDeleteSeleted: (ids: GridRowId[]) => void;
};

function EditToolbar({ setRows, setRowModesModel }: EditToolbarProps) {
  function handleClick() {
    const id = randomId();
    setRows(oldRows => [
      ...oldRows,
      {
        id,
        name: '',
        description: '',
        price: 0,
        color: '',
        promotionPrice: 0,
        category: '',
      },
    ]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<Add />} onClick={handleClick}>
        Add Product
      </Button>
    </GridToolbarContainer>
  );
}

type Props = {
  products: ApolloCommerce.Models.Product[];
  isLoading: boolean;
  onCreate: (product: ApolloCommerce.Models.Product) => void;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (newPaginationModel: {
    page: number;
    pageSize: number;
  }) => void;
  count: number;
};

export default function ProductsTable({
  products,
  onCreate,
  isLoading,
  paginationModel,
  onPaginationModelChange,
  count,
}: Props) {
  const [rows, setRows] = useState<Partial<ApolloCommerce.Models.Product>[]>([
    ...products,
  ]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { update: updateProduct, delete: deleteProduct } = useProduct();

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    return deleteProduct(id.toString());
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = products.find(row => row.id === id);
    if (editedRow!.name || editedRow!.description || editedRow!.price) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const processRowUpdate = (
    newRow: GridRowModel<ApolloCommerce.Models.Product>,
  ) => {
    if (products.find(product => product.id === newRow.id)) {
      updateProduct(newRow as ApolloCommerce.Models.Product);
    } else {
      onCreate(newRow as ApolloCommerce.Models.Product);
    }
    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      editable: true,
    },
    { field: 'price', headerName: 'Price', flex: 1, editable: true },
    { field: 'color', headerName: 'Color', flex: 1, editable: true },
    { field: 'promotionPrice', headerName: 'Promotion Price', flex: 1 },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <Paper>
      <Box
        sx={{
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}>
        <DataGrid
          rows={rows as ApolloCommerce.Models.Product[]}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: paginationModel,
            },
          }}
          pageSizeOptions={[
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
            { value: count, label: 'All' },
          ]}
          onPaginationModelChange={onPaginationModelChange}
          paginationMode="server"
          checkboxSelection
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              setRowModesModel,
              setRows,
            },
          }}
          rowCount={count}
          loading={isLoading}
        />
      </Box>
    </Paper>
  );
}
