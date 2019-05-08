# Descrição
Este arquivo tem como objetivo demonstrar o processo de decisões tomadas dentro da aplicação, suas razões e o que poderia ter sido feito de diferente em certos cenários ou caso houvesse mais tempo/requisitos. Também, juntamente com a timeline de commits deste projeto, mostrar como trabalho no meu dia a dia. 

# Tecnologias 
## BACK-END
Para efetuar este projeto, decidi utilizar `Node.js` ao lado do `Express` como framework. Essa decisão se dá pois tenho mais familiaridade com a linguagem(`JavaScript`) e o framework(`Express`). Em casos reais, a tecnologia que seria utilizada no mesmo projeto teria diversos outros fatores: Aptidão da equipe com a tecnologia/linguagem, requisitos funcionais da aplicação(i.e aplicação deverá suportar 10.000 req/s), Stack já utilizada dentro da empresa(é muito bom ter uma stack mais fechada e consolidade entre equipes). Também havia a possibilidade de utilizar TypeScript juntamente com o Node.js e o Express, porém, não vi necessidade de trazer mais essa complexidade para a aplicação no momento. Pessoalmente, hoje, sou sempre a favor da utilização de TypeScript juntamente com algum ORM, IOC etc. Mas isso irá depender do escopo do projeto e/ou necessidade da equipe para produtividade e qualidade de código.

#### OBSERVAÇÕES BACK-END

----

## BANCO DE DADOS
Novamente, a escolha se dá por afinidade com a tecnologia e disseminação do banco de dados na comunidade Node.js. A escolha foi o `MongoDB`. Também, se tratando de um escopo de projeto simples e sem quase nenhuma restrição de dados, não vi a necessidade de efetuar este projeto em um banco de dados relacional.

#### Modelagem Banco de Dados

----

## DOCKER
A escolha de utilizar Docker, e juntamente o Compose, se dá pela separação de código do banco de dados e o código da aplicação em si. Além, é claro, da produtividade e segurança que o Docker proporciona ao desenvolvedor. Entendo que para um projeto deste escopo, efetuar essa separação possa ser uma estratégia exagerada. Porém, sempre quando utilizo Docker juntamente com um banco de dados que não seja DBaaS, gosto de fazer essa separação dentro do meu código.


# SCRIPTS


# GITFLOW


----

# CENÁRIOS TESTES
Para criação de testes, gosto sempre de pensar em todas as maneiras possíveis de como a minha aplicação pode falhar. Para isso, gosta de me organizar da maneira abaixo. Todos os cenários em que serão feitos os testes ou são de validação de dado e/ou regras de negócios. 

1. Pagamento por cartão de crédito: (implementado na branch `feature/implementacao-pagamento-cartao`)
   1. Todo cartão de crédito deve ter os campos abaixo e que sejam válidos(data correta, tipo de dado correto etc):
      1. Campos a serem verificados:
         1. `card_holder_name` => STRING
         2. `card_number` => NUMBER
         3. `expiration_date` => DATE
         4. `cvv` => NUMBER
      2. Cenários:
         1. `SUCESSO`: Usuário efetuou a requisição de processamento de um pagamento aonde os dados fornecidos existem e são válidos.
         2. `ERRO`: Usuário efetou a requisição de processamento de um pagamento aonde os dados fornecidos existem, porém, o campo `card_holder_name` informado não é válido.
         3. `ERRO`: Usuário efetou a requisição de processamento de um pagamento aonde os dados fornecidos existem, porém, o campo `card_number` informado não é válido.
         4. `ERRO`: Usuário efetou a requisição de processamento de um pagamento aonde os dados fornecidos existem, porém, o campo `expiration_date` informado não é válido.
         5. `ERRO`: Usuário efetou a requisição de processamento de um pagamento aonde os dados fornecidos existem, porém, o campo `cvv` informado não é válido.
   2. Quando o método de pagamento for cartão, devemos retornar para quem requisitou o processamento de pagamento o status da transação. Seja `SUCESSO` ou `ERRO`:
      1. Retornos válidos: `SUCESSO` ou `ERRO`
      2. Cenários:
         1. `SUCESSO`: Todos os dados informados são válidos e o retorno do processamento é `SUCESSO`.
         2. `ERRO`: Todos os dados informados são válidos e o retorno do processamento é `ERRO`.
   
# Sugestões
Seria interessante ter uma métrica ou performance a ser atingida pela API. Por exemplo:
  - A API deve suportar ~10.000 req/s
  - Se tratando de um endpoint de pagamentos, implementar algum tipo de idempotência de requisições(para não haver a possibilidade de pagamentos duplicados vindos de uma mesma origem etc)