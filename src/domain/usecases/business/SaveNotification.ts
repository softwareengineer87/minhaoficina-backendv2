import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";
import { Notification } from "../../entities/business/Notification";

class SaveNotification {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(input: Input): Promise<Output> {
    const notification = Notification.create(input.businessId, input.title);
    await this.businessRepository.saveNotifications(notification);

    return {
      notificationId: notification.notificationId
    }
  }

}

type Input = {
  businessId: string;
  title: string;
}

type Output = {
  notificationId: string;
}

export { SaveNotification }

