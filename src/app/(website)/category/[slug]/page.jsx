import { getCategoryBySlug } from "@/services/categories/getCategoryBySlug";

export default async function CategoryPage({ params }) {

    // ✅ FIX: await params first
    const { slug } = await params;

    if (!slug) {
        return (
            <div className="p-10 text-center">
                Invalid category URL
            </div>
        );
    }

    const category = await getCategoryBySlug(slug);

    if (!category) {
        return (
            <div className="p-10 text-center">
                Category not found
            </div>
        );
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">
                {category.name}
            </h1>
        </div>
    );
}