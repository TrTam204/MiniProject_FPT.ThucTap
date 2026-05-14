# Frontend
## Phân tích product.service.ts
### 1. IMPORT

import { Injectable } from '@angular/core';

"Injectable" là nó đang nói Angular class này có thể dùng Dependency Injection (Angular tự tạo object giúp mình)
GIỐNG BACKEND

Backend:

builder.Services.AddScoped<IProductService, ProductService>();

ASP.NET sẽ:

tự tạo ProductService
inject vào Controller
Angular cũng y chang

Angular sẽ:

tự tạo ProductService
inject nơi cần dùng
1. HTTPCLIENT
import { HttpClient } from '@angular/common/http';
HttpClient là gì?

Đây là:

công cụ gửi HTTP request

Ví dụ:

GET
POST
PUT
DELETE
TƯ DUY QUAN TRỌNG

Angular:

không biết gọi API tự nhiên được

Nó cần:

HttpClient
GIỐNG POSTMAN

HttpClient giống:

mini Postman bên trong Angular app
3. OBSERVABLE
import { Observable } from 'rxjs';
Observable là gì?

Đây là phần QUAN TRỌNG NHẤT Angular.

API KHÔNG TRẢ DỮ LIỆU NGAY

Khi Angular gọi:

http.get()

thì:

request vừa gửi đi
server chưa trả về ngay