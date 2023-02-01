import { Request, Response } from "express";
import { createProductInput, deleteProductInput, readProductInput, updateProductInput } from "../schema/product.schema";
import { destroyProduct, showProduct, storeProduct, updateProduct } from "../service/product.service";

export async function createProductHandler(req: Request<{}, {}, createProductInput['body']>, res: Response) {
  const userId = res.locals.user._id
  const body = req.body
  const product = await storeProduct({ ...body, user: userId })
  return res.send(product)
}

export async function updateProductHandler(req: Request<updateProductInput['params']>, res: Response) {
  const userId = res.locals.user._id
  const productId = req.params.productId
  const update = req.body
  const product = await showProduct({ productId })

  if (!product) return res.sendStatus(404)

  if (String(product.user) !== userId) return res.sendStatus(403)

  const updatedProduct = await updateProduct({ productId }, update, { new: true })

  return res.send(updatedProduct)
}

export async function getProductHandler(req: Request<readProductInput['params']>, res: Response) {
  const productId = req.params.productId
  const product = await showProduct({ productId })

  if (!product) return res.sendStatus(404)

  res.send(product)

}

export async function deleteProductHandler(req: Request<deleteProductInput['params']>, res: Response) {
  const userId = res.locals.user._id
  const productId = req.params.productId
  const product = await showProduct({ productId })

  if (!product) return res.sendStatus(404)

  if (String(product.user) !== userId) return res.sendStatus(403)

  await destroyProduct({ productId })

  return res.sendStatus(200)
}