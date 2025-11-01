import { Bytes } from '@graphprotocol/graph-ts';
import { DAO } from '../generated/schema';

export const loadOrCreateDAO = (address: Bytes): DAO => {
  const existingDao = DAO.load(address); // Using address as ID
  if (existingDao) {
    return existingDao;
  }

  const newDao = new DAO(address);
  newDao.address = address; // But also keep address field on DAO entity in case we would want to use something else as ID
  newDao.hierarchy = [];
  return newDao;
};
