# Backend ASP.NET Core Web API + Angular 18

## Mục tiêu 

* hiểu CRUD foundation
* hiểu flow dữ liệu
* hiểu FE ↔ BE
* hiểu Controller / Service / DTO / DbContext
* chưa đi sâu Clean Architecture nâng cao

---

# 1. Kiến trúc backend
## Mini Clean Structure

```text id="vhg65v"
Frontend
↓
Controller
↓
Service
↓
DbContext
↓
SQL Server
```

## Vai trò từng layer

| Layer      | Vai trò                                 |
| ---------- | --------------------------------------- |
| Controller | nhận request, gọi service, trả response |
| Service    | xử lý business logic                    |
| DbContext  | làm việc với database qua EF Core       |
| SQL Server | nơi lưu dữ liệu thật                    |

---

# 2. Cấu trúc project backend

```text id="cz1rpo"
Controllers/
Services/
Services/Interfaces/
DTOs/
Models/
Data/
```

| Folder      | Tác dụng             |
| ----------- | -------------------- |
| Controllers | chứa API endpoint    |
| Services    | chứa logic xử lý     |
| Interfaces  | contract cho service |
| DTOs        | dữ liệu API FE ↔ BE  |
| Models      | entity database      |
| Data        | AppDbContext         |

---

# 3. Models và DTO

## Model (Entity)

Đại diện table trong database.

Ví dụ:

```csharp id="onx3bb"
public class Product
{
    public int Id { get; set; }

    public string Name { get; set; }

    public decimal SellPrice { get; set; }
}
```

---

## DTO

Dùng để:

* frontend gửi dữ liệu lên backend
* backend trả dữ liệu về frontend

DTO không bắt buộc giống entity.

---

# Các DTO thường dùng

| DTO                | Tác dụng                        |
| ------------------ | ------------------------------- |
| ProductCreateDto   | frontend gửi dữ liệu tạo mới    |
| ProductUpdateDto   | frontend gửi dữ liệu update     |
| ProductResponseDto | backend trả dữ liệu ra frontend |

---

# Vì sao cần DTO

Không nên return thẳng entity.

Ví dụ Product entity có:

```csharp id="lkjlwm"
ImportPrice
```

Frontend không nên thấy giá nhập.

Nên dùng:

```csharp id="5n6p22"
ProductResponseDto
```

để chỉ trả:

* Id
* Name
* SellPrice
* Quantity

---

# Flow DTO

```text id="0tt9fu"
Frontend gửi DTO
↓
Controller nhận DTO
↓
Service xử lý
↓
Entity lưu database
↓
Map sang ResponseDto
↓
Frontend nhận JSON
```

---

# 4. Validation chia 2 tầng

## Tầng 1 — DTO Validation

Dùng cho:

* required
* format
* độ dài
* min/max

Ví dụ:

```csharp id="h98qf4"
[Required]
[MaxLength(100)]
[Range(0, double.MaxValue)]
```

---

## Tầng 2 — Service Validation

Dùng cho business logic.

Ví dụ:

* email bị trùng
* sản phẩm không tồn tại
* quantity không đủ
* username đã tồn tại

---
# DTO Structure

```text id="t1y1ti"
DTOs/
├── Product/
│   ├── ProductCreateDto.cs
│   ├── ProductUpdateDto.cs
│   └── ProductResponseDto.cs
│
├── User/
│   ├── UserCreateDto.cs
│   ├── UserUpdateDto.cs
│   └── UserResponseDto.cs
```

---

# DTO Notes

| DTO         | Tác dụng             |
| ----------- | -------------------- |
| CreateDto   | dữ liệu tạo mới      |
| UpdateDto   | dữ liệu update       |
| ResponseDto | dữ liệu trả frontend |

---

# ResponseDto

Không return:

* Password
* ImportPrice
* dữ liệu nội bộ database

---

# Nullable Notes

```csharp id="9d6h6j"
Task<ProductResponseDto?>
```

Dấu `?`

* object có thể null

Ví dụ:

```csharp id="v6szom"
if(product == null)
{
    return null;
}
```
# Ví dụ DTO Validation

```csharp id="w5sq4f"
public class ProductCreateDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Range(0, double.MaxValue)]
    public decimal SellPrice { get; set; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }
}
```

---

# [ApiController]

Khi controller có:

```csharp id="2i7n5v"
[ApiController]
```

ASP.NET Core sẽ:

* tự validate DTO
* sai dữ liệu tự trả:

  * 400 BadRequest

---
# Validation thường dùng

