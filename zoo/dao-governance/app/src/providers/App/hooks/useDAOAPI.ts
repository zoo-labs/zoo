// Mock DAO API hook for searching DAOs

export interface DAOInfo {
  name: string;
  address: string;
  network: string;
  type: string;
}

export async function queryDaosByName(name: string): Promise<DAOInfo[]> {
  try {
    const response = await fetch(`http://localhost:3005/d?name=${encodeURIComponent(name)}`);
    const data = await response.json();
    
    if (data.success && Array.isArray(data.data)) {
      return data.data.map((dao: any) => ({
        name: dao.dao_name || 'Unknown DAO',
        address: dao.dao_address,
        network: dao.dao_chain_id?.toString() || '1',
        type: dao.governance_module_name || 'Multisig',
      }));
    }
  } catch (error) {
    console.error('Error fetching DAOs:', error);
  }
  
  return [];
}

export function useDAOAPI() {
  return {
    queryDaosByName,
  };
}

export default useDAOAPI;