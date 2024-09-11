import {
  IcreateRoomUseCase,
  IGetMessageUseCase,
  IGetRoomUseCase,
  IListAllMessageUseCase,
  ISendMessageUseCase,
  IUpdateReadUseCase,
} from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  sendMessageUseCase: (dependencies: IDependencies) => ISendMessageUseCase;
  getMessageUseCase: (dependencies: IDependencies) => IGetMessageUseCase;
  listAllMessageUseCase: (
    dependencies: IDependencies
  ) => IListAllMessageUseCase;
  updateReadUseCase: (dependencies: IDependencies) => IUpdateReadUseCase;
  getRoomUseCase: (dependencies: IDependencies) => IGetRoomUseCase;
  createRoomUseCase: (dependencies: IDependencies) => IcreateRoomUseCase;
}
