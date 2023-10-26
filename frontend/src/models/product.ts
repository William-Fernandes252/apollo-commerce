import { useQueryClient, useQuery, useMutation } from 'react-query';
import type { AxiosError } from 'axios';
import { useAxios } from '@/contexts/axios';
import { useState } from 'react';

const resourceUri = '/products/';

export type ListResponse = {
  results: ApolloCommerce.Models.Product[];
  num_pages: number;
  count: number;
  next: string | null;
  previous: string | null;
};

export function useProductsList(
  page: number,
  pageSize: number,
  params?: {
    name?: ApolloCommerce.Models.Product['name'];
    description?: ApolloCommerce.Models.Product['description'];
  },
) {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(
    ['products', { page, pageSize, ...params }],
    async () => {
      return (
        await axios.get(resourceUri, {
          params: { page, page_size: pageSize, ...params },
        })
      ).data;
    },
  );

  const mutation = useMutation(
    async (newProduct: Omit<ApolloCommerce.Models.Product, 'id'>) => {
      return (await axios.post(resourceUri, newProduct)).data;
    },
  );

  async function createProduct(
    product: Omit<ApolloCommerce.Models.Product, 'id'>,
  ) {
    return new Promise((resolve, reject) => {
      mutation.mutate(product, {
        onSuccess(data) {
          queryClient.invalidateQueries('products');
          resolve(data);
        },
        onError(error) {
          reject(error);
        },
      });
    });
  }

  return { data, error, isLoading, create: createProduct } as {
    data: ApolloCommerce.RestAPI.ListResponseData<ApolloCommerce.Models.Product>;
    isLoading: boolean;
    error: AxiosError<ApolloCommerce.RestAPI.ErrorResponseData>;
    create: (
      product: Omit<ApolloCommerce.Models.Product, 'id'>,
    ) => Promise<ApolloCommerce.Models.Product>;
  };
}

export function useProduct() {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [id, setId] = useState<ApolloCommerce.Models.Product['id'] | null>(
    null,
  );

  const query = useQuery(['products', id], async () => {
    return id ? (await axios.get(`${resourceUri}${id}/`)).data : null;
  });

  const updateMutation = useMutation(
    async (
      productPatch: {
        id: ApolloCommerce.Models.Product['id'];
      } & Partial<ApolloCommerce.Models.Product>,
    ) => {
      return (
        await axios.put(`${resourceUri}${productPatch.id}/`, productPatch)
      ).data;
    },
  );
  async function updateProduct(
    productPatch: {
      id: ApolloCommerce.Models.Product['id'];
    } & Partial<ApolloCommerce.Models.Product>,
  ) {
    return new Promise((resolve, reject) => {
      updateMutation.mutate(productPatch, {
        onSuccess(data, variables) {
          queryClient.setQueryData(['products', variables.id], data);
          resolve(data);
        },
        onError(error) {
          reject(error);
        },
      });
    });
  }

  const deleteMutation = useMutation(
    async (productId?: ApolloCommerce.Models.Product['id']) => {
      return (await axios.delete(`${resourceUri}${productId || id}/`)).data;
    },
  );
  async function deleteProduct(
    productId?: ApolloCommerce.Models.Product['id'],
  ) {
    return new Promise((resolve, reject) => {
      deleteMutation.mutate(productId, {
        onSuccess(data) {
          queryClient.invalidateQueries('products');
          resolve(data);
        },
        onError(error) {
          reject(error);
        },
      });
    });
  }

  return {
    product: query.data,
    error: query.error,
    getProduct: setId,
    update: updateProduct,
    delete: deleteProduct,
  };
}
