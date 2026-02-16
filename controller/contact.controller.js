import {
  createContactService,
  getAllContactsService,
  getContactByIdService,
  updateContactStatusService,
  deleteContactService,
} from "../services/contact.service.js";

// =======================
// PUBLIC: SUBMIT CONTACT
// =======================
export const createContact = async (req, res) => {
  try {
    const contact = await createContactService(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

// =======================
// ADMIN: GET ALL CONTACTS
// =======================
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContactsService();

    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
};

// =======================
// ADMIN: GET SINGLE
// =======================
export const getContactById = async (req, res) => {
  try {
    const contact = await getContactByIdService(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// =======================
// ADMIN: UPDATE STATUS
// =======================
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await updateContactStatusService(
      req.params.id,
      status
    );

    res.json({
      success: true,
      message: "Status updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// =======================
// ADMIN: DELETE
// =======================
export const deleteContact = async (req, res) => {
  try {
    await deleteContactService(req.params.id);

    res.json({
      success: true,
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
