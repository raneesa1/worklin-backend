// src/domain/interface/IFindAllSkillsRepository.ts
import { skillEntity } from "../entities/skillEntity";

export interface IFindAllSkillsRepository {
  findAll(): Promise<skillEntity[]>;
}
