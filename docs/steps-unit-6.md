# Steps 5

Ziel: Nutze [React Hook Forms](https://react-hook-form.com/get-started) und [Zod](https://zod.dev/?id=basic-usage) um Dateneingaben des Nutzers zu sammeln/validieren.

1. Benutze RHF und Zod auf der Loginseite. Validiere das Passwort mindestens 4 Zeichen und höchstens 120 Zeichen lang ist und der Nutzername mindestens 2 und höchstens 120.

2) Nutze RHF und Zod auf der FormDetailsPage (und den dort genutzten Komponenten). Speichere die gemachten Eingaben in der Answers-collection. Dazu sollten die Resolver überarbeitet werden, da die bisherigen Resolver ungeeigenet sind.

```
 submitAnswers(formId: ID!, answers: [AnswerInput!]!): ID!
```

3. Die ganz Schnellen können die Admin-UI bauen um ein Formulare und Fragen zu bearbeiten. Benutzt dazu den Hook [useFieldArray](https://react-hook-form.com/docs/usefieldarray)
