
// Importar as bibliotecas necessárias
import express from "express";
import dotenv from "dotenv";
import prisma from "./db.js"; // Importar nossa conexão com o banco

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Criar aplicação Express
const app = express();

// Middleware para processar JSON nas requisições
app.use(express.json());

//Healthcheck
app.get("/", (_req, res) => res.json({ ok: true, service: "API 3º Bimestre" }));

//CREATE: POST /usuarios
app.post("/usuarios", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: "Email e password são obrigatórios" });
    }
    
    const novoUsuario = await prisma.user.create({
      data: { name, email, password }
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }

    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

//READ: GET /usuarios
app.get("/usuarios", async (_req, res) => {
  try {
    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        store: {
          include: {
            products: true
          }
        }
      },
      orderBy: { id: "asc" }
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

//READ: GET /usuarios/:id - Buscar um usuário específico
app.get("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        store: {
          include: {
            products: true
          }
        }
      }
    });
    
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

//UPDATE: PUT /usuarios/:id - Atualizar um usuário
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const usuarioAtualizado = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        store: {
          include: {
            products: true
          }
        }
      }
    });
    
    res.json(usuarioAtualizado);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já está em uso" });
    }
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

//DELETE: DELETE /usuarios/:id - Excluir um usuário
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

// ============== ROTAS PARA STORES ==============

//CREATE: POST /stores - Criar uma nova loja
app.post("/stores", async (req, res) => {
  try {
    const { name, userId } = req.body;
    
    // Validação básica
    if (!name || !userId) {
      return res.status(400).json({ error: "Nome da loja e ID do usuário são obrigatórios" });
    }
    
    // Verificar se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!userExists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    
    // Verificar se o usuário já tem uma loja
    const userHasStore = await prisma.store.findUnique({
      where: { userId: userId }
    });
    
    if (userHasStore) {
      return res.status(409).json({ error: "Usuário já possui uma loja" });
    }
    
    const novaLoja = await prisma.store.create({
      data: { name, userId },
      include: {
        user: true,
        products: true
      }
    });

    res.status(201).json(novaLoja);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar loja" });
  }
});

//READ: GET /stores - Listar todas as lojas
app.get("/stores", async (_req, res) => {
  try {
    const lojas = await prisma.store.findMany({
      include: {
        user: true,
        products: true
      },
      orderBy: { id: "asc" }
    });
    res.json(lojas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar lojas" });
  }
});

//READ: GET /stores/:id - Buscar uma loja específica
app.get("/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const loja = await prisma.store.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        products: true
      }
    });
    
    if (!loja) {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    
    res.json(loja);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar loja" });
  }
});

//UPDATE: PUT /stores/:id - Atualizar uma loja
app.put("/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    // Validação básica
    if (!name) {
      return res.status(400).json({ error: "Nome da loja é obrigatório" });
    }
    
    const lojaAtualizada = await prisma.store.update({
      where: { id: parseInt(id) },
      data: { name },
      include: {
        user: true,
        products: true
      }
    });
    
    res.json(lojaAtualizada);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    res.status(500).json({ error: "Erro ao atualizar loja" });
  }
});

//DELETE: DELETE /stores/:id - Excluir uma loja
app.delete("/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.store.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    res.status(500).json({ error: "Erro ao excluir loja" });
  }
});

// ============== ROTAS PARA PRODUCTS ==============

//CREATE: POST /products - Criar um novo produto
app.post("/products", async (req, res) => {
  try {
    const { name, price, storeId } = req.body;
    
    // Validação básica
    if (!name || !price || !storeId) {
      return res.status(400).json({ error: "Nome, preço e ID da loja são obrigatórios" });
    }
    
    if (isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ error: "Preço deve ser um número positivo" });
    }
    
    // Verificar se a loja existe
    const storeExists = await prisma.store.findUnique({
      where: { id: storeId }
    });
    
    if (!storeExists) {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    
    const novoProduto = await prisma.product.create({
      data: { 
        name, 
        price: parseFloat(price),
        storeId 
      },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

//READ: GET /products - Listar todos os produtos
app.get("/products", async (_req, res) => {
  try {
    const produtos = await prisma.product.findMany({
      include: {
        store: {
          include: {
            user: true
          }
        }
      },
      orderBy: { id: "asc" }
    });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

//READ: GET /products/:id - Buscar um produto específico
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });
    
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

//UPDATE: PUT /products/:id - Atualizar um produto
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    
    // Validação básica
    if (!name && !price) {
      return res.status(400).json({ error: "Nome ou preço deve ser fornecido para atualização" });
    }
    
    if (price && (isNaN(price) || parseFloat(price) <= 0)) {
      return res.status(400).json({ error: "Preço deve ser um número positivo" });
    }
    
    const produtoAtualizado = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { 
        name, 
        price: price ? parseFloat(price) : undefined 
      },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });
    
    res.json(produtoAtualizado);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

//DELETE: DELETE /products/:id - Excluir um produto
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//ROTA DE TESTE
app.get("/status", (req, res) => {
  res.json({ message: "API Online" });
});
