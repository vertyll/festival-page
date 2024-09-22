## Link: https://festival-page.vercel.app/
## [Architektura, przebieg prac i dokumentacja](https://drive.google.com/file/d/1gM-3S7d_71FZs3sFO97FI3Wvi9d4cauR/view?usp=sharing)

## Założenia projektu 

Aplikacja internetowa wymyślonego festiwalu muzycznego - Sunset Festival. Jest to strona e-commerce na której można również przeglądać informacje o festiwalu muzycznym. Wszystkim zarządza dedykowany do strony panel administacyjny, któy również znajduje się w repozytorium na GitHub.

## Stos technologiczny

### Frontend:
- Next.js
- React
- Axios
- Styled-components do szybkiego stylowania komponentów
- Framer-motion do efektownego wyświetlania treści podczas przewijania strony

### Backend:
- Node.js
- Next-auth do uwierzytelniania użytkowników
- MongoDB jako baza danych NoSQL za pomocą Mongoose
- Stripe do obsługi płatności
- Axios do wykonywania żądań HTTP do serwera

### Uwierzytelnianie:
- uwierzytelnianie za pomocą OAuth 2.0

### Inne:
- ESLint do statycznej analizy kodu i utrzymania jednolitej jakości kodu
- Lodash do efektywnego zarządzania danymi i manipulacji nimi
- Lottie-web do renderowania animacji wektorowych w formacie JSON
- mime-types do obsługi typów MIME

### Dodatkowe narzędzia:
- Next-reveal do efektownego wyświetlania treści podczas przewijania strony

## Usługi chmurowe użyte w projekcie

### MongoDB Cloud Services

Do przechowywania danych w bazie danych została użyta platforma MongoDB Atlas.

### Amazon AWS S3 Service:

Do przechowywania zdjęć wrzucanych za pomocą panelu administracyjnego został użyty Amazon AWS S3 Service.

### Google Cloud Platform:

Kolejną usługą chmurową wykorzystaną w projekcie jest Google Cloud Platform. W kontekście autoryzacji została użyta usługa Google Cloud Console, umożliwiająca zarządzanie tożsamościami i uprawnieniami. Logowanie zostało rozdzielone na dwa projekty, panel administracyjny i stronę festiwalu ze sklepem wykorzystując identyfikatory klienta OAuth 2.0.

Dzięki wykorzystaniu tych usług chmurowych projekt zyskał skalowalność, niezawodność oraz zaawansowane funkcje bezpieczeństwa, co znacznie zwiększyło jego funkcjonalność i atrakcyjność dla użytkowników.

## Zdjęcia poglądowe

![Widok projektu](https://raw.githubusercontent.com/vertyll/festival-page/main/screenshots/1.png)
![Widok projektu](https://raw.githubusercontent.com/vertyll/festival-page/main/screenshots/2.png)
![Widok projektu](https://raw.githubusercontent.com/vertyll/festival-page/main/screenshots/3.png)
![Widok projektu](https://raw.githubusercontent.com/vertyll/festival-page/main/screenshots/4.png)
![Widok projektu](https://raw.githubusercontent.com/vertyll/festival-page/main/screenshots/5.png)
![Widok projektu](https://raw.githubusercontent.com/vertyll/festival-page/main/screenshots/6.png)

## Informacje dodatkowe

Aplikacja łączy się z panelem administracyjnym festiwalu, który również jest dostępny w repozytrium na GitHub.


## Instrukcja instalacji projektu

Pobieramy projekt na lokalne środowisko.
Tworzymy plik .env i kopiujemy do niego zawartość .env.example, po czym definiujemy swoje własne klucze API i dane konfiguracyjne.

Instalujemy npm za pomocą komendy:

```bash
npm install
```

Uruchamiamy aplikacje na lokalnym środowisku:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Domyśnie, jeżeli użyjemy jednej z powyższej komendy, aplikacja powinna być dostępna na adresie [http://localhost:3000](http://localhost:3000). Adres wklejamy do przeglądarki internetowej.
