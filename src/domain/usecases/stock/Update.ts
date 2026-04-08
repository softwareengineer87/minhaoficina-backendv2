import { StockRepository } from "../../../infra/repository/stock/StockRepository";

class Update {
  constructor(readonly stockRepository: StockRepository) { }

  async execute(productId: string, input: Input): Promise<Output> {
    await this.stockRepository.update(
      productId,
      input.businessId,
      input.title,
      input.price,
      input.quantity,
      input.createdAt
    );
    return {
      productId
    }
  }
}

type Input = {
  businessId: string;
  title: string;
  price: number;
  quantity: number;
  createdAt: Date
}

type Output = {
  productId: string;
}

export { Update }

