import { Cloudinary } from "../../../adapters/Cloudinary";
import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";
import { Logo } from "../../entities/business/Logo";

class MakeLogo {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(
    businessId: string,
    url: string,
    publicId: string
  ): Promise<Output> {
    const cloudinary = new Cloudinary();
    const logo = Logo.create(businessId, url, publicId);
    const logoById = await this.businessRepository.getLogoById(businessId);
    if (logoById) {
      cloudinary.delete(logoById.publicId);
      this.businessRepository.updateLogo(logo);
      return {
        logoId: logo.logoId
      }
    }
    await this.businessRepository.saveLogo(logo);

    return {
      logoId: logo.logoId
    }
  }

}

type Output = {
  logoId: string;
}

export { MakeLogo }
