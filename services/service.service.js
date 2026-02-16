import Service from "../model/service.model.js";
import Subscriber from "../model/Subscriber.js";
import { sendBulkEmail } from "./emailService.js";
// Create Service
// const createService = async (data) => {
//   const service = await Service.create(data);
//   return service;
// };



const createService = async (data) => {
  const service = await Service.create(data);

  // 🔥 SEND EMAIL TO SUBSCRIBERS
  if (service.status === "active") {
    const subscribers = await Subscriber.find({}, "email");
    const emails = subscribers.map((sub) => sub.email);

    await sendBulkEmail({
      emails,
      subject: `🔥 New Offer: ${service.title}`,
      html: `
        <h2>${service.title}</h2>
        <p><b>Price:</b> ${service.price}</p>
        <p>${service.description}</p>
        <p>Don't miss this offer!</p>
      `,
    });
  }

  return service;
};




// Update Service
const updateService = async (id, data) => {
  const service = await Service.findById(id);
  if (!service) throw new Error("Service not found");

  service.title = data.title || service.title;
  service.price = data.price || service.price;
  service.description = data.description || service.description;
  service.features = data.features || service.features;
  service.status = data.status || service.status;

  await service.save();
  return service;
};

// Delete Service
const deleteService = async (id) => {
  const service = await Service.findById(id);
  if (!service) throw new Error("Service not found");
  await service.deleteOne();
  return true;
};

// Get all services
const getServices = async () => {
  const services = await Service.find().sort({ createdAt: -1 });
  return services;
};

// Get single service
const getServiceById = async (id) => {
  const service = await Service.findById(id);
  if (!service) throw new Error("Service not found");
  return service;
};

export {
  createService,
  updateService,
  deleteService,
  getServices,
  getServiceById,
};
