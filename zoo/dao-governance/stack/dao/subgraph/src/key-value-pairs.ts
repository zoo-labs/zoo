import { log } from '@graphprotocol/graph-ts';
import { ValueUpdated as ValueUpdatedEvent } from '../generated/KeyValuePairs/KeyValuePairs';
import { loadOrCreateDAO } from './shared';
import { Bytes } from '@graphprotocol/graph-ts';

export function handleValueUpdated(event: ValueUpdatedEvent): void {
  if (event.params.key == 'proposalTemplates') {
    const dao = loadOrCreateDAO(event.params.theAddress);
    dao.proposalTemplatesHash = event.params.value;
    dao.save();
  } else if (event.params.key == 'snapshotENS') {
    const dao = loadOrCreateDAO(event.params.theAddress);
    dao.snapshotENS = event.params.value;
    dao.save();
  } else if (event.params.key == 'daoName') {
    const dao = loadOrCreateDAO(event.params.theAddress);
    dao.name = event.params.value;
    dao.save();
  } else if (event.params.key == 'childDao') {
    const subDAO = loadOrCreateDAO(Bytes.fromHexString(event.params.value));
    if (subDAO.parentAddress !== null) {
      return;
    }

    subDAO.parentAddress = event.params.theAddress;
    subDAO.save();

    const parentDAO = loadOrCreateDAO(event.params.theAddress);
    parentDAO.hierarchy = parentDAO.hierarchy.concat([subDAO.id]);
    parentDAO.save();
  } else {
    log.warning('Unknown key: {}', [event.params.key]);
  }
}
