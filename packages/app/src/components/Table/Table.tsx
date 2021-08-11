import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable } from './hooks'
import TableHeaderRow from './TableHeaderRow'
import { ColumnType } from './types'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  sortColumn?: string
  scrollingUp?: boolean
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  min-width: 280px;
`

const TableWrapper = styled.div`
  flex-direction: row;
  flex: 1 1 auto;

  -webkit-box-pack: start;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  display: flex;
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 16px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: relative;
`

const TableBody = styled.tbody`
  width: 100%;
  & tr {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    td {
      font-size: 16px;
      vertical-align: left;
    }
    th {
      vertical-align: left;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const Table: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { scrollingUp } = props
  const { data, columns } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'timestampDescending' })
  const labels = columns.map((name) => name.label)
  console.log(rows)
  return (
    <>
      <Container>
        <TableContainer>
          <TableWrapper ref={tableWrapperEl}>
            <StyledTable>
              <TableBody>
                <TableHeaderRow labels={columns} scrollingUp={scrollingUp} actionColumnName='details' />
                {rows.map((row) => {
                  return <Row {...row.original} isLastIndex={rows[rows.length - 1].id === row.id} key={`table-row-${row.id}`} />
                })}
              </TableBody>
            </StyledTable>
          </TableWrapper>
        </TableContainer>
      </Container>
    </>
  )
}

export default Table
