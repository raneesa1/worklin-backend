import { skillEntity } from "../entities/skillEntity";

export interface IGetSkillsUseCase {
  execute(
    page: number,
    itemsPerPage: number
  ): Promise<{ skills: skillEntity[]; totalItems: number }>;
}
