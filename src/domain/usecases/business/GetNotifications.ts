import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";
import { Notification } from "../../entities/business/Notification";

class GetNotifications {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(businessId: string): Promise<Notification[]> {
    const notifications = await this.businessRepository.getNotifications(businessId);
    return notifications;
  }

}

export { GetNotifications }

