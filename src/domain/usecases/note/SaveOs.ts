import { CustomerRepository } from "../../../infra/repository/customer/CustomerRepository";
import { NoteRepository } from "../../../infra/repository/note/NoteRepository";
import { Customer } from "../../entities/customer/Customer";
import { EntranceOS } from "../../entities/note/EntranceOS";

class SaveOs {

  constructor(
    readonly noteRepository: NoteRepository,
    readonly customerRepository: CustomerRepository
  ) { }

  async execute(input: Input): Promise<Output> {
    const customer = Customer.create(
      input.email,
      input.name,
      input.cpf,
      input.phone
    );
    const customerData = await this.customerRepository.getByEmail(customer.getEmail());
    if (!customerData) {
      await this.customerRepository.save(customer);
    }
    const customerId = !customerData ? customer.customerId : customerData.customerId;
    const inputOs = EntranceOS.create(
      customerId,
      input.businessId,
      customer.getEmail(),
      customer.getName(),
      customer.getCPF(),
      customer.getPhone(),
      input.text
    );
    await this.noteRepository.saveOs(inputOs);

    return {
      osId: inputOs.getOsId()
    }
  }

}

type Input = {
  businessId: string;
  email: string;
  name: string,
  cpf: string,
  phone: string,
  text: string;
}

type Output = {
  osId: string;
}

export { SaveOs }

