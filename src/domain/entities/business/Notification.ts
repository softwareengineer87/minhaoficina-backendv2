
class Notification {

  notificationId: string;
  businessId: string;
  title: string;

  constructor(
    notificationId: string,
    businessId: string,
    title: string
  ) {
    this.notificationId = notificationId;
    this.businessId = businessId;
    this.title = title;
  }

  static create(businessId: string, title: string) {
    const notificationId = crypto.randomUUID();
    return new Notification(
      notificationId,
      businessId,
      title
    );
  }
}

export { Notification }

