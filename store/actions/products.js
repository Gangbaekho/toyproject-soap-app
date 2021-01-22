import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-complete-guide-e74de-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-complete-guide-e74de-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
        // Delete 할떄는 굳이 이런게 필요 없나보다.
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //   title,
        //   description,
        //   imageUrl,
        //   price,
        // }),
      }
    );

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-complete-guide-e74de-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    // 이런식으로 Firebase가 특정 Object에 접근할 수 있는
    // 그런 Controller를 미리 만들어 놓았다고 생각을 하면 될 듯 하다.
    // 원래 저런거 다 Server 쪽에서 다 만들어줘야하는데
    // 기본적인 CRUD를 만들어 놓았다는게 이런 의미구나.
    await fetch(
      `https://rn-complete-guide-e74de-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        // PATCH를 쓰는구나, 처음 들어보는데?
        // 이런 HTTP METHOD가 존재 했었나.
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
