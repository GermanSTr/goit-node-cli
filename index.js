import { program } from "commander";
import * as contactsService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      console.log(allContacts);
      break;
    case "get":
      const ContactById = await contactsService.getContactById(id);
      console.log(ContactById);
      break;

    case "add":
      const addNewContact = await contactsService.addContact(
        name,
        email,
        phone
      );
      console.log(addNewContact);
      break;

    case "remove":
      const deleteContactbyID = await contactsService.removeContact(id);
      console.log(deleteContactbyID);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
