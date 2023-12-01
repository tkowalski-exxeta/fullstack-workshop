# Steps 7

Ziel: Schreibe Tests für den Stand von letzter Woche.
Überlege welche Testfälle aus fachlicher Sicht sinnvoll sind und entscheide auf welcher Komponente man am Besten testet. Überlege ob ein E2E-test oder eine Unittest passender ist.

Nutze als Frameworks Vitest & React Testing Library (RTL) um Komponenten zu testen und Playwright (PW=) für E2E-tests.
Vermeide Mocks indem Du eine "Fake"-Backend mit Mock-Service-Worker (MSW) implementierst und in den RTL-Tests nutzt.

Falls Du noch ein wenig mehr Zeit hast, kannst Du probieren RTL Test in Storybook zu nutzen.
