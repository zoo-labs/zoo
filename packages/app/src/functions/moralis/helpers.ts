import { Moralis,  } from 'moralis'

declare type DefaultQueryAttribute = Moralis.Attributes
declare type Query<Entity extends DefaultQueryAttribute = DefaultQueryAttribute> = Moralis.Query<Moralis.Object<Entity>>
declare type QueryPromise = Promise<Moralis.Object<Moralis.Attributes>[]>

export function queryEggs(): QueryPromise {
  const Eggs = Moralis.Object.extend('Eggs')
  const query = new Moralis.Query(Eggs)
  query.limit(6000)
  // query.find()
  return query.find()
}

export function queryAnimals(): QueryPromise {
  const Animals = Moralis.Object.extend('Animals')
  const query = new Moralis.Query(Animals)
  query.limit(1000)
  return query.find()
}

