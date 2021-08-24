import TransactionTable from 'components/Transaction/Table'
import React from 'react'

interface TestProps {}

const Test: React.FC<TestProps> = ({}) => {
  return <TransactionTable Transactions={[]} />
}

export default Test
