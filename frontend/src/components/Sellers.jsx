import { useState } from "react";
import SellerCard from "./SellerCard";
import sellersData from "../../sellerData.json";
import "../styles/Sellers.scss";

function Sellers() {
  const [selectedSeller, setSelectedSeller] = useState(null);

  return (
    <div className="cont">
      <div className="sellersContainer">
        {sellersData.map((seller) => {
          const isSelected = seller.name === selectedSeller;
          return (
            <SellerCard
              key={seller.name}
              seller={seller}
              isSelected={isSelected}
              onSelect={setSelectedSeller}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sellers;
