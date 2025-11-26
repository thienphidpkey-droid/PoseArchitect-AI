# 🚀 Deployment Guide - PoseArchitect AI

## ✅ Pre-Deployment Checklist

### 1. **Verify `.gitignore`**
Đảm bảo file `.gitignore` đã có các dòng sau (đã có sẵn):
```
*.local
.env
.env.local
```

### 2. **Create `.env.local` (Local Development)**
Tạo file `.env.local` trong thư mục gốc của project:
```bash
API_KEY=AIzaSyBdeshSgl6fdE5skfMeUCP-Ib8ZaRNc06k
```

**⚠️ QUAN TRỌNG:** File này sẽ **KHÔNG** được commit lên GitHub (đã có trong `.gitignore`).

### 3. **Test Locally (Optional)**
Nếu có Node.js, chạy thử:
```bash
npm install
npm run dev
```

---

## 📦 GitHub Setup

### 1. **Initialize Git (nếu chưa có)**
```bash
cd "C:\Users\Windows 10\Downloads\posearchitect-ai"
git init
git add .
git commit -m "Initial commit - PoseArchitect AI"
```

### 2. **Create GitHub Repository**
1. Vào https://github.com/new
2. Tạo repo mới (ví dụ: `posearchitect-ai`)
3. **KHÔNG** chọn "Initialize with README" (vì đã có code)

### 3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/posearchitect-ai.git
git branch -M main
git push -u origin main
```

---

## 🌐 Vercel Deployment

### 1. **Import Project**
1. Vào https://vercel.com/new
2. Chọn "Import Git Repository"
3. Chọn repo `posearchitect-ai` vừa tạo

### 2. **Configure Build Settings**
Vercel sẽ tự động nhận diện Vite project. Kiểm tra:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. **⚠️ ADD ENVIRONMENT VARIABLE (QUAN TRỌNG NHẤT)**
Trong phần **Environment Variables**, thêm:
- **Key:** `API_KEY`
- **Value:** `AIzaSyBdeshSgl6fdE5skfMeUCP-Ib8ZaRNc06k`
- **Environment:** Production, Preview, Development (chọn cả 3)

### 4. **Deploy**
Click "Deploy" và đợi vài phút.

---

## 🔍 Troubleshooting

### Nếu vẫn màn hình trắng:
1. **Kiểm tra Vercel Logs:**
   - Vào Vercel Dashboard → Project → Deployments → Click vào deployment mới nhất
   - Xem tab "Runtime Logs" để tìm lỗi

2. **Kiểm tra Browser Console:**
   - Mở web → F12 → Console tab
   - Xem có lỗi gì không

3. **Verify Environment Variable:**
   - Vào Vercel → Settings → Environment Variables
   - Đảm bảo `API_KEY` đã được set đúng

### Nếu thấy "Loading Application..." mãi:
- Có thể do lỗi import module
- Kiểm tra Runtime Logs trên Vercel

### Nếu thấy Error Boundary (màn đỏ):
- Đọc thông báo lỗi
- Thường là do API Key chưa được set hoặc sai

---

## 📝 Notes

- **API Key Security:** API Key chỉ tồn tại trong Vercel Environment Variables, KHÔNG bao giờ commit vào Git
- **Auto Deploy:** Mỗi lần push code mới lên GitHub, Vercel sẽ tự động deploy lại
- **Custom Domain:** Có thể thêm domain riêng trong Vercel Settings

---

## 🎯 Quick Commands Summary

```bash
# Local Development
npm install
npm run dev

# Build for Production (test)
npm run build
npm run preview

# Git Commands
git add .
git commit -m "Your message"
git push
```

---

**✨ Sau khi deploy xong, web sẽ có URL dạng:**
`https://posearchitect-ai-xxx.vercel.app`
