class Logo {

  logoId: string;
  businessId: string;
  url: string;
  publicId: string;

  constructor(
    logoId: string,
    businessId: string,
    url: string,
    publicId: string
  ) {
    this.logoId = logoId;
    this.businessId = businessId;
    this.url = url;
    this.publicId = publicId;
  }

  static create(
    businessId: string,
    url: string,
    publicId: string
  ) {
    const logoId = crypto.randomUUID();
    return new Logo(logoId, businessId, url, publicId);
  }

}

export { Logo }

