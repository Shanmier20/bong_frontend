const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GET All Products (Read)
export const getAllProducts = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch products.");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// POST New Product (Create)
export const createProduct = async (productData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            // Get error message from backend response if available
            const errorDetail = await response.json();
            throw new Error(errorDetail.error || "Failed to create product.");
        }

        return response.json(); // The backend returns the new product object
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// PUT Product (Update)
export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorDetail = await response.json();
            throw new Error(errorDetail.error || `Failed to update product ${id}.`);
        }

        // Backend returns a message: "Product updated successfully." or 200/204
        return response.json();
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// DELETE Product
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
        });

        if (response.status !== 204) {
            // The backend uses 204 No Content for success, otherwise 404/500
            const errorDetail = await response.json();
            throw new Error(errorDetail.error || `Failed to delete product ${id}.`);
        }

        // Success with 204 No Content, no body to return
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }

};
