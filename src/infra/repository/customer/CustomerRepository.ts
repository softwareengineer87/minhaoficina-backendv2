import { Customer } from "../../../domain/entities/customer/Customer";
import type { DatabaseConnection } from "../../database/PgPromiseAdapter";

interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  getByEmail(email: string): Promise<Customer | null>;
}

class CustomerRepositoryDatabase implements CustomerRepository {

  constructor(readonly connection: DatabaseConnection) { }

  async save(customer: Customer): Promise<void> {
    await this.connection.query(`INSERT INTO customers
    (customer_id, email, name, cpf, phone)
    VALUES($1, $2, $3, $4, $5)`, [
      customer.customerId, customer.getEmail(), customer.getName(),
      customer.getCPF(), customer.getPhone()
    ]);
  }

  async getByEmail(email: string): Promise<Customer | null> {
    const [customerData] = await this.connection.query(`SELECT * FROM customers 
    WHERE email = $1`, [email]);
    if (customerData) {
      return new Customer(customerData.customer_id,
        customerData.email, customerData.name, customerData.cpf, customerData.phone,
      )
    }

    return null;
  }

}

export {
  CustomerRepository,
  CustomerRepositoryDatabase
}

