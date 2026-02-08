export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Niedozwolona metoda" });
    return;
  }

  res.json({
    message: "Strona przygotowana pod panel płatności. (Aplikacja pokazowa, płatności nie są aktywne)",
  });
}
