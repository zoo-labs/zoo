import { ProxyCreation as ProxyCreation130 } from '../generated/GnosisSafeProxyFactory130/GnosisSafeProxyFactory130';
import { Bytes } from '@graphprotocol/graph-ts';
import { Safe } from '../generated/schema';

export function handleSafeProxy130Created(event: ProxyCreation130): void {
  const newSafe = new Safe(event.params.proxy);
  newSafe.created = event.block.timestamp.toString();
  newSafe.creator = event.transaction.from;
  newSafe.transactionHash = event.transaction.hash;
  newSafe.factoryAddress = event.address;
  newSafe.singleton = event.params.singleton;
  newSafe.setupData = Bytes.fromHexString('0x');
  newSafe.save();
}
