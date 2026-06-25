# 便宜買 AI — CRA → Vite + Tailwind + shadcn/ui 遷移紀錄

## 背景

原本使用 Create React App（CRA）+ 手寫 CSS 開發。
CRA 已於 2023 年停止維護，改用 Vite 獲得更快的開發體驗，並引入 Tailwind CSS 與 shadcn/ui 提升 UI 品質與一致性。

---

## 技術選擇說明

### 為什麼選 Vite 而非 Next.js
- 專案為純 SPA + FastAPI 架構，不需要 SSR
- Vite 遷移成本低（30 分鐘），Next.js 需要改路由系統（1-2 天）
- 未來若需 SEO / SSR，從 Vite 換 Next.js 只需改路由結構，組件與 Tailwind 樣式完全帶得過去

### 為什麼選 Tailwind v3 而非 v4
- 目前 Node.js 版本為 v18，Tailwind v4 需要 Node >= 20
- v3 功能完整，與 shadcn/ui 完全相容

---

## 遷移步驟

### Phase 1 — 換 Vite

```bash
# 移除 CRA
npm uninstall react-scripts

# 安裝 Vite
npm install -D vite @vitejs/plugin-react
```

**新增 `vite.config.js`**
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
});
```

**調整事項**
- `public/index.html` → 移至根目錄 `index.html`，移除 `%PUBLIC_URL%` 語法
- `src/index.js` → 改名 `src/index.jsx`
- `src/App.js` → 改名 `src/App.jsx`（Vite 對 `.js` 內含 JSX 嚴格要求）
- `index.html` 的 script 標籤改為 `<script type="module" src="/src/index.jsx">`
- `package.json` 加入 `"type": "module"`
- `package.json` scripts 更新：

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

**環境變數更名**

| 舊（CRA） | 新（Vite） |
|---|---|
| `REACT_APP_API_URL` | `VITE_API_URL` |
| `process.env.REACT_APP_API_URL` | `import.meta.env.VITE_API_URL` |

更新 `.env.local` 與 `.env.production`，以及 `src/hooks/useApi.js`。

---

### Phase 2 — 安裝 Tailwind CSS

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

**新增 `tailwind.config.js`**
```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-dark': '#2D6A4F',
        'orange-dark': '#D4660A',
        'cream-dark': '#E8D5B7',
      },
    },
  },
  plugins: [],
};
```

**新增 `postcss.config.js`**
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

在 `src/index.css` 最頂部加入：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Phase 3 — 安裝 shadcn/ui

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-slot
```

**新增工具函式 `src/lib/utils.js`**
```js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**新增 UI 組件**（`src/components/ui/`）
- `button.jsx` — 支援 primary / secondary / orange / ghost variants
- `card.jsx` — CardHeader / CardTitle / CardContent
- `badge.jsx` — 支援 green / orange / red / gray variants

**改用 Tailwind 重寫的組件**
- `Navbar.jsx` — sticky + backdrop-blur，active 狀態樣式
- `Home.jsx` — Hero section、採買推薦 grid
- `PriceCard.jsx` — 使用 shadcn Card + Badge
- `AlertCard.jsx` — 依 riskLevel 動態套用 Tailwind 色彩
- `SolarTermCard.jsx` — 使用 shadcn Card + Badge

---

### Phase 4 — 後端 CORS 更新

`backend/main.py` 的 CORS allow_origins 加入本地開發 port：

```python
allow_origins=[
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",   # Vite dev server
    "https://smartbuy-ai-react-v4nh.vercel.app",
],
```

---

### Phase 5 — Vercel 部署設定

**Vercel 自動偵測**：專案有 `vite.config.js` 時，Vercel 自動使用：
- Build Command：`vite build`
- Output Directory：`dist`

**必須在 Vercel 後台新增環境變數**（`.env.production` 無法完全替代）：

| Key | Value | Environment |
|---|---|---|
| `VITE_API_URL` | `https://smartbuyai-react.onrender.com` | Production |

> ⚠️ 舊的 `REACT_APP_API_URL` 對 Vite 無效，需新增 `VITE_API_URL`。
> 設定後需重新 Redeploy 才生效。

---

## 新增的檔案

```
smartbuy-react/
├── .gitignore                          # 新增（擋 backend/.venv）
├── frontend/
│   ├── index.html                      # 從 public/ 移至根目錄
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── index.jsx                   # 原 index.js 改名
│       ├── App.jsx                     # 原 App.js 改名
│       ├── lib/
│       │   └── utils.js
│       └── components/
│           └── ui/
│               ├── button.jsx
│               ├── card.jsx
│               └── badge.jsx
```

---

## 移除的檔案 / 依賴

- `react-scripts`（CRA 核心）
- `frontend/public/index.html`（移至根目錄）
- `frontend/src/App.js`、`frontend/src/index.js`（改名為 .jsx）
- 各組件的獨立 `.css` 檔案（Navbar.css、PriceCard.css、AlertCard.css、SolarTermCard.css、Home.css）

---

## 未來升級路徑

若需要 SEO 或 SSR，可從 Vite 遷移至 Next.js：
- 組件、Tailwind、shadcn 完全不動
- 只需改路由結構（React Router → Next.js file-based routing）
- 環境變數 `VITE_` 前綴改為 `NEXT_PUBLIC_`
- 遷移成本約 1-2 天
