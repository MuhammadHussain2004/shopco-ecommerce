import Subscriber from "../models/Subscriber.js";

export async function subscribe(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "email is required" });

  try {
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { email: email.toLowerCase() },
      { upsert: true, new: true }
    );
    res.status(201).json(subscriber);
  } catch (err) {
    res.status(400).json({ message: "Could not subscribe email" });
  }
}
