import { StockRepository } from "../../../infra/repository/stock/StockRepository";
import { Stock } from "../../entities/stock/Stock";

class Search {

  constructor(readonly stockRepository: StockRepository) { }

  async execute(businessId: string, title: string): Promise<Stock[]> {
    const stocks = await this.stockRepository.search(businessId, title);
    return stocks;
  }

}

export { Search }

