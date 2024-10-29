import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CustomFoodProduct } from '../models/custom-food-product.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomFoodProductService {
  private readonly apiRoute = environment.apiUrl + "/custom-food-item";

  constructor(private http: HttpClient) { }

  headers() : HttpHeaders{
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add the Bearer token here
      'Content-type': 'application/json',
      'Accept': 'application/json'
    });
  }

  createCustomFoodProduct(customFoodProduct: CustomFoodProduct): Observable<CustomFoodProduct> {
    let headers = this.headers()
    return this.http.post<CustomFoodProduct>(this.apiRoute, {
      "product_name": customFoodProduct.productName,
      "nutriments": {
        "energy-kcal_100g": customFoodProduct.nutriments.energyKcal100g,
        "proteins_100g": customFoodProduct.nutriments.proteins100g,
        "carbohydrates_100g": customFoodProduct.nutriments.carbohydrates100g,
        "sugars_100g": customFoodProduct.nutriments.sugars100g,
        "fat_100g": customFoodProduct.nutriments.fat100g,
        "saturated-fat_100g": customFoodProduct.nutriments.saturatedFat100g,
        "fiber_100g": customFoodProduct.nutriments.fiber100g,
        "sodium_100g": customFoodProduct.nutriments.sodium100g
      },
      "serving_size": customFoodProduct.servingSize,
      "userId": customFoodProduct.userId
    }, { headers })
  }

  getCustomFoodItemByUserIdAndCustomFoodProductId(userId: number, customFoodProductId: number): Observable<CustomFoodProduct> {
    let headers = this.headers()
    
    return this.http.get<any>(`${this.apiRoute}/${userId}/${customFoodProductId}`, {headers})
      .pipe(
        map(response => ({
          id: response.id,
          productName: response.product_name,
          categories: response.categories,
          servingSize: response.serving_size,
          userId: response.userId,
          nutriments: response.nutriments
        }))
      )
  }

  getCustomFoodItemsByUserId(userId: number): Observable<CustomFoodProduct[]> {
    let headers = this.headers()

    return this.http.get<CustomFoodProduct[]>(`${this.apiRoute}/${userId}`, {headers})
      .pipe(
        map((response: CustomFoodProduct[]) =>
          response.map((customFoodProduct: any) => ({
            id: customFoodProduct.id,
            productName: customFoodProduct.product_name,
            categories: customFoodProduct.categories,
            servingSize: customFoodProduct.serving_size,
            userId: customFoodProduct.userId,
            nutriments: {
              id: customFoodProduct.nutriments.id,
              energyKcal100g: customFoodProduct.nutriments['energy-kcal_100g'],
              proteins100g: customFoodProduct.nutriments['proteins_100g'],
              carbohydrates100g: customFoodProduct.nutriments['carbohydrates_100g'] ?? 0,
              sugars100g: customFoodProduct.nutriments['sugars_100g'],
              fat100g: customFoodProduct.nutriments['fat_100g'],
              saturatedFat100g: customFoodProduct.nutriments['saturated-fat_100g'],
              fiber100g: customFoodProduct.nutriments['fiber_100g'],
              sodium100g: customFoodProduct.nutriments['sodium_100g']
            }
          }))
        )
      )
  }

  updateCustomFoodItem(customFoodProduct: CustomFoodProduct): Observable<CustomFoodProduct> {
    let headers = this.headers()

    return this.http.put<CustomFoodProduct>(`${this.apiRoute}`, {
      "id": customFoodProduct.id,
      "product_name": customFoodProduct.productName,
      "nutriments": {
        "energy-kcal_100g": customFoodProduct.nutriments.energyKcal100g,
        "proteins_100g": customFoodProduct.nutriments.proteins100g,
        "carbohydrates_100g": customFoodProduct.nutriments.carbohydrates100g,
        "sugars_100g": customFoodProduct.nutriments.sugars100g,
        "fat_100g": customFoodProduct.nutriments.fat100g,
        "saturated-fat_100g": customFoodProduct.nutriments.saturatedFat100g,
        "fiber_100g": customFoodProduct.nutriments.fiber100g,
        "sodium_100g": customFoodProduct.nutriments.sodium100g
      },
      "serving_size": customFoodProduct.servingSize,
      "userId": customFoodProduct.userId
    }, { headers })
  }

  deleteCustomFoodItem(customFoodProductId: number) {
    let headers = this.headers()

    this.http.delete<CustomFoodProduct>(`${this.apiRoute}/${customFoodProductId}`, {headers});
  }
}
