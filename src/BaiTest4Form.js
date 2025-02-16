import React, { useState, useCallback } from 'react';
import { Button, Box, InlineStack, TextField, Card, Divider, Layout, LegacyCard, Text, Icon, IconButton , BlockStack, DataTable, InlineGrid, Select } from '@shopify/polaris';
import {
  ArrowLeftIcon, PlusIcon, DeleteIcon
} from '@shopify/polaris-icons';
import { useForm, Controller } from 'react-hook-form';
import './BaiTest4Form.css';
const VolumeDiscountForm = () => {
  const [options, setOptions] = useState([]);
  const { control, handleSubmit, watch, setValue, formState: { errors, isValid }, register } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: options,
    },
  });
  const [campaignName, setCampaignName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
 
  // Handle discount type change
  const handleDiscountTypeChange = (value, index) => {
    setValue(`options[${index}].discountType`, value);
    setValue(`options[${index}].amount`, ''); // Reset amount when changing discount type
  };
  const handleManageClick = (id) => {
    // Xóa option dựa trên id
    setOptions(options.filter(option => option.id !== id));
    console.log('Manage button clicked');
  };
  const handleSelectChange = useCallback(
    (selected: string, id: string) => {
      // setSelected(selected)
      //Nam lấy data ở đây rồi dùng ở đây tùy Nam nha
      // cái handle để ra cái text amount á 
      console.log('selected', selected)
      console.log('id', id)
    },
    [],
  );
  const [selected, setSelected] = useState('today');
  const [inputAmount, setInputAmount] = useState('');
  const addOption = () => {
    const maxQuantity = options.reduce((max, option) => Math.max(max, option.quantity), 0);
    const newOption = {
      id: options.length + 1,
      title: '',
      subtitle: '',
      quantity: maxQuantity + 1, // Increment based on the max quantity
      discountType: 'None',
      amount: '',
    };
    setOptions([...options, newOption]);
  };
  const optionsdiscountType = [
    { label: 'None', value: 'None' },
    { label: '% discount', value: '% discount' },
    { label: 'Discount / each', value: 'Discount / each' },
  ];
  const deleteOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  };
  const handleOnInput = (name, value) => {
    setValue(name, value);  // Cập nhật giá trị cho useForm
    console.log('Form Data:', watch());  // In dữ liệu hiện tại của form
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", width: "100vw", padding: "20px", boxSizing: "border-box" }} // Chiếm toàn bộ màn hình
    >
      <Box width="80%" maxWidth="1200px" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Button plain>
            <Icon source={ArrowLeftIcon} />
          </Button>
          <Text variant="bodyMd" fontWeight="bold">Create volume discount</Text>
        </div>

        <Layout>
          <Layout.Section>
            <LegacyCard title="Order details" sectioned >
              <TextField
                label="Campaign Name"
                value={campaignName}
                onChange={(value) => setCampaignName(value)} // Polaris chỉ truyền value
                error={errors.campaignName ? "Campaign Name is required" : undefined} // Tránh lỗi khi error không tồn tại
                required
              />
              <TextField
                label="Title"
                value={title}
                onChange={(value) => setTitle(value)} // Polaris truyền value, không phải event
                required
              />
              <TextField
                label="Description"
                value={description}
                onChange={(value) => setDescription(value)}
              />
            </LegacyCard>
            <LegacyCard title="Volume discount rule" sectioned>
              {options.map((option, index) => (
                <LegacyCard 
                title={`option ${option.id}`}
                actions={[
                  {
                    content: <Icon source={DeleteIcon} />,
                    onAction: () => handleManageClick(option.id), 
                  },
                ]}
                >
                  
                  <div key={option.id} className="option">
                                    <BlockStack>
                                      <Divider borderColor="border" />
                                      <div style={{ marginTop: "16px" }}></div> 
                                      <InlineGrid columns={3} gap="8" style={{ width: "100%" }}>
                                        
                                        <div style={{ width: "25%", minWidth: "200px" }}>
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
                                        </div>

                                        <Box style={{ width: "25%", minWidth: "200px" }}>
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
                                        </Box>

                                        <Box style={{ width: "25%", minWidth: "200px" }}>
                                          <Controller
                                            name={`options[${index}].Label`}
                                            control={control}
                                            defaultValue={option.Label}
                                            render={({ field }) => (
                                              <TextField
                                                label="Label"
                                                {...field}
                                                required
                                              />
                                            )}
                                          />
                                        </Box>
                                      </InlineGrid>
                                    </BlockStack>
                                    <InlineGrid columns={3} gap="6" style={{ width: "100%" }}>
                                      <Box width="25%" minWidth="200px">
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
                                      </Box>

                                      <Controller
                                        name={`options[${index}].discountType`}
                                        control={control}
                                        defaultValue={option.discountType}
                                        render={({ field }) => (
                                          <Box width="25%" minWidth="200px">
                                            <Select
                                              label="Discount Type"
                                              options={optionsdiscountType}
                                              onChange={(value) => field.onChange(value)}  // Cập nhật đúng chuẩn React Hook Form
                                              value={field.value}
                                            />
                                          </Box>
                                        )}
                                      />

                                      <Controller
                                        name={`options[${index}].amount`}
                                        control={control}
                                        defaultValue={option.amount || ''}  // Khởi tạo giá trị ban đầu
                                        render={({ field }) => (
                                          <Box width="25%" minWidth="200px">
                                            {watch(`options[${index}].discountType`) !== 'None' && (  // Kiểm tra khi discountType khác None
                                              <TextField
                                                label="Amount"
                                                type="number"
                                                {...field}  // Liên kết trực tiếp với React Hook Form
                                                onChange={(e) => {
                                                  field.onChange(e);
                                                  handleOnInput(`options[${index}].amount`, e);
                                                }}
                                                error={errors.options?.[index]?.amount ? 'Amount is required' : ''}
                                                required
                                                suffix={watch(`options[${index}].discountType`) === '% discount' ? '%' : '$'}
                                              />
                                            )}
                                          </Box>
                                        )}
                                      />


                                    </InlineGrid>     
                                    <div style={{ marginBottom: "16px" }}></div>              
                                    <Divider borderColor="border" />
                                    
                                  </div>
                                  
                </LegacyCard>
                
              ))}
              <div style={{ marginTop: "16px" }}></div> 
              <Button primary variant='primary' onClick={addOption} fullWidth>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon source={PlusIcon} />
                  <span style={{ marginLeft: '8px' }}>Add Option</span>
                </div>
              </Button>
            </LegacyCard>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <LegacyCard title="Preview" sectioned>
              <Text alignment="center" fontWeight="bold">
                Buy more and save
              </Text>
              <text>
                Apply for all product in store
              </text>
              <Card title={`Preview - Campaign: ${campaignName}`} sectioned>
              <DataTable
                columnContentTypes={["text", "text", "numeric", "text"]}
                headings={["Title", "Discount Type", "Quantity", "Amount"]}
                rows={options.map((option) => [
                  option.title || "N/A",
                  option.discountType || "None",
                  option.quantity || 0,
                  option.discountType !== "None"
                    ? `${option.amount}${option.discountType === "% discount" ? "%" : "$"}`
                    : "N/A",
                ])}
                defaultSortDirection="ascending"
                initialSortColumnIndex={0}
              />
              <Button primary variant='primary' onClick={addOption} >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span >save</span>
                </div>
              </Button>
              </Card>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Box>
    </Box>
  );

};

export default VolumeDiscountForm;
