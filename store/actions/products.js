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

      // 이게 Response 200 뭐 이런거 체크하는 방법인가보다.
      if (!response.ok) {
        // 뭐 여기에다가 적절한 Error handling을 넣어주면 된다.
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
      // 뭐 이런식으로 error 처리를 하면 된다.
      // 아니면은 then.cath 뭐 이런식으로 해도 되고
      // 여기는 async 와 await를 이용했기 떄문에
      // 이런 try catch문을 썼다는 것이지.
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
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
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
