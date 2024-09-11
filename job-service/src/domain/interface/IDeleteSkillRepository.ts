// src/domain/interface/IDeleteSkillRepository.ts
import { skillEntity } from "../entities/skillEntity";

export interface IDeleteSkillRepository {
  delete(id: string): Promise<skillEntity | null>;
}
