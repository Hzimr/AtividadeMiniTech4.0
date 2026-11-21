# Loja Virtual

Aplicação React (Vite) com PrimeReact, PrimeFlex e Axios que consome a [Fake Store API](https://fakestoreapi.com/).

## Como executar

```bash
npm install
npm run dev
```

A aplicação abre em http://localhost:3000.

Outros comandos: `npm run build` (gera `dist/`) e `npm run preview` (serve o build).

## Criando o projeto do zero (alternativa)

```bash
npm create vite@latest loja-virtual -- --template react
cd loja-virtual
npm install primereact primeicons primeflex axios
```

Depois copie a pasta `src/` e o `index.html` deste projeto.

## Estrutura

- `src/components/ProductList.jsx`: busca os produtos na API (Axios), exibe a grade responsiva e abre o formulário em um diálogo.
- `src/components/ProductCard.jsx`: card de produto (imagem, categoria, título, descrição, avaliação e preço).
- `src/components/ProductForm.jsx`: formulário com validação para adicionar produtos.

## Observação

A Fake Store API não persiste dados. O `POST` retorna uma resposta simulada, então o novo produto é adicionado ao estado local e aparece no topo da lista até a página ser recarregada.
