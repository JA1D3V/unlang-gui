# UnLang
Este documento funciona como um manual de uso da linguagem

## O que é a UnLang?
UnLang, ou university language é uma linguagem de programação direcionada para alunos que estejam iniciando em lógica de programação e para aqueles que estão aprendendo algum conceito complexo e precisam de um meio de abstração para facilitar o processo.

## Como funciona a UnLang
A UnLang é meramente um _transpiler_, ou seja, o script lê o código fornecido pelo usuário e traduz para outra linguagem, nesse caso JavaScript.
A stack é composta da forma mais simples possível. Por padrão,  nenhum pacote extra é necessário para utilizar as funções padrão.

## Qual o diferencial da UnLang
Este projeto visa atender uma área de meio termo entre as ferramentas atuais para introdução a lógica de programação e  linguagens utilizadas no mercado. Para atender a esse objetivo a semântica busca ser semelhante  as que são utilizadas nas linguagens mais comuns da atualidade mantendo a sintaxe voltada para o que vemos em ferramentas como o Portugol.
Além disso, a UnLang possui uma ferramenta para importação de módulos, e esse módulos podem ser criados por qualquer pessoa com conhecimentos de JavaScript. Essa função permite que a linguagem atenda a infinitas matérias e conteúdos, servindo como ferramenta extra para o professor.

## Como instalar
Necessário:
 - Node.js < 8.x
- Arquivos da unlang

Obtenha o node [aqui]([https://nodejs.org](https://nodejs.org/))
Baixe o arquivo `.zip` [aqui]()

Na pasta da UnLang, abra uma instância do terminal e digite o seguinte comando:
`$ npm install`
Esta operação ira instalar os pacotes para os módulos demonstrativos que acompanham a instalação padrão.

Após isso é só digitar
`./unlang`
Para ver a tela de boas-vindas com instruções de como utilizar.

## Documentação técnica

***defina***: Utilize para definir variáveis, ex:
		`defina a = 0;`
		`defina numero = 100;`

***fale***: Exibe texto no terminal, ex:
`fale "Olá mundo"; \\olá mundo`

***se***: Permite a criação de condições para a execução de blocos de código, ex:

	se (100 / 3 != 25) {
		fale "100 / 3 = 33.333...";
	}// "100 / 3 = 33.333..."
O ***se*** pode ser estendido com o uso do ***senao***, que é utilizado para definir o bloco de código a ser executado caso a condição expressa no ***se*** seja falsa, ex:
	
	defina a = 100;
	defina b = 50;
	se (a < b) {
		fale "A é menor que B";
	} senao {
		fale "B é maior que A";
	}

***enquanto***:  Repete um bloco de código enquanto uma condição dada for verdadeira, ex:
	
	enquanto (a < 100) {
		fale a;
		a = a++;
	}
