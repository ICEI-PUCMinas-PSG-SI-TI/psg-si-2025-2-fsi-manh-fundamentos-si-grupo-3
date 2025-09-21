# 2. Especificações do Projeto

Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a>

> Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## 2.1 Personas

**Persona 1**  
**Nome:** Mariana Souza  
**Idade:** 32 anos  
**Profissão:** Analista de Marketing  
**Perfil:** Mariana é casada, tem uma rotina corrida e adora praticidade. Costuma fazer compras online para economizar tempo, principalmente de roupas e produtos eletrônicos. Dá muita importância a avaliações de outros clientes antes de finalizar uma compra e prefere lojas que oferecem frete rápido e políticas de devolução facilitadas. Atualmente, está buscando um site confiável para comprar um novo smartphone com um bom custo-benefício.

**Persona 2**

**Nome:** Juliana Martins
**Idade:** 24 anos
**Profissão:** Estudante de Design
**Perfil:** Juliana é solteira, mora sozinha e adora pedir comida por delivery, principalmente quando está estudando para provas ou fazendo trabalhos. Valoriza aplicativos rápidos e fáceis de usar, que mostrem fotos dos pratos e permitam acompanhar o status do pedido em tempo real. Prefere opções de pagamento online para evitar contato na entrega. Atualmente, procura um restaurante que ofereça boas opções de comida saudável com entrega rápida na região.

**Persona 3**

**Nome:** Paulo Henrique Souza
**Idade:** 38 anos
**Profissão:** Motorista de Aplicativo
**Perfil:** Paulo passa boa parte do dia na rua e costuma pedir comida durante suas corridas, seja para almoçar no carro ou levar para casa no fim do expediente. Para ele, o mais importante é a praticidade e o tempo de entrega. Prefere restaurantes que oferecem combos com bom custo-benefício e promoções frequentes. No momento, procura um restaurante que entregue refeições completas e saborosas de forma rápida para sua região.

**Persona 4**

**Nome:** Helena Duarte
**Idade:** 47 anos
**Profissão:** Empresária
**Perfil:** Helena trabalha em home office e costuma pedir comida para ela e para a família. Dá bastante valor a restaurantes que oferecem variedade no cardápio, incluindo opções vegetarianas e sobremesas. Também gosta de poder agendar pedidos com antecedência para receber no horário do almoço. Atualmente, busca um restaurante que combine qualidade, boas avaliações e atendimento eficiente no delivery.


---
#### ⚠️ **ATENÇÃO**
Os quadros abaixo devem ser preenchidos com os **requisitos funcionais e não funcionais** específicos do sistema que está sendo desenvolvido.  

✅ **Importante:**  
- Não existe número mínimo obrigatório de requisitos.  
- Será avaliado se **todos os requisitos funcionais propostos** foram **efetivamente desenvolvidos** até a entrega final.
- Cada requisito deve ser claro, único e representar uma característica da sua solução.
--- 



### 2.2 REQUISITOS FUNCIONAIS

> Preencha a tabela abaixo com os requisitos funcionais que **detalham as funcionalidades que seu sistema deverá oferecer**.  
> Cada requisito deve representar uma característica única da solução e ser claro para orientar o desenvolvimento.


|ID    | Descrição do Requisito                                                                                            | Prioridade |
|------|-------------------------------------------------------------------------------------------------------------------|------------|
|RF-01| O sistema deve permitir que os usuários criem uma conta informando nome, e-mail, senha e endereço.                | ALTA       | 
|RF-02| O sistema deve permitir que os usuários adicionem produtos ao carrinho de compras.                                | MÉDIA      |
|RF-03| *(Descreva aqui o requisito funcional 3 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-04| *(Descreva aqui o requisito funcional 4 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-05| *(Descreva aqui o requisito funcional 5 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-06| *(Descreva aqui o requisito funcional 6 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-07| *(Descreva aqui o requisito funcional 7 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-08| *(Descreva aqui o requisito funcional 8 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-09| *(Descreva aqui o requisito funcional 9 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-10| *(Descreva aqui o requisito funcional 10 do seu sistema)*                                                       | *(Alta/Média/Baixa)*  |

### 2.3 REQUISITOS NÃO FUNCIONAIS

> Preencha a tabela abaixo com os requisitos não funcionais que definem **características desejadas para o sistema que irão desenvolver**, como desempenho, segurança, usabilidade, etc.  
> Lembre-se que esses requisitos são importantes para garantir a qualidade da solução.

|ID     | Descrição do Requisito                                                                              |Prioridade |
|-------|-----------------------------------------------------------------------------------------------------|-----------|
|RNF-01| O sistema deve carregar as páginas em até 3 segundos para garantir uma boa experiência ao usuário.  | MÉDIA     | 
|RNF-02| O sistema deve proteger as informações dos clientes por meio de criptografia e medidas de segurança.| ALTA      | 
|RNF-03| *(Descreva aqui o requisito não funcional 3 do seu sistema)*                                       | *(Alta/Média/Baixa)*  |
|RNF-04| *(Descreva aqui o requisito não funcional 4 do seu sistema)*                                       | *(Alta/Média/Baixa)*  |
|RNF-05| *(Descreva aqui o requisito não funcional 5 do seu sistema)*                                       | *(Alta/Média/Baixa)*  |
|RNF-06| *(Descreva aqui o requisito não funcional 6 do seu sistema)*                                       | *(Alta/Média/Baixa)*  |

---

## 2.4 RESTRIÇÕES

> Restrições são limitações externas impostas ao projeto que devem ser rigorosamente obedecidas durante o desenvolvimento. Elas podem estar relacionadas a prazos, tecnologias obrigatórias ou proibidas, ambiente de execução, normas legais ou políticas internas da organização. Diferente dos requisitos não funcionais, que indicam características desejadas do sistema, as restrições determinam limites fixos que influenciam as decisões de projeto.

> A tabela abaixo deve ser preenchida com as restrições específicas que **impactam seu projeto**. Caso não haja alguma restrição adicional além das já listadas, mantenha a tabela conforme está.

| ID  | Restrição                                                        |
|------|-----------------------------------------------------------------|
| 01   | O projeto deverá ser entregue até o final do semestre.          |
| 02   | O sistema deve funcionar apenas dentro da rede interna da empresa.  |
| 03   | *(Descreva aqui a restrição 4 do seu projeto)*
| 04   | *(Descreva aqui a restrição 4 do seu projeto)*                  |
| 05   | *(Descreva aqui a restrição 5 do seu projeto)*                  |
| 06   | *(Descreva aqui a restrição 6 do seu projeto)*                  |
| 07   | *(Descreva aqui a restrição 7 do seu projeto)*                  |
| 08   | *(Descreva aqui a restrição 8 do seu projeto)*                  |




 
> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)



