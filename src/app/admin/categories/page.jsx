// /src/app/admin/categories/page.jsx

"use client";

import { useEffect, useState } from "react";

import { addCategory } from "@/services/categories/addCategory";

import { getCategories } from "@/services/categories/getCategories";
import { updateCategory } from "@/services/categories/updateCategory";
import { deleteCategory } from "@/services/categories/deleteCategory";
const Categories = () => {
	const [categoryName, setCategoryName] = useState("");
	const [categories, setCategories] = useState([]);

	const [editingId, setEditingId] = useState(null);
	const [editingName, setEditingName] = useState("");
	// fetch categories from firebase and set to state
	const fetchCategories = async () => {
		const data = await getCategories();
		setCategories(data);
	};

	useEffect(() => {
		fetchCategories();
	}, []);
	// handle form submit to add category to firebase and refresh categories list
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!categoryName.trim()) return;
		await addCategory(categoryName);
		setCategoryName("");
		fetchCategories();
	};
	//  Handle Edit Click
	const handleEdit = (category) => {
		setEditingId(category.id);
		setEditingName(category.name);
	};
	// Handle Update
	const handleUpdate = async () => {
		if (!editingName.trim()) return;

		await updateCategory(editingId, editingName);

		setEditingId(null);

		setEditingName("");

		fetchCategories();
	};
	// Handle Delete
	const handleDelete = async (categoryId) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this category?",
		);

		if (!confirmed) return;

		await deleteCategory(categoryId);

		fetchCategories();
	};
	return (
		<div className="max-w-5xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-8">Categories</h1>

			<form onSubmit={handleSubmit} className="flex gap-3 mb-8 ">
				<input
					type="text"
					placeholder="Category Name"
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
					className="flex-1 border rounded-lg px-4 py-3"
				/>

				<button
					className="bg-slate-900 text-white px-6 rounded-lg hover:bg-slate-700 hover:shadow-lg hover:text-green-300 hover:cursor-pointer transition"
					type="submit">
					Add
				</button>
			</form>

			<div className=" bg-white rounded-xl shadow overflow-hidden">
				<table className="w-full">
					<thead className="bg-slate-100">
						<tr>
							<th className=" p-4 text-left">Name</th>

							<th className=" p-4 text-left">Slug</th>

							<th className=" p-4 text-left">Actions</th>
						</tr>
					</thead>

					<tbody>
						{categories.map((category) => (
							<tr key={category.id} className="border-t">
								<td className="p-4">
									{editingId === category.id ? (
										<input
											value={editingName}
											onChange={(e) =>
												setEditingName(e.target.value)
											}
											className=" border rounded px-3 py-2 w-full"
										/>
									) : (
										category.name
									)}
								</td>

								<td className="p-4">{category.slug}</td>

								<td className="p-4 flex gap-2">
									{editingId === category.id ? (
										<>
											<button
												onClick={handleUpdate}
												className=" bg-green-600 text-white px-3 py-1 rounded">
												Save
											</button>

											<button
												onClick={() => {
													setEditingId(null);

													setEditingName("");
												}}
												className=" bg-gray-500 text-white px-3 py-1 rounded">
												Cancel
											</button>
										</>
									) : (
										<>
											<button
												onClick={() =>
													handleEdit(category)
												}
												className="bg-blue-500text-whitepx-3py-1rounded">
												Edit
											</button>

											<button
												onClick={() =>
													handleDelete(category.id)
												}
												className=" bg-red-500 text-white px-3 py-1 rounded">
												Delete
											</button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Categories;
