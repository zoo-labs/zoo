import React, { Fragment, useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { CheckmarkCircleIcon } from 'components/Svg'
import CopyHelper from 'components/Copy/Copy'
interface Data {
  hash: string
  action: string
  blockNumber: string
  tokenID: string
  url: string
  id: string
  createdAt: string
}

function createData(hash: string, action: string, blockNumber: string, tokenID: string, url: string, id: string, createdAt: string): Data {
  return {
    hash,
    action,
    blockNumber,
    tokenID,
    url,
    id,
    createdAt,
  }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },

  { id: 'blockNumber', numeric: false, disablePadding: false, label: 'Block' },
  { id: 'tokenID', numeric: false, disablePadding: false, label: 'Token Id' },
  {
    id: 'hash',
    numeric: false,
    disablePadding: true,
    label: 'Hash',
  },
]

interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  order: Order
  orderBy: string
  rowCount: number
}
interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <div style={{ width: '100%' }}>
      <div className='flex items-center justify-between px-8 py-4'>
        {headCells
          .filter((cell) => {
            if (!sm || !md) {
              return cell.id == 'hash'
            } else {
              return cell
            }
          })
          .map((headCell) => (
            <div
              key={headCell.id}
              className='flex-1'
              // align={headCell.numeric ? "right" : "left"}
              // padding={"normal"}
              // sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
                <h6 className='text-white text-xs uppercase  md:inline-block font-bold'>{headCell.label}</h6>
                {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
              </TableSortLabel>
            </div>
          ))}
      </div>
    </div>
  )
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
    table: {
      background: 'transparent',
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      // minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    modalPaper: { height: '100%' },
  }),
)

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function TransactionTable(props: { Transactions: any }) {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const { Transactions } = props
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt')
  const [selected, setSelected] = React.useState<any>({})
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [hovered, setHovered] = useState('')
  const rows = Transactions.map(
    (
      data: {
        hash: string
        action: string
        blockNumber: string
        tokenID: string
        url: string
        id: string
        createdAt: string
      },
      index: number,
    ) => {
      const { hash, action, blockNumber, tokenID, url, id, createdAt } = data

      return createData(hash, action, blockNumber, tokenID, url, id, createdAt)
    },
  )
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  //   const isSelected = (name: string | number) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'} aria-label='enhanced table'>
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={null}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <div style={{ width: '100%' }}>
            {stableSort(rows, getComparator(order, orderBy))
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <div
                    className='flex justify-between hover:shadow my-2 bg-white items-center py-4 px-3 lg:px-8
                  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-102
                  text-grey-500 rounded-xl'
                    style={{ backgroundColor: '#1f2125' }}>
                    <div className='flex items-center' id={labelId} style={{ flex: !sm || !md ? 1 : 1 }}>
                      <CheckmarkCircleIcon fill='white' />
                      <h6 style={{ marginLeft: 10 }} className=' text-xs uppercase hidden md:inline-block font-semibold'>
                        {row.action}
                      </h6>
                    </div>
                    <div className='flex-1'>
                      <h6 style={{}} className='text-xs uppercase lg:inline-block font-semibold'>
                        {row.blockNumber}
                      </h6>
                    </div>
                    <div className='flex-1'>
                      <h6 style={{}} className=' text-xs uppercase hidden md:inline-block font-semibold'>
                        {row.tokenID}
                      </h6>
                    </div>
                    <div className='flex-1' style={{ flex: !sm ? 8 : 1 }}>
                      <a href={`${row.url.toString()}`} target='_blank' className=' text-xs uppercase  md:inline-block font-semibold'>
                        {row.hash.toString().slice(0, 20)} ↗
                      </a>
                    </div>
                    <div>
                      <CopyHelper toCopy={row.hash.toString()} />
                    </div>
                  </div>
                )
              })}
          </div>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  )
}
