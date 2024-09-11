// src/domain/interface/IFindSkillByIdRepository.ts
import { skillEntity } from "../entities/skillEntity";

export interface IFindSkillByIdRepository {
  findById(id: string): Promise<skillEntity | null>;
}
