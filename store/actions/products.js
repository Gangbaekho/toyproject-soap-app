export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  // redux-thunk를 쓸 것이기 떄문에
  // 이렇게 action을 변경해야 한다는 것이다.
  // 음 결국에는 함수를 받아서 함수를 return 하는 형식이네
  // 뭐 이런식으로 돌아간다 정도만 알아두자.
  // 결국에는 음, callback function을 return하는 그런 의미인 듯 하다.
  return async (dispatch) => {
    // anync code를 여기다가 작성을 해주면 된다.
    // firebase 기준으로 /products를 만들었기 떄문에
    // 따로 products 폴더를 만든다라는 것이다.
    // json을 붙여주는 것은 firebase의 룰이기 떄문에 붙여주는거지
    // 특별한 의미를 가지고 있다고 생각은 하지 말자.
    // 두 번째에다가는 argument를 전달 할 수 있다.
    // 두 번쨰에다가는 기본적인 HTTP Protocol을 위한 정보를 넣어준다고 생각을
    // 하면 될 것 같다.
    // 음 여기서는 aync 랑 await를 이용해서 작성을 했다는 것 정도?
    // 다르게 할 수도 있다고 하네. 뭐 이건 나중에 javascript 더 살펴보면 될 듯 하고
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
    console.log(resData);

    // 즉 이거는 Local하게 변동하는 것이라고 생각을 하면 될 듯 하다.
    // 적절히 Request가 오고 Response가 오면 이걸 적용해서
    // Local page에다가 update를 하는 방식인걸로 이해가 된다.
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
