import {
  FractalNameUpdated as FractalNameUpdatedEvent,
  FractalSubDAODeclared as FractalSubDAODeclaredEvent,
} from '../generated/FractalRegistry/FractalRegistry';
import { loadOrCreateDAO } from './shared';

export function handleFractalNameUpdated(event: FractalNameUpdatedEvent): void {
  const dao = loadOrCreateDAO(event.params.daoAddress);
  dao.name = event.params.daoName;
  dao.save();
}

export function handleFractalSubDAODeclared(event: FractalSubDAODeclaredEvent): void {
  const subDAO = loadOrCreateDAO(event.params.subDAOAddress);
  if (subDAO.parentAddress !== null) {
    return;
  }

  subDAO.parentAddress = event.params.parentDAOAddress;
  subDAO.save();

  const parentDAO = loadOrCreateDAO(event.params.parentDAOAddress);
  parentDAO.hierarchy = parentDAO.hierarchy.concat([subDAO.id]);
  parentDAO.save();
}
