// controllers/subscriberController.js

import Subscriber from "../model/Subscriber.js";

// Email Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribeUser = async (req, res) => {
  try {
    let { email } = req.body;

    // normalize email
    email = email?.toLowerCase().trim();

    // check empty
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // validate email
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // check duplicate manually (better UX)
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(200).json({
        success: true,
        message: "You are already subscribed 🙂",
      });
    }

    // create subscriber
    await Subscriber.create({ email });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully 🎉",
    });

  } catch (error) {

    // Mongo duplicate error fallback
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "You are already subscribed 🙂",
      });
    }

    console.error("Subscribe Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