| Validation                             | Ý nghĩa            | Ví dụ                                | Dùng cho              |
| -------------------------------------- | ------------------ | ------------------------------------ | --------------------- |
| [Required]                             | bắt buộc nhập      | [Required]                           | Name, Email, Password |
| [MaxLength(x)]                         | độ dài tối đa      | [MaxLength(100)]                     | Tên sản phẩm          |
| [MinLength(x)]                         | độ dài tối thiểu   | [MinLength(6)]                       | Password              |
| [StringLength(max)]                    | giới hạn độ dài    | [StringLength(100)]                  | Chuỗi text            |
| [StringLength(max, MinimumLength=min)] | giới hạn min + max | [StringLength(100, MinimumLength=5)] | Username              |
| [Range(min,max)]                       | giới hạn khoảng số | [Range(0,100)]                       | Tuổi, số lượng        |
| [Range(0,double.MaxValue)]             | không cho số âm    | [Range(0,double.MaxValue)]           | Price                 |
| [Range(0,int.MaxValue)]                | int không âm       | [Range(0,int.MaxValue)]              | Quantity              |
| [EmailAddress]                         | đúng format email  | [EmailAddress]                       | Email                 |
| [Phone]                                | đúng format phone  | [Phone]                              | Phone                 |
| [Url]                                  | đúng format URL    | [Url]                                | ImageUrl              |
| [Compare("Field")]                     | so sánh field      | [Compare("Password")]                | ConfirmPassword       |
| [RegularExpression()]                  | validate regex     | [RegularExpression(@"^[a-zA-Z]+$")]  | chỉ nhập chữ          |
| string.Empty                           | tránh warning null | = string.Empty;                      | string property       |

---


# 5. EF Core

## Các method đã học

| Method                | Tác dụng                 |
| --------------------- | ------------------------ |
| Add()                 | đánh dấu thêm dữ liệu    |
| Remove()              | đánh dấu xóa             |
| Update()              | đánh dấu update          |
| FindAsync(id)         | tìm theo khóa chính      |
| FirstOrDefaultAsync() | tìm theo điều kiện       |
| ToListAsync()         | lấy danh sách            |
| SaveChangesAsync()    | lưu thật xuống DB        |
| AnyAsync()            | check tồn tại            |
| Select()              | select dữ liệu           |
| Include()             | load navigation property |

---

# EF Core Flow

```text id="7ccg79"
Add()
↓
EF tracking object
↓
SaveChangesAsync()
↓
Generate SQL
↓
SQL Server
```
---

# Lưu ý quan trọng

```csharp id="1vc76u"
Add()
```

CHƯA lưu database.

Phải có:

```csharp id="7t1mg2"
SaveChangesAsync()
```

mới lưu thật.

---

# 6. EF Tracking

Sau:

```csharp id="zrq4g3"
FindAsync(id)
```

EF Core sẽ tracking object.

---

# Nghĩa là gì

EF sẽ theo dõi:

* object cũ
* field nào bị thay đổi

Ví dụ:

```csharp id="9zth50"
product.Name = dto.Name;
```

Sau đó:

```csharp id="0pq8vg"
await _context.SaveChangesAsync();
```

EF tự generate SQL UPDATE.

---

# 7. CRUD API

# CREATE

```http id="9twspg"
POST /api/product
```

Flow:

```text id="fl2vkr"
Frontend gửi data
↓
Controller
↓
Service
↓
new Entity
↓
Add()
↓
SaveChangesAsync()
↓
Database
```

---

# GET ALL

```http id="3bj9v9"
GET /api/product
```

Trả:

```csharp id="n5az7l"
List<ProductResponseDto>
```
Flow:
```text id="1yvcc9"
Controller
↓
Service
↓
ToListAsync()
↓
Map ResponseDto
↓
return JSON
```
---

# GET BY ID

```http id="9l8c6v"
GET /api/product/5
```

Flow:

```text id="o5m74v"
FindAsync(id)
↓
Nếu null → NotFound
↓
Map DTO
↓
return response
```

---

# UPDATE

```http id="7gqzlc"
PUT /api/product/5
```

Flow:

```text id="fn6qjx"
FindAsync(id)
↓
Sửa field
↓
SaveChangesAsync()
```

---

# DELETE

```http id="6psulq"
DELETE /api/product/5
```

Flow:

```text id="j1p2kz"
FindAsync(id)
↓
Remove()
↓
SaveChangesAsync()
```
 CRUD Notes

| CRUD    | Flow                 |
| ------- | -------------------- |
| Create  | new → Add → Save     |
| GetAll  | ToListAsync          |
| GetById | FindAsync            |
| Update  | Find → sửa → Save    |
| Delete  | Find → Remove → Save |

---

# 8. Status Code

