# Token Maker

## Komponent do reactjs umożliwiający tworzenie i wdrażanie własnych tokenów ERC-20.

`CreateToken.tsx` - komponent tworzący token
`CreateToken.css` - ostylowanie css komponentu
`SimpleERC20.sol` - smartkontrakt tworzący token.

## Instalacja

Tworzymy projekt za pomocą Vite `npm create vite@latest`
Kompilujemy smartkontrakt za pomoca kompilatora solidity. Pobieramy plik `SimpleERC20.json` i dołączamy go do projektu.

## Testy

W ramach testu możemy uruchomić na lokalnej maszynie narzędzie `anvil` z pakietu `Foundry`. Dodajemy do MetaMaska kilka kluczy prywatnych wygenerowanych przez `anvil`. Uruchamiamy projekt za pomocą `npm run dev` wchodzimy na aplikację webową, podłączamy portfel, wpisujemy dane tokena który chcemy wdrożyć. Następnie możemy za pomocą portfela przesyłać nasze tokeny z jednego konta na drugie po wcześniejszej inicjalizacji na portfelu odpowiedniego tokena za pomocą adresu smartkotaktu, który wdrożyliśmy.





