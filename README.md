# GraphQL Server with Subscriptions

Ten repozytorium zawiera dwa przykłady implementacji serwera GraphQL z obsługą subskrypcji przy użyciu WebSocketów.

## Wymagania wstępne

Przed uruchomieniem przykładów musisz mieć zainstalowane Node.js i npm (Node Package Manager) na swojej maszynie.

## Instalacja

1. Sklonuj to repozytorium na swój lokalny komputer.
2. Przejdź do katalogu projektu.
3. Zainstaluj wymagane zależności, uruchamiając następujące polecenie:

```bash
npm install
```

## Uruchamianie przykładów
W tym repozytorium znajdują się dwa przykłady. Możesz uruchomić je indywidualnie, postępując zgodnie z poniższymi instrukcjami.

### Przykład 1: Planowanie operacji
Ten przykład symuluje planowanie długotrwałych operacji i powiadamia subskrybentów, gdy operacja zostanie zakończona.

1. Przejdź do katalogu projektu.
2. Uruchom serwer za pomocą następującego polecenia:

```bash
node operationScheduling.js
```

### Przykład 2: Czat w czasie rzeczywistym
Ten przykład demonstruje aplikację czatu w czasie rzeczywistym za pomocą subskrypcji GraphQL.

1. Przejdź do katalogu projektu.
2. Uruchom serwer za pomocą następującego polecenia:

```bash
node realTimeChat.js
```
