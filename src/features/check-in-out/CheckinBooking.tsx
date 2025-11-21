import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const [ confirmPaid, setConfirmPaid ] = useState<boolean>(false);
  const [ addBreakfast, setAddBreakfast ] = useState<boolean>(false); 

  const { booking, isFetchingBooking } = useBooking();
  const { checkIn, isCheckingIn } = useCheckIn();
  const { settings, isFetchingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    setAddBreakfast(booking?.hasBreakfast ?? false);
  }, [booking])
  
  if ( isFetchingBooking || isFetchingSettings ) return <Spinner />

  const {
    id: bookingId,
    status,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  if (status !== "unconfirmed") return (
    <div>
      <div>Already Checked In</div>
      <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
    </div>
  )

  function handleCheckin() {
    if (!confirmPaid) return;
    if (status !== "unconfirmed") return;
    if (isCheckingIn) return;

    if (addBreakfast) {
      checkIn({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
      }})
    } else {
      checkIn({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn }
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the full amount of { " " }
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + optionalBreakfastPrice)
          }.
        </Checkbox>
      </Box>
    
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}

            disabled={ isCheckingIn }
            id="breakfast"
            >
            Add breakfast for { optionalBreakfastPrice }
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn }
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
