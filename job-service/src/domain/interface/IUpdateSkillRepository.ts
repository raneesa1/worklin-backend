// src/domain/interface/IUpdateSkillRepository.ts
import { skillEntity } from "../entities/skillEntity";

export interface IUpdateSkillRepository {
  update(id: string, skill: Partial<skillEntity>): Promise<skillEntity | null>;
}
