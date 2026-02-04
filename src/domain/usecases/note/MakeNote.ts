import { CustomerRepository } from "../../../infra/repository/customer/CustomerRepository";
import type { NoteRepository } from "../../../infra/repository/note/NoteRepository";
import { Customer } from "../../entities/customer/Customer";
import { Note } from "../../entities/note/Note";

class MakeNote {

  customerId: string = '';

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
    const customerByEmail = await this.customerRepository.getByEmail(customer.getEmail());
    this.customerId = customerByEmail!.customerId;
    const note = Note.create(
      input.businessId,
      this.customerId,
      input.model,
      input.kilometer,
      input.plate,
      input.observation,
      input.date
    );
    await this.noteRepository.save(note);
    return {
      noteId: note.noteId
    }
  }

}

type Input = {
  businessId: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  model: string;
  kilometer: number;
  plate: string;
  observation: string;
  date: string;
}

type Output = {
  noteId: string;
}

export { MakeNote }

