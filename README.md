# 🎵 Ícaros Mobile

![Ícaros Icon](./assets/images/iconLogo.png)

## 🌟 Visão Geral do Projeto

Ícaros é uma aplicação móvel desenvolvida em React Native (Expo) que visa criar uma comunidade vibrante para conectar-se com grandes artistas. O aplicativo possui um tema escuro e utiliza uma paleta de cores focada em preto e dourado (`#ECD182`).

## ✨ Funcionalidades Principais

* **Autenticação Completa:** Telas de Login e Cadastro.
* **Cadastro Multi-Usuário:** Permite o cadastro de diferentes tipos de usuários: Músico, Amante de Música e Produtor, com campos específicos para CPF/CNPJ e Gênero Musical.
* **Feed Personalizado:** Exibe posts com abas "Para você" e "Seguindo", permitindo a criação de novas publicações com texto e imagens, além de ações como Curtir e Salvar.
* **Tela de Perfil:** Visualização de informações do usuário, biografia, estatísticas (Publicações, Seguidores, Seguindo) e listagem de posts.
* **Navegação:** Utiliza `expo-router` com navegação entre telas, incluindo uma gaveta lateral (`SettingsDrawer`) para funcionalidades como Deslogar.
* **Componente de Drawer:** Um componente de barra lateral customizável para configurações e logout.

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando o ecossistema Expo, otimizado para React Native.

* **Framework:** React Native
* **Ambiente:** Expo (SDK 54.0.9)
* **Navegação:** Expo Router (v6.0.7), React Navigation
* **Linguagem:** TypeScript (v5.9.2)
* **Estado e Animações:** React Native Reanimated (v4.1.0), React Native Gesture Handler
* **Estilização:** `react-native-safe-area-context`, `expo-status-bar`, `@expo/vector-icons`

## 🚀 Primeiros Passos

### Pré-requisitos

Certifique-se de ter o Node.js e o Expo CLI instalados em sua máquina.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd thiago445/icaros_mobile/Icaros_mobile-dc0445fe0c5f1ec0b578368fa02574022a6ef3a6
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

### Executando o Projeto

Utilize os scripts definidos no `package.json`:

| Comando | Descrição |
| :--- | :--- |
| `npm start` | Inicia o servidor de desenvolvimento Expo. |
| `npm run android` | Constrói e executa o app no Android (requer ambiente nativo). |
| `npm run ios` | Constrói e executa o app no iOS (requer ambiente nativo). |
| `npm run web` | Inicia o app na web. |
| `npm run lint` | Executa o linter do projeto (ESLint com `eslint-config-expo`). |
| `npm run reset-project` | Executa o script de reset do projeto. |

### Configurações Adicionais

**EAS Project ID:**
O projeto está configurado para o EAS (Expo Application Services) com o seguinte ID:
```json
"projectId": "6423da64-4ffd-44f6-bda1-ce98bb5208a1"
