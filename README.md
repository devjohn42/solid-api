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
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar uma academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

### RNs (Regras de Negócio)

- Caminhos que cada requisito pode tomar
- Sempre estará associada hà algum requisito funcional

- (x) O usuário não deve poder se cadastrar com um e-mail duplicado;
- (x) O usuário não pode fazer 2 check-ins no mesmo dia;
- (x) O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- (x) O check-in só pode ser validado até 20 minutos após ser criado;
- (x) O check-in só pode ser validado por adminstradores; // autorização
- (x) A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos Não-Funcionais)

- Não partem do cliente, sem controle sobre eles

- {x} A senha do usuário precisa estar criptocrafada;
- {x} Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- {x} Todas as listas de dados precisam estar páginas com 20 itens por página;
- {x} O usuário deve ser identificado por um JWT (JSON Web Token);

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

## Metodologia de Desenvolvimento - TDD = Test Driven Development

1º estado - red => Erro no teste
2º estado - green => Codar o mínimo possível para o teste passar
3º estado - refector => Refatora

- Diz para você que se vc desenvolve o teste de alguma regra de negócios ou funcionalidade antes da implementação daquilo, o teste por si só te ajuda a validar se a sua implementação está ok ou não
- Metodoligia que facilita você entender e caminhar pela regra de negócios de uma funcionalidade durante o seu desenvolvimento
- Útil para features/regra de negócios mais complexas

## 3 Estratégias de Autenticação

- Basic Auth => Faz com que em todas as requisições seja necessário que o usuário    envie suas credenciais no cabeçalho (metadados da req e res) da requisição (não é muito seguro)
- JWT = JSON Web Token => Usuário faz login | envia e-mail/senha | back-end cria um token ÚNICO não modificável e STATELESS
    - STATELESS: Não armazenado em nenhuma estrutura de persitência de dados (banco de dados)
    - Back-end: Quando vai criar o token ele use uma PALAVRA-CHAVE (string)
    - Por não ser salvo no banco de dados, se torna difícil ser invalidado
    1ª - Comparação de datas utilizando o "iat"
    2ª - Refresh Token, um segundo token com uma data de inspiração maior    específico para renovação do token original:
      1º Token = Visível apenas no Front-End
      2º Token = "Invisível"/Encriptado para o Front-end não conseguir acesso

// Apenas o back-end pode criar novos tokens, só ele pode validar através da assinatura que o token criado é um token que foi originado de uma palavra chave
- Palavra-chave: iFJWNIPwuefbpUFBPBUAgafkgjaçigu@#¨$@LKHB$@#*&¨G%@KLJ

- E-mail/senha -> header.payload.sign

# Teste E2E

- Criar poucos testes e2e, pois são pesados para rodar
- Não se cria testes e2e para cada regra de negócio da aplicação
- Criação de testes mais abertos, que testam as rotas de sucesso da aplicação

# RBAC => Role Based Authorization Control

- Determinar permissões que o usuário pode ter na aplicação baseado em algum cargo que ele tenha
- Geralmente (Admin - Gestor)

# CI => Continuous Integration

- O Processo de receber código em um repositório (github) e fazer verificações/validações para conseguir de uma maneira mais automatizada receber novas verções/features do código

- Estratégias para receber de forma contínua novos códigos na aplicação
- Execução/Validação

# !== PODEM SER USADOS JUNTOS OU NÃO

# CD => Continuous Deployment/Delivery

- O Processo de receber ao código em um repositório (github) ou aprovar uma pull request, ele fará automaticamente o deploy do código


#### Alteração para testar os testes e2e