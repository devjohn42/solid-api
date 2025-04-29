# API Gympass

## Regras da aplicação

### RFs (Requisitos Funcionais)

- Funcionalidades da Aplicação (oq é possível o usuário fazer na aplicação)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter o seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar uma academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

### RNs (Regras de Negócio)

- Caminhos que cada requisito pode tomar
- Sempre estará associada hà algum requisito funcional

- () O usuário não deve poder se cadastrar com um e-mail duplicado;
- () O usuário não pode fazer 2 check-ins no mesmo dia;
- () O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- () O check-in só pode ser validado até 20 minutos após ser criado;
- () O check-in só pode ser validado por adminstradores; // autorização
- () A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos Não-Funcionais)

- Não partem do cliente, sem controle sobre eles

- {} A senha do usuário precisa estar criptocrafada;
- {} Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- {} Todas as listas de dados precisam estar páginas com 20 itens por página;
- {} O usuário deve ser identificado por um JWT (JSON Web Token);
