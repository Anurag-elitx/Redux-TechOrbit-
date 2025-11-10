const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      console.log("action.payload:", action.payload);
      if (Array.isArray(action.payload.Products)) {
        const featureData = action.payload.Products.filter((curElem) => {
          return curElem.featured === true;
        });

        return {
          ...state,
          isLoading: false,
          products: action.payload.Products,
          featureProducts: featureData,
        };
      } else {
        console.error("action.payload.Products is not an array");
        return state;
      }

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload.Products[0],
      };

    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default ProductReducer;
