import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { handleFractalNameUpdated, handleFractalSubDAODeclared } from "../src/fractal-registry"
import { 
  createFractalNameUpdatedEvent, 
  createFractalSubDAODeclaredEvent 
} from "./fractal-registry-utils"
import { DAO } from "../generated/schema"

const daoAddress = Address.fromString(
  "0x0000000000000000000000000000000000000001"
)
const daoName = "Amazing Fractal DAO"

describe("FractalRegistry", () => {
  beforeAll(() => {
    let newFractalNameUpdatedEvent = createFractalNameUpdatedEvent(
      daoAddress,
      daoName
    )
    handleFractalNameUpdated(newFractalNameUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("DAO created and stored when FractalNameUpdated event emitted", () => {
    assert.entityCount("DAO", 1)

    assert.fieldEquals(
      "DAO",
      "0x0000000000000000000000000000000000000001",
      "address",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DAO",
      "0x0000000000000000000000000000000000000001",
      "name",
      "Amazing Fractal DAO"
    )
  })

  test("DAO hierarchy updated properly when FractalSubDAODeclaredEvent is emitted", () => {
    const subDAOAddress = Address.fromString("0x0000000000000000000000000000000000000002");
    const subDAODeclaredEvent = createFractalSubDAODeclaredEvent(daoAddress, subDAOAddress);
    handleFractalSubDAODeclared(subDAODeclaredEvent)

    assert.fieldEquals(
      "DAO",
      "0x0000000000000000000000000000000000000002",
      "address",
      "0x0000000000000000000000000000000000000002"
    )

    assert.fieldEquals(
      "DAO",
      "0x0000000000000000000000000000000000000002",
      "parentAddress",
      "0x0000000000000000000000000000000000000001"
    )

    const parentDAO = DAO.load(Address.fromString("0x0000000000000000000000000000000000000001"));
    const parentDAOFirstSubDAO = parentDAO!.hierarchy[0];
  })
})
