import { IDependencies } from "../application/interfaces/IDependencies";
import * as useCases from "../application/useCases";
import * as repositories from "../infrastructure/database/mongoDb/repositories";
export const dependencies: IDependencies = {
  useCases,
  repositories,
}