| Status                  | Ý nghĩa                       |
| ----------------------- | ----------------------------- |
| 200 OK                  | request thành công            |
| 201 Created             | tạo dữ liệu thành công        |
| 204 NoContent           | xóa thành công không trả data |
| 400 BadRequest          | dữ liệu gửi sai               |
| 401 Unauthorized        | chưa đăng nhập/token sai      |
| 403 Forbidden           | không có quyền                |
| 404 NotFound            | không tìm thấy dữ liệu        |
| 500 InternalServerError | lỗi backend/server            |
---

# 9. Dependency Injection (DI)

## Đăng ký service trong Program.cs

```csharp id="tpzqu9"
builder.Services.AddScoped<IProductService, ProductService>();
```

---

# Flow DI

```text id="6k4z87"
Controller cần IProductService
↓
DI Container tạo ProductService
↓
Inject vào controller
```

---

# Lỗi dễ gặp

## Chưa DI vào Program.cs

Ví dụ quên:

```csharp id="rx9f44"
builder.Services.AddScoped<IUserService, UserService>();
```

Sẽ lỗi:

```text id="a5m4u0"
Unable to resolve service
```

---

# 10. Interface Pattern

## Interface

```csharp id="zksn4w"
public interface IProductService
{
    Task<ProductResponseDto> CreateAsync(ProductCreateDto dto);

    Task<List<ProductResponseDto>> GetAllAsync();

    Task<ProductResponseDto?> GetByIdAsync(int id);

    Task<ProductResponseDto?> UpdateAsync(int id, ProductUpdateDto dto);

    Task<bool> DeleteAsync(int id);
}
```

---

# Lỗi từng gặp

## Sai trong interface

Sai:

```csharp id="wq3rlv"
public async Task...
```

Đúng:

```csharp id="0m6gwy"
Task<ProductResponseDto> CreateAsync(...);
```

Interface:

* không dùng async
* không dùng logic

---

# 11. Nullable ?

Ví dụ:

```csharp id="e50cl0"
Task<ProductResponseDto?>
```

Dấu `?` nghĩa là:

* object có thể null

Ví dụ:

```csharp id="lxttjl"
if(product == null)
{
    return null;
}
```

---

# 12. Các lỗi đã từng gặp

| Lỗi                       | Nguyên nhân                 |
| ------------------------- | --------------------------- |
| CS0535                    | chưa implement đủ interface |
| ResponseDto trả rỗng      | mapping sai                 |
| Unable to resolve service | quên AddScoped              |

---

# 13. Product CRUD hiện tại

## Product Model

```text id="lq1khw"
Id
Name
SellPrice
ImportPrice
Quantity
ImageUrl
Description
```

---

# Product DTO

```text id="9fwz3n"
ProductCreateDto
ProductUpdateDto
ProductResponseDto
```

---

# Hiểu được

* Entity dùng cho database
* DTO dùng cho API
* ResponseDto dùng để lọc dữ liệu trả frontend
* không return thẳng entity
* FindAsync(id) trả null nếu không có dữ liệu
* SaveChangesAsync() mới lưu thật

---

# 14. User CRUD hiện tại

## User Model

```text id="8hl18s"
Id
FullName
Email
Password
Phone
Address
```

---

# UserResponseDto

Không return:

* Password

Frontend không nên thấy password database.

---

# 15. Angular Flow hiện tại

```text id="d9r0fp"
Angular Component
↓
Angular Service
↓
HttpClient
↓
ASP.NET API
↓
JSON Response
↓
Render HTML
```

---

# Angular đã học

* component
* service
* router
* HttpClient
* subscribe
* routerLink
* router param

---

# Mục tiêu frontend tiếp theo

* gọi API backend thật
* render product thật
* product detail
* add to cart
* local storage cart
* quantity update
* PrimeNG UI

---

# 16. Program.cs Notes

## Đăng ký DbContext

```csharp id="58sh8g"
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));
```

---

## Đăng ký Service

```csharp id="dlf9a8"
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<IUserService, UserService>();
```

---

# Nếu quên AddScoped

Sẽ lỗi:

```text id="5lbyyz"
Unable to resolve service for type...
```

---

# 17. Controller Structure

```csharp id="jlwmwl"
[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }
}
```

---

# Flow Controller

```text id="nyo3g8"
Frontend gọi API
↓
Controller nhận request
↓
Gọi Service
↓
Nhận kết quả
↓
return StatusCode + JSON
```

---

# PrimeNG muốn học

| Component | Tác dụng      |
| --------- | ------------- |
| Card      | card sản phẩm |
| Button    | button UI     |
| Table     | bảng dữ liệu  |
| Dialog    | popup         |
| Toast     | thông báo     |
| Sidebar   | menu/sidebar  |
| Badge     | số lượng cart |
| Tag       | trạng thái    |
