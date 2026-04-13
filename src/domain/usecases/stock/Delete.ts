import { StockRepository } from "../../../infra/repository/stock/StockRepository";

class Delete {
  constructor(readonly stockRepository: StockRepository) { }

  async execute(productId: string): Promise<Output> {
    const stock = await this.stockRepository.getById(productId);
    if (!stock) {
      throw new Error('Produto não encontrado');
    }
    await this.stockRepository.delete(productId);

    return {
      productId: stock.productId
    }
  }
}

type Output = {
  productId: string;
}

export { Delete }

