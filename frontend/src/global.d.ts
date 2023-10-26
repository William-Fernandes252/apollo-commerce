namespace ApolloCommerce {
  namespace Models {
    interface PaginatedModel {}

    interface Product extends PaginatedModel {
      id: string;
      name: string;
      price: number;
      color: string;
      promotionPrice: number;
      description: string;
      category: string;
    }

    interface Category {
      id: string;
      name: string;
    }
  }

  namespace RestAPI {
    type Resource = Models.Product | Models.Category;

    type ErrorResponseData = {
      detail: string;
    };

    type ValidationError<T extends Resource> = {
      [key: keyof Resource]: string[];
    };

    type ListResponseData<T extends Resource> = T extends Models.PaginatedModel
      ? {
          results: ApolloCommerce.Models.Product[];
          num_pages: number;
          count: number;
          next: string | null;
          previous: string | null;
        }
      : T[];
    type ResponseData<T extends Resource> = T;
  }
}
