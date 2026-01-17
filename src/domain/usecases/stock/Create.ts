import type { StockRepository } from "../../../infra/repository/stock/StockRepository";
import { Stock } from "../../entities/stock/Stock";
import type { UseCase } from "../UseCase";

class Create implements UseCase<Input, Output> {

  constructor(readonly stockRepository: StockRepository) { }

  async execute(input: Input): Promise<Output> {
    const stock = Stock.create(
      input.businessId,
      input.title,
      input.price,
      input.quantity
    );
    await this.stockRepository.save(stock);

    return {
      productId: stock.productId
    }
  }
}

type Input = {
  businessId: string;
  title: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

type Output = {
  productId: string;
}

export { Create }

