import "./store.css";
import { Avatar } from "./Avatar";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { useUser } from "../../hooks/useUser";
import { useItems } from "../../hooks/useItems";
import { useUserItems } from "../../hooks/useUserItems";
import { db } from "../../firebaseConfig";
import { CartInformation } from "./CartInformation";
import { TextBlock } from "./TextBlock";
import { GlobalChat } from "../../global-chat/global-chat";
import { useState } from "react";
import styled from "styled-components";


const CartInfoWrapper = styled.div`
  display: flex;
  width: 40%;
  float: right;
  transform: scale3d(0.95, 0.95, 1);
  justify-content: space-between;
`;

export const StorePage = () => {
  const user = useUser();


  const itemsCollectionPath = db.collection("items");
  const userItemsCollectionPath = db
    .collection("users")
    .doc(user?.uid)
    .collection("armory");
  const itemsRef = useItems(itemsCollectionPath);
  // const userItemsRef = useUserItems(userItemsCollectionPath);
  const userItemsRef = useItems(userItemsCollectionPath);

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  const joinItemWithCart = (key) => {
    const items = itemsRef.find((item) => item.key === key);
    const cartItem = cart.find((el) => el.key === key);
  
    return { ...items, ...cartItem}
  }

const itemsToDisplayInCart = cart.map((cartItem) => {
  return joinItemWithCart(cartItem.key)
})

console.log(itemsToDisplayInCart);

  const orderCount = cart.reduce(
    (sum, cartItem) => sum + cartItem.orderCount,
    0
  );

  const addToCart = (key) => {
    setCart((cart) => {
      const existingItem = cart.find((cartItem) => cartItem.key === key);
      if (!existingItem) {
        return [...cart, { key, orderCount: 1 }];
      } else {
        return cart.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, orderCount: cartItem.orderCount + 1 }
            : cartItem
        );
      }
    });
  };

  return (
<>
{isOpen === false ? (
    <>
      <section className="store__screen" >
        <div>
          <TextBlock>Mirek Handlarz</TextBlock>
          <CartInfoWrapper>
            <TextBlock>Twoje złoto: {user?.resources.gold}</TextBlock>
            <CartInformation orderCount={orderCount} openModal={(value) => {openModal()
            console.log("działa");}} />
          </CartInfoWrapper>
        </div>
        <div className="store-wrapper">
          <ItemsGrid text="Sprzedaj">
            <Items items={userItemsRef} />
          </ItemsGrid>
          <Avatar />
          <ItemsGrid text="Kup">
            <Items items={itemsRef} onBuyClick={(key) => addToCart(key)} />
          </ItemsGrid>
        </div>
        <section style={{ height: "250px" }}>
          <GlobalChat />
        </section>
      </section>
    </>



) : (
  <section onClick={() => closeModal()} style={{width: '100vw', minHeight: "800px"}}>
{itemsToDisplayInCart.length === 0 ? (
  <TextBlock>Nie masz przedmiotów w koszyku</TextBlock>
) : (
  <>
  {}
  </>
)

}

{/*
          <TextBlock>Koszyk test</TextBlock> */}
            {/* {items &&
              items.map((item, index) => (
                <ItemStyle key={index}>
                  <Item 
                  name={item.key} 
                  value={item.val.value}
                  onBuyClick={() => {
                    if (item.type) {
                      onBuyClick(item.key)
                    }
                  }}
                  />
                </ItemStyle>
              ))} */}
          {/* </>
        );
      }; */}

  

  </section>
)}
</>
    
  );
};
