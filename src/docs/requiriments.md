# Sistema de gerenciamento de oficinas

## Objetivo

Desenvolver um sistema para ajudar donos de oficina mecanica a gerenciar 
seu negocio, facilitar o acesso a informações de clientes e veiculos.

--- 

## Usuarios do sistemas 

- Administrador
- Funcionario

## Problemas identificados

- Dificuldade em gerenciar informações dos clientes
- Processo manual para criação da nota do cliente

## Requisitos funcionais

- RF01 - Cadastrar OS
- RF02 - Cadastrar nota
- RF03 - Excluir nota
- RF04 - Gerar PDF da nota
- RF05 - Cadastrar peça
- RF06 - Editar peça
- RF07 - Deletar peça
- RF08 - Gerenciar pagamentos (entradas e saidas)
- RF09 - Cadastrar administrador
- RF10 - Cadastrar funcionario
- RF11 - Login
- RF12 - Emitir relatorio
- RF13 - Cadastrar cliente
- RF14 - Editar cliente

## Requisitos não funcionais

- RNF01 - O sistema deve possuir auntenticação
- RNF02 - O sistema deve funcionar em dispositivos móveis
- RNF03 - Apenas usuários autorizados poderão acessar determinadas funcionalidades 

## Regras de negócio

- RN01 - Apenas um cadastro por email é permitido
- RN04 - Apenas o administrador pode excluir uma peça
- RN05 - Apenas o administrador pode cadastrar um funcionario
