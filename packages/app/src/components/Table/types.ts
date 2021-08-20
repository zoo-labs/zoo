export type ColumnType<T> = {
  name: string
  label?: string
  hidden?: boolean
  sort?: ((a: RowType<T>, b: RowType<T>) => number) | undefined
  render?: ({ value, row }: { value: any; row: T }) => React.ReactNode
  headerRender?: HeaderRenderType
}

export type ColumnStateType<T> = {
  name: string
  label: string
  hidden: boolean
  sort?: ((a: RowType<T>, b: RowType<T>) => number) | undefined
  sorted: {
    on: boolean
    asc?: boolean
  }
  headerRender?: HeaderRenderType
}

export type HeaderRenderType = ({ label }: { label: React.ReactNode }) => React.ReactNode

// this is the type saved as state and returned
export type HeaderType<T> = {
  name: string
  label?: string
  hidden?: boolean
  sorted: {
    on: boolean
    asc?: boolean
  }
  sort?: ((a: RowType<T>, b: RowType<T>) => number) | undefined
  render: () => React.ReactNode
}

export type DataType = { [key: string]: any }

export type ColumnByNamesType<T> = {
  [key: string]: ColumnType<T>
}

export type RenderFunctionType<T> = ({ value, row }: RenderFunctionArgsType<T>) => React.ReactNode | undefined

type RenderFunctionArgsType<T> = {
  value: any
  row: T
}

export type ColumnByNameType<T> = Omit<Required<ColumnType<T>>, 'name' | 'sort'>

export interface RowType<T extends DataType> {
  id: number
  cells: CellType[]
  hidden?: boolean
  selected?: boolean
  original: T
}

export type CellType = {
  value: any
  render: () => React.ReactNode
}

export interface UseTableTypeParams<T extends DataType> {
  columns: ColumnType<T>[]
  data: T[]
  options?: {
    sortable?: boolean
    selectable?: boolean
    filter?: (row: RowType<T>[]) => RowType<T>[]
    filterOn?: boolean
  }
}

export interface UseTablePropsType<T> {
  columns: ColumnType<T>[]
  data: T[]
  options?: {
    sortable?: boolean
    selectable?: boolean
    filter?: (row: RowType<T>[]) => RowType<T>[]
  }
}

export interface UseTableOptionsType<T> {
  sortable?: boolean
  selectable?: boolean
  pagination?: boolean
  sortColumn?: string
  filter?: (row: RowType<T>[]) => RowType<T>[]
}

export interface UseTableReturnType<T> {
  headers: HeaderType<T>[]
  originalRows: RowType<T>[]
  rows: RowType<T>[]
  selectedRows: RowType<T>[]
  dispatch: React.Dispatch<TableAction<T>>
  toggleSort: (columnName: string, isAscOverride?: boolean) => void
  selectRow: (id: number) => void
  toggleAll: () => void
  setSearchString: (searchString: string) => void
  toggleAllState: boolean
  pagination: PaginatorType
}

type PaginatorType = {
  nextPage: () => void
  prevPage: () => void
  page: number
  perPage: number
  canNext: boolean
  canPrev: boolean
}

export type TableState<T extends DataType> = {
  columnsByName: ColumnByNamesType<T>
  columns: ColumnStateType<T>[]
  rows: RowType<T>[]
  originalRows: RowType<T>[]
  selectedRows: RowType<T>[]
  filterOn: boolean
  sortColumn: string | null | undefined
  toggleAllState: boolean
  pagination: PaginatorType
  paginationEnabled: boolean
}

export type TableAction<T extends DataType> =
  | { type: 'TOGGLE_SORT'; columnName: string; isAscOverride?: boolean }
  | { type: 'SELECT_ROW'; rowId: number }
  | { type: 'GLOBAL_FILTER'; filter: (row: RowType<T>[]) => RowType<T>[] }
  | { type: 'SEARCH_STRING'; searchString: string }
  | { type: 'GLOBAL_FILTER_OFF' }
  | { type: 'SET_ROWS'; data: RowType<T>[] }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { type: 'TOGGLE_ALL' }

export type TableProps = {
  data?: TableDataTypes[]
  selectedFilters?: string
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  translationId: number
  sortable: boolean
}

export type ScrollBarProps = {
  ref: string
  width: number
}

export type TableDataTypes = {
  POOL: string
  APY: string
  EARNED: string
  STAKED: string
  DETAILS: string
  LINKS: string
}

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    translationId: 999,
    sortable: true,
    label: '',
  },
  {
    id: 3,
    name: 'txHash',
    translationId: 736,
    sortable: true,
    label: 'TxHash',
  },
  // {
  //   id: 5,
  //   name: 'timestamp',
  //   translationId: 999,
  //   sortable: true,
  //   label: 'Timestamp',
  // },
  {
    id: 6,
    name: 'txAction',
    translationId: 999,
    sortable: true,
    label: 'TxAction',
  },
  {
    id: 6,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: '',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    translationId: 999,
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'txHash',
    translationId: 736,
    sortable: true,
    label: 'Transaction Hash',
  },
  {
    id: 3,
    name: 'status',
    translationId: 1072,
    sortable: true,
    label: 'Status',
  },
  {
    id: 4,
    name: 'block',
    translationId: 999,
    sortable: true,
    label: 'Block',
  },
  {
    id: 5,
    name: 'timestamp',
    translationId: 999,
    sortable: true,
    label: 'Timestamp',
  },
  {
    id: 6,
    name: 'txAction',
    translationId: 999,
    sortable: true,
    label: 'Transaction Action',
  },
  {
    id: 7,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: '',
  },
]

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}
