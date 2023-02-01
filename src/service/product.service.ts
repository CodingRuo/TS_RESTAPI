import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";


export async function storeProduct(input: DocumentDefinition<Omit<ProductDocument, 'createdAt' | 'updatedAt'>>) {
  return ProductModel.create(input)
}

export async function showProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
  return ProductModel.findOne(query, {}, options)
}

export async function updateProduct(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) {
  return ProductModel.findOneAndUpdate(query, update, options)
}

export async function destroyProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query)
}