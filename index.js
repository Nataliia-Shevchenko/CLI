import { program } from "commander";
import contactsService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contactsService.listContacts();
        console.table(allContacts);
        break;

      case "get":
        const contactById = await contactsService.getContactById(id);
        console.log(contactById);
        break;

      case "add":
        const newContact = await contactsService.addContact({
          name,
          email,
          phone,
        });
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contactsService.removeContact(id);
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

invokeAction(argv);
