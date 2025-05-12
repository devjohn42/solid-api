# API Gympass

####
    Oferecer no futuro uma forma de o sistema das academias integradas, poderem cadastrar usuários.
    2 formas de cadastro <-> Usuário/Academia
####

## Regras da aplicação

### RFs (Requisitos Funcionais)

- Funcionalidades da Aplicação (oq é possível o usuário fazer na aplicação)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
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

- (x) O usuário não deve poder se cadastrar com um e-mail duplicado;
- () O usuário não pode fazer 2 check-ins no mesmo dia;
- () O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- () O check-in só pode ser validado até 20 minutos após ser criado;
- () O check-in só pode ser validado por adminstradores; // autorização
- () A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos Não-Funcionais)

- Não partem do cliente, sem controle sobre eles

- {x} A senha do usuário precisa estar criptocrafada;
- {x} Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- {} Todas as listas de dados precisam estar páginas com 20 itens por página;
- {} O usuário deve ser identificado por um JWT (JSON Web Token);

### ORM -> Object Relational Mapper [PRISMA]

- Prisma -> Diminue muito o trabalho e a parte de duplicidade ao se trabalhar com banco de dados;
- Integração muito boa com o typescript;
- Migrations de forma automatizada (controle de versão do banco de dados);

### Relacionamentos

=> 1-1 =>
=> 1-N =>
=> N-N =>

### Controllers

<!-- app.post('/users', controller) -->

- Nome dado para a função que lida com a entrada de dados de uma requisição http e devolve uma resposta de alguma forma

### PATTERN

### Repository Pattern

- Serve para abstrair a parte de conexão|requisições que são feitas para o banco de dados em  um arquivo separado
- Todas as operações do banco de dados irão passar pelos repositories
- Vantagens
  1ª => Troca para outra ferramenta (ORM), manutenível, alterar apenas os arquivos da pasta repositories

## Princípios SOLID

# =>
# =>
# =>
# =>
# => D - Dependency Inversion Principle -
     - Altera um pouco como o use-cases/service tem acesso as dependências
     - Aos invés da classe instanciar as dependências que ela precisa, ela vai receber as dependências como parâmetro

## Base da Primâmide dos testes (Testes Unitários)

- Testam uma unidade isolada do código

# Coverage

## Factory Pattern

- Uma fábrica de criação de coisas comuns, que tem muitas dependências
- Funções que criam entidades maiores, com dependências, cálculos.
- Não possuem regras de negócio, servindo para instanciação de classes/entidades que possuem muitos requisitos/dependências