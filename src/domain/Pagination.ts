
class Pagination {

  actualPage: number;
  lastPage: number;
  totalItems: number;
  prevPage: number;
  nextPage: number;
  totalPages: number;

  limit: number;
  offset: number;

  constructor(limit: number) {
    this.actualPage = 1;
    this.lastPage = 0;
    this.totalItems = 0;
    this.prevPage = 0;
    this.nextPage = 0;
    this.totalPages = 0;
    this.limit = limit;
    this.offset = 0;
  }

  paginator(page: number, arr: any) {
    const pageToNumber = Number(page);
    this.actualPage = pageToNumber;
    this.offset = (pageToNumber * this.limit) - this.limit;
    this.totalItems = arr.length;
    this.lastPage = Math.ceil(this.totalItems / this.limit);
    this.totalPages = Math.ceil(this.totalItems / this.limit);

    this.nextPage = pageToNumber + 1;
    if (this.nextPage > this.totalPages) {
      this.nextPage = this.totalPages;
    }

    this.prevPage = pageToNumber - 1;
    if (this.prevPage <= 1) {
      this.prevPage = 1;
    }

  }

}

export { Pagination }
