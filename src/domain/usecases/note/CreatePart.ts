import { LaunchRepository } from "../../../../infra/repository/LaunchRepository";
import { Part } from "../../../entities/Part";

class CreatePart {

  constructor(readonly launchRepository: LaunchRepository) { }

  async execute(input: Input): Promise<Output> {
    const part = Part.create(
      input.launchId,
      input.name,
      input.price
    )
    await this.launchRepository.savePart(part);

    return {
      partId: part.partId
    }
  }

}

type Input = {
  launchId: string;
  name: string;
  price: number;
}

type Output = {
  partId: string;
}

export { CreatePart }

