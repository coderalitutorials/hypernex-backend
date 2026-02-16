import {
  createService,
  updateService,
  deleteService,
  getServices,
  getServiceById,
} from "../services/service.service.js";

// ADMIN: Create service
const createServiceController = async (req, res, next) => {
  try {
    const service = await createService(req.body);
    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Update service
const updateServiceController = async (req, res, next) => {
  try {
    const service = await updateService(req.params.id, req.body);
    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Delete service
const deleteServiceController = async (req, res, next) => {
  try {
    await deleteService(req.params.id);
    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get all services
const getServicesController = async (req, res, next) => {
  try {
    const services = await getServices();
    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get single service
const getServiceByIdController = async (req, res, next) => {
  try {
    const service = await getServiceById(req.params.id);
    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createServiceController,
  updateServiceController,
  deleteServiceController,
  getServicesController,
  getServiceByIdController,
};
