#!/bin/bash

# --- SCRIPT PARA CONFIGURAR UM SERVIDOR UBUNTU PARA DEPLOY COM DOCKER ---

echo "--- Passo 1: Atualizando a lista de pacotes do servidor ---"
sudo apt update
sudo apt install -y ca-certificates curl

echo "--- Passo 2: Instalando o Git ---"
sudo apt install git -y

echo "--- Passo 3: Instalando o Docker (Método oficial) ---"
# Adiciona a chave GPG oficial do Docker
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Adiciona o repositório do Docker às fontes do APT
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

# Instala os pacotes do Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin

echo "--- Passo 4: Configurando permissões do Docker para o usuário atual ---"
# Adiciona o usuário 'ubuntu' ao grupo 'docker' para não precisar usar 'sudo'
sudo usermod -aG docker ${USER}

echo "--- Passo 5: Instalando o Docker Compose V2 (Plugin) ---"
# Cria o diretório para os plugins da CLI do Docker
sudo mkdir -p /usr/local/lib/docker/cli-plugins

# Baixa o binário do Docker Compose do repositório oficial
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/lib/docker/cli-plugins/docker-compose

# Aplica as permissões de execução ao binário
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

echo "--- ✅ Configuração concluída! ---"
echo "--- IMPORTANTE: Por favor, saia e reconecte-se à VM para que as permissões do Docker funcionem. ---"
```

---

### Guia de Implantação Passo a Passo

Siga estes passos na ordem correta.

#### Passo 1: Pré-requisitos (No seu Computador)
* Garanta que seu projeto (`Frontend`, `Backend`, `docker-compose.yml`, `Dockerfile` de cada um) está atualizado no seu repositório Git (GitHub, GitLab, etc.).
* Tenha o seu ficheiro de chave `.pem` da AWS à mão.

#### Passo 2: Conectar e Executar o Script na VM
1.  **Conecte-se à sua VM** usando o terminal:
    ```bash
    ssh -i "caminho/para/sua/chave.pem" ubuntu@SEU_IP_PUBLICO
    ```
2.  **Crie o ficheiro do script** na VM usando o editor de texto `nano`:
    ```bash
    nano setup_vm.sh
    ```
3.  **Copie e Cole:** Copie todo o conteúdo do script acima (`setup_vm.sh`) e cole-o dentro do editor `nano`. Salve com `Ctrl+O` (e pressione Enter) e feche com `Ctrl+X`.

4.  **Torne o Script Executável:**
    ```bash
    chmod +x setup_vm.sh
    ```
5.  **Execute o Script:**
    ```bash
    ./setup_vm.sh
    ```
6.  **RECONECTE-SE!** Este passo é crucial. O script terminou, agora saia da VM e conecte-se novamente para que as permissões do Docker sejam aplicadas à sua sessão.
    ```bash
    exit
    # E depois conecte-se novamente:
    ssh -i "caminho/para/sua/chave.pem" ubuntu@SEU_IP_PUBLICO
    ```

#### Passo 3: Fazer o Deploy da Aplicação
1.  **Clone o Seu Projeto:** Já na nova sessão SSH, clone o seu repositório.
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2.  **Navegue para a Pasta do Projeto:**
    ```bash
    cd seu-repositorio
    ```
3.  **Crie o Ficheiro `.env`:** O ficheiro de variáveis de ambiente não está no Git, então você precisa criá-lo na VM.
    ```bash
    nano .env
    ```
    Copie e cole as suas variáveis de ambiente (como `POSTGRES_PASSWORD`, etc.), salve (`Ctrl+O`) e feche (`Ctrl+X`).

4.  **Suba a Aplicação:** Agora, o comando mágico. Use `docker compose` (com espaço).
    ```bash
    docker compose up --build -d
    
