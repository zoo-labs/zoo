import Moralis from 'moralis'

declare type DefaultQueryAttribute = Moralis.Attributes
declare type Query<Entity extends DefaultQueryAttribute = DefaultQueryAttribute> = Moralis.Query<Moralis.Object<Entity>>

export function queryEggs(): Query {
  const Eggs = Moralis.Object.extend('Eggs')
  const query = new Moralis.Query(Eggs)
  query.limit(1000)
  return query.find()
}

export function queryAnimals(): Query {
  const Animals = Moralis.Object.extend('Animals')
  const query = new Moralis.Query(Animals)
  query.limit(1000)
  return query.find()
}
