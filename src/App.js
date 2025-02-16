import React, { useState } from 'react';
import { Button, TextField, BlockStack, Card, FormLayout, ChoiceList } from '@shopify/polaris';
import { useForm, Controller } from 'react-hook-form';

const VolumeDiscountForm = () => {
  const { control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  });

  const [options, setOptions] = useState([
    { id: 1, title: 'Single', subtitle: 'Standard price', quantity: 1, discountType: 'None', amount: '' },
    { id: 2, title: 'Duo', subtitle: 'Save 10%', quantity: 2, discountType: '% discount', amount: 10 },
  ]);

  const [campaignName, setCampaignName] = useState('');
  const [title, setTitle] = useState('Buy more and save');
  const [description, setDescription] = useState('Apply for all products in store');

  const addOption = () => {
    const newOption = {
      id: options.length + 1,
      title: '',
      subtitle: '',
      quantity: options.length + 1,
      discountType: 'None',
      amount: '',
    };
    setOptions([...options, newOption]);
  };

  const deleteOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const onSubmit = (data) => {
    alert('Form submitted successfully!');
  };

  return (
    <div className="container">
      <Card title="Create Volume Discount" sectioned>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout>
            <TextField
              label="Campaign Name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              error={errors.campaignName ? 'Campaign Name is required' : ''}
              required
            />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {options.map((option, index) => (
              <div key={option.id} className="option">
                <Controller
                  name={`options[${index}].title`}
                  control={control}
                  defaultValue={option.title}
                  render={({ field }) => (
                    <TextField
                      label="Title"
                      {...field}
                      error={errors.options && errors.options[index] && errors.options[index].title ? 'Title is required' : ''}
                      required
                    />
                  )}
                />
                <Controller
                  name={`options[${index}].subtitle`}
                  control={control}
                  defaultValue={option.subtitle}
                  render={({ field }) => (
                    <TextField
                      label="Subtitle"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name={`options[${index}].quantity`}
                  control={control}
                  defaultValue={option.quantity}
                  render={({ field }) => (
                    <TextField
                      label="Quantity"
                      type="number"
                      {...field}
                      error={errors.options && errors.options[index] && errors.options[index].quantity ? 'Quantity must be a number' : ''}
                      required
                    />
                  )}
                />
                <Controller
                  name={`options[${index}].discountType`}
                  control={control}
                  defaultValue={option.discountType}
                  render={({ field }) => (
                    <ChoiceList
                      title="Discount Type"
                      choices={[
                        { label: 'None', value: 'None' },
                        { label: '% discount', value: '% discount' },
                        { label: 'Discount / each', value: 'Discount / each' },
                      ]}
                      selected={option.discountType}
                      {...field}
                      error={errors.options && errors.options[index] && errors.options[index].discountType ? 'Discount type is required' : ''}
                    />
                  )}
                />
                {option.discountType !== 'None' && (
                  <Controller
                    name={`options[${index}].amount`}
                    control={control}
                    defaultValue={option.amount}
                    render={({ field }) => (
                      <TextField
                        label="Amount"
                        type="number"
                        {...field}
                        suffix={option.discountType === '% discount' ? '%' : '$'}
                        error={errors.options && errors.options[index] && errors.options[index].amount ? 'Amount is required' : ''}
                        required={option.discountType !== 'None'}
                      />
                    )}
                  />
                )}
                <Button className="delete-btn" onClick={() => deleteOption(option.id)}>Delete Option</Button>
              </div>
            ))}

            <Button className="add-option-btn" onClick={addOption}>Add Option</Button>

            <Button
              primary
              submit
              disabled={!isValid || !campaignName || options.length === 0}
            >
              Save
            </Button>
          </FormLayout>
        </form>
      </Card>

      <Card title="Preview" sectioned>
        <h2>{`Campaign: ${campaignName}`}</h2>
        {options.map((option) => (
          <div key={option.id}>
            <p>{`Title: ${option.title}`}</p>
            <p>{`Subtitle: ${option.subtitle}`}</p>
            <p>{`Quantity: ${option.quantity}`}</p>
            <p>{`Discount Type: ${option.discountType}`}</p>
            {option.discountType !== 'None' && (
              <p>{`Amount: ${option.amount}${option.discountType === '% discount' ? '%' : '$'}`}</p>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default VolumeDiscountForm;
