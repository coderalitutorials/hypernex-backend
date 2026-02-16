import Contact from "../model/contact.model.js";

// =======================
// CREATE CONTACT
// =======================
export const createContactService = async (data) => {
  return await Contact.create(data);
};

// =======================
// GET ALL CONTACTS (ADMIN)
// =======================
export const getAllContactsService = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

// =======================
// GET SINGLE CONTACT
// =======================
export const getContactByIdService = async (id) => {
  return await Contact.findById(id);
};

// =======================
// UPDATE STATUS
// =======================
export const updateContactStatusService = async (id, status) => {
  return await Contact.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

// =======================
// DELETE CONTACT
// =======================
export const deleteContactService = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
