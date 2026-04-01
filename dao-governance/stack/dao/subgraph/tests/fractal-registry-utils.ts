import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  FractalNameUpdated,
  FractalSubDAODeclared
} from "../generated/FractalRegistry/FractalRegistry"

export function createFractalNameUpdatedEvent(
  daoAddress: Address,
  daoName: string
): FractalNameUpdated {
  let fractalNameUpdatedEvent = changetype<FractalNameUpdated>(newMockEvent())

  fractalNameUpdatedEvent.parameters = new Array()

  fractalNameUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "daoAddress",
      ethereum.Value.fromAddress(daoAddress)
    )
  )
  fractalNameUpdatedEvent.parameters.push(
    new ethereum.EventParam("daoName", ethereum.Value.fromString(daoName))
  )

  return fractalNameUpdatedEvent
}

export function createFractalSubDAODeclaredEvent(
  parentDAOAddress: Address,
  subDAOAddress: Address
): FractalSubDAODeclared {
  let fractalSubDaoDeclaredEvent = changetype<FractalSubDAODeclared>(
    newMockEvent()
  )

  fractalSubDaoDeclaredEvent.parameters = new Array()

  fractalSubDaoDeclaredEvent.parameters.push(
    new ethereum.EventParam(
      "parentDAOAddress",
      ethereum.Value.fromAddress(parentDAOAddress)
    )
  )
  fractalSubDaoDeclaredEvent.parameters.push(
    new ethereum.EventParam(
      "subDAOAddress",
      ethereum.Value.fromAddress(subDAOAddress)
    )
  )

  return fractalSubDaoDeclaredEvent
}
