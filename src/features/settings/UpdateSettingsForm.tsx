import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useSettingUpdate from './useSettingUpdate';

function UpdateSettingsForm() {
  const { isFetchingSettings, settings } = useSettings();
  const { updateSetting, isUpdating } = useSettingUpdate();
  
  if (isFetchingSettings) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const handleUpdate = (e, field) => {
    const value = Number(e.target.value)
    if (!value) return
    if (settings[field] === value) return
    
    updateSetting({ [field]: value })
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
          disabled={isUpdating}
          defaultValue={minBookingLength} />
      </FormRow>
      
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating}
          defaultValue={maxBookingLength} />
      </FormRow>
      
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking} />
      </FormRow>
      
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating}
          defaultValue={breakfastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
