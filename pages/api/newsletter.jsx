import { validateNewsletterEmail } from "@/utils/validation/validators";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Niedozwolona metoda");
  }

  const { email } = req.body;

  if (!email || !validateNewsletterEmail(email)) {
    return res.status(400).json({ error: "Nieprawidłowy lub brakujący adres e-mail" });
  }

  try {
    // Sprawdzenie, czy adres email już istnieje na liście
    const listResponse = await axios.get(
      `https://api.eu.mailgun.net/v3/lists/${encodeURIComponent(
        process.env.MAILGUN_LIST_ADDRESS
      )}/members/${email}`,
      {
        auth: {
          username: "api",
          password: process.env.MAILGUN_API_KEY,
        },
      }
    );

    // Jeśli istnieje, zwróć odpowiednią informację
    if (listResponse.status === 200) {
      return res.status(409).json({ message: "Email jest już zapisany na listę." });
    }
  } catch (error) {
    // Jeśli adres email nie istnieje, error.response.status będzie 404
    if (error.response && error.response.status !== 404) {
      console.error("Błąd sprawdzania istnienia wiadomości e-mail:", error);
      return res.status(500).json({ error: "Wewnętrzny błąd serwera" });
    }
  }

  try {
    // Jeśli adres email nie istnieje, dodaj go do listy
    await axios.post(
      `https://api.eu.mailgun.net/v3/lists/${encodeURIComponent(
        process.env.MAILGUN_LIST_ADDRESS
      )}/members`,
      new URLSearchParams({
        subscribed: "True",
        address: email,
      }),
      {
        auth: {
          username: "api",
          password: process.env.MAILGUN_API_KEY,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res
      .status(200)
      .json({ message: "Pomyślnie zapisano do newslettera" });
  } catch (error) {
    console.error("Error subscribing email:", error);
    return res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
}