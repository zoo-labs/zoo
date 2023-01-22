import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  min-width: 350px;
  tr td {
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.6);
  }
  thead {
     tr:first-child {
    border-0
  }
    border-bottom: 0;
    tr td {
      border: 0;
    }
  }
  tr:last-child {
    td {
      border-bottom: 0;
    }
  }

  tr th:first-child,
  tr td:first-child {
    border-left: 1px solid #1f2030;
  }
  /* top-left border-radius */
  tr:first-child th:first-child {
    border-top-left-radius: 15px;
  }

  /* top-right border-radius */
  tr:first-child th:last-child {
    border-top-right-radius: 15px;
  }

  /* bottom-left border-radius */
  tr:last-child td:first-child {
    border-bottom-left-radius: 15px;
  }

  /* bottom-right border-radius */
  tr:last-child td:last-child {
    border-bottom-right-radius: 15px;
  }
`

const Trading = ({
  children,
  TitleA = 'Use "TableA" prop To change',
  TitleB = 'Use "TableB" prop To change',
  TitleC = 'Use "TableC" prop To change',
  TitleD = 'Use "TableD" prop To change',
  TitleMain = 'Use "TitleMain" prop To change',
}) => {
  return (
    <div className="w-full bg-transparent min-h-[800px]">
      <h1 className="mb-12 text-center mt-10 text-2xl md:text-[44px] leading-[3rem] lg:leading-4 text-white font-medium">{TitleMain}</h1>

      <TableContainer className="w-full  border-[#292A3E] rounded-2xl p-2 overflow-auto whitespace-nowrap">
        <thead className="p-2 bg-[#292A3E]">
          <tr className="">
            <th className="text-xs md:text-base  text-left p-4 px-10 py-6 text-white  ">{TitleA}</th>
            <th className="text-xs md:text-base  text-center p-4 text-white  ">{TitleB}</th>
            <th className="text-xs md:text-base  text-center p-4 text-white  ">{TitleC}</th>
            <th className="text-xs md:text-base  text-center p-4 text-white  ">{TitleD}</th>
            <th className="text-xs md:text-base  text-center p-4 text-white  " />
          </tr>
        </thead>
        <tbody className="p-2">{children}</tbody>
      </TableContainer>
    </div>
  )
}

export default Trading
