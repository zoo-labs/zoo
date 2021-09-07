export const sortData = (data: Array<any>, byType: string) => {
    return data.sort((a, b) => Number(b.tokenID) - Number(a.tokenID))
  }
  export const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };