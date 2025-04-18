import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useCabinDelete from "./useCabinDelete";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import useCabinCreate from "./useCabinCreate";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useCabinDelete();
  const { isCreating, createCabin } = useCabinCreate();
  const isWorking = isDeleting || isCreating

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const handleDuplicate = () => {
    createCabin({
      name: `${name} - Copy`,
      maxCapacity: maxCapacity,
      regularPrice: regularPrice,
      discount: discount,
      description: cabin.description,
      image: image,
    })
  }


  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>

        {discount === 0
          ? <span>&mdash;</span>
          : <Discount>{formatCurrency(discount)}</Discount>}
        
        <div>
          <button
            onClick={handleDuplicate}
            disabled={isWorking}
          >
            <HiSquare2Stack />
          </button>

          <button
            onClick={() => setShowForm((show) => !show)}
            disabled={isWorking}
          >
            <HiPencil />
          </button>

          <button
            onClick = {() => deleteCabin(cabinId)}
            disabled = {isWorking}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={ cabin } />}
    </>
  )
}
