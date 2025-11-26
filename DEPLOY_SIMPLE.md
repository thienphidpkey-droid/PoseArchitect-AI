# 🚨 Hướng dẫn Deploy nhanh cho người không biết code

## Bước 1: Push code lên GitHub

1. Mở **Git Bash** hoặc **Command Prompt** trong thư mục project
2. Chạy từng lệnh sau (copy paste từng dòng):

```bash
git add .
git commit -m "Ready for deployment"
git push
```

**Nếu chưa có Git repository:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/posearchitect-ai.git
git branch -M main
git push -u origin main
```

---

## Bước 2: Deploy lên Vercel (QUAN TRỌNG)

### A. Tạo tài khoản Vercel (nếu chưa có)
1. Vào https://vercel.com/signup
2. Chọn "Continue with GitHub"
3. Đăng nhập GitHub và cho phép Vercel truy cập

### B. Import Project
1. Vào https://vercel.com/new
2. Click "Import Git Repository"
3. Chọn repo `posearchitect-ai` (hoặc tên repo bạn đã tạo)
4. Click "Import"

### C. Cấu hình (BƯỚC QUAN TRỌNG NHẤT)

**Trong màn hình "Configure Project":**

1. **Framework Preset**: Để mặc định (Vite)
2. **Build Command**: `npm run build` (để mặc định)
3. **Output Directory**: `dist` (để mặc định)

4. **⚠️ QUAN TRỌNG - Environment Variables:**
   - Click "Add" hoặc mở rộng phần "Environment Variables"
   - Thêm biến:
     - **Name**: `API_KEY`
     - **Value**: `AIzaSyBdeshSgl6fdE5skfMeUCP-Ib8ZaRNc06k`
   - Chọn **ALL** environments (Production, Preview, Development)

5. Click **"Deploy"**

### D. Đợi Deploy
- Vercel sẽ build khoảng 1-2 phút
- Nếu thành công, bạn sẽ thấy 🎉 và link website
- Nếu fail, xem phần "Troubleshooting" bên dưới

---

## Bước 3: Kiểm tra Website

1. Click vào link Vercel cung cấp (dạng: `https://posearchitect-ai-xxx.vercel.app`)
2. **Nếu thấy màn hình trắng:**
   - Nhấn **F12** (mở Developer Tools)
   - Chọn tab **Console**
   - Chụp ảnh các lỗi màu đỏ (nếu có)
   - Gửi ảnh đó để được hỗ trợ

---

## 🔧 Troubleshooting (Xử lý lỗi)

### Lỗi 1: Build Failed
**Triệu chứng:** Vercel báo "Build Failed" màu đỏ

**Giải pháp:**
1. Click vào deployment failed
2. Xem phần "Build Logs"
3. Tìm dòng lỗi (thường có chữ "error")
4. Copy paste lỗi đó để được hỗ trợ

### Lỗi 2: Màn hình trắng sau khi deploy thành công
**Triệu chứng:** Build thành công nhưng web chỉ hiện màn trắng

**Nguyên nhân thường gặp:**
- Chưa thêm Environment Variable `API_KEY`
- Hoặc thêm sai giá trị

**Giải pháp:**
1. Vào Vercel Dashboard
2. Click vào project
3. Chọn **Settings** → **Environment Variables**
4. Kiểm tra xem có biến `API_KEY` chưa
5. Nếu chưa có, thêm:
   - Name: `API_KEY`
   - Value: `AIzaSyBdeshSgl6fdE5skfMeUCP-Ib8ZaRNc06k`
6. Click **Save**
7. Vào tab **Deployments**
8. Click nút **"Redeploy"** (deploy lại)

### Lỗi 3: "Cannot find module 'react'"
**Giải pháp:** Lỗi này là bình thường khi code ở local. Vercel sẽ tự động cài đặt khi deploy.

---

## 📝 Checklist Deploy

- [ ] Đã push code lên GitHub
- [ ] Đã tạo project trên Vercel
- [ ] Đã thêm Environment Variable `API_KEY`
- [ ] Build thành công (có dấu ✓ xanh)
- [ ] Website mở được (không còn màn trắng)

---

## 🆘 Cần trợ giúp?

Nếu vẫn gặp vấn đề, cung cấp thông tin sau:
1. Link Vercel deployment (ví dụ: `https://posearchitect-ai-xxx.vercel.app`)
2. Screenshot của Build Logs (nếu build fail)
3. Screenshot của Console (F12) nếu màn hình trắng
