import { skillEntity } from "../entities/skillEntity";

export interface ICreateSkillUseCase {
  execute(skillData: skillEntity): Promise<any>;
}

export interface IGetSkillsUseCase {
  execute(
    page: number,
    itemsPerPage: number
  ): Promise<{ skills: skillEntity[]; totalItems: number }>;
}

export interface IGetSkillByIdUseCase {
  execute(skillId: string): Promise<any>;
}

export interface IUpdateSkillUseCase {
  execute(
    skillId: string,
    skillData: { name: string; description: string }
  ): Promise<any>;
}

export interface IDeleteSkillUseCase {
  execute(skillId: string): Promise<any>;
}
