// src/domain/interface/ICreateSkillRepository.ts
import { skillEntity } from "../entities/skillEntity";

export interface ICreateSkillRepository {
  create(skill: skillEntity): Promise<skillEntity>;
}
