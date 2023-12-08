# tapr-2023-equipe1-gestao-colab-nodejs

##Autenticação no AZURE
[DOC](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt)

´´´
az login -u andreisse.leandro@univille.br

##Outra alternativa
az login --use-device-code

##Confirmar login
az ad signed-in-user show
´´´

##Extensão do VSCode
[Typescript](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
[Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Criação do projeto
```
npm install -g yo generator-express-no-stress-typescript
yo express-no-stress-typescript
```

## Execução do projeto
```
cd gestaocolab/
npm install
npm run dev
```

## Dependências do projeto
```
npm install @azure/cosmos
npm install @azure/identity
```

## CosmosDB
- [Introdução](https://learn.microsoft.com/en-us/azure/cosmos-db/introduction)
- [Databases, containers, and items](https://learn.microsoft.com/en-us/azure/cosmos-db/resource-model)

### Configuração RBAC de permissão
```
az cosmosdb sql role assignment create --account-name COSMOSDBACCOUNT --resource-group GRUPODERECURSO --role-assignment-id 00000000-0000-0000-0000-000000000002 --role-definition-name "Cosmos DB Built-in Data Contributor" --scope "/" --principal-id GUIDUSUARIOAD

az cosmosdb sql role assignment create --account-name cosmosandreisse --resource-group rg-tapr2023-brazilsouth-dev --role-assignment-id 00000000-0000-0000-0000-000000000002 --role-definition-name "Cosmos DB Built-in Data Contributor" --scope "/" --principal-id 661c10d1-4b16-4d4b-a298-69edb4bbdb94
```