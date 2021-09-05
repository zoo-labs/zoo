export const sortData = (data: Array<any>, byType: string) => {
    return data.sort((a, b) => Number(b.tokenID) - Number(a.tokenID))
  }