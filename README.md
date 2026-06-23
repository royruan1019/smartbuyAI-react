# 🥬 SmartBuy AI — 智慧買菜助理

> 結合 AI 推薦、即時菜價、氣象預警與節氣知識，幫助你聰明採買、省錢不費力。

**🌐 網站網址：[https://smartbuy-ai-react-v4nh.vercel.app](https://smartbuy-ai-react-v4nh.vercel.app)**

---

## 📌 專案簡介

SmartBuy AI 是一個全端 Web 應用程式，整合台灣蔬果市場價格資料、颱風與天氣預警、以及二十四節氣農業知識，讓使用者能夠掌握最佳採買時機，避開因天災或產地風險造成的菜價飆漲。

---

## ✨ 主要功能

### 🏠 首頁（Home）
- **颱風警報**：即時顯示目前颱風動態與影響評估
- **天氣風險提示**：偵測蔬果產地天氣異常，提前預警可能漲價的品項
- **節氣資訊**：顯示當日所處節氣及相關農事建議
- **今日撿便宜推薦**：根據價格異常分析，列出目前低於平均價的優質品項

### 🔍 菜價搜尋（Price Search）
- 輸入蔬果品項名稱，快速查詢目前市場均價
- 顯示價格狀態（正常 / 偏高 / 偏低）及採買建議
- 支援模糊搜尋，方便快速找到目標品項

### 📅 節氣指南（Solar Term Guide）
- 完整呈現二十四節氣對應的蔬果盛產資訊
- 提供各節氣的農業背景知識與飲食建議
- 幫助使用者根據時令挑選當季、新鮮、平價的食材

### 📢 回報菜價（Report Price）
- 使用者可主動回報在地市場的實際購買價格
- 協助累積更貼近在地的價格資料，讓系統更精準
- 填寫品項名稱、市場名稱、價格與備註

### 🧺 我的菜籃（My Basket）
- 自由新增想購買的蔬果品項至個人菜籃
- 針對菜籃內每個品項提供採買建議（現在買划算嗎？）
- 菜籃資料儲存於瀏覽器本地端（localStorage），不需登入即可使用

---

## 🛠 技術架構

| 層級 | 技術 |
|------|------|
| 前端 | React、React Router、CSS |
| 後端 | Python、FastAPI |
| 部署（前端） | Vercel |
| 部署（後端） | Render |

```
smartbuyAI-react/
├── frontend/          # React 前端應用
│   └── src/
│       ├── pages/     # 各頁面元件（Home、PriceSearch、SolarTermGuide 等）
│       ├── components/# 共用元件（Navbar 等）
│       └── hooks/     # 自訂 React Hooks
└── backend/           # FastAPI 後端服務
    ├── main.py        # API 進入點
    └── src/
        ├── recommendation/ # 採買推薦邏輯
        ├── calendar/       # 節氣資料處理
        ├── weather/        # 颱風與天氣風險
        ├── anomaly/        # 價格異常偵測
        └── data/           # 資料載入與儲存
```

---

## 🚀 本地開發

### 前端

```bash
cd frontend
npm install
npm start
```

前端將在 `http://localhost:3000` 啟動。

### 後端

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

後端 API 將在 `http://localhost:8000` 啟動。

---

## 📄 授權

本專案為個人學習與作品集用途，歡迎參考與交流。
