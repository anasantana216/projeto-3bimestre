# 🚀 Como Conectar a API no Insomnia

## ✅ Status Atual
- **Servidor rodando**: http://localhost:3001
- **Banco conectado**: ✅ Funcionando
- **Collection criada**: ✅ Pronta para importar

---

## 📋 Passo-a-Passo para Conectar no Insomnia

### 1. **Abrir o Insomnia**
   - Abra o aplicativo Insomnia no seu computador
   - Faça login com sua conta GitHub (se ainda não estiver logado)

### 2. **Importar a Collection**
   - No Insomnia, clique em **"Create"** → **"Import from File"**
   - Selecione o arquivo: `Insomnia_API_Collection.json` (que está na pasta do projeto)
   - Ou copie e cole o conteúdo do arquivo diretamente

### 3. **Verificar se Importou Corretamente**
   Você deve ver:
   - 📁 **API Marketplace - Projeto 3º Bimestre**
     - 👤 **Usuários** (5 requisições)
     - 🏪 **Lojas** (5 requisições) 
     - 📱 **Produtos** (5 requisições)
   - ⚙️ **Environment** com `base_url: http://localhost:3001`

### 4. **Testar a Conexão**
   - Clique em **"HealthCheck"** 
   - Clique em **"Send"**
   - Deve retornar: `{"message": "API Online"}`

---

## 🔥 Sequência de Testes Recomendada

### **Teste 1: HealthCheck** ✅
```bash
GET /status
# Resposta esperada: {"message": "API Online"}
```

### **Teste 2: Criar Usuário** 👤
```bash
POST /usuarios
# Body já preenchido na collection
```

### **Teste 3: Listar Usuários** 📋
```bash
GET /usuarios
# Deve mostrar o usuário criado
```

### **Teste 4: Criar Loja** 🏪
```bash
POST /stores
# Body já preenchido (userId: 1)
```

### **Teste 5: Criar Produto** 📱
```bash
POST /products
# Body já preenchido (storeId: 1)
```

### **Teste 6: Testar Includes** 🔗
```bash
GET /stores/1    # Mostra loja + usuário + produtos
GET /products    # Mostra produtos + loja + usuário
```

---

## 🛠️ Configurações Importantes

### **Base URL**
- Certifique-se que o environment está configurado com:
  ```
  base_url: http://localhost:3001
  ```

### **Headers**
- As requisições POST/PUT já têm o header:
  ```
  Content-Type: application/json
  ```

### **Bodies**
- Todos os bodies JSON já estão preenchidos com dados de exemplo
- Você pode modificar os valores conforme necessário

---

## 🐛 Resolução de Problemas

### **Se não conseguir conectar:**
1. **Verificar se o servidor está rodando:**
   - Abra o terminal no VS Code
   - Digite: `npm run dev`
   - Deve mostrar: "Servidor rodando em http://localhost:3001"

2. **Testar no navegador:**
   - Acesse: http://localhost:3001/status
   - Deve retornar JSON com a mensagem

3. **Verificar a porta:**
   - Se a porta 3001 estiver ocupada, mude para 3002 no código
   - Atualize o `base_url` no Insomnia

### **Se as requisições falharem:**
- Verifique se o Content-Type está como `application/json`
- Confirme se o body está em formato JSON válido
- Teste primeiro o HealthCheck

---

## 📊 Dados de Teste

### **Usuário Exemplo:**
```json
{
  "name": "Ana Boer",
  "email": "ana.boer@email.com", 
  "password": "123456"
}
```

### **Loja Exemplo:**
```json
{
  "name": "Loja da Ana",
  "userId": 1
}
```

### **Produto Exemplo:**
```json
{
  "name": "MacBook Pro",
  "price": 2499.99,
  "storeId": 1
}
```

---

## 🎯 Próximos Passos

1. **Importe a collection** no Insomnia
2. **Teste o HealthCheck** primeiro
3. **Siga a sequência de testes** recomendada
4. **Explore todas as rotas** CRUD
5. **Verifique os includes** funcionando
6. **Documente os resultados** para apresentação

**🚀 Sua API está pronta para apresentação!**