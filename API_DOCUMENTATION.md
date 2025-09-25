# API Marketplace - Documentação das Rotas

Servidor rodando em: **http://localhost:3001**

## HealthCheck
- **GET** `/` - Status da API
- **GET** `/status` - Status da API (alternativo)

## Usuários

### Criar Usuário
- **POST** `/usuarios`
- **Body (JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

### Listar Todos os Usuários
- **GET** `/usuarios`
- **Resposta:** Lista com usuários e suas lojas (se tiverem)

### Buscar Usuário Específico
- **GET** `/usuarios/:id`
- **Resposta:** Usuário com sua loja e produtos

### Atualizar Usuário
- **PUT** `/usuarios/:id`
- **Body (JSON):**
```json
{
  "name": "João Santos",
  "email": "joao.santos@email.com"
}
```

### Excluir Usuário
- **DELETE** `/usuarios/:id`
- **Resposta:** Status 204 (sem conteúdo)

## Lojas

### Criar Loja
- **POST** `/stores`
- **Body (JSON):**
```json
{
  "name": "Loja do João",
  "userId": 1
}
```

### Listar Todas as Lojas
- **GET** `/stores`
- **Resposta:** Lista com lojas, usuários e produtos

### Buscar Loja Específica
- **GET** `/stores/:id`
- **Resposta:** Loja com usuário e produtos

### Atualizar Loja
- **PUT** `/stores/:id`
- **Body (JSON):**
```json
{
  "name": "Nova Loja do João"
}
```

### Excluir Loja
- **DELETE** `/stores/:id`
- **Resposta:** Status 204 (sem conteúdo)

## Produtos

### Criar Produto
- **POST** `/products`
- **Body (JSON):**
```json
{
  "name": "Smartphone Samsung",
  "price": 999.99,
  "storeId": 1
}
```

### Listar Todos os Produtos
- **GET** `/products`
- **Resposta:** Lista com produtos, lojas e usuários

### Buscar Produto Específico
- **GET** `/products/:id`
- **Resposta:** Produto com loja e usuário

### Atualizar Produto
- **PUT** `/products/:id`
- **Body (JSON):**
```json
{
  "name": "iPhone 15 Pro",
  "price": 1299.99
}
```

### Excluir Produto
- **DELETE** `/products/:id`
- **Resposta:** Status 204 (sem conteúdo)

## Códigos de Status HTTP

- **200** - Sucesso
- **201** - Criado com sucesso
- **204** - Sucesso sem conteúdo (DELETE)
- **400** - Erro de validação (dados obrigatórios)
- **404** - Recurso não encontrado
- **409** - Conflito (email duplicado, usuário já tem loja)
- **500** - Erro interno do servidor

## Funcionalidades Implementadas ✅

### CRUD Completo (40% da nota)
- ✅ **CREATE**: POST para usuários, lojas e produtos
- ✅ **READ**: GET para listar todos e buscar específicos
- ✅ **UPDATE**: PUT para atualizar usuários, lojas e produtos
- ✅ **DELETE**: DELETE para remover usuários, lojas e produtos

### Consultas com include (15% da nota)
- ✅ **GET /stores/:id**: Inclui usuário (dono) e produtos
- ✅ **GET /products**: Inclui loja e usuário associado
- ✅ **GET /usuarios**: Inclui loja e produtos do usuário

### Modelagem de Dados ✅
- ✅ Relacionamento 1:1 (User -> Store)
- ✅ Relacionamento 1:N (Store -> Product)
- ✅ Campos obrigatórios e opcionais
- ✅ Tipos de dados corretos (Decimal para preços)

### Tratamento de Erros ✅
- ✅ Validação de dados obrigatórios
- ✅ Verificação de recursos existentes
- ✅ Tratamento de duplicatas (email, loja por usuário)
- ✅ Códigos de status HTTP apropriados
- ✅ Mensagens de erro descritivas

## Para Testar no Insomnia

1. **Importe as requisições** ou crie manualmente usando os exemplos acima
2. **URL Base**: `http://localhost:3001`
3. **Headers**: `Content-Type: application/json`
4. **Teste na ordem**:
   - Criar usuário
   - Criar loja para o usuário
   - Criar produtos para a loja
   - Testar GETs com includes
   - Testar UPDATEs
   - Testar DELETEs

## Observações Importantes

- ✅ **Prisma Client** configurado e funcionando
- ✅ **Conexão com banco** MySQL estabelecida
- ✅ **Validações** implementadas em todas as rotas
- ✅ **Estrutura de pastas** organizada
- ✅ **Logs de erro** para debugging
- ✅ **Relacionamentos** funcionando corretamente

**O projeto está COMPLETO** e atende a todos os requisitos da AV2! 🎉