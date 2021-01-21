import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
  }, [title, description, imageUrl, price, dispatch, prodId]);

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>TITLE</Text>
          <TextInput
            style={StyleSheet.input}
            value={title}
            onChange={(text) => setTitle(text)}
            // keyboardType 이라는 것이 있는데
            // 이것에 대한 더 정확한 설명은 Docs를 참고해라
            // TextInput 들어가면은 쓸 수 있는  props를 정리해놓았을 것이다.
            keyboardType="default"
            autoCapitalize="sentences"
            // autoCorrect는 뭔지 잘 모르겠네
            // Docs를 참고하자.
            autoCorrect
            // 이건 여러 InputText가 있을떄,
            // 그 다음으로 자동으로 Focus 되는 기능을
            // 말하는 듯, default 는 return이라는 것 같다.
            returnKeyType="next"
            // 이건 다음 끝났을떄 발동하는 것이다.
            // on 치고 control + spacebar를 누르면 다양한
            // Event들을 확인할 수 있으니 나중에 가지고 놀아보자.
            onEndEditing={() => console.log("onEndEditing")}
            onSubmitEditing={() => console.log("onSubmitEditing")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={StyleSheet.input}
            value={imageUrl}
            onChange={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={StyleSheet.input}
              value={price}
              onChange={(text) => setPrice(text)}
              // 이걸 쓰면은 숫자만 쓸 수 있는
              // 그런 키보드를 보여준다는 것이다.
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={StyleSheet.input}
            value={description}
            onChange={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFunction = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product "
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFunction}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
});

export default EditProductScreen;
