class Logo {

  logoId: string;
  businessId: string;
  url: string;

  constructor(logoId: string, businessId: string, url: string) {
    this.logoId = logoId;
    this.businessId = businessId;
    this.url = url;
  }

  static create(businessId: string, url: string) {
    const logoId = crypto.randomUUID();
    return new Logo(logoId, businessId, url);
  }

}

export { Logo }

