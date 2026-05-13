using Microsoft.EntityFrameworkCore;
using MiniStore.Data;
using MiniStore.DTOs.Product;
using MiniStore.Models;
using MiniStore.Services.Interfaces;

namespace MiniStore.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProductResponseDto> CreateAsync(ProductCreateDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                SellPrice = dto.SellPrice,
                ImportPrice = dto.ImportPrice,
                Quantity = dto.Quantity
            };

            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            var response = new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                SellPrice = product.SellPrice,
                Quantity = product.Quantity,
            };
            return response;
        }

        public async Task<List<ProductResponseDto>> GetAllAsync()
        {
            var products = await _context.Products.ToListAsync();

            var response = products.Select(product => new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                SellPrice = product.SellPrice,
                Quantity = product.Quantity
            }).ToList();

            return response;
        }


        public async Task<ProductResponseDto?> GetByIdAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }
            var response = new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                SellPrice = product.SellPrice,
                Quantity = product.Quantity
            };
            return response;
        }



        public async Task<ProductResponseDto?> UpdateAsync(int id, ProductUpdateDto dto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }
            product.Name = dto.Name;
            product.SellPrice = dto.SellPrice;
            product.ImportPrice = dto.ImportPrice;
            product.Quantity = dto.Quantity;

            await _context.SaveChangesAsync();
            var response = new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                SellPrice = product.SellPrice,
                Quantity = product.Quantity
            };

            return response;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
