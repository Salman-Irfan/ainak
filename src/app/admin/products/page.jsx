// /src/app/admin/products/page.jsx

// /src/app/admin/products/page.jsx

"use client";

import { useEffect, useState } from "react";
import Select from "react-select";

import { getProducts } from "@/services/products/getProducts";
import { addProduct } from "@/services/products/addProduct";
import { updateProduct } from "@/services/products/updateProduct";
import { deleteProduct } from "@/services/products/deleteProduct";
import { getCategories } from "@/services/categories/getCategories";
import { uploadImage } from "@/utils/uploadImage";
import { deleteImages } from "@/utils/deleteImage";


// ─── empty form helper ─────────────────────────────────────────────────────────
const emptyForm = {
	name: "",
	description: "",
	price: "",
	stock: "",
	categoryId: "",
	categoryName: "",
};

// ─── main component ────────────────────────────────────────────────────────────
const ProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	// add form state
	const [form, setForm] = useState(emptyForm);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [images, setImages] = useState([]);

	// edit modal state
	const [editingProduct, setEditingProduct] = useState(null); // null = closed
	const [editForm, setEditForm] = useState(emptyForm);
	const [editCategory, setEditCategory] = useState(null);
	const [existingImages, setExistingImages] = useState([]); // URLs already saved
	const [newImages, setNewImages] = useState([]); // new File objects
	const [editLoading, setEditLoading] = useState(false);

	// delete state
	const [deletingId, setDeletingId] = useState(null);

	// ── fetch helpers ────────────────────────────────────────────────────────────
	const fetchProducts = async () => {
		const data = await getProducts();
		setProducts(data);
	};

	const fetchCategories = async () => {
		const data = await getCategories();
		setCategories(data.map((cat) => ({ value: cat.id, label: cat.name })));
	};

	useEffect(() => {
		fetchProducts();
		fetchCategories();
	}, []);

	// ── ADD product ──────────────────────────────────────────────────────────────
	const handleSubmit = async (e) => {
		e.preventDefault();

		await addProduct(
			{
				...form,
				categoryId: selectedCategory?.value,
				categoryName: selectedCategory?.label,
			},
			images
		);

		setForm(emptyForm);
		setSelectedCategory(null);
		setImages([]);
		fetchProducts();
	};

	// ── OPEN edit modal ──────────────────────────────────────────────────────────
	const openEdit = (product) => {
		setEditingProduct(product);
		setEditForm({
			name: product.name ?? "",
			description: product.description ?? "",
			price: product.price ?? "",
			stock: product.stock ?? "",
			categoryId: product.categoryId ?? "",
			categoryName: product.categoryName ?? "",
		});
		setEditCategory(
			product.categoryId
				? { value: product.categoryId, label: product.categoryName }
				: null
		);
		setExistingImages(product.images ?? []);
		setNewImages([]);
	};

	const closeEdit = () => {
		setEditingProduct(null);
	};

	// ── REMOVE one existing image from edit form ─────────────────────────────────
	const removeExistingImage = (url) => {
		setExistingImages((prev) => prev.filter((img) => img !== url));
	};

	// ── SAVE edit ────────────────────────────────────────────────────────────────
	const handleEditSave = async (e) => {
		e.preventDefault();
		if (!editingProduct) return;

		setEditLoading(true);

		try {
			// figure out which images were removed
			const removedUrls = (editingProduct.images ?? []).filter(
				(url) => !existingImages.includes(url)
			);

			// delete removed images from storage
			if (removedUrls.length > 0) {
				await deleteImages(removedUrls);
			}

			// upload new images
			const uploadedUrls = [];
			for (const file of newImages) {
				const url = await uploadImage(file);
				if (url) uploadedUrls.push(url);
			}

			// final image list = kept existing + newly uploaded
			const finalImages = [...existingImages, ...uploadedUrls];

			await updateProduct(editingProduct.id, {
				name: editForm.name,
				description: editForm.description,
				price: Number(editForm.price),
				stock: Number(editForm.stock),
				categoryId: editCategory?.value ?? "",
				categoryName: editCategory?.label ?? "",
				images: finalImages,
			});

			closeEdit();
			fetchProducts();
		} catch (err) {
			console.error("Edit save failed:", err);
		} finally {
			setEditLoading(false);
		}
	};

	// ── DELETE product ───────────────────────────────────────────────────────────
	const handleDelete = async (product) => {
		const confirmed = window.confirm(
			`"${product.name}" ko delete karna chahte hain? Yeh action undo nahi ho sakta.`
		);
		if (!confirmed) return;

		setDeletingId(product.id);

		try {
			// delete all images from storage first
			if (product.images?.length > 0) {
				await deleteImages(product.images);
			}
			// then delete the Firestore document
			await deleteProduct(product.id);
			fetchProducts();
		} catch (err) {
			console.error("Delete failed:", err);
		} finally {
			setDeletingId(null);
		}
	};

	// ─────────────────────────────────────────────────────────────────────────────
	return (
		<div className="p-6 max-w-5xl mx-auto">

			<h1 className="text-3xl font-bold mb-6">Products</h1>

			{/* ── ADD FORM ──────────────────────────────────────────────────────── */}
			<form
				onSubmit={handleSubmit}
				className="grid gap-4 bg-white p-6 rounded-xl shadow"
			>
				<input
					placeholder="Product Name"
					value={form.name}
					onChange={(e) => setForm({ ...form, name: e.target.value })}
					className="border p-2 rounded"
					required
				/>

				<textarea
					placeholder="Description"
					value={form.description}
					onChange={(e) => setForm({ ...form, description: e.target.value })}
					className="border p-2 rounded"
				/>

				<input
					placeholder="Price"
					type="number"
					value={form.price}
					onChange={(e) => setForm({ ...form, price: e.target.value })}
					className="border p-2 rounded"
					required
				/>

				<input
					placeholder="Stock"
					type="number"
					value={form.stock}
					onChange={(e) => setForm({ ...form, stock: e.target.value })}
					className="border p-2 rounded"
					required
				/>

				<Select
					options={categories}
					value={selectedCategory}
					onChange={setSelectedCategory}
					placeholder="Select Category"
				/>

				<input
					type="file"
					multiple
					onChange={(e) => setImages([...e.target.files])}
				/>

				<button className="bg-black text-white py-2 rounded">
					Add Product
				</button>
			</form>

			{/* ── PRODUCT LIST ──────────────────────────────────────────────────── */}
			<div className="mt-8 grid gap-4">
				{products.map((p) => (
					<div
						key={p.id}
						className="border p-4 rounded flex gap-4 items-start"
					>
						{/* thumbnail */}
						{p.images?.[0] && (
							<img
								src={p.images[0]}
								className="w-20 h-20 object-cover rounded shrink-0"
								alt={p.name}
							/>
						)}

						{/* info */}
						<div className="flex-1">
							<h2 className="font-bold">{p.name}</h2>
							<p className="text-sm text-gray-500">{p.categoryName}</p>
							<p className="font-medium">Rs {p.price}</p>
							<p className="text-xs text-gray-400">Stock: {p.stock}</p>
						</div>

						{/* actions */}
						<div className="flex flex-col gap-2 shrink-0">
							<button
								onClick={() => openEdit(p)}
								className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
							>
								Edit
							</button>

							<button
								onClick={() => handleDelete(p)}
								disabled={deletingId === p.id}
								className="text-sm border border-red-300 text-red-600 px-3 py-1 rounded hover:bg-red-50 disabled:opacity-50"
							>
								{deletingId === p.id ? "Deleting..." : "Delete"}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* ── EDIT MODAL ────────────────────────────────────────────────────── */}
			{editingProduct && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

						{/* modal header */}
						<div className="flex items-center justify-between p-6 border-b">
							<h2 className="text-xl font-bold">Edit Product</h2>
							<button
								onClick={closeEdit}
								className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
								aria-label="Close"
							>
								&times;
							</button>
						</div>

						{/* modal body */}
						<form onSubmit={handleEditSave} className="grid gap-4 p-6">

							<input
								placeholder="Product Name"
								value={editForm.name}
								onChange={(e) =>
									setEditForm({ ...editForm, name: e.target.value })
								}
								className="border p-2 rounded"
								required
							/>

							<textarea
								placeholder="Description"
								value={editForm.description}
								onChange={(e) =>
									setEditForm({ ...editForm, description: e.target.value })
								}
								className="border p-2 rounded"
							/>

							<input
								placeholder="Price"
								type="number"
								value={editForm.price}
								onChange={(e) =>
									setEditForm({ ...editForm, price: e.target.value })
								}
								className="border p-2 rounded"
								required
							/>

							<input
								placeholder="Stock"
								type="number"
								value={editForm.stock}
								onChange={(e) =>
									setEditForm({ ...editForm, stock: e.target.value })
								}
								className="border p-2 rounded"
								required
							/>

							<Select
								options={categories}
								value={editCategory}
								onChange={setEditCategory}
								placeholder="Select Category"
							/>

							{/* existing images with remove option */}
							{existingImages.length > 0 && (
								<div>
									<p className="text-sm text-gray-500 mb-2">
										Existing Images
									</p>
									<div className="flex flex-wrap gap-2">
										{existingImages.map((url) => (
											<div key={url} className="relative">
												<img
													src={url}
													className="w-20 h-20 object-cover rounded"
													alt=""
												/>
												<button
													type="button"
													onClick={() => removeExistingImage(url)}
													className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none"
													aria-label="Remove image"
												>
													&times;
												</button>
											</div>
										))}
									</div>
								</div>
							)}

							{/* new image upload */}
							<div>
								<p className="text-sm text-gray-500 mb-1">
									Add New Images
								</p>
								<input
									type="file"
									multiple
									onChange={(e) => setNewImages([...e.target.files])}
								/>
							</div>

							{/* modal footer */}
							<div className="flex gap-3 pt-2">
								<button
									type="button"
									onClick={closeEdit}
									className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100"
								>
									Cancel
								</button>

								<button
									type="submit"
									disabled={editLoading}
									className="flex-1 bg-black text-white py-2 rounded disabled:opacity-50"
								>
									{editLoading ? "Saving..." : "Save Changes"}
								</button>
							</div>

						</form>
					</div>
				</div>
			)}

		</div>
	);
};

export default ProductsPage;