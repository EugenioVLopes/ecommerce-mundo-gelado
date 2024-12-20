# Pedidos Mundo Gelado

Este é um projeto de e-commerce desenvolvido para a sorveteria **Mundo Gelado**. O objetivo é criar uma plataforma online onde os clientes possam visualizar o catálogo de sorvetes, realizar pedidos e efetuar pagamentos de maneira fácil e rápida. Este projeto utiliza **Next.js** para a construção da interface e lógica do aplicativo.

## Funcionalidades

- Exibição de catálogo de sorvetes
- Sistema de carrinho de compras
- Autenticação de usuários
- Interface responsiva para dispositivos móveis e desktop
- Integração com banco de dados MongoDB

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e construção da interface do usuário.
- **React**: Biblioteca JavaScript para criar componentes de interface reutilizáveis.
- **MongoDB & Mongoose**: Banco de dados não relacional para armazenar informações de usuários e pedidos.
- **NextAuth.js**: Autenticação para gerenciar login e usuários.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **React Hook Form**: Gerenciamento de formulários e validação.
- **Framer Motion**: Para animações fluidas e interações na interface.
- **Radix UI**: Conjunto de componentes acessíveis e estilizados para a construção de interfaces.
- **Zod**: Validação de schemas para garantir a integridade dos dados.

## Estrutura de Pastas

O projeto é organizado nas seguintes principais pastas:

- **public/**: Contém arquivos públicos, como imagens e ativos estáticos organizados por categorias (açaí, sorvetes, frutas, cremes, milkshakes, e acompanhamentos).
- **src/app/**: Pasta principal da aplicação, incluindo as páginas do usuário, como o menu de sorvetes, carrinho, perfil, sobre, e sistema de pedidos. Contém também o dashboard administrativo para gerenciar categorias, itens do menu, usuários e pedidos.
- **src/components/**: Componentes reutilizáveis da interface, como carrinho, login, layout, menus e outros componentes da UI.
- **src/constants/**: Constantes utilizadas no projeto, como valores fixos e configurações.
- **src/hooks/**: Custom hooks do React para gerenciamento de estados e lógica de interação.
- **src/interfaces/**: Definições de tipos e interfaces para o TypeScript.
- **src/lib/**: Funções auxiliares e utilitárias, como validações e formatações de dados.
- **src/models/**: Definição de modelos utilizados na aplicação, como os dados de usuários, pedidos e itens do menu.
- **src/schemas/**: Schemas de validação de dados utilizando Zod.
- **src/types/**: Tipos auxiliares utilizados no projeto com TypeScript.

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

### `npm run dev`

Executa o aplicativo em modo de desenvolvimento.  
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

### `npm run build`

Compila o projeto para produção, criando os arquivos otimizados.

### `npm start`

Inicia o servidor em produção.

### `npm run lint`

Executa o linter para garantir a qualidade do código.
