
## STORB.LOL
**Inicio do projeto**: 26/03/2024

**Data prevista para finalização**: 02/04/2024


## Instalação e desenvolvimento

Primeiro, instale as dependências do projeto. No terminal, navegue até a pasta do projeto e execute o seguinte comando:
```bash
yarn install
```
Depois de instalar as dependências, você pode iniciar o servidor de desenvolvimento. Execute o seguinte comando:
```bash
yarn run dev
```
Agora, abra o navegador e acesse `http://localhost:3000` para ver o aplicativo em execução.
Lembre-se de que esses comandos devem ser executados no diretório raiz do projeto.

# 1. Autenticação e Login:

## Página Principal:
![](https://i.imgur.com/OJubLwj.jpeg)

- A página inicial funciona como a própria loja.
- Ao acessá-la, o sistema verifica se as credenciais do usuário estão armazenadas em cookies do navegador.
- Se não forem encontradas, o usuário é redirecionado para a página de login
- Ao clicar em "logout", o sistema apaga as credenciais armazenadas nos cookies e atualiza a página, forçando o relogin.
- A única informação da conta do usuário exibida na página inicial é o saldo total de RP.
- Todo o restante da página, exceto a informação de RP, é derivado do DDRAGON ou é estático.


## Login:
![](https://i.imgur.com/sC63uTV.jpeg)
- O login é obrigatório para o usuário acessar a loja.

Nesse fluxo em específico, fazer com que o usuário se autentique antes de entrar na loja evita requisições ao Data Dragon desnecessárias, assim como as de checagem de balanço de Riot Points. 

- O objetivo do login é armazenar o nome de usuário e senha em cookies para facilitar compras futuras.

 Como o usuário já vai estar autenticado, próxima vez que ele entrar no site não será necessário verificar novamente se a conta dele existe ou não. 

> Note que: caso o usuário altere sua senha, o PAGAMENTO.LOL não fará a verificação. No entanto, quando o gift estiver para ser enviado, um erro de auth será retornado, forçando o usuário a realizar o logout.
  

# 2. Carrinho de Compras:
- Considerando a baixa demanda por presentes e a simplicidade da maioria das compras (um único presente por vez), um sistema de carrinho de compras não é necessário.
  
  

# 3. Navegação e Filtros:
![](https://i.imgur.com/HQAM3VJ.jpeg)
- A barra de navegação à esquerda não funciona efetivamente como um navegador. Ela não redireciona para páginas pré-existentes.

A atuação principal dela é ser um filtro a requisição de listagem de itens da loja. Ao clicar em campeões, ela muda os parâmetros da requisição e atualiza os componentes, fazendo com que retornem apenas campeões.

- Informa ao componente principal da página quais itens devem ser filtrados e exibidos na loja.
- Não realiza redirecionamentos, exceto pelo botão de logout.

O botão de logout apaga as credenciais do usuário dos cookies e atualiza a página. Quando o sistema de verificação de login checar as credencias e não às encontrar, redirecionará o usuário para a página de login.

  

# 4. Componente de Item da Loja:
![](https://i.imgur.com/gyBIVQz.png)
```json
{
"nomeProduto": "Bewithing Miss Fortune Prestige Edition",
"imagemProduto": "https://loremipsum.com/lorem.jpg",
"tierProduto": 1,
"precoProduto": 1820
}
```  
> As informações do componente são obtidas pelo Data Dragon. Fora o resto do site, os itens são os únicos elementos do site que não são estáticos.  

# Observações: 

  

- O sistema de autenticação pode ser alterado de acordo com as necessidades de segurança do projeto.

A página de login pode atuar apenas como um captador de credenciais, sem necessariamente checar se a conta do usuário existe ou fazer requisições para captar os dados da conta - como o balanço de RP, por exemplo. Nesse caso em específico, a autenticação só será feita quando o usuário for enviar o presente na tela final - que retornará um erro por credenciais incorretas.
```json
{
"user": "liberaascameras",
"pass": "4laninocente123",
"itemID": 382939123923120
}
```
> A vantagem disso é que, no final, será necessária apenas UMA requisição ao back-end: o identificador do item a ser comprado, o usuário e a senha.

OBS: Note que, caso isso seja implementado, funções como checagem de balanço não funcionarão.

- A quantidade de informações exibidas na página da conta pode ser expandida no futuro.

- A integração com outros sistemas da Riot Games, como o sistema de pagamento, pode ser necessária para completar a funcionalidade do site.
