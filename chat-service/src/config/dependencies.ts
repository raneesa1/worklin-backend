import * as repositories from "../infrastructure/database/mongoDb/repositories";
import { IDependencies } from "../application/interfaces/IDependencies";
import * as useCases from "../application/useCases";

export const dependencies: IDependencies = {
  useCases,
  repositories,
};
